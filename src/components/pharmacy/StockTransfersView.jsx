import React, { useState } from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import { 
  ArrowRight, Plus, RotateCw, Bed, Ambulance, 
  Building2, CheckCircle, ShieldCheck, AlertTriangle 
} from 'lucide-react';

export default function StockTransfersView({ onShowToast }) {
  const { transfers, medicines, transferStock, adjustStock } = usePharmacy();
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(false);

  // Transfer Form
  const [trfForm, setTrfForm] = useState({
    medicineId: 'MED-M03',
    batchNumber: 'CEF-C99182',
    fromLocation: 'Central Pharmacy Dispensary',
    toLocation: 'Intensive Care Unit (ICU) Satellite',
    qty: 20,
    reason: 'Urgent ICU surgical replenishment'
  });

  // Adjustment Form
  const [adjForm, setAdjForm] = useState({
    medicineId: 'MED-M01',
    batchNumber: 'LIS-B89201',
    adjustmentType: 'DAMAGE_SPILLAGE', // 'DAMAGE_SPILLAGE' | 'PHYSICAL_VARIANCE_LOSS' | 'SURPLUS_FOUND'
    qty: 2,
    reason: 'Damaged packaging during shelf rearranging'
  });

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    transferStock(
      trfForm.medicineId,
      trfForm.batchNumber,
      trfForm.fromLocation,
      trfForm.toLocation,
      parseInt(trfForm.qty, 10),
      trfForm.reason,
      'Dr. Kevin Okafor, PharmD'
    );
    if (onShowToast) onShowToast(`Transferred ${trfForm.qty} units to ${trfForm.toLocation}! Stock movement logged.`, 'success');
    setShowTransferModal(false);
  };

  const handleAdjustSubmit = (e) => {
    e.preventDefault();
    adjustStock(
      adjForm.medicineId,
      adjForm.batchNumber,
      adjForm.adjustmentType,
      parseInt(adjForm.qty, 10),
      adjForm.reason,
      'Dr. Kevin Okafor, PharmD'
    );
    if (onShowToast) onShowToast(`Stock adjustment recorded: ${adjForm.qty} units (${adjForm.adjustmentType})!`, 'info');
    setShowAdjustModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Inter-Department Stock Transfers & Inventory Adjustments</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Transfer stock to ICU, Emergency Trauma Room, Operation Theater, and reconcile physical audit count variances
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => setShowAdjustModal(true)}
            >
              Reconcile / Adjust Stock
            </button>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setShowTransferModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Plus size={15} /> Transfer to Department
            </button>
          </div>
        </div>

        {/* Transfers Table */}
        <table className="dash-table">
          <thead>
            <tr>
              <th>Transfer ID & Time</th>
              <th>Source Location</th>
              <th>Destination Department</th>
              <th>Medicine & Batch</th>
              <th>Transferred Qty</th>
              <th>Authorized By</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map(trf => (
              <tr key={trf.transferId}>
                <td>
                  <div style={{ fontWeight: 800, color: '#0f172a' }}>{trf.transferId}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{trf.date}</div>
                </td>
                <td style={{ fontSize: '0.82rem' }}>{trf.fromLocation}</td>
                <td>
                  <span style={{ fontWeight: 700, color: '#0284c7' }}>{trf.toLocation}</span>
                </td>
                <td>
                  <div style={{ fontWeight: 700 }}>{trf.medicineName}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Batch: {trf.batchNumber}</div>
                </td>
                <td>
                  <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '3px 8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800 }}>
                    {trf.qty} Units
                  </span>
                </td>
                <td style={{ fontSize: '0.8rem', color: '#475569' }}>{trf.authorizedBy}</td>
                <td>
                  <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                    {trf.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Transfer Modal */}
        {showTransferModal && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '520px', width: '90%' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                Transfer Stock to Department / Ward
              </h3>

              <form onSubmit={handleTransferSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label className="form-label">Destination Department / Unit</label>
                  <select 
                    className="form-input" 
                    value={trfForm.toLocation}
                    onChange={e => setTrfForm({ ...trfForm, toLocation: e.target.value })}
                  >
                    <option value="Intensive Care Unit (ICU) Satellite">Intensive Care Unit (ICU) Satellite</option>
                    <option value="Emergency Department (ED) Crash Cart">Emergency Department (ED) Crash Cart</option>
                    <option value="Operation Theater (OT) Surgical Pharmacy">Operation Theater (OT) Surgical Pharmacy</option>
                    <option value="Inpatient Ward B Satellite Dispensary">Inpatient Ward B Satellite Dispensary</option>
                    <option value="Cardiac Catheterization Lab">Cardiac Catheterization Lab</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Select Drug to Transfer</label>
                  <select 
                    className="form-input" 
                    value={trfForm.medicineId}
                    onChange={e => setTrfForm({ ...trfForm, medicineId: e.target.value })}
                  >
                    {medicines.map(m => (
                      <option key={m.id} value={m.id}>{m.brandName} (Available: {m.currentStock} Units)</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Batch Number</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={trfForm.batchNumber}
                      onChange={e => setTrfForm({ ...trfForm, batchNumber: e.target.value })}
                      required 
                    />
                  </div>
                  <div>
                    <label className="form-label">Transfer Quantity</label>
                    <input 
                      type="number" 
                      min="1" 
                      className="form-input" 
                      value={trfForm.qty}
                      onChange={e => setTrfForm({ ...trfForm, qty: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Transfer Justification / Clinical Indication</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={trfForm.reason}
                    onChange={e => setTrfForm({ ...trfForm, reason: e.target.value })} 
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowTransferModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Execute Stock Transfer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Stock Adjustment Modal */}
        {showAdjustModal && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '480px', width: '90%' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                Physical Inventory Audit Count Adjustment
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '14px' }}>
                Reconcile physical stock counts with traceable adjustment reason codes.
              </p>

              <form onSubmit={handleAdjustSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label className="form-label">Medicine</label>
                  <select 
                    className="form-input" 
                    value={adjForm.medicineId}
                    onChange={e => setAdjForm({ ...adjForm, medicineId: e.target.value })}
                  >
                    {medicines.map(m => (
                      <option key={m.id} value={m.id}>{m.brandName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Adjustment Type</label>
                  <select 
                    className="form-input" 
                    value={adjForm.adjustmentType}
                    onChange={e => setAdjForm({ ...adjForm, adjustmentType: e.target.value })}
                  >
                    <option value="DAMAGE_SPILLAGE">Damage / Breakage / Spillage (Deduct)</option>
                    <option value="PHYSICAL_VARIANCE_LOSS">Physical Audit Loss Variance (Deduct)</option>
                    <option value="SURPLUS_FOUND">Physical Audit Surplus Found (Add)</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Batch Number</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={adjForm.batchNumber}
                      onChange={e => setAdjForm({ ...adjForm, batchNumber: e.target.value })}
                      required 
                    />
                  </div>
                  <div>
                    <label className="form-label">Quantity</label>
                    <input 
                      type="number" 
                      min="1" 
                      className="form-input" 
                      value={adjForm.qty}
                      onChange={e => setAdjForm({ ...adjForm, qty: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Audit Reason & Justification</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={adjForm.reason}
                    onChange={e => setAdjForm({ ...adjForm, reason: e.target.value })} 
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAdjustModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Reconcile Stock & Log
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
