import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DashboardOutlined, ShoppingOutlined, OrderedListOutlined, AppstoreOutlined, SettingOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
const AdminDashboard = () => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navItems = [
        { path: '/admin', icon: <DashboardOutlined />, label: 'Dashboard', exact: true },
        { path: '/admin/products', icon: <ShoppingOutlined />, label: 'Products' },
        { path: '/admin/orders', icon: <OrderedListOutlined />, label: 'Orders' },
        { path: '/admin/categories', icon: <AppstoreOutlined />, label: 'Categories' },
        { path: '/admin/settings', icon: <SettingOutlined />, label: 'Settings' },
    ];
    const isActive = (path, exact) => {
        if (exact)
            return location.pathname === path;
        return location.pathname.startsWith(path);
    };
    // Mock stats data
    const stats = [
        { label: 'Total Orders', value: '156', change: '+12%', positive: true },
        { label: 'Pending Orders', value: '23', change: '-5%', positive: true },
        { label: 'Revenue', value: '৳45,230', change: '+18%', positive: true },
        { label: 'Products', value: '48', change: '+3', positive: true },
    ];
    // Mock recent orders
    const recentOrders = [
        { id: 'ORD-001', customer: 'Ahmed Rahman', total: 1250, status: 'pending', date: '2 hours ago' },
        { id: 'ORD-002', customer: 'Fatima Begum', total: 890, status: 'confirmed', date: '5 hours ago' },
        { id: 'ORD-003', customer: 'Karim Islam', total: 2340, status: 'delivered', date: '1 day ago' },
        { id: 'ORD-004', customer: 'Nadia Akter', total: 560, status: 'cancelled', date: '2 days ago' },
    ];
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'confirmed': return 'bg-blue-100 text-blue-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    return (<div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 bg-card shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 lg:w-20'} overflow-hidden`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-border">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">O</span>
              </div>
              {sidebarOpen && (<span className="font-display text-lg font-bold text-foreground">
                  Admin Panel
                </span>)}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (<li key={item.path}>
                  <Link to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path, item.exact)
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
                    <span className="text-lg">{item.icon}</span>
                    {sidebarOpen && <span className="font-medium">{item.label}</span>}
                  </Link>
                </li>))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <LogoutOutlined className="text-lg"/>
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <MenuOutlined />
            </button>
            <h1 className="font-display text-xl font-semibold text-foreground">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              View Store →
            </Link>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (<motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-card rounded-xl p-6 shadow-soft">
                <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                  <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </motion.div>))}
          </div>

          {/* Recent Orders */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card rounded-xl shadow-soft">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="font-display text-lg font-semibold">Recent Orders</h2>
              <Link to="/admin/orders" className="text-sm text-primary hover:text-primary/80 transition-colors">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Order ID</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Customer</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Total</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentOrders.map((order) => (<tr key={order.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{order.customer}</td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">৳{order.total}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{order.date}</td>
                    </tr>))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/admin/products" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <ShoppingOutlined className="text-2xl text-primary"/>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Add Product</h3>
                <p className="text-sm text-muted-foreground">Create new product listing</p>
              </div>
            </Link>
            <Link to="/admin/orders" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <OrderedListOutlined className="text-2xl text-accent"/>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Manage Orders</h3>
                <p className="text-sm text-muted-foreground">View and update orders</p>
              </div>
            </Link>
            <Link to="/admin/categories" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <AppstoreOutlined className="text-2xl text-green-600"/>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Categories</h3>
                <p className="text-sm text-muted-foreground">Manage store categories</p>
              </div>
            </Link>
          </motion.div>
        </main>
      </div>
    </div>);
};
export default AdminDashboard;
