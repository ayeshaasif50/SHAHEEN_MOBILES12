import React, { useState } from "react";
import "./Payment.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../utils/api";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// ✅ helper: Stripe amount conversion (minimal + safe)
const toStripeAmount = (total, currency) => {
  const cur = String(currency || "").toLowerCase();

  // Stripe zero-decimal currencies (common ones)
  // PKR is zero-decimal on Stripe, so do NOT multiply by 100
  const zeroDecimal = new Set(["pkr", "jpy", "krw", "vnd"]);

  const n = Number(total);
  if (!Number.isFinite(n) || n <= 0) return 0;

  return zeroDecimal.has(cur) ? Math.round(n) : Math.round(n * 100);
};

const PaymentForm = ({ total, method, setMethod, onSuccess, onBack, cartItems, deliveryFee, discount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (paying) return;

    setPaying(true);
    try {
      if (method === "card") {
        const currency = "pkr";

        const stripeAmount = toStripeAmount(total, currency);
        if (!stripeAmount || stripeAmount <= 0) throw new Error("Invalid amount");

        const intentRes = await createPaymentIntent(stripeAmount, currency);
        if (!intentRes?.success) throw new Error(intentRes?.message || "Stripe intent failed");

        const { clientSecret } = intentRes;
        const cardElement = elements.getElement(CardElement);

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement }
        });

        if (result.error) {
          alert(result.error.message);
          setPaying(false);
          return;
        }

        onSuccess({
          success: true,
          method: "card",
          gatewayId: result.paymentIntent?.id
        });
      } else {
        onSuccess({
          success: true,
          method: "cod",
          gatewayId: null
        });
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-left">
        <button className="payment-back-btn" onClick={onBack}>�� Back</button>
        <div className="payment-brand"><span className="payment-brand-name">Shaheen Mobiles</span></div>
        <p className="payment-label">Order Total</p>
        <h2 className="payment-amount">Rs. {total.toLocaleString()}</h2>

        <div className="payment-items">
          {cartItems.map((item, idx) => (
            <div key={idx} className="payment-item-row">
              <div className="payment-item-info">
                <p className="payment-item-name">{item.name}</p>
                <p className="payment-item-qty">Qty {item.qty || item.quantity || 1}</p>
              </div>
              <p className="payment-item-price">Rs. {(item.price * (item.qty || item.quantity || 1)).toLocaleString()}</p>
            </div>
          ))}
          <div className="payment-item-row">
            <div className="payment-item-info">
              <p className="payment-item-name">Delivery Charge</p>
              <p className="payment-item-qty">Qty 1</p>
            </div>
            <p className="payment-item-price">Rs. {deliveryFee.toLocaleString()}</p>
          </div>
          {discount > 0 && (
            <div className="payment-item-row discount-row">
              <p className="payment-item-name">Discount</p>
              <p className="payment-item-price">− Rs. {discount.toLocaleString()}</p>
            </div>
          )}
        </div>

        <p className="payment-secure">🔒 Secured & Encrypted Payment</p>
      </div>

      <div className="payment-right">
        <h3 className="pay-title">Payment Method</h3>

        <div className="pay-methods">
          <button className={`pay-method-btn ${method === "card" ? "active" : ""}`} onClick={() => setMethod("card")}>Card</button>
          <button className={`pay-method-btn ${method === "cod" ? "active" : ""}`} onClick={() => setMethod("cod")}>Cash on Delivery</button>
        </div>

        <form className="pay-form" onSubmit={handleSubmit}>
          {method === "card" && (
            <div className="pay-field">
              <label>Card Information</label>
              <div className="stripe-card">
                <CardElement options={{ hidePostalCode: true }} />
              </div>
            </div>
          )}

          {method === "cod" && (
            <div className="cod-box">
              <h4>Cash on Delivery</h4>
              <p>Pay in cash when your order arrives. No online payment required.</p>
            </div>
          )}

          <button type="submit" className="pay-btn" disabled={paying}>
            {paying ? "Processing..." : method === "cod" ? "Place Order (COD)" : `Pay Rs. ${total.toLocaleString()}`}
          </button>
        </form>
      </div>
    </div>
  );
};

const Payment = (props) => {
  const [method, setMethod] = useState("card");
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} method={method} setMethod={setMethod} />
    </Elements>
  );
};

export default Payment;