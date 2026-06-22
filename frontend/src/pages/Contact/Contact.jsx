import { useState } from 'react';
import './Contact.css';

const EMAILJS_SERVICE_ID  = 'service_4ixdi5z';
const EMAILJS_TEMPLATE_ID = 'template_podwk85';
const EMAILJS_PUBLIC_KEY  = '_6alrtJP0WZokoC11';

// ── Real SVG Icons (black) ──────────────────────
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 5.45 5.45l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft:'8px'}}>
    <path d="m22 2-7 20-4-9-9-4Z"/>
    <path d="M22 2 11 13"/>
  </svg>
);

const MailBannerIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

// ── FAQ Data ────────────────────────────────────
const faqData = {
  FAQs: [
    { q: 'How do I track my order?', a: 'Once your order is shipped, you will receive a tracking email with a link to monitor your delivery status.' },
    { q: 'Can I change my order after placing it?', a: 'Orders can be modified within 1 hour of placement. Please contact us immediately via the contact form.' },
    { q: 'Do you offer warranty on products?', a: 'Yes, all products come with a standard manufacturer warranty. Duration varies by product.' },
  ],
  Ordering: [
    { q: 'What payment methods do you accept?', a: 'We accept JazzCash, EasyPaisa, bank transfer, and cash on delivery across Pakistan.' },
    { q: 'Is my payment information secure?', a: 'Yes, all transactions are encrypted and processed through secure payment gateways.' },
    { q: 'Can I place an order by phone?', a: 'Yes! Call us at +92 300 1234567 during support hours and we will assist you.' },
  ],
  Shipping: [
    { q: 'How long does delivery take?', a: 'Standard delivery takes 3–5 business days. Express delivery (1–2 days) is available in major cities.' },
    { q: 'Do you ship across Pakistan?', a: 'Yes, we deliver to all major cities and towns across Pakistan.' },
    { q: 'What are the shipping charges?', a: 'Free shipping on orders above Rs. 5,000. A flat fee of Rs. 200 applies on smaller orders.' },
  ],
  'Returns + Exchanges': [
    { q: 'What is your return policy?', a: 'We offer a 7-day return policy for unused items in original packaging.' },
    { q: 'How do I initiate a return?', a: 'Fill out our contact form with your order number and reason for return, and our team will guide you.' },
    { q: 'When will I receive my refund?', a: 'Refunds are processed within 5–7 business days after we receive the returned item.' },
  ],
  International: [
    { q: 'Do you ship internationally?', a: 'Currently we ship within Pakistan only. International shipping is coming soon.' },
    { q: 'Can I order from abroad for delivery in Pakistan?', a: 'Yes! You can place an order from anywhere and have it delivered to a Pakistani address.' },
  ],
  Sustainability: [
    { q: 'What is your environmental commitment?', a: 'We use eco-friendly packaging and partner with suppliers who follow sustainable practices.' },
    { q: 'Do you have a recycling program?', a: 'Yes, we accept old devices for responsible recycling. Contact us for details.' },
  ],
  Contact: [],
};

const helpLinks = ['FAQs', 'Ordering', 'Shipping', 'Returns + Exchanges', 'International', 'Sustainability', 'Contact'];

// ── Component ───────────────────────────────────
const Contact = () => {
  const [form, setForm] = useState({ subject: '', name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [activeLink, setActiveLink] = useState('Contact');
  const [showFaq, setShowFaq]     = useState(false);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const emailjs = await import('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/+esm');
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject,
          message:    form.message,
          to_email:   'Shaheenmobiles991@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Message did not send. Please try again or email: Shaheenmobiles991@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    if (link !== 'Contact') setShowFaq(true);
    else setShowFaq(false);
  };

  const currentFaqs = faqData[activeLink] || [];

  return (
    <div className="contact-page">

      {/* ── HERO ── */}
      <div className="contact-hero">
        <div className="contact-hero-overlay" />
        <div className="contact-hero-text">
          <h1>Customer Help</h1>
          <p>If talking to a real-life human is more your thing, you can reach our Customer Happiness Team via the form below.</p>
        </div>
      </div>

      {/* ── MAIN 3-COLUMN ── */}
      <div className="contact-main">

        {/* LEFT SIDEBAR */}
        <aside className="contact-left">
          <h4>How Can We Help?</h4>
          <ul className="help-links">
            {helpLinks.map(link => (
              <li key={link}>
                <button
                  className={`help-link ${activeLink === link ? 'active' : ''}`}
                  onClick={() => handleLinkClick(link)}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* CENTER */}
        <div className="contact-center">

          {/* FAQ View */}
          {showFaq && activeLink !== 'Contact' ? (
            <div className="faq-section">
              <div className="faq-header">
                <h2>{activeLink}</h2>
                <button className="back-btn" onClick={() => { setShowFaq(false); setActiveLink('Contact'); }}>
                  ← Back to Contact
                </button>
              </div>
              {currentFaqs.length > 0 ? (
                <div className="faq-list">
                  {currentFaqs.map((item, i) => (
                    <FaqItem key={i} question={item.q} answer={item.a} />
                  ))}
                </div>
              ) : (
                <p className="faq-empty">No FAQs available for this section yet.</p>
              )}
            </div>
          ) : (
            /* CONTACT FORM */
            <>
              <h2>Contact Us</h2>
              {submitted ? (
                <div className="contact-success">
                  <div className="success-icon"><CheckCircleIcon /></div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  <button className="contact-submit-btn" onClick={() => { setSubmitted(false); setForm({ subject: '', name: '', email: '', message: '' }); }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-field">
                    <label>Subject</label>
                    <input type="text" name="subject" placeholder="What is your query about?" value={form.subject} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label>Message</label>
                    <textarea name="message" placeholder="Enter your message here..." rows={5} value={form.message} onChange={handleChange} required />
                  </div>
                  <div className="captcha-box">
                    <input type="checkbox" id="robot" />
                    <label htmlFor="robot">I'm not a robot</label>
                    <div className="captcha-logo">
                      <span>reCAPTCHA</span>
                      <small>Privacy - Terms</small>
                    </div>
                  </div>
                  {error && <p className="form-error">{error}</p>}
                  <button type="submit" className="contact-submit-btn" disabled={loading}>
                    {loading ? 'SENDING...' : <span style={{display:'flex',alignItems:'center'}}>SUBMIT <SendIcon /></span>}
                  </button>
                </form>
              )}
            </>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="contact-right">
          <div className="support-hours">
            <h5>Support Hours</h5>
            <p>Mon–Sat 9:00am – 6:00pm PKT</p>
            <p className="support-note">Excludes Public Holidays</p>
          </div>
          <div className="support-divider" />
          <p className="support-desc">Looking for more info on products, ordering, shipping, and more?</p>
          <button className="view-faq-btn" onClick={() => { setActiveLink('FAQs'); setShowFaq(true); }}>
            VIEW FAQ
          </button>
          <div className="support-divider" />
          <div className="contact-info-list">
            <div className="contact-info-item">
              <span className="contact-info-icon"><PhoneIcon /></span>
              <div>
                <p className="info-label">Phone</p>
                <p className="info-value">03146406491</p>
              </div>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-icon"><MailIcon /></span>
              <div>
                <p className="info-label">Email</p>
                <p className="info-value">Shaheenmobiles991@gmail.com</p>
              </div>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-icon"><MapPinIcon /></span>
              <div>
                <p className="info-label">Address</p>
                <p className="info-value">SHAHEEN MOBILES NAWAZ CHOWK KAMALIA, PAKISTAN</p>
              </div>
            </div>
          </div>
        </aside>

      </div>

      {/* BANNER */}
      <div className="contact-banner">
        <div className="contact-banner-icon"><MailBannerIcon /></div>
        <h3>Get in Touch</h3>
        <p>Have questions about your order, or a general inquiry?</p>
        <a href="mailto:Shaheenmobiles991@gmail.com" className="email-us-btn">EMAIL US</a>
      </div>

    </div>
  );
};

// ── FAQ Accordion Item ──────────────────────────
const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(o => !o)}>
        <span>{question}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform 0.25s'}}>
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      {open && <p className="faq-answer">{answer}</p>}
    </div>
  );
};

export default Contact;
