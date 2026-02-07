import { useState, useEffect, useCallback } from "react";
import { createProduct, updateProduct, deleteProduct } from "@/app/actions/products";
import { createCategory, updateCategory, deleteCategory } from "@/app/actions/categories";
import { updateOrderStatus, deleteOrder, getOrderAnalytics } from "@/app/actions/orders";

export const useAdminStore = () => {
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

  const refreshData = useCallback(async () => {
    setIsLoading(true);

    const [productsRes, categoriesRes, ordersRes] = await Promise.all([
      fetch("/api/products?limit=1000"),
      fetch("/api/categories"),
      fetch("/api/orders?page=1&limit=200"),
    ]);

    if (productsRes.ok) {
      const data = await productsRes.json();
      setProducts(data.products || []);
    }

    if (categoriesRes.ok) {
      const data = await categoriesRes.json();
      setCategories(data.categories || []);
    }

    if (ordersRes.ok) {
      const data = await ordersRes.json();
      setOrders(data.orders || []);
    }

    try {
      const analyticsData = await getOrderAnalytics();
      setAnalytics(analyticsData);
    } catch {
      setAnalytics((prev) => prev);
    }

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
