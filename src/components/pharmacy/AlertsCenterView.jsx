import React, { useState } from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import { 
  AlertTriangle, ShieldAlert, Clock, ShoppingCart, 
  Check, RefreshCw, Sparkles, Filter 
} from 'lucide-react';

export default function AlertsCenterView({ onShowToast }) {
  const { medicines, batches, createPurchaseOrder, quarantineBatch } = usePharmacy();
  const [alertTypeTab, setAlertTypeTab] = useState('low-stock'); // 'low-stock' | 'expiry'

  const lowStockDrugs = medicines.filter(m => m.currentStock <= m.reorderLevel);
  const expiringBatches = batches.filter(b => b.status.includes('Critical') || b.status.includes('Warning'));

  const handleQuickPo = (med) => {
    createPurchaseOrder({
      supplierId: 'SUP-101',
      supplierName: 'Apex Healthcare Distributors Ltd.',
      totalAmount: med.unitCost * 200,
      items: [
        { medicineId: med.id, name: med.brandName, orderQty: 200, unitCost: med.unitCost, total: med.unitCost * 200 }
      ]
    });
    if (onShowToast) onShowToast(`Purchase Order generated for 200 units of ${med.brandName}!`, 'success');
  };

  const handleQuarantine = (batch) => {
    quarantineBatch(batch.batchId, 'Near expiry radar alert action', 'Dr. Kevin Okafor, PharmD');
    if (onShowToast) onShowToast(`Batch ${batch.batchNumber} moved to quarantine!`, 'warning');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Pharmacy Clinical & Inventory Surveillance Radar</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Real-time monitoring of low-stock thresholds, safety stock violations, and FEFO near-expiry radar alerts
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
          <button
            onClick={() => setAlertTypeTab('low-stock')}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              border: alertTypeTab === 'low-stock' ? '2px solid #d97706' : '1px solid #e2e8f0',
              background: alertTypeTab === 'low-stock' ? '#fffbeb' : '#ffffff',
              color: alertTypeTab === 'low-stock' ? '#b45309' : '#475569',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <AlertTriangle size={15} />
            <span>Low-Stock & Reorder Alerts ({lowStockDrugs.length})</span>
          </button>

          <button
            onClick={() => setAlertTypeTab('expiry')}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              border: alertTypeTab === 'expiry' ? '2px solid #dc2626' : '1px solid #e2e8f0',
              background: alertTypeTab === 'expiry' ? '#fef2f2' : '#ffffff',
              color: alertTypeTab === 'expiry' ? '#b91c1c' : '#475569',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Clock size={15} />
            <span>Expiry Surveillance Radar ({expiringBatches.length})</span>
          </button>
        </div>

        {/* Tab 1: Low Stock Alerts */}
        {alertTypeTab === 'low-stock' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {lowStockDrugs.map(med => {
              const shortfall = med.reorderLevel - med.currentStock;
              return (
                <div key={med.id} style={{ border: '1px solid #fde68a', background: '#fffbeb', borderRadius: '10px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#92400e' }}>{med.brandName}</h3>
                      <span style={{ background: '#fee2e2', color: '#dc2626', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
                        ● Deficit: {shortfall} Units
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '18px', marginTop: '6px', fontSize: '0.8rem', color: '#78350f' }}>
                      <span>Current Stock: <strong style={{ color: '#dc2626', fontSize: '0.9rem' }}>{med.currentStock} Units</strong></span>
                      <span>Reorder Threshold: <strong>{med.reorderLevel} Units</strong></span>
                      <span>Safety Buffer: <strong>{med.safetyStock} Units</strong></span>
                      <span>Classification: {med.categoryName}</span>
                    </div>
                  </div>

                  <button 
                    className="btn btn-primary btn-sm"
                    style={{ background: '#d97706', border: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                    onClick={() => handleQuickPo(med)}
                  >
                    <ShoppingCart size={14} /> 1-Click PO (200 Units)
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Expiry Radar */}
        {alertTypeTab === 'expiry' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {expiringBatches.map(batch => (
              <div key={batch.batchId} style={{ border: '1px solid #fecaca', background: '#fef2f2', borderRadius: '10px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#991b1b' }}>{batch.medicineName}</h3>
                    <span style={{ background: '#dc2626', color: '#ffffff', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
                      Batch: {batch.batchNumber}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '18px', marginTop: '6px', fontSize: '0.8rem', color: '#7f1d1d' }}>
                    <span>Expiry Date: <strong style={{ color: '#dc2626' }}>{batch.expiryDate}</strong></span>
                    <span>Units at Risk: <strong>{batch.currentStockQty} Units</strong></span>
                    <span>Location: {batch.rackLocation}</span>
                    <span>Supplier: {batch.supplierName}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    className="btn btn-primary btn-sm"
                    style={{ background: '#dc2626', border: 'none' }}
                    onClick={() => handleQuarantine(batch)}
                  >
                    Quarantine Stock
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
