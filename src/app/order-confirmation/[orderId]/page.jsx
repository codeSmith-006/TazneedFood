import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import mongoose from "mongoose";

const ESTIMATED_DELIVERY = "2-3 business days";

async function getOrder(orderId) {
  await connectDB();
  const idParam = orderId ? String(orderId) : "";

  let order = null;
  if (mongoose.Types.ObjectId.isValid(idParam)) {
    order = await Order.findById(idParam).lean();
  }

  if (!order) {
    order = await Order.findOne({ orderNumber: idParam }).lean();
  }

  return order;
}

export default async function OrderConfirmationPage({ params }) {
  const resolvedParams = await params;
  const order = await getOrder(resolvedParams?.orderId);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-background">
          <div className="container mx-auto px-4 py-10 text-center">
            <h1 className="font-display text-2xl font-bold text-foreground">
              Order not found
            </h1>
            <p className="text-muted-foreground mt-2">
              We could not locate this order. Please contact support if you believe this is an error.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const paymentLabel = order.paymentType === "online" ? "Online Payment" : "Cash on Delivery";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center">
              <div className="text-3xl mb-2">✅</div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Order placed successfully
              </h1>
              <p className="text-muted-foreground mt-2">
                Our team will contact you shortly to confirm your order.
              </p>
              <div className="mt-4 text-sm text-muted-foreground">
                Order ID: <span className="font-medium text-foreground">{order.orderNumber}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Order Summary
              </h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={`${item.product}-${item.productName}`} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg bg-secondary overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-1">
                        {item.productName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-foreground">৳{item.price}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">৳{order.subtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">৳{order.shipping || 0}</span>
                </div>
                <div className="flex items-center justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>৳{order.total}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Delivery Details
              </h2>
              <div className="text-sm text-muted-foreground space-y-1">
                <p className="text-foreground font-medium">{order.customer?.name}</p>
                <p>{order.customer?.phone}</p>
                <p>{order.customer?.address}</p>
                {order.customer?.city ? <p>{order.customer.city}</p> : null}
                {order.customer?.note ? (
                  <p className="text-xs text-muted-foreground">
                    Note: {order.customer.note}
                  </p>
                ) : null}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Payment method</span>
                <span className="font-medium text-foreground">{paymentLabel}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estimated delivery</span>
                <span className="font-medium text-foreground">{ESTIMATED_DELIVERY}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
