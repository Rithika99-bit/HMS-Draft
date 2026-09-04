import React from 'react';
import DoctorModule from './doctor/DoctorModule';
import PatientPortalModule from './patient/PatientPortalModule';
import AdminSuperAdminModule from './admin/AdminSuperAdminModule';
import PharmacyModule from './pharmacy/PharmacyModule';
import {
  Activity, ShieldCheck, LogOut, ArrowLeft,
  Lock, AlertTriangle
} from 'lucide-react';

export default function RoleDashboard({ currentUser, onLogout, onBackToPortal, onShowToast }) {
  if (!currentUser) {
    return (
      <div className="dashboard-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div style={{ background: '#ffffff', padding: '36px', borderRadius: '16px', border: '1px solid #fee2e2', textAlign: 'center', maxWidth: '460px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}>
          <AlertTriangle size={48} color="#ef4444" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Session Not Found</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
            No authenticated portal session is active. Please log in to your designated portal.
          </p>
          <button className="btn btn-primary btn-full" onClick={onLogout}>
            <LogOut size={16} /> Immediate Return to Login
          </button>
        </div>
      </div>
    );
  }

  const user = currentUser;

  return (
    <div className="dashboard-page">
      {/* Dashboard Sticky Topbar */}
      <header className="dash-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div className="dash-brand">
            <div className="brand-icon" style={{ width: '32px', height: '32px' }}>
              <Activity size={18} />
            </div>
            <span>MediCare <span style={{ color: '#0284c7', fontSize: '0.9rem', fontWeight: 600 }}>{user.badge} Portal</span></span>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={onBackToPortal}
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            <ArrowLeft size={14} /> Back to Website
          </button>
        </div>

        {/* Security Isolation Indicator (Replaces cross-role switcher) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(2, 132, 199, 0.08)',
          border: '1px solid rgba(2, 132, 199, 0.25)',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '0.78rem',
          fontWeight: 700,
          color: '#0369a1'
        }}>
          <Lock size={13} color="#0284c7" />
          <span>Strict Portal Isolation Active • Cross-Viewing Locked</span>
        </div>

        {/* User Info & Immediate Logout */}
        <div className="dash-user-panel">
          <img src={user.avatar} alt={user.name} className="dash-user-avatar" />
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>{user.name}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{user.role}</div>
          </div>
          <button
            className="btn btn-danger btn-sm"
            onClick={onLogout}
            style={{ 
              marginLeft: '14px', 
              padding: '6px 14px',
              background: '#ef4444',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
            title="Terminate session and logout immediately"
          >
            <LogOut size={14} /> Immediate Logout
          </button>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="dash-body">
        {/* Top Header Banner */}
        <div className="dash-header-banner" style={{ marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 className="dash-title" style={{ margin: 0 }}>{user.badge} Workspace</h1>
              <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                {user.role}
              </span>
            </div>
            <p className="dash-subtitle" style={{ marginTop: '6px' }}>
              Department: <strong>{user.department}</strong> • Isolated Single-Portal Authorization
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ background: 'rgba(255,255,255,0.15)', padding: '8px 16px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600 }}>
              Session: Encrypted (HIPAA Isolated)
            </span>
          </div>
        </div>

        {/* ── 1. DOCTOR / CLINICIAN MODULE ───────────────────────────── */}
        {user.id === 'doctor' && (
          <DoctorModule onShowToast={onShowToast} />
        )}

        {/* ── 2. PATIENT PORTAL MODULE ───────────────────────────────── */}
        {user.id === 'patient' && (
          <PatientPortalModule onShowToast={onShowToast} />
        )}

        {/* ── 3. ADMIN MODULE (OPERATIONS) ───────────────────────────── */}
        {user.id === 'admin' && (
          <AdminSuperAdminModule isSuperAdmin={false} onShowToast={onShowToast} />
        )}

        {/* ── 4. SUPERADMIN MODULE (SYSTEM GOVERNANCE) ────────────────── */}
        {user.id === 'superadmin' && (
          <AdminSuperAdminModule isSuperAdmin={true} onShowToast={onShowToast} />
        )}

        {/* ── 5. PHARMACIST & INVENTORY MANAGEMENT MODULE ────────────── */}
        {user.id === 'pharmacist' && (
          <PharmacyModule onShowToast={onShowToast} />
        )}

        {/* ── ACCESS DENIED FALLBACK (IF OUTSIDE THE 4 ROLES) ──────────── */}
        {!['doctor', 'patient', 'admin', 'superadmin', 'pharmacist'].includes(user.id) && (
          <div style={{ background: '#ffffff', padding: '40px', borderRadius: '16px', border: '1px solid #fee2e2', textAlign: 'center', maxWidth: '540px', margin: '40px auto' }}>
            <AlertTriangle size={48} color="#ef4444" style={{ margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Unauthorized Portal Role
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>
              Your account does not belong to the 4 permitted portals (Admin/SuperAdmin, Patient, Doctor, or Pharmacist).
            </p>
            <button className="btn btn-primary" onClick={onLogout}>
              <LogOut size={16} /> Immediate Logout to Login Screen
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
