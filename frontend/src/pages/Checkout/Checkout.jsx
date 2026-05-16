import React, { useState } from "react";
import "./Checkout.css";
import Payment from "../Payment/Payment";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../utils/api";
import { useCart } from "../../context/CartContext";

const Checkout = ({ cartItems = [], subtotal = 0, deliveryFee = 0, discount = 0, total = 0, onBack }) => {
  const [form, setForm] = useState({
    firstName: "", lastName: "",
    email: "", street: "",
    city: "", state: "",
    zipCode: "", country: "",
    phone: "",
  });

  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();
  const cartCtx = useCart ? useCart() : null;
  const clearCart = cartCtx?.clearCart || (() => localStorage.removeItem("cart"));

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (paymentResult) => {
    const itemsSource = (cartItems && cartItems.length) ? cartItems : (cartCtx?.cartItems || []);
    if (!itemsSource || itemsSource.length === 0) {
      alert("Cart empty");
      return;
    }

    const orderItems = itemsSource.map((it) => ({
      // ✅ always save product name
      name: it.name || it.title || it.productName || "Product",
      qty: it.qty || it.quantity || 1,
      image: it.image || it.images?.[0] || "",
      price: it.price,
      product: it._id || it.id || it.product,
    }));

    const shippingAddress = {
      address: form.street,
      city: form.city,
      zip: form.zipCode,
    };

    const payload = {
      orderItems,
      shippingAddress,
      paymentMethod: paymentResult?.method || "cod",
      notes: paymentResult?.notes || "",
      itemsPrice: subtotal,
      shippingPrice: deliveryFee,
      totalPrice: total,
      guestInfo: { name: `${form.firstName} ${form.lastName}`, email: form.email, phone: form.phone }
    };

    try {
      const data = await createOrder(payload);
      if (data?.success) {
        if (typeof clearCart === "function") clearCart();
        else localStorage.removeItem("cart");

        alert("Order placed successfully!");
        navigate("/account", { replace: true });
      } else {
        alert("Order failed: " + (data?.message || "Unknown"));
      }
    } catch (err) {
      console.error("createOrder error:", err);
      alert("Order failed — please try again.");
    }
  };

  if (showPayment) {
    return (
      <Payment
        cartItems={cartItems}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        discount={discount}
        total={total}
        onBack={() => setShowPayment(false)}
        onSuccess={handlePaymentSuccess}
      />
    );
  }

  return (
    <div className="checkout-page">
      <button className="checkout-back-btn" onClick={onBack}>← Back to Cart</button>

      <div className="checkout-layout">
        <div className="checkout-left">
          <h2 className="checkout-title">Delivery Information</h2>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="checkout-row">
              <input name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} required />
              <input name="lastName"  placeholder="Last name"  value={form.lastName}  onChange={handleChange} required />
            </div>
            <input name="email" type="email" placeholder="Email address" value={form.email} onChange={handleChange} required />
            <input name="street" placeholder="Street" value={form.street} onChange={handleChange} required />
            <div className="checkout-row">
              <input name="city"  placeholder="City"  value={form.city}  onChange={handleChange} required />
              <input name="state" placeholder="State" value={form.state} onChange={handleChange} required />
            </div>
            <div className="checkout-row">
              <input name="zipCode" placeholder="Zip code" value={form.zipCode} onChange={handleChange} required />
              <input name="country" placeholder="Country" value={form.country} onChange={handleChange} required />
            </div>
            <input name="phone" type="tel" placeholder="Phone (03XX XXXXXXX)" value={form.phone} onChange={handleChange} required />
            <button type="submit" id="checkout-submit" style={{ display: "none" }} />
          </form>
        </div>

        <div className="checkout-right">
          <h3 className="checkout-totals-title">Cart Totals</h3>
          <div className="checkout-total-rows">
            <div className="checkout-total-row"><span>Subtotal</span><span>Rs. {subtotal.toLocaleString()}</span></div>
            {discount > 0 && <div className="checkout-total-row discount"><span>Discount</span><span>− Rs. {discount.toLocaleString()}</span></div>}
            <div className="checkout-total-row"><span>Delivery Fee</span><span>Rs. {deliveryFee.toLocaleString()}</span></div>
            <div className="checkout-total-row grand-total"><span>Total</span><span>Rs. {total.toLocaleString()}</span></div>
          </div>

          <button
            className="proceed-payment-btn"
            onClick={() => document.getElementById("checkout-submit").click()}
          >
            Proceed To Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;