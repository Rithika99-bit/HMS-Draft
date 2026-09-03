import React, { useState } from 'react';
import {
  bedStatusTypes,
  hospitalWards,
  activeInpatients
} from '../../data/ipdManagementData';
import {
  Bed, ShieldCheck, UserCheck, Stethoscope, 
  Activity, FileText, Pill, Utensils, History, 
  Clock, CheckCircle, AlertTriangle, ArrowRightLeft, 
  UserPlus, Search, X, Check, Printer, Download, 
  RefreshCw, Plus, HeartPulse, Sparkles, Filter,
  Building, LogOut, ChevronRight, Layers, Eye
} from 'lucide-react';

export default function SuperAdminIpdModule({ onShowToast }) {
  const [wards, setWards] = useState(hospitalWards);
  const [inpatients, setInpatients] = useState(activeInpatients);
  const [selectedPatientId, setSelectedPatientId] = useState('IPD-9408'); // Default to Sarah Connor
  const [ipdSubTab, setIpdSubTab] = useState('bed-board'); // 'bed-board' | 'patient-file' | 'admissions' | 'discharge-billing'
  const [clinicalTab, setClinicalTab] = useState('vitals'); // 'vitals' | 'rounds' | 'nursing' | 'mar' | 'investigations' | 'surgery' | 'diet' | 'soap' | 'discharge-summary' | 'final-billing'

  // Bed Filter
  const [selectedWardFilter, setSelectedWardFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');

  // Bed Transfer Modal
  const [transferModalBed, setTransferModalBed] = useState(null);
  const [transferTargetWard, setTransferTargetWard] = useState('WARD-SURG');
  const [transferTargetBed, setTransferTargetBed] = useState('BED-204');
  const [transferReason, setTransferReason] = useState('Clinical Step-Down Transfer');

  // New Admission Modal
  const [showAdmitModal, setShowAdmitModal] = useState(false);
  const [admitForm, setAdmitForm] = useState({
    patientName: '',
    uhid: '',
    age: '',
    gender: 'Female',
    wardId: 'WARD-MED',
    bedId: 'MED-103',
    doctor: 'Dr. Sarah Mitchell, MD',
    diagnosis: '',
    type: 'Elective Inpatient'
  });

  // Selected Patient Record
  const selectedPatient = inpatients.find(p => p.ipdId === selectedPatientId) || inpatients[0];

  // Calculate Bed Totals across all 6 statuses
  const bedCounts = bedStatusTypes.reduce((acc, status) => {
    let count = 0;
    wards.forEach(w => {
      w.beds.forEach(b => {
        if (b.status === status.id) count++;
      });
    });
    acc[status.id] = count;
    return acc;
  }, {});

  const totalHospitalBeds = wards.reduce((acc, w) => acc + w.beds.length, 0);

  // 1. Bed Status Changer
  const handleBedStatusChange = (wardId, bedId, newStatus) => {
    setWards(prev => prev.map(w => {
      if (w.id === wardId) {
        return {
          ...w,
          beds: w.beds.map(b => {
            if (b.id === bedId) {
              return { ...b, status: newStatus };
            }
            return b;
          })
        };
      }
      return w;
    }));
    if (onShowToast) onShowToast(`Bed ${bedId} status updated to ${newStatus}`, 'info');
  };

  // 2. Execute Bed Transfer
  const executeBedTransfer = () => {
    if (!transferModalBed) return;

    // Find source bed
    const sourceBedId = transferModalBed.id;
    const patientName = transferModalBed.patientName;

    setWards(prev => prev.map(w => {
      return {
        ...w,
        beds: w.beds.map(b => {
          if (b.id === sourceBedId) {
            // Free up old bed and set to cleaning
            return {
              ...b,
              status: 'Cleaning',
              patientName: 'Discharged / Transferred (Cleaning in progress)',
              uhid: '-',
              ipdId: '-'
            };
          }
          if (b.id === transferTargetBed) {
            // Allocate new bed
            return {
              ...b,
              status: 'Occupied',
              patientName: patientName,
              uhid: transferModalBed.uhid,
              ipdId: transferModalBed.ipdId,
              doctor: transferModalBed.doctor,
              admDate: 'Transferred Today'
            };
          }
          return b;
        })
      };
    }));

    // Update patient record
    setInpatients(prev => prev.map(p => {
      if (p.ipdId === transferModalBed.ipdId) {
        const targetWardObj = wards.find(w => w.id === transferTargetWard);
        return {
          ...p,
          ward: targetWardObj ? targetWardObj.name : p.ward,
          wardId: transferTargetWard,
          bedNumber: transferTargetBed
        };
      }
      return p;
    }));

    if (onShowToast) onShowToast(`Successfully transferred ${patientName} to ${transferTargetBed}!`, 'success');
    setTransferModalBed(null);
  };

  // 3. New Inpatient Admission Submit
  const handleAdmitSubmit = (e) => {
    e.preventDefault();
    if (!admitForm.patientName) return;

    const newIpdId = `IPD-94${Math.floor(Math.random() * 80 + 20)}`;
    const newUhid = admitForm.uhid || `UHID-MED-2026-0${Math.floor(Math.random() * 8000 + 1000)}`;
    const targetWard = wards.find(w => w.id === admitForm.wardId);

    // Update bed status to Occupied
    setWards(prev => prev.map(w => {
      if (w.id === admitForm.wardId) {
        return {
          ...w,
          beds: w.beds.map(b => {
            if (b.id === admitForm.bedId) {
              return {
                ...b,
                status: 'Occupied',
                patientName: admitForm.patientName,
                uhid: newUhid,
                ipdId: newIpdId,
                doctor: admitForm.doctor,
                admDate: 'Today'
              };
            }
            return b;
          })
        };
      }
      return w;
    }));

    // Add to inpatients array
    const newInpatient = {
      ipdId: newIpdId,
      uhid: newUhid,
      patientName: admitForm.patientName,
      age: parseInt(admitForm.age) || 40,
      gender: admitForm.gender,
      bloodGroup: 'B+',
      allergies: 'None Known',
      ward: targetWard ? targetWard.name : 'Medical Ward',
      wardId: admitForm.wardId,
      bedNumber: admitForm.bedId,
      admissionDate: 'Today, 10:00 AM',
      admissionType: admitForm.type,
      admittingDiagnosis: admitForm.diagnosis || 'Acute Inpatient Observation',
      primaryConsultant: admitForm.doctor,
      coConsultants: ['Dr. Alex Rivera, MD'],
      dutyResident: 'Dr. Kevin Zhao, MD',
      assignedNurse: 'Nurse Staff On Duty',
      lengthOfStay: '1 Day',
      acuityLevel: 'Standard Inpatient Care',
      vitals: [
        { time: 'Admit', bp: '122/80 mmHg', hr: '74 bpm', temp: '98.6 °F', spo2: '99%', rr: '16 /min', pain: '0/10', loggedBy: 'Triage Nurse' }
      ],
      doctorRounds: [
        { id: 'RND-NEW', time: 'Admit Round', doctor: admitForm.doctor, notes: 'Initial admission assessment completed.', recommendation: 'Start protocol investigations.' }
      ],
      nursingCare: {
        plan: 'Standard adult inpatient care protocol.',
        shiftHandover: 'Admitted from OPD, settled in bed.',
        fallRiskScore: 'Low',
        ivAccess: 'IV Saline Lock In Situ'
      },
      medicationsMAR: [],
      investigations: [],
      proceduresAndSurgery: { scheduled: 'None' },
      dietaryOrders: { dietType: 'Regular Inpatient Diet' },
      progressNotesSOAP: { subjective: 'Patient admitted stable.', objective: 'Vitals stable.', assessment: 'Under observation.', plan: 'Routine care.' },
      dischargePlanning: { checklist: [], estimatedDischarge: 'In 2 Days' },
      dischargeSummary: { finalDiagnosis: admitForm.diagnosis, hospitalCourse: 'Admitted stable.' },
      finalBilling: { grossTotal: 450.00, insuranceStatus: 'Pending Submission' }
    };

    setInpatients([newInpatient, ...inpatients]);
    setSelectedPatientId(newIpdId);
    setShowAdmitModal(false);

    if (onShowToast) onShowToast(`Patient ${admitForm.patientName} admitted to ${admitForm.bedId}! IPD: ${newIpdId}`, 'success');
  };

  return (
    <div className="superadmin-ipd-container">
      {/* ── 1. REAL-TIME BED OCCUPANCY & STATUS KPI STRIP ───────────────── */}
      <div className="ipd-kpi-banner">
        <div className="ipd-kpi-main">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="ipd-icon-circle">
              <Bed size={22} color="#0284c7" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Hospital Inpatient Bed Matrix & ADT Command Center
                </h3>
                <span className="live-pill">Live Telemetry</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '2px 0 0' }}>
                Total Hospital Capacity: <strong>{totalHospitalBeds} Beds</strong> across 4 Clinical Wards • All 6 statuses tracked in real-time
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setShowAdmitModal(true)}
            >
              <UserPlus size={14} /> New IPD Admission
            </button>
          </div>
        </div>

        {/* 6 Mandatory Bed Status KPI Pills */}
        <div className="bed-status-pills-row">
          {bedStatusTypes.map(status => (
            <div 
              key={status.id}
              className={`bed-kpi-pill ${selectedStatusFilter === status.id ? 'active' : ''}`}
              style={{ borderColor: status.color }}
              onClick={() => setSelectedStatusFilter(selectedStatusFilter === status.id ? 'all' : status.id)}
            >
              <div className="kpi-indicator-dot" style={{ background: status.color }} />
              <div>
                <span className="kpi-status-lbl">{status.label}</span>
                <span className="kpi-status-val" style={{ color: status.color }}>
                  {bedCounts[status.id] || 0} Beds
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. SUB-NAV VIEW SWITCHER ───────────────────────────────────── */}
      <div className="admin-subnav-tabs">
        <button 
          className={`admin-sub-btn ${ipdSubTab === 'bed-board' ? 'active' : ''}`}
          onClick={() => setIpdSubTab('bed-board')}
        >
          <Layers size={15} />
          <span>Wards & Bed Matrix ({totalHospitalBeds} Beds)</span>
        </button>

        <button 
          className={`admin-sub-btn ${ipdSubTab === 'patient-file' ? 'active' : ''}`}
          onClick={() => setIpdSubTab('patient-file')}
        >
          <Stethoscope size={15} />
          <span>Inpatient Clinical Encounter File ({selectedPatient.patientName})</span>
        </button>

        <button 
          className={`admin-sub-btn ${ipdSubTab === 'admissions' ? 'active' : ''}`}
          onClick={() => setIpdSubTab('admissions')}
        >
          <Building size={15} />
          <span>Active Inpatient Admissions ({inpatients.length})</span>
        </button>
      </div>

      {/* ── VIEW 1: WARDS & BED MATRIX BOARD ───────────────────────────── */}
      {ipdSubTab === 'bed-board' && (
        <div className="superadmin-card">
          <div className="table-controls-bar">
            {/* Ward Filter */}
            <div className="filter-pill-group">
              <span className="filter-lbl">Ward:</span>
              <button 
                className={`filter-btn ${selectedWardFilter === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedWardFilter('all')}
              >
                All Wards
              </button>
              {wards.map(w => (
                <button
                  key={w.id}
                  className={`filter-btn ${selectedWardFilter === w.id ? 'active' : ''}`}
                  onClick={() => setSelectedWardFilter(w.id)}
                >
                  {w.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Status Filter Reset */}
            {selectedStatusFilter !== 'all' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Showing status: <strong>{selectedStatusFilter}</strong>
                </span>
                <button 
                  className="btn btn-outline btn-sm"
                  style={{ padding: '2px 8px', fontSize: '0.72rem' }}
                  onClick={() => setSelectedStatusFilter('all')}
                >
                  Clear Filter
                </button>
              </div>
            )}
          </div>

          {/* Wards Render */}
          <div className="wards-stack">
            {wards
              .filter(w => selectedWardFilter === 'all' || w.id === selectedWardFilter)
              .map(ward => {
                const filteredBeds = ward.beds.filter(b => selectedStatusFilter === 'all' || b.status === selectedStatusFilter);
                if (filteredBeds.length === 0) return null;

                return (
                  <div key={ward.id} className="ward-section-card">
                    <div className="ward-card-header">
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                            {ward.name}
                          </h4>
                          <span className="ward-floor-tag">{ward.floor}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '3px' }}>
                          Nurse-in-Charge: <strong>{ward.nurseInCharge}</strong> • Total Beds: {ward.totalBeds}
                        </div>
                      </div>

                      <div style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 700 }}>
                        {ward.beds.filter(b => b.status === 'Available').length} Available • {ward.beds.filter(b => b.status === 'Occupied').length} Occupied
                      </div>
                    </div>

                    {/* Bed Grid */}
                    <div className="beds-grid">
                      {filteredBeds.map(bed => {
                        const statusConfig = bedStatusTypes.find(s => s.id === bed.status) || bedStatusTypes[0];
                        const isOccupied = bed.status === 'Occupied';

                        return (
                          <div 
                            key={bed.id} 
                            className={`bed-tile-card status-${bed.status.toLowerCase()}`}
                            style={{ borderTopColor: statusConfig.color }}
                          >
                            <div className="bed-tile-top">
                              <div>
                                <span className="bed-id-text">{bed.id}</span>
                                <span className="bed-type-text">{bed.type}</span>
                              </div>

                              <span 
                                className="bed-status-badge"
                                style={{ background: statusConfig.bg, color: statusConfig.color }}
                              >
                                {bed.status}
                              </span>
                            </div>

                            <div className="bed-tile-body">
                              {isOccupied ? (
                                <>
                                  <div className="bed-patient-name">{bed.patientName}</div>
                                  <div className="bed-meta-row">UHID: {bed.uhid}</div>
                                  <div className="bed-meta-row">Dr: {bed.doctor}</div>
                                  <div className="bed-meta-row" style={{ color: '#0284c7', fontWeight: 700 }}>
                                    {bed.o2Support}
                                  </div>
                                </>
                              ) : (
                                <div className="bed-empty-state">
                                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                                    {bed.patientName !== '-' ? bed.patientName : statusConfig.desc}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Bed Actions */}
                            <div className="bed-tile-footer">
                              {isOccupied ? (
                                <>
                                  <button 
                                    className="btn btn-secondary btn-sm bed-btn"
                                    onClick={() => {
                                      setSelectedPatientId(bed.ipdId);
                                      setIpdSubTab('patient-file');
                                    }}
                                    title="Open clinical inpatient chart"
                                  >
                                    <Eye size={12} /> Chart
                                  </button>
                                  <button 
                                    className="btn btn-outline btn-sm bed-btn"
                                    onClick={() => setTransferModalBed({ ...bed, wardId: ward.id })}
                                    title="Transfer patient to another bed"
                                  >
                                    <ArrowRightLeft size={12} /> Transfer
                                  </button>
                                </>
                              ) : (
                                <select 
                                  className="bed-status-changer-select"
                                  value={bed.status}
                                  onChange={e => handleBedStatusChange(ward.id, bed.id, e.target.value)}
                                >
                                  {bedStatusTypes.map(s => (
                                    <option key={s.id} value={s.id}>{s.label}</option>
                                  ))}
                                </select>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* ── VIEW 2: CLINICAL INPATIENT ENCOUNTER FILE ──────────────────── */}
      {ipdSubTab === 'patient-file' && (
        <div className="superadmin-card">
          {/* Inpatient Banner */}
          <div className="inpatient-header-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div className="inpatient-avatar-box">
                <HeartPulse size={24} color="#0284c7" />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {selectedPatient.patientName}
                  </h3>
                  <span className="ipd-id-pill">{selectedPatient.ipdId}</span>
                  <span className="uhid-pill">{selectedPatient.uhid}</span>
                  <span className="blood-group-tag">{selectedPatient.bloodGroup}</span>
                </div>

                <div className="inpatient-strip">
                  <span><strong>Age:</strong> {selectedPatient.age}y</span>
                  <span className="sep">•</span>
                  <span><strong>Gender:</strong> {selectedPatient.gender}</span>
                  <span className="sep">•</span>
                  <span><strong>Ward:</strong> {selectedPatient.ward}</span>
                  <span className="sep">•</span>
                  <span><strong>Bed:</strong> <strong style={{ color: '#0284c7' }}>{selectedPatient.bedNumber}</strong></span>
                  <span className="sep">•</span>
                  <span><strong>Admit:</strong> {selectedPatient.admissionDate}</span>
                  <span className="sep">•</span>
                  <span><strong>Consultant:</strong> {selectedPatient.primaryConsultant}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <select 
                className="filter-select"
                value={selectedPatientId}
                onChange={e => setSelectedPatientId(e.target.value)}
              >
                {inpatients.map(p => (
                  <option key={p.ipdId} value={p.ipdId}>{p.patientName} ({p.bedNumber})</option>
                ))}
              </select>

              <button 
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setClinicalTab('discharge-summary');
                  if (onShowToast) onShowToast('Switched to Discharge Summary module.', 'info');
                }}
              >
                <FileText size={14} /> Discharge Summary
              </button>
            </div>
          </div>

          {/* Clinical Workspace Sub-Tabs */}
          <div className="clinical-tabs-bar">
            {[
              { id: 'vitals', label: 'Vitals & Charting', icon: Activity },
              { id: 'rounds', label: 'Doctor Rounds', icon: Stethoscope },
              { id: 'nursing', label: 'Nursing Care & Handover', icon: UserCheck },
              { id: 'mar', label: 'Medication Admin (MAR)', icon: Pill },
              { id: 'investigations', label: 'Investigations & Labs', icon: FileText },
              { id: 'surgery', label: 'Procedures & Surgery', icon: ShieldCheck },
              { id: 'diet', label: 'Dietary Orders', icon: Utensils },
              { id: 'soap', label: 'Progress Notes (SOAP)', icon: History },
              { id: 'discharge-planning', label: 'Discharge Planning', icon: CheckCircle },
              { id: 'discharge-summary', label: 'Discharge Summary', icon: FileText },
              { id: 'final-billing', label: 'Final Billing', icon: CreditCard }
            ].map(t => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  className={`clinical-tab-btn ${clinicalTab === t.id ? 'active' : ''}`}
                  onClick={() => setClinicalTab(t.id)}
                >
                  <Icon size={14} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* ── CLINICAL SUB-VIEWS ───────────────────────────────────── */}
          <div className="clinical-tab-content">
            
            {/* 1. VITALS */}
            {clinicalTab === 'vitals' && (
              <div>
                <div className="sub-header-row">
                  <h4 className="clinical-title">Inpatient Vitals Monitoring & Telemetry</h4>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => { if (onShowToast) onShowToast('New vitals telemetry point logged.', 'success'); }}
                  >
                    <Plus size={14} /> Log Vitals
                  </button>
                </div>

                <div className="pm-table-responsive">
                  <table className="pm-table">
                    <thead>
                      <tr>
                        <th>Time Recorded</th>
                        <th>Blood Pressure</th>
                        <th>Heart Rate</th>
                        <th>Temperature</th>
                        <th>Oxygen (SpO2)</th>
                        <th>Respiratory Rate</th>
                        <th>Pain Score</th>
                        <th>Logged By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPatient.vitals.map((v, i) => (
                        <tr key={i}>
                          <td><strong>{v.time}</strong></td>
                          <td style={{ color: '#0284c7', fontWeight: 800 }}>{v.bp}</td>
                          <td><strong>{v.hr}</strong></td>
                          <td>{v.temp}</td>
                          <td>
                            <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                              {v.spo2}
                            </span>
                          </td>
                          <td>{v.rr}</td>
                          <td>{v.pain}</td>
                          <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{v.loggedBy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2. DOCTOR ROUNDS */}
            {clinicalTab === 'rounds' && (
              <div>
                <div className="sub-header-row">
                  <h4 className="clinical-title">Doctor Rounds & Attending Physician Notes</h4>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => { if (onShowToast) onShowToast('Ward rounds note added to patient chart.', 'success'); }}
                  >
                    <Plus size={14} /> Add Ward Round Note
                  </button>
                </div>

                <div className="rounds-stack">
                  {selectedPatient.doctorRounds.map(rnd => (
                    <div key={rnd.id} className="round-entry-card">
                      <div className="round-header">
                        <div>
                          <strong style={{ fontSize: '0.98rem', color: '#0f172a' }}>{rnd.doctor}</strong>
                          <span style={{ fontSize: '0.8rem', color: '#64748b', marginLeft: '10px' }}>{rnd.time}</span>
                        </div>
                        <span className="round-id-badge">{rnd.id}</span>
                      </div>
                      <p style={{ fontSize: '0.86rem', color: '#334155', margin: '10px 0', lineHeight: 1.5 }}>
                        {rnd.notes}
                      </p>
                      <div className="round-recommendation-box">
                        <strong>Clinical Directive / Plan:</strong> {rnd.recommendation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. NURSING CARE */}
            {clinicalTab === 'nursing' && (
              <div>
                <h4 className="clinical-title">Nursing Care Plan & Shift Handover</h4>
                <div className="pm-grid-2">
                  <div className="nursing-box">
                    <h5 className="box-heading">Active Nursing Care Plan</h5>
                    <p style={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.5 }}>
                      {selectedPatient.nursingCare.plan}
                    </p>
                    <div style={{ marginTop: '12px', fontSize: '0.82rem', color: '#0284c7' }}>
                      Primary Nurse: <strong>{selectedPatient.assignedNurse}</strong>
                    </div>
                  </div>

                  <div className="nursing-box">
                    <h5 className="box-heading">Shift Handover & Patient Acuity</h5>
                    <p style={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.5 }}>
                      {selectedPatient.nursingCare.shiftHandover}
                    </p>
                    <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
                      <span className="acuity-pill">{selectedPatient.nursingCare.fallRiskScore}</span>
                      <span className="acuity-pill" style={{ background: '#f0fdf4', color: '#16a34a' }}>
                        {selectedPatient.nursingCare.ivAccess}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. MEDICATION ADMINISTRATION RECORD (MAR) */}
            {clinicalTab === 'mar' && (
              <div>
                <div className="sub-header-row">
                  <h4 className="clinical-title">Medication Administration Record (MAR)</h4>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => { if (onShowToast) onShowToast('Medication administered & logged into e-MAR.', 'success'); }}
                  >
                    <Check size={14} /> Administer Scheduled Dose
                  </button>
                </div>

                <div className="pm-table-responsive">
                  <table className="pm-table">
                    <thead>
                      <tr>
                        <th>Medication & Strength</th>
                        <th>Route</th>
                        <th>Schedule / Frequency</th>
                        <th>Status</th>
                        <th>Administered By</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPatient.medicationsMAR.map((m, i) => (
                        <tr key={i}>
                          <td><strong>{m.drug}</strong></td>
                          <td>{m.route}</td>
                          <td>{m.schedule}</td>
                          <td>
                            <span style={{ 
                              background: m.status.includes('Given') || m.status.includes('Flushed') ? '#dcfce7' : '#fef3c7',
                              color: m.status.includes('Given') || m.status.includes('Flushed') ? '#15803d' : '#b45309',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              fontSize: '0.74rem',
                              fontWeight: 700
                            }}>
                              {m.status}
                            </span>
                          </td>
                          <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{m.nurse}</td>
                          <td>
                            <button 
                              className="btn btn-outline btn-sm"
                              style={{ padding: '2px 8px', fontSize: '0.72rem' }}
                              onClick={() => { if (onShowToast) onShowToast(`Logged dose for ${m.drug}`, 'success'); }}
                            >
                              Sign MAR
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 5. INVESTIGATIONS */}
            {clinicalTab === 'investigations' && (
              <div>
                <div className="sub-header-row">
                  <h4 className="clinical-title">Inpatient Pathology & Diagnostic Imaging Orders</h4>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => { if (onShowToast) onShowToast('STAT lab requisition sent to central pathology.', 'info'); }}
                  >
                    <Plus size={14} /> Order STAT Test
                  </button>
                </div>

                <div className="pm-table-responsive">
                  <table className="pm-table">
                    <thead>
                      <tr>
                        <th>Investigation Ordered</th>
                        <th>Date Ordered</th>
                        <th>Diagnostic Status</th>
                        <th>Lab / Radiologist Result Findings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPatient.investigations.map((inv, i) => (
                        <tr key={i}>
                          <td><strong>{inv.testName}</strong></td>
                          <td>{inv.orderDate}</td>
                          <td>
                            <span style={{ 
                              background: inv.status.includes('Completed') ? '#dcfce7' : '#e0f2fe',
                              color: inv.status.includes('Completed') ? '#15803d' : '#0284c7',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              fontSize: '0.74rem',
                              fontWeight: 700
                            }}>
                              {inv.status}
                            </span>
                          </td>
                          <td style={{ fontSize: '0.84rem', color: '#334155' }}>{inv.result}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 6. PROCEDURES AND SURGERY */}
            {clinicalTab === 'surgery' && (
              <div>
                <h4 className="clinical-title">Surgical Suite & Operating Theater (OT) Management</h4>
                <div className="pm-grid-2">
                  <div className="nursing-box">
                    <h5 className="box-heading">Scheduled / Active Surgery</h5>
                    <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
                      {selectedPatient.proceduresAndSurgery.scheduled}
                    </p>
                    <div style={{ marginTop: '8px', fontSize: '0.82rem', color: '#64748b' }}>
                      Past Procedures: {selectedPatient.proceduresAndSurgery.pastInEncounter}
                    </div>
                  </div>

                  <div className="nursing-box">
                    <h5 className="box-heading">Pre-Operative Anesthesia & Clinical Clearance</h5>
                    <p style={{ fontSize: '0.86rem', color: '#15803d', fontWeight: 700 }}>
                      Status: {selectedPatient.proceduresAndSurgery.preOpClearance}
                    </p>
                    <div style={{ marginTop: '8px', fontSize: '0.82rem', color: '#64748b' }}>
                      NPO Guidelines, Surgical Consent, and Blood Cross-Match verified.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 7. DIETARY ORDERS */}
            {clinicalTab === 'diet' && (
              <div>
                <h4 className="clinical-title">Inpatient Nutrition & Dietary Orders</h4>
                <div className="diet-order-box">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <Utensils size={20} color="#0d9488" />
                    <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>
                      {selectedPatient.dietaryOrders.dietType}
                    </strong>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.5 }}>
                    <strong>Special Instructions:</strong> {selectedPatient.dietaryOrders.instructions}
                  </p>
                  <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#64748b', borderTop: '1px solid #e2e8f0', paddingTop: '8px' }}>
                    Dietitian: {selectedPatient.dietaryOrders.dietitianNotes}
                  </div>
                </div>
              </div>
            )}

            {/* 8. PROGRESS NOTES (SOAP) */}
            {clinicalTab === 'soap' && (
              <div>
                <div className="sub-header-row">
                  <h4 className="clinical-title">Multi-Disciplinary SOAP Progress Notes</h4>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => { if (onShowToast) onShowToast('New SOAP note appended to EHR trajectory.', 'success'); }}
                  >
                    <Plus size={14} /> Add SOAP Note
                  </button>
                </div>

                <div className="soap-notes-grid">
                  <div className="soap-card">
                    <span className="soap-tag">S — Subjective</span>
                    <p>{selectedPatient.progressNotesSOAP.subjective}</p>
                  </div>
                  <div className="soap-card">
                    <span className="soap-tag">O — Objective</span>
                    <p>{selectedPatient.progressNotesSOAP.objective}</p>
                  </div>
                  <div className="soap-card">
                    <span className="soap-tag">A — Assessment</span>
                    <p>{selectedPatient.progressNotesSOAP.assessment}</p>
                  </div>
                  <div className="soap-card">
                    <span className="soap-tag">P — Plan</span>
                    <p>{selectedPatient.progressNotesSOAP.plan}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 9. DISCHARGE PLANNING */}
            {clinicalTab === 'discharge-planning' && (
              <div>
                <h4 className="clinical-title">Inpatient Discharge Planning & Readiness Checklist</h4>
                <div className="pm-grid-2">
                  <div className="nursing-box">
                    <h5 className="box-heading">Discharge Readiness Checklist</h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                      {selectedPatient.dischargePlanning.checklist.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.84rem' }}>
                          <span style={{ 
                            width: '20px', height: '20px', borderRadius: '50%',
                            background: item.completed ? '#dcfce7' : '#fee2e2',
                            color: item.completed ? '#15803d' : '#dc2626',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.72rem', fontWeight: 800
                          }}>
                            {item.completed ? '✓' : '—'}
                          </span>
                          <span style={{ color: item.completed ? '#0f172a' : '#64748b' }}>
                            {item.task}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="nursing-box">
                    <h5 className="box-heading">Disposition & Target Timeline</h5>
                    <div style={{ fontSize: '0.86rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div>Estimated Discharge: <strong>{selectedPatient.dischargePlanning.estimatedDischarge}</strong></div>
                      <div>Discharge Disposition: <strong>{selectedPatient.dischargePlanning.dischargeDisposition}</strong></div>
                      <div>Transportation: Private vehicle arranged with family.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 10. DISCHARGE SUMMARY */}
            {clinicalTab === 'discharge-summary' && (
              <div className="discharge-summary-sheet">
                <div className="summary-header">
                  <div>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                      Official Inpatient Clinical Discharge Summary
                    </h4>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                      MediCare Central Multispeciality Hospital • IPD Encounter #{selectedPatient.ipdId}
                    </div>
                  </div>

                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      if (onShowToast) onShowToast('Discharge Summary dispatched to PDF print spooler.', 'success');
                      window.print();
                    }}
                  >
                    <Printer size={14} /> Print / Export PDF
                  </button>
                </div>

                <div className="summary-section">
                  <span className="sec-label">1. Final Discharge Diagnosis</span>
                  <div className="sec-content" style={{ fontWeight: 700, color: '#0f172a' }}>
                    {selectedPatient.dischargeSummary.finalDiagnosis}
                  </div>
                </div>

                <div className="summary-section">
                  <span className="sec-label">2. Hospital Course & Clinical Summary</span>
                  <div className="sec-content">
                    {selectedPatient.dischargeSummary.hospitalCourse}
                  </div>
                </div>

                <div className="summary-section">
                  <span className="sec-label">3. Take-Home Discharge Medications</span>
                  <div className="sec-content" style={{ color: '#0284c7', fontWeight: 700 }}>
                    {selectedPatient.dischargeSummary.dischargeMeds}
                  </div>
                </div>

                <div className="summary-section">
                  <span className="sec-label">4. Follow-up Instructions & Emergency Red Flags</span>
                  <div className="sec-content">
                    {selectedPatient.dischargeSummary.followUpInstructions}
                  </div>
                </div>

                <div className="summary-footer">
                  <div>Consultant Signature: <strong>{selectedPatient.primaryConsultant}</strong></div>
                  <div>Digitally Certified via Hospital EMR (NABH Accredited)</div>
                </div>
              </div>
            )}

            {/* 11. FINAL BILLING */}
            {clinicalTab === 'final-billing' && (
              <div>
                <div className="sub-header-row">
                  <h4 className="clinical-title">Consolidated Inpatient Hospital Bill & Insurance Clearance</h4>
                  <span style={{ fontSize: '0.8rem', background: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: '12px', fontWeight: 700 }}>
                    {selectedPatient.finalBilling.billingStatus}
                  </span>
                </div>

                <div className="pm-grid-2">
                  <div className="pm-info-table-box">
                    <table className="pm-meta-table">
                      <tbody>
                        <tr>
                          <td className="meta-lbl">Room & Nursing Tariff</td>
                          <td className="meta-val">${selectedPatient.finalBilling.roomCharges.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td className="meta-lbl">Doctor Rounds & Consultations</td>
                          <td className="meta-val">${selectedPatient.finalBilling.consultantRoundsFees.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td className="meta-lbl">Nursing & Special Care Fees</td>
                          <td className="meta-val">${selectedPatient.finalBilling.nursingAndCareTariffs.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td className="meta-lbl">Diagnostic Investigations (Labs + ECG)</td>
                          <td className="meta-val">${selectedPatient.finalBilling.investigationsAndDiagnostics.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td className="meta-lbl">Pharmacy & Consumables</td>
                          <td className="meta-val">${selectedPatient.finalBilling.pharmacyAndConsumables.toFixed(2)}</td>
                        </tr>
                        <tr style={{ background: '#f8fafc' }}>
                          <td className="meta-lbl" style={{ fontWeight: 800, color: '#0f172a' }}>Gross Inpatient Total</td>
                          <td className="meta-val" style={{ fontWeight: 900, color: '#0f172a', fontSize: '1.1rem' }}>
                            ${selectedPatient.finalBilling.grossTotal.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="billing-clearance-panel">
                    <h5 className="box-heading">Insurance TPA Cashless Clearance</h5>
                    <div style={{ fontSize: '0.85rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '8px', margin: '12px 0' }}>
                      <div>Claim Status: <strong style={{ color: '#15803d' }}>{selectedPatient.finalBilling.insuranceStatus}</strong></div>
                      <div>Amount Covered by Insurance: <strong>${selectedPatient.finalBilling.insuranceClaimed.toFixed(2)}</strong></div>
                      <div>Patient Co-Payment Due: <strong style={{ color: '#0284c7', fontSize: '1.1rem' }}>${selectedPatient.finalBilling.patientCoPay.toFixed(2)}</strong></div>
                    </div>

                    <button 
                      className="btn btn-primary btn-full"
                      onClick={() => { if (onShowToast) onShowToast('Discharge financial clearance granted. Gate pass issued.', 'success'); }}
                    >
                      Process Final Settlement & Discharge Clearance
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ── VIEW 3: ACTIVE INPATIENT DIRECTORY ─────────────────────────── */}
      {ipdSubTab === 'admissions' && (
        <div className="superadmin-card">
          <div className="pm-card-header">
            <div>
              <h3 className="pm-card-title">Current Hospital Inpatient Directory</h3>
              <p className="pm-card-subtitle">Active hospital admissions, assigned consultants, length of stay, and acuity status</p>
            </div>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setShowAdmitModal(true)}
            >
              <UserPlus size={14} /> Admit Patient
            </button>
          </div>

          <div className="pm-table-responsive">
            <table className="pm-table">
              <thead>
                <tr>
                  <th>IPD ID & Patient</th>
                  <th>Age/Gender</th>
                  <th>Ward & Bed #</th>
                  <th>Admit Date & LOS</th>
                  <th>Admitting Diagnosis</th>
                  <th>Attending Consultant</th>
                  <th>Acuity Status</th>
                  <th>Clinical Chart</th>
                </tr>
              </thead>
              <tbody>
                {inpatients.map(pat => (
                  <tr key={pat.ipdId}>
                    <td>
                      <div style={{ fontWeight: 800, color: '#0f172a' }}>{pat.patientName}</div>
                      <div style={{ fontSize: '0.74rem', color: '#0284c7' }}>{pat.ipdId} • {pat.uhid}</div>
                    </td>
                    <td>{pat.age}y • {pat.gender}</td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{pat.bedNumber}</div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{pat.ward}</div>
                    </td>
                    <td>
                      <div>{pat.admissionDate}</div>
                      <div style={{ fontSize: '0.76rem', color: '#16a34a', fontWeight: 700 }}>{pat.lengthOfStay}</div>
                    </td>
                    <td style={{ fontSize: '0.82rem', maxWidth: '200px' }}>{pat.admittingDiagnosis}</td>
                    <td style={{ fontSize: '0.82rem', color: '#0284c7', fontWeight: 600 }}>{pat.primaryConsultant}</td>
                    <td>
                      <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '3px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 700 }}>
                        {pat.acuityLevel}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-primary btn-sm"
                        style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                        onClick={() => {
                          setSelectedPatientId(pat.ipdId);
                          setIpdSubTab('patient-file');
                        }}
                      >
                        Open Chart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── MODAL: BED TRANSFER WORKFLOW ──────────────────────────────── */}
      {transferModalBed && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box" style={{ maxWidth: '480px' }}>
            <div className="admin-modal-header">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                Bed Transfer: {transferModalBed.patientName}
              </h3>
              <button 
                className="admin-modal-close" 
                onClick={() => setTransferModalBed(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '14px 0' }}>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '14px', fontSize: '0.84rem' }}>
                Current Location: <strong>{transferModalBed.id}</strong> ({transferModalBed.type})
              </div>

              <div className="admin-form-group">
                <label className="pm-form-label">Destination Ward</label>
                <select 
                  className="pm-input"
                  value={transferTargetWard}
                  onChange={e => setTransferTargetWard(e.target.value)}
                >
                  {wards.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
              </div>

              <div className="admin-form-group">
                <label className="pm-form-label">Destination Available Bed</label>
                <select 
                  className="pm-input"
                  value={transferTargetBed}
                  onChange={e => setTransferTargetBed(e.target.value)}
                >
                  <option value="BED-204">BED-204 (Surgical Ward B - Available)</option>
                  <option value="BED-205">BED-205 (Surgical Ward B - Available)</option>
                  <option value="MED-103">MED-103 (Medical Ward A - Available)</option>
                  <option value="MED-104">MED-104 (Medical Ward A - Available)</option>
                  <option value="SUITE-502">SUITE-502 (Deluxe Suite - Available)</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label className="pm-form-label">Clinical Transfer Reason</label>
                <select 
                  className="pm-input"
                  value={transferReason}
                  onChange={e => setTransferReason(e.target.value)}
                >
                  <option value="Clinical Step-Down Transfer">Clinical Step-Down Transfer (ICU to Ward)</option>
                  <option value="Acuity Escalation">Acuity Escalation (Ward to ICU)</option>
                  <option value="Patient Preference / Upgrade to Deluxe">Patient Upgrade to Private Suite</option>
                  <option value="Isolation Cohorting Protocol">Isolation Cohorting Protocol</option>
                </select>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button 
                type="button" 
                className="btn btn-outline btn-sm"
                onClick={() => setTransferModalBed(null)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary btn-sm"
                onClick={executeBedTransfer}
              >
                Confirm Bed Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: NEW IPD ADMISSION ──────────────────────────────────── */}
      {showAdmitModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <div className="admin-modal-header">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                Hospital Inpatient Admission (IPD)
              </h3>
              <button 
                className="admin-modal-close" 
                onClick={() => setShowAdmitModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAdmitSubmit}>
              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label className="pm-form-label">Patient Full Name</label>
                  <input 
                    type="text" 
                    className="pm-input" 
                    required
                    placeholder="e.g. Michael Chang"
                    value={admitForm.patientName}
                    onChange={e => setAdmitForm({ ...admitForm, patientName: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="pm-form-label">UHID (Optional)</label>
                  <input 
                    type="text" 
                    className="pm-input" 
                    placeholder="UHID-MED-2026-..."
                    value={admitForm.uhid}
                    onChange={e => setAdmitForm({ ...admitForm, uhid: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label className="pm-form-label">Age</label>
                  <input 
                    type="number" 
                    className="pm-input" 
                    placeholder="45"
                    value={admitForm.age}
                    onChange={e => setAdmitForm({ ...admitForm, age: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="pm-form-label">Gender</label>
                  <select 
                    className="pm-input"
                    value={admitForm.gender}
                    onChange={e => setAdmitForm({ ...admitForm, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label className="pm-form-label">Target Ward</label>
                  <select 
                    className="pm-input"
                    value={admitForm.wardId}
                    onChange={e => setAdmitForm({ ...admitForm, wardId: e.target.value })}
                  >
                    {wards.map(w => (
                      <option key={w.id} value={w.id}>{w.name}</option>
                    ))}
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="pm-form-label">Available Bed</label>
                  <select 
                    className="pm-input"
                    value={admitForm.bedId}
                    onChange={e => setAdmitForm({ ...admitForm, bedId: e.target.value })}
                  >
                    <option value="BED-204">BED-204 (Surgical Wing B)</option>
                    <option value="BED-205">BED-205 (Surgical Wing B)</option>
                    <option value="MED-103">MED-103 (Medical Ward A)</option>
                    <option value="MED-104">MED-104 (Medical Ward A)</option>
                    <option value="SUITE-502">SUITE-502 (Executive Deluxe Suite)</option>
                    <option value="ICU-05">ICU-05 (Intensive Care Unit)</option>
                  </select>
                </div>
              </div>

              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label className="pm-form-label">Attending Consultant</label>
                  <select 
                    className="pm-input"
                    value={admitForm.doctor}
                    onChange={e => setAdmitForm({ ...admitForm, doctor: e.target.value })}
                  >
                    <option value="Dr. Sarah Mitchell, MD">Dr. Sarah Mitchell, MD (Cardiology)</option>
                    <option value="Dr. Robert Miller, FACS">Dr. Robert Miller, FACS (Surgery)</option>
                    <option value="Dr. Alex Rivera, MD">Dr. Alex Rivera, MD (Pulmonology)</option>
                    <option value="Dr. Priya Patel, MD">Dr. Priya Patel, MD (Internal Med)</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="pm-form-label">Admission Category</label>
                  <select 
                    className="pm-input"
                    value={admitForm.type}
                    onChange={e => setAdmitForm({ ...admitForm, type: e.target.value })}
                  >
                    <option value="Elective Inpatient">Elective Inpatient</option>
                    <option value="Emergency Admission (STAT)">Emergency Admission (STAT)</option>
                    <option value="Daycare Surgical (ADT)">Daycare Surgical (ADT)</option>
                  </select>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="pm-form-label">Provisional / Admitting Diagnosis</label>
                <input 
                  type="text" 
                  className="pm-input" 
                  required
                  placeholder="e.g. Acute appendicitis, unstable angina, pneumonia"
                  value={admitForm.diagnosis}
                  onChange={e => setAdmitForm({ ...admitForm, diagnosis: e.target.value })}
                />
              </div>

              <div className="admin-modal-footer">
                <button 
                  type="button" 
                  className="btn btn-outline btn-sm"
                  onClick={() => setShowAdmitModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-sm"
                >
                  Confirm Inpatient Admission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
