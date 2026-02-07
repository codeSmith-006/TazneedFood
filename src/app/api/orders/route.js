import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/permissions";
import Order from "@/models/Order";

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
