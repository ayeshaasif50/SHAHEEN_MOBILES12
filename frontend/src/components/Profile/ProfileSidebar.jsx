// frontend/src/components/Profile/ProfileSidebar.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API, { IMG_BASE } from "../../utils/api";
import defaultAvatar  from "../../assets/profile.jpg";

const IMG_BASE_URL = IMG_BASE || "http://localhost:5000";

const makeUrl = (p) => {
  if (!p || typeof p !== "string") return null;
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  return `${IMG_BASE_URL}${p.startsWith("/") ? p : `/${p}`}`;
};

// ── Clean line-style icons (no PNG stickers) ───────────────────────────────
const IconBase = (props) => (
  <svg
    width="19" height="19" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    {...props}
  />
);
const DashboardIcon = () => (
  <IconBase><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></IconBase>
);
const OrdersIcon = () => (
  <IconBase><path d="M3 7h18l-1.5 12.5a2 2 0 0 1-2 1.5H6.5a2 2 0 0 1-2-1.5L3 7Z" /><path d="M8 7V5a4 4 0 0 1 8 0v2" /></IconBase>
);
const AccountIcon = () => (
  <IconBase><circle cx="12" cy="8" r="4" /><path d="M4 21c1.6-4 5-6 8-6s6.4 2 8 6" /></IconBase>
);
const AddressIcon = () => (
  <IconBase><path d="M12 22s7-7.2 7-12.5A7 7 0 0 0 5 9.5C5 14.8 12 22 12 22Z" /><circle cx="12" cy="9.5" r="2.4" /></IconBase>
);
const RewardIcon = () => (
  <IconBase><circle cx="12" cy="8" r="6" /><path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" /></IconBase>
);
const ReviewIcon = () => (
  <IconBase><path d="m12 3 2.6 5.8 6.4.6-4.8 4.3 1.4 6.3L12 17l-5.6 3 1.4-6.3-4.8-4.3 6.4-.6L12 3Z" /></IconBase>
);
const LogoutIcon = () => (
  <IconBase><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></IconBase>
);
const CameraIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const MENU = [
  { id: "dashboard", label: "Dashboard",      Icon: DashboardIcon },
  { id: "orders",    label: "Order History",  Icon: OrdersIcon    },
  { id: "account",   label: "Account Details",Icon: AccountIcon   },
  { id: "addresses", label: "Addresses",      Icon: AddressIcon   },
  { id: "points",    label: "Earning Points", Icon: RewardIcon    },
  { id: "to-review", label: "My Reviews",     Icon: ReviewIcon    },
];

export default function ProfileSidebar({ user, activeTab, setActiveTab, onAvatarUpdate }) {
  const { logout } = useAuth();
  const navigate   = useNavigate();
  const fileRef    = useRef(null);

  const [avatarSrc,   setAvatarSrc]   = useState(null);
  const [uploading,   setUploading]   = useState(false);

  // Sync avatar whenever user prop changes (e.g. after fetchProfile)
  useEffect(() => {
    const url = makeUrl(user?.avatar);
    setAvatarSrc(url || defaultAvatar);
  }, [user?.avatar]);

  // ── Upload avatar to server ────────────────────────────
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant preview
    const preview = URL.createObjectURL(file);
    setAvatarSrc(preview);

    const formData = new FormData();
    formData.append("avatar", file);

    setUploading(true);
    try {
      const res = await API.post("/upload/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success && res.data?.imageUrl) {
        const serverUrl = makeUrl(res.data.imageUrl);
        setAvatarSrc(serverUrl);
        // Tell parent (ProfilePage) to re-fetch profile so auth context is updated
        if (onAvatarUpdate) onAvatarUpdate();
      }
    } catch (err) {
      console.error("Avatar upload failed:", err);
      alert("Profile picture update nahi hui. Please try again.");
      setAvatarSrc(makeUrl(user?.avatar) || defaultAvatar);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleLogout = async () => {
    try { await API.post("/auth/logout"); } catch (_) {}
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-sidebar card-light sidebar-elevated">
      {/* ── Avatar ── */}
      <div className="sidebar-top">
        <div
          className="avatar-wrap"
          onClick={() => !uploading && fileRef.current?.click()}
          title="Change profile picture"
          style={{ cursor: uploading ? "not-allowed" : "pointer", position: "relative" }}
        >
          <img
            src={avatarSrc || defaultAvatar}
            alt={user?.name || "User"}
            className="profile-avatar"
            onError={(e) => { e.target.src = defaultAvatar; }}
          />
          {uploading && (
            <div className="avatar-uploading-overlay">
              <span>⏳</span>
            </div>
          )}
          <div className="avatar-edit-badge"><CameraIcon /></div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        <div className="sidebar-user">
          <div className="hello-text">Hello</div>
          <h3 className="sidebar-username">{user?.name || "User"}</h3>
          <p className="sidebar-email">{user?.email || ""}</p>
          <p className="sidebar-points">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="6" />
              <path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" />
            </svg>
            {user?.points ?? 0} pts
          </p>
        </div>
      </div>

      {/* ── Menu ── */}
      <ul className="account-menu">
        {MENU.map((item) => (
          <li
            key={item.id}
            className={activeTab === item.id ? "active" : ""}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="menu-icon"><item.Icon /></span>
            {item.label}
          </li>
        ))}

        <li className="logout-item" onClick={handleLogout}>
          <span className="menu-icon"><LogoutIcon /></span>
          Logout
        </li>
      </ul>
    </div>
  );
}
