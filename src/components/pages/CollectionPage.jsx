"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { HomeOutlined } from "@ant-design/icons";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { categories, getProductsByCategory, getCategoryBySlug, getMaxPrice } from "@/lib/data";

const CollectionPage = () => {
  const params = useParams();
  const category = params?.category ? String(params.category) : "";
  const currentCategory = getCategoryBySlug(category);
  const categoryProducts = getProductsByCategory(category);
  const maxProductPrice = getMaxPrice();

  const [priceRange, setPriceRange] = useState([0, maxProductPrice]);
  const [showInStock, setShowInStock] = useState(false);
  const [showOutOfStock, setShowOutOfStock] = useState(false);

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      if (showInStock && !product.inStock) return false;
      if (showOutOfStock && product.inStock) return false;
      return true;
    });
  }, [categoryProducts, priceRange, showInStock, showOutOfStock]);

  if (!currentCategory) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">
              Category Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The category you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/" className="btn-hero-primary px-6 py-3 rounded-lg inline-block">
              Go Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        <div className="bg-secondary/50 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                <HomeOutlined />
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{currentCategory.name}</span>
            </nav>
          </div>
        </div>

        <div className="py-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            {currentCategory.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            {currentCategory.description}
          </motion.p>
        </div>

        <div className="container mx-auto px-4 pb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-24 bg-card rounded-xl p-6 shadow-soft">
                <div className="filter-section">
                  <h3 className="filter-title">Collections</h3>
                  <ul className="space-y-2">
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <Link
                          href={`/collections/${cat.slug}`}
                          className={`block py-1.5 px-3 rounded-lg text-sm transition-colors ${
                            cat.slug === category
                              ? "bg-accent text-accent-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                          }`}
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="filter-section">
                  <h3 className="filter-title">Availability</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={showInStock}
                        onCheckedChange={(checked) => setShowInStock(Boolean(checked))}
                      />
                      <span className="text-sm">In Stock</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={showOutOfStock}
                        onCheckedChange={(checked) => setShowOutOfStock(Boolean(checked))}
                      />
                      <span className="text-sm">Out of Stock</span>
                    </label>
                  </div>
                </div>

                <div className="filter-section border-b-0">
                  <h3 className="filter-title">Price Range</h3>
                  <div className="pt-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={maxProductPrice}
                      step={50}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>৳{priceRange[0]}</span>
                      <span>৳{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-muted-foreground text-sm">
                  Showing {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? "s" : ""}
                </p>
              </div>
              <ProductGrid products={filteredProducts} columns={3} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CollectionPage;
