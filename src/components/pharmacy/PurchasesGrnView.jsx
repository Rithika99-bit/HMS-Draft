import React, { useState } from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import { 
  Package, ShoppingCart, Plus, Check, RotateCw, 
  FileText, ShieldCheck, ArrowRight, Truck 
} from 'lucide-react';

export default function PurchasesGrnView({ onShowToast }) {
  const { purchaseOrders, suppliers, medicines, createPurchaseOrder, receiveGrn, createPurchaseReturn } = usePharmacy();
  const [showPoModal, setShowPoModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);

  // New PO Form
  const [poForm, setPoForm] = useState({
    supplierId: 'SUP-101',
    supplierName: 'Apex Healthcare Distributors Ltd.',
    selectedMedId: 'MED-M03',
    orderQty: 200
  });

  // Purchase Return Form
  const [returnForm, setReturnForm] = useState({
    medicineId: 'MED-M03',
    batchNumber: 'CEF-C99182',
    returnQty: 20,
    reason: 'Damaged glass vials during transit',
    supplierName: 'MedLife Wholesale Pharma Logistics'
  });

  const handleCreatePo = (e) => {
    e.preventDefault();
    const med = medicines.find(m => m.id === poForm.selectedMedId);
    const totalAmount = (med?.unitCost || 4.50) * poForm.orderQty;

    createPurchaseOrder({
      supplierId: poForm.supplierId,
      supplierName: poForm.supplierName,
      totalAmount,
      items: [
        { medicineId: poForm.selectedMedId, name: med?.brandName || 'Drug', orderQty: poForm.orderQty, unitCost: med?.unitCost || 4.50, total: totalAmount }
      ]
    });

    if (onShowToast) onShowToast(`Purchase Order created for ${poForm.orderQty} units of ${med?.brandName}!`, 'success');
    setShowPoModal(false);
  };

  const handleReceive = (poId) => {
    receiveGrn(poId, {}, 'Dr. Kevin Okafor, PharmD');
    if (onShowToast) onShowToast(`Goods Received Note generated for ${poId}! Stock updated & movement logged.`, 'success');
  };

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    createPurchaseReturn(
      returnForm.medicineId,
      returnForm.batchNumber,
      parseInt(returnForm.returnQty, 10),
      returnForm.reason,
      returnForm.supplierName,
      'Dr. Kevin Okafor, PharmD'
    );
    if (onShowToast) onShowToast(`Vendor Purchase Return (Debit Note) logged for ${returnForm.returnQty} units!`, 'warning');
    setShowReturnModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Purchases, Goods Received Notes (GRN) & Vendor Returns</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Create Purchase Orders, verify received consignments into inventory with GRN, and issue Debit Notes for purchase returns
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => setShowReturnModal(true)}
              style={{ color: '#dc2626', borderColor: '#fca5a5' }}
            >
              Vendor Purchase Return
            </button>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setShowPoModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Plus size={15} /> Create Purchase Order
            </button>
          </div>
        </div>

        {/* PO Table */}
        <table className="dash-table">
          <thead>
            <tr>
              <th>PO Number & Date</th>
              <th>Supplier / Vendor</th>
              <th>Ordered Items & Qty</th>
              <th>Total Value</th>
              <th>Status / GRN</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map(po => {
              const isReceived = po.status.includes('Received');
              return (
                <tr key={po.poId}>
                  <td>
                    <div style={{ fontWeight: 800, color: '#0f172a' }}>{po.poId}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{po.date}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0284c7' }}>{po.supplierName}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{po.supplierId}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem' }}>
                      {po.items.map(i => `${i.name} (${i.orderQty} units)`).join(', ')}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 800, color: '#16a34a' }}>
                      ${po.totalAmount.toFixed(2)}
                    </span>
                  </td>
                  <td>
                    <span style={{ 
                      background: isReceived ? '#dcfce7' : '#fef3c7',
                      color: isReceived ? '#15803d' : '#d97706',
                      padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 
                    }}>
                      {po.status}
                    </span>
                    {po.grnId && (
                      <div style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: 600, marginTop: '2px' }}>
                        GRN: {po.grnId}
                      </div>
                    )}
                  </td>
                  <td>
                    {!isReceived ? (
                      <button 
                        className="btn btn-primary btn-sm"
                        style={{ fontSize: '0.75rem', padding: '4px 10px', background: '#16a34a', border: 'none' }}
                        onClick={() => handleReceive(po.poId)}
                      >
                        Receive Goods (GRN)
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Check size={13} /> Stock Synced
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Create PO Modal */}
        {showPoModal && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '520px', width: '90%' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                Create New Purchase Order (PO)
              </h3>

              <form onSubmit={handleCreatePo} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label className="form-label">Vendor / Supplier</label>
                  <select 
                    className="form-input" 
                    value={poForm.supplierId}
                    onChange={e => {
                      const sup = suppliers.find(s => s.id === e.target.value);
                      setPoForm({ ...poForm, supplierId: e.target.value, supplierName: sup?.name });
                    }}
                  >
                    {suppliers.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Drug to Order</label>
                  <select 
                    className="form-input" 
                    value={poForm.selectedMedId}
                    onChange={e => setPoForm({ ...poForm, selectedMedId: e.target.value })}
                  >
                    {medicines.map(m => (
                      <option key={m.id} value={m.id}>{m.brandName} (${m.unitCost}/unit)</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Order Quantity (Units)</label>
                  <input 
                    type="number" 
                    min="10" 
                    className="form-input" 
                    value={poForm.orderQty}
                    onChange={e => setPoForm({ ...poForm, orderQty: parseInt(e.target.value, 10) })} 
                    required 
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowPoModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Issue Purchase Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Vendor Purchase Return Modal */}
        {showReturnModal && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '480px', width: '90%' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.15rem', fontWeight: 800, color: '#991b1b' }}>
                Issue Vendor Purchase Return (Debit Note)
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '14px' }}>
                Deduct damaged or rejected consignments and issue a vendor debit note.
              </p>

              <form onSubmit={handleReturnSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label className="form-label">Medicine</label>
                  <select 
                    className="form-input" 
                    value={returnForm.medicineId}
                    onChange={e => setReturnForm({ ...returnForm, medicineId: e.target.value })}
                  >
                    {medicines.map(m => (
                      <option key={m.id} value={m.id}>{m.brandName}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Batch Number</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={returnForm.batchNumber}
                      onChange={e => setReturnForm({ ...returnForm, batchNumber: e.target.value })}
                      required 
                    />
                  </div>
                  <div>
                    <label className="form-label">Return Qty (Units)</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={returnForm.returnQty}
                      onChange={e => setReturnForm({ ...returnForm, returnQty: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Return Reason</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={returnForm.reason}
                    onChange={e => setReturnForm({ ...returnForm, reason: e.target.value })} 
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowReturnModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm" style={{ background: '#dc2626' }}>
                    Confirm Return & Deduct Stock
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
