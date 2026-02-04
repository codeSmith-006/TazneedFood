"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCartContext } from "@/contexts/CartContext";

const ProductCard = ({ product, index = 0 }) => {
  const { addItem, openCart } = useCartContext();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
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
    >
      <Link href={`/collections/${product.categorySlug}/${product.slug}`}>
        <div className="product-card group cursor-pointer">
          <div className="relative aspect-square overflow-hidden bg-secondary">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isBestSeller && (
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
                  Best Seller
                </span>
              )}
              {product.isOffer && savings > 0 && (
                <span className="bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded">
                  Save ৳{savings}
                </span>
              )}
            </div>

            {!product.inStock && (
              <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                <span className="bg-card text-card-foreground font-semibold px-4 py-2 rounded">Out of Stock</span>
              </div>
            )}

            {product.inStock && (
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <button
                  onClick={handleAddToCart}
                  className="w-full btn-hero-gold py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm"
                >
                  <ShoppingCartOutlined />
                  Quick Add
                </button>
              </div>
            )}
          </div>

          <div className="p-4">
            <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>

            <div className="mt-2 flex items-center gap-2">
              <span className="price-current">৳{product.price}</span>
              {product.oldPrice && <span className="price-old">৳{product.oldPrice}</span>}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
