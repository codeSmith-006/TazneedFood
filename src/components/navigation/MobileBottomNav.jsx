"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeOutlined, ShoppingOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const navItems = [
  { label: "Home", href: "/", icon: <HomeOutlined /> },
  { label: "Products", href: "/products", icon: <ShoppingOutlined /> },
  { label: "Search", href: "/search", icon: <SearchOutlined /> },
  { label: "Cart", href: "/cart", icon: <ShoppingCartOutlined /> },
];

const MobileBottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border">
      <div className="grid grid-cols-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 py-2 text-xs transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
