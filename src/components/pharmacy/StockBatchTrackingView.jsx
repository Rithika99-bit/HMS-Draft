import React, { useState } from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import { 
  Package, Search, AlertTriangle, ShieldAlert, 
  Clock, MapPin, CheckCircle, RotateCw, Filter, Shield 
} from 'lucide-react';

export default function StockBatchTrackingView({ onShowToast }) {
  const { batches, quarantineBatch } = usePharmacy();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [quarantineModalBatch, setQuarantineModalBatch] = useState(null);
  const [quarantineReason, setQuarantineReason] = useState('Near expiry quality check');

  const handleQuarantineSubmit = () => {
    if (!quarantineModalBatch) return;
    quarantineBatch(quarantineModalBatch.batchId, quarantineReason, 'Dr. Kevin Okafor, PharmD');
    if (onShowToast) onShowToast(`Batch ${quarantineModalBatch.batchNumber} isolated to quarantine storage room!`, 'warning');
    setQuarantineModalBatch(null);
  };

  const filteredBatches = batches.filter(b => {
    const matchSearch = b.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.rackLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && !b.status.includes('QUARANTINED') && !b.status.includes('Critical')) ||
      (statusFilter === 'expiring' && (b.status.includes('Warning') || b.status.includes('Critical'))) ||
      (statusFilter === 'quarantined' && b.status.includes('QUARANTINED'));
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Live Batch & Expiry Tracking (FEFO Matrix)</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              First-Expiry First-Out (FEFO) automated allocation, shelf/rack/bin physical locator, and batch quarantine workflows
            </div>
          </div>
          <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700 }}>
            {batches.length} Active Batches Tracked
          </span>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search by drug name, batch number, shelf/bin, or vendor..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['all', 'active', 'expiring', 'quarantined'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: statusFilter === s ? '1px solid #16a34a' : '1px solid #e2e8f0',
                  background: statusFilter === s ? '#16a34a' : '#ffffff',
                  color: statusFilter === s ? '#ffffff' : '#475569',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  cursor: 'pointer'
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Batches Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Batch Number</th>
                <th>Medicine Name</th>
                <th>Physical Rack / Bin</th>
                <th>Mfg Date</th>
                <th>Expiry Date</th>
                <th>Stock on Hand</th>
                <th>Unit Cost / MRP</th>
                <th>FEFO Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBatches.map(batch => {
                const isCritical = batch.status.includes('Critical') || batch.status.includes('Warning');
                const isQuarantined = batch.status.includes('QUARANTINED');

                return (
                  <tr key={batch.batchId} style={{ background: isQuarantined ? '#fef2f2' : isCritical ? '#fffbeb' : undefined }}>
                    <td>
                      <div style={{ fontWeight: 800, color: '#0f172a' }}>{batch.batchNumber}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{batch.batchId}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0284c7' }}>{batch.medicineName}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{batch.supplierName}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', fontWeight: 600 }}>
                        <MapPin size={13} color="#0284c7" />
                        <span>{batch.rackLocation}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{batch.mfgDate}</td>
                    <td>
                      <strong style={{ color: isCritical ? '#dc2626' : '#0f172a', fontSize: '0.85rem' }}>
                        {batch.expiryDate}
                      </strong>
                    </td>
                    <td>
                      <span style={{ fontWeight: 800, fontSize: '0.92rem', color: isQuarantined ? '#64748b' : '#0f172a' }}>
                        {batch.currentStockQty} Units
                      </span>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#16a34a' }}>MRP: ${batch.unitMrp}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Cost: ${batch.unitCost}</div>
                    </td>
                    <td>
                      <span style={{ 
                        background: isQuarantined ? '#fee2e2' : isCritical ? '#fef3c7' : '#dcfce7',
                        color: isQuarantined ? '#dc2626' : isCritical ? '#d97706' : '#15803d',
                        padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 
                      }}>
                        {batch.status}
                      </span>
                    </td>
                    <td>
                      {!isQuarantined && (
                        <button 
                          className="btn btn-outline btn-sm"
                          style={{ color: '#dc2626', borderColor: '#fca5a5', fontSize: '0.72rem', padding: '3px 8px' }}
                          onClick={() => setQuarantineModalBatch(batch)}
                        >
                          Quarantine
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Quarantine Modal */}
        {quarantineModalBatch && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '460px', width: '90%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#991b1b', marginBottom: '10px' }}>
                <ShieldAlert size={22} />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Quarantine Batch Stock</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '14px' }}>
                Are you sure you want to isolate <strong>{quarantineModalBatch.currentStockQty} units</strong> of batch <strong>{quarantineModalBatch.batchNumber}</strong> ({quarantineModalBatch.medicineName})?
              </p>

              <div style={{ marginBottom: '16px' }}>
                <label className="form-label">Quarantine Justification</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={quarantineReason}
                  onChange={e => setQuarantineReason(e.target.value)} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setQuarantineModalBatch(null)}>
                  Cancel
                </button>
                <button className="btn btn-primary btn-sm" style={{ background: '#dc2626' }} onClick={handleQuarantineSubmit}>
                  Confirm Quarantine & Deduct Stock
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
