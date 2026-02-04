"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashboardOutlined,
  ShoppingOutlined,
  OrderedListOutlined,
  AppstoreOutlined,
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const AdminLayout = ({ children }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/admin/dashboard", icon: <DashboardOutlined />, label: "Dashboard", exact: true },
    { path: "/admin/products", icon: <ShoppingOutlined />, label: "Products" },
    { path: "/admin/orders", icon: <OrderedListOutlined />, label: "Orders" },
    { path: "/admin/categories", icon: <AppstoreOutlined />, label: "Categories" },
  ];

  const isActive = (path, exact) => {
    if (exact) return pathname === path;
    return pathname?.startsWith(path) && path !== "/admin/dashboard";
  };

  const getPageTitle = () => {
    const currentNav = navItems.find((item) =>
      item.exact
        ? pathname === item.path
        : pathname?.startsWith(item.path) && item.path !== "/admin/dashboard",
    );
    return currentNav?.label || "Dashboard";
  };

  return (
    <div className="min-h-screen bg-background flex">
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-card shadow-lg transition-all duration-300 
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${sidebarOpen ? "w-64" : "lg:w-20"}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">O</span>
              </div>
              {sidebarOpen && (
                <span className="font-display text-lg font-bold text-foreground">Admin Panel</span>
              )}
            </Link>
            <button className="lg:hidden p-2 hover:bg-secondary rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              <CloseOutlined />
            </button>
          </div>

          <nav className="flex-1 py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path, item.exact) || (item.exact && pathname === item.path)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {sidebarOpen && <span className="font-medium">{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-border">
            <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <LogoutOutlined className="text-lg" />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-card border-b border-border px-4 lg:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setMobileMenuOpen(!mobileMenuOpen);
                } else {
                  setSidebarOpen(!sidebarOpen);
                }
              }}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <MenuOutlined />
            </button>
            <h1 className="font-display text-xl font-semibold text-foreground">{getPageTitle()}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
              View Store →
            </Link>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
