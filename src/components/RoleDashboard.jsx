import React from 'react';
import { demoAccounts } from '../data/demoAccounts';
import DoctorModule from './doctor/DoctorModule';
import PatientPortalModule from './patient/PatientPortalModule';
import AdminSuperAdminModule from './admin/AdminSuperAdminModule';
import PharmacyModule from './pharmacy/PharmacyModule';
import LabOperationsModule from './lab/LabOperationsModule';
import {
  Activity, ShieldCheck, LogOut, ArrowLeft,
  Stethoscope, Pill, User, HeartPulse,
  Clock, CheckCircle, AlertTriangle, FileText,
  Plus, Download, ExternalLink, Calendar, Info,
  FolderHeart, Bed, Layers, Ambulance, Shield
} from 'lucide-react';

export default function RoleDashboard({ currentUser, onLogout, onSwitchRole, onBackToPortal, onShowToast }) {
  const user = currentUser || demoAccounts[0];

  return (
    <div className="dashboard-page">
      {/* Dashboard Sticky Topbar */}
      <header className="dash-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="dash-brand">
            <div className="brand-icon" style={{ width: '32px', height: '32px' }}>
              <Activity size={18} />
            </div>
            <span>MediCare <span style={{ color: '#0284c7', fontSize: '0.9rem', fontWeight: 600 }}>Role Portal</span></span>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={onBackToPortal}
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            <ArrowLeft size={14} /> Back to Website
          </button>
        </div>

        {/* Quick Role Switcher */}
        <div className="dash-role-switcher">
          {demoAccounts.map(account => (
            <button
              key={account.id}
              className={`dash-role-btn ${user.id === account.id ? 'active' : ''}`}
              onClick={() => onSwitchRole(account)}
            >
              {account.badge}
            </button>
          ))}
        </div>

        {/* User Info & Logout */}
        <div className="dash-user-panel">
          <img src={user.avatar} alt={user.name} className="dash-user-avatar" />
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>{user.name}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{user.role}</div>
          </div>
          <button
            className="btn btn-outline btn-sm"
            onClick={onLogout}
            style={{ marginLeft: '12px', padding: '6px 12px' }}
          >
            <LogOut size={14} /> Logout
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
              Department: <strong>{user.department}</strong> • Shared Longitudinal Patient Record & Inventory Active
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ background: 'rgba(255,255,255,0.15)', padding: '8px 16px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600 }}>
              Session: Encrypted (HIPAA / FHIR R4)
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

        {/* ── 6. LAB TECHNOLOGIST MODULE ──────────────────────────────── */}
        {user.id === 'lab' && (
          <LabOperationsModule />
        )}
      </main>
    </div>
  );
}

