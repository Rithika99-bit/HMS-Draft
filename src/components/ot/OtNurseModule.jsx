import React, { useState } from 'react';
import { useOt } from '../../context/OtContext';
import {
  HeartPulse, CheckCircle2, ShieldCheck, AlertTriangle,
  ClipboardList, Package, Clock, Check, RefreshCw
} from 'lucide-react';

export default function OtNurseModule({ onShowToast }) {
  const {
    surgicalCases, submitWhoSafetyChecklist, submitInstrumentCount
  } = useOt();

  const [selectedCaseId, setSelectedCaseId] = useState(surgicalCases[0]?.caseId || null);
  const [countForm, setCountForm] = useState({
    preIncisionSponges: 20, postClosureSponges: 20,
    preIncisionNeedles: 14, postClosureNeedles: 14,
    preIncisionInstruments: 48, postClosureInstruments: 48
  });

  const selectedCase = surgicalCases.find(c => c.caseId === selectedCaseId) || surgicalCases[0];

  const handleWhoCheck = (checkType) => {
    if (!selectedCase) return;
    submitWhoSafetyChecklist(selectedCase.caseId, checkType, 'Sister Sarah Connor, RN');
    if (onShowToast) onShowToast(`WHO Surgical Safety Checklist (${checkType}) verified!`, 'success');
  };

  const handleSaveCounts = (e) => {
    e.preventDefault();
    if (!selectedCase) return;
    submitInstrumentCount(selectedCase.caseId, countForm, 'Sister Sarah Connor, RN');
    if (onShowToast) onShowToast(`Surgical Instrument, Sponge & Needle count 100% matched baseline!`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
      <div className="dash-card" style={{ background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HeartPulse size={24} color="#fecdd3" />
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>OT Nursing & Surgical Safety Console</h2>
            </div>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem', color: '#ffe4e6' }}>
              Execute WHO Surgical Safety Checklists (Sign In, Time Out, Sign Out), instrument/sponge count verification, and specimen dispatch.
            </p>
          </div>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700 }}>
            Scrub Specialist: Sister Sarah Connor, RN
          </span>
        </div>
      </div>

      {/* Case Selector & Nursing Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '16px' }}>
        {/* Sidebar */}
        <div className="dash-card" style={{ padding: '14px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 800 }}>Assigned Surgical Suites</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {surgicalCases.map(c => (
              <button key={c.caseId} onClick={() => setSelectedCaseId(c.caseId)} style={{
                padding: '10px', borderRadius: '8px', textAlign: 'left',
                border: selectedCaseId === c.caseId ? '2px solid #e11d48' : '1px solid #e2e8f0',
                background: selectedCaseId === c.caseId ? '#ffe4e6' : '#ffffff',
                cursor: 'pointer'
              }}>
                <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#0f172a' }}>{c.caseId}</div>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#be123c' }}>{c.patientName}</div>
                <div style={{ fontSize: '0.72rem', color: '#475569' }}>{c.procedureName}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Nursing Form Content */}
        <div className="dash-card">
          {selectedCase ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                    Surgical Nursing Record: {selectedCase.procedureName}
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>
                    Patient: <strong>{selectedCase.patientName}</strong> ({selectedCase.patientUhid}) • OT: {selectedCase.scheduledOtRoom}
                  </div>
                </div>
              </div>

              {/* ── 1. WHO SURGICAL SAFETY CHECKLIST (TIMEOUT) ───────────────────── */}
              <div style={{ border: '2px solid #fecdd3', borderRadius: '10px', padding: '16px', background: '#fff5f5' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 800, color: '#be123c', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={18} /> WHO Surgical Safety Checklist Protocol
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  {/* Sign In */}
                  <div style={{ background: '#fff', border: '1px solid #fda4af', borderRadius: '8px', padding: '12px' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.85rem' }}>1. SIGN IN (Before Induction)</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', margin: '4px 0 8px 0' }}>Patient identity, site marking, consent & pulse oximeter confirmed.</div>
                    {selectedCase.whoSafetyChecklist.signInCompleted ? (
                      <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 800 }}>✓ Sign In Completed</span>
                    ) : (
                      <button className="btn btn-primary btn-sm" onClick={() => handleWhoCheck('signInCompleted')} style={{ background: '#be123c', borderColor: '#be123c', fontSize: '0.75rem' }}>
                        Confirm Sign In
                      </button>
                    )}
                  </div>

                  {/* Time Out */}
                  <div style={{ background: '#fff', border: '1px solid #fda4af', borderRadius: '8px', padding: '12px' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.85rem' }}>2. TIME OUT (Before Incision)</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', margin: '4px 0 8px 0' }}>Team introduction, site verification, antibiotic prophylaxis within 60 mins.</div>
                    {selectedCase.whoSafetyChecklist.timeOutCompleted ? (
                      <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 800 }}>✓ Time Out Completed</span>
                    ) : (
                      <button className="btn btn-primary btn-sm" onClick={() => handleWhoCheck('timeOutCompleted')} style={{ background: '#be123c', borderColor: '#be123c', fontSize: '0.75rem' }}>
                        Confirm Time Out
                      </button>
                    )}
                  </div>

                  {/* Sign Out */}
                  <div style={{ background: '#fff', border: '1px solid #fda4af', borderRadius: '8px', padding: '12px' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.85rem' }}>3. SIGN OUT (Before Patient Leaves OT)</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', margin: '4px 0 8px 0' }}>Instrument/sponge count match, specimen labeling, key recovery concerns.</div>
                    {selectedCase.whoSafetyChecklist.signOutCompleted ? (
                      <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 800 }}>✓ Sign Out Completed</span>
                    ) : (
                      <button className="btn btn-primary btn-sm" onClick={() => handleWhoCheck('signOutCompleted')} style={{ background: '#be123c', borderColor: '#be123c', fontSize: '0.75rem' }}>
                        Confirm Sign Out
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* ── 2. INSTRUMENT, SPONGE & NEEDLE COUNT TABLE ───────────────────── */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#f8fafc' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                  Pre-Incision Baseline vs. Post-Closure Count Verification
                </h4>

                <form onSubmit={handleSaveCounts} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table className="dash-table">
                      <thead>
                        <tr>
                          <th>Item Category</th>
                          <th>Pre-Incision Baseline Count</th>
                          <th>Post-Closure Verification Count</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ fontWeight: 700 }}>Laparotomy & Gauze Sponges</td>
                          <td>
                            <input type="number" className="form-input" style={{ width: '90px' }} value={countForm.preIncisionSponges}
                              onChange={e => setCountForm({ ...countForm, preIncisionSponges: parseInt(e.target.value) })} required />
                          </td>
                          <td>
                            <input type="number" className="form-input" style={{ width: '90px' }} value={countForm.postClosureSponges}
                              onChange={e => setCountForm({ ...countForm, postClosureSponges: parseInt(e.target.value) })} required />
                          </td>
                          <td style={{ fontWeight: 800, color: countForm.preIncisionSponges === countForm.postClosureSponges ? '#16a34a' : '#dc2626' }}>
                            {countForm.preIncisionSponges === countForm.postClosureSponges ? '✓ 100% Match' : '⚠️ DISCREPANCY'}
                          </td>
                        </tr>

                        <tr>
                          <td style={{ fontWeight: 700 }}>Suture Needles & Sharps</td>
                          <td>
                            <input type="number" className="form-input" style={{ width: '90px' }} value={countForm.preIncisionNeedles}
                              onChange={e => setCountForm({ ...countForm, preIncisionNeedles: parseInt(e.target.value) })} required />
                          </td>
                          <td>
                            <input type="number" className="form-input" style={{ width: '90px' }} value={countForm.postClosureNeedles}
                              onChange={e => setCountForm({ ...countForm, postClosureNeedles: parseInt(e.target.value) })} required />
                          </td>
                          <td style={{ fontWeight: 800, color: countForm.preIncisionNeedles === countForm.postClosureNeedles ? '#16a34a' : '#dc2626' }}>
                            {countForm.preIncisionNeedles === countForm.postClosureNeedles ? '✓ 100% Match' : '⚠️ DISCREPANCY'}
                          </td>
                        </tr>

                        <tr>
                          <td style={{ fontWeight: 700 }}>Surgical Instruments & Clamps</td>
                          <td>
                            <input type="number" className="form-input" style={{ width: '90px' }} value={countForm.preIncisionInstruments}
                              onChange={e => setCountForm({ ...countForm, preIncisionInstruments: parseInt(e.target.value) })} required />
                          </td>
                          <td>
                            <input type="number" className="form-input" style={{ width: '90px' }} value={countForm.postClosureInstruments}
                              onChange={e => setCountForm({ ...countForm, postClosureInstruments: parseInt(e.target.value) })} required />
                          </td>
                          <td style={{ fontWeight: 800, color: countForm.preIncisionInstruments === countForm.postClosureInstruments ? '#16a34a' : '#dc2626' }}>
                            {countForm.preIncisionInstruments === countForm.postClosureInstruments ? '✓ 100% Match' : '⚠️ DISCREPANCY'}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                    <button type="submit" className="btn btn-primary" style={{ background: '#be123c', borderColor: '#be123c' }}>
                      Verify & Sign Instrument Count Record
                    </button>
                  </div>
                </form>
              </div>

              {/* ── 3. SPECIMEN HANDLING & LAB DISPATCH ──────────────────────────── */}
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '14px', borderRadius: '10px' }}>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '0.9rem', fontWeight: 800, color: '#1d4ed8' }}>
                  Intra-Operative Tissue Specimen Dispatch
                </h4>
                <div style={{ fontSize: '0.82rem', color: '#1e40af' }}>
                  Specimen Logged: <strong>{selectedCase.operativeNotes?.specimensCollected || 'Bone & Tissue Biopsy'}</strong> • Container Labeled with Patient Name, UHID, Date, Time & Anatomical Site. Dispatched to Pathology Lab.
                </div>
              </div>
            </div>
          ) : (
            <div>Select a surgical case to view nursing checklist.</div>
          )}
        </div>
      </div>

    </div>
  );
}
