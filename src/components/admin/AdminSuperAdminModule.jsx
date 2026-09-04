import React, { useState } from 'react';
import AdminDashboardView from './AdminDashboardView';
import AdminUserManagementView from './AdminUserManagementView';
import AdminPatientManagementView from './AdminPatientManagementView';
import AdminDoctorStaffView from './AdminDoctorStaffView';
import AdminAuditLogsView from './AdminAuditLogsView';
import SuperAdminRbacView from './SuperAdminRbacView';
import SuperAdminOrgConfigView from './SuperAdminOrgConfigView';
import SuperAdminIntegrationsView from './SuperAdminIntegrationsView';
import SuperAdminSecurityAuditView from './SuperAdminSecurityAuditView';
import SuperAdminIpdModule from './SuperAdminIpdModule';
import SuperAdminOpdModule from './SuperAdminOpdModule';
import EmergencyModule from '../emergency/EmergencyModule';
import LabOperationsModule from '../lab/LabOperationsModule';
import RadiologyAdminModule from '../imaging/RadiologyAdminModule';
import SuperAdminImagingMaster from '../imaging/SuperAdminImagingMaster';
import OtAdminModule from '../ot/OtAdminModule';
import SuperAdminOtMaster from '../ot/SuperAdminOtMaster';
import { 
  ShieldCheck, Shield, Users, UserPlus, 
  Calendar, Bed, Activity, Ambulance, 
  Database, Zap, Key, Layers, BookOpen, FlaskConical, Camera, HeartPulse
} from 'lucide-react';

export default function AdminSuperAdminModule({ isSuperAdmin = false, onShowToast }) {
  const [activeAdminTab, setActiveAdminTab] = useState('dashboard');

  const navTabs = [
    { id: 'dashboard', label: 'Operations Dashboard', icon: Activity },
    { id: 'ot-admin', label: 'Operation Theatre (OT)', icon: HeartPulse },
    { id: 'radiology', label: 'Radiology Operations (RIS)', icon: Camera },
    { id: 'patient-mgmt', label: 'Patient Master & AI Merge', icon: Users },
    { id: 'user-mgmt', label: 'User & Staff Identity', icon: UserPlus },
    { id: 'doctor-staff', label: 'Doctor Rosters & Rooms', icon: Calendar },
    { id: 'ipd', label: 'Inpatient (IPD)', icon: Bed },
    { id: 'opd', label: 'Outpatient (OPD)', icon: Calendar },
    { id: 'emergency', label: 'Emergency Center (ED)', icon: Ambulance, emergency: true },
    { id: 'lab', label: 'Laboratory (LIS)', icon: FlaskConical },
    { id: 'audit-logs', label: 'Audit Trail & Compliance', icon: ShieldCheck },
    // SuperAdmin Exclusive Tabs:
    ...(isSuperAdmin ? [
      { id: 'ot-master', label: 'OT Master & Rooms Config', icon: HeartPulse, superAdmin: true },
      { id: 'imaging-master', label: 'Imaging Test Master & PACS', icon: Layers, superAdmin: true },
      { id: 'rbac', label: 'RBAC Permission Matrix', icon: Key, superAdmin: true },
      { id: 'org-config', label: 'System Config & Terminology', icon: BookOpen, superAdmin: true },
      { id: 'integrations', label: 'HL7 / FHIR Integrations', icon: Zap, superAdmin: true },
      { id: 'security-audit', label: 'Security & Backup Snapshots', icon: Database, superAdmin: true }
    ] : [])
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Navigation Subnav Tabs */}
      <div className="admin-subnav-tabs" style={{ background: '#ffffff', padding: '10px 14px', boxShadow: 'var(--shadow-sm)', overflowX: 'auto', flexWrap: 'nowrap' }}>
        {navTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`admin-sub-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveAdminTab(tab.id)}
              style={{
                fontSize: '0.85rem',
                padding: '10px 16px',
                whiteSpace: 'nowrap',
                color: tab.emergency ? (isActive ? '#ffffff' : '#dc2626') : tab.superAdmin ? (isActive ? '#ffffff' : '#4f46e5') : undefined
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic View Switcher */}
      {activeAdminTab === 'dashboard' && (
        <AdminDashboardView onNavigate={setActiveAdminTab} onShowToast={onShowToast} />
      )}

      {activeAdminTab === 'ot-admin' && (
        <OtAdminModule onShowToast={onShowToast} />
      )}

      {activeAdminTab === 'radiology' && (
        <RadiologyAdminModule onShowToast={onShowToast} />
      )}

      {activeAdminTab === 'patient-mgmt' && (
        <AdminPatientManagementView onShowToast={onShowToast} />
      )}

      {activeAdminTab === 'user-mgmt' && (
        <AdminUserManagementView onShowToast={onShowToast} />
      )}

      {activeAdminTab === 'doctor-staff' && (
        <AdminDoctorStaffView onShowToast={onShowToast} />
      )}

      {activeAdminTab === 'ipd' && (
        <SuperAdminIpdModule onShowToast={onShowToast} />
      )}

      {activeAdminTab === 'opd' && (
        <SuperAdminOpdModule onShowToast={onShowToast} />
      )}

      {activeAdminTab === 'emergency' && (
        <EmergencyModule role="admin" onShowToast={onShowToast} />
      )}

      {activeAdminTab === 'lab' && (
        <LabOperationsModule />
      )}

      {activeAdminTab === 'audit-logs' && (
        <AdminAuditLogsView onShowToast={onShowToast} />
      )}

      {/* SuperAdmin Views */}
      {activeAdminTab === 'ot-master' && (
        <SuperAdminOtMaster onShowToast={onShowToast} />
      )}

      {activeAdminTab === 'imaging-master' && (
        <SuperAdminImagingMaster onShowToast={onShowToast} />
      )}

      {activeAdminTab === 'rbac' && (
        <SuperAdminRbacView onShowToast={onShowToast} />
      )}

      {activeAdminTab === 'org-config' && (
        <SuperAdminOrgConfigView onShowToast={onShowToast} />
      )}

      {activeAdminTab === 'integrations' && (
        <SuperAdminIntegrationsView onShowToast={onShowToast} />
      )}

      {activeAdminTab === 'security-audit' && (
        <SuperAdminSecurityAuditView onShowToast={onShowToast} />
      )}

    </div>
  );
}
