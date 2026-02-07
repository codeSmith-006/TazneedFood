"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SearchOutlined, ShoppingCartOutlined, UserOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useCartContext } from "@/contexts/CartContext";

const Header = () => {
  const pathname = usePathname();
  const { totalItems, openCart } = useCartContext();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      const response = await fetch("/api/categories");
      if (!response.ok || !isMounted) return;
      const data = await response.json();
      setCategories(data.categories || []);
    };

    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  const navCategories = categories.slice(0, 6);

  return (
    <header className="sticky top-0 z-50">
      <div className="info-bar">
        <p>
          To order any product, WhatsApp this number: <strong>+8801234567890</strong>
        </p>
      </div>

      <div className="bg-card shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <span className="font-display text-2xl font-bold text-primary">
                Tanzeen<span className="text-gold">Food</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navCategories.map((category) => {
                const isActive = pathname?.includes(`/collections/${category.slug}`);
                return (
                  <Link
                    key={category.id}
                    href={`/collections/${category.slug}`}
                    className={`category-nav-item font-semibold ${isActive ? "active" : ""}`}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <AnimatePresence>
                {searchOpen ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="relative hidden sm:block"
                  >
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      autoFocus
                    />
                    <button
                      onClick={() => setSearchOpen(false)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <CloseOutlined />
                    </button>
                  </motion.div>
                ) : (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setSearchOpen(true)}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <SearchOutlined className="text-lg" />
                  </motion.button>
                )}
              </AnimatePresence>

              <button onClick={openCart} className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
                <ShoppingCartOutlined className="text-lg" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <Link href="/admin" className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <UserOutlined className="text-lg" />
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-border overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <nav className="flex flex-col gap-1">
                  {navCategories.map((category) => {
                    const isActive = pathname?.includes(`/collections/${category.slug}`);
                    return (
                      <Link
                        key={category.id}
                        href={`/collections/${category.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                          }`}
                      >
                        {category.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
