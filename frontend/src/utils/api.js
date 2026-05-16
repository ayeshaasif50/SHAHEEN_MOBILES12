import axios from "axios";

const API_BASE =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE) ||
  (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_BASE) ||
  "http://localhost:5000";

const API = axios.create({
  baseURL: `${API_BASE.replace(/\/$/, "")}/api`,
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("shaheenToken") || localStorage.getItem("token");

  if (token) {
    req.headers = req.headers || {};
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("shaheenUser");
      localStorage.removeItem("shaheenToken");
      localStorage.removeItem("loginTime");
    }

    return Promise.reject(err);
  }
);

export const IMG_BASE = API_BASE.replace(/\/$/, "");
export default API;

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

export async function getReviews() {
  try {
    const res = await API.get("/reviews");

    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.data?.reviews)) return res.data.reviews;

    return [];
  } catch (err) {
    console.error("getReviews error:", err.response?.data || err.message || err);
    return [];
  }
}

export async function createOrder(orderPayload) {
  const res = await API.post("/orders", orderPayload);
  return res.data;
}

export async function getMyOrders() {
  const res = await API.get("/orders/myorders");
  return res.data;
}

export async function createPaymentIntent(amount, currency = "pkr") {
  const res = await API.post("/orders/create-payment-intent", {
    amount,
    currency,
  });

  return res.data;
}