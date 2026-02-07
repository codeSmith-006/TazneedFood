"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HomeOutlined,
  MinusOutlined,
  PlusOutlined,
  WhatsAppOutlined,
  MessageOutlined,
  SafetyCertificateOutlined,
  CarOutlined,
  ShoppingCartOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/contexts/CartContext";
import useRecentlyViewed from "@/hooks/useRecentlyViewed";

const ProductPage = ({ product, currentCategory, relatedProducts = [] }) => {
  const { addItem, openCart } = useCartContext();
  const { products: recentlyViewed, addProduct } = useRecentlyViewed();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1000);
  const [showCalculated, setShowCalculated] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(true);

  useEffect(() => {
    if (product) {
      addProduct(product);
    }
  }, [product, addProduct]);

  if (!product || !currentCategory) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/" className="btn-hero-primary px-6 py-3 rounded-lg inline-block">
              Go Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate price per gram based on 1000g base
  const pricePerGram = product.price / 1000;
  const calculatedPrice = Math.round(pricePerGram * quantity);
  const savings = product.oldPrice ? product.oldPrice - product.price : 0;
  const filteredRecentlyViewed = recentlyViewed.filter((item) => item.id !== product.id).slice(0, 4);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setQuantity(value);
    setShowCalculated(false);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 100);
    setShowCalculated(false);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(100, prev - 100));
    setShowCalculated(false);
  };

  const handleCalculatePrice = () => {
    if (quantity > 0) {
      setShowCalculated(true);
    }
  };

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: calculatedPrice,
        quantity: quantity,
        image: product.images[0],
      },
      1
    );
    openCart();
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${product.name} - ${quantity}gm (৳${calculatedPrice})`;
    window.open(`https://wa.me/8801234567890?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleMessenger = () => {
    const message = `Hi, I'm interested in ${product.name} - ${quantity}gm (৳${calculatedPrice})`;
    window.open(`https://m.me/yourpage?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="bg-secondary/50 py-3 sm:py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-xs sm:text-sm overflow-x-auto">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                <HomeOutlined />
              </Link>
              <span className="text-muted-foreground shrink-0">/</span>
              <Link
                href={`/collections/${currentCategory.slug}`}
                className="text-muted-foreground hover:text-foreground transition-colors truncate"
              >
                {currentCategory.name}
              </Link>
              <span className="text-muted-foreground shrink-0">/</span>
              <span className="text-foreground font-medium truncate">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Section */}
        <section className="py-6 sm:py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-3 sm:gap-4 lg:sticky lg:top-4 lg:self-start"
              >
                {/* Thumbnail Column */}
                <div className="flex flex-col gap-2 sm:gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${selectedImage === index
                        ? "border-primary shadow-md scale-105"
                        : "border-transparent hover:border-border opacity-70 hover:opacity-100"
                        }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Image - Fixed Height */}
                <div className="flex-1 rounded-xl overflow-hidden bg-secondary shadow-sm">
                  <div className="w-full aspect-square">
                    <motion.img
                      key={selectedImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
              {/* Product Info */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 sm:space-y-6">
                {/* Title & Price */}
                <div>
                  <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                    {product.name}
                  </h1>

                  {/* Base Price Info */}
                  <div className="bg-secondary/50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm text-muted-foreground font-medium">Base Price (1000g):</span>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-2xl sm:text-3xl font-bold text-primary">৳{product.price}</span>
                        {product.oldPrice && (
                          <span className="text-base sm:text-lg text-muted-foreground line-through opacity-60">
                            ৳{product.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    {savings > 0 && (
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-muted-foreground">You Save:</span>
                        <span className="font-semibold text-green-600">৳{savings}</span>
                      </div>
                    )}
                  </div>

                  <p className={`text-sm font-medium flex items-center gap-2 ${product.inStock ? "text-green-600" : "text-destructive"}`}>
                    {product.inStock ? (
                      <>
                        <span className="inline-block w-2 h-2 rounded-full bg-green-600"></span>
                        In Stock - Ready to Ship
                      </>
                    ) : (
                      <>
                        <span className="inline-block w-2 h-2 rounded-full bg-destructive"></span>
                        Out of Stock
                      </>
                    )}
                  </p>
                </div>

                {/* Quantity Calculator */}
                {product.inStock && (
                  <div className="bg-card border border-border rounded-xl p-4 sm:p-5 space-y-4">
                    <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">
                      Calculate Your Price
                    </h3>

                    {/* Quantity Input */}
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-foreground">Enter Amount (grams):</label>
                      <div className="flex items-center border-2 border-border rounded-lg overflow-hidden bg-background">
                        <button
                          onClick={decrementQuantity}
                          className="px-3 sm:px-4 py-3 hover:bg-secondary transition-colors active:bg-secondary/80"
                        >
                          <MinusOutlined className="text-sm sm:text-base" />
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={handleQuantityChange}
                          className="flex-1 text-center py-3 text-base sm:text-lg font-semibold bg-transparent outline-none min-w-0"
                          min="100"
                          step="100"
                        />
                        <button
                          onClick={incrementQuantity}
                          className="px-3 sm:px-4 py-3 hover:bg-secondary transition-colors active:bg-secondary/80"
                        >
                          <PlusOutlined className="text-sm sm:text-base" />
                        </button>
                        <div className="px-3 sm:px-4 py-3 bg-secondary text-sm sm:text-base font-medium text-foreground">
                          gm
                        </div>
                      </div>
                    </div>

                    {/* Calculate Button */}
                    <Button
                      onClick={handleCalculatePrice}
                      className="w-full bg-secondary hover:bg-secondary/80 text-foreground py-5 sm:py-6 text-sm sm:text-base font-semibold"
                    >
                      Calculate Price
                    </Button>

                    {/* Calculated Price Display */}
                    <AnimatePresence>
                      {showCalculated && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, scale: 0.95 }}
                          animate={{ opacity: 1, height: "auto", scale: 1 }}
                          exit={{ opacity: 0, height: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/30 rounded-lg p-4 sm:p-5">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="text-xs sm:text-sm text-muted-foreground font-medium">Total for {quantity}gm:</p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  (৳{pricePerGram.toFixed(2)}/gm)
                                </p>
                              </div>
                              <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                              >
                                <p className="text-3xl sm:text-4xl font-bold text-primary">৳{calculatedPrice}</p>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="w-full btn-hero-gold py-5 sm:py-6 text-base sm:text-lg font-semibold shadow-md hover:shadow-lg transition-shadow"
                  >
                    <ShoppingCartOutlined className="mr-2 text-lg sm:text-xl" />
                    Add to Cart ({quantity}gm - ৳{showCalculated ? calculatedPrice : "Calculate"})
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={handleWhatsApp}
                      className="py-4 sm:py-5 text-sm sm:text-base hover:bg-green-50 hover:border-green-500 hover:text-green-700 transition-colors"
                    >
                      <WhatsAppOutlined className="mr-2 text-base sm:text-lg" />
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleMessenger}
                      className="py-4 sm:py-5 text-sm sm:text-base hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700 transition-colors"
                    >
                      <MessageOutlined className="mr-2 text-base sm:text-lg" />
                      Messenger
                    </Button>
                  </div>

                  <Button variant="outline" className="w-full py-4 sm:py-5 text-sm sm:text-base">
                    <SafetyCertificateOutlined className="mr-2 text-base sm:text-lg" />
                    Cash on Delivery Available
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 py-4 border-t border-border">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground bg-secondary/30 rounded-lg p-2 sm:p-3">
                    <CarOutlined className="text-primary text-base sm:text-lg" />
                    <span>Free delivery over ৳1000</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground bg-secondary/30 rounded-lg p-2 sm:p-3">
                    <SafetyCertificateOutlined className="text-primary text-base sm:text-lg" />
                    <span>100% Authentic</span>
                  </div>
                </div>

                {/* Description Section */}
                <div className="border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setDescriptionOpen(!descriptionOpen)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">Description</h3>
                    {descriptionOpen ? <UpOutlined className="text-sm" /> : <DownOutlined className="text-sm" />}
                  </button>
                  <AnimatePresence>
                    {descriptionOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 sm:p-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {product.description}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Product Details Section */}
                <div className="border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setDetailsOpen(!detailsOpen)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">Product Details</h3>
                    {detailsOpen ? <UpOutlined className="text-sm" /> : <DownOutlined className="text-sm" />}
                  </button>
                  <AnimatePresence>
                    {detailsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 sm:p-5">
                          <ul className="space-y-2 sm:space-y-3">
                            {product.details.map((detail, index) => (
                              <li key={index} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-muted-foreground">
                                <span className="text-primary mt-1 text-base sm:text-lg">✓</span>
                                <span className="flex-1">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-8 sm:py-12 bg-secondary/50">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6 sm:mb-8">
                You Might Also Like
              </h2>
              <ProductGrid products={relatedProducts} columns={4} />
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {filteredRecentlyViewed.length > 0 && (
          <section className="py-8 sm:py-12 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6 sm:mb-8">
                Recently Viewed
              </h2>
              <ProductGrid products={filteredRecentlyViewed} columns={4} />
            </div>
          </section>
        )}
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.name,
            image: product.images,
            description: product.description,
            offers: {
              "@type": "Offer",
              priceCurrency: "BDT",
              price: product.price,
              availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            },
          }),
        }}
      />
    </div>
  );
};

export default ProductPage;
