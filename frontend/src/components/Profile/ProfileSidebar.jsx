import React from "react";
import profilePic from "../../assets/profile.jpg";

// Import icons
import dashboardIcon from "../../assets/icons/dashboard (1).png";
import profileIcon from "../../assets/icons/profile.png";
import reviewIcon from "../../assets/icons/review.png";
import rewardIcon from "../../assets/icons/reward.png";
import locationIcon from "../../assets/icons/location.png";
import creditCardIcon from "../../assets/icons/credit-card.png";
import logoutIcon from "../../assets/icons/icons8-logout-50.png"; // ✅ new logout icon

export default function ProfileSidebar({ user, activeTab, setActiveTab }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: dashboardIcon },
    { id: "orders", label: "Order History", icon: creditCardIcon },
    { id: "account", label: "Account Details", icon: profileIcon },
    { id: "addresses", label: "Address", icon: locationIcon },
    { id: "points", label: "Earning Point", icon: rewardIcon },
    { id: "to-review", label: "To Review", icon: reviewIcon },
  ];

  return (
    <div className="profile-sidebar card-light sidebar-elevated">
      <div className="sidebar-top">
        <div className="avatar-wrap">
          <img
            src={user?.avatar || profilePic}
            alt={user?.name || "User avatar"}
            className="profile-avatar"
          />
        </div>
        <div className="sidebar-user">
          <div className="hello-text">Hello</div>
          <h3 className="sidebar-username">{user?.name || "Jenny Wilson"}</h3>
          <p className="sidebar-email">
            {user?.email || "jenny@example.com"}
          </p>
        </div>
      </div>

      <ul className="account-menu">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={activeTab === item.id ? "active" : ""}
            onClick={() => setActiveTab(item.id)}
          >
            <img src={item.icon} alt={`${item.label} icon`} className="menu-icon" />
            {item.label}
          </li>
        ))}
        <li
          className={`logout-item ${activeTab === "logout" ? "active" : ""}`}
          onClick={() => setActiveTab("logout")}
        >
          <img src={logoutIcon} alt="Logout icon" className="menu-icon" />
          Logout
        </li>
      </ul>
    </div>
  );
}