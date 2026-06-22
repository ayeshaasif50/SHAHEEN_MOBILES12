import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, notes, guestInfo, itemsPrice, shippingPrice, totalPrice } = req.body;
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ success: false, message: "ORDER ITEMS NOT FOUND" });
    }

    const customerName =
      guestInfo?.name ||
      req.user?.name ||
      "";

    const customerEmail =
      guestInfo?.email ||
      req.user?.email ||
      "";

    const order = await Order.create({
      user: req.user?._id || null,
      guestInfo: guestInfo || {},
      customerName,
      customerEmail,
      orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || "cod",
      notes,
      itemsPrice,
      shippingPrice,
      totalPrice,
      isPaid: paymentMethod === "card",
      paidAt: paymentMethod === "card" ? Date.now() : null,
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Stripe Payment Intent
export const createPaymentIntent = async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({
        success: false,
        message: "Stripe secret key missing. Add STRIPE_SECRET_KEY in backend/.env"
      });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { amount, currency = "pkr" } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
    });

    res.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get My Orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Order
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
      return res.status(404).json({ success: false, message: "ORDER NOT FOUND" });
    }

    const isOwner =
      order.user &&
      order.user._id.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "ONLY OWNER OR ADMIN CAN ACCESS ORDER",
      });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email").sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Order Status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "ORDER NOT FOUND" });
    }

    order.status = req.body.status || order.status;

    if (req.body.status === "delivered") {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      // Award 1 loyalty point per Rs. 100 spent, only once per order
      if (!order.pointsAwarded && order.user) {
        const earned = Math.floor((order.totalPrice || 0) / 100);
        if (earned > 0) {
          await User.findByIdAndUpdate(order.user, { $inc: { points: earned } });
        }
        order.pointsAwarded = true;
      }
    }

    if (req.body.status === "cancelled") {
      order.cancelledAt = Date.now();
      order.cancelReason = req.body.cancelReason || order.cancelReason || "Cancelled by admin";
      order.cancelledBy = "admin";
    }

    const updated = await order.save();
    res.json({ success: true, order: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Cancel Order by User
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "ORDER NOT FOUND" });
    }

    if (!order.user || order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "ONLY OWNER CAN CANCEL ORDER",
      });
    }

    if (order.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "THIS ORDER IS ALREADY CANCELLED",
      });
    }

    if (order.status === "shipped" || order.status === "delivered") {
      return res.status(400).json({
        success: false,
        message: "Shipped OR Delivered orders cannot be cancelled",
      });
    }

    order.status = "cancelled";
    order.cancelledAt = Date.now();
    order.cancelReason = req.body.cancelReason || "Cancelled by customer";
    order.cancelledBy = "user";

    const updated = await order.save();

    res.json({
      success: true,
      message: "ORDER SUCCESSFULLY CANCELLED",
      order: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};