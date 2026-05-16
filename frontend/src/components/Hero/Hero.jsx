import React from "react";
import { assets } from "../../assets/assets";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">

      {/* Background Banner Image */}
      <img src={assets.banner} alt="Shaheen Mobiles Banner" className="hero-banner" />

      {/* Dark Overlay */}
      <div className="hero-overlay"></div>

      {/* Text Content */}
      <div className="hero-content">

        {/* Tag */}
        <span className="hero-tag">✦ Shaheen Mobiles</span>

        {/* Title */}
        <h1 className="hero-title">
          Discover The <span>Latest</span> <br /> Smartphones
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Premium Devices From Trusted Brands
        </p>

        {/* Button */}
        <a href="/shop">
          <button className="hero-btn">🛒 Shop Now</button>
        </a>

      </div>
    </div>
  );
};

export default Hero;