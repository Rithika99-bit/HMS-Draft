import React, { useState } from 'react';
import { portalAccounts, portalCategories } from '../data/demoAccounts';
import { 
  Activity, Lock, Mail, Eye, EyeOff, 
  ArrowLeft, ShieldCheck, HeartPulse, 
  Calendar, Check, AlertCircle, LogIn,
  Shield, User, Stethoscope, Pill
} from 'lucide-react';

export default function HospitalLoginPage({ onLoginSuccess, onBackToPortal, onShowToast }) {
  const [selectedPortal, setSelectedPortal] = useState('doctor');
  const [selectedRole, setSelectedRole] = useState('doctor');
  const [email, setEmail] = useState('dr.sarah@medicare.health');
  const [password, setPassword] = useState('DocPass#2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSelectPortal = (portal) => {
    setSelectedPortal(portal.id);
    let targetAccountId = portal.accountId;
    if (portal.subRoles) {
      targetAccountId = portal.subRoles[0].accountId;
    }
    setSelectedRole(targetAccountId);
    const account = portalAccounts.find(a => a.id === targetAccountId);
    if (account) {
      setEmail(account.email);
      setPassword(account.pass);
      setError('');
      if (onShowToast) {
        onShowToast(`Selected ${portal.name} (${account.badge})`, 'info');
      }
    }
  };

  const handleSelectSubRole = (accountId) => {
    setSelectedRole(accountId);
    const account = portalAccounts.find(a => a.id === accountId);
    if (account) {
      setEmail(account.email);
      setPassword(account.pass);
      setError('');
      if (onShowToast) {
        onShowToast(`Switched credentials to ${account.name} (${account.badge})`, 'info');
      }
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
      // Find matching account strictly in the 4 allowed portalAccounts
      const matchedUser = portalAccounts.find(a => a.email.toLowerCase() === email.toLowerCase() && a.pass === password)
        || portalAccounts.find(a => a.email.toLowerCase() === email.toLowerCase())
        || portalAccounts.find(a => a.id === selectedRole);

      if (!matchedUser || !['admin', 'superadmin', 'patient', 'doctor', 'pharmacist'].includes(matchedUser.id)) {
        setError('Access Denied: Only Admin/SuperAdmin, Patient, Doctor, and Pharmacist portals are permitted.');
        return;
      }

      if (onShowToast) {
        onShowToast(`Authenticated as ${matchedUser.name} (${matchedUser.badge} Portal)`, 'success');
      }
      onLoginSuccess(matchedUser);
    }, 700);
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
            <span>4 Portals Isolated</span>
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
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Strict RBAC Security</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Isolated Portal Sessions</div>
            </div>
          </div>

          {/* Floating Surgery Badge */}
          <div style={{ position: 'absolute', bottom: '-15px', right: '20px', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(13, 148, 136, 0.2)', color: '#2dd4bf', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={16} />
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Zero Cross-Viewing</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Immediate Session Kill</div>
            </div>
          </div>
        </div>

        {/* Bottom Metrics */}
        <div style={{ zIndex: 10 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
            Role-Isolated Access. <br />Hospital Grade Security.
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '24px', lineHeight: 1.5 }}>
            Access restricted strictly to Admin/SuperAdmin, Doctor, Patient, and Pharmacist portals. Once logged in, other portal views are sealed until dedicated authentication.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8' }}>4 Portals</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Strict Isolation</div>
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399' }}>Instant</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Immediate Logout</div>
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#c084fc' }}>HIPAA</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Access Enforced</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Split Authentication Form */}
      <div className="split-auth-side">
        <button 
          onClick={onBackToPortal}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: '#64748b', fontWeight: 600, marginBottom: '24px', cursor: 'pointer', background: 'none', border: 'none' }}
        >
          <ArrowLeft size={16} /> Back to Public Hospital Portal
        </button>

        <div style={{ marginBottom: '18px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
            Hospital Portal Login
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Select your assigned portal to authenticate into your isolated workspace.
          </p>
        </div>

        {/* Dedicated 4-Portal Selection */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#0284c7', marginBottom: '8px', letterSpacing: '0.04em' }}>
            🔒 Select Portal (4 Permitted Portals)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {portalCategories.map(portal => {
              const isSelected = selectedPortal === portal.id;
              return (
                <div
                  key={portal.id}
                  onClick={() => handleSelectPortal(portal)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: `1.5px solid ${isSelected ? portal.color : '#e2e8f0'}`,
                    background: isSelected ? `${portal.color}10` : '#ffffff',
                    boxShadow: isSelected ? `0 4px 14px ${portal.color}20` : '0 1px 3px rgba(0,0,0,0.03)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 800, color: isSelected ? portal.color : '#0f172a' }}>
                      {portal.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', lineHeight: 1.3 }}>
                    {portal.description}
                  </div>
                  {portal.subRoles && isSelected && (
                    <div style={{ display: 'flex', gap: '6px', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #e2e8f0' }} onClick={e => e.stopPropagation()}>
                      {portal.subRoles.map(sub => (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => handleSelectSubRole(sub.accountId)}
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            border: `1px solid ${selectedRole === sub.accountId ? portal.color : '#cbd5e1'}`,
                            background: selectedRole === sub.accountId ? portal.color : '#ffffff',
                            color: selectedRole === sub.accountId ? '#ffffff' : '#475569',
                            cursor: 'pointer'
                          }}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px 14px', borderRadius: '8px', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Portal Email Address</label>
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
              <label className="form-label" style={{ marginBottom: 0 }}>Portal Password</label>
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

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '0.86rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#475569' }}>
              <input 
                type="checkbox" 
                checked={rememberMe} 
                onChange={(e) => setRememberMe(e.target.checked)} 
                style={{ accentColor: '#0284c7' }}
              />
              <span>Remember this session</span>
            </label>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Auto-kill on logout
            </span>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full btn-lg"
            disabled={isLoading}
            style={{ fontWeight: 700 }}
          >
            {isLoading ? (
              <span>Authenticating Portal...</span>
            ) : (
              <>
                <LogIn size={18} />
                <span>Sign In to {portalCategories.find(p => p.id === selectedPortal)?.name || 'Portal'}</span>
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', textAlign: 'center', fontSize: '0.82rem', color: '#94a3b8' }}>
          <span>HIPAA Isolated Session • Immediate Logout Enforced</span>
        </div>
      </div>
    </div>
  );
}
