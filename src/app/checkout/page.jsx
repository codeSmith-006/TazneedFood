"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { useCartContext } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const SHIPPING_COST = 0;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartContext();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    note: "",
    paymentType: "cod",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const total = useMemo(() => Math.max(0, subtotal + SHIPPING_COST), [subtotal]);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Full name is required.";
    if (!form.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!form.address.trim()) nextErrors.address = "Address is required.";
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (items.length === 0) {
      setSubmitError("Your cart is empty. Please add items before checkout.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.name.trim(),
            phone: form.phone.trim(),
            address: form.address.trim(),
            city: form.city.trim(),
            note: form.note.trim(),
          },
          items: items.map((item) => ({
            id: item.id,
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          paymentType: form.paymentType,
          shipping: SHIPPING_COST,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to place order.");
      }

      clearCart();
      router.push(`/order-confirmation/${data.orderId}`);
    } catch (error) {
      setSubmitError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-6 sm:py-10">
          <div className="mb-6 sm:mb-10">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Checkout
            </h1>
            <p className="text-muted-foreground">
              Complete your order with Cash on Delivery.
            </p>
          </div>

          {submitError && (
            <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {submitError}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-5 sm:p-6 space-y-4">
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Customer Information
                </h2>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={handleChange("name")}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    placeholder="01XXXXXXXXX"
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea
                    id="address"
                    value={form.address}
                    onChange={handleChange("address")}
                    placeholder="House, road, area, landmarks"
                    rows={3}
                  />
                  {errors.address && (
                    <p className="text-xs text-destructive">{errors.address}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City / Area</Label>
                  <Input
                    id="city"
                    value={form.city}
                    onChange={handleChange("city")}
                    placeholder="City or area"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Delivery Note (optional)</Label>
                  <Textarea
                    id="note"
                    value={form.note}
                    onChange={handleChange("note")}
                    placeholder="Any delivery instructions"
                    rows={2}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 sm:p-6 space-y-4">
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 rounded-lg border border-border p-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentType"
                      value="cod"
                      checked={form.paymentType === "cod"}
                      onChange={handleChange("paymentType")}
                    />
                    <div>
                      <p className="font-medium text-foreground">Cash on Delivery</p>
                      <p className="text-xs text-muted-foreground">
                        Pay in cash when your order arrives.
                      </p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 rounded-lg border border-border p-3 opacity-60 cursor-not-allowed">
                    <input type="radio" name="paymentType" value="online" disabled />
                    <div>
                      <p className="font-medium text-foreground">Online Payment</p>
                      <p className="text-xs text-muted-foreground">
                        Coming soon.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full btn-hero-gold h-12 text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Placing Order..." : "Confirm Order (Cash on Delivery)"}
              </Button>
            </form>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                  Order Summary
                </h2>
                {items.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Your cart is empty.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-lg bg-secondary overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                          ৳{item.price}
                        </p>
                      </div>
                    ))}

                    <div className="border-t border-border pt-4 space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">৳{subtotal}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium">৳{SHIPPING_COST}</span>
                      </div>
                      <div className="flex items-center justify-between text-base font-semibold">
                        <span>Total</span>
                        <span>৳{total}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
                By placing your order, you agree that our team will contact you to confirm delivery details.
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
