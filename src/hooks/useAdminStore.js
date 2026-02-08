import { useState, useEffect, useCallback } from "react";
import { createProduct, updateProduct, deleteProduct } from "@/app/actions/products";
import { createCategory, updateCategory, deleteCategory } from "@/app/actions/categories";
import { updateOrderStatus, deleteOrder, getOrderAnalytics } from "@/app/actions/orders";

const CACHE_TTL_MS = 60 * 1000;
const adminCache = {
  products: null,
  categories: null,
  orders: null,
  analytics: null,
  timestamp: 0,
};

export const useAdminStore = (options = {}) => {
  const { loadAnalytics = true } = options;
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalRevenue: 0,
    todayRevenue: 0,
    ordersPerDay: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = useCallback(async (force = false) => {
    setIsLoading(true);

    const cacheAge = Date.now() - adminCache.timestamp;
    const cacheReady =
      adminCache.timestamp > 0 &&
      cacheAge < CACHE_TTL_MS &&
      adminCache.products &&
      adminCache.categories &&
      adminCache.orders &&
      (!loadAnalytics || adminCache.analytics);

    if (!force && cacheReady) {
      setProducts(adminCache.products);
      setCategories(adminCache.categories);
      setOrders(adminCache.orders);
      setAnalytics(adminCache.analytics);
      setIsLoading(false);
      return;
    }

    const [productsRes, categoriesRes, ordersRes] = await Promise.all([
      fetch("/api/products?limit=1000"),
      fetch("/api/categories"),
      fetch("/api/orders?page=1&limit=200"),
    ]);

    const nextCache = {
      products: productsRes.ok ? (await productsRes.json()).products || [] : adminCache.products || [],
      categories: categoriesRes.ok ? (await categoriesRes.json()).categories || [] : adminCache.categories || [],
      orders: ordersRes.ok ? (await ordersRes.json()).orders || [] : adminCache.orders || [],
      analytics: adminCache.analytics || analytics,
    };

    setProducts(nextCache.products);
    setCategories(nextCache.categories);
    setOrders(nextCache.orders);

    if (loadAnalytics) {
      try {
        const analyticsData = await getOrderAnalytics();
        nextCache.analytics = analyticsData;
        setAnalytics(analyticsData);
      } catch {
        setAnalytics((prev) => prev);
      }
    }

    adminCache.products = nextCache.products;
    adminCache.categories = nextCache.categories;
    adminCache.orders = nextCache.orders;
    if (loadAnalytics) {
      adminCache.analytics = nextCache.analytics;
    }
    adminCache.timestamp = Date.now();

    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const addProduct = useCallback(async (product) => {
    const created = await createProduct(product);
    setProducts((prev) => [...prev, created]);
    return created;
  }, []);

  const updateProductById = useCallback(async (id, updates) => {
    const updated = await updateProduct(id, updates);
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
  }, []);

  const deleteProductById = useCallback(async (id) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addCategory = useCallback(async (category) => {
    const created = await createCategory(category);
    setCategories((prev) => [...prev, created]);
    return created;
  }, []);

  const updateCategoryById = useCallback(async (id, updates) => {
    const updated = await updateCategory(id, updates);
    setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
  }, []);

  const deleteCategoryById = useCallback(async (id) => {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateOrderStatusById = useCallback(async (id, status) => {
    const updated = await updateOrderStatus(id, status);
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: updated.status } : o)));
  }, []);

  const deleteOrderById = useCallback(async (id) => {
    await deleteOrder(id);
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }, []);

  const getStats = useCallback(() => {
    return {
      totalOrders: analytics.totalOrders,
      pendingOrders: analytics.pendingOrders,
      deliveredOrders: analytics.deliveredOrders,
      cancelledOrders: analytics.cancelledOrders,
      revenue: analytics.totalRevenue,
      todayRevenue: analytics.todayRevenue,
      totalProducts: products.length,
      ordersPerDay: analytics.ordersPerDay,
    };
  }, [analytics, products.length]);

  return {
    products,
    categories,
    orders,
    analytics,
    isLoading,
    addProduct,
    updateProduct: updateProductById,
    deleteProduct: deleteProductById,
    addCategory,
    updateCategory: updateCategoryById,
    deleteCategory: deleteCategoryById,
    updateOrderStatus: updateOrderStatusById,
    deleteOrder: deleteOrderById,
    getStats,
    refreshData,
  };
};
