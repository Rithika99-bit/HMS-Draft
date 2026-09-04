import React, { useState } from 'react';
import { useOt } from '../../context/OtContext';
import {
  Calendar, Clock, Users, Activity, CheckCircle,
  AlertTriangle, Plus, Search, Eye, Filter, DollarSign, Package, UserCheck, Shield
} from 'lucide-react';

export default function OtAdminModule({ onShowToast }) {
  const {
    otSuites, surgicalCases, otInvoices, otImplants,
    scheduleSurgeryCase, updateCaseStatus, recordImplantUsage
  } = useOt();

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'calendar' | 'scheduling' | 'teams' | 'implants' | 'billing'
  const [scheduleModalCase, setScheduleModalCase] = useState(null);
  const [scheduleForm, setScheduleForm] = useState({
    scheduledOtRoom: 'OT Suite A (Cardiothoracic & Vascular)',
    scheduledDate: 'Today, 02:00 PM',
    primarySurgeon: 'Dr. Sarah Mitchell, MD',
    assistantSurgeon: 'Dr. James Vance, MD',
    anaesthetist: 'Dr. Robert Chen, MD (Consultant Anaesthesiologist)',
    scrubNurse: 'Sister Sarah Connor, RN',
    circulatingNurse: 'Nurse Maya Patel, RN',
    otTechnician: 'Tech Alex Rivera'
  });

  const [implantModalCase, setImplantModalCase] = useState(null);
  const [implantForm, setImplantForm] = useState({
    implantId: 'IMP-CARD-002',
    serialLotNumber: 'LOT-2026-9954-MED',
    cost: 1450.00
  });

  // Metrics
  const totalCases = surgicalCases.length;
  const inOtCount = surgicalCases.filter(c => c.status.includes('In OT')).length;
  const scheduledCount = surgicalCases.filter(c => c.status.includes('Scheduled')).length;
  const pacuCount = surgicalCases.filter(c => c.status.includes('PACU')).length;
  const totalBilling = otInvoices.reduce((sum, inv) => sum + (inv.totalPrice || 0), 0);

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!scheduleModalCase) return;
    scheduleSurgeryCase(
      scheduleModalCase.caseId,
      scheduleForm.scheduledOtRoom,
      scheduleForm.scheduledDate,
      {
        primarySurgeon: scheduleForm.primarySurgeon,
        assistantSurgeon: scheduleForm.assistantSurgeon,
        anaesthetist: scheduleForm.anaesthetist,
        scrubNurse: scheduleForm.scrubNurse,
        circulatingNurse: scheduleForm.circulatingNurse,
        otTechnician: scheduleForm.otTechnician
      },
      'OT Admin'
    );
    if (onShowToast) onShowToast(`Scheduled OT Suite for ${scheduleModalCase.patientName}!`, 'success');
    setScheduleModalCase(null);
  };

  const handleRecordImplant = (e) => {
    e.preventDefault();
    if (!implantModalCase) return;
    recordImplantUsage(
      implantModalCase.caseId,
      implantForm.implantId,
      implantForm.serialLotNumber,
      parseFloat(implantForm.cost),
      'OT Admin'
    );
    if (onShowToast) onShowToast(`Implant serial/lot #${implantForm.serialLotNumber} recorded! Stock deducted.`, 'success');
    setImplantModalCase(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
      <div className="dash-card" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={24} color="#7dd3fc" />
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>Operation Theatre (OT) Operations & Room Control</h2>
            </div>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem', color: '#e0f2fe' }}>
              Manage OT room availability, surgery slot allocation, surgical team rosters, implant deduction, and OT billing.
            </p>
          </div>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700 }}>
            Active Cases: {totalCases} ({inOtCount} In OT)
          </span>
        </div>

        {/* Navigation Subnav */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '14px', flexWrap: 'wrap' }}>
          {[
            { id: 'dashboard', label: 'OT Operations Dashboard', icon: Activity },
            { id: 'calendar', label: 'OT Room Availability & Calendar', icon: Calendar },
            { id: 'scheduling', label: 'Surgery Slot & Room Scheduling', icon: Clock },
            { id: 'teams', label: 'Surgical Team Roster', icon: Users },
            { id: 'implants', label: 'Consumables & Implant Issuance', icon: Package },
            { id: 'billing', label: 'OT Billing & Invoices', icon: DollarSign }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                background: active ? '#ffffff' : 'rgba(255,255,255,0.15)',
                color: active ? '#0369a1' : '#ffffff',
                border: 'none', padding: '8px 16px', borderRadius: '8px',
                fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s'
              }}>
                <Icon size={15} /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 1. OPERATIONS DASHBOARD ────────────────────────────────────────── */}
      {activeTab === 'dashboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* KPI Counters */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div className="dash-card" style={{ borderLeft: '4px solid #0284c7' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Today's Total Surgeries</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>{totalCases}</div>
              <div style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 600 }}>Scheduled across all suites</div>
            </div>

            <div className="dash-card" style={{ borderLeft: '4px solid #dc2626' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Active In-OT Cases</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#dc2626', margin: '4px 0' }}>{inOtCount}</div>
              <div style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 600 }}>Currently undergoing surgery</div>
            </div>

            <div className="dash-card" style={{ borderLeft: '4px solid #d97706' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Scheduled (Pre-Op Clearance)</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#d97706', margin: '4px 0' }}>{scheduledCount}</div>
              <div style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 600 }}>Awaiting PAC / Consent</div>
            </div>

            <div className="dash-card" style={{ borderLeft: '4px solid #16a34a' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>In PACU Recovery</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#16a34a', margin: '4px 0' }}>{pacuCount}</div>
              <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>Monitored in recovery bay</div>
            </div>

            <div className="dash-card" style={{ borderLeft: '4px solid #7c3aed' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>OT Utilization Rate</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#7c3aed', margin: '4px 0' }}>86.4%</div>
              <div style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: 600 }}>Capacity optimal</div>
            </div>
          </div>

          {/* Workflow Tracking Table */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div>
                <h3 className="dash-card-title">Live Operation Theatre Workflow Monitor</h3>
                <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  Track patient surgical progression from Pre-Op Clearance → Active OT → PACU Recovery → Ward Transfer.
                </div>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Case ID / Priority</th>
                    <th>Patient</th>
                    <th>Procedure</th>
                    <th>OT Suite</th>
                    <th>Surgeon / Anaesthetist</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {surgicalCases.map(c => (
                    <tr key={c.caseId}>
                      <td>
                        <div style={{ fontWeight: 800, color: '#0f172a' }}>{c.caseId}</div>
                        <span style={{
                          background: c.priority === 'Urgent' ? '#fee2e2' : '#f1f5f9',
                          color: c.priority === 'Urgent' ? '#dc2626' : '#475569',
                          padding: '1px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800
                        }}>
                          {c.priority}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: '#0284c7' }}>{c.patientName}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{c.patientUhid} ({c.patientAge}y/{c.patientGender})</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{c.procedureName}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Category: {c.category}</div>
                      </td>
                      <td style={{ fontSize: '0.78rem', color: '#334155', fontWeight: 600 }}>{c.scheduledOtRoom}</td>
                      <td>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>{c.surgicalTeam.primarySurgeon}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{c.surgicalTeam.anaesthetist}</div>
                      </td>
                      <td>
                        <span style={{
                          background: c.status.includes('Completed') ? '#dcfce7' : c.status.includes('In OT') ? '#fee2e2' : '#fef3c7',
                          color: c.status.includes('Completed') ? '#15803d' : c.status.includes('In OT') ? '#dc2626' : '#d97706',
                          padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800
                        }}>
                          {c.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button className="btn btn-primary btn-sm" onClick={() => setScheduleModalCase(c)} style={{ padding: '4px 8px', fontSize: '0.72rem' }}>
                            Schedule / Team
                          </button>
                          <button className="btn btn-outline btn-sm" onClick={() => setImplantModalCase(c)} style={{ padding: '4px 8px', fontSize: '0.72rem' }}>
                            Implant Lot #
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── 2. OT ROOM AVAILABILITY & CALENDAR ──────────────────────────────── */}
      {activeTab === 'calendar' && (
        <div className="dash-card">
          <h3 className="dash-card-title" style={{ marginBottom: '12px' }}>OT Suite Availability & Room Grid</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {otSuites.map(suite => {
              const activeCase = surgicalCases.find(c => c.scheduledOtRoom.includes(suite.otId) || c.scheduledOtRoom.includes(suite.name.split(' ')[0]));
              return (
                <div key={suite.otId} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#f8fafc' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{suite.name}</span>
                    <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>
                      {suite.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 700 }}>{suite.category}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Hours: {suite.operatingHours} • Rate: ${suite.hourlyRate}/hr</div>

                  <div style={{ marginTop: '12px', background: activeCase ? '#fff5f5' : '#f0fdf4', border: activeCase ? '1px solid #fca5a5' : '1px solid #bbf7d0', padding: '10px', borderRadius: '8px' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.78rem', color: activeCase ? '#dc2626' : '#16a34a' }}>
                      {activeCase ? `🚨 Active Case: ${activeCase.caseId} (${activeCase.procedureName})` : '✓ Room Available for Booking'}
                    </div>
                    {activeCase && (
                      <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '4px' }}>
                        Surgeon: {activeCase.surgicalTeam.primarySurgeon} • Patient: {activeCase.patientName}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 3. SURGERY SLOT & ROOM SCHEDULING ───────────────────────────────── */}
      {activeTab === 'scheduling' && (
        <div className="dash-card">
          <h3 className="dash-card-title" style={{ marginBottom: '14px' }}>Surgery Slot Allocation & Requisition Approval</h3>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Patient Name</th>
                <th>Procedure</th>
                <th>Requested Date</th>
                <th>Assigned OT Suite</th>
                <th>Clearance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {surgicalCases.map(c => (
                <tr key={c.caseId}>
                  <td style={{ fontWeight: 800, color: '#0f172a' }}>{c.caseId}</td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0284c7' }}>{c.patientName}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{c.patientUhid}</div>
                  </td>
                  <td style={{ fontWeight: 700, fontSize: '0.85rem' }}>{c.procedureName}</td>
                  <td style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>{c.scheduledDate}</td>
                  <td style={{ fontSize: '0.78rem', color: '#334155' }}>{c.scheduledOtRoom}</td>
                  <td>
                    <span style={{
                      background: c.preopClearance.consentSigned ? '#dcfce7' : '#fef3c7',
                      color: c.preopClearance.consentSigned ? '#15803d' : '#d97706',
                      padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800
                    }}>
                      {c.preopClearance.consentSigned ? '✓ Cleared' : 'Pending Consent'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-primary btn-sm" onClick={() => setScheduleModalCase(c)} style={{ fontSize: '0.75rem' }}>
                      Re-assign Room/Slot
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── 4. SURGICAL TEAM ROSTER ────────────────────────────────────────── */}
      {activeTab === 'teams' && (
        <div className="dash-card">
          <h3 className="dash-card-title" style={{ marginBottom: '14px' }}>Active Surgical Team Allocations</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {surgicalCases.map(c => (
              <div key={c.caseId} style={{ border: '1px solid #cbd5e1', borderRadius: '10px', padding: '14px', background: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>{c.caseId} — {c.procedureName}</span>
                    <div style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 700 }}>Patient: {c.patientName} | OT: {c.scheduledOtRoom}</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>PRIMARY SURGEON</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>{c.surgicalTeam.primarySurgeon}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>ASSISTANT SURGEON</div>
                    <div style={{ fontSize: '0.82rem', color: '#334155' }}>{c.surgicalTeam.assistantSurgeon}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>ANAESTHETIST</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#059669' }}>{c.surgicalTeam.anaesthetist}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>SCRUB NURSE</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#e11d48' }}>{c.surgicalTeam.scrubNurse}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 5. CONSUMABLES & IMPLANT ISSUANCE ──────────────────────────────── */}
      {activeTab === 'implants' && (
        <div className="dash-card">
          <h3 className="dash-card-title" style={{ marginBottom: '14px' }}>Recorded Surgical Implants & Lot Number Verification</h3>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Patient Name</th>
                <th>Implant Name</th>
                <th>Serial / Lot Number</th>
                <th>Unit Cost ($)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {surgicalCases.map(c => (
                <React.Fragment key={c.caseId}>
                  {c.implantsUsed.map((imp, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 800, color: '#0f172a' }}>{c.caseId}</td>
                      <td style={{ fontWeight: 700, color: '#0284c7' }}>{c.patientName}</td>
                      <td style={{ fontWeight: 700 }}>{imp.name}</td>
                      <td>
                        <span style={{ background: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, fontFamily: 'monospace' }}>
                          {imp.serialLotNumber}
                        </span>
                      </td>
                      <td style={{ fontWeight: 800, color: '#16a34a' }}>${imp.cost.toFixed(2)}</td>
                      <td>
                        <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>✓ Stock Deducted</span>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── 6. OT BILLING & INVOICES ────────────────────────────────────────── */}
      {activeTab === 'billing' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h3 className="dash-card-title">Itemized OT Billing & Surgery Charges</h3>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                Itemized breakdown: Procedure fee + OT room rate + Anaesthesia fee + Surgeon charges + Implant charges.
              </div>
            </div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#16a34a' }}>
              Total OT Billed: ${totalBilling.toFixed(2)}
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Invoice ID / Date</th>
                  <th>Patient Name</th>
                  <th>Procedure Fee</th>
                  <th>OT Suite Fee</th>
                  <th>Anaesthesia Fee</th>
                  <th>Implant Cost</th>
                  <th>Gross Total ($)</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {otInvoices.map(inv => (
                  <tr key={inv.invoiceId}>
                    <td>
                      <div style={{ fontWeight: 800, color: '#0f172a' }}>{inv.invoiceId}</div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{inv.date}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0284c7' }}>{inv.patientName}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{inv.patientUhid}</div>
                    </td>
                    <td>${inv.procedureCost.toFixed(2)}</td>
                    <td>${inv.otRoomFee.toFixed(2)}</td>
                    <td>${inv.anaesthesiaFee.toFixed(2)}</td>
                    <td style={{ color: '#d97706', fontWeight: 700 }}>${inv.implantCost.toFixed(2)}</td>
                    <td style={{ fontWeight: 800, color: '#16a34a', fontSize: '0.9rem' }}>${inv.totalPrice.toFixed(2)}</td>
                    <td>
                      <span style={{
                        background: inv.status === 'Paid' ? '#dcfce7' : '#fef3c7',
                        color: inv.status === 'Paid' ? '#15803d' : '#d97706',
                        padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800
                      }}>
                        {inv.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {scheduleModalCase && (
        <div className="modal-overlay" style={{ zIndex: 1200 }}>
          <div className="modal-content-card" style={{ maxWidth: '540px', width: '92%' }}>
            <h3 style={{ margin: '0 0 10px 0', fontWeight: 800, color: '#0f172a' }}>
              Schedule OT Suite & Surgical Team
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '14px' }}>
              Scheduling <strong>{scheduleModalCase.procedureName}</strong> for <strong>{scheduleModalCase.patientName}</strong>
            </p>
            <form onSubmit={handleScheduleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label className="form-label">Assign OT Suite</label>
                <select className="form-input" value={scheduleForm.scheduledOtRoom} onChange={e => setScheduleForm({ ...scheduleForm, scheduledOtRoom: e.target.value })}>
                  {otSuites.map(s => <option key={s.otId} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Scheduled Date & Start Time</label>
                <input type="text" className="form-input" value={scheduleForm.scheduledDate}
                  onChange={e => setScheduleForm({ ...scheduleForm, scheduledDate: e.target.value })} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label className="form-label">Primary Surgeon</label>
                  <input type="text" className="form-input" value={scheduleForm.primarySurgeon}
                    onChange={e => setScheduleForm({ ...scheduleForm, primarySurgeon: e.target.value })} required />
                </div>
                <div>
                  <label className="form-label">Anaesthetist</label>
                  <input type="text" className="form-input" value={scheduleForm.anaesthetist}
                    onChange={e => setScheduleForm({ ...scheduleForm, anaesthetist: e.target.value })} required />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setScheduleModalCase(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Confirm OT Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Implant Modal */}
      {implantModalCase && (
        <div className="modal-overlay" style={{ zIndex: 1200 }}>
          <div className="modal-content-card" style={{ maxWidth: '480px', width: '90%' }}>
            <h3 style={{ margin: '0 0 10px 0', fontWeight: 800, color: '#0f172a' }}>
              Record Surgical Implant Lot / Serial #
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '14px' }}>
              Case: <strong>{implantModalCase.caseId}</strong> — Patient: <strong>{implantModalCase.patientName}</strong>
            </p>
            <form onSubmit={handleRecordImplant} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label className="form-label">Select Implant Item</label>
                <select className="form-input" value={implantForm.implantId} onChange={e => {
                  const imp = otImplants.find(i => i.implantId === e.target.value);
                  setImplantForm({ ...implantForm, implantId: e.target.value, cost: imp ? imp.unitCost : 1000 });
                }}>
                  {otImplants.map(i => <option key={i.implantId} value={i.implantId}>{i.name} (${i.unitCost})</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Manufacturer Serial / Lot Number</label>
                <input type="text" className="form-input" value={implantForm.serialLotNumber}
                  onChange={e => setImplantForm({ ...implantForm, serialLotNumber: e.target.value })} placeholder="LOT-2026-XXXX" required />
              </div>
              <div>
                <label className="form-label">Implant Unit Cost ($)</label>
                <input type="number" className="form-input" value={implantForm.cost}
                  onChange={e => setImplantForm({ ...implantForm, cost: e.target.value })} required />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setImplantModalCase(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Record Implant & Deduct Stock</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
