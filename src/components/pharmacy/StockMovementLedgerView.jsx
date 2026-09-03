import React, { useState } from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import { 
  RotateCw, Search, Download, Filter, 
  ArrowUpRight, ArrowDownLeft, ShieldCheck, CheckCircle 
} from 'lucide-react';

export default function StockMovementLedgerView({ onShowToast }) {
  const { stockMovements } = usePharmacy();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredMovements = stockMovements.filter(sm => {
    const matchSearch = sm.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sm.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sm.referenceDoc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sm.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sm.actor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = typeFilter === 'all' || sm.movementType.toLowerCase().includes(typeFilter.toLowerCase());
    return matchSearch && matchType;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RotateCw size={20} color="#16a34a" />
              <h2 className="dash-card-title">Traceable Stock Movement Engine (SME) Ledger</h2>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Immutable audit ledger recording every single stock-affecting transaction (GRN Inflow, Dispensing, POS, Transfers, Returns, Adjustments)
            </div>
          </div>
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => { if (onShowToast) onShowToast('Exported complete traceable stock movement CSV log.', 'success'); }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Download size={14} />
            <span>Export Stock Ledger (CSV)</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search by drug name, batch, reference ID (RX/PO/POS), actor, or reason..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['all', 'DISPENSE', 'PURCHASE', 'POS', 'TRANSFER', 'ADJUSTMENT'].map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: typeFilter === t ? '1px solid #16a34a' : '1px solid #e2e8f0',
                  background: typeFilter === t ? '#16a34a' : '#ffffff',
                  color: typeFilter === t ? '#ffffff' : '#475569',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  cursor: 'pointer'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Traceable Movement Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Movement ID & Time</th>
                <th>Drug & Batch</th>
                <th>Movement Type</th>
                <th>Qty Change</th>
                <th>Stock Balance</th>
                <th>Source → Destination</th>
                <th>Reference Doc</th>
                <th>Actor & Reason</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovements.map(sm => {
                const isPositive = sm.qtyChange > 0;
                return (
                  <tr key={sm.movementId}>
                    <td>
                      <div style={{ fontWeight: 800, color: '#0f172a' }}>{sm.movementId}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{sm.timestamp}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0284c7' }}>{sm.medicineName}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Batch: {sm.batchNumber}</div>
                    </td>
                    <td>
                      <span style={{ 
                        background: sm.movementType.includes('IN') ? '#dcfce7' : sm.movementType.includes('OUT') ? '#fee2e2' : '#f1f5f9',
                        color: sm.movementType.includes('IN') ? '#15803d' : sm.movementType.includes('OUT') ? '#dc2626' : '#475569',
                        padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 
                      }}>
                        {sm.movementType}
                      </span>
                    </td>
                    <td>
                      <span style={{ 
                        fontWeight: 800, 
                        fontSize: '0.88rem',
                        color: isPositive ? '#16a34a' : '#dc2626' 
                      }}>
                        {isPositive ? `+${sm.qtyChange}` : sm.qtyChange} Units
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{sm.newBalance} Units</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Prev: {sm.previousBalance}</div>
                    </td>
                    <td style={{ fontSize: '0.78rem', color: '#475569' }}>
                      <strong>{sm.sourceLocation}</strong><br />
                      ↓ {sm.destLocation}
                    </td>
                    <td>
                      <code style={{ fontSize: '0.75rem', background: '#e0f2fe', color: '#0284c7', padding: '2px 6px', borderRadius: '4px' }}>
                        {sm.referenceDoc}
                      </code>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{sm.actor}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{sm.reason}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
