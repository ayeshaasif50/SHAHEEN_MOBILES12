// frontend/src/components/Profile/ProfilePage.jsx
import React, { useEffect, useState, useCallback } from "react";
import ProfileHeader  from "./ProfileHeader";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";
import "./Profile.css";
import API, { IMG_BASE } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const makeUrl = (p) => {
  if (!p || typeof p !== "string") return "/placeholder.png";
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  if (p.startsWith(IMG_BASE)) return p;
  return `${IMG_BASE}${p.startsWith("/") ? p : `/${p}`}`;
};

export default function ProfilePage() {
  const { user, setUser } = useAuth();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [profile,   setProfile]   = useState(null);
  const [reviews,   setReviews]   = useState([]);
  const [orders,    setOrders]    = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading,   setLoading]   = useState(false);

  // ── Fetch addresses separately ─────────────────────────
  const fetchAddresses = useCallback(async () => {
    try {
      // Try dedicated addresses endpoint first
      const res = await API.get("/auth/addresses");
      const data = res.data?.addresses || res.data || [];
      if (Array.isArray(data) && data.length >= 0) {
        setAddresses(data);
        return;
      }
    } catch (_) {}

    // Fallback: get from /auth/me
    try {
      const res = await API.get("/auth/me");
      const u   = res.data?.user || res.data;
      setAddresses(u?.addresses || []);
    } catch (_) {}
  }, []);

  // ── Fetch fresh profile from server ───────────────────
  const fetchProfile = useCallback(async () => {
    try {
      const res = await API.get("/auth/me");
      const u   = res.data?.user || res.data;
      if (u) {
        setProfile(u);
        setUser(u);
        // Also sync addresses from profile if no dedicated endpoint
        if (Array.isArray(u.addresses)) {
          setAddresses(u.addresses);
        }
      }
    } catch (_) {}
  }, [setUser]);

  // ── Fetch orders ──────────────────────────────────────
  const fetchOrders = useCallback(async () => {
    try {
      const res = await API.get("/orders/my");
      const raw = res.data?.orders || res.data || [];
      const enriched = await Promise.all(
        raw.map(async (order) => {
          const items = await Promise.all(
            (order.orderItems || []).map(async (it) => {
              if (it.image) return it;
              try {
                const pr   = await API.get(`/products/${it.product}`);
                const prod = pr.data?.product || pr.data;
                const img  = prod?.images?.[0] || prod?.image || "";
                return { ...it, image: img };
              } catch (_) { return it; }
            })
          );
          return { ...order, orderItems: items };
        })
      );
      setOrders(enriched);
    } catch (_) { setOrders([]); }
  }, []);

  // ── Fetch reviews ─────────────────────────────────────
  const fetchReviews = useCallback(async () => {
    const uid = user?._id || user?.id;
    if (!uid) { setReviews([]); return; }
    try {
      const res = await API.get("/reviews", { params: { userId: uid } });
      let raw   = res.data?.reviews || res.data || [];
      if (!Array.isArray(raw)) raw = [];
      raw = raw.filter((r) => {
        const rUid = r.userId?._id || r.userId || r.user?._id || r.user;
        return !rUid || String(rUid) === String(uid);
      });

      const enriched = await Promise.all(
        raw.map(async (r) => {
          const productId = r.productId || r.product?._id;
          if (!productId) return r;
          try {
            const pr   = await API.get(`/products/${productId}`);
            const prod = pr.data?.product || pr.data;
            if (!prod) return r;
            const imgs = (prod.images?.length ? prod.images : prod.image ? [prod.image] : []).map(makeUrl);
            return {
              ...r,
              product: { _id: prod._id, name: prod.name, images: imgs, price: prod.price },
            };
          } catch (_) { return r; }
        })
      );
      setReviews(enriched);
    } catch (_) { setReviews([]); }
  }, [user]);

  // ── Load everything on mount ──────────────────────────
  const loadAll = useCallback(async () => {
    setLoading(true);
    if (user) setProfile(user);
    await Promise.all([fetchProfile(), fetchOrders(), fetchReviews(), fetchAddresses()]);
    setLoading(false);
  }, [user, fetchProfile, fetchOrders, fetchReviews, fetchAddresses]);

  useEffect(() => {
    loadAll();
    const handler = () => loadAll();
    window.addEventListener("review:submitted", handler);
    window.addEventListener("profile:updated",  handler);
    return () => {
      window.removeEventListener("review:submitted", handler);
      window.removeEventListener("profile:updated",  handler);
    };
  }, [loadAll]);

  // ── onAddressChange: fetch both profile + addresses ───
  const handleAddressChange = useCallback(async () => {
    await fetchProfile();
    await fetchAddresses();
  }, [fetchProfile, fetchAddresses]);

  return (
    <div className="profile-page">
      <ProfileHeader />
      <div className="container profile-container">
        <div className="profile-grid">
          <aside className="profile-sidebar-wrap">
            <ProfileSidebar
              user={profile}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onAvatarUpdate={fetchProfile}
            />
          </aside>
          <main className="profile-main">
            <ProfileContent
              activeTab={activeTab}
              profile={profile}
              reviews={reviews}
              orders={orders}
              addresses={addresses}
              loading={loading}
              onAddressChange={handleAddressChange}
              onOrderChange={fetchOrders}
              onReviewChange={fetchReviews}
              onProfileChange={fetchProfile}
            />
          </main>
        </div>
      </div>
    </div>
  );
}