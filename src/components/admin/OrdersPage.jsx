"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SearchOutlined,
  EyeOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  UserOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useAdminStore } from "@/hooks/useAdminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const OrdersPage = () => {
  const { orders, updateOrderStatus, isLoading, refreshData } = useAdminStore();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const orderKey = (order.orderNumber || order.id || "").toLowerCase();
    const matchesSearch =
      orderKey.includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      toast({ title: `Order status updated to ${status}` });
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status });
      }
      await refreshData();
    } catch (error) {
      toast({
        title: "Failed to update order",
        description: error?.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left px-4 lg:px-6 py-4 text-sm font-medium text-muted-foreground">Order #</th>
                <th className="text-left px-4 lg:px-6 py-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">
                  Customer
                </th>
                <th className="text-left px-4 lg:px-6 py-4 text-sm font-medium text-muted-foreground">Items</th>
                <th className="text-left px-4 lg:px-6 py-4 text-sm font-medium text-muted-foreground">Total</th>
                <th className="text-left px-4 lg:px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 lg:px-6 py-4 text-sm font-medium text-muted-foreground hidden md:table-cell">
                  Payment
                </th>
                <th className="text-left px-4 lg:px-6 py-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                  Date
                </th>
                <th className="text-left px-4 lg:px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <AnimatePresence>
                {filteredOrders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-4 lg:px-6 py-4 text-sm font-medium text-foreground">
                      {order.orderNumber}
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-foreground hidden sm:table-cell">
                      <div>
                        <p className="font-medium">{order.customer.name}</p>
                        <p className="text-xs text-muted-foreground">{order.customer.phone}</p>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-foreground">
                      {order.items.length} item{order.items.length > 1 ? "s" : ""}
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm font-medium text-foreground">৳{order.total}</td>
                    <td className="px-4 lg:px-6 py-4">
                      <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
                        <SelectTrigger className={`w-[120px] h-8 text-xs ${getStatusColor(order.status)}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 lg:px-6 py-4 hidden md:table-cell">
                      <Badge variant={order.paymentType === "cod" ? "secondary" : "default"}>
                        {order.paymentType === "cod" ? "Cash on Delivery" : "Online"}
                      </Badge>
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-muted-foreground hidden lg:table-cell">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <Button size="icon" variant="ghost" onClick={() => setSelectedOrder(order)}>
                        <EyeOutlined />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No orders found</p>
          </div>
        )}
      </div>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Order {selectedOrder?.orderNumber}</span>
              <Badge className={getStatusColor(selectedOrder?.status || "")}>
                {selectedOrder?.status}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6 mt-4">
              <div className="bg-secondary/30 rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <UserOutlined /> Customer Information
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Name:</strong> {selectedOrder.customer.name}
                  </p>
                  <p className="flex items-center gap-2">
                    <PhoneOutlined /> {selectedOrder.customer.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <EnvironmentOutlined /> {selectedOrder.customer.address}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <ShoppingOutlined /> Order Items
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-secondary/30 rounded-lg">
                      <img src={item.image} alt={item.productName} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          ৳{item.price} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold">৳{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>৳{selectedOrder.subtotal}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount {selectedOrder.coupon && `(${selectedOrder.coupon})`}</span>
                    <span>-৳{selectedOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>৳{selectedOrder.total}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>Payment Method:</span>
                <Badge variant={selectedOrder.paymentType === "cod" ? "secondary" : "default"}>
                  {selectedOrder.paymentType === "cod" ? "Cash on Delivery" : "Online Payment"}
                </Badge>
              </div>

              <div className="border-t border-border pt-4">
                <label className="text-sm font-medium mb-2 block">Update Status</label>
                <Select value={selectedOrder.status} onValueChange={(value) => handleStatusChange(selectedOrder.id, value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="text-xs text-muted-foreground">Order placed on {formatDate(selectedOrder.createdAt)}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrdersPage;
