"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HomeOutlined } from "@ant-design/icons";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

const CollectionPage = ({
  categorySlug,
  currentCategory,
  categories,
  initialProducts,
  initialTotal,
  initialMaxPrice,
}) => {
  const [priceRange, setPriceRange] = useState([0, initialMaxPrice || 0]);
  const [showInStock, setShowInStock] = useState(false);
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [products, setProducts] = useState(initialProducts || []);
  const [total, setTotal] = useState(initialTotal || 0);
  const [isLoading, setIsLoading] = useState(false);

  const buildQuery = useCallback(() => {
    const params = new URLSearchParams();
    if (categorySlug) params.set("category", categorySlug);
    if (priceRange[0] > 0) params.set("minPrice", String(priceRange[0]));
    if (priceRange[1] > 0) params.set("maxPrice", String(priceRange[1]));

    if (showInStock && !showOutOfStock) params.set("inStock", "true");
    if (!showInStock && showOutOfStock) params.set("inStock", "false");

    params.set("page", "1");
    params.set("limit", "12");
    return params.toString();
  }, [categorySlug, priceRange, showInStock, showOutOfStock]);

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      setIsLoading(true);
      const query = buildQuery();
      const response = await fetch(`/api/products?${query}`);
      if (response.ok && isMounted) {
        const data = await response.json();
        setProducts(data.products || []);
        setTotal(data.total || 0);
      }
      if (isMounted) setIsLoading(false);
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [buildQuery]);

  const productCountLabel = useMemo(() => {
    const count = total || products.length;
    return `Showing ${count} product${count !== 1 ? "s" : ""}`;
  }, [total, products.length]);

  if (!currentCategory) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-6">The category you&apos;re looking for doesn&apos;t exist.</p>
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
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/collections/${category.slug}`}
                          className={`block py-1.5 px-3 rounded-lg text-sm transition-colors ${
                            category.slug === categorySlug
                              ? "bg-accent text-accent-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                          }`}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="filter-section">
                  <h3 className="filter-title">Availability</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox checked={showInStock} onCheckedChange={(checked) => setShowInStock(Boolean(checked))} />
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
                      max={initialMaxPrice}
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
                <p className="text-muted-foreground text-sm">{productCountLabel}</p>
                {isLoading && <span className="text-xs text-muted-foreground">Loading...</span>}
              </div>
              <ProductGrid products={products} columns={3} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CollectionPage;
