import React, { useState } from 'react';
import { useEmr } from '../../context/EmrContext';
import { 
  Pill, Clock, AlertTriangle, CheckCircle, 
  RotateCw, Plus, FileText, Sparkles, Check 
} from 'lucide-react';

export default function PatientMedicationsView({ onShowToast }) {
  const { patientRecord, requestMedicationRefill } = useEmr();
  const [refillModalMed, setRefillModalMed] = useState(null);
  const [refillNotes, setRefillNotes] = useState('');

  const handleRefillSubmit = () => {
    if (!refillModalMed) return;
    requestMedicationRefill(refillModalMed.id, refillNotes || 'Patient routine refill request', patientRecord.demographics.fullName);
    if (onShowToast) onShowToast(`Refill request for ${refillModalMed.drugName} sent to pharmacy & clinician!`, 'success');
    setRefillModalMed(null);
    setRefillNotes('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Banner */}
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">My Prescription Regimen & 1-Click Refills</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Active daily medications, refill remaining counters, dosage instructions, and historical discontinued medications
            </div>
          </div>
        </div>

        {/* Refill Requests Alert Ribbon if any */}
        {patientRecord.refillRequests.length > 0 && (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px' }}>
            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#166534', marginBottom: '4px' }}>
              Recent Refill Requests ({patientRecord.refillRequests.length})
            </div>
            {patientRecord.refillRequests.map(req => (
              <div key={req.id} style={{ fontSize: '0.8rem', color: '#14532d' }}>
                • <strong>{req.drugName}</strong> — Status: <span style={{ fontWeight: 700, color: req.status === 'Approved' ? '#15803d' : '#d97706' }}>{req.status}</span> (Prescriber: {req.prescriber})
              </div>
            ))}
          </div>
        )}

        {/* Active Medications Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          {patientRecord.medications.active.map(med => (
            <div key={med.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                    {med.drugName} <span style={{ color: '#0284c7' }}>{med.dosage}</span>
                  </h3>
                  <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                    ● Active Therapy
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: 700, marginTop: '4px' }}>
                  Instructions: {med.frequency} ({med.route})
                </div>

                <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '4px' }}>
                  <strong>Indication:</strong> {med.purpose} • Prescribed by <strong>{med.prescriber}</strong> since {med.startDate}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                  {med.refillsRemaining} Refills Available
                </span>

                <button 
                  className="btn btn-primary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', padding: '6px 14px' }}
                  onClick={() => setRefillModalMed(med)}
                >
                  <RotateCw size={13} />
                  <span>Request Refill</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Refill Request Modal */}
        {refillModalMed && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '460px', width: '90%' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                Request Refill: {refillModalMed.drugName} {refillModalMed.dosage}
              </h3>
              <p style={{ margin: '0 0 14px 0', fontSize: '0.85rem', color: '#64748b' }}>
                This request will be sent to <strong>{refillModalMed.prescriber}</strong> and MediCare Central Pharmacy for automated fulfillment.
              </p>

              <div style={{ marginBottom: '16px' }}>
                <label className="form-label">Note for Clinician / Pharmacy (Optional)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. 90-day supply delivery to home address" 
                  value={refillNotes}
                  onChange={e => setRefillNotes(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setRefillModalMed(null)}>
                  Cancel
                </button>
                <button className="btn btn-primary btn-sm" onClick={handleRefillSubmit}>
                  Submit Refill Request
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Discontinued / Past Medications */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
            Past & Discontinued Medications
          </h3>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Drug & Dosage</th>
                <th>Reason Discontinued</th>
                <th>Stop Date</th>
              </tr>
            </thead>
            <tbody>
              {patientRecord.medications.pastDiscontinued.map((dis, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700, color: '#64748b' }}>{dis.drugName} {dis.dosage}</td>
                  <td style={{ color: '#dc2626', fontSize: '0.82rem' }}>{dis.reason}</td>
                  <td style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{dis.stopDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
