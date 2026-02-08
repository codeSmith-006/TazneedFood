"use client";

import React from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { useCartContext } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCartContext();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6">Your Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Your cart is empty.</p>
              <Link href="/products" className="inline-block mt-4 btn-hero-gold px-6 py-2 rounded-lg">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-card rounded-xl shadow-soft">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                      <p className="text-primary font-semibold mt-1">৳{item.price}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <MinusOutlined className="text-xs" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <PlusOutlined className="text-xs" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove item"
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-card rounded-xl p-5 shadow-soft h-fit">
                <h2 className="font-display text-lg font-semibold mb-4">Summary</h2>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">৳{subtotal}</span>
                </div>
                <div className="flex items-center justify-between text-base font-semibold mb-4">
                  <span>Total</span>
                  <span>৳{subtotal}</span>
                </div>
                <Button className="w-full btn-hero-gold" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
