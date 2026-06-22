// frontend/src/utils/profileApi.js
import API from "./api";

/* PROFILE */
export async function getProfile() {
  try {
    const res = await API.get("/profile");
    return res.data;
  } catch (err) {
    try {
      const saved = localStorage.getItem("shaheenUser");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }
}

/* REVIEWS */
export async function getReviews() {
  try {
    const res = await API.get("/reviews");
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.data?.reviews)) return res.data.reviews;
    return [];
  } catch (err) {
    console.error("getReviews error:", err?.response?.data || err.message || err);
    return [];
  }
}

export async function updateReview(reviewId, payload) {
  const res = await API.put(`/reviews/${reviewId}`, payload);
  return res.data;
}

export async function deleteReview(reviewId) {
  const res = await API.delete(`/reviews/${reviewId}`);
  return res.data;
}

/* ORDERS */
export async function getMyOrders() {
  try {
    const res = await API.get("/orders/myorders");
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.data?.orders)) return res.data.orders;
    return [];
  } catch (err) {
    console.error("getMyOrders error:", err);
    return [];
  }
}

export async function getOrderById(orderId) {
  const res = await API.get(`/orders/${orderId}`);
  return res.data;
}

export async function cancelOrder(orderId) {
  try {
    const res = await API.put(`/orders/${orderId}/cancel`);
    return res.data;
  } catch (err) {
    // fallback to delete
    const res2 = await API.delete(`/orders/${orderId}`);
    return res2.data;
  }
}

/* ADDRESSES */
export async function getAddresses() {
  try {
    const res = await API.get("/users/addresses");
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.data?.addresses)) return res.data.addresses;
    return [];
  } catch (err) {
    console.error("getAddresses error:", err);
    return [];
  }
}

export async function addAddress(payload) {
  const res = await API.post("/users/addresses", payload);
  return res.data;
}

export async function updateAddress(id, payload) {
  const res = await API.put(`/users/addresses/${id}`, payload);
  return res.data;
}

export async function deleteAddress(id) {
  const res = await API.delete(`/users/addresses/${id}`);
  return res.data;
}

/* DASHBOARD / POINTS */
export async function getDashboardStats() {
  try {
    const res = await API.get("/users/dashboard");
    return res.data || {};
  } catch (err) {
    return {};
  }
}

export async function getEarningPoints() {
  try {
    const res = await API.get("/users/points");
    return res.data || { points: 0 };
  } catch (err) {
    return { points: 0 };
  }
}

/* default export convenience */
export default {
  getProfile,
  getReviews,
  updateReview,
  deleteReview,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  getDashboardStats,
  getEarningPoints,
};