import React from "react";
import "./Footer.css";

import facebook from "../../assets/icons/facebook1.png";
import instagram from "../../assets/icons/instagram1.png";
import whatsapp from "../../assets/icons/whatsapp1.png";
import tiktok from "../../assets/icons/tiktok1.png";
import logo2 from "../../assets/icons/logo3.png";

const socialLinks = [
  { href: "https://facebook.com",          img: facebook,  alt: "Facebook"  },
  { href: "https://instagram.com",         img: instagram, alt: "Instagram" },
  { href: "https://wa.me/923146406491",    img: whatsapp,  alt: "WhatsApp"  },
  { href: "https://tiktok.com",            img: tiktok,    alt: "TikTok"    },
];

const Footer = () => {
  return (
    <footer className="footer">

      {/* ===== TOP ===== */}
      <div className="footer-top">

        {/* Brand */}
        <div className="footer-col footer-brand-col">
          <img src={logo2} alt="Shaheen Mobiles" className="footer-logo" />
          <p className="footer-brand-desc">
            Premium smartphones with authenticity, trust, and the best deals —
            all under one roof in Kamalia, Punjab.
          </p>
          <div className="footer-socials">
            {socialLinks.map((s) => (
              <a
                key={s.alt}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <img src={s.img} alt={s.alt} className="social-icon" />
              </a>
            ))}
          </div>
        </div>

        {/* Customer Service */}
        <div className="footer-col">
          <h4 className="footer-col-title">Customer Service</h4>
          <ul className="footer-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Returns</a></li>
          </ul>
        </div>

        {/* About Us */}
        <div className="footer-col">
          <h4 className="footer-col-title">About Us</h4>
          <ul className="footer-links">
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-col-title">Contact</h4>
          <ul className="footer-links">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Store Location</a></li>
            <li><a href="#">Bulk Orders</a></li>
          </ul>
        </div>

        {/* Visit Us */}
        <div className="footer-col footer-visit-col">
          <h4 className="footer-col-title">Visit Us</h4>
          <p className="footer-address">
            Shaheen Mobiles, Nawaz Chowk Kamalia<br />
            Link Road, Near Govt Girls College,<br />
            Nawaz Chowk, Kamalia,<br />
            District Toba Tek Singh, Punjab, Pakistan
          </p>
          <div className="footer-contact-info">
            <p>📞 <a href="tel:+923146406491">0314 640 6491</a></p>
            <p>✉️ <a href="mailto:Shaheenmobiles991@gmail.com">Shaheenmobiles991@gmail.com</a></p>
          </div>
          <div className="footer-hours">
            <p>🕒 <strong>Mon–Sat:</strong> 10:00 AM – 9:00 PM</p>
            <p>🕒 <strong>Sunday:</strong> 12:00 PM – 8:00 PM</p>
          </div>
        </div>

      </div>

      {/* ===== DIVIDER ===== */}
      <div className="footer-divider"></div>

      {/* ===== BOTTOM ===== */}
      <div className="footer-bottom">
        <p>© 2026 <span>Shaheen Mobiles</span>. All Rights Reserved.</p>
        <p className="footer-bottom-right">Made with ❤️ in Pakistan</p>
      </div>

    </footer>
  );
};

export default Footer;