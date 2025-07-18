const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Calculate total revenue
    const totalRevenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);
    const totalRevenue = totalRevenueAgg[0] ? totalRevenueAgg[0].total : 0;

    // Get 5 most recent orders (add .lean() for plain JS objects)
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).lean();

    // Get top 5 products by sales (if you have a 'sales' or 'sold' field, otherwise fallback to rating or stock)
    // Here, we use 'rating' as a placeholder. Replace with your actual sales field if available.
    const topProducts = await Product.find().sort({ rating: -1 }).limit(5).lean();

    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue,
      recentOrders,
      topProducts
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};