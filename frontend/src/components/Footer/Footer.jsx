import React from "react";
import "./Footer.css";
import logo2 from "../../assets/icons/logo3.png";

// ================= SOCIAL ICONS =================

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" className="social-svg">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" className="social-svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" className="social-svg">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" className="social-svg">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// ================= CONTACT ICONS =================

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#aaaaaa" strokeWidth="2" className="contact-icon">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.46 2 2 0 0 1 3.58 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l1.12-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#aaaaaa" strokeWidth="2" className="contact-icon">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="2" className="clock-icon">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="#c0392b" stroke="none" className="heart-icon">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

// ================= SOCIAL LINKS =================

const socialLinks = [
  {
    href: "https://web.facebook.com/profile.php?id=100086745979211",
    Icon: FacebookIcon,
    alt: "Facebook",
  },
  {
    href: "https://www.instagram.com/mobiles.shaheen?igsh=cmZpOWRrZWx2NHBw",
    Icon: InstagramIcon,
    alt: "Instagram",
  },
  {
    href: "https://wa.me/923146406491",
    Icon: WhatsAppIcon,
    alt: "WhatsApp",
  },
  {
    href: "https://www.tiktok.com/@shaheenmobiles99?_r=1&_t=ZS-97Px32zwxXd",
    Icon: TikTokIcon,
    alt: "TikTok",
  },
];

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        {/* BRAND */}
        <div className="footer-col footer-brand-col">
          <img src={logo2} alt="Shaheen Mobiles" className="footer-logo" />

          <p className="footer-brand-desc">
            Premium smartphones with authenticity, trust, and best deals.
          </p>

          <div className="footer-socials">
            {socialLinks.map((item) => {
              const Icon = item.Icon;

              return (
                <a
                  key={item.alt}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                  aria-label={item.alt}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* LINKS */}
        <div className="footer-col">
          <h4 className="footer-col-title">Customer Service</h4>
          <ul className="footer-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Returns</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">About</h4>
          <ul className="footer-links">
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-col footer-visit-col">
          <h4 className="footer-col-title">Visit Us</h4>

          <p className="footer-address">
            SHAHEEN MOBILES<br />
            Nawaz Chowk Kamalia<br />
            Punjab, Pakistan
          </p>

          <div className="footer-contact-info">
            <div className="contact-row">
              <PhoneIcon />
              <a href="tel:+923146406491">+92 314 6406491</a>
            </div>

            <div className="contact-row">
              <MailIcon />
              <a href="mailto:Shaheenmobiles991@gmail.com">
                Shaheenmobiles991@gmail.com
              </a>
            </div>
          </div>

          <div className="footer-hours">
            <div className="hour-row">
              <ClockIcon />
              <p><strong>Mon-Sat:</strong> 10AM - 9PM</p>
            </div>
            <div className="hour-row">
              <ClockIcon />
              <p><strong>Sunday:</strong> 12PM - 8PM</p>
            </div>
          </div>
        </div>

      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <p>© 2026 <span>Shaheen Mobiles</span>. All Rights Reserved.</p>
        <div className="made-in-pak">
          Made with <HeartIcon /> in Pakistan
        </div>
      </div>

    </footer>
  );
}

export default Footer;