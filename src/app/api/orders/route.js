import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/permissions";
import Order from "@/models/Order";
import { notifyAdminOrderPlaced, notifyCustomerOrderPlaced } from "@/lib/notifications";
import { generateUniqueOrderNumber } from "@/lib/orderNumber";

const normalizeItems = (items = []) =>
  items
    .map((item) => {
      const product = item.productId || item.product || item.id;
      const productName = item.productName || item.name || "Item";
      const price = Number(item.price || 0);
      const quantity = Math.max(1, Number(item.quantity || 1));
      return {
        product,
        productName,
        price,
        quantity,
        image: item.image || "",
      };
    })
    .filter((item) => item.product && item.price >= 0 && item.quantity >= 1);

export async function GET(req) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json(
      { error: auth.status === 401 ? "Unauthorized" : "Forbidden" },
      { status: auth.status },
    );
  }

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.max(1, Number(searchParams.get("limit") || 20));
    const skip = (page - 1) * limit;

    const total = await Order.countDocuments({});
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const normalized = orders.map((order) => ({
      id: order._id.toString(),
      orderNumber: order.orderNumber,
      customer: order.customer,
      items: order.items,
      subtotal: order.subtotal,
      discount: order.discount || 0,
      coupon: order.coupon,
      shipping: order.shipping || 0,
      total: order.total,
      paymentType: order.paymentType,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return NextResponse.json({
      orders: normalized,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    console.error("GET /api/orders failed:", error);
    return NextResponse.json({ error: "Failed to load orders" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const customer = body?.customer || {};
    const items = normalizeItems(body?.items || []);
    const paymentType = body?.paymentType === "online" ? "online" : "cod";

    if (!customer.name || !customer.phone || !customer.address) {
      return NextResponse.json(
        { error: "Name, phone, and address are required." },
        { status: 400 },
      );
    }

    if (items.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    await connectDB();

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = Math.max(0, Number(body?.shipping || 0));
    const discount = 0;
    const total = Math.max(0, subtotal + shipping - discount);

    const orderNumber = await generateUniqueOrderNumber();

    const order = await Order.create({
      orderNumber,
      customer: {
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        city: customer.city || "",
        note: customer.note || "",
      },
      items,
      subtotal,
      discount,
      coupon: undefined,
      shipping,
      total,
      paymentType,
      status: "pending",
    });

    const notificationPayload = {
      orderId: order._id.toString(),
      orderNumber: order.orderNumber,
      customerName: order.customer.name,
      phone: order.customer.phone,
      total: order.total,
      paymentMethod: paymentType === "online" ? "Online" : "COD",
    };

    try {
      await notifyAdminOrderPlaced(notificationPayload);
      await notifyCustomerOrderPlaced({
        ...notificationPayload,
        supportContact: "+8801234567890",
      });
    } catch (notifyError) {
      console.error("Order notification failed:", notifyError);
    }

    return NextResponse.json({
      success: true,
      orderId: order._id.toString(),
      orderNumber: order.orderNumber,
      status: order.status,
      total: order.total,
      paymentMethod: paymentType === "online" ? "Online" : "COD",
    });
  } catch (error) {
    console.error("POST /api/orders failed:", error);
    return NextResponse.json({ error: "Failed to place order." }, { status: 500 });
  }
}
