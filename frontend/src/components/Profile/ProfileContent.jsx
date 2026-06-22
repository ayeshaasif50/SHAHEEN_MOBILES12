// frontend/src/components/Profile/ProfileContent.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import API, { IMG_BASE } from "../../utils/api";

const IMG_BASE_URL = IMG_BASE || "http://localhost:5000";

const makeUrl = (p) => {
  if (!p || typeof p !== "string") return "/placeholder.png";
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  return `${IMG_BASE_URL}${p.startsWith("/") ? p : `/${p}`}`;
};

const STATUS_COLORS = {
  pending:   "#f39c12",
  confirmed: "#3498db",
  shipped:   "#9b59b6",
  delivered: "#27ae60",
  cancelled: "#e74c3c",
};

// ── Clean line-style icons (replace emoji "stickers") ──────────────────────
const Ico = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props} />
);
const IcoBox        = () => <Ico><path d="M21 8 12 3 3 8l9 5 9-5Z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></Ico>;
const IcoCheck       = () => <Ico><circle cx="12" cy="12" r="9" /><path d="m8.5 12.5 2.3 2.3 4.7-5.1" /></Ico>;
const IcoTruck       = () => <Ico><rect x="1" y="6" width="14" height="11" rx="1.5" /><path d="M15 10h4l3 3v4h-7z" /><circle cx="6" cy="19" r="2" /><circle cx="17.5" cy="19" r="2" /></Ico>;
const IcoWallet      = () => <Ico><rect x="2" y="6" width="20" height="13" rx="2" /><path d="M16 12h3" /><path d="M2 10h20" /></Ico>;
const IcoStar        = () => <Ico><path d="m12 3 2.6 5.8 6.4.6-4.8 4.3 1.4 6.3L12 17l-5.6 3 1.4-6.3-4.8-4.3 6.4-.6L12 3Z" /></Ico>;
const IcoTrophy      = () => <Ico><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" /><path d="M8 4H4v2a4 4 0 0 0 4 4" /><path d="M16 4h4v2a4 4 0 0 1-4 4" /><path d="M12 13v4" /><path d="M9 21h6" /><path d="M10 17h4l.5 4h-5l.5-4Z" /></Ico>;
const IcoBag         = () => <Ico><path d="M6 8h12l1 13H5L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></Ico>;
const IcoUser        = () => <Ico width="20" height="20"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.6-4 5-6 8-6s6.4 2 8 6" /></Ico>;
const IcoUsers       = () => <Ico width="20" height="20"><circle cx="9" cy="8" r="3.2" /><path d="M2.5 20c1.2-3.2 3.8-5 6.5-5s5.3 1.8 6.5 5" /><circle cx="17" cy="8" r="2.6" /><path d="M16 9.3c1.9.5 3.3 2 4 4.7" /></Ico>;

export default function ProfileContent({
  activeTab,
  profile,
  reviews      = [],
  orders       = [],
  addresses    = [],
  loading      = false,
  onAddressChange,
  onOrderChange,
  onReviewChange,
  onProfileChange,
}) {
  const navigate = useNavigate();

  // ── Account edit state ─────────────────────────────────
  const [accountForm, setAccountForm] = useState({ name: "", phone: "", currentPassword: "", newPassword: "" });
  const [savingAccount, setSavingAccount] = useState(false);

  useEffect(() => {
    if (profile) setAccountForm((p) => ({ ...p, name: profile.name || "", phone: profile.phone || "" }));
  }, [profile]);

  const saveAccount = async () => {
    setSavingAccount(true);
    try {
      const payload = { name: accountForm.name, phone: accountForm.phone };
      if (accountForm.newPassword) {
        payload.currentPassword = accountForm.currentPassword;
        payload.newPassword     = accountForm.newPassword;
      }
      await API.put("/auth/profile", payload);
      if (onProfileChange) onProfileChange();
      alert("Profile updated!");
      setAccountForm((p) => ({ ...p, currentPassword: "", newPassword: "" }));
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setSavingAccount(false);
    }
  };

  // ── Review edit state ──────────────────────────────────
  const [showReviewModal,  setShowReviewModal]  = useState(false);
  const [selectedReview,   setSelectedReview]   = useState(null);
  const [reviewForm,       setReviewForm]        = useState({ rating: 5, text: "" });
  const [savingReview,     setSavingReview]      = useState(false);

  const openEditReview = (review) => {
    if (!review?._id && !review?.id) {
      const pid = review?.product?._id || review?.productId;
      if (pid) navigate(`/product/${pid}`);
      return;
    }
    setSelectedReview(review);
    setReviewForm({ rating: review.rating || 5, text: review.comment || review.text || "" });
    setShowReviewModal(true);
  };

  const submitEditReview = async () => {
    if (savingReview) return;
    if (!reviewForm.text.trim()) { alert("Please write a review."); return; }
    setSavingReview(true);
    try {
      const id = selectedReview._id || selectedReview.id;
      await API.put(`/reviews/${id}`, { rating: reviewForm.rating, comment: reviewForm.text });
      setShowReviewModal(false);
      if (onReviewChange) onReviewChange();
      window.dispatchEvent(new CustomEvent("review:submitted"));
    } catch (err) {
      alert(err.response?.data?.message || "Error updating review.");
    } finally {
      setSavingReview(false);
    }
  };

  const deleteReview = async (review) => {
    if (!window.confirm("Delete this review permanently?")) return;
    try {
      const id = review._id || review.id;
      await API.delete(`/reviews/${id}`);
      if (onReviewChange) onReviewChange();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to delete review.");
    }
  };

  // ── Order state ────────────────────────────────────────
  const [orderViewing,    setOrderViewing]    = useState(null);
  const [cancellingOrder, setCancellingOrder] = useState(false);

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    setCancellingOrder(true);
    try {
      await API.put(`/orders/${orderId}/cancel`, { cancelReason: "Cancelled by customer" });
      if (onOrderChange) onOrderChange();
      setOrderViewing(null);
      alert("Order cancelled.");
    } catch (err) {
      alert(err.response?.data?.message || "Unable to cancel order.");
    } finally {
      setCancellingOrder(false);
    }
  };

  // ── Address state ──────────────────────────────────────
  const [showAddrModal, setShowAddrModal] = useState(false);
  const [editingAddr,   setEditingAddr]   = useState(null);

  const openAddr = (addr = null) => { setEditingAddr(addr); setShowAddrModal(true); };
  const closeAddr = () => { setEditingAddr(null); setShowAddrModal(false); };

  const saveAddress = async (payload) => {
    try {
      if (editingAddr?._id) {
        await API.put(`/auth/addresses/${editingAddr._id}`, payload);
      } else {
        await API.post("/auth/addresses", payload);
      }
      if (onAddressChange) onAddressChange();
      closeAddr();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving address.");
    }
  };

  const deleteAddress = async (id) => {
    if (!window.confirm("Delete this address?")) return;
    try {
      await API.delete(`/auth/addresses/${id}`);
      if (onAddressChange) onAddressChange();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to delete address.");
    }
  };

  // ── Dashboard stats ────────────────────────────────────
  const totalSpent = orders.reduce((s, o) => s + (o.totalPrice || 0), 0);
  const delivered  = orders.filter((o) => o.status === "delivered").length;
  const pending    = orders.filter((o) => ["pending","confirmed","shipped"].includes(o.status)).length;

  return (
    <div className="profile-content card-white content-elevated">

      {/* ════════════════════════ DASHBOARD ════════════════════════ */}
      {activeTab === "dashboard" && (
        <div>
          <h3 className="tab-title">Dashboard</h3>
          <div className="dashboard-grid">
            <DashCard label="Total Orders"      value={orders.length}                  icon={<IcoBox />} accent="#3b82f6" />
            <DashCard label="Delivered"         value={delivered}                       icon={<IcoCheck />} accent="#22c55e" />
            <DashCard label="Pending/Shipping"  value={pending}                         icon={<IcoTruck />} accent="#a855f7" />
            <DashCard label="Total Spent"       value={`Rs. ${totalSpent.toLocaleString()}`} icon={<IcoWallet />} accent="#f59e0b" />
            <DashCard label="Reviews"           value={reviews.length}                  icon={<IcoStar />} accent="#ec4899" />
            <DashCard label="Loyalty Points"    value={`${profile?.points || 0} pts`}  icon={<IcoTrophy />} accent="#14b8a6" />
          </div>

          {orders.length > 0 && (
            <div style={{ marginTop: 28 }}>
              <h4>Recent Orders</h4>
              {orders.slice(0, 3).map((o) => (
                <div key={o._id} className="order-card" style={{ marginBottom: 10 }}>
                  <div className="order-row">
                    <div>
                      <div className="order-id">#{(o._id || "").slice(-8)}</div>
                      <div className="order-date">{new Date(o.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="order-total">Rs. {(o.totalPrice || 0).toLocaleString()}</div>
                      <span className="order-status-badge" style={{ background: STATUS_COLORS[o.status] || "#999" }}>
                        {o.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════ ORDERS ════════════════════════ */}
      {activeTab === "orders" && (
        <div>
          <h3 className="tab-title">Order History</h3>
          {loading ? <Loader /> :
           orders.length === 0 ? <Empty msg="No orders yet." /> : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order._id} className="order-card">
                  <div className="order-row">
                    <div>
                      <div className="order-id">Order #{(order._id || "").slice(-8)}</div>
                      <div className="order-date">{new Date(order.createdAt).toLocaleString()}</div>
                      <div className="order-address">
                        📍 {order.shippingAddress?.address}, {order.shippingAddress?.city}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="order-total">Rs. {(order.totalPrice || 0).toLocaleString()}</div>
                      <span className="order-status-badge" style={{ background: STATUS_COLORS[order.status] || "#999" }}>
                        {order.status}
                      </span>
                      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
                        <button className="btn btn-secondary" onClick={() => setOrderViewing(order)}>View</button>
                        {["pending","confirmed"].includes(order.status) && (
                          <button className="btn btn-danger" onClick={() => cancelOrder(order._id)}>Cancel</button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Order items with product images */}
                  <div className="order-items-list">
                    {(order.orderItems || []).map((it, idx) => (
                      <div key={idx} className="order-item-row">
                        <img
                          src={makeUrl(it.image || it.images?.[0])}
                          alt={it.name}
                          className="order-item-img"
                          onError={(e) => { e.target.src = "/placeholder.png"; }}
                        />
                        <div className="order-item-info">
                          <div className="order-item-name">{it.name}</div>
                          <div className="order-item-qty">{it.qty || 1} × Rs. {(it.price || 0).toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════ ACCOUNT ════════════════════════ */}
      {activeTab === "account" && (
        <div>
          <h3 className="tab-title">Account Details</h3>
          <div className="form-section">
            <div className="form-group">
              <label>Full Name</label>
              <input value={accountForm.name} onChange={(e) => setAccountForm((p) => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Email (read only)</label>
              <input value={profile?.email || ""} readOnly style={{ background: "#f5f5f5" }} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input value={accountForm.phone} onChange={(e) => setAccountForm((p) => ({ ...p, phone: e.target.value }))} placeholder="03xxxxxxxxx" />
            </div>

            <h4 style={{ marginTop: 24 }}>Change Password</h4>
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" value={accountForm.currentPassword} onChange={(e) => setAccountForm((p) => ({ ...p, currentPassword: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" value={accountForm.newPassword} onChange={(e) => setAccountForm((p) => ({ ...p, newPassword: e.target.value }))} />
            </div>

            <button className="btn btn-primary" onClick={saveAccount} disabled={savingAccount}>
              {savingAccount ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}

      {/* ════════════════════════ ADDRESSES ════════════════════════ */}
      {activeTab === "addresses" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 className="tab-title" style={{ margin: 0 }}>Saved Addresses</h3>
            <button className="btn btn-primary" onClick={() => openAddr()}>+ Add Address</button>
          </div>

          {loading ? <Loader /> :
           addresses.length === 0 ? <Empty msg="No addresses saved. Add one to speed up checkout." /> : (
            <div className="address-list" style={{ marginTop: 20 }}>
              {addresses.map((a) => (
                <div key={a._id || a.id} className="address-item">
                  {a.isDefault && <span className="default-badge">Default</span>}
                  <div className="address-meta">{a.name} · {a.phone}</div>
                  <div className="address-line">{[a.street, a.city, a.state, a.postalCode, a.country].filter(Boolean).join(", ")}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button className="btn btn-secondary" onClick={() => openAddr(a)}>Edit</button>
                    <button className="btn btn-danger"    onClick={() => deleteAddress(a._id || a.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════ EARNING POINTS ════════════════════════ */}
      {activeTab === "points" && (
        <div>
          <h3 className="tab-title">Earning Points</h3>

          {/* Points balance */}
          <div className="points-hero">
            <div className="points-circle">
              <span className="points-number">{profile?.points || 0}</span>
              <span className="points-label">Points</span>
            </div>
            <div className="points-meta">
              <p>Every Rs. 100 you spend = <strong>1 point</strong></p>
              <p>100 points = <strong>Rs. 100 discount</strong> on your next order</p>
            </div>
          </div>

          {/* How to earn */}
          <div className="points-how">
            <h4>How to Earn Points</h4>
            <div className="points-rules">
              <PointRule icon={<IcoBag />} label="Make a purchase"   desc="Earn 1 pt per Rs. 100 spent" />
              <PointRule icon={<IcoStar />} label="Write a review"    desc="Earn 5 pts per review" />
              <PointRule icon={<IcoUser />} label="Complete profile"  desc="Earn 10 pts for adding your details" />
              <PointRule icon={<IcoUsers />} label="Refer a friend"    desc="Earn 20 pts per referral (coming soon)" />
            </div>
          </div>

          {/* Points history (from orders) */}
          {orders.length > 0 && (
            <div style={{ marginTop: 28 }}>
              <h4>Points Earned From Orders</h4>
              <div className="points-history">
                {orders
                  .filter((o) => o.status === "delivered")
                  .map((o) => {
                    const pts = Math.floor((o.totalPrice || 0) / 100);
                    return (
                      <div key={o._id} className="points-history-row">
                        <div>
                          <div style={{ fontWeight: 600 }}>Order #{(o._id || "").slice(-8)}</div>
                          <div style={{ color: "#888", fontSize: 13 }}>{new Date(o.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div className="points-earned">+{pts} pts</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════ MY REVIEWS ════════════════════════ */}
      {activeTab === "to-review" && (
        <div>
          <h3 className="tab-title">My Reviews</h3>
          {loading ? <Loader /> :
           reviews.length === 0 ? (
            <div className="reviews-empty">
              <p>You haven't written any reviews yet.</p>
              <p style={{ color: "#888", fontSize: 14 }}>After receiving an order, visit the product page to leave a review.</p>
            </div>
          ) : (
            <div className="reviews-list">
              {reviews.map((r) => (
                <ReviewCard
                  key={r._id || r.id}
                  review={r}
                  onWriteReview={openEditReview}
                  onDelete={deleteReview}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ════════════ MODALS ════════════ */}

      {/* Review edit modal */}
      {showReviewModal && selectedReview && (
        <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Review</h3>
              <button className="modal-close" onClick={() => setShowReviewModal(false)}>✕</button>
            </div>

            <div className="review-product-preview">
              <img
                src={makeUrl(selectedReview.product?.images?.[0])}
                alt="product"
                onError={(e) => { e.target.src = "/placeholder.png"; }}
              />
              <div>
                <div style={{ fontWeight: 700 }}>{selectedReview.product?.name || "Product"}</div>
                <div style={{ color: "#888", fontSize: 13 }}>
                  Reviewed on {new Date(selectedReview.createdAt || Date.now()).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Rating</label>
              <div className="star-picker">
                {[1,2,3,4,5].map((s) => (
                  <button
                    key={s}
                    className={`star-btn ${reviewForm.rating >= s ? "filled" : ""}`}
                    onClick={() => setReviewForm((p) => ({ ...p, rating: s }))}
                  >★</button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Your Review</label>
              <textarea
                value={reviewForm.text}
                onChange={(e) => setReviewForm((p) => ({ ...p, text: e.target.value }))}
                rows={4}
                placeholder="Share your experience..."
              />
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" onClick={submitEditReview} disabled={savingReview}>
                {savingReview ? "Saving..." : "Save Changes"}
              </button>
              <button className="btn btn-secondary" onClick={() => setShowReviewModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Order detail modal */}
      {orderViewing && (
        <div className="modal-overlay" onClick={() => setOrderViewing(null)}>
          <div className="modal-content modal-wide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Order Details</h3>
              <button className="modal-close" onClick={() => setOrderViewing(null)}>✕</button>
            </div>

            <div className="order-detail-meta">
              <div><strong>Order ID:</strong> {orderViewing._id}</div>
              <div><strong>Date:</strong> {new Date(orderViewing.createdAt).toLocaleString()}</div>
              <div><strong>Status:</strong> <span style={{ color: STATUS_COLORS[orderViewing.status] }}>{orderViewing.status}</span></div>
              <div><strong>Payment:</strong> {orderViewing.paymentMethod?.toUpperCase()}</div>
              <div><strong>Address:</strong> {orderViewing.shippingAddress?.address}, {orderViewing.shippingAddress?.city}</div>
            </div>

            <div className="order-items-list" style={{ marginTop: 16 }}>
              {(orderViewing.orderItems || []).map((it, idx) => (
                <div key={idx} className="order-item-row">
                  <img
                    src={makeUrl(it.image || it.images?.[0])}
                    alt={it.name}
                    className="order-item-img"
                    onError={(e) => { e.target.src = "/placeholder.png"; }}
                  />
                  <div className="order-item-info">
                    <div className="order-item-name">{it.name}</div>
                    <div className="order-item-qty">{it.qty} × Rs. {(it.price || 0).toLocaleString()}</div>
                  </div>
                  <div className="order-item-total">Rs. {((it.qty || 1) * (it.price || 0)).toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className="order-total-section">
              <div>Subtotal: <strong>Rs. {(orderViewing.itemsPrice || 0).toLocaleString()}</strong></div>
              <div>Shipping: <strong>Rs. {(orderViewing.shippingPrice || 0).toLocaleString()}</strong></div>
              <div className="grand-total">Total: <strong>Rs. {(orderViewing.totalPrice || 0).toLocaleString()}</strong></div>
            </div>

            <div className="form-actions">
              {["pending","confirmed"].includes(orderViewing.status) && (
                <button
                  className="btn btn-danger"
                  onClick={() => cancelOrder(orderViewing._id)}
                  disabled={cancellingOrder}
                >
                  {cancellingOrder ? "Cancelling..." : "Cancel Order"}
                </button>
              )}
              <button className="btn btn-secondary" onClick={() => setOrderViewing(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Address modal */}
      {showAddrModal && (
        <AddressModal address={editingAddr} onSave={saveAddress} onClose={closeAddr} />
      )}
    </div>
  );
}

// ── Small helper components ────────────────────────────────────────────────────

function DashCard({ label, value, icon, accent = "#3b82f6" }) {
  return (
    <div className="dash-card">
      <div className="dash-icon" style={{ color: accent, background: `${accent}1A` }}>{icon}</div>
      <div className="dash-value">{value}</div>
      <div className="dash-label">{label}</div>
    </div>
  );
}

function PointRule({ icon, label, desc }) {
  return (
    <div className="point-rule">
      <span className="point-rule-icon">{icon}</span>
      <div>
        <div style={{ fontWeight: 600 }}>{label}</div>
        <div style={{ color: "#888", fontSize: 13 }}>{desc}</div>
      </div>
    </div>
  );
}

function Loader() {
  return <div className="profile-loader">Loading...</div>;
}

function Empty({ msg }) {
  return <p style={{ color: "#888", marginTop: 16 }}>{msg}</p>;
}

function AddressModal({ address, onSave, onClose }) {
  const [form, setForm] = useState({
    name: "", phone: "", street: "", city: "", state: "", postalCode: "", country: "Pakistan", isDefault: false,
    ...address,
  });

  useEffect(() => {
    if (address) setForm({ name: "", phone: "", street: "", city: "", state: "", postalCode: "", country: "Pakistan", isDefault: false, ...address });
  }, [address]);

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = () => {
    if (!form.name || !form.phone || !form.street || !form.city) {
      alert("Please fill: name, phone, street and city.");
      return;
    }
    onSave(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{address ? "Edit Address" : "Add Address"}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input name="name" value={form.name} onChange={change} placeholder="Ali Ahmed" />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input name="phone" value={form.phone} onChange={change} placeholder="03xxxxxxxxx" />
            </div>
          </div>
          <div className="form-group">
            <label>Street / House # *</label>
            <input name="street" value={form.street} onChange={change} placeholder="House 12, Block A, Gulshan" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input name="city" value={form.city} onChange={change} placeholder="Karachi" />
            </div>
            <div className="form-group">
              <label>State / Province</label>
              <input name="state" value={form.state} onChange={change} placeholder="Sindh" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Postal Code</label>
              <input name="postalCode" value={form.postalCode} onChange={change} placeholder="75500" />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input name="country" value={form.country} onChange={change} placeholder="Pakistan" />
            </div>
          </div>
          <label className="checkbox-label">
            <input type="checkbox" name="isDefault" checked={form.isDefault} onChange={change} />
            &nbsp; Set as default address
          </label>

          <div className="form-actions" style={{ marginTop: 20 }}>
            <button className="btn btn-primary" onClick={submit}>{address ? "Update" : "Add Address"}</button>
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
