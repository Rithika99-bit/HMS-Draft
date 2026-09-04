import React, { useState } from 'react';
import { Sparkles, Activity, ShieldCheck, HeartPulse, Cpu, Radio, CheckCircle } from 'lucide-react';

/**
 * WelcomeAnimation — Animated AI Generated Doctor in Hero Space
 * Features:
 *  - Creative AI Generated Doctor Image with bioluminescent circuits & organ holograms
 *  - Animated holographic laser scanning beam
 *  - Glowing HUD corners & cybernetic neon border
 *  - Real-time cardiac pulse SVG wave animation
 *  - Floating live telemetry chips (Neural AI Sync 99.8%, Cardiac 72 BPM)
 *  - Interactive Dr. Elara Vance AI Chief badge
 */
export default function WelcomeAnimation() {
  const [isScanning, setIsScanning] = useState(true);

  return (
    <div className="welcome-scene">

      {/* Animated glow rings behind the photo */}
      <div className="welcome-bg-ring" />
      <div className="welcome-bg-ring ring-2" />

      {/* Floating Holographic Medical Badges */}
      <div className="med-float-icon icon-heart" title="Cardiac Vitals: 72 BPM Normal">
        <HeartPulse size={22} color="#0284c7" />
      </div>

      <div className="med-float-icon icon-cross" title="AI Clinical Diagnostics Online">
        <Cpu size={20} color="#0d9488" />
      </div>

      <div className="med-float-icon icon-pulse" title="Real-time Telemetry Active">
        <Activity size={20} color="#38bdf8" />
      </div>

      <div className="med-float-icon icon-pill" title="FHIR & HL7 Encrypted">
        <Sparkles size={18} color="#8b5cf6" />
      </div>

      {/* Speech hologram bubble */}
      <div className="welcome-bubble">
        <span className="bubble-wave">✨</span>
        <span className="bubble-text">AI Clinical Intelligence Online</span>
      </div>

      {/* Animated AI Generated Doctor Photo Card */}
      <div className="doctor-photo-card ai-doctor-hologram" style={{
        position: 'relative',
        border: '2px solid rgba(56, 189, 248, 0.6)',
        boxShadow: '0 20px 60px rgba(2, 132, 199, 0.35), 0 0 25px rgba(56, 189, 248, 0.25) inset',
        borderRadius: '24px',
        overflow: 'hidden'
      }}>
        
        {/* Holographic Laser Scanner Beam Animation */}
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, transparent, #38bdf8, #34d399, transparent)',
          boxShadow: '0 0 16px #38bdf8, 0 0 8px #34d399',
          animation: 'holoScan 3.2s ease-in-out infinite alternate',
          zIndex: 6,
          pointerEvents: 'none'
        }} />

        {/* 4 Futuristic HUD Tech Corners */}
        <div style={{ position: 'absolute', top: '8px', left: '8px', width: '14px', height: '14px', borderTop: '2.5px solid #38bdf8', borderLeft: '2.5px solid #38bdf8', zIndex: 7 }} />
        <div style={{ position: 'absolute', top: '8px', right: '8px', width: '14px', height: '14px', borderTop: '2.5px solid #38bdf8', borderRight: '2.5px solid #38bdf8', zIndex: 7 }} />
        <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '14px', height: '14px', borderBottom: '2.5px solid #38bdf8', borderLeft: '2.5px solid #38bdf8', zIndex: 7 }} />
        <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '14px', height: '14px', borderBottom: '2.5px solid #38bdf8', borderRight: '2.5px solid #38bdf8', zIndex: 7 }} />

        {/* The Creative AI Generated Doctor Picture */}
        <img
          src="/hero_ai_doctor.jpg"
          alt="Dr. Elara Vance — Visionary Creative AI Doctor at MediCare Hospital"
          className="doctor-photo"
          style={{
            width: '100%',
            height: '350px',
            objectFit: 'cover',
            display: 'block'
          }}
        />

        {/* Soft gradient fade overlay */}
        <div className="doctor-photo-fade" style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '130px',
          background: 'linear-gradient(to top, rgba(9, 30, 58, 0.95) 0%, rgba(9, 30, 58, 0.6) 60%, transparent 100%)',
          zIndex: 4
        }} />

        {/* Floating Mini Live Telemetry ECG inside the card */}
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: 'rgba(9, 30, 58, 0.75)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          borderRadius: '12px',
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          zIndex: 7
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#7dd3fc', letterSpacing: '0.04em' }}>
            AI DIAGNOSTIC ACTIVE
          </span>
        </div>

        {/* Doctor Name & Futuristic Credentials */}
        <div className="doctor-name-badge" style={{ zIndex: 7, bottom: '16px', left: '16px', right: '16px' }}>
          <div className="name-badge-dot" style={{ background: '#34d399', boxShadow: '0 0 10px #34d399' }} />
          <div>
            <div className="name-badge-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Dr. Elara Vance, MD</span>
              <span style={{
                fontSize: '0.65rem',
                background: 'rgba(56, 189, 248, 0.25)',
                color: '#38bdf8',
                padding: '1px 6px',
                borderRadius: '4px',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                fontWeight: 700
              }}>
                AI Clinical Lead
              </span>
            </div>
            <div className="name-badge-role" style={{ color: '#bae6fd', fontSize: '0.72rem' }}>
              Chief of AI Clinical Operations · MediCare
            </div>
          </div>
        </div>
      </div>

      {/* Verified Accreditation Ribbon */}
      <div className="doctor-verified-ribbon" style={{ zIndex: 8 }}>
        <ShieldCheck size={14} color="#ffffff" />
        <span>JCI & NABH Accredited</span>
      </div>

      {/* Floor shimmer line */}
      <div className="welcome-floor" />

    </div>
  );
}
