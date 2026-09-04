import React, { useState } from 'react';
import PatientDashboardView from './PatientDashboardView';
import PatientMedicalRecordView from './PatientMedicalRecordView';
import DoctorTimelineView from '../doctor/DoctorTimelineView';
import PatientAppointmentsView from './PatientAppointmentsView';
import PatientMedicationsView from './PatientMedicationsView';
import PatientConsentsView from './PatientConsentsView';
import PatientDocumentsView from './PatientDocumentsView';
import PatientProfilePrivacyView from './PatientProfilePrivacyView';
import EmergencyModule from '../emergency/EmergencyModule';
import PatientLabHubView from './PatientLabHubView';
import PatientImagingView from '../imaging/PatientImagingView';
import PatientOtView from '../ot/PatientOtView';
import {
  User, Calendar, Pill, History, ShieldCheck,
  FileText, Activity, Ambulance, Shield, Droplets, FlaskConical, Camera, HeartPulse
} from 'lucide-react';

export default function PatientPortalModule({ onShowToast }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'My Dashboard', icon: Activity },
    { id: 'ot', label: 'Surgery & OT', icon: HeartPulse },
    { id: 'imaging', label: 'Imaging & Scans', icon: Camera },
    { id: 'record', label: 'My Medical Record', icon: User },
    { id: 'timeline', label: 'Health Timeline', icon: History },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'medications', label: 'Medications & Refills', icon: Pill },
    { id: 'labhub', label: 'My Lab Hub', icon: FlaskConical },
    { id: 'consents', label: 'Consents & e-Sign', icon: ShieldCheck },
    { id: 'documents', label: 'Documents & E-Rx', icon: FileText },
    { id: 'profile', label: 'Profile & Privacy', icon: Shield },
    { id: 'emergency', label: 'Emergency Visit Details', icon: Ambulance, emergency: true }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Patient Top Navigation Bar */}
      <div className="admin-subnav-tabs" style={{ background: '#ffffff', padding: '10px 14px', boxShadow: 'var(--shadow-sm)', overflowX: 'auto', flexWrap: 'nowrap' }}>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`admin-sub-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
              style={{
                fontSize: '0.85rem',
                padding: '10px 16px',
                whiteSpace: 'nowrap',
                color: item.emergency ? (isActive ? '#ffffff' : '#dc2626') : undefined
              }}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic View Switcher */}
      {activeTab === 'dashboard' && (
        <PatientDashboardView
          onNavigateTab={setActiveTab}
          onShowToast={onShowToast}
        />
      )}

      {activeTab === 'ot' && (
        <PatientOtView onShowToast={onShowToast} />
      )}

      {activeTab === 'imaging' && (
        <PatientImagingView onShowToast={onShowToast} />
      )}

      {activeTab === 'record' && (
        <PatientMedicalRecordView onShowToast={onShowToast} />
      )}

      {activeTab === 'timeline' && (
        <DoctorTimelineView onShowToast={onShowToast} />
      )}

      {activeTab === 'appointments' && (
        <PatientAppointmentsView onShowToast={onShowToast} />
      )}

      {activeTab === 'medications' && (
        <PatientMedicationsView onShowToast={onShowToast} />
      )}

      {activeTab === 'consents' && (
        <PatientConsentsView onShowToast={onShowToast} />
      )}

      {activeTab === 'documents' && (
        <PatientDocumentsView onShowToast={onShowToast} />
      )}

      {activeTab === 'profile' && (
        <PatientProfilePrivacyView onShowToast={onShowToast} />
      )}

      {activeTab === 'labhub' && (
        <PatientLabHubView onShowToast={onShowToast} />
      )}

      {activeTab === 'emergency' && (
        <EmergencyModule role="patient" onShowToast={onShowToast} />
      )}

    </div>
  );
}
