import React, { useState } from 'react';
import { demoAccounts } from '../../data/demoAccounts';
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
      const matchedUser = demoAccounts.find(a => a.email.toLowerCase() === email.toLowerCase()) 
        || demoAccounts.find(a => a.id === selectedRole)
        || demoAccounts[0];

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
              <div className="modal-subtitle">Fast role authentication</div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* 1-Click Quick Fill Bar */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#0284c7', marginBottom: '8px' }}>
              ⚡ 1-Click Demo Quick Fill
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {demoAccounts.map(account => (
                <button
                  key={account.id}
                  type="button"
                  onClick={() => handleQuickFill(account)}
                  style={{
                    padding: '8px 4px',
                    borderRadius: '8px',
                    border: `1.5px solid ${selectedRole === account.id ? '#0284c7' : '#e2e8f0'}`,
                    background: selectedRole === account.id ? '#f0f9ff' : '#f8fafc',
                    color: selectedRole === account.id ? '#0284c7' : '#475569',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  {account.badge}
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

            <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={isLoading} style={{ marginTop: '10px' }}>
              {isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
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
              Open Split-Screen Portal Experience <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
