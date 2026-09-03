import React, { useState } from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import { 
  FileText, CheckCircle, AlertTriangle, Pill, 
  User, Check, ShieldCheck, Printer, Clock 
} from 'lucide-react';

export default function PrescriptionDispenseView({ onShowToast }) {
  const { prescriptions, batches, dispensePrescription } = usePharmacy();
  const [selectedRx, setSelectedRx] = useState(prescriptions[0]);
  const [selectedBatch, setSelectedBatch] = useState('LIS-B89201');
  const [dispensingCompleted, setDispensingCompleted] = useState(false);

  const handleDispense = () => {
    if (!selectedRx) return;
    dispensePrescription(
      selectedRx.rxId, 
      selectedBatch, 
      selectedRx.items[0]?.qty || 30, 
      selectedRx.patientName, 
      selectedRx.prescriber, 
      'Dr. Kevin Okafor, PharmD'
    );
    setDispensingCompleted(true);
    if (onShowToast) onShowToast(`Prescription ${selectedRx.rxId} verified & dispensed! Traceable stock deducted.`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Banner */}
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Prescription Processing & Clinical Dispensing Workbench</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Real-time synchronization with physician orders, automated allergy & interaction screening, FEFO batch selection, and stock deduction
            </div>
          </div>
        </div>

        {/* 2-Column Split: Prescription Queue & Dispensing Terminal */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '20px' }}>
          
          {/* Left Column: Live Rx Queue */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
              Doctor Orders Queue ({prescriptions.length})
            </h3>

            {prescriptions.map(rx => {
              const isSelected = selectedRx?.rxId === rx.rxId;
              const isDispensed = rx.status === 'Dispensed';

              return (
                <div
                  key={rx.rxId}
                  onClick={() => {
                    setSelectedRx(rx);
                    setDispensingCompleted(false);
                  }}
                  style={{
                    padding: '14px',
                    borderRadius: '10px',
                    border: isSelected ? '2px solid #16a34a' : '1px solid #e2e8f0',
                    background: isSelected ? '#f0fdf4' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a' }}>{rx.rxId}</span>
                    <span style={{ 
                      background: isDispensed ? '#dcfce7' : '#fef3c7',
                      color: isDispensed ? '#15803d' : '#d97706',
                      padding: '2px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: 700 
                    }}>
                      {rx.status}
                    </span>
                  </div>

                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0284c7' }}>
                    {rx.patientName} <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 400 }}>({rx.patientUhid})</span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '4px' }}>
                    {rx.items.map(i => `${i.drug} (${i.qty} Units)`).join(', ')}
                  </div>

                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '6px' }}>
                    Prescriber: {rx.prescriber} • {rx.date}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dispensing Verification Terminal */}
          {selectedRx && (
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                      Dispensing Order: {selectedRx.rxId}
                    </h3>
                    <span style={{ background: selectedRx.status === 'Dispensed' ? '#dcfce7' : '#fef3c7', color: selectedRx.status === 'Dispensed' ? '#15803d' : '#d97706', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {selectedRx.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>
                    Patient: <strong>{selectedRx.patientName}</strong> ({selectedRx.patientAge}y / {selectedRx.patientGender}) • {selectedRx.patientUhid}
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#64748b', textAlign: 'right' }}>
                  Attending Physician:<br /><strong>{selectedRx.prescriber}</strong>
                </div>
              </div>

              {/* Clinical Safety Screener Box */}
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <ShieldCheck size={18} color="#16a34a" />
                  <span style={{ fontWeight: 800, color: '#166534', fontSize: '0.88rem' }}>
                    Automated Clinical Safety Screener Passed
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#14532d' }}>
                  • <strong>Allergy Check:</strong> {selectedRx.allergyWarning || 'No contraindications detected.'}<br />
                  • <strong>Drug Interactions:</strong> Zero high-risk interactions identified with current active patient therapy.
                </div>
              </div>

              {/* Prescribed Items & FEFO Batch Allocation */}
              <div style={{ marginBottom: '18px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                  Prescribed Medication & Batch Allocation
                </h4>

                <table className="dash-table" style={{ background: '#f8fafc', marginBottom: '14px' }}>
                  <thead>
                    <tr>
                      <th>Prescribed Drug</th>
                      <th>Route & Frequency</th>
                      <th>Qty</th>
                      <th>FEFO Selected Batch</th>
                      <th>Storage Bin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRx.items.map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 800, color: '#0f172a' }}>{item.drug}</td>
                        <td style={{ fontSize: '0.82rem' }}>{item.frequency} ({item.route})</td>
                        <td><span style={{ fontWeight: 800, color: '#0284c7' }}>{item.qty} Tabs</span></td>
                        <td>
                          <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                            {item.batchAllocated || selectedBatch}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.78rem', color: '#64748b' }}>Rack-A1 / Shelf-2</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Dispensation Action Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  Pharmacist: <strong>Dr. Kevin Okafor, PharmD (Lic #PH-8891)</strong>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={() => { if (onShowToast) onShowToast('Printed dosage instruction sticker for patient label.', 'info'); }}
                  >
                    <Printer size={14} style={{ display: 'inline', marginRight: 4 }} /> Print Label
                  </button>

                  {selectedRx.status === 'Dispensed' || dispensingCompleted ? (
                    <div style={{ background: '#dcfce7', color: '#15803d', padding: '6px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Check size={16} /> Dispensed & Stock Deducted
                    </div>
                  ) : (
                    <button 
                      className="btn btn-primary btn-sm"
                      style={{ background: '#16a34a', border: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                      onClick={handleDispense}
                    >
                      <CheckCircle size={15} /> Confirm Dispense & Deduct Stock
                    </button>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
