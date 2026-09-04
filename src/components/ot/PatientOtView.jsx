import React, { useState } from 'react';
import { useOt } from '../../context/OtContext';
import {
  Calendar, Clock, FileText, Eye, DollarSign, Bell, CheckCircle,
  Download, Info, CreditCard, ShieldCheck, Activity
} from 'lucide-react';

export default function PatientOtView({ onShowToast }) {
  const {
    surgicalCases, otInvoices, payOtInvoice
  } = useOt();

  const [activeTab, setActiveTab] = useState('schedule'); // 'schedule' | 'prep' | 'notes' | 'billing'
  const [selectedCaseId, setSelectedCaseId] = useState(surgicalCases[0]?.caseId || null);

  const selectedCase = surgicalCases.find(c => c.caseId === selectedCaseId) || surgicalCases[0];

  const handlePayInvoice = (invoiceId) => {
    payOtInvoice(invoiceId, 'Credit Card (Self-Service Portal)', 'Patient Portal');
    if (onShowToast) onShowToast(`OT Invoice ${invoiceId} co-pay paid successfully!`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Banner */}
      <div className="dash-card" style={{ background: 'linear-gradient(135deg, #0e7490 0%, #155e75 100%)', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={24} color="#a5f3fc" />
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>My Surgical Procedure & Operation Theatre Portal</h2>
            </div>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem', color: '#cffafe' }}>
              View surgery schedules, pre-op fasting guidelines, consent clearance, released surgical notes, implant cards, and OT billing.
            </p>
          </div>
        </div>

        {/* Subnav */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '14px', flexWrap: 'wrap' }}>
          {[
            { id: 'schedule', label: 'Surgery Schedule & Status', icon: Calendar },
            { id: 'prep', label: 'Pre-Op Fasting & Guidelines', icon: Info },
            { id: 'notes', label: 'Operative Notes & Implant Card', icon: FileText },
            { id: 'billing', label: 'OT Invoices & Co-Pay', icon: DollarSign }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                background: active ? '#ffffff' : 'rgba(255,255,255,0.15)',
                color: active ? '#155e75' : '#ffffff',
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

      {/* ── 1. SURGERY SCHEDULE & STATUS ──────────────────────────────────── */}
      {activeTab === 'schedule' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 className="dash-card-title" style={{ margin: 0 }}>My Scheduled Surgical Procedures</h3>
          
          {surgicalCases.map(c => (
            <div key={c.caseId} className="dash-card" style={{ borderLeft: '4px solid #0e7490' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span style={{ background: '#cffafe', color: '#0e7490', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                    {c.category}
                  </span>
                  <h4 style={{ margin: '6px 0 2px 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                    {c.procedureName}
                  </h4>
                  <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                    Primary Surgeon: <strong>{c.surgicalTeam.primarySurgeon}</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: '#16a34a', fontSize: '0.95rem' }}>
                    {c.scheduledDate}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                    {c.scheduledOtRoom}
                  </div>
                  <span style={{
                    display: 'inline-block', marginTop: '6px',
                    background: c.status.includes('Completed') ? '#dcfce7' : c.status.includes('In OT') ? '#fee2e2' : '#fef3c7',
                    color: c.status.includes('Completed') ? '#15803d' : c.status.includes('In OT') ? '#dc2626' : '#d97706',
                    padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800
                  }}>
                    {c.status}
                  </span>
                </div>
              </div>

              {/* Clearance Status */}
              <div style={{ marginTop: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ fontSize: '0.78rem', color: c.preopClearance.consentSigned ? '#16a34a' : '#d97706', fontWeight: 700 }}>
                  {c.preopClearance.consentSigned ? '✓ Surgical Consent Signed' : '⚠️ Consent Pending'}
                </div>
                <div style={{ fontSize: '0.78rem', color: c.preopClearance.anaesthesiaCleared ? '#16a34a' : '#d97706', fontWeight: 700 }}>
                  {c.preopClearance.anaesthesiaCleared ? '✓ Anaesthesia Clearance Done' : '⚠️ PAC Pending'}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 700 }}>
                  Blood Reserved: {c.preopClearance.bloodReserved}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── 2. PRE-OP FASTING & GUIDELINES ────────────────────────────────── */}
      {activeTab === 'prep' && (
        <div className="dash-card">
          <h3 className="dash-card-title" style={{ marginBottom: '14px' }}>Pre-Operative Preparation & Fasting Guidelines</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '14px' }}>
              <div style={{ fontWeight: 800, color: '#b45309', fontSize: '0.9rem' }}>⚠️ Mandatory NPO (Nothing by Mouth) Fasting Instructions</div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.82rem', color: '#78350f' }}>
                Please refrain from all solid food and liquids for at least 8 hours prior to your scheduled surgery time ({selectedCase?.scheduledDate}). Clear water is allowed up to 2 hours before arrival unless instructed otherwise by Anaesthesia.
              </p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.85rem' }}>What to Bring & Hospital Admission Checklist</div>
              <ul style={{ margin: '6px 0 0 18px', fontSize: '0.8rem', color: '#475569', lineHeight: 1.6 }}>
                <li>Photo ID and health insurance authorization card.</li>
                <li>Current medication bottles for anaesthesia review.</li>
                <li>Remove all metallic jewelry, piercings, hair accessories, and nail polish.</li>
                <li>Report to 3rd Floor Surgical Intake Desk 90 minutes prior to scheduled OT time.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ── 3. OPERATIVE NOTES & IMPLANT CARD ─────────────────────────────── */}
      {activeTab === 'notes' && (
        <div className="dash-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 className="dash-card-title" style={{ margin: 0 }}>Released Surgical Operative Summary</h3>
            {selectedCase?.operativeNotes?.signedAt && (
              <button className="btn btn-outline btn-sm" onClick={() => alert('Downloading official surgical report...')} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Download size={14} /> Download Operative Note PDF
              </button>
            )}
          </div>

          {selectedCase?.operativeNotes ? (
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>PROCEDURE PERFORMED</div>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>{selectedCase.operativeNotes.procedurePerformed}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>SURGEON OPERATIVE FINDINGS</div>
                <div style={{ fontSize: '0.85rem', color: '#334155', marginTop: '2px' }}>{selectedCase.operativeNotes.findings}</div>
              </div>

              {/* Implant Card Information */}
              {selectedCase.implantsUsed.length > 0 && (
                <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '8px', padding: '12px' }}>
                  <div style={{ fontWeight: 800, color: '#92400e', fontSize: '0.85rem' }}>💳 Patient Surgical Implant Identity Card</div>
                  {selectedCase.implantsUsed.map((imp, idx) => (
                    <div key={idx} style={{ fontSize: '0.8rem', color: '#78350f', marginTop: '4px' }}>
                      Implant: <strong>{imp.name}</strong> • Serial / Lot #: <strong style={{ fontFamily: 'monospace' }}>{imp.serialLotNumber}</strong>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>
                ✓ Digitally Signed by {selectedCase.operativeNotes.signedBySurgeon} on {selectedCase.operativeNotes.signedAt}
              </div>
            </div>
          ) : (
            <div style={{ color: '#64748b', fontSize: '0.85rem' }}>Operative note will be released after surgery completion and surgeon sign-off.</div>
          )}
        </div>
      )}

      {/* ── 4. OT BILLING & INVOICES ──────────────────────────────────────── */}
      {activeTab === 'billing' && (
        <div className="dash-card">
          <h3 className="dash-card-title" style={{ marginBottom: '14px' }}>My Operation Theatre Billing & Charges</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Date</th>
                  <th>Total OT Fee ($)</th>
                  <th>Insurance Covered ($)</th>
                  <th>My Co-Pay Due ($)</th>
                  <th>Payment Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {otInvoices.map(inv => (
                  <tr key={inv.invoiceId}>
                    <td style={{ fontWeight: 800, color: '#0f172a' }}>{inv.invoiceId}</td>
                    <td>{inv.date}</td>
                    <td style={{ fontWeight: 700 }}>${inv.totalPrice.toFixed(2)}</td>
                    <td style={{ color: '#16a34a' }}>${inv.insuranceCovered.toFixed(2)}</td>
                    <td style={{ fontWeight: 800, color: '#d97706' }}>${inv.patientCopayDue.toFixed(2)}</td>
                    <td>
                      <span style={{
                        background: inv.status === 'Paid' ? '#dcfce7' : '#fef3c7',
                        color: inv.status === 'Paid' ? '#15803d' : '#d97706',
                        padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800
                      }}>
                        {inv.paymentStatus}
                      </span>
                    </td>
                    <td>
                      {inv.status !== 'Paid' ? (
                        <button className="btn btn-primary btn-sm" onClick={() => handlePayInvoice(inv.invoiceId)} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
                          <CreditCard size={13} /> Pay Co-Pay Online
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>✓ Paid</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
