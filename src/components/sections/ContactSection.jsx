import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Form:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="section-label">04 / CONTACT US</div>
          <h2 className="section-title">Get In Touch</h2>
          <p className="contact-subtitle">
            Have questions about our expeditions? Reach out to our team.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <h4>Headquarters</h4>
                <p>Deep Sea Exploration Center<br />Monaco, Mediterranean</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <div>
                <h4>Email</h4>
                <p><a href="mailto:info@abyss-exploration.com">info@abyss-exploration.com</a></p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <h4>Phone</h4>
                <p><a href="tel:+37799999999">+377 99 99 99 99</a></p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕐</span>
              <div>
                <h4>Operating Hours</h4>
                <p>24/7 - Always ready for descent</p>
              </div>
            </div>

            <div className="contact-social">
              <span className="social-label">Follow Us</span>
              <div className="social-links">
                <a href="#" className="social-link" target="_blank">🐦</a>
                <a href="#" className="social-link" target="_blank">📷</a>
                <a href="#" className="social-link" target="_blank">📘</a>
                <a href="#" className="social-link" target="_blank">▶️</a>
                <a href="#" className="social-link" target="_blank">💼</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <h3 className="contact-form-title">Send a Message</h3>
            {submitted ? (
              <div className="contact-success">
                <span className="success-icon">✅</span>
                <h4>Message Sent!</h4>
                <p>We'll respond within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                  />
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>

                <button type="submit" className="contact-submit-btn">
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;