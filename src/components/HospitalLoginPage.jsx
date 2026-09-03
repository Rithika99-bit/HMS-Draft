import React, { useState } from 'react';
import { demoAccounts } from '../data/demoAccounts';
import { 
  Activity, Lock, Mail, Eye, EyeOff, 
  ArrowLeft, ShieldCheck, HeartPulse, 
  Calendar, Check, AlertCircle, LogIn 
} from 'lucide-react';

export default function HospitalLoginPage({ onLoginSuccess, onBackToPortal, onShowToast }) {
  const [selectedRole, setSelectedRole] = useState('doctor');
  const [email, setEmail] = useState('dr.sarah@medicare.health');
  const [password, setPassword] = useState('DocPass#2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuickFill = (account) => {
    setSelectedRole(account.id);
    setEmail(account.email);
    setPassword(account.pass);
    setError('');
    if (onShowToast) {
      onShowToast(`Loaded credentials for ${account.name} (${account.badge})`, 'info');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your hospital email address.');
      return;
    }
    if (!password) {
      setError('Please enter your account password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Find matching account or match by role
      const matchedUser = demoAccounts.find(a => a.email.toLowerCase() === email.toLowerCase()) 
        || demoAccounts.find(a => a.id === selectedRole)
        || demoAccounts[0];

      if (onShowToast) {
        onShowToast(`Welcome back, ${matchedUser.name}!`, 'success');
      }
      onLoginSuccess(matchedUser);
    }, 900);
  };

  return (
    <div className="split-auth-page">
      {/* Left Panel: Healthcare Operations Hero */}
      <div className="split-hero-side">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="brand-icon" style={{ width: '36px', height: '36px' }}>
              <Activity size={20} />
            </div>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>
              Medi<span style={{ color: '#38bdf8' }}>Care</span>
            </span>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="pulse-dot" style={{ color: '#34d399' }}></span>
            <span>Cloud 4.2 Online</span>
          </div>
        </div>

        {/* Center Visual & Holographic Cards */}
        <div style={{ position: 'relative', margin: '40px 0', zIndex: 5 }}>
          <div style={{ borderRadius: '16px', overflow: 'hidden', height: '280px', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80" 
              alt="MediCare Operations"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.8) 100%)' }} />
          </div>

          {/* Floating Vitals Badge */}
          <div style={{ position: 'absolute', top: '-15px', left: '20px', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.2)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HeartPulse size={16} />
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Live ICU Telemetry</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>72 BPM • 98% SpO2</div>
            </div>
          </div>

          {/* Floating Surgery Badge */}
          <div style={{ position: 'absolute', bottom: '-15px', right: '20px', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(13, 148, 136, 0.2)', color: '#2dd4bf', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={16} />
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>OR 3 Ready</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Next: 1:30 PM</div>
            </div>
          </div>
        </div>

        {/* Bottom Metrics */}
        <div style={{ zIndex: 10 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
            Better Healthcare. <br />Smarter Management.
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '24px', lineHeight: 1.5 }}>
            Synchronize patient health records, surgical schedules, automated pharmacy dispensation, and multi-department telemetry.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8' }}>140k+</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Patients Served</div>
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399' }}>99.9%</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>System Uptime</div>
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#c084fc' }}>256-Bit</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>EHR Encrypted</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Split Authentication Form */}
      <div className="split-auth-side">
        <button 
          onClick={onBackToPortal}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: '#64748b', fontWeight: 600, marginBottom: '28px', cursor: 'pointer', background: 'none', border: 'none' }}
        >
          <ArrowLeft size={16} /> Back to Public Hospital Portal
        </button>

        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
            Portal Sign In
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
            Select a role demo credential or enter your hospital staff credentials.
          </p>
        </div>

        {/* Quick Demo Credentials Bar */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#0284c7', marginBottom: '8px', letterSpacing: '0.04em' }}>
            ⚡ 1-Click Quick Fill Role Credentials
          </div>
          <div className="quick-demo-pills">
            {demoAccounts.map(account => (
              <button
                key={account.id}
                type="button"
                className={`demo-pill-btn ${selectedRole === account.id ? 'active' : ''}`}
                onClick={() => handleQuickFill(account)}
              >
                {account.badge}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px 14px', borderRadius: '8px', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Hospital Email Address</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="email" 
                className="form-input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@medicare.health"
                style={{ paddingLeft: '40px' }}
                required
              />
              <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); if (onShowToast) onShowToast('Demo password reset link dispatched to email.', 'info'); }} style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 600 }}>
                Forgot Password?
              </a>
            </div>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="form-input" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{ paddingLeft: '40px', paddingRight: '40px' }}
                required
              />
              <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '0.86rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#475569' }}>
              <input 
                type="checkbox" 
                checked={rememberMe} 
                onChange={(e) => setRememberMe(e.target.checked)} 
                style={{ accentColor: '#0284c7' }}
              />
              <span>Remember this session</span>
            </label>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full btn-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <LogIn size={18} />
                <span>Access Role Dashboard</span>
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #e2e8f0', textAlign: 'center', fontSize: '0.82rem', color: '#94a3b8' }}>
          <span>HIPAA & SOC-2 Type II Certified Healthcare Portal</span>
        </div>
      </div>
    </div>
  );
}
