import React, { useState } from 'react';
import { useEmr } from '../../context/EmrContext';
import ClinicalActionModals from './ClinicalActionModals';
import { 
  User, Shield, Phone, AlertTriangle, HeartPulse, 
  FileText, Pill, Calendar, Clock, Activity, 
  CreditCard, ShieldCheck, FileCheck, History, 
  Search, Copy, Check, Printer, Download, 
  ExternalLink, UserPlus, AlertCircle, Sparkles, 
  MapPin, Mail, Droplets, Scissors, Stethoscope,
  ChevronRight, RefreshCw, Eye, Lock, Plus, ArrowRight
} from 'lucide-react';

export default function DoctorPatientChart({ onShowToast }) {
  const { 
    patientRecord, 
    clinicalVersions, 
    auditLedger, 
    discontinueMedication, 
    signClinicalNote,
    acknowledgeResult 
  } = useEmr();

  const [activeTab, setActiveTab] = useState('summary');
  const [activeModal, setActiveModal] = useState(null); // 'diagnosis' | 'allergy' | 'medication' | 'vitals' | 'soap-note' | 'order-lab' | 'order-imaging' | 'procedure'
  const [copiedUhid, setCopiedUhid] = useState(false);
  const [discontinueTarget, setDiscontinueTarget] = useState(null);
  const [stopReason, setStopReason] = useState('');

  const copyUhid = () => {
    navigator.clipboard?.writeText(patientRecord.registration.uhid);
    setCopiedUhid(true);
    if (onShowToast) onShowToast(`UHID ${patientRecord.registration.uhid} copied to clipboard!`, 'info');
    setTimeout(() => setCopiedUhid(false), 2000);
  };

  const handleDiscontinue = (medId) => {
    if (!stopReason) {
      if (onShowToast) onShowToast('Please provide a clinical justification for discontinuing.', 'warning');
      return;
    }
    discontinueMedication(medId, stopReason, 'Dr. Sarah Mitchell, MD');
    if (onShowToast) onShowToast('Medication discontinued and logged to audit trail.', 'info');
    setDiscontinueTarget(null);
    setStopReason('');
  };

  const handleSignNote = (noteId) => {
    signClinicalNote(noteId, 'Dr. Sarah Mitchell, MD');
    if (onShowToast) onShowToast(`Clinical Note ${noteId} cryptographically signed & locked!`, 'success');
  };

  const tabs = [
    { id: 'summary', label: 'Patient Summary', icon: User },
    { id: 'diagnoses', label: 'Diagnoses (ICD-10)', icon: Stethoscope, count: patientRecord.history.chronicConditions.length },
    { id: 'allergies', label: 'Allergies & Blood Group', icon: AlertTriangle, count: patientRecord.allergiesAndBlood.allergies.length, alert: true },
    { id: 'medications', label: 'Medications & E-Rx', icon: Pill, count: patientRecord.medications.active.length },
    { id: 'vitals', label: 'Vitals & Biometrics', icon: Activity },
    { id: 'clinical-notes', label: 'Clinical Notes (SOAP)', icon: FileText, count: patientRecord.clinicalNotes.length },
    { id: 'labs', label: 'Laboratory Results', icon: Droplets, count: patientRecord.labAndImagingReports.filter(r => r.modality.includes('Lab') || r.modality.includes('Bio')).length },
    { id: 'imaging', label: 'Imaging & PACS', icon: HeartPulse, count: patientRecord.labAndImagingReports.filter(r => !r.modality.includes('Lab') && !r.modality.includes('Bio')).length },
    { id: 'procedures', label: 'Procedures & Surgeries', icon: Scissors, count: patientRecord.history.surgicalHistory.length },
    { id: 'discharge-summaries', label: 'Discharge Summaries (ADT)', icon: FileCheck, count: patientRecord.admissionsAndDischarges.length },
    { id: 'consents', label: 'Consents & Documents', icon: ShieldCheck, count: patientRecord.documentsAndConsent.length },
    { id: 'version-history', label: 'Version History & Audit', icon: History, count: clinicalVersions.length }
  ];

  return (
    <div className="patient-master-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* ─── ACTION MODALS ─────────────────────────────────────────── */}
      <ClinicalActionModals 
        modalType={activeModal}
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        onShowToast={onShowToast}
        author="Dr. Sarah Mitchell, MD"
      />

      {/* ─── 1. COMPREHENSIVE PATIENT HEADER BANNER ──────────────────── */}
      <div className="patient-banner-card" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="patient-banner-main" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div className="patient-avatar-box" style={{ position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300" 
              alt={patientRecord.demographics.fullName} 
              className="patient-banner-photo"
              style={{ width: '90px', height: '90px', borderRadius: '16px', border: '3px solid #38bdf8', objectFit: 'cover' }}
            />
            <span className="patient-status-indicator" style={{ position: 'absolute', bottom: 4, right: 4, width: '16px', height: '16px', background: '#10b981', border: '2px solid #0f172a', borderRadius: '50%' }} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
                {patientRecord.demographics.fullName}
              </h1>
              <button 
                onClick={copyUhid} 
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.4)', padding: '4px 10px', borderRadius: '8px', color: '#38bdf8', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                <span>{patientRecord.registration.uhid}</span>
                {copiedUhid ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
              </button>
              <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700 }}>
                ● Active Patient
              </span>
            </div>

            <div style={{ display: 'flex', gap: '18px', marginTop: '10px', fontSize: '0.85rem', color: '#cbd5e1', flexWrap: 'wrap' }}>
              <span><strong>Age/Sex:</strong> {patientRecord.demographics.age} yrs • {patientRecord.demographics.gender}</span>
              <span><strong>DOB:</strong> {patientRecord.demographics.dateOfBirth}</span>
              <span><strong>Blood Group:</strong> <span style={{ color: '#f87171', fontWeight: 700 }}>{patientRecord.allergiesAndBlood.bloodGroup}</span></span>
              <span><strong>Attending Doctor:</strong> {patientRecord.registration.assignedPrimaryCarePhysician}</span>
              <span><strong>Code Status:</strong> Full Code</span>
            </div>

            {/* Critical Allergies Ribbon */}
            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '6px 14px', borderRadius: '8px', width: 'fit-content' }}>
              <AlertTriangle size={16} color="#f87171" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fca5a5' }}>
                CRITICAL ALLERGIES ({patientRecord.allergiesAndBlood.allergies.length}):
              </span>
              <span style={{ fontSize: '0.8rem', color: '#fee2e2' }}>
                {patientRecord.allergiesAndBlood.allergies.map(a => `${a.allergen} (${a.severity})`).join(' • ')}
              </span>
            </div>
          </div>

          {/* Quick Doctor Action Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '180px' }}>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setActiveModal('soap-note')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.82rem' }}
            >
              <FileText size={15} /> Add SOAP Note
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setActiveModal('medication')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.82rem', background: '#10b981', color: '#ffffff', border: 'none' }}
            >
              <Pill size={15} /> Prescribe (E-Rx)
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setActiveModal('order-lab')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.82rem', background: '#0284c7', color: '#ffffff', border: 'none' }}
            >
              <Droplets size={15} /> Order Lab / Imaging
            </button>
          </div>
        </div>
      </div>

      {/* ─── 2. CHART SUBNAV TABS ───────────────────────────────────── */}
      <div className="admin-subnav-tabs" style={{ background: '#ffffff', padding: '6px 10px', overflowX: 'auto', flexWrap: 'nowrap' }}>
        {tabs.map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              className={`admin-sub-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
              style={{ whiteSpace: 'nowrap', fontSize: '0.82rem', padding: '8px 14px' }}
            >
              <Icon size={15} />
              <span>{t.label}</span>
              {t.count !== undefined && (
                <span style={{ marginLeft: '4px', background: isActive ? '#ffffff' : '#e2e8f0', color: isActive ? '#0284c7' : '#475569', padding: '1px 6px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: 700 }}>
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ─── 3. TAB CONTENT WORKSPACE ───────────────────────────────── */}

      {/* TAB 1: SUMMARY */}
      {activeTab === 'summary' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Active Problems / Diagnoses */}
            <div className="dash-card">
              <div className="dash-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Stethoscope size={18} color="#0284c7" />
                  <h3 className="dash-card-title">Active Clinical Diagnoses & Problems</h3>
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => setActiveModal('diagnosis')}>
                  <Plus size={14} /> Add Problem
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {patientRecord.history.chronicConditions.map((cond, idx) => (
                  <div key={idx} style={{ padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a' }}>
                        {cond.condition} <span style={{ color: '#0284c7', fontSize: '0.8rem', fontWeight: 600 }}>({cond.icdCode})</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                        Diagnosed: {cond.diagnosisDate} • Attending: {cond.attending}
                      </div>
                    </div>
                    <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {cond.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Medications List */}
            <div className="dash-card">
              <div className="dash-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Pill size={18} color="#16a34a" />
                  <h3 className="dash-card-title">Active Outpatient Regimen</h3>
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => setActiveModal('medication')}>
                  <Plus size={14} /> Prescribe New
                </button>
              </div>

              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Medication & Dose</th>
                    <th>Route & Frequency</th>
                    <th>Refills</th>
                    <th>Prescriber</th>
                  </tr>
                </thead>
                <tbody>
                  {patientRecord.medications.active.map(med => (
                    <tr key={med.id}>
                      <td style={{ fontWeight: 700, color: '#0f172a' }}>{med.drugName} {med.dosage}</td>
                      <td>{med.route} • {med.frequency}</td>
                      <td>
                        <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                          {med.refillsRemaining} Refills
                        </span>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{med.prescriber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Vitals & Recent Diagnostic Overview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Vitals Summary Card */}
            <div className="dash-card">
              <div className="dash-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={18} color="#0284c7" />
                  <h3 className="dash-card-title">Current Vital Signs</h3>
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => setActiveModal('vitals')}>
                  <Plus size={14} /> Record Vitals
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#0369a1', fontWeight: 700 }}>BLOOD PRESSURE</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0c4a6e' }}>
                    {patientRecord.latestVitals ? patientRecord.latestVitals.bp : '124/80 mm Hg'}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#0284c7' }}>Optimal / Controlled</div>
                </div>

                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#15803d', fontWeight: 700 }}>HEART RATE</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#14532d' }}>
                    {patientRecord.latestVitals ? patientRecord.latestVitals.heartRate : '72 BPM'}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#16a34a' }}>Regular Sinus Rhythm</div>
                </div>

                <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#7e22ce', fontWeight: 700 }}>SPO2 OXYGEN</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#581c87' }}>
                    {patientRecord.latestVitals ? patientRecord.latestVitals.spo2 : '99%'}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#9333ea' }}>Room Air</div>
                </div>

                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#b45309', fontWeight: 700 }}>BMI & MAP</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#78350f' }}>
                    {patientRecord.latestVitals ? `${patientRecord.latestVitals.bmi} • ${patientRecord.latestVitals.map}` : '22.4 • 95 mm Hg'}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#d97706' }}>Normal Body Mass</div>
                </div>
              </div>
            </div>

            {/* Latest Clinical Note Preview */}
            <div className="dash-card">
              <div className="dash-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={18} color="#8b5cf6" />
                  <h3 className="dash-card-title">Latest Encounter Note</h3>
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => setActiveTab('clinical-notes')}>
                  All Notes ({patientRecord.clinicalNotes.length})
                </button>
              </div>

              {patientRecord.clinicalNotes[0] && (
                <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e293b' }}>
                      {patientRecord.clinicalNotes[0].type}
                    </span>
                    <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: 700 }}>
                      ✓ {patientRecord.clinicalNotes[0].status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5, maxHeight: '90px', overflowY: 'hidden', textOverflow: 'ellipsis' }}>
                    {patientRecord.clinicalNotes[0].assessment}
                  </div>
                  <div style={{ marginTop: '10px', fontSize: '0.75rem', color: '#94a3b8' }}>
                    Author: {patientRecord.clinicalNotes[0].author} • {patientRecord.clinicalNotes[0].date}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: DIAGNOSES */}
      {activeTab === 'diagnoses' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">Chronic Conditions & Problem List (ICD-10)</h2>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Longitudinal problem registry with onset dates and attending physician</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setActiveModal('diagnosis')}>
              <Plus size={14} /> Add Diagnosis
            </button>
          </div>

          <table className="dash-table">
            <thead>
              <tr>
                <th>Condition & ICD-10</th>
                <th>Onset / Date</th>
                <th>Severity</th>
                <th>Attending Clinician</th>
                <th>Status</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {patientRecord.history.chronicConditions.map((cond, idx) => (
                <tr key={idx}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{cond.condition}</div>
                    <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {cond.icdCode}
                    </span>
                  </td>
                  <td>{cond.diagnosisDate}</td>
                  <td>
                    <span style={{ background: cond.severity === 'Severe' ? '#fee2e2' : '#fef3c7', color: cond.severity === 'Severe' ? '#dc2626' : '#d97706', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {cond.severity || 'Moderate'}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, color: '#475569' }}>{cond.attending}</td>
                  <td>
                    <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                      {cond.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{cond.notes || 'Documented in EHR'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: ALLERGIES */}
      {activeTab === 'allergies' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">Allergies, Adverse Reactions & Blood Group</h2>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Allergy warnings automatically check against prescribed medications</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setActiveModal('allergy')}>
              <Plus size={14} /> Add Allergy Alert
            </button>
          </div>

          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '14px', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Droplets size={20} color="#dc2626" />
              <div>
                <span style={{ fontWeight: 700, color: '#991b1b', fontSize: '0.92rem' }}>Blood Type: {patientRecord.allergiesAndBlood.bloodGroup}</span>
                <span style={{ fontSize: '0.8rem', color: '#7f1d1d', marginLeft: '12px' }}>{patientRecord.allergiesAndBlood.donorCompatibility}</span>
              </div>
            </div>
            <span style={{ fontSize: '0.78rem', background: '#ffffff', color: '#dc2626', padding: '4px 10px', borderRadius: '6px', fontWeight: 700 }}>
              Antibody Screen: Negative
            </span>
          </div>

          <table className="dash-table">
            <thead>
              <tr>
                <th>Allergen / Drug</th>
                <th>Category</th>
                <th>Severity</th>
                <th>Clinical Reaction Description</th>
                <th>Verified By</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {patientRecord.allergiesAndBlood.allergies.map(alg => (
                <tr key={alg.id}>
                  <td style={{ fontWeight: 800, color: '#991b1b' }}>{alg.allergen}</td>
                  <td>{alg.category}</td>
                  <td>
                    <span style={{ background: '#fee2e2', color: '#dc2626', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {alg.severity}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#334155' }}>{alg.reaction}</td>
                  <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{alg.verifiedBy} ({alg.diagnosedYear})</td>
                  <td>
                    <span style={{ background: '#fef3c7', color: '#d97706', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {alg.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: MEDICATIONS */}
      {activeTab === 'medications' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="dash-card">
            <div className="dash-card-header">
              <div>
                <h2 className="dash-card-title">Active Medications & E-Prescriptions</h2>
                <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Live active drug therapy with refill tracking & discontinuation logging</div>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setActiveModal('medication')}>
                <Plus size={14} /> Prescribe New Medication
              </button>
            </div>

            <table className="dash-table">
              <thead>
                <tr>
                  <th>Drug Name & Dose</th>
                  <th>Route & Frequency</th>
                  <th>Indication / Purpose</th>
                  <th>Prescriber</th>
                  <th>Refills</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {patientRecord.medications.active.map(med => (
                  <tr key={med.id}>
                    <td>
                      <div style={{ fontWeight: 800, color: '#0f172a' }}>{med.drugName}</div>
                      <div style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 600 }}>{med.dosage}</div>
                    </td>
                    <td>{med.route} • {med.frequency}</td>
                    <td>{med.purpose}</td>
                    <td style={{ fontSize: '0.8rem' }}>{med.prescriber}</td>
                    <td>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                        {med.refillsRemaining} Refills
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-outline btn-sm"
                        style={{ color: '#dc2626', borderColor: '#fca5a5', padding: '4px 8px', fontSize: '0.75rem' }}
                        onClick={() => setDiscontinueTarget(med)}
                      >
                        Discontinue
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Discontinue Modal Inline Form */}
            {discontinueTarget && (
              <div style={{ marginTop: '16px', background: '#fff1f2', border: '1px solid #fecdd3', padding: '14px', borderRadius: '8px' }}>
                <div style={{ fontWeight: 700, color: '#9f1239', marginBottom: '6px' }}>
                  Discontinue {discontinueTarget.drugName} {discontinueTarget.dosage}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter clinical justification (e.g. Adverse reaction, Reached therapy goal, Switched drug)..." 
                    value={stopReason}
                    onChange={e => setStopReason(e.target.value)}
                  />
                  <button className="btn btn-primary btn-sm" style={{ background: '#e11d48' }} onClick={() => handleDiscontinue(discontinueTarget.id)}>
                    Confirm Stop
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setDiscontinueTarget(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Past / Discontinued Medications */}
          <div className="dash-card">
            <h3 className="dash-card-title" style={{ marginBottom: '12px' }}>Past & Discontinued Medication History</h3>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Drug & Dosage</th>
                  <th>Discontinuation Reason</th>
                  <th>Date Stopped</th>
                </tr>
              </thead>
              <tbody>
                {patientRecord.medications.pastDiscontinued.map((dis, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700, color: '#64748b' }}>{dis.drugName} {dis.dosage}</td>
                    <td style={{ color: '#dc2626', fontSize: '0.85rem' }}>{dis.reason}</td>
                    <td style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{dis.stopDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: VITALS & BIOMETRICS */}
      {activeTab === 'vitals' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="dash-card">
            <div className="dash-card-header">
              <div>
                <h2 className="dash-card-title">Vitals Observation & Longitudinal Flowsheet</h2>
                <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Blood pressure, Heart Rate, SpO2, Temperature, Respiratory Rate, BMI, and Mean Arterial Pressure</div>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setActiveModal('vitals')}>
                <Plus size={14} /> Record New Vitals
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '20px' }}>
              <div style={{ padding: '14px', background: '#f0f9ff', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#0369a1', fontWeight: 700 }}>LATEST BP</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0c4a6e', marginTop: '4px' }}>124/80</div>
                <div style={{ fontSize: '0.72rem', color: '#0284c7' }}>mm Hg (Sitting)</div>
              </div>

              <div style={{ padding: '14px', background: '#f0fdf4', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 700 }}>HEART RATE</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#14532d', marginTop: '4px' }}>72</div>
                <div style={{ fontSize: '0.72rem', color: '#16a34a' }}>BPM (Regular)</div>
              </div>

              <div style={{ padding: '14px', background: '#faf5ff', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#7e22ce', fontWeight: 700 }}>SPO2 OXYGEN</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#581c87', marginTop: '4px' }}>99%</div>
                <div style={{ fontSize: '0.72rem', color: '#9333ea' }}>Room Air</div>
              </div>

              <div style={{ padding: '14px', background: '#fffbeb', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: 700 }}>BMI</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#78350f', marginTop: '4px' }}>22.4</div>
                <div style={{ fontSize: '0.72rem', color: '#d97706' }}>kg/m² (Normal)</div>
              </div>

              <div style={{ padding: '14px', background: '#fdf2f8', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#be185d', fontWeight: 700 }}>TEMPERATURE</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#831843', marginTop: '4px' }}>98.4°F</div>
                <div style={{ fontSize: '0.72rem', color: '#db2777' }}>Afebrile</div>
              </div>
            </div>

            <table className="dash-table">
              <thead>
                <tr>
                  <th>Encounter Date</th>
                  <th>Blood Pressure</th>
                  <th>Heart Rate</th>
                  <th>SpO2</th>
                  <th>BMI / Weight</th>
                  <th>Recorded By</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 700 }}>Today, 03 Sep 2026</td>
                  <td><span style={{ fontWeight: 700, color: '#0284c7' }}>124/80 mm Hg</span></td>
                  <td>72 BPM</td>
                  <td>99%</td>
                  <td>22.4 kg/m² (63 kg)</td>
                  <td>Dr. Sarah Mitchell, MD</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>12 Jun 2026</td>
                  <td>122/78 mm Hg</td>
                  <td>70 BPM</td>
                  <td>98%</td>
                  <td>22.2 kg/m² (62.5 kg)</td>
                  <td>Dr. Alex Rivera, MD</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>04 Jan 2026</td>
                  <td>124/80 mm Hg</td>
                  <td>74 BPM</td>
                  <td>99%</td>
                  <td>22.5 kg/m² (63.2 kg)</td>
                  <td>Dr. Emily Chen, MD</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: CLINICAL NOTES (SOAP) */}
      {activeTab === 'clinical-notes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="dash-card">
            <div className="dash-card-header">
              <div>
                <h2 className="dash-card-title">Clinical Progress & SOAP Notes</h2>
                <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Structured clinical encounters with cryptographic signature lock</div>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setActiveModal('soap-note')}>
                <Plus size={14} /> New SOAP Note
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {patientRecord.clinicalNotes.map(note => (
                <div key={note.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px', background: '#ffffff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px', marginBottom: '12px' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{note.type}</h3>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Author: <strong>{note.author}</strong> • {note.date}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {note.isSigned ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>
                          <Lock size={12} />
                          <span>Signed & Locked ({note.signatureHash?.substring(0, 14)}...)</span>
                        </div>
                      ) : (
                        <button className="btn btn-primary btn-sm" onClick={() => handleSignNote(note.id)}>
                          Sign & Finalize
                        </button>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', fontSize: '0.88rem' }}>
                    <div>
                      <strong style={{ color: '#0284c7' }}>[S] Subjective: </strong>
                      <span style={{ color: '#334155' }}>{note.subjective}</span>
                    </div>
                    <div>
                      <strong style={{ color: '#16a34a' }}>[O] Objective: </strong>
                      <span style={{ color: '#334155' }}>{note.objective}</span>
                    </div>
                    <div>
                      <strong style={{ color: '#d97706' }}>[A] Assessment: </strong>
                      <span style={{ color: '#334155', whiteSpace: 'pre-line' }}>{note.assessment}</span>
                    </div>
                    <div>
                      <strong style={{ color: '#7c3aed' }}>[P] Plan: </strong>
                      <span style={{ color: '#334155', whiteSpace: 'pre-line' }}>{note.plan}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: LABS */}
      {activeTab === 'labs' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">Laboratory Diagnostic Batteries & Historical Deltas</h2>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Clinical biochemistry, lipid profiles, hematology, and kidney function tests</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setActiveModal('order-lab')}>
              <Plus size={14} /> Order Diagnostic Lab
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {patientRecord.labAndImagingReports.filter(r => r.highlights).map(lab => (
              <div key={lab.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{lab.testName}</h3>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{lab.modality} • Specimen: {lab.specimen} • Date: {lab.date}</div>
                  </div>
                  <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {lab.status}
                  </span>
                </div>

                <table className="dash-table" style={{ background: '#f8fafc' }}>
                  <thead>
                    <tr>
                      <th>Analyte / Parameter</th>
                      <th>Observed Value</th>
                      <th>Reference Range</th>
                      <th>Flag / Interpretation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lab.highlights.map((param, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 700 }}>{param.parameter}</td>
                        <td style={{ fontWeight: 800, color: param.flag === 'Borderline' ? '#d97706' : '#0f172a' }}>{param.value}</td>
                        <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{param.reference}</td>
                        <td>
                          <span style={{ background: param.flag === 'Borderline' ? '#fef3c7' : '#dcfce7', color: param.flag === 'Borderline' ? '#d97706' : '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                            {param.flag}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: IMAGING & PACS */}
      {activeTab === 'imaging' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">Diagnostic Imaging & PACS DICOM Archives</h2>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Digital X-Rays, 12-Lead ECGs, Echocardiograms, CT & MRI reports</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setActiveModal('order-imaging')}>
              <Plus size={14} /> Order Imaging
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {patientRecord.labAndImagingReports.filter(r => !r.highlights).map(img => (
              <div key={img.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>{img.testName}</h3>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{img.modality} • {img.date}</div>
                  </div>
                  <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                    {img.status}
                  </span>
                </div>

                <div style={{ background: '#f1f5f9', borderRadius: '6px', padding: '10px', fontSize: '0.82rem', color: '#334155', lineHeight: 1.4, margin: '10px 0' }}>
                  <strong>Radiology Impressions:</strong> {img.findings}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#94a3b8' }}>
                  <span>Verified by: {img.labPathologist}</span>
                  <button className="btn btn-outline btn-sm" style={{ padding: '3px 8px', fontSize: '0.72rem' }}>
                    <Eye size={12} style={{ display: 'inline', marginRight: 4 }} /> View DICOM
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: PROCEDURES */}
      {activeTab === 'procedures' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">Surgical & Clinical Procedures History</h2>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Documented operative logs, implants, surgical indications, and postoperative recovery</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setActiveModal('procedure')}>
              <Plus size={14} /> Document Procedure
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {patientRecord.history.surgicalHistory.map((proc, idx) => (
              <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{proc.procedure}</h3>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Surgeon: <strong>{proc.surgeon}</strong> • Date: {proc.date} • {proc.hospital}</div>
                  </div>
                  <span style={{ background: '#fef3c7', color: '#d97706', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                    Completed
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem', marginTop: '10px' }}>
                  <div><strong>Indication:</strong> {proc.indication}</div>
                  <div><strong>Implants / Hardware:</strong> {proc.implants}</div>
                </div>
                <div style={{ marginTop: '6px', fontSize: '0.85rem', color: '#16a34a' }}>
                  <strong>Outcome:</strong> {proc.outcome}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 10: DISCHARGE SUMMARIES */}
      {activeTab === 'discharge-summaries' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">Admissions & Discharge Summaries (ADT)</h2>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Inpatient hospital course, discharge medication reconciliation, and post-discharge care instructions</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {patientRecord.admissionsAndDischarges.map((adm, idx) => (
              <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px', background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{adm.department}</h3>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Stay: {adm.admissionDate} → {adm.dischargeDate} ({adm.lengthOfStay}) • {adm.bedNumber}</div>
                  </div>
                  <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700 }}>
                    Discharged Stable
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.88rem' }}>
                  <div><strong>Admitting Diagnosis:</strong> {adm.admittingDiagnosis}</div>
                  <div><strong>Surgery Performed:</strong> {adm.surgeryPerformed}</div>
                  <div><strong>Discharge Medications:</strong> {adm.dischargeMedications}</div>
                  <div><strong>Discharge Advice:</strong> {adm.dischargeAdvice}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 11: CONSENTS & DOCUMENTS */}
      {activeTab === 'consents' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">Informed Consents & Legal Medical Authorizations</h2>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Digitally executed patient consents, HIPAA health information release, and advance directives</div>
            </div>
          </div>

          <table className="dash-table">
            <thead>
              <tr>
                <th>Document & Consent Title</th>
                <th>Category</th>
                <th>Signatory & Date</th>
                <th>Status</th>
                <th>Validity</th>
              </tr>
            </thead>
            <tbody>
              {patientRecord.documentsAndConsent.map(doc => (
                <tr key={doc.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{doc.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{doc.description}</div>
                  </td>
                  <td>{doc.category}</td>
                  <td style={{ fontSize: '0.82rem' }}>
                    <div><strong>{doc.signatory}</strong></div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{doc.signedDate}</div>
                  </td>
                  <td>
                    <span style={{ background: doc.status.includes('Revoked') ? '#fee2e2' : '#dcfce7', color: doc.status.includes('Revoked') ? '#dc2626' : '#15803d', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {doc.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#475569' }}>{doc.validity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 12: VERSION HISTORY & AUDIT */}
      {activeTab === 'version-history' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">Clinical Version History & Record Change Audit</h2>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Immutable ledger of every clinical edit, medication modification, and diagnosis update</div>
            </div>
            <span style={{ background: '#e0e7ff', color: '#4338ca', padding: '4px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700 }}>
              SHA-256 Verifiable
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {clinicalVersions.map(ver => (
              <div key={ver.versionId} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <span style={{ background: '#0284c7', color: '#ffffff', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, marginRight: '8px' }}>
                      {ver.versionId}
                    </span>
                    <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{ver.action} ({ver.category})</strong>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '3px' }}>
                      Modified by: <strong>{ver.author}</strong> ({ver.authorRole}) • Timestamp: {ver.timestamp}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                    Hash: {ver.auditHash}
                  </span>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '6px', padding: '10px', margin: '10px 0', fontSize: '0.82rem' }}>
                  <div style={{ color: '#dc2626' }}><strong>- Previous:</strong> {ver.previousValue}</div>
                  <div style={{ color: '#16a34a', marginTop: '4px' }}><strong>+ Current:</strong> {ver.newValue}</div>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                  <strong>Clinical Justification / Context:</strong> {ver.reason}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
