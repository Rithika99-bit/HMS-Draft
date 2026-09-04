import React, { useState } from 'react';
import { useOt } from '../../context/OtContext';
import {
  Stethoscope, Plus, Eye, FileText, CheckCircle,
  AlertTriangle, Clock, Activity, Layers, Download, Check
} from 'lucide-react';

export default function SurgeonOtView({ onShowToast }) {
  const {
    surgicalCases, procedureMaster, otSuites, otImplants,
    createSurgeryRequest, submitOperativeNote
  } = useOt();

  const [activeTab, setActiveTab] = useState('cases'); // 'cases' | 'new-request' | 'op-notes' | 'implants'
  const [selectedCaseId, setSelectedCaseId] = useState(surgicalCases[0]?.caseId || null);

  // New Request Form
  const [reqForm, setReqForm] = useState({
    patientName: 'Sarah Connor',
    patientUhid: 'UHID-MED-2026-08942',
    patientAge: 38,
    patientGender: 'Female',
    procCode: 'SURG-CABG-01',
    priority: 'Urgent',
    preopDiagnosis: 'Severe Triple Vessel Coronary Artery Disease',
    requestingDoctor: 'Dr. Sarah Mitchell, MD (Cardiovascular Surgery)',
    preferredOtRoom: 'OT Suite A (Cardiothoracic & Vascular)',
    preferredDate: 'Today, 01:30 PM'
  });

  // Operative Notes Form
  const [notesForm, setNotesForm] = useState({
    postopDiagnosis: 'Quadruple Coronary Artery Bypass Grafting (Off-Pump)',
    procedurePerformed: 'Off-pump Coronary Artery Bypass Grafting (OPCAB) x4 grafts',
    findings: 'Diffuse calcification in LAD and OM1. LIMA flow robust (> 60 mL/min). Good target vessel caliber.',
    technique: 'Median sternotomy. LIMA harvested with pedicle. Saphenous vein grafts harvested from left leg.',
    estimatedBloodLossMl: 350,
    specimensCollected: 'Vein Segment for Quality Control',
    complications: 'None. Smooth intra-operative course.'
  });

  const selectedCase = surgicalCases.find(c => c.caseId === selectedCaseId) || surgicalCases[0];

  const handleCreateRequest = (e) => {
    e.preventDefault();
    createSurgeryRequest({ ...reqForm });
    if (onShowToast) onShowToast(`Surgical Requisition Created for ${reqForm.patientName}!`, 'success');
    setActiveTab('cases');
  };

  const handleSaveOpNotes = (e) => {
    e.preventDefault();
    if (!selectedCase) return;
    submitOperativeNote(selectedCase.caseId, notesForm, reqForm.requestingDoctor);
    if (onShowToast) onShowToast(`Operative note signed & finalized for Case ${selectedCase.caseId}!`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
      <div className="dash-card" style={{ background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Stethoscope size={24} color="#99f6e4" />
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>Surgeon Surgical Documentation & OT Console</h2>
            </div>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem', color: '#ccfbf1' }}>
              Create surgery requests, verify pre-op clearance, document operative notes, technique, implants, and post-op instructions.
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => setActiveTab('new-request')} style={{ background: '#fff', color: '#0f766e', border: 'none', fontWeight: 800 }}>
            <Plus size={16} /> Request New Surgery
          </button>
        </div>

        {/* Subnav */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '14px', flexWrap: 'wrap' }}>
          {[
            { id: 'cases', label: 'My Surgical Cases & Queue', icon: Activity },
            { id: 'new-request', label: 'Create Surgery Request', icon: Plus },
            { id: 'op-notes', label: 'Operative Notes & Documentation', icon: FileText },
            { id: 'implants', label: 'Implant Log Verification', icon: Layers }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                background: active ? '#ffffff' : 'rgba(255,255,255,0.15)',
                color: active ? '#0f766e' : '#ffffff',
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

      {/* ── 1. MY SURGICAL CASES ───────────────────────────────────────────── */}
      {activeTab === 'cases' && (
        <div className="dash-card">
          <h3 className="dash-card-title" style={{ marginBottom: '14px' }}>My Assigned Surgical Cases</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Patient Name</th>
                  <th>Procedure Name</th>
                  <th>Priority</th>
                  <th>Scheduled OT Suite</th>
                  <th>Pre-Op Clearance</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {surgicalCases.map(c => (
                  <tr key={c.caseId}>
                    <td style={{ fontWeight: 800, color: '#0f172a' }}>{c.caseId}</td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0284c7' }}>{c.patientName}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{c.patientUhid} ({c.patientAge}y/{c.patientGender})</div>
                    </td>
                    <td style={{ fontWeight: 700, fontSize: '0.85rem' }}>{c.procedureName}</td>
                    <td>
                      <span style={{
                        background: c.priority === 'Urgent' ? '#fee2e2' : '#f1f5f9',
                        color: c.priority === 'Urgent' ? '#dc2626' : '#475569',
                        padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800
                      }}>
                        {c.priority}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.78rem', color: '#334155' }}>{c.scheduledOtRoom}</td>
                    <td>
                      <span style={{
                        background: c.preopClearance.consentSigned ? '#dcfce7' : '#fef3c7',
                        color: c.preopClearance.consentSigned ? '#15803d' : '#d97706',
                        padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800
                      }}>
                        {c.preopClearance.consentSigned ? '✓ Cleared' : 'Pending'}
                      </span>
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
                      <button className="btn btn-primary btn-sm" onClick={() => { setSelectedCaseId(c.caseId); setActiveTab('op-notes'); }} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
                        <FileText size={13} /> Operative Note
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── 2. CREATE SURGERY REQUEST WIZARD ────────────────────────────────── */}
      {activeTab === 'new-request' && (
        <div className="dash-card" style={{ maxWidth: '680px' }}>
          <h3 className="dash-card-title" style={{ marginBottom: '6px' }}>Request New Surgical Procedure</h3>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '16px' }}>
            Submit surgical requisition to OT Admin for room and team scheduling.
          </p>

          <form onSubmit={handleCreateRequest} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="form-label">Patient Name</label>
                <input type="text" className="form-input" value={reqForm.patientName}
                  onChange={e => setReqForm({ ...reqForm, patientName: e.target.value })} required />
              </div>
              <div>
                <label className="form-label">Patient UHID</label>
                <input type="text" className="form-input" value={reqForm.patientUhid}
                  onChange={e => setReqForm({ ...reqForm, patientUhid: e.target.value })} required />
              </div>
            </div>

            <div>
              <label className="form-label">Select Surgical Procedure</label>
              <select className="form-input" value={reqForm.procCode} onChange={e => setReqForm({ ...reqForm, procCode: e.target.value })}>
                {procedureMaster.map(p => (
                  <option key={p.procCode} value={p.procCode}>
                    [{p.category}] {p.name} (~{p.estDurationMins} mins)
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="form-label">Surgical Priority</label>
                <select className="form-input" value={reqForm.priority} onChange={e => setReqForm({ ...reqForm, priority: e.target.value })}>
                  <option value="Routine">Routine Elective</option>
                  <option value="Urgent">Urgent Priority</option>
                  <option value="Emergency STAT">Emergency STAT Override</option>
                </select>
              </div>
              <div>
                <label className="form-label">Preferred Date & Time</label>
                <input type="text" className="form-input" value={reqForm.preferredDate}
                  onChange={e => setReqForm({ ...reqForm, preferredDate: e.target.value })} required />
              </div>
            </div>

            <div>
              <label className="form-label">Pre-Operative Clinical Diagnosis & Indication</label>
              <textarea className="form-input" rows="2" value={reqForm.preopDiagnosis}
                onChange={e => setReqForm({ ...reqForm, preopDiagnosis: e.target.value })} required />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setActiveTab('cases')}>Cancel</button>
              <button type="submit" className="btn btn-primary">Submit Surgical Requisition</button>
            </div>
          </form>
        </div>
      )}

      {/* ── 3. OPERATIVE NOTES EDITOR & SIGN-OFF ──────────────────────────── */}
      {activeTab === 'op-notes' && (
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '16px' }}>
          {/* Case Selector Sidebar */}
          <div className="dash-card" style={{ padding: '14px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 800 }}>Select Surgical Case</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {surgicalCases.map(c => (
                <button key={c.caseId} onClick={() => setSelectedCaseId(c.caseId)} style={{
                  padding: '10px', borderRadius: '8px', textAlign: 'left',
                  border: selectedCaseId === c.caseId ? '2px solid #0d9488' : '1px solid #e2e8f0',
                  background: selectedCaseId === c.caseId ? '#ccfbf1' : '#ffffff',
                  cursor: 'pointer'
                }}>
                  <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#0f172a' }}>{c.caseId}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0f766e' }}>{c.patientName}</div>
                  <div style={{ fontSize: '0.72rem', color: '#475569' }}>{c.procedureName}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="dash-card">
            {selectedCase ? (
              <form onSubmit={handleSaveOpNotes} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                      Operative Note: {selectedCase.procedureName}
                    </h3>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>
                      Patient: <strong>{selectedCase.patientName}</strong> ({selectedCase.patientUhid}) • OT: {selectedCase.scheduledOtRoom}
                    </div>
                  </div>
                  {selectedCase.operativeNotes?.signedAt && (
                    <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800 }}>
                      ✓ Digitally Signed & Released
                    </span>
                  )}
                </div>

                <div>
                  <label className="form-label">Post-Operative Diagnosis</label>
                  <input type="text" className="form-input" value={notesForm.postopDiagnosis}
                    onChange={e => setNotesForm({ ...notesForm, postopDiagnosis: e.target.value })} required />
                </div>

                <div>
                  <label className="form-label">Procedure Performed & Grafts</label>
                  <input type="text" className="form-input" value={notesForm.procedurePerformed}
                    onChange={e => setNotesForm({ ...notesForm, procedurePerformed: e.target.value })} required />
                </div>

                <div>
                  <label className="form-label">Operative Findings</label>
                  <textarea rows="3" className="form-input" value={notesForm.findings}
                    onChange={e => setNotesForm({ ...notesForm, findings: e.target.value })} required />
                </div>

                <div>
                  <label className="form-label">Surgical Technique & Course</label>
                  <textarea rows="3" className="form-input" value={notesForm.technique}
                    onChange={e => setNotesForm({ ...notesForm, technique: e.target.value })} required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Estimated Blood Loss (mL)</label>
                    <input type="number" className="form-input" value={notesForm.estimatedBloodLossMl}
                      onChange={e => setNotesForm({ ...notesForm, estimatedBloodLossMl: parseInt(e.target.value) })} required />
                  </div>
                  <div>
                    <label className="form-label">Tissue Specimens Collected</label>
                    <input type="text" className="form-input" value={notesForm.specimensCollected}
                      onChange={e => setNotesForm({ ...notesForm, specimensCollected: e.target.value })} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button type="submit" className="btn btn-primary" style={{ background: '#0f766e', borderColor: '#0f766e' }}>
                    <CheckCircle size={15} style={{ display: 'inline', marginRight: 6 }} />
                    Finalize & Sign Operative Note
                  </button>
                </div>
              </form>
            ) : (
              <div>Select a case to write operative notes.</div>
            )}
          </div>
        </div>
      )}

      {/* ── 4. IMPLANT LOG VERIFICATION ────────────────────────────────────── */}
      {activeTab === 'implants' && (
        <div className="dash-card">
          <h3 className="dash-card-title" style={{ marginBottom: '12px' }}>Surgical Implants Placed & Device Serial Records</h3>
          {selectedCase?.implantsUsed.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedCase.implantsUsed.map((imp, idx) => (
                <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 800, color: '#0f172a' }}>{imp.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#d97706', fontWeight: 700, marginTop: '2px' }}>
                    Serial / Lot Number: {imp.serialLotNumber}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#16a34a', marginTop: '4px' }}>Unit Cost: ${imp.cost.toFixed(2)}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: '#64748b', fontSize: '0.85rem' }}>No implants recorded for this case yet.</div>
          )}
        </div>
      )}

    </div>
  );
}
