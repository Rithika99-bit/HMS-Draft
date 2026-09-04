import React, { useState } from 'react';
import { useOt } from '../../context/OtContext';
import {
  Activity, Syringe, HeartPulse, CheckCircle, Plus,
  ShieldCheck, AlertCircle, Clock, FileText, UserCheck
} from 'lucide-react';

export default function AnaesthetistOtView({ onShowToast }) {
  const {
    surgicalCases, asaClassifications, anaesthesiaTypes, submitAnaesthesiaRecord
  } = useOt();

  const [selectedCaseId, setSelectedCaseId] = useState(surgicalCases[0]?.caseId || null);
  const [anaesForm, setAnaesForm] = useState({
    asaClass: 'ASA-3',
    type: 'General Anaesthesia — Endotracheal Intubation (GA-ETT)',
    airwayGrade: 'Mallampati Class I',
    vitalsLog: 'BP 118/76 • HR 68 • SpO2 100% • EtCO2 36 mmHg',
    pacuHandoverNotes: 'Hemodynamically stable. Intubated on propofol infusion transferred to CVICU.'
  });

  const [newDrug, setNewDrug] = useState({ drug: 'Fentanyl IV', dose: '100 mcg', time: '14:15' });

  const selectedCase = surgicalCases.find(c => c.caseId === selectedCaseId) || surgicalCases[0];

  const handleAddDrug = (e) => {
    e.preventDefault();
    if (!selectedCase) return;
    submitAnaesthesiaRecord(
      selectedCase.caseId,
      anaesForm.asaClass,
      anaesForm.type,
      anaesForm.airwayGrade,
      { ...newDrug },
      anaesForm.vitalsLog,
      anaesForm.pacuHandoverNotes,
      'Dr. Robert Chen, MD'
    );
    if (onShowToast) onShowToast(`Logged drug ${newDrug.drug} (${newDrug.dose})!`, 'success');
  };

  const handleSaveAnaes = (e) => {
    e.preventDefault();
    if (!selectedCase) return;
    submitAnaesthesiaRecord(
      selectedCase.caseId,
      anaesForm.asaClass,
      anaesForm.type,
      anaesForm.airwayGrade,
      null,
      anaesForm.vitalsLog,
      anaesForm.pacuHandoverNotes,
      'Dr. Robert Chen, MD'
    );
    if (onShowToast) onShowToast(`Pre-Anaesthesia & PAC Record Saved for Case ${selectedCase.caseId}!`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
      <div className="dash-card" style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Syringe size={24} color="#a7f3d0" />
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>Anaesthesiology & Perioperative PAC Console</h2>
            </div>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem', color: '#d1fae5' }}>
              Pre-Anaesthesia Evaluation (PAC), ASA physical classification, intra-op drug administration log, vitals, and PACU handover.
            </p>
          </div>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700 }}>
            Active Anaesthetist: Dr. Robert Chen, MD, FACA
          </span>
        </div>
      </div>

      {/* Case Selector & Anaesthesia Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '16px' }}>
        {/* Case List Sidebar */}
        <div className="dash-card" style={{ padding: '14px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 800 }}>Active Surgical Queue</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {surgicalCases.map(c => (
              <button key={c.caseId} onClick={() => setSelectedCaseId(c.caseId)} style={{
                padding: '10px', borderRadius: '8px', textAlign: 'left',
                border: selectedCaseId === c.caseId ? '2px solid #059669' : '1px solid #e2e8f0',
                background: selectedCaseId === c.caseId ? '#d1fae5' : '#ffffff',
                cursor: 'pointer'
              }}>
                <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#0f172a' }}>{c.caseId}</div>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#047857' }}>{c.patientName}</div>
                <div style={{ fontSize: '0.72rem', color: '#475569' }}>{c.procedureName}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Anaesthesia Record Form */}
        <div className="dash-card">
          {selectedCase ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                    Anaesthesia Record: {selectedCase.procedureName}
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>
                    Patient: <strong>{selectedCase.patientName}</strong> ({selectedCase.patientUhid}) • Primary Surgeon: {selectedCase.surgicalTeam.primarySurgeon}
                  </div>
                </div>
                <span style={{ background: '#d1fae5', color: '#047857', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800 }}>
                  {selectedCase.anaesthesiaRecord?.asaClass || 'ASA Pending'}
                </span>
              </div>

              {/* Pre-Anaesthesia PAC & ASA Classification */}
              <form onSubmit={handleSaveAnaes} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">ASA Physical Status Classification</label>
                    <select className="form-input" value={anaesForm.asaClass} onChange={e => setAnaesForm({ ...anaesForm, asaClass: e.target.value })}>
                      {asaClassifications.map(a => (
                        <option key={a.classId} value={a.classId}>{a.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Anaesthesia Technique / Plan</label>
                    <select className="form-input" value={anaesForm.type} onChange={e => setAnaesForm({ ...anaesForm, type: e.target.value })}>
                      {anaesthesiaTypes.map(t => (
                        <option key={t.code} value={t.name}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Airway Assessment (Mallampati)</label>
                    <select className="form-input" value={anaesForm.airwayGrade} onChange={e => setAnaesForm({ ...anaesForm, airwayGrade: e.target.value })}>
                      <option value="Mallampati Class I">Mallampati Class I (Complete visualization)</option>
                      <option value="Mallampati Class II">Mallampati Class II (Uvula partially seen)</option>
                      <option value="Mallampati Class III">Mallampati Class III (Soft palate only)</option>
                      <option value="Mallampati Class IV">Mallampati Class IV (Hard palate only)</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Intra-op Monitoring & Vitals</label>
                    <input type="text" className="form-input" value={anaesForm.vitalsLog}
                      onChange={e => setAnaesForm({ ...anaesForm, vitalsLog: e.target.value })} required />
                  </div>
                </div>

                <div>
                  <label className="form-label">PACU Post-Anaesthesia Recovery Notes & Handover</label>
                  <textarea rows="2" className="form-input" value={anaesForm.pacuHandoverNotes}
                    onChange={e => setAnaesForm({ ...anaesForm, pacuHandoverNotes: e.target.value })} required />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="btn btn-primary" style={{ background: '#059669', borderColor: '#059669' }}>
                    Save PAC & Anaesthesia Assessment
                  </button>
                </div>
              </form>

              {/* Controlled Drug Administration Log */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '10px', marginTop: '10px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', fontWeight: 800, color: '#047857' }}>
                  Intra-Operative Controlled Drug Administration Log
                </h4>

                {selectedCase.anaesthesiaRecord?.drugsAdministered.length > 0 ? (
                  <table className="dash-table" style={{ marginBottom: '12px' }}>
                    <thead>
                      <tr>
                        <th>Timestamp</th>
                        <th>Medication / Agent</th>
                        <th>Dosage Administered</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCase.anaesthesiaRecord.drugsAdministered.map((d, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 800, color: '#0f172a' }}>{d.time}</td>
                          <td style={{ fontWeight: 700, color: '#059669' }}>{d.drug}</td>
                          <td style={{ fontWeight: 700 }}>{d.dose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '10px' }}>No drugs logged yet.</div>
                )}

                {/* Add Drug Form */}
                <form onSubmit={handleAddDrug} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input type="text" className="form-input" style={{ flex: 2, fontSize: '0.8rem' }}
                    value={newDrug.drug} onChange={e => setNewDrug({ ...newDrug, drug: e.target.value })} placeholder="Drug Name (e.g. Propofol)" required />
                  <input type="text" className="form-input" style={{ flex: 1, fontSize: '0.8rem' }}
                    value={newDrug.dose} onChange={e => setNewDrug({ ...newDrug, dose: e.target.value })} placeholder="Dose (e.g. 100mg)" required />
                  <input type="text" className="form-input" style={{ flex: 1, fontSize: '0.8rem' }}
                    value={newDrug.time} onChange={e => setNewDrug({ ...newDrug, time: e.target.value })} placeholder="Time (14:15)" required />
                  <button type="submit" className="btn btn-primary btn-sm" style={{ background: '#059669', borderColor: '#059669', flexShrink: 0 }}>
                    <Plus size={13} /> Log Drug
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div>Select a surgical case to view anaesthesia record.</div>
          )}
        </div>
      </div>

    </div>
  );
}
