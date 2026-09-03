import React from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import { 
  Pill, AlertTriangle, Clock, TrendingUp, 
  ShoppingCart, ArrowRight, CheckCircle, Package, 
  RotateCw, ShieldAlert, Sparkles, Building2, Droplets 
} from 'lucide-react';

export default function PharmacyDashboardView({ onNavigate, onShowToast }) {
  const { medicines, batches, prescriptions, stockMovements, posSales, createPurchaseOrder } = usePharmacy();

  // Calculations
  const totalStockUnits = medicines.reduce((acc, m) => acc + m.currentStock, 0);
  const totalValuationCost = medicines.reduce((acc, m) => acc + (m.currentStock * m.unitCost), 0);
  const totalValuationMrp = medicines.reduce((acc, m) => acc + (m.currentStock * m.unitMrp), 0);
  const pendingRxCount = prescriptions.filter(p => p.status.includes('Pending') || p.status.includes('Ready')).length;
  const lowStockCount = medicines.filter(m => m.currentStock <= m.reorderLevel).length;
  const nearExpiryCount = batches.filter(b => b.status.includes('Warning') || b.status.includes('Critical')).length;

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 4 Core Financial & Inventory KPI Cards */}
      <div className="dash-stats-grid">
        <div className="dash-stat-card" style={{ borderLeft: '4px solid #16a34a' }}>
          <div className="dash-stat-label">Total Inventory Valuation</div>
          <div className="dash-stat-val" style={{ color: '#15803d' }}>${totalValuationCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div className="dash-stat-sub">Retail (MRP): ${totalValuationMrp.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} • {totalStockUnits} Units</div>
        </div>

        <div className="dash-stat-card" style={{ borderLeft: '4px solid #0284c7' }}>
          <div className="dash-stat-label">Doctor E-Prescriptions</div>
          <div className="dash-stat-val" style={{ color: '#0369a1' }}>{pendingRxCount} Pending</div>
          <div className="dash-stat-sub">Synced live with shared EMR chart</div>
        </div>

        <div className="dash-stat-card" style={{ borderLeft: '4px solid #f59e0b' }}>
          <div className="dash-stat-label">Low-Stock Reorder Alerts</div>
          <div className="dash-stat-val" style={{ color: '#d97706' }}>{lowStockCount} Drugs</div>
          <div className="dash-stat-sub">Below safety threshold • Action needed</div>
        </div>

        <div className="dash-stat-card" style={{ borderLeft: '4px solid #dc2626' }}>
          <div className="dash-stat-label">Near-Expiry Batches (&lt;90 Days)</div>
          <div className="dash-stat-val" style={{ color: '#b91c1c' }}>{nearExpiryCount} Batches</div>
          <div className="dash-stat-sub">FEFO Priority Dispensing Active</div>
        </div>
      </div>

      {/* Main Grid: Live Rx Queue & Alerts/Movements Stream */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
        
        {/* Left Column: Live Prescriptions Dispensing Queue */}
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">Live Doctor E-Prescription Dispensing Queue</h2>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Verified electronic prescriptions awaiting pharmacist dispensation</div>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => onNavigate('dispense')}>
              Full Queue ({prescriptions.length})
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {prescriptions.slice(0, 3).map(rx => (
              <div key={rx.rxId} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>{rx.rxId}</span>
                    <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700 }}>
                      {rx.patientName} ({rx.patientAge}y/{rx.patientGender})
                    </span>
                    <span style={{ background: rx.status === 'Dispensed' ? '#dcfce7' : '#fef3c7', color: rx.status === 'Dispensed' ? '#15803d' : '#d97706', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700 }}>
                      {rx.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#16a34a', marginTop: '4px' }}>
                    {rx.items.map(i => `${i.drug} (Qty: ${i.qty})`).join(' • ')}
                  </div>

                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
                    Prescriber: {rx.prescriber} • {rx.date}
                  </div>
                </div>

                <button 
                  className="btn btn-primary btn-sm"
                  style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                  onClick={() => onNavigate('dispense')}
                >
                  {rx.status === 'Dispensed' ? 'View Details' : 'Process Dispense'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Low Stock Items & Recent Traceable Movements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Low Stock Quick PO Card */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={18} color="#d97706" />
                <h3 className="dash-card-title">Low Stock Immediate Replenishment</h3>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {medicines.filter(m => m.currentStock <= m.reorderLevel).map(med => (
                <div key={med.id} style={{ border: '1px solid #fde68a', background: '#fffbeb', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#92400e' }}>{med.brandName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#78350f' }}>
                      Stock: <strong style={{ color: '#dc2626' }}>{med.currentStock} Units</strong> (Min: {med.reorderLevel})
                    </div>
                  </div>
                  <button 
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: '0.75rem', padding: '4px 8px', background: '#d97706', border: 'none' }}
                    onClick={() => handleQuickPo(med)}
                  >
                    Raise PO
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Traceable Stock Movements Snapshot */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RotateCw size={18} color="#0284c7" />
                <h3 className="dash-card-title">Live Stock Movements Stream</h3>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => onNavigate('movements')}>
                All Movements
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {stockMovements.slice(0, 4).map(sm => (
                <div key={sm.movementId} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 12px', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <span style={{ fontWeight: 800, color: '#0f172a' }}>{sm.medicineName}</span>
                    <span style={{ 
                      fontWeight: 800, 
                      color: sm.qtyChange > 0 ? '#16a34a' : '#dc2626',
                      background: sm.qtyChange > 0 ? '#dcfce7' : '#fee2e2',
                      padding: '1px 6px',
                      borderRadius: '4px',
                      fontSize: '0.75rem'
                    }}>
                      {sm.qtyChange > 0 ? `+${sm.qtyChange}` : sm.qtyChange} Units
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {sm.movementType} • Ref: {sm.referenceDoc} • Bal: <strong>{sm.newBalance}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
