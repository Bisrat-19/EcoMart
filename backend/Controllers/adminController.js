const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalSales = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);
    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalSales: totalSales[0] ? totalSales[0].total : 0
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};