import React, { useState } from "react";
import "./Cart.css";
import Checkout from "../Checkout/Checkout";
import { useCart } from "../../context/CartContext";    // ← ADD
import { useNavigate } from "react-router-dom";

const BASE_URL  = "http://localhost:5000";
const DELIVERY_FEE = 500;

const imgUrl = (path) => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path}`;
};

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQty } = useCart();  // ← Context

  const [promoCode,    setPromoCode]    = useState("");
  const [promoMsg,     setPromoMsg]     = useState("");
  const [discount,     setDiscount]     = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const total    = subtotal + DELIVERY_FEE - discount;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "SHAHEEN10") {
      const disc = Math.round(subtotal * 0.1);
      setDiscount(disc);
      setPromoMsg(`✅ 10% discount applied! You saved Rs. ${disc.toLocaleString()}`);
    } else {
      setDiscount(0);
      setPromoMsg("❌ Invalid promo code.");
    }
  };

  if (showCheckout) {
    return (
      <Checkout
        cartItems={cartItems}
        subtotal={subtotal}
        deliveryFee={DELIVERY_FEE}
        discount={discount}
        total={total}
        onBack={() => setShowCheckout(false)}
      />
    );
  }

  return (
    <div className="cart-page">

      <button className="cart-back-btn" onClick={() => navigate('/shop')}>
        ← Back to Shop
      </button>

      <h2 className="cart-title">
        My Cart <span>({cartItems.length} items)</span>
      </h2>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>🛒 Your cart is empty!</p>
          <button className="cart-back-btn" onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-table-wrap">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      {/* ✅ Real image */}
                      <img
                        src={imgUrl(item.image)}
                        alt={item.name}
                        className="cart-item-img"
                        onError={e => { e.target.src = '/placeholder.png'; }}
                      />
                    </td>
                    <td>
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-brand">{item.brand}</p>
                      {item.ram && (
                        <p className="cart-item-specs">
                          {item.ram} • {item.storage}
                        </p>
                      )}
                    </td>
                    <td className="cart-price">
                      Rs. {item.price.toLocaleString()}
                    </td>
                    <td>
                      <div className="cart-qty">
                        <button onClick={() => updateQty(item._id, -1)}>−</button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item._id, +1)}>+</button>
                      </div>
                    </td>
                    <td className="cart-total">
                      Rs. {(item.price * item.qty).toLocaleString()}
                    </td>
                    <td>
                      <button
                        className="cart-remove-btn"
                        onClick={() => removeFromCart(item._id)}
                      >✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-bottom">
            <div className="cart-totals">
              <h3>Cart Totals</h3>
              <div className="cart-total-row">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="cart-total-row discount-row">
                  <span>Discount</span>
                  <span>− Rs. {discount.toLocaleString()}</span>
                </div>
              )}
              <div className="cart-total-row">
                <span>Delivery Fee</span>
                <span>Rs. {DELIVERY_FEE.toLocaleString()}</span>
              </div>
              <div className="cart-total-row total-row">
                <span>Total</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
              <button
                className="proceed-checkout-btn"
                onClick={() => setShowCheckout(true)}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>

            <div className="cart-promo">
              <p className="promo-label">If you have a promo code, Enter it here</p>
              <div className="promo-input-row">
                <input
                  type="text"
                  placeholder="promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-input"
                />
                <button className="promo-submit-btn" onClick={applyPromo}>
                  Submit
                </button>
              </div>
              {promoMsg && (
                <p className={`promo-msg ${discount > 0 ? "success" : "error"}`}>
                  {promoMsg}
                </p>
              )}
              <p className="promo-hint">
                Try: <strong>SHAHEEN10</strong> for 10% off
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;