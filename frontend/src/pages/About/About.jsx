import React, { useState, useEffect } from "react";
import "./About.css";

const About = () => {
  const [counters, setCounters] = useState({
    experience: 0,
    customers: 0,
    models: 0,
    branches: 0,
  });

  const [carouselIndex, setCarouselIndex] = useState(0);

  // Animated Counters
  useEffect(() => {
    const targets = { experience: 5, customers: 1000, models: 300, branches: 2 };
    const interval = setInterval(() => {
      setCounters((prev) => ({
        experience: prev.experience < targets.experience ? prev.experience + 0.5 : 5,
        customers: prev.customers < targets.customers ? prev.customers + 50 : 1000,
        models: prev.models < targets.models ? prev.models + 15 : 300,
        branches: prev.branches < targets.branches ? prev.branches + 0.1 : 2,
      }));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Carousel Auto-Rotate
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const galleryImages = [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80",
  ];

  const nextSlide = () => setCarouselIndex((prev) => (prev + 1) % 4);
  const prevSlide = () => setCarouselIndex((prev) => (prev - 1 + 4) % 4);

  return (
    <div className="about-page">
      {/* HERO WITH BACKGROUND IMAGE + OVERLAY */}
      <section className="about-hero">
        <div className="hero-background" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <span className="hero-pill">✦ SHAHEEN MOBILES</span>
          <h1 className="fade-in-down">About Us</h1>
          <p className="fade-in-up">Your Trusted Mobile Store — Genuine Devices, Best Prices, Real Support</p>
          <div className="hero-actions fade-in-up">
            <a href="/shop" className="btn-primary">
              Shop Now
            </a>
            <a href="https://wa.me/923001234567" className="btn-outline" target="_blank" rel="noreferrer">
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
            accessories, and after‑sales support. With <strong>5+ years</strong> of experience,
            we serve customers in <strong>Sahiwal</strong> and <strong>Lahore</strong> with
            genuine PTA‑approved devices, competitive pricing, and expert guidance.
          </p>
          <p>
            Whether you are buying a flagship device or a budget phone, our goal is to give
            you a smooth, secure, and reliable shopping experience.
          </p>
          <div className="story-points">
            <div>
              <svg className="story-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 16.2L4.8 12m-1.5 0a6.5 6.5 0 1 1 9.2 5.8" strokeWidth="2" strokeLinecap="round" />
              </svg>
              100% Genuine PTA‑Approved Devices
            </div>
            <div>
              <svg className="story-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 16.2L4.8 12m-1.5 0a6.5 6.5 0 1 1 9.2 5.8" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Best Price Guarantee
            </div>
            <div>
              <svg className="story-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 16.2L4.8 12m-1.5 0a6.5 6.5 0 1 1 9.2 5.8" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Expert Recommendations
            </div>
            <div>
              <svg className="story-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 16.2L4.8 12m-1.5 0a6.5 6.5 0 1 1 9.2 5.8" strokeWidth="2" strokeLinecap="round" />
              </svg>
              After‑Sales Support
            </div>
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
              <div className="card-icon-wrapper">
                <svg className="card-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 1.5a2.5 2.5 0 0 1 2.5 2.5v14a2.5 2.5 0 0 1-2.5 2.5h-11a2.5 2.5 0 0 1-2.5-2.5v-14a2.5 2.5 0 0 1 2.5-2.5h11M12 21v1m-7-6h14" strokeWidth="1.5" stroke="currentColor" fill="none"/>
                </svg>
              </div>
              <h4>Genuine Products</h4>
              <p>PTA‑approved, sealed box phones from trusted brands.</p>
            </div>
            <div className="why-card">
              <div className="card-icon-wrapper">
                <svg className="card-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              </div>
              <h4>Best Deals</h4>
              <p>Weekly offers and seasonal discounts on top devices.</p>
            </div>
            <div className="why-card">
              <div className="card-icon-wrapper">
                <svg className="card-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <h4>Expert Guidance</h4>
              <p>We help you pick the right device for your budget and needs.</p>
            </div>
            <div className="why-card">
              <div className="card-icon-wrapper">
                <svg className="card-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
              </div>
              <h4>Support & Warranty</h4>
              <p>Reliable warranty help and after‑sales assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ANIMATED STATS */}
      <section className="about-stats scroll-fade">
        <div className="container stats-grid">
          <div className="stat-box stat-animate">
            <h3>{Math.floor(counters.experience)}+</h3>
            <p>Years Experience</p>
          </div>
          <div className="stat-box stat-animate">
            <h3>{Math.floor(counters.customers).toLocaleString()}+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat-box stat-animate">
            <h3>{Math.floor(counters.models)}+</h3>
            <p>Models Available</p>
          </div>
          <div className="stat-box stat-animate">
            <h3>{Math.floor(counters.branches)}</h3>
            <p>Branches</p>
          </div>
        </div>
      </section>

      {/* IMAGE CAROUSEL */}
      <section className="about-gallery container scroll-fade">
        <h2>Inside Our Store</h2>
        <div className="carousel-container">
          <div className="carousel-main">
            <img src={galleryImages[carouselIndex]} alt="Gallery" className="carousel-image" />
            <div className="carousel-overlay">
              <span>{carouselIndex + 1} / 4</span>
            </div>
          </div>
          <button className="carousel-btn prev" onClick={prevSlide}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <button className="carousel-btn next" onClick={nextSlide}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 12.17 11 8.59 14.59 10 16l6-6z" />
            </svg>
          </button>
        </div>
        <div className="carousel-thumbnails">
          {galleryImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx}`}
              className={`thumbnail ${idx === carouselIndex ? "active" : ""}`}
              onClick={() => setCarouselIndex(idx)}
            />
          ))}
        </div>
      </section>

      {/* STORE LOCATION MAP */}
      <section className="about-map scroll-fade">
        <div className="container">
          <h2>Visit Our Stores</h2>
          <div className="map-container">
            <iframe
              title="Shaheen Mobiles Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3376.3752098701016!2d72.64753!3d30.18859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ee5f5e5e5e5e5e5%3A0x5e5e5e5e5e5e5e5e!2sSahiwal%2C%20Punjab!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="store-locations">
            <div className="location-card">
              <div className="location-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z" />
                </svg>
              </div>
              <h4>Sahiwal Branch</h4>
              <p>Main Bazaar, Sahiwal</p>
              <p>+92 300 1234567</p>
            </div>
            <div className="location-card">
              <div className="location-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z" />
                </svg>
              </div>
              <h4>Lahore Branch</h4>
              <p>Mall Road, Lahore</p>
              <p>+92 300 7654321</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta scroll-fade">
        <div className="container cta-box">
          <div>
            <h2>Need Help Choosing The Right Phone?</h2>
            <p>Visit Shaheen Mobiles or contact us on WhatsApp for instant support.</p>
          </div>
          <div className="cta-actions">
            <a href="/shop" className="btn-primary">
              Browse Phones
            </a>
            <a href="https://wa.me/923001234567" className="btn-outline" target="_blank" rel="noreferrer">
              Chat Now
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER INFO */}
      <section className="about-footer container">
        <div>
          <h4>Shaheen Mobiles</h4>
          <p>Your Trusted Mobile Store</p>
        </div>
        <div>
          <h4>Our Stores</h4>
          <ul>
            <li>
              <svg className="footer-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
              </svg>
              Main Bazaar, Sahiwal
            </li>
            <li>
              <svg className="footer-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
              </svg>
              Mall Road, Lahore
            </li>
          </ul>
        </div>
        <div>
          <h4>Get In Touch</h4>
          <ul>
            <li>
              <svg className="footer-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
              </svg>
              +92 300 1234567
            </li>
            <li>
              <svg className="footer-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              info@shaheenmobiles.com
            </li>
            <li>
              <svg className="footer-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 9.5c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z" />
              </svg>
              @shaheenmobiles
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;