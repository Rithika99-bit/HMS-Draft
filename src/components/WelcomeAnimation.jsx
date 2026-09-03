import React from 'react';

/**
 * WelcomeAnimation — Real doctor photo with animated CSS overlay effects.
 * Uses a genuine smiling doctor image with waving hand pose,
 * surrounded by floating medical badges, speech bubble, and glow ring.
 */
export default function WelcomeAnimation() {
  return (
    <div className="welcome-scene">

      {/* Animated glow rings behind the photo */}
      <div className="welcome-bg-ring" />
      <div className="welcome-bg-ring ring-2" />

      {/* Floating medical icons */}
      <div className="med-float-icon icon-heart">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#ef4444">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </div>

      <div className="med-float-icon icon-cross">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 2v20M2 12h20"/>
        </svg>
      </div>

      <div className="med-float-icon icon-pulse">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      </div>

      <div className="med-float-icon icon-pill">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round">
          <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7z"/>
          <path d="M8.5 8.5 16 16"/>
        </svg>
      </div>

      <div className="med-float-icon icon-star">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </div>

      {/* Speech bubble */}
      <div className="welcome-bubble">
        <span className="bubble-wave">👋</span>
        <span className="bubble-text">Welcome to MediCare!</span>
      </div>

      {/* Real doctor photo card */}
      <div className="doctor-photo-card">
        <img
          src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80"
          alt="Doctor welcoming patients to MediCare Hospital"
          className="doctor-photo"
        />
        {/* Soft gradient fade at the bottom */}
        <div className="doctor-photo-fade" />

        {/* Name badge pinned at the bottom of the card */}
        <div className="doctor-name-badge">
          <div className="name-badge-dot" />
          <div>
            <div className="name-badge-title">Dr. Emily Richards</div>
            <div className="name-badge-role">Chief of Patient Experience · MediCare</div>
          </div>
        </div>
      </div>

      {/* Verified badge ribbon */}
      <div className="doctor-verified-ribbon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <span>JCI Accredited</span>
      </div>

      {/* Floor shimmer line */}
      <div className="welcome-floor" />
    </div>
  );
}
