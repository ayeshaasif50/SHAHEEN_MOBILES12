import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  name:    { type: String,  required: true }, // ✅ product name saved
  qty:     { type: Number,  required: true },
  image:   { type: String,  default: "" },
  price:   { type: Number,  required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // ✅ store name/email for display
    customerName:  { type: String, default: "" },
    customerEmail: { type: String, default: "" },

    guestInfo: {
      name:  { type: String, default: "" },
      phone: { type: String, default: "" },
      email: { type: String, default: "" },
    },

    orderItems: [orderItemSchema],
    shippingAddress: {
      address: { type: String, required: true },
      city:    { type: String, required: true },
      zip:     { type: String, default: "" },
    },

    paymentMethod: {
      type: String,
      required: true,
      enum: ["cod", "card", "easypaisa", "jazzcash"],
      default: "cod",
    },

    notes:         { type: String, default: "" },
    itemsPrice:    { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice:    { type: Number, required: true, default: 0 },

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    isPaid:      { type: Boolean, default: false },
    paidAt:      { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;