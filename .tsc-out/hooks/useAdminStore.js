import { useState, useEffect, useCallback } from 'react';
import { products as defaultProducts, categories as defaultCategories } from '@/lib/data';
const PRODUCTS_KEY = 'admin_products';
const CATEGORIES_KEY = 'admin_categories';
const ORDERS_KEY = 'admin_orders';
// Initialize with default data if not exists
const initializeData = () => {
    if (!localStorage.getItem(PRODUCTS_KEY)) {
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
    }
    if (!localStorage.getItem(CATEGORIES_KEY)) {
        localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
    }
    if (!localStorage.getItem(ORDERS_KEY)) {
        // Sample orders for demo
        const sampleOrders = [
            {
                id: 'ORD-001',
                customer: { name: 'Ahmed Rahman', phone: '+8801712345678', address: 'Dhaka, Bangladesh' },
                items: [
                    { productId: 'h1', productName: 'Black Seed Honey', price: 850, quantity: 2, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=100' }
                ],
                subtotal: 1700,
                discount: 0,
                total: 1700,
                paymentType: 'cod',
                status: 'pending',
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'ORD-002',
                customer: { name: 'Fatima Begum', phone: '+8801898765432', address: 'Chittagong, Bangladesh' },
                items: [
                    { productId: 'g1', productName: 'Pure Cow Ghee', price: 800, quantity: 1, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=100' }
                ],
                subtotal: 800,
                discount: 50,
                coupon: 'SAVE50',
                total: 750,
                paymentType: 'online',
                status: 'confirmed',
                createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'ORD-003',
                customer: { name: 'Karim Islam', phone: '+8801556789012', address: 'Sylhet, Bangladesh' },
                items: [
                    { productId: 'd1', productName: 'Ajwa Dates Premium', price: 1200, quantity: 2, image: 'https://images.unsplash.com/photo-1593164842264-854604db2260?w=100' }
                ],
                subtotal: 2400,
                discount: 0,
                total: 2400,
                paymentType: 'cod',
                status: 'delivered',
                createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'ORD-004',
                customer: { name: 'Nadia Akter', phone: '+8801612345678', address: 'Rajshahi, Bangladesh' },
                items: [
                    { productId: 'o1', productName: 'Black Seed Oil', price: 550, quantity: 1, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100' }
                ],
                subtotal: 550,
                discount: 0,
                total: 550,
                paymentType: 'cod',
                status: 'cancelled',
                createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
            }
        ];
        localStorage.setItem(ORDERS_KEY, JSON.stringify(sampleOrders));
    }
};
export const useAdminStore = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // Load data from localStorage
    useEffect(() => {
        initializeData();
        const storedProducts = localStorage.getItem(PRODUCTS_KEY);
        const storedCategories = localStorage.getItem(CATEGORIES_KEY);
        const storedOrders = localStorage.getItem(ORDERS_KEY);
        if (storedProducts)
            setProducts(JSON.parse(storedProducts));
        if (storedCategories)
            setCategories(JSON.parse(storedCategories));
        if (storedOrders)
            setOrders(JSON.parse(storedOrders));
        setIsLoading(false);
    }, []);
    // Save products
    const saveProducts = useCallback((newProducts) => {
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(newProducts));
        setProducts(newProducts);
    }, []);
    // Save categories
    const saveCategories = useCallback((newCategories) => {
        localStorage.setItem(CATEGORIES_KEY, JSON.stringify(newCategories));
        setCategories(newCategories);
    }, []);
    // Save orders
    const saveOrders = useCallback((newOrders) => {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(newOrders));
        setOrders(newOrders);
    }, []);
    // Product CRUD
    const addProduct = useCallback((product) => {
        const newProduct = { ...product, id: `prod_${Date.now()}` };
        saveProducts([...products, newProduct]);
        return newProduct;
    }, [products, saveProducts]);
    const updateProduct = useCallback((id, updates) => {
        const updatedProducts = products.map(p => p.id === id ? { ...p, ...updates } : p);
        saveProducts(updatedProducts);
    }, [products, saveProducts]);
    const deleteProduct = useCallback((id) => {
        saveProducts(products.filter(p => p.id !== id));
    }, [products, saveProducts]);
    // Category CRUD
    const addCategory = useCallback((category) => {
        const newCategory = { ...category, id: `cat_${Date.now()}` };
        saveCategories([...categories, newCategory]);
        return newCategory;
    }, [categories, saveCategories]);
    const updateCategory = useCallback((id, updates) => {
        const updatedCategories = categories.map(c => c.id === id ? { ...c, ...updates } : c);
        saveCategories(updatedCategories);
    }, [categories, saveCategories]);
    const deleteCategory = useCallback((id) => {
        saveCategories(categories.filter(c => c.id !== id));
    }, [categories, saveCategories]);
    // Order Management
    const updateOrderStatus = useCallback((id, status) => {
        const updatedOrders = orders.map(o => o.id === id ? { ...o, status } : o);
        saveOrders(updatedOrders);
    }, [orders, saveOrders]);
    const deleteOrder = useCallback((id) => {
        saveOrders(orders.filter(o => o.id !== id));
    }, [orders, saveOrders]);
    // Stats
    const getStats = useCallback(() => {
        const totalOrders = orders.length;
        const pendingOrders = orders.filter(o => o.status === 'pending').length;
        const revenue = orders
            .filter(o => o.status === 'delivered')
            .reduce((sum, o) => sum + o.total, 0);
        const totalProducts = products.length;
        return { totalOrders, pendingOrders, revenue, totalProducts };
    }, [orders, products]);
    return {
        products,
        categories,
        orders,
        isLoading,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        updateOrderStatus,
        deleteOrder,
        getStats,
    };
};
