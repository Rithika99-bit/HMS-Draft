import React from 'react';
import { useEmr } from '../../context/EmrContext';
import {
  Heart, Calendar, Pill, Activity, ShieldCheck,
  FileText, Clock, AlertTriangle, CheckCircle,
  Video, ArrowRight, Phone, Download, ExternalLink, Sparkles
} from 'lucide-react';

export default function PatientDashboardView({ onNavigateTab, onShowToast }) {
  const { patientRecord, requestMedicationRefill } = useEmr();

  const handleTakeMed = (drugName) => {
    if (onShowToast) onShowToast(`Marked ${drugName} as taken for today. Great job!`, 'success');
  };

  const handleRefill = (medId, drugName) => {
    requestMedicationRefill(medId, 'Patient routine refill request', patientRecord.demographics.fullName);
    if (onShowToast) onShowToast(`Refill request for ${drugName} sent to Dr. Mitchell!`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Patient Welcome Hero Card */}
      <div className="dash-header-banner" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', borderRadius: '14px', padding: '24px 28px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
              UHID: {patientRecord.registration.uhid}
            </span>
            <span style={{ color: '#bae6fd', fontSize: '0.82rem' }}>• Insured via BlueCross PPO</span>
          </div>
          <h1 className="dash-title" style={{ marginTop: '8px', fontSize: '1.6rem' }}>
            Welcome back, {patientRecord.demographics.preferredName || patientRecord.demographics.fullName}!
          </h1>
          <p className="dash-subtitle" style={{ color: '#e0f2fe' }}>
            Primary Care: <strong>{patientRecord.registration.assignedPrimaryCarePhysician}</strong> • Next check-up today
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onNavigateTab('appointments')}
            style={{ background: '#ffffff', color: '#0284c7', border: 'none', fontWeight: 700 }}
          >
            <Calendar size={15} /> Book Appointment
          </button>
        </div>
      </div>

      {/* 4 Health Metric KPI Cards */}
      <div className="dash-stats-grid">
        <div className="dash-stat-card" style={{ borderLeft: '4px solid #0284c7' }}>
          <div className="dash-stat-label">Upcoming Appointment</div>
          <div className="dash-stat-val" style={{ color: '#0284c7', fontSize: '1.25rem' }}>Today, 2:15 PM</div>
          <div className="dash-stat-sub">Dr. Sarah Mitchell • Suite 304</div>
        </div>

        <div className="dash-stat-card" style={{ borderLeft: '4px solid #10b981' }}>
          <div className="dash-stat-label">Active Prescriptions</div>
          <div className="dash-stat-val" style={{ color: '#059669', fontSize: '1.25rem' }}>3 Medications</div>
          <div className="dash-stat-sub">98% Adherence • Refills Active</div>
        </div>

        <div className="dash-stat-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
          <div className="dash-stat-label">Recent Test Results</div>
          <div className="dash-stat-val" style={{ color: '#7c3aed', fontSize: '1.25rem' }}>2 Verified</div>
          <div className="dash-stat-sub">CMP & ECG (Normal baseline)</div>
        </div>

        <div className="dash-stat-card" style={{ borderLeft: '4px solid #f59e0b' }}>
          <div className="dash-stat-label">Health Documents</div>
          <div className="dash-stat-val" style={{ color: '#d97706', fontSize: '1.25rem' }}>
            {patientRecord.documentsAndConsent.length} Stored
          </div>
          <div className="dash-stat-sub">Consents, E-Rx, X-Ray reports</div>
        </div>
      </div>

      {/* Main Grid: Upcoming Appointment & Medication Pill Schedule */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1.7fr', gap: '20px' }}>

        {/* Left Column: Next Appointment & Alerts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Upcoming Visit Card */}
          <div className="dash-card" style={{ border: '2px solid #bae6fd', background: '#f0f9ff' }}>
            <div className="dash-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} color="#0284c7" />
                <h3 className="dash-card-title" style={{ color: '#0369a1' }}>Next Scheduled Visit</h3>
              </div>
              <span style={{ background: '#0284c7', color: '#ffffff', padding: '3px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700 }}>
                Today
              </span>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                Cardiology Specialist Consult
              </div>
              <div style={{ fontSize: '0.85rem', color: '#0369a1', fontWeight: 600 }}>
                Dr. Sarah Mitchell, MD
              </div>
              <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '4px' }}>
                Today, 03 Sep 2026 • 02:15 PM • Suite 304, Tower A
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>
                <strong>Reason:</strong> 6-Month cardiovascular check & Lisinopril refill evaluation
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
                onClick={() => { if (onShowToast) onShowToast('Checked in for appointment. Token #14 issued.', 'success'); }}
              >
                Self Check-In
              </button>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => onNavigateTab('appointments')}
              >
                View Details
              </button>
            </div>
          </div>

          {/* Important Care Alerts & Post-Visit Instructions */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={18} color="#f59e0b" />
                <h3 className="dash-card-title">Care Alerts & Instructions</h3>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '12px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#92400e' }}>
                  Avoid Penicillin / Beta-Lactams
                </div>
                <div style={{ fontSize: '0.78rem', color: '#78350f', marginTop: '2px' }}>
                  Critical drug allergy on file. Ensure all external healthcare providers are notified.
                </div>
              </div>

              <div style={{ padding: '12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#166534' }}>
                  Daily Blood Pressure Monitoring
                </div>
                <div style={{ fontSize: '0.78rem', color: '#14532d', marginTop: '2px' }}>
                  Take morning reading before taking Lisinopril. Log any readings &gt; 135/85 mm Hg.
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Daily Medication Schedule & Recent Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Daily Pill Schedule & 1-Click Tracker */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Pill size={18} color="#16a34a" />
                <h3 className="dash-card-title">My Daily Medication Schedule</h3>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => onNavigateTab('medications')}>
                Manage Medications
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {patientRecord.medications.active.map(med => (
                <div key={med.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>
                      {med.drugName} <span style={{ color: '#0284c7', fontSize: '0.82rem' }}>{med.dosage}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                      {med.frequency} ({med.route}) • Refills: <strong>{med.refillsRemaining}</strong>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      For: {med.purpose}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ background: '#16a34a', color: '#ffffff', border: 'none', fontSize: '0.78rem' }}
                      onClick={() => handleTakeMed(med.drugName)}
                    >
                      <CheckCircle size={14} style={{ display: 'inline', marginRight: 4 }} /> Take Now
                    </button>
                    <button
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: '0.78rem' }}
                      onClick={() => handleRefill(med.id, med.drugName)}
                    >
                      Refill
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Verified Diagnostic Results */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={18} color="#0284c7" />
                <h3 className="dash-card-title">Recent Test Results</h3>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => onNavigateTab('results')}>
                All Reports ({patientRecord.labAndImagingReports.length})
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {patientRecord.labAndImagingReports.slice(0, 2).map(rep => (
                <div key={rep.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', background: '#f8fafc' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>{rep.testName}</span>
                    <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: 700 }}>
                      ✓ {rep.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#475569' }}>
                    {rep.findings || 'All metabolic analytes within normal range. Fasting glucose 94 mg/dL.'}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
