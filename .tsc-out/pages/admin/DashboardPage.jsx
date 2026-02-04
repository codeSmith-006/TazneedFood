import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingOutlined, OrderedListOutlined, AppstoreOutlined, } from '@ant-design/icons';
import { useAdminStore } from '@/hooks/useAdminStore';
const DashboardPage = () => {
    const { orders, getStats, isLoading } = useAdminStore();
    if (isLoading) {
        return (<div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>);
    }
    const stats = getStats();
    const statsData = [
        { label: 'Total Orders', value: stats.totalOrders.toString(), change: '+12%', positive: true },
        { label: 'Pending Orders', value: stats.pendingOrders.toString(), change: stats.pendingOrders > 0 ? 'Needs attention' : 'All clear', positive: stats.pendingOrders === 0 },
        { label: 'Revenue', value: `৳${stats.revenue.toLocaleString()}`, change: '+18%', positive: true },
        { label: 'Products', value: stats.totalProducts.toString(), change: 'Active', positive: true },
    ];
    const recentOrders = orders.slice(0, 5);
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'confirmed': return 'bg-blue-100 text-blue-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);
        if (diffHours < 1)
            return 'Just now';
        if (diffHours < 24)
            return `${diffHours} hours ago`;
        if (diffDays === 1)
            return '1 day ago';
        return `${diffDays} days ago`;
    };
    return (<>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {statsData.map((stat, index) => (<motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-card rounded-xl p-6 shadow-soft">
            <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</span>
              <span className={`text-xs lg:text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-yellow-600'}`}>
                {stat.change}
              </span>
            </div>
          </motion.div>))}
      </div>

      {/* Recent Orders */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card rounded-xl shadow-soft">
        <div className="p-4 lg:p-6 border-b border-border flex justify-between items-center">
          <h2 className="font-display text-lg font-semibold">Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm text-primary hover:text-primary/80 transition-colors">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left px-4 lg:px-6 py-4 text-sm font-medium text-muted-foreground">Order ID</th>
                <th className="text-left px-4 lg:px-6 py-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Customer</th>
                <th className="text-left px-4 lg:px-6 py-4 text-sm font-medium text-muted-foreground">Total</th>
                <th className="text-left px-4 lg:px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 lg:px-6 py-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentOrders.map((order) => (<tr key={order.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 lg:px-6 py-4 text-sm font-medium text-foreground">{order.id}</td>
                  <td className="px-4 lg:px-6 py-4 text-sm text-foreground hidden sm:table-cell">{order.customer.name}</td>
                  <td className="px-4 lg:px-6 py-4 text-sm font-medium text-foreground">৳{order.total}</td>
                  <td className="px-4 lg:px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-sm text-muted-foreground hidden md:table-cell">{formatDate(order.createdAt)}</td>
                </tr>))}
              {recentOrders.length === 0 && (<tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No orders yet
                  </td>
                </tr>)}
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
            <h3 className="font-semibold text-foreground">Products</h3>
            <p className="text-sm text-muted-foreground">Manage product listings</p>
          </div>
        </Link>
        <Link to="/admin/orders" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
            <OrderedListOutlined className="text-2xl text-accent"/>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Orders</h3>
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
    </>);
};
export default DashboardPage;
