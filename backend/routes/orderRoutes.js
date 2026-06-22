import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
  createPaymentIntent,
  cancelOrder
} from "../controllers/orderController.js";
import { protect, optionalAuth } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/create-payment-intent", protect, createPaymentIntent);

router.post("/",            protect,      createOrder);
router.get ("/myorders",    protect,      getMyOrders);
router.get ("/my",          protect,      getMyOrders); // alias used by frontend Profile page
router.get ("/",            protect, adminOnly, getAllOrders);
router.get ("/:id",         protect,      getOrder);
router.put ("/:id/cancel",  protect,      cancelOrder);
router.put ("/:id/status",  protect, adminOnly, updateOrderStatus);

export default router;