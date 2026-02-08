"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ProductGrid from "@/components/product/ProductGrid";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        if (isMounted) setProducts([]);
        return;
      }
      setIsLoading(true);
      const response = await fetch(`/api/products?search=${encodeURIComponent(query)}&limit=12`);
      if (response.ok && isMounted) {
        const data = await response.json();
        setProducts(data.products || []);
      }
      if (isMounted) setIsLoading(false);
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-xl mx-auto text-center mb-8">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">Search</h1>
            <p className="text-muted-foreground text-sm">Find products quickly by name or keyword.</p>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full px-4 py-3 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {isLoading ? (
            <div className="text-center text-sm text-muted-foreground">Searching...</div>
          ) : (
            <>
              {query.trim() ? (
                <ProductGrid products={products} columns={3} />
              ) : (
                <div className="text-center text-sm text-muted-foreground">
                  Start typing to see results.
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
