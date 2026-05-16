import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
  createPaymentIntent
} from "../controllers/orderController.js";
import { protect, optionalAuth } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/create-payment-intent", optionalAuth, createPaymentIntent);

router.post("/",            optionalAuth, createOrder);
router.get ("/myorders",    protect,      getMyOrders);
router.get ("/",            protect, adminOnly, getAllOrders);
router.get ("/:id",         protect,      getOrder);
router.put ("/:id/status",  protect, adminOnly, updateOrderStatus);

export default router;