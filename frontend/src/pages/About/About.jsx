import React, { useState, useEffect } from "react";
import "./About.css";
import { assets } from "../../assets/assets";

const About = () => {
  const [counters, setCounters] = useState({
    experience: 0,
    customers: 0,
    models: 0,
    branches: 0,
  });

  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const targets = {
      experience: 5,
      customers: 1000,
      models: 300,
      branches: 1,
    };

    const interval = setInterval(() => {
      setCounters((prev) => ({
        experience:
          prev.experience < targets.experience
            ? prev.experience + 0.5
            : targets.experience,

        customers:
          prev.customers < targets.customers
            ? prev.customers + 50
            : targets.customers,

        models:
          prev.models < targets.models
            ? prev.models + 15
            : targets.models,

        branches:
          prev.branches < targets.branches
            ? prev.branches + 0.05
            : targets.branches,
      }));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const galleryImages = [
    assets.huawei_rollable_phone,
    assets.images_1,
    assets.images,
    assets.smartphone_mockup,
  ];

  const storyPoints = [
    "100% Genuine PTA-Approved Devices",
    "Best Price Guarantee",
    "Expert Recommendations",
    "After-Sales Support",
  ];

  const nextSlide = () =>
    setCarouselIndex((prev) => (prev + 1) % galleryImages.length);

  const prevSlide = () =>
    setCarouselIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );

  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="hero-background" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <span className="hero-pill">✦ SHAHEEN MOBILES</span>
          <h1 className="fade-in-down">About Us</h1>
          <p className="fade-in-up">
            Your Trusted Mobile Store — Genuine Devices, Best Prices, Real Support
          </p>

          <div className="hero-actions fade-in-up">
            <a href="/shop" className="btn-primary">
              Shop Now
            </a>
            <a
              href="https://wa.me/923001234567"
              className="btn-outline"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="about-story container scroll-fade">
        <div className="story-text">
          <h2>We Always Deliver The Best</h2>
          <p>
            Shaheen Mobiles is your trusted mobile store for the latest smartphones,
            accessories, and after-sales support. With <strong>5+ years</strong> of
            experience, we proudly serve customers in <strong>Kamalia</strong> with
            genuine PTA-approved devices, competitive pricing, and expert guidance.
          </p>

          <p>
            Whether you are buying a flagship device or a budget phone, our goal is to
            give you a smooth, secure, and reliable shopping experience.
          </p>

          <div className="story-points">
            {storyPoints.map((point) => (
              <div key={point}>
                <svg
                  className="story-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="story-image">
          <img
            src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1000&q=80"
            alt="Mobile Store"
          />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="about-why">
        <div className="container scroll-fade">
          <h2>Why Choose Shaheen Mobiles</h2>

          <div className="why-grid">
            <div className="why-card">
              <h4>Genuine Products</h4>
              <p>PTA-approved, sealed box phones from trusted brands.</p>
            </div>

            <div className="why-card">
              <h4>Best Deals</h4>
              <p>Weekly offers and seasonal discounts on top devices.</p>
            </div>

            <div className="why-card">
              <h4>Expert Guidance</h4>
              <p>We help you pick the right device for your budget and needs.</p>
            </div>

            <div className="why-card">
              <h4>Support & Warranty</h4>
              <p>Reliable warranty help and after-sales assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="about-stats scroll-fade">
        <div className="container stats-grid">
          <div className="stat-box">
            <h3>{Math.floor(counters.experience)}+</h3>
            <p>Years Experience</p>
          </div>

          <div className="stat-box">
            <h3>{Math.floor(counters.customers).toLocaleString()}+</h3>
            <p>Happy Customers</p>
          </div>

          <div className="stat-box">
            <h3>{Math.floor(counters.models)}+</h3>
            <p>Models Available</p>
          </div>

          <div className="stat-box">
            <h3>{Math.floor(counters.branches)}</h3>
            <p>Location</p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="about-gallery container scroll-fade">
        <h2>Inside Our Store</h2>

        <div className="carousel-container">
          <div className="carousel-main">
            <img
              src={galleryImages[carouselIndex]}
              alt="Gallery"
              className="carousel-image"
            />
          </div>

          <button
            className="carousel-btn prev"
            onClick={prevSlide}
            type="button"
            aria-label="Previous slide"
          >
            ◀
          </button>

          <button
            className="carousel-btn next"
            onClick={nextSlide}
            type="button"
            aria-label="Next slide"
          >
            ▶
          </button>
        </div>
      </section>

      {/* MAP */}
      <section className="about-map scroll-fade">
        <div className="container">
          <h2>Visit Our Store</h2>

          <div className="map-container">
            <iframe
              title="Shaheen Mobiles Kamalia Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d886.7!2d72.6494808!3d30.7258257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39232130373fffff%3A0xafd99d3617aeb613!2sShaheen%20Mobiles%20kamalia!5e0!3m2!1sen!2spk"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>

          <div className="store-locations-center">
            <div className="location-card location-card-single">
              <h4>Shaheen Mobiles — Kamalia</h4>
              <p>Main Bazar, Kamalia, Punjab</p>
              <p>+92 300 1234567</p>

              <a
                href="https://www.google.com/maps/place/Shaheen+Mobiles+kamalia"
                target="_blank"
                rel="noreferrer"
                className="directions-btn"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta scroll-fade">
        <div className="container">
          <div className="cta-box">
            <div className="cta-content">
              <h2>Need Help Choosing The Right Phone?</h2>
              <p>
                Visit Shaheen Mobiles in Kamalia or contact us on WhatsApp for instant
                support.
              </p>
            </div>

            <div className="cta-actions">
              <a href="/shop" className="btn-primary">
                Browse Phones
              </a>
              <a
                href="https://wa.me/923001234567"
                className="btn-outline"
                target="_blank"
                rel="noreferrer"
              >
                Chat Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;