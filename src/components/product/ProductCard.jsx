"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCartOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useCartContext } from "@/contexts/CartContext";
import Image from "next/image";

const ProductCard = ({ product, index = 0 }) => {
  const { addItem, openCart } = useCartContext();
  const [quantity, setQuantity] = useState(1000);
  const [showCalculated, setShowCalculated] = useState(false);

  // Calculate price per gram
  const pricePerGram = product.price / 1000; // Assuming base price is for 1000g
  const calculatedPrice = Math.round(pricePerGram * quantity);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setQuantity(value);
    setShowCalculated(false);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 50);
    setShowCalculated(false);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(50, prev - 50));
    setShowCalculated(false);
  };

  const handleCalculatePrice = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > 0) {
      setShowCalculated(true);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: calculatedPrice,
      quantity: quantity,
      image: product.images[0],
    });
    openCart();
  };

  const savings = product.oldPrice ? product.oldPrice - product.price : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-full"
    >
      <div className="product-card group h-full flex flex-col bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Image Section */}
        <Link href={`/collections/${product.categorySlug}/${product.slug}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-secondary">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
              {product.isBestSeller && (
                <span className="bg-primary text-primary-foreground text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded shadow-sm">
                  Best Seller
                </span>
              )}
              {product.isOffer && savings > 0 && (
                <span className="bg-accent text-accent-foreground text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded shadow-sm">
                  Save ৳{savings}
                </span>
              )}
            </div>

            {/* Out of Stock Overlay */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center z-20">
                <span className="bg-card text-card-foreground font-semibold px-4 py-2 rounded shadow-lg">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </Link>

        {/* Content Section */}
        <div className="flex-1 flex flex-col p-3 sm:p-4">
          {/* Product Name */}
          <Link href={`/collections/${product.categorySlug}/${product.slug}`}>
            <h3 className="font-display text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
              {product.name}
            </h3>
          </Link>

          {/* Base Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs sm:text-sm text-muted-foreground">Base (1000g):</span>
            <span className="font-semibold text-sm sm:text-base text-foreground">৳{product.price}</span>
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">৳{product.oldPrice}</span>
            )}
          </div>

          {/* Quantity Calculator */}
          {product.inStock && (
            <div className="mt-auto space-y-2.5">
              {/* Quantity Input with +/- Buttons */}
              <div className="flex items-center gap-2">
                <label className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap">
                  Amount:
                </label>
                <div className="flex items-center flex-1 border border-border rounded-lg overflow-hidden bg-background">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      decrementQuantity();
                    }}
                    className="px-2 sm:px-3 py-2 hover:bg-secondary transition-colors active:bg-secondary/80"
                    type="button"
                  >
                    <MinusOutlined className="text-xs" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 text-center py-2 text-sm font-medium bg-transparent outline-none border-x border-border min-w-0"
                    min="50"
                    step="50"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      incrementQuantity();
                    }}
                    className="px-2 sm:px-3 py-2 hover:bg-secondary transition-colors active:bg-secondary/80"
                    type="button"
                  >
                    <PlusOutlined className="text-xs" />
                  </button>
                  <span className="px-2 text-xs font-medium text-muted-foreground bg-secondary">gm</span>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={handleCalculatePrice}
                className="w-full py-2 sm:py-2.5 bg-secondary hover:bg-secondary/80 text-foreground font-medium rounded-lg transition-colors text-xs sm:text-sm active:scale-98"
                type="button"
              >
                Calculate Price
              </button>

              {/* Calculated Price Display with Animation */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: showCalculated ? 1 : 0,
                  height: showCalculated ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-2.5 sm:p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-medium text-foreground">
                      Total for {quantity}gm:
                    </span>
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="text-base sm:text-lg font-bold text-primary"
                    >
                      ৳{calculatedPrice}
                    </motion.span>
                  </div>
                </div>
              </motion.div>

              {/* Add to Cart Button - Always Visible */}
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-hero-gold py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold shadow-sm"
                type="button"
              >
                <ShoppingCartOutlined className="text-sm sm:text-base" />
                Add to Cart
              </motion.button>
            </div>
          )}

          {/* Out of Stock Button */}
          {!product.inStock && (
            <button
              disabled
              className="w-full py-2.5 sm:py-3 bg-muted text-muted-foreground rounded-lg text-xs sm:text-sm font-semibold cursor-not-allowed mt-auto"
            >
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;