import React, { useState } from 'react';

/**
 * MediCare Hospital Management System - Split-Screen Login Page
 * 
 * Features:
 * - 1440px Desktop Figma-grade UI with responsive breakpoint support
 * - Dedicated Quick-Fill Demo Credentials Bar & Role Switcher
 * - 1-Click credential auto-fill with instant visual feedback
 * - Split-screen layout (Left: 3D healthcare hero, Right: Authentication form)
 * - Interactive password visibility toggle
 * - Modern typography (Plus Jakarta Sans / Inter), soft blue & teal palette
 * - Accessible focus rings, micro-animations, and subtle glassmorphic elevation
 */

export default function HospitalLoginPage() {
  const [email, setEmail] = useState('dr.sarah@medicare.health');
  const [password, setPassword] = useState('DocPass#2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeRole, setActiveRole] = useState('doctor');
  const [authSuccess, setAuthSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedFeedback, setCopiedFeedback] = useState('');

  const demoAccounts = [
    {
      id: 'doctor',
      role: 'Chief Physician',
      name: 'Dr. Sarah Mitchell',
      email: 'dr.sarah@medicare.health',
      pass: 'DocPass#2026',
      badge: 'Doctor',
      icon: '🩺',
      color: '#0284c7',
      bgColor: '#e0f2fe',
    },
    {
      id: 'nurse',
      role: 'Head of Nursing',
      name: 'Nurse Elena Chen',
      email: 'nurse.chen@medicare.health',
      pass: 'NurseCare#2026',
      badge: 'Clinical Staff',
      icon: '📋',
      color: '#0d9488',
      bgColor: '#ccfbf1',
    },
    {
      id: 'admin',
      role: 'Hospital Director',
      name: 'Marcus Vance',
      email: 'admin@medicare.health',
      pass: 'AdminMaster#2026',
      badge: 'Administrator',
      icon: '🛡️',
      color: '#4f46e5',
      bgColor: '#e0e7ff',
    },
  ];

  const handleFillCredentials = (account) => {
    setActiveRole(account.id);
    setEmail(account.email);
    setPassword(account.pass);
    setErrorMessage('');
    setCopiedFeedback(`Loaded credentials for ${account.name}`);
    setTimeout(() => setCopiedFeedback(''), 2500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email) {
      setErrorMessage('Please enter your hospital email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthSuccess(true);
    }, 1200);
  };

  return (
    <div style={styles.pageContainer}>
      <style>{customCss}</style>

      <div style={styles.splitCard}>
        {/* ================= LEFT PANEL: HEALTHCARE HERO ================= */}
        <div style={styles.leftPanel}>
          {/* Subtle Ambient Background Lighting */}
          <div style={styles.ambientGlowTop} />
          <div style={styles.ambientGlowBottom} />

          {/* Left Panel Header Brand */}
          <div style={styles.leftBrandBadge}>
            <span style={styles.liveIndicator} />
            <span>MediCare SaaS Cloud 4.2 • HIPAA Certified</span>
          </div>

          {/* Center 3D Isometric Healthcare Visual & Floating UI Cards */}
          <div style={styles.illustrationWrapper}>
            <div style={styles.heroImageContainer}>
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
                alt="MediCare Digital Hospital Operations"
                style={styles.heroImage}
              />
              
              {/* Dark/Soft Teal Gradient Overlay for Depth & Contrast */}
              <div style={styles.heroImageOverlay} />

              {/* Floating Holographic Card 1: Vitals & ECG */}
              <div style={{ ...styles.floatingCard, top: '24px', left: '24px' }} className="animate-float-slow">
                <div style={styles.cardHeaderRow}>
                  <div style={styles.pulseIconCircle}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.5">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <div>
                    <div style={styles.cardTitle}>Live Patient Telemetry</div>
                    <div style={styles.cardValue}>72 BPM • 98% SpO2</div>
                  </div>
                </div>
                <div style={styles.ecgWaveContainer}>
                  <svg width="100%" height="24" viewBox="0 0 160 24" fill="none">
                    <path
                      d="M0 12 H30 L38 4 L44 20 L50 2 L56 16 L62 12 H160"
                      stroke="#0ea5e9"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Floating Holographic Card 2: Appointment Schedule */}
              <div style={{ ...styles.floatingCard, bottom: '28px', right: '24px' }} className="animate-float-delayed">
                <div style={styles.cardHeaderRow}>
                  <div style={styles.calendarIconCircle}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <div style={styles.cardTitle}>Upcoming Surgeries</div>
                    <div style={styles.cardValue}>14 Scheduled Today</div>
                  </div>
                </div>
                <div style={styles.scheduleBadge}>
                  <span style={{ color: '#0d9488', fontWeight: 600 }}>Next: </span> OR Room 3 (10:30 AM)
                </div>
              </div>

              {/* Floating Holographic Card 3: Patient Records Analytics */}
              <div style={{ ...styles.floatingCard, bottom: '28px', left: '24px' }} className="animate-float-slow">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={styles.successDot} />
                  <span style={styles.recordsText}>99.8% Recovery Index</span>
                </div>
              </div>
            </div>
          </div>

          {/* Left Panel Footer Tagline & Value Props */}
          <div style={styles.leftContentBottom}>
            <div style={styles.taglineBadge}>Enterprise Healthcare Portal</div>
            <h2 style={styles.heroHeadline}>Better Healthcare.<br />Smarter Management.</h2>
            <p style={styles.heroSubtext}>
              Streamline clinical workflows, synchronize patient health charts, and optimize hospital department operations in real-time.
            </p>

            <div style={styles.statsGrid}>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>140k+</div>
                <div style={styles.statLabel}>Patients Served</div>
              </div>
              <div style={styles.statDivider} />
              <div style={styles.statItem}>
                <div style={styles.statNumber}>99.9%</div>
                <div style={styles.statLabel}>System Uptime</div>
              </div>
              <div style={styles.statDivider} />
              <div style={styles.statItem}>
                <div style={styles.statNumber}>256-Bit</div>
                <div style={styles.statLabel}>EHR Encryption</div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANEL: LOGIN INTERFACE ================= */}
        <div style={styles.rightPanel}>
          <div style={styles.formWrapper}>
            {/* MediCare Hospital Brand Logo Header */}
            <div style={styles.brandHeader}>
              <div style={styles.logoBadge}>
                <div style={styles.logoIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="6" fill="url(#logoGrad)" />
                    <path
                      d="M12 6V18M6 12H18"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="12" r="2.5" fill="#38bdf8" />
                    <defs>
                      <linearGradient id="logoGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0284c7" />
                        <stop offset="1" stopColor="#0d9488" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <span style={styles.brandName}>Medi<span style={styles.brandAccent}>Care</span></span>
              </div>

              <div style={styles.statusPill}>
                <span style={styles.greenDot} /> Hospital Cloud Online
              </div>
            </div>

            {/* Title & Subtitle */}
            <div style={styles.headingSection}>
              <h1 style={styles.headingTitle}>Welcome Back</h1>
              <p style={styles.headingSubtitle}>
                Sign in to access your hospital management dashboard.
              </p>
            </div>

            {/* ================= DEMO CREDENTIALS QUICK-FILL BAR ================= */}
            <div style={styles.demoCredentialsBox}>
              <div style={styles.demoHeader}>
                <span style={styles.demoTitle}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Demo Login Credentials (1-Click Auto Fill):
                </span>
                {copiedFeedback && <span style={styles.toastBadge}>{copiedFeedback}</span>}
              </div>

              <div style={styles.demoAccountsGrid}>
                {demoAccounts.map((acc) => {
                  const isSelected = activeRole === acc.id;
                  return (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => handleFillCredentials(acc)}
                      style={{
                        ...styles.demoCardBtn,
                        borderColor: isSelected ? acc.color : '#e2e8f0',
                        backgroundColor: isSelected ? acc.bgColor : '#ffffff',
                      }}
                      className="demo-card-hover"
                      title={`Click to fill ${acc.name} credentials`}
                    >
                      <div style={styles.demoCardTop}>
                        <span style={styles.demoCardIcon}>{acc.icon}</span>
                        <span style={{ ...styles.demoRoleTag, color: acc.color }}>{acc.badge}</span>
                      </div>
                      <div style={styles.demoEmailText}>{acc.email}</div>
                      <div style={styles.demoPassRow}>
                        <span style={styles.demoPassLabel}>Pass:</span>
                        <code style={styles.demoPassCode}>{acc.pass}</code>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error or Success Feedback Alert */}
            {errorMessage && (
              <div style={styles.errorBanner}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            {authSuccess && (
              <div style={styles.successBanner}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>Authenticated as <strong>{email}</strong>! Launching EHR portal...</span>
              </div>
            )}

            {/* Main Login Form */}
            <form onSubmit={handleLogin} style={styles.form}>
              {/* Email Field */}
              <div style={styles.inputGroup}>
                <label style={styles.fieldLabel} htmlFor="email">
                  Hospital Email / Staff ID
                </label>
                <div style={styles.inputBox}>
                  <span style={styles.inputIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <input
                    id="email"
                    type="email"
                    placeholder="doctor@medicare.health"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.textInput}
                    required
                  />
                </div>
              </div>

              {/* Password Field with Visibility Toggle */}
              <div style={styles.inputGroup}>
                <div style={styles.labelRow}>
                  <label style={styles.fieldLabel} htmlFor="password">
                    Password
                  </label>
                  <a href="#forgot" style={styles.forgotLink} tabIndex={-1}>
                    Forgot Password?
                  </a>
                </div>
                <div style={styles.inputBox}>
                  <span style={styles.inputIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter confidential password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.textInput}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.toggleVisibilityBtn}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                        <line x1="2" y1="2" x2="22" y2="22" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div style={styles.checkboxRow}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={styles.customCheckbox}
                  />
                  <span>Remember my terminal for 30 days</span>
                </label>
              </div>

              {/* Large Blue Primary Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  ...styles.submitBtn,
                  opacity: isLoading ? 0.75 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                }}
                className="btn-hover-effect"
              >
                {isLoading ? (
                  <div style={styles.loaderContainer}>
                    <span className="spinner" />
                    <span>Verifying Clinical Credentials...</span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span>Sign In to MediCare Dashboard</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </button>
            </form>

            {/* Divider with OR */}
            <div style={styles.dividerContainer}>
              <div style={styles.dividerLine} />
              <span style={styles.dividerText}>OR</span>
              <div style={styles.dividerLine} />
            </div>

            {/* Google OAuth Button */}
            <button type="button" style={styles.googleBtn} className="google-hover-effect">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Hospital Google Workspace</span>
            </button>

            {/* Create Account Link */}
            <div style={styles.createAccountRow}>
              <span style={{ color: '#64748b' }}>Don't have an account? </span>
              <a href="#register" style={styles.createAccountLink}>
                Create Account
              </a>
            </div>

            {/* Bottom Security Assurance Footer */}
            <div style={styles.securityFooter}>
              <div style={styles.securityItem}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>256-bit SSL</span>
              </div>
              <span style={styles.dotSeparator}>•</span>
              <div style={styles.securityItem}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>HIPAA & GDPR</span>
              </div>
              <span style={styles.dotSeparator}>•</span>
              <div style={styles.securityItem}>
                <span>SOC2 Type II</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// DESIGN TOKENS & STYLES (Figma-Grade Healthcare SaaS)
// -------------------------------------------------------------
const styles = {
  pageContainer: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F5FA',
    padding: '24px 16px',
    fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxSizing: 'border-box',
  },
  splitCard: {
    display: 'flex',
    width: '100%',
    maxWidth: '1380px',
    minHeight: '860px',
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 25px 60px -15px rgba(2, 132, 199, 0.12), 0 0 1px 1px rgba(14, 165, 233, 0.08)',
    border: '1px solid rgba(226, 232, 240, 0.8)',
  },

  // LEFT PANEL
  leftPanel: {
    flex: '1.15',
    background: 'linear-gradient(145deg, #02203c 0%, #033658 50%, #064e6b 100%)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '44px',
    overflow: 'hidden',
    color: '#FFFFFF',
  },
  ambientGlowTop: {
    position: 'absolute',
    top: '-80px',
    right: '-80px',
    width: '320px',
    height: '320px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(14, 165, 233, 0.35) 0%, rgba(13, 148, 136, 0) 70%)',
    filter: 'blur(40px)',
    pointerEvents: 'none',
  },
  ambientGlowBottom: {
    position: 'absolute',
    bottom: '-100px',
    left: '-60px',
    width: '360px',
    height: '360px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(20, 184, 166, 0.25) 0%, rgba(2, 132, 199, 0) 70%)',
    filter: 'blur(50px)',
    pointerEvents: 'none',
  },
  leftBrandBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(12px)',
    padding: '6px 14px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.3px',
    color: '#bae6fd',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    zIndex: 2,
  },
  liveIndicator: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: '#34d399',
    boxShadow: '0 0 8px #34d399',
  },
  illustrationWrapper: {
    position: 'relative',
    margin: '28px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  heroImageContainer: {
    position: 'relative',
    width: '100%',
    height: '340px',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  heroImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(2, 32, 60, 0.2) 0%, rgba(3, 54, 88, 0.65) 100%)',
  },
  floatingCard: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(16px)',
    borderRadius: '14px',
    padding: '12px 16px',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.9)',
    color: '#0f172a',
    zIndex: 5,
  },
  cardHeaderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  pulseIconCircle: {
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    backgroundColor: '#e0f2fe',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarIconCircle: {
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    backgroundColor: '#ccfbf1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  },
  cardValue: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#0f172a',
  },
  ecgWaveContainer: {
    marginTop: '6px',
  },
  scheduleBadge: {
    marginTop: '6px',
    fontSize: '11px',
    color: '#334155',
    backgroundColor: '#f1f5f9',
    padding: '4px 8px',
    borderRadius: '6px',
  },
  successDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
    boxShadow: '0 0 6px #10b981',
  },
  recordsText: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#065f46',
  },
  leftContentBottom: {
    position: 'relative',
    zIndex: 2,
  },
  taglineBadge: {
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#38bdf8',
    marginBottom: '8px',
  },
  heroHeadline: {
    fontSize: '32px',
    fontWeight: '800',
    lineHeight: '1.2',
    color: '#FFFFFF',
    margin: '0 0 10px 0',
  },
  heroSubtext: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#cbd5e1',
    margin: '0 0 24px 0',
    maxWidth: '460px',
  },
  statsGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '14px 18px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  statItem: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: '11px',
    color: '#94a3b8',
    marginTop: '2px',
  },
  statDivider: {
    width: '1px',
    height: '28px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },

  // RIGHT PANEL
  rightPanel: {
    flex: '1.05',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 48px',
    backgroundColor: '#FFFFFF',
    boxSizing: 'border-box',
  },
  formWrapper: {
    width: '100%',
    maxWidth: '460px',
  },
  brandHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  logoBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    filter: 'drop-shadow(0 4px 10px rgba(2, 132, 199, 0.3))',
  },
  brandName: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.5px',
  },
  brandAccent: {
    color: '#0284c7',
  },
  statusPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    fontWeight: '500',
    color: '#166534',
    backgroundColor: '#dcfce7',
    padding: '4px 10px',
    borderRadius: '999px',
  },
  greenDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#22c55e',
  },
  headingSection: {
    marginBottom: '18px',
  },
  headingTitle: {
    fontSize: '26px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.5px',
    margin: '0 0 4px 0',
  },
  headingSubtitle: {
    fontSize: '13.5px',
    color: '#64748b',
    margin: 0,
    lineHeight: '1.5',
  },

  // DEMO CREDENTIALS STYLES
  demoCredentialsBox: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '14px',
    padding: '12px',
    marginBottom: '18px',
  },
  demoHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  demoTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11.5px',
    fontWeight: '700',
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  },
  toastBadge: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#0369a1',
    backgroundColor: '#e0f2fe',
    padding: '2px 8px',
    borderRadius: '999px',
  },
  demoAccountsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
  },
  demoCardBtn: {
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    padding: '8px',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
  demoCardTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '4px',
  },
  demoCardIcon: {
    fontSize: '14px',
  },
  demoRoleTag: {
    fontSize: '10.5px',
    fontWeight: '700',
  },
  demoEmailText: {
    fontSize: '10px',
    fontWeight: '500',
    color: '#475569',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: '4px',
  },
  demoPassRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '9.5px',
    color: '#64748b',
  },
  demoPassLabel: {
    fontWeight: '600',
  },
  demoPassCode: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: '1px 3px',
    borderRadius: '3px',
    fontSize: '9.5px',
    color: '#0f172a',
    fontWeight: '600',
  },

  errorBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#b91c1c',
    padding: '10px 14px',
    borderRadius: '10px',
    fontSize: '13px',
    marginBottom: '16px',
  },
  successBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    color: '#15803d',
    padding: '10px 14px',
    borderRadius: '10px',
    fontSize: '13px',
    marginBottom: '16px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#334155',
  },
  forgotLink: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#0284c7',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  inputBox: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  textInput: {
    width: '100%',
    height: '44px',
    padding: '0 42px 0 42px',
    backgroundColor: '#f8fafc',
    border: '1.5px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '13.5px',
    color: '#0f172a',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'all 0.2s ease',
  },
  toggleVisibilityBtn: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    padding: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#475569',
    cursor: 'pointer',
    userSelect: 'none',
  },
  customCheckbox: {
    width: '16px',
    height: '16px',
    accentColor: '#0284c7',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  submitBtn: {
    height: '46px',
    backgroundColor: '#0284c7',
    backgroundImage: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14.5px',
    fontWeight: '700',
    boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.4)',
    marginTop: '2px',
    transition: 'all 0.25s ease',
  },
  loaderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '16px 0',
    gap: '14px',
  },
  dividerLine: {
    flex: '1',
    height: '1px',
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  googleBtn: {
    width: '100%',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '13.5px',
    fontWeight: '600',
    color: '#334155',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
    transition: 'all 0.2s ease',
  },
  createAccountRow: {
    textAlign: 'center',
    fontSize: '13px',
    marginTop: '18px',
  },
  createAccountLink: {
    color: '#0284c7',
    fontWeight: '700',
    textDecoration: 'none',
  },
  securityFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginTop: '20px',
    paddingTop: '16px',
    borderTop: '1px solid #f1f5f9',
    fontSize: '11px',
    color: '#64748b',
  },
  securityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontWeight: '500',
  },
  dotSeparator: {
    color: '#cbd5e1',
  },
};

// -------------------------------------------------------------
// CSS ANIMATIONS & INTERACTIVE STATES
// -------------------------------------------------------------
const customCss = `
  @keyframes floatSlow {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes floatDelayed {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .animate-float-slow {
    animation: floatSlow 5s ease-in-out infinite;
  }
  .animate-float-delayed {
    animation: floatDelayed 6s ease-in-out 1.5s infinite;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #ffffff;
    animation: spin 0.8s linear infinite;
    display: inline-block;
  }

  input:focus {
    border-color: #0284c7 !important;
    background-color: #ffffff !important;
    box-shadow: 0 0 0 4px rgba(2, 132, 199, 0.12) !important;
  }

  .demo-card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.05);
    border-color: #93c5fd !important;
  }

  .btn-hover-effect:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 30px -5px rgba(2, 132, 199, 0.5) !important;
    background-image: linear-gradient(135deg, #0369a1 0%, #0284c7 100%) !important;
  }
  .btn-hover-effect:active {
    transform: translateY(0);
  }

  .google-hover-effect:hover {
    background-color: #f8fafc !important;
    border-color: #cbd5e1 !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
  }

  a:hover {
    text-decoration: underline !important;
  }

  @media (max-width: 1024px) {
    div[style*="splitCard"] {
      flex-direction: column !important;
      max-width: 580px !important;
      min-height: auto !important;
    }
  }
`;
