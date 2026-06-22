import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

const Navbar = ({ setShowLogin }) => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const getCurrentLink = () => {
    const path = window.location.pathname;
    if (path === "/" || path === "/home") return "home";
    if (path.includes("/blog")) return "blog";
    if (path.includes("/shop")) return "shop";
    if (path.includes("/about")) return "about";
    if (path.includes("/contact")) return "contact";
    return "home";
  };

  const [activeLink, setActiveLink] = useState(getCurrentLink());
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMenuOpen(false);
  };

  // ✅ UPDATED: Handle logout with navigation
  const handleLogout = async () => {
    await logout();
    setDropOpen(false);
    navigate("/");  // ✅ Redirect to home after logout
  };

  return (
    <>
      <nav className="navbar">
        {/* LEFT - Logo */}
        <div className="navbar-logo">
          <a href="/">
            <img src={assets.logo2} alt="Shaheen Mobiles Logo" className="logo-img" />
          </a>
        </div>

        {/* CENTER - Nav Links */}
        <ul className={`navbar-links ${menuOpen ? "menu-open" : ""}`}>
          <li>
            <a
              href="/"
              className={activeLink === "home" ? "active" : ""}
              onClick={() => handleLinkClick("home")}
            >
              home
            </a>
          </li>
          <li>
            <a
              href="/blog"
              className={activeLink === "blog" ? "active" : ""}
              onClick={() => handleLinkClick("blog")}
            >
              blog
            </a>
          </li>
          <li>
            <a
              href="/shop"
              className={activeLink === "shop" ? "active" : ""}
              onClick={() => handleLinkClick("shop")}
            >
              shop
            </a>
          </li>
          <li>
            <a
              href="/about"
              className={activeLink === "about" ? "active" : ""}
              onClick={() => handleLinkClick("about")}
            >
              about
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className={activeLink === "contact" ? "active" : ""}
              onClick={() => handleLinkClick("contact")}
            >
              contact us
            </a>
          </li>
        </ul>

        {/* RIGHT - Icons */}
        <div className="navbar-right">
          {/* Search */}
          <button
            className="icon-link"
            onClick={() => navigate("/shop?focus=1")}
            aria-label="Search"
          >
            <img src={assets.search_icon} alt="Search" className="nav-icon" />
          </button>

          {/* Cart */}
          <a
            href="#"
            className="icon-link cart-wrapper"
            onClick={(e) => {
              e.preventDefault();
              navigate("/cart");
            }}
          >
            <img src={assets.cart_icon} alt="Cart" className="nav-icon" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </a>

          {/* User Dropdown */}
          {user ? (
            <div className="user-menu">
              <button
                className="user-btn"
                onClick={() => setDropOpen(!dropOpen)}
              >
                <span className="user-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
                <span className="user-name">{user.name?.split(" ")[0]}</span>
                <span className="drop-arrow">▾</span>
              </button>
              {dropOpen && (
                <div className="user-dropdown">
                  <div className="drop-header">
                    <p className="drop-name">{user.name}</p>
                    <p className="drop-email">{user.email}</p>
                  </div>
                  <hr />
                  
                  <button
                    className="drop-item"
                    onClick={() => {
                      navigate("/account");
                      setDropOpen(false);
                    }}
                  >
                    <img
                      src={assets.profile_icon}
                      alt="Profile"
                      className="dropdown-icon"
                    />{" "}
                    Profile
                  </button>
                  <hr />
                  {/* ✅ UPDATED: Use handleLogout function */}
                  <button
                    className="drop-logout"
                    onClick={handleLogout}
                  >
                    <img
                      src={assets.logout_icon}
                      alt="Logout"
                      className="dropdown-icon"
                    />{" "}
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="signin-btn"
              onClick={() => setShowLogin(true)}
            >
              sign in
            </button>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div
        className={`menu-overlay ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;