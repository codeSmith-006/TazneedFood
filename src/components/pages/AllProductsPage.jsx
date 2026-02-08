"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";

const AllProductsPage = ({ categories, initialProducts, initialTotal, initialMaxPrice }) => {
  const [priceRange, setPriceRange] = useState([0, initialMaxPrice || 0]);
  const [showInStock, setShowInStock] = useState(false);
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [products, setProducts] = useState(initialProducts || []);
  const [total, setTotal] = useState(initialTotal || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const buildQuery = useCallback(() => {
    const params = new URLSearchParams();
    if (priceRange[0] > 0) params.set("minPrice", String(priceRange[0]));
    if (priceRange[1] > 0) params.set("maxPrice", String(priceRange[1]));

    if (showInStock && !showOutOfStock) params.set("inStock", "true");
    if (!showInStock && showOutOfStock) params.set("inStock", "false");

    params.set("page", "1");
    params.set("limit", "12");
    return params.toString();
  }, [priceRange, showInStock, showOutOfStock]);

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

  const FiltersPanel = () => (
    <div className="bg-card rounded-xl p-6 shadow-soft">
      <div className="filter-section">
        <h3 className="filter-title">Collections</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/collections/${category.slug}`}
                className="block py-1.5 px-3 rounded-lg text-sm transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary"
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
            <Checkbox checked={showOutOfStock} onCheckedChange={(checked) => setShowOutOfStock(Boolean(checked))} />
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
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        <div className="py-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3"
          >
            All Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Browse everything we offer, all in one place.
          </motion.p>
        </div>

        <div className="container mx-auto px-4 pb-24">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-64 flex-shrink-0 hidden lg:block">
              <div className="sticky top-24">
                <FiltersPanel />
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

      <button
        type="button"
        onClick={() => setMobileFiltersOpen(true)}
        className="md:hidden fixed left-3 bottom-24 z-40 bg-card border border-border shadow-md px-3 py-2 rounded-full text-xs font-semibold"
      >
        Filters
      </button>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-card z-50 md:hidden shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-display text-lg font-semibold">Filters</span>
                <button
                  className="p-2 hover:bg-secondary rounded-lg"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <FiltersPanel />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllProductsPage;
