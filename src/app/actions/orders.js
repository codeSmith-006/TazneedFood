"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/permissions";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getOrderAnalytics as getOrderAnalyticsUtil } from "@/lib/orderAnalytics";
import { generateUniqueOrderNumber } from "@/lib/orderNumber";

export async function createOrder(orderData) {
  await connectDB();

  const customer = orderData?.customer || {};
  const items = Array.isArray(orderData?.items) ? orderData.items : [];
  const paymentType = orderData?.paymentType === "online" ? "online" : "cod";
  const coupon = orderData?.coupon || undefined;

  if (!customer.name || !customer.phone || !customer.address) {
    throw new Error("Invalid customer information");
  }

  if (items.length === 0) {
    throw new Error("Order items are required");
  }

  const productIds = items.map((item) => item.productId || item.product).filter(Boolean);
  if (productIds.length === 0) {
    throw new Error("Order items are invalid");
  }

  const products = await Product.find({ _id: { $in: productIds } }).lean();
  const productById = new Map(products.map((product) => [product._id.toString(), product]));

  const normalizedItems = items.map((item) => {
    const productId = item.productId || item.product;
    const product = productById.get(String(productId));
    if (!product) {
      throw new Error("Product not found for order item");
    }
    const quantity = Math.max(1, Number(item.quantity || 1));
    return {
      product: product._id,
      productName: product.name,
      price: product.price,
      quantity,
      image: product.images?.[0] || "",
    };
  });

  const subtotal = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0;
  const total = Math.max(0, subtotal - discount);

  const orderNumber = await generateUniqueOrderNumber();

  const order = await Order.create({
    orderNumber,
    customer: {
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
    },
    items: normalizedItems,
    subtotal,
    discount,
    coupon,
    total,
    paymentType,
    status: "pending",
  });

  return {
    id: order._id.toString(),
    orderNumber: order.orderNumber,
    status: order.status,
  };
}

export async function updateOrderStatus(orderId, status) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    throw new Error(auth.status === 401 ? "Unauthorized" : "Forbidden");
  }

  const allowedStatuses = ["pending", "confirmed", "delivered", "cancelled"];
  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid order status");
  }

  await connectDB();
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  const transitions = {
    pending: new Set(["confirmed", "cancelled"]),
    confirmed: new Set(["delivered", "cancelled"]),
    delivered: new Set([]),
    cancelled: new Set([]),
  };

  if (order.status !== status && !transitions[order.status]?.has(status)) {
    throw new Error(`Invalid status transition from ${order.status} to ${status}`);
  }

  order.status = status;
  await order.save();

  revalidatePath("/admin/orders");
  revalidatePath("/admin/dashboard");

  return { id: order._id.toString(), status: order.status };
}

export async function deleteOrder(orderId) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    throw new Error(auth.status === 401 ? "Unauthorized" : "Forbidden");
  }

  await connectDB();
  const deleted = await Order.findByIdAndDelete(orderId);
  if (!deleted) {
    throw new Error("Order not found");
  }

  revalidatePath("/admin/orders");
  revalidatePath("/admin/dashboard");

  return { id: orderId };
}

export async function getOrderAnalytics() {
  const auth = await requireAdmin();
  if (!auth.ok) {
    throw new Error(auth.status === 401 ? "Unauthorized" : "Forbidden");
  }

  await connectDB();
  return getOrderAnalyticsUtil();
}
