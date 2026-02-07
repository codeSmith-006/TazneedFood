import { connectDB } from "../src/lib/mongodb.js";
import Order from "../src/models/Order.js";
import OrderCounter from "../src/models/OrderCounter.js";
import Product from "../src/models/Product.js";

const sampleOrders = [
  {
    orderNumber: "ORD-000001",
    customer: { name: "Ahmed Rahman", phone: "+8801712345678", address: "Dhaka, Bangladesh" },
    items: [
      {
        productSlug: "black-seed-honey",
        quantity: 2,
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=100",
      },
    ],
    discount: 0,
    coupon: undefined,
    paymentType: "cod",
    status: "pending",
    createdAtOffsetHours: 2,
  },
  {
    orderNumber: "ORD-000002",
    customer: { name: "Fatima Begum", phone: "+8801898765432", address: "Chittagong, Bangladesh" },
    items: [
      {
        productSlug: "pure-cow-ghee",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=100",
      },
    ],
    discount: 50,
    coupon: "SAVE50",
    paymentType: "online",
    status: "confirmed",
    createdAtOffsetHours: 5,
  },
  {
    orderNumber: "ORD-000003",
    customer: { name: "Karim Islam", phone: "+8801556789012", address: "Sylhet, Bangladesh" },
    items: [
      {
        productSlug: "ajwa-dates-premium",
        quantity: 2,
        image: "https://images.unsplash.com/photo-1593164842264-854604db2260?w=100",
      },
    ],
    discount: 0,
    coupon: undefined,
    paymentType: "cod",
    status: "delivered",
    createdAtOffsetHours: 24,
  },
  {
    orderNumber: "ORD-000004",
    customer: { name: "Nadia Akter", phone: "+8801612345678", address: "Rajshahi, Bangladesh" },
    items: [
      {
        productSlug: "black-seed-oil",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100",
      },
    ],
    discount: 0,
    coupon: undefined,
    paymentType: "cod",
    status: "cancelled",
    createdAtOffsetHours: 48,
  },
];

const run = async () => {
  await connectDB();

  const productSlugs = sampleOrders.flatMap((order) => order.items.map((item) => item.productSlug));
  const products = await Product.find({ slug: { $in: productSlugs } }).lean();
  const productBySlug = new Map(products.map((product) => [product.slug, product]));

  const ordersToInsert = [];

  for (const order of sampleOrders) {
    const existing = await Order.findOne({ orderNumber: order.orderNumber }).lean();
    if (existing) continue;

    const items = order.items.map((item) => {
      const product = productBySlug.get(item.productSlug);
      if (!product) {
        throw new Error(`Product not found for slug: ${item.productSlug}`);
      }
      return {
        product: product._id,
        productName: product.name,
        price: product.price,
        quantity: item.quantity,
        image: item.image || product.images?.[0] || "",
      };
    });

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = order.discount || 0;
    const total = Math.max(0, subtotal - discount);

    const createdAt = new Date(Date.now() - order.createdAtOffsetHours * 60 * 60 * 1000);

    ordersToInsert.push({
      orderNumber: order.orderNumber,
      customer: order.customer,
      items,
      subtotal,
      discount,
      coupon: order.coupon,
      total,
      paymentType: order.paymentType,
      status: order.status,
      createdAt,
      updatedAt: createdAt,
    });
  }

  if (ordersToInsert.length) {
    await Order.insertMany(ordersToInsert);
  }

  const maxOrderNumber = Math.max(
    0,
    ...sampleOrders.map((order) => Number(order.orderNumber.replace("ORD-", "")) || 0),
  );

  if (maxOrderNumber > 0) {
    await OrderCounter.findOneAndUpdate(
      { _id: "orderNumber" },
      { $set: { seq: maxOrderNumber } },
      { upsert: true },
    );
  }

  console.log(`Seeded orders: ${ordersToInsert.length}`);
  process.exit(0);
};

run().catch((error) => {
  console.error("Failed to seed orders", error);
  process.exit(1);
});
