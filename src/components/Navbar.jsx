import React, { useState, useEffect } from 'react';
import { Activity, LogIn, Calendar, ShieldCheck, LogOut } from 'lucide-react';

export default function Navbar({ onOpenBooking, onSwitchToLogin, currentUser, onOpenDashboard, onLogout }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 25);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container nav-container">
        {/* Brand Logo */}
        <a href="#home" onClick={scrollToTop} className="brand-logo" aria-label="MediCare Hospital Homepage">
          <div className="brand-icon">
            <Activity size={22} strokeWidth={2.8} />
          </div>
          <span className="brand-name">Medi<span>Care</span></span>
        </a>

        {/* Right-side Action Buttons Only */}
        <div className="nav-actions">
          {currentUser ? (
            <>
              <button
                className="btn btn-secondary btn-sm"
                onClick={onOpenDashboard}
                title="Go to Role Dashboard"
              >
                <ShieldCheck size={16} color="#0284c7" />
                <span>{currentUser.name.split(' ')[0]} (Dashboard)</span>
              </button>
              <button
                className="btn btn-outline btn-sm"
                onClick={onLogout}
                style={{ fontSize: '0.78rem', padding: '6px 10px' }}
              >
                <LogOut size={15} />
                Logout
              </button>
            </>
          ) : (
            <button
              className="btn btn-secondary btn-sm"
              onClick={onSwitchToLogin}
              aria-label="Open Portal Login"
            >
              <LogIn size={16} />
              <span>Login</span>
            </button>
          )}

          <button
            className="btn btn-primary btn-sm"
            onClick={() => onOpenBooking()}
            aria-label="Book an Appointment"
          >
            <Calendar size={16} />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>
    </header>
  );
}
