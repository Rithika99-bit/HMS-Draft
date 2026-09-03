import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, HeartPulse, Activity, CheckCircle, Award } from 'lucide-react';
import WelcomeAnimation from './WelcomeAnimation';

export default function HeroSection({ onOpenBooking, onOpenEmergency }) {
  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="hero-grid">
          {/* Left Hero Content */}
          <div className="hero-content">
            <div className="hero-badge-container">
              <span className="section-tag teal">
                <span className="pulse-dot"></span> Next-Gen Smart Hospital Management System
              </span>
            </div>

            <h1 className="hero-title">
              Smart Healthcare. <br />
              <span className="gradient-text">Better Patient Outcomes.</span>
            </h1>

            <p className="hero-subtitle">
              A comprehensive clinical ecosystem connecting doctors, nurses, administrators, and patients. Streamline electronic health records, surgical suites, automated pharmacy dispatch, and 24/7 critical emergency care.
            </p>

            <div className="hero-cta-group">
              <button className="btn btn-primary btn-lg" onClick={() => onOpenBooking()}>
                <Calendar size={20} />
                <span>Book an Appointment</span>
              </button>

              <button className="btn btn-secondary btn-lg" onClick={() => {
                const el = document.getElementById('services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>
                <span>Explore 10 Modules</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Trust and Certification Badges */}
            <div className="hero-trust-badges">
              <div className="trust-item">
                <div className="trust-icon-box">
                  <Award size={18} />
                </div>
                <div>
                  <div className="trust-title">JCI & NABH Certified</div>
                  <div className="trust-desc">Gold Standard Clinical Care</div>
                </div>
              </div>

              <div className="trust-item">
                <div className="trust-icon-box" style={{ background: '#ccfbf1', color: '#0d9488' }}>
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className="trust-title">HIPAA & HL7 Encrypted</div>
                  <div className="trust-desc">100% Patient Data Privacy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Animated Welcome Doctor Scene */}
          <div className="hero-visual-wrapper">
            {/* Floating live-stats badges */}
            <div className="floating-telemetry-card top-left">
              <div className="telemetry-row">
                <div className="telemetry-icon-circle" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                  <HeartPulse size={16} />
                </div>
                <div>
                  <div className="telemetry-label">Live Patient Telemetry</div>
                  <div className="telemetry-value">72 BPM • 98% SpO2</div>
                </div>
              </div>
            </div>

            <div className="floating-telemetry-card bottom-right">
              <div className="telemetry-row">
                <div className="telemetry-icon-circle" style={{ background: '#ccfbf1', color: '#0d9488' }}>
                  <Activity size={16} />
                </div>
                <div>
                  <div className="telemetry-label">Surgeries Today</div>
                  <div className="telemetry-value">14 Scheduled</div>
                </div>
              </div>
            </div>

            <div className="floating-telemetry-card bottom-left">
              <div className="telemetry-row">
                <div className="telemetry-icon-circle" style={{ background: '#d1fae5', color: '#10b981' }}>
                  <CheckCircle size={16} />
                </div>
                <div>
                  <div className="telemetry-label">Clinical Quality Index</div>
                  <div className="telemetry-value">99.4% Recovery Rate</div>
                </div>
              </div>
            </div>

            {/* Animated Doctor Welcome Scene */}
            <WelcomeAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}

