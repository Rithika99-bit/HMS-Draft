import React, { useState } from 'react';
import { Activity, Send, Phone, Mail, MapPin, Shield, Check } from 'lucide-react';

export default function Footer({ onOpenEmergency, onShowToast }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      if (onShowToast) onShowToast('Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    if (onShowToast) {
      onShowToast('Subscribed! You will receive our monthly health advisory.', 'success');
    }
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div>
            <div className="footer-brand-title">
              <div className="brand-icon" style={{ width: '32px', height: '32px' }}>
                <Activity size={18} strokeWidth={2.5} />
              </div>
              <span>MediCare Hospital</span>
            </div>
            <p className="footer-desc">
              Accredited enterprise multi-specialty hospital committed to superior patient care, robotic surgery innovation, and comprehensive wellness programs.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                <MapPin size={15} color="#38bdf8" /> 742 Evergreen Healthcare Blvd, Metro Medical District
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                <Mail size={15} color="#38bdf8" /> info@medicare.health
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f87171', fontWeight: 700 }}>
                <Phone size={15} /> Emergency Speed Dial: (800) 911-MEDICARE
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Clinical Centers</h4>
            <ul className="footer-links-list">
              <li><a href="#departments" className="footer-link">Cardiology & Heart Care</a></li>
              <li><a href="#departments" className="footer-link">Neurology & Stroke Unit</a></li>
              <li><a href="#departments" className="footer-link">Robotic Orthopedics</a></li>
              <li><a href="#departments" className="footer-link">Pediatrics & NICU</a></li>
              <li><a href="#departments" className="footer-link">Obstetrics & Birthing</a></li>
              <li><a href="#departments" className="footer-link">Emergency & Trauma 24/7</a></li>
            </ul>
          </div>

          {/* Enterprise Modules */}
          <div>
            <h4 className="footer-heading">Hospital Modules</h4>
            <ul className="footer-links-list">
              <li><a href="#services" className="footer-link">Electronic Medical Records</a></li>
              <li><a href="#services" className="footer-link">Pharmacy Automated Dispensing</a></li>
              <li><a href="#services" className="footer-link">LIS Laboratory Diagnostics</a></li>
              <li><a href="#services" className="footer-link">Insurance Cashless Billing</a></li>
              <li><a href="#services" className="footer-link">Surgical Theater Management</a></li>
              <li><a href="#services" className="footer-link">Executive KPI Reports</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="footer-heading">Health Advisory Newsletter</h4>
            <p className="footer-desc" style={{ marginBottom: '14px' }}>
              Subscribe for wellness tips, vaccination updates, and doctor health advisories.
            </p>

            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <div className="newsletter-input-group">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address for newsletter"
                />
                <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '0 16px' }}>
                  {subscribed ? <Check size={16} /> : <Send size={16} />}
                </button>
              </div>
              {subscribed && (
                <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>
                  ✓ You are successfully subscribed!
                </span>
              )}
            </form>

            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#64748b' }}>
              <Shield size={14} color="#0d9488" /> HIPAA Certified & Spam Free Guarantee
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>© 2026 MediCare Health Systems Inc. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#home" className="footer-link">Privacy Policy</a>
            <a href="#home" className="footer-link">Terms of Service</a>
            <a href="#home" className="footer-link">HIPAA Compliance</a>
            <a href="#home" className="footer-link">Patient Rights</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
