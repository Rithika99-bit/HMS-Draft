import React, { useState } from 'react';
import {
  triageSeverityLevels,
  emergencyPatients
} from '../../data/emergencyData';
import {
  AlertTriangle, HeartPulse, Activity, UserPlus, 
  Stethoscope, Pill, ShieldAlert, Clock, ArrowRightLeft, 
  LogOut, FileText, CheckCircle, Ambulance, Volume2, 
  Printer, Download, Plus, Search, Eye, UserCheck, 
  X, AlertCircle, FileCheck, Check, PhoneCall
} from 'lucide-react';

export default function EmergencyModule({ role = 'admin', onShowToast }) {
  const [patients, setPatients] = useState(emergencyPatients);
  const [selectedErId, setSelectedErId] = useState('ER-2026-081'); // Default to Sarah Connor
  const [activeTab, setActiveTab] = useState('triage');
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // New ER Intake Form
  const [regForm, setRegForm] = useState({
    patientName: '',
    age: '',
    gender: 'Female',
    arrivalMode: 'Ambulance Call',
    complaint: '',
    triageLevel: 'ESI-2',
    bp: '120/80',
    hr: '88',
    spo2: '98'
  });

  const selectedPatient = patients.find(p => p.erId === selectedErId) || patients[0];

  // Role-Specific Navigation Tabs
  const adminTabs = [
    { id: 'registration', label: '1. Emergency Registration', icon: UserPlus },
    { id: 'triage', label: '2. Triage & Severity', icon: AlertTriangle, alert: true },
    { id: 'vitals', label: '3. Initial Assessment & Vitals', icon: Activity },
    { id: 'doctor-nurse', label: '4. ER Doctor & Nursing Mgt', icon: Stethoscope },
    { id: 'investigations-meds', label: '5. Investigations & Meds', icon: Pill },
    { id: 'procedures', label: '6. Procedures Management', icon: ShieldAlert },
    { id: 'observation', label: '7. Observation Management', icon: Clock },
    { id: 'transfer', label: '8. Admission / Transfer / Referral', icon: ArrowRightLeft },
    { id: 'discharge', label: '9. Discharge Management', icon: LogOut },
    { id: 'death-doc', label: '10. Death Documentation', icon: FileText, mlc: true }
  ];

  const doctorTabs = [
    { id: 'triage', label: '1. Triage & Severity Assessment', icon: AlertTriangle, alert: true },
    { id: 'vitals', label: '2. Initial Assessment & Vitals', icon: Activity },
    { id: 'clinical-assessment', label: '3. Emergency Clinical Assessment', icon: Stethoscope },
    { id: 'investigations-meds', label: '4. Investigations & Medication', icon: Pill },
    { id: 'procedures', label: '5. Procedures', icon: ShieldAlert },
    { id: 'observation', label: '6. Observation', icon: Clock },
    { id: 'transfer', label: '7. Admission / Transfer / Referral', icon: ArrowRightLeft },
    { id: 'discharge', label: '8. Discharge', icon: LogOut },
    { id: 'death-doc', label: '9. Death Documentation', icon: FileText, mlc: true }
  ];

  const patientTabs = [
    { id: 'registration', label: 'Visit Details & Token', icon: UserPlus },
    { id: 'triage', label: 'Triage & Severity (View)', icon: AlertTriangle },
    { id: 'vitals', label: 'Vitals & Triage Assessment', icon: Activity },
    { id: 'doctor-nurse', label: 'Doctor & Nursing Care Team', icon: Stethoscope },
    { id: 'investigations-meds', label: 'Investigation Reports & Meds', icon: Pill },
    { id: 'procedures', label: 'Emergency Procedures Done', icon: ShieldAlert },
    { id: 'observation', label: 'Observation Unit Details', icon: Clock },
    { id: 'transfer', label: 'Admission / Transfer Status', icon: ArrowRightLeft },
    { id: 'discharge', label: 'Discharge Summary & Paperwork', icon: LogOut },
    { id: 'death-doc', label: 'Certified Medical Documentation', icon: FileText }
  ];

  const currentTabs = role === 'admin' ? adminTabs : role === 'doctor' ? doctorTabs : patientTabs;

  // New Emergency Intake Handler
  const handleRegisterEmergency = (e) => {
    e.preventDefault();
    if (!regForm.patientName) return;

    const newErId = `ER-2026-0${Math.floor(Math.random() * 80 + 20)}`;
    const newPatient = {
      erId: newErId,
      token: `EM-${regForm.triageLevel.replace('ESI-', '')}-0${Math.floor(Math.random() * 9 + 1)}`,
      uhid: `UHID-MED-2026-0${Math.floor(Math.random() * 8000 + 1000)}`,
      patientName: regForm.patientName,
      age: parseInt(regForm.age) || 35,
      gender: regForm.gender,
      bloodGroup: 'Pending STAT Blood Bank Screen',
      arrivalTime: 'Just Now (STAT)',
      arrivalMode: regForm.arrivalMode,
      chiefComplaint: regForm.complaint || 'Acute Emergency Intake',
      triageLevel: regForm.triageLevel,
      triageColor: regForm.triageLevel === 'ESI-1' ? '#dc2626' : regForm.triageLevel === 'ESI-2' ? '#ea580c' : '#ca8a04',
      triageCategory: regForm.triageLevel === 'ESI-1' ? 'Resuscitation' : regForm.triageLevel === 'ESI-2' ? 'Emergent' : 'Urgent',
      traumaScore: 'GCS: 15/15',
      initialVitals: {
        bp: `${regForm.bp} mmHg`,
        hr: `${regForm.hr} bpm`,
        temp: '98.6 °F',
        spo2: `${regForm.spo2}%`,
        rr: '18 /min',
        bloodSugar: '110 mg/dL',
        painScore: '6/10',
        triageNurse: 'Triage Nurse On Duty'
      },
      attendingDoctor: 'Dr. Sarah Mitchell, MD (ER Lead)',
      consultantSpecialists: ['Dr. Alex Rivera, MD'],
      assignedERStaffNurse: 'Nurse Marcus Holloway, RN',
      resuscitationTeam: 'Trauma Rapid Response Team',
      statInvestigations: [],
      emergencyMedications: [],
      emergencyProcedures: [],
      observation: { bedId: 'ER-BAY-NEW', unit: 'ER Active Bay', durationInER: '10 Mins', reassessmentVitals: 'Monitoring', status: 'Under Initial Assessment' },
      disposition: { decision: 'Under Evaluation', destinationUnit: 'Pending', transitStatus: 'In ER', receivingDoctor: 'Dr. Mitchell', timeOfDecision: 'Pending' },
      discharge: { status: 'Under Active ER Care', summaryNotes: 'Admitted via Emergency.' },
      deathDocumentation: null
    };

    setPatients([newPatient, ...patients]);
    setSelectedErId(newErId);
    setShowRegisterModal(false);
    if (onShowToast) onShowToast(`Emergency Patient ${regForm.patientName} admitted into ${regForm.triageLevel} Trauma Bay!`, 'error');
  };

  return (
    <div className="emergency-module-container">
      {/* ── 1. EMERGENCY TOP BANNER ───────────────────────────────────── */}
      <div className="er-alert-strip">
        <div className="er-strip-left">
          <div className="er-pulse-badge">
            <Ambulance size={22} color="#dc2626" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                24/7 Emergency, Trauma & Critical Care Center
              </h3>
              <span className="er-live-tag">
                <span className="pulse-dot" style={{ background: '#dc2626' }}></span> LEVEL 1 TRAUMA ACTIVE
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '2px 0 0' }}>
              Role: <strong style={{ textTransform: 'capitalize', color: '#0284c7' }}>{role === 'admin' ? 'SuperAdmin / Operations' : role === 'doctor' ? 'Emergency Attending Physician' : 'Patient Portal'}</strong> • Rapid Response Team On Standby
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Patient Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>Case:</span>
            <select 
              className="filter-select"
              value={selectedErId}
              onChange={e => setSelectedErId(e.target.value)}
              style={{ fontWeight: 700 }}
            >
              {patients.map(p => (
                <option key={p.erId} value={p.erId}>
                  [{p.triageLevel}] {p.patientName} ({p.erId})
                </option>
              ))}
            </select>
          </div>

          {role === 'admin' && (
            <button 
              className="btn btn-primary btn-sm"
              style={{ background: '#dc2626', borderColor: '#dc2626' }}
              onClick={() => setShowRegisterModal(true)}
            >
              <Ambulance size={14} /> STAT Intake / Ambulance Registration
            </button>
          )}
        </div>
      </div>

      {/* ── 2. ACTIVE ENCOUNTER SUMMARY CARD ─────────────────────────── */}
      <div className="er-patient-summary-card" style={{ borderLeftColor: selectedPatient.triageColor }}>
        <div className="er-summary-main">
          <div className="er-token-badge" style={{ background: selectedPatient.triageColor }}>
            {selectedPatient.token}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                {selectedPatient.patientName}
              </h2>
              <span className="uhid-pill">{selectedPatient.uhid}</span>
              <span className="er-id-pill">{selectedPatient.erId}</span>
              <span 
                className="triage-level-pill"
                style={{ background: selectedPatient.triageColor, color: '#ffffff' }}
              >
                {selectedPatient.triageLevel} — {selectedPatient.triageCategory}
              </span>
            </div>

            <div className="er-demographics-strip">
              <span><strong>Age/Sex:</strong> {selectedPatient.age}y • {selectedPatient.gender}</span>
              <span className="sep">•</span>
              <span><strong>Blood Group:</strong> <strong style={{ color: '#dc2626' }}>{selectedPatient.bloodGroup}</strong></span>
              <span className="sep">•</span>
              <span><strong>Arrival:</strong> {selectedPatient.arrivalTime} via {selectedPatient.arrivalMode}</span>
              <span className="sep">•</span>
              <span><strong>Attending ER Doctor:</strong> {selectedPatient.attendingDoctor.split('(')[0]}</span>
            </div>

            <div className="er-complaint-box">
              <strong>Chief Emergency Complaint:</strong> {selectedPatient.chiefComplaint}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. ROLE SEPARATED MODULE NAVIGATION TABS ──────────────────── */}
      <div className="admin-subnav-tabs" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '6px' }}>
        {currentTabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`admin-sub-btn ${activeTab === tab.id ? 'active' : ''} ${tab.mlc ? 'mlc-btn' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── 4. MODULE CONTENT WORKSPACE ───────────────────────────────── */}
      <div className="er-content-card">

        {/* ══ MODULE 1: EMERGENCY REGISTRATION ══════════════════════════ */}
        {activeTab === 'registration' && (
          <div>
            <div className="sub-header-row">
              <h4 className="clinical-title">Emergency Intake & STAT Registration Details</h4>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => { if (onShowToast) onShowToast('Emergency wristband with barcode printed.', 'info'); }}
              >
                <Printer size={14} /> Print ER Wristband
              </button>
            </div>

            <div className="pm-grid-2">
              <div className="pm-info-table-box">
                <table className="pm-meta-table">
                  <tbody>
                    <tr>
                      <td className="meta-lbl">ER Encounter Token</td>
                      <td className="meta-val" style={{ color: '#dc2626', fontWeight: 900 }}>{selectedPatient.token}</td>
                    </tr>
                    <tr>
                      <td className="meta-lbl">Emergency File ID</td>
                      <td className="meta-val">{selectedPatient.erId}</td>
                    </tr>
                    <tr>
                      <td className="meta-lbl">Permanent UHID</td>
                      <td className="meta-val">{selectedPatient.uhid}</td>
                    </tr>
                    <tr>
                      <td className="meta-lbl">Arrival Timestamp</td>
                      <td className="meta-val">{selectedPatient.arrivalTime}</td>
                    </tr>
                    <tr>
                      <td className="meta-lbl">Arrival Transport Mode</td>
                      <td className="meta-val">{selectedPatient.arrivalMode}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="nursing-box">
                <h5 className="box-heading">Emergency Triage Tag & Biohazard Protocol</h5>
                <p style={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.5 }}>
                  Trauma activation initiated upon triage arrival. RFID wristband paired with bedside telemetry monitor. Emergency contact and legal decision-makers informed.
                </p>
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                  <span className="acuity-pill" style={{ background: '#fee2e2', color: '#dc2626' }}>Red Resuscitation Bay Assigned</span>
                  <span className="acuity-pill">Consent: Implied Emergency Care</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ MODULE 2: TRIAGE & SEVERITY ASSESSMENT ═════════════════════ */}
        {activeTab === 'triage' && (
          <div>
            <div className="sub-header-row">
              <h4 className="clinical-title">Emergency Severity Index (ESI) Triage Board</h4>
              <span style={{ fontSize: '0.82rem', background: selectedPatient.triageColor, color: '#ffffff', padding: '4px 12px', borderRadius: '12px', fontWeight: 800 }}>
                Current Acuity: {selectedPatient.triageLevel} ({selectedPatient.triageCategory})
              </span>
            </div>

            {/* Visual ESI Level Cards */}
            <div className="esi-levels-grid">
              {triageSeverityLevels.map(esi => (
                <div 
                  key={esi.level}
                  className={`esi-card ${selectedPatient.triageLevel === esi.level ? 'active-esi' : ''}`}
                  style={{ borderLeftColor: esi.color }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="esi-level-tag" style={{ color: esi.color }}>{esi.level}</span>
                    <span className="esi-wait-tag">{esi.maxWait}</span>
                  </div>
                  <strong style={{ fontSize: '0.9rem', color: '#0f172a', display: 'block', margin: '4px 0' }}>
                    {esi.name}
                  </strong>
                  <p style={{ fontSize: '0.76rem', color: '#64748b', lineHeight: 1.4, margin: 0 }}>
                    {esi.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ MODULE 3: INITIAL ASSESSMENT & VITALS ══════════════════════ */}
        {activeTab === 'vitals' && (
          <div>
            <div className="sub-header-row">
              <h4 className="clinical-title">Initial Triage Assessment & Rapid Trauma Telemetry</h4>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Assessed by: <strong>{selectedPatient.initialVitals.triageNurse}</strong></span>
            </div>

            <div className="er-vitals-grid">
              <div className="er-vital-box">
                <span className="lbl">Blood Pressure</span>
                <span className="val" style={{ color: '#dc2626' }}>{selectedPatient.initialVitals.bp}</span>
              </div>
              <div className="er-vital-box">
                <span className="lbl">Heart Rate</span>
                <span className="val">{selectedPatient.initialVitals.hr}</span>
              </div>
              <div className="er-vital-box">
                <span className="lbl">Oxygen Saturation</span>
                <span className="val" style={{ color: '#0284c7' }}>{selectedPatient.initialVitals.spo2}</span>
              </div>
              <div className="er-vital-box">
                <span className="lbl">Respiratory Rate</span>
                <span className="val">{selectedPatient.initialVitals.rr}</span>
              </div>
              <div className="er-vital-box">
                <span className="lbl">Body Temp</span>
                <span className="val">{selectedPatient.initialVitals.temp}</span>
              </div>
              <div className="er-vital-box">
                <span className="lbl">Pain Score / GCS</span>
                <span className="val" style={{ color: '#ea580c' }}>{selectedPatient.initialVitals.painScore}</span>
              </div>
            </div>
          </div>
        )}

        {/* ══ MODULE 4: EMERGENCY DOCTOR & NURSING MANAGEMENT ════════════ */}
        {activeTab === 'doctor-nurse' && (
          <div>
            <h4 className="clinical-title">Emergency Response Team & Assigned Clinicians</h4>
            <div className="pm-grid-2">
              <div className="nursing-box">
                <h5 className="box-heading">Attending Emergency Medical Officers</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem' }}>
                  <div>Lead Emergency Specialist: <strong>{selectedPatient.attendingDoctor}</strong></div>
                  <div>Assigned ER Resident: <strong>Dr. Kevin Zhao, MD</strong></div>
                  <div>Consulting Specialists: {selectedPatient.consultantSpecialists.join(', ') || 'None required'}</div>
                </div>
              </div>

              <div className="nursing-box">
                <h5 className="box-heading">Emergency Nursing & Trauma Team</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem' }}>
                  <div>Primary Trauma Nurse: <strong>{selectedPatient.assignedERStaffNurse}</strong></div>
                  <div>Rapid Response Activation: <strong style={{ color: '#dc2626' }}>{selectedPatient.resuscitationTeam}</strong></div>
                  <div>Airway Specialist: Respiratory Therapist On Standby</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ MODULE 5: INVESTIGATIONS & MEDICATION MANAGEMENT ═══════════ */}
        {activeTab === 'investigations-meds' && (
          <div>
            <h4 className="clinical-title">1. STAT Emergency Diagnostics & Point-of-Care Testing</h4>
            <div className="pm-table-responsive" style={{ marginBottom: '22px' }}>
              <table className="pm-table">
                <thead>
                  <tr>
                    <th>Investigation Ordered</th>
                    <th>Ordered Timestamp</th>
                    <th>STAT Findings & Values</th>
                    <th>Result Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPatient.statInvestigations.map((inv, idx) => (
                    <tr key={idx}>
                      <td><strong>{inv.test}</strong></td>
                      <td>{inv.time}</td>
                      <td style={{ color: '#0f172a', fontWeight: 600 }}>{inv.result}</td>
                      <td>
                        <span style={{ background: '#fee2e2', color: '#dc2626', padding: '2px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 700 }}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className="clinical-title">2. Emergency Resuscitation Medications Administered</h4>
            <div className="pm-table-responsive">
              <table className="pm-table">
                <thead>
                  <tr>
                    <th>Medication / Agent</th>
                    <th>Dosage & Route</th>
                    <th>Administered Time</th>
                    <th>Staff Nurse</th>
                    <th>Delivery Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPatient.emergencyMedications.map((med, idx) => (
                    <tr key={idx}>
                      <td><strong>{med.drug}</strong></td>
                      <td>{med.dose} ({med.route})</td>
                      <td>{med.time}</td>
                      <td>{med.nurse}</td>
                      <td>
                        <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 700 }}>
                          {med.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══ MODULE 6: PROCEDURES MANAGEMENT ════════════════════════════ */}
        {activeTab === 'procedures' && (
          <div>
            <h4 className="clinical-title">Emergency Bedside Procedures & Interventions Performed</h4>
            <div className="rounds-stack">
              {selectedPatient.emergencyProcedures.map((proc, idx) => (
                <div key={idx} className="round-entry-card">
                  <div className="round-header">
                    <div>
                      <strong style={{ fontSize: '1rem', color: '#0f172a' }}>{proc.procedure}</strong>
                      <span style={{ fontSize: '0.8rem', color: '#64748b', marginLeft: '12px' }}>Time: {proc.time}</span>
                    </div>
                    <span style={{ fontSize: '0.74rem', background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                      By: {proc.performedBy}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: '#334155', margin: '8px 0 0' }}>
                    <strong>Procedure Notes:</strong> {proc.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ MODULE 7: OBSERVATION MANAGEMENT ═══════════════════════════ */}
        {activeTab === 'observation' && (
          <div>
            <h4 className="clinical-title">Short Stay Emergency Observation Unit (SSU)</h4>
            <div className="pm-grid-2">
              <div className="nursing-box">
                <h5 className="box-heading">Observation Unit Allocation</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem' }}>
                  <div>Allocated Bay: <strong style={{ color: '#0284c7' }}>{selectedPatient.observation.bedId}</strong></div>
                  <div>Unit Description: {selectedPatient.observation.unit}</div>
                  <div>Length of Observation: <strong>{selectedPatient.observation.durationInER}</strong></div>
                </div>
              </div>

              <div className="nursing-box">
                <h5 className="box-heading">Hourly Re-Assessment Telemetry</h5>
                <p style={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.5 }}>
                  {selectedPatient.observation.reassessmentVitals}
                </p>
                <div style={{ marginTop: '10px', fontSize: '0.82rem', color: '#16a34a', fontWeight: 700 }}>
                  Clinical State: {selectedPatient.observation.status}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ MODULE 8: ADMISSION / TRANSFER / REFERRAL ══════════════════ */}
        {activeTab === 'transfer' && (
          <div>
            <h4 className="clinical-title">Emergency Disposition, Inpatient Admission & Transfers</h4>
            <div className="pm-grid-2">
              <div className="nursing-box">
                <h5 className="box-heading">Primary Disposition Decision</h5>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#dc2626', marginBottom: '8px' }}>
                  {selectedPatient.disposition.decision}
                </div>
                <div style={{ fontSize: '0.84rem', color: '#475569' }}>
                  Target Destination: <strong>{selectedPatient.disposition.destinationUnit}</strong>
                </div>
                <div style={{ fontSize: '0.84rem', color: '#475569', marginTop: '4px' }}>
                  Time of Decision: {selectedPatient.disposition.timeOfDecision}
                </div>
              </div>

              <div className="nursing-box">
                <h5 className="box-heading">Inter-Unit Transit Protocol</h5>
                <div style={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.5 }}>
                  Status: <strong>{selectedPatient.disposition.transitStatus}</strong>
                </div>
                <div style={{ marginTop: '10px', fontSize: '0.82rem', color: '#0284c7' }}>
                  Receiving Consultant: {selectedPatient.disposition.receivingDoctor}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ MODULE 9: DISCHARGE MANAGEMENT ════════════════════════════ */}
        {activeTab === 'discharge' && (
          <div>
            <h4 className="clinical-title">Emergency Department Discharge Papers & Instructions</h4>
            <div className="discharge-summary-sheet">
              <div className="summary-header">
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    Emergency Encounter Summary & Disposition Notice
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    ER Token: {selectedPatient.token} • Encounter #{selectedPatient.erId}
                  </div>
                </div>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    if (onShowToast) onShowToast('ER Discharge Paper exported to printer.', 'success');
                    window.print();
                  }}
                >
                  <Printer size={14} /> Print ER Discharge Paper
                </button>
              </div>

              <div className="summary-section">
                <span className="sec-label">Disposition Outcome</span>
                <div className="sec-content" style={{ fontWeight: 800, color: '#0f172a' }}>
                  {selectedPatient.discharge.status}
                </div>
              </div>

              <div className="summary-section">
                <span className="sec-label">Clinical Discharge & Return Precautions</span>
                <div className="sec-content">
                  {selectedPatient.discharge.summaryNotes}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ MODULE 10: DEATH DOCUMENTATION (WHERE APPLICABLE) ═════════ */}
        {activeTab === 'death-doc' && (
          <div>
            <div className="sub-header-row">
              <h4 className="clinical-title" style={{ color: '#dc2626' }}>
                Medico-Legal Death Documentation & Certification (Where Applicable)
              </h4>
              {selectedPatient.deathDocumentation && (
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    if (onShowToast) onShowToast('Death Certificate & MLC Handover dossier generated.', 'info');
                    window.print();
                  }}
                >
                  <Printer size={14} /> Print Death Certificate
                </button>
              )}
            </div>

            {selectedPatient.deathDocumentation ? (
              <div className="death-cert-sheet">
                <div className="death-cert-header">
                  <div style={{ textAlign: 'center', width: '100%' }}>
                    <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b', fontWeight: 800 }}>
                      Government Department of Health & Hospital Forensic Registry
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: '4px 0' }}>
                      Official Medical Certificate of Cause of Death (Form 4 / MLC)
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: '#dc2626', fontWeight: 700 }}>
                      Case Reference: {selectedPatient.deathDocumentation.medicoLegalCaseNo}
                    </div>
                  </div>
                </div>

                <div className="pm-table-responsive" style={{ margin: '18px 0' }}>
                  <table className="pm-table">
                    <tbody>
                      <tr>
                        <td className="meta-lbl">Deceased Patient</td>
                        <td className="meta-val"><strong>{selectedPatient.patientName}</strong> ({selectedPatient.age}y / {selectedPatient.gender})</td>
                      </tr>
                      <tr>
                        <td className="meta-lbl">Pronounced Date & Time</td>
                        <td className="meta-val" style={{ color: '#dc2626', fontWeight: 800 }}>
                          {selectedPatient.deathDocumentation.declaredTimeOfDeath}
                        </td>
                      </tr>
                      <tr>
                        <td className="meta-lbl">Immediate Cause of Death</td>
                        <td className="meta-val"><strong>{selectedPatient.deathDocumentation.immediateCauseOfDeath}</strong></td>
                      </tr>
                      <tr>
                        <td className="meta-lbl">Antecedent / Contributing Cause</td>
                        <td className="meta-val">{selectedPatient.deathDocumentation.antecedentCause}</td>
                      </tr>
                      <tr>
                        <td className="meta-lbl">Pronouncing Physician</td>
                        <td className="meta-val">{selectedPatient.deathDocumentation.pronouncingPhysician}</td>
                      </tr>
                      <tr>
                        <td className="meta-lbl">Witnessing Consultant</td>
                        <td className="meta-val">{selectedPatient.deathDocumentation.witnessingPhysician}</td>
                      </tr>
                      <tr>
                        <td className="meta-lbl">Police / Coroner Intimation</td>
                        <td className="meta-val">{selectedPatient.deathDocumentation.policeIntimationSent} ({selectedPatient.deathDocumentation.coronerNotified})</td>
                      </tr>
                      <tr>
                        <td className="meta-lbl">Mortuary Handover</td>
                        <td className="meta-val">{selectedPatient.deathDocumentation.mortuaryHandoverTime}</td>
                      </tr>
                      <tr>
                        <td className="meta-lbl">Personal Belongings & Effects</td>
                        <td className="meta-val">{selectedPatient.deathDocumentation.personalEffectsLogged}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="summary-footer">
                  <div>Signature of Medical Superintendent: _______________________</div>
                  <div>Forensic Seal Verified (HIPAA & Medico-Legal Compliant)</div>
                </div>
              </div>
            ) : (
              <div className="nursing-box" style={{ textAlign: 'center', padding: '36px' }}>
                <CheckCircle size={36} color="#16a34a" style={{ margin: '0 auto 10px' }} />
                <h5 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                  Patient is Alive & Under Clinical Care
                </h5>
                <p style={{ fontSize: '0.85rem', color: '#64748b', maxWidth: '420px', margin: '6px auto' }}>
                  Death documentation is strictly not applicable for {selectedPatient.patientName}. 
                  This module only activates when resuscitation fails or for Brought-in-Dead (BID) medico-legal cases.
                </p>
                <button 
                  className="btn btn-outline btn-sm"
                  style={{ marginTop: '12px' }}
                  onClick={() => setSelectedErId('ER-2026-074')} // Switch to John Doe case
                >
                  <Eye size={14} /> View Deceased Medico-Legal Sample Case (John Doe #4)
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ── MODAL: STAT EMERGENCY AMBULANCE INTAKE ─────────────────────── */}
      {showRegisterModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <div className="admin-modal-header">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#dc2626' }}>
                🚨 STAT Emergency Registration & Triage Intake
              </h3>
              <button 
                className="admin-modal-close" 
                onClick={() => setShowRegisterModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleRegisterEmergency}>
              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label className="pm-form-label">Patient Full Name</label>
                  <input 
                    type="text" 
                    className="pm-input" 
                    required
                    placeholder="e.g. Jonathan Wayne (or Unknown Trauma #5)"
                    value={regForm.patientName}
                    onChange={e => setRegForm({ ...regForm, patientName: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="pm-form-label">Age & Gender</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <input 
                      type="number" 
                      className="pm-input" 
                      placeholder="Age"
                      value={regForm.age}
                      onChange={e => setRegForm({ ...regForm, age: e.target.value })}
                    />
                    <select 
                      className="pm-input"
                      value={regForm.gender}
                      onChange={e => setRegForm({ ...regForm, gender: e.target.value })}
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label className="pm-form-label">Initial Triage Severity (ESI Level)</label>
                  <select 
                    className="pm-input"
                    value={regForm.triageLevel}
                    onChange={e => setRegForm({ ...regForm, triageLevel: e.target.value })}
                    style={{ fontWeight: 800, color: '#dc2626' }}
                  >
                    <option value="ESI-1">ESI-1 (Red - Resuscitation / Immediate)</option>
                    <option value="ESI-2">ESI-2 (Orange - Emergent / High Risk)</option>
                    <option value="ESI-3">ESI-3 (Yellow - Urgent / Multiple Resources)</option>
                    <option value="ESI-4">ESI-4 (Green - Less Urgent)</option>
                    <option value="ESI-5">ESI-5 (Blue - Non-Urgent)</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="pm-form-label">Arrival Mode</label>
                  <select 
                    className="pm-input"
                    value={regForm.arrivalMode}
                    onChange={e => setRegForm({ ...regForm, arrivalMode: e.target.value })}
                  >
                    <option value="Emergency Advanced Life Support (ALS) Ambulance">ALS Ambulance</option>
                    <option value="Basic Life Support (BLS) Ambulance">BLS Ambulance</option>
                    <option value="Walk-In Ambulatory">Walk-In Ambulatory</option>
                    <option value="Police Highway Patrol">Police Highway Patrol</option>
                  </select>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="pm-form-label">Chief Complaint & Onset</label>
                <input 
                  type="text" 
                  className="pm-input" 
                  required
                  placeholder="e.g. Sudden onset crushing chest pain, road traffic collision, acute dyspnea"
                  value={regForm.complaint}
                  onChange={e => setRegForm({ ...regForm, complaint: e.target.value })}
                />
              </div>

              <div className="admin-modal-footer">
                <button 
                  type="button" 
                  className="btn btn-outline btn-sm"
                  onClick={() => setShowRegisterModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-sm"
                  style={{ background: '#dc2626', borderColor: '#dc2626' }}
                >
                  Dispatch Trauma Team & Admit to Bay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
