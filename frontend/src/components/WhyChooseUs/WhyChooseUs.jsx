import React from "react";
import { assets } from "../../assets/assets";
import "./WhyChooseUs.css";

const features = [
  {
    id: 1,
    icon: assets.secure,
    title: "100% Genuine & PTA Approved",
    desc: "We deal exclusively in original, brand-authorized smartphones. Every device is PTA approved and verified to ensure complete authenticity and peace of mind.",
  },
  {
    id: 2,
    icon: assets.wallet,
    title: "Competitive Market Pricing",
    desc: "Our pricing offers maximum value without compromising quality. We monitor the market to provide the most competitive rates with exclusive seasonal deals.",
  },
  {
    id: 3,
    icon: assets.fast_delivery,
    title: "Fast & Secure Nationwide Delivery",
    desc: "Safe, secure and timely delivery across Pakistan. Every order is carefully packaged and delivered within 2–4 working days.",
  },
  {
    id: 4,
    icon: assets.credit_card,
    title: "Flexible Payment Options",
    desc: "Multiple secure payment methods including Cash on Delivery, bank transfers, JazzCash and EasyPaisa for your convenience.",
  },
  {
    id: 5,
    icon: assets.secure,
    title: "Reliable After-Sales Support",
    desc: "Our commitment doesn't end at purchase. We provide dedicated support for warranty claims, product guidance and post-purchase inquiries.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-section">

      {/* ===== HEADER ===== */}
      <div className="why-header">
        <p className="why-tag">✦ Our Promise</p>
        <h2 className="why-title">WHY CHOOSE US<span>.</span></h2>
        <div className="why-divider"></div>
        <p className="why-subtitle">
          Delivering Innovation, Authenticity, and Trust — All in One Place.
          At Shaheen Mobiles, we are committed to providing premium smartphones
          with unmatched reliability, competitive pricing, and exceptional
          customer service across Pakistan.
        </p>
      </div>

      {/* ===== CARDS ===== */}
      <div className="why-cards">
        {features.map((f) => (
          <div key={f.id} className="why-card">
            <div className="why-icon">
              <img src={f.icon} alt={f.title} className="why-icon-img" />
            </div>
            <h3 className="why-card-title">{f.title}</h3>
            <p className="why-card-desc">{f.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default WhyChooseUs;