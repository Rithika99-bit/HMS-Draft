import React, { useState } from 'react';
import { portalAccounts, portalCategories } from '../../data/demoAccounts';
import { 
  X, Lock, Mail, Eye, EyeOff, 
  LogIn, ShieldCheck, ArrowRight, AlertCircle 
} from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess, onOpenFullLogin, onShowToast }) {
  const [selectedRole, setSelectedRole] = useState('doctor');
  const [email, setEmail] = useState('dr.sarah@medicare.health');
  const [password, setPassword] = useState('DocPass#2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleQuickFill = (account) => {
    setSelectedRole(account.id);
    setEmail(account.email);
    setPassword(account.pass);
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const matchedUser = portalAccounts.find(a => a.email.toLowerCase() === email.toLowerCase() && a.pass === password)
        || portalAccounts.find(a => a.email.toLowerCase() === email.toLowerCase())
        || portalAccounts.find(a => a.id === selectedRole);

      if (!matchedUser || !['admin', 'superadmin', 'patient', 'doctor', 'pharmacist'].includes(matchedUser.id)) {
        setError('Access Denied: Only Admin/SuperAdmin, Patient, Doctor, and Pharmacist portals are permitted.');
        return;
      }

      if (onShowToast) {
        onShowToast(`Signed in as ${matchedUser.name} (${matchedUser.badge})`, 'success');
      }
      onLoginSuccess(matchedUser);
      onClose();
    }, 700);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-box">
            <div className="modal-icon-badge">
              <LogIn size={20} />
            </div>
            <div>
              <h2 className="modal-title">Hospital Portal Login</h2>
              <div className="modal-subtitle">Fast role-isolated authentication</div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* 1-Click Quick Fill Bar for 4 Allowed Portals */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#0284c7', marginBottom: '8px' }}>
              🔒 1-Click Portal Quick Fill (4 Portals)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {portalAccounts.map(account => (
                <button
                  key={account.id}
                  type="button"
                  onClick={() => handleQuickFill(account)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: `1.5px solid ${selectedRole === account.id ? '#0284c7' : '#e2e8f0'}`,
                    background: selectedRole === account.id ? '#f0f9ff' : '#ffffff',
                    color: selectedRole === account.id ? '#0284c7' : '#334155',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                  }}
                >
                  <span>{account.badge}</span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500 }}>{account.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px 14px', borderRadius: '8px', fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="email" 
                  className="form-input" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '38px' }}
                  required
                />
                <Mail size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="form-input" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '38px', paddingRight: '38px' }}
                  required
                />
                <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={isLoading} style={{ marginTop: '10px', fontWeight: 700 }}>
              {isLoading ? 'Authenticating...' : 'Sign In to Portal'}
            </button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button 
              type="button" 
              onClick={() => {
                onClose();
                onOpenFullLogin();
              }}
              style={{ background: 'none', border: 'none', color: '#0284c7', fontSize: '0.86rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
            >
              Open Full-Page Portal Login <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
