import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/permissions";
import Order from "@/models/Order";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json(
      { error: auth.status === 401 ? "Unauthorized" : "Forbidden" },
      { status: auth.status },
    );
  }

  try {
    await connectDB();
    const idParam = params?.id ? String(params.id) : "";

    let order = null;
    if (mongoose.Types.ObjectId.isValid(idParam)) {
      order = await Order.findById(idParam).lean();
    }

    if (!order) {
      order = await Order.findOne({ orderNumber: idParam }).lean();
    }

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const normalized = {
      id: order._id.toString(),
      orderNumber: order.orderNumber,
      customer: order.customer,
      items: order.items,
      subtotal: order.subtotal,
      discount: order.discount || 0,
      coupon: order.coupon,
      total: order.total,
      paymentType: order.paymentType,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };

    return NextResponse.json({ order: normalized });
  } catch (error) {
    console.error("GET /api/orders/[id] failed:", error);
    return NextResponse.json({ error: "Failed to load order" }, { status: 500 });
  }
}
