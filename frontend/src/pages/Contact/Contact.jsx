import { useState } from 'react';
import './Contact.css';

const helpLinks = [
  'FAQs',
  'Ordering',
  'Shipping',
  'Returns + Exchanges',
  'International',
  'Sustainability',
  'Contact',
];

const Contact = () => {
  const [form, setForm] = useState({
    subject: '',
    name:    '',
    email:   '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeLink, setActiveLink] = useState('Contact');

  const handleChange = (e) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">

      {/* ── HERO ── */}
      <div className="contact-hero">
        <div className="contact-hero-overlay" />
        <div className="contact-hero-text">
          <h1>Customer Help</h1>
          <p>
            If talking to a real-life human is more your thing, you can reach our
            Customer Happiness Team via email below.
          </p>
        </div>
      </div>

      {/* ── MAIN 3-COLUMN LAYOUT ── */}
      <div className="contact-main">

        {/* ── LEFT SIDEBAR ── */}
        <aside className="contact-left">
          <h4>How Can We Help?</h4>
          <ul className="help-links">
            {helpLinks.map(link => (
              <li key={link}>
                <button
                  className={`help-link ${activeLink === link ? 'active' : ''}`}
                  onClick={() => setActiveLink(link)}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* ── CENTER — FORM ── */}
        <div className="contact-center">
          <h2>Contact Us</h2>

          {submitted ? (
            <div className="contact-success">
              <div className="success-icon">✅</div>
              <h3>Message Sent!</h3>
              <p>
                Thank you for reaching out. Our team will get back to
                you within 24 hours.
              </p>
              <button
                className="contact-submit-btn"
                onClick={() => { setSubmitted(false); setForm({ subject: '', name: '', email: '', message: '' }); }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>

              <div className="form-field">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="What is your query about?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Message</label>
                <textarea
                  name="message"
                  placeholder="Enter your message here..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Captcha placeholder */}
              <div className="captcha-box">
                <input type="checkbox" id="robot" />
                <label htmlFor="robot">I'm not a robot</label>
                <div className="captcha-logo">
                  <span>reCAPTCHA</span>
                  <small>Privacy - Terms</small>
                </div>
              </div>

              <button type="submit" className="contact-submit-btn">
                SUBMIT
              </button>

            </form>
          )}
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <aside className="contact-right">
          <div className="support-hours">
            <h5>Support Hours</h5>
            <p>Mon–Sat 9:00am – 6:00pm PKT</p>
            <p className="support-note">*Excludes Public Holidays</p>
          </div>

          <div className="support-divider" />

          <p className="support-desc">
            Looking for more info on products, ordering, shipping, and more?
          </p>
          <button className="view-faq-btn">VIEW FAQ</button>

          <div className="support-divider" />

          <div className="contact-info-list">
            <div className="contact-info-item">
              <span className="contact-info-icon">📞</span>
              <div>
                <p className="info-label">Phone</p>
                <p className="info-value">+92 300 1234567</p>
              </div>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-icon">📧</span>
              <div>
                <p className="info-label">Email</p>
                <p className="info-value">help@shaheenmobiles.pk</p>
              </div>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-icon">📍</span>
              <div>
                <p className="info-label">Address</p>
                <p className="info-value">Shaheen Mobiles, Lahore, Pakistan</p>
              </div>
            </div>
          </div>
        </aside>

      </div>

      {/* ── GET IN TOUCH BANNER ── */}
      <div className="contact-banner">
        <div className="contact-banner-icon">✉️</div>
        <h3>Get in Touch</h3>
        <p>Have questions about your order, or a general inquiry?</p>
        <a href="mailto:help@shaheenmobiles.pk" className="email-us-btn">
          EMAIL US
        </a>
      </div>

    </div>
  );
};

export default Contact;