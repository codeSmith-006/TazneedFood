import Order from "@/models/Order";

export async function getOrderAnalytics() {
  const totalsByStatus = await Order.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const totalsMap = totalsByStatus.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {});

  const revenueAgg = await Order.aggregate([
    { $match: { status: "delivered" } },
    { $group: { _id: null, total: { $sum: "$total" } } },
  ]);

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayAgg = await Order.aggregate([
    { $match: { status: "delivered", createdAt: { $gte: todayStart } } },
    { $group: { _id: null, total: { $sum: "$total" } } },
  ]);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const perDayAgg = await Order.aggregate([
    { $match: { createdAt: { $gte: sevenDaysAgo } } },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return {
    totalOrders: totalsByStatus.reduce((sum, item) => sum + item.count, 0),
    pendingOrders: totalsMap.pending || 0,
    deliveredOrders: totalsMap.delivered || 0,
    cancelledOrders: totalsMap.cancelled || 0,
    totalRevenue: revenueAgg[0]?.total || 0,
    todayRevenue: todayAgg[0]?.total || 0,
    ordersPerDay: perDayAgg.map((item) => ({ date: item._id, count: item.count })),
  };
}
