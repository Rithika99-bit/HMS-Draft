import React from 'react';
import { Calendar, PhoneCall, ShieldAlert } from 'lucide-react';

export default function CtaBanner({ onOpenBooking, onOpenEmergency }) {
  return (
    <section className="cta-banner-section">
      <div className="container">
        <div className="cta-banner-card">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <ShieldAlert size={20} color="#fef08a" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#fef08a' }}>
                Immediate Care Assistance
              </span>
            </div>
            <h2 className="cta-banner-title">Need Immediate Clinical Assistance?</h2>
            <p className="cta-banner-desc">
              24/7 trauma emergency care and online appointment booking are available now.
            </p>
          </div>

          <div className="cta-banner-actions">
            <button className="btn btn-secondary btn-lg" onClick={() => onOpenBooking()}>
              <Calendar size={18} color="#0284c7" />
              <span>Book Appointment</span>
            </button>

            <button className="btn btn-emergency btn-lg" onClick={onOpenEmergency}>
              <PhoneCall size={18} />
              <span>Call Emergency ER</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
