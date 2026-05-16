// frontend/src/components/Profile/ProfilePage.jsx
import React, { useEffect, useState, useCallback } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";
import "./Profile.css";
import { getProfile, getReviews } from "../../utils/api";
import API, { IMG_BASE } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("to-review");
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [orders, setOrders] = useState([]);

  const makeUrl = (path) => {
    if (!path) return "/placeholder.png";
    if (typeof path !== "string") return "/placeholder.png";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    if (path.startsWith(IMG_BASE)) return path;
    const p = path.startsWith("/") ? path : `/${path}`;
    return `${IMG_BASE}${p}`;
  };

  const enrichReviewsWithProduct = useCallback(async (rawReviews = []) => {
    const enriched = await Promise.all(
      (rawReviews || []).map(async (r) => {
        try {
          const productId = r.productId || r.product?._id || r.productId;
          if (!productId) return r;
          const resp = await API.get(`/products/${productId}`);
          const prod = resp?.data?.product || resp?.data || null;
          if (!prod) return r;

          // Build absolute image URLs
          const imagesRaw = (prod.images && prod.images.length) ? prod.images : (prod.image ? [prod.image] : []);
          const images = (imagesRaw || []).map((p) => makeUrl(p));

          return {
            ...r,
            product: {
              _id: prod._id,
              name: prod.name,
              images,
              price: prod.price,
            },
          };
        } catch (err) {
          return r;
        }
      })
    );
    return enriched;
  }, []);

  const loadData = useCallback(async () => {
    if (user) setProfile(user);
    try {
      const raw = await getReviews(); // GET /api/reviews
      const rawReviews = Array.isArray(raw) ? raw : raw?.reviews || raw?.data || [];
      const enriched = await enrichReviewsWithProduct(rawReviews);
      setReviews(enriched || []);
    } catch (err) {
      setReviews([]);
    }

    try {
      const p = await getProfile();
      if (p) setProfile((prev) => ({ ...prev, ...p }));
    } catch (e) {}

    // orders: leave as is or fetch with getMyOrders if needed
  }, [user, enrichReviewsWithProduct]);

  useEffect(() => {
    loadData();
    const handler = (e) => { loadData(); };
    window.addEventListener("review:submitted", handler);
    return () => window.removeEventListener("review:submitted", handler);
  }, [loadData]);

  return (
    <div className="profile-page">
      <ProfileHeader />
      <div className="container profile-container">
        <div className="profile-grid">
          <aside className="profile-sidebar-wrap">
            <ProfileSidebar user={profile} activeTab={activeTab} setActiveTab={setActiveTab} />
          </aside>
          <main className="profile-main">
            <ProfileContent activeTab={activeTab} reviews={reviews} profile={profile} orders={orders} />
          </main>
        </div>
      </div>
    </div>
  );
}