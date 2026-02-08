"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseOutlined, DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
const CartDrawer = () => {
    const { items, isOpen, closeCart, subtotal, updateQuantity, removeItem } = useCartContext();
    return (<AnimatePresence>
      {isOpen && (<>
          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeCart} className="fixed inset-0 bg-foreground/50 z-50"/>

          {/* Drawer */}
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card z-50 flex flex-col shadow-xl">
            {/* Header */}
            <div className="flex mt-24 items-center gap-2 p-4 border-b border-border sticky top-0 bg-card z-10 md:static">
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
              >
                <CloseOutlined />
              </button>
              <h2 className="font-display text-xl font-semibold flex-1 md:flex-none">
                Your Cart
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="hidden md:inline-flex w-10 h-10 items-center justify-center rounded-lg hover:bg-secondary transition-colors"
              >
                <CloseOutlined />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (<div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <span className="text-3xl">🛒</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground text-sm">
                    Add some products to get started
                  </p>
                </div>) : (<div className="space-y-4">
                  {items.map((item) => (<motion.div key={item.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }} className="flex gap-4 p-3 bg-secondary/50 rounded-lg">
                      {/* Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover"/>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                        <p className="text-primary font-semibold mt-1">৳{item.price}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                            <MinusOutlined className="text-xs"/>
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                            <PlusOutlined className="text-xs"/>
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <DeleteOutlined />
                      </button>
                    </motion.div>))}
                </div>)}
            </div>

            {/* Footer */}
            {items.length > 0 && (<div className="border-t border-border p-4 space-y-4">
                {/* Coupon */}
                <div className="flex gap-2">
                  <Input placeholder="Coupon code" className="flex-1"/>
                  <Button variant="outline" size="sm">
                    Apply
                  </Button>
                </div>

                {/* Order Note */}
                <div>
                  <Input placeholder="Order note (optional)"/>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-display text-xl font-bold">৳{subtotal}</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button className="w-full btn-hero-gold">
                    Pay Online
                  </Button>
                  <Button variant="outline" className="w-full">
                    Cash on Delivery
                  </Button>
                </div>
              </div>)}
          </motion.div>
        </>)}
    </AnimatePresence>);
};
export default CartDrawer;
