import React, { useState } from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import { 
  ShoppingCart, Search, Plus, Trash2, Check, 
  Printer, ArrowLeft, RefreshCw, CreditCard, DollarSign 
} from 'lucide-react';

export default function PharmacyPosView({ onShowToast }) {
  const { medicines, processPosSale, processSaleReturn, posSales } = usePharmacy();
  const [customerName, setCustomerName] = useState('Eleanor Vance (Walk-In)');
  const [customerPhone, setCustomerPhone] = useState('+1 (555) 456-7890');
  const [paymentMode, setPaymentMode] = useState('Credit Card (Visa)');
  const [cart, setCart] = useState([
    { medicineId: 'MED-M01', brandName: 'Zestril (Lisinopril 10mg)', qty: 30, unitMrp: 0.28, gstTaxSlab: '12%', batchNumber: 'LIS-B89201' },
    { medicineId: 'MED-M02', brandName: 'Lipitor (Atorvastatin 20mg)', qty: 30, unitMrp: 1.20, gstTaxSlab: '12%', batchNumber: 'ATO-P44102' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastCompletedInvoice, setLastCompletedInvoice] = useState(null);

  // Return dialog state
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnInvoiceId, setReturnInvoiceId] = useState('POS-2026-8941');
  const [returnQty, setReturnQty] = useState(10);
  const [returnReason, setReturnReason] = useState('Unopened blister pack return with receipt');

  const addToCart = (med) => {
    const existing = cart.find(c => c.medicineId === med.id);
    if (existing) {
      setCart(cart.map(c => c.medicineId === med.id ? { ...c, qty: c.qty + 10 } : c));
    } else {
      setCart([...cart, {
        medicineId: med.id,
        brandName: med.brandName,
        qty: 10,
        unitMrp: med.unitMrp,
        gstTaxSlab: med.gstTaxSlab,
        batchNumber: `BAT-${med.code}-01`
      }]);
    }
  };

  const removeFromCart = (medId) => {
    setCart(cart.filter(c => c.medicineId !== medId));
  };

  // Totals calculation
  const subtotal = cart.reduce((acc, item) => acc + (item.qty * item.unitMrp), 0);
  const gstTax = subtotal * 0.12; // 12% standard pharma GST
  const discount = subtotal * 0.05; // 5% hospital loyalty discount
  const grandTotal = subtotal + gstTax - discount;

  const handleCheckout = () => {
    if (cart.length === 0) {
      if (onShowToast) onShowToast('Cart is empty. Add drugs to cart before checkout.', 'warning');
      return;
    }

    const saleResult = processPosSale({
      customerName,
      customerPhone,
      paymentMode,
      totalGross: subtotal,
      gstTaxAmount: gstTax,
      discountAmount: discount,
      netPaid: grandTotal,
      items: cart
    }, 'Dr. Kevin Okafor, PharmD');

    setLastCompletedInvoice(saleResult);
    if (onShowToast) onShowToast(`Invoice ${saleResult.invoiceId} generated ($${grandTotal.toFixed(2)} paid)! Stock deducted.`, 'success');
    setCart([]);
  };

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    processSaleReturn(
      returnInvoiceId, 
      'MED-M01', 
      'LIS-B89201', 
      parseInt(returnQty, 10), 
      (returnQty * 0.28).toFixed(2), 
      'Eleanor Vance', 
      'Dr. Kevin Okafor, PharmD'
    );
    if (onShowToast) onShowToast(`Sales return processed for ${returnQty} units. Stock restocked & movement logged!`, 'success');
    setShowReturnModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Outpatient Pharmacy Point of Sale (POS) Counter</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Direct retail dispensing, tax calculation, thermal invoice generation, and customer sales return workflows
            </div>
          </div>
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => setShowReturnModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <RefreshCw size={14} />
            <span>Process Sales Return</span>
          </button>
        </div>

        {/* POS Grid: Drug Catalog Picker + Active Bill Cart */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.6fr', gap: '20px' }}>
          
          {/* Left Column: Drug Quick Picker */}
          <div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
              Drug Quick Selector
            </h3>

            <div style={{ position: 'relative', marginBottom: '14px' }}>
              <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                className="form-input" 
                placeholder="Search drug to add to cart..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '36px' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '420px', overflowY: 'auto' }}>
              {medicines.filter(m => m.brandName.toLowerCase().includes(searchTerm.toLowerCase()) || m.genericName.toLowerCase().includes(searchTerm.toLowerCase())).map(med => (
                <div key={med.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>{med.brandName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      MRP: <strong style={{ color: '#16a34a' }}>${med.unitMrp}/tab</strong> • Stock: <strong>{med.currentStock} Units</strong>
                    </div>
                  </div>
                  <button 
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                    onClick={() => addToCart(med)}
                  >
                    + Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Checkout Cart & Bill Calculation */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
              Active Bill & Checkout Cart ({cart.length} Items)
            </h3>

            {/* Customer Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
              <div>
                <label className="form-label">Customer / Patient Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Payment Mode</label>
                <select 
                  className="form-input" 
                  value={paymentMode}
                  onChange={e => setPaymentMode(e.target.value)}
                >
                  <option value="Credit Card (Visa)">Credit Card (Visa / MC)</option>
                  <option value="Cash">Cash Counter</option>
                  <option value="Health Insurance Direct">Health Insurance Direct</option>
                  <option value="UPI / QR Digital">UPI / QR Digital</option>
                </select>
              </div>
            </div>

            {/* Cart Items Table */}
            <table className="dash-table" style={{ background: '#ffffff', marginBottom: '14px' }}>
              <thead>
                <tr>
                  <th>Drug Item</th>
                  <th>Qty</th>
                  <th>Rate ($)</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.medicineId}>
                    <td style={{ fontWeight: 700, fontSize: '0.85rem' }}>{item.brandName}</td>
                    <td>
                      <input 
                        type="number" 
                        min="1" 
                        style={{ width: '60px', padding: '3px', borderRadius: '4px', border: '1px solid #cbd5e1', textAlign: 'center' }}
                        value={item.qty}
                        onChange={e => {
                          const val = parseInt(e.target.value, 10) || 1;
                          setCart(cart.map(c => c.medicineId === item.medicineId ? { ...c, qty: val } : c));
                        }}
                      />
                    </td>
                    <td>${item.unitMrp}</td>
                    <td style={{ fontWeight: 800, color: '#0f172a' }}>${(item.qty * item.unitMrp).toFixed(2)}</td>
                    <td>
                      <button 
                        onClick={() => removeFromCart(item.medicineId)}
                        style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Bill Summary Breakdown */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px', marginBottom: '16px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#64748b' }}>Gross Subtotal:</span>
                <span style={{ fontWeight: 700 }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#64748b' }}>Pharma GST (12%):</span>
                <span style={{ fontWeight: 700, color: '#0284c7' }}>+${gstTax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Hospital Privilege Discount (5%):</span>
                <span style={{ fontWeight: 700, color: '#16a34a' }}>-${discount.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #0f172a', paddingTop: '8px', fontSize: '1.1rem', fontWeight: 800 }}>
                <span>Net Total Payable:</span>
                <span style={{ color: '#15803d' }}>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              className="btn btn-primary btn-sm"
              style={{ width: '100%', padding: '10px', fontSize: '0.95rem', background: '#16a34a', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onClick={handleCheckout}
            >
              <Check size={18} /> Complete Sale & Print Tax Receipt
            </button>
          </div>

        </div>

        {/* Customer Return Modal Dialog */}
        {showReturnModal && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '480px', width: '90%' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                Process Customer Medicine Return
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '14px' }}>
                Returned medicines with verified intact tamper-evident seals can be restocked into inventory.
              </p>

              <form onSubmit={handleReturnSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label className="form-label">Original POS Invoice ID</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={returnInvoiceId}
                    onChange={e => setReturnInvoiceId(e.target.value)}
                    required 
                  />
                </div>

                <div>
                  <label className="form-label">Return Quantity (Units)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={returnQty}
                    onChange={e => setReturnQty(e.target.value)}
                    required 
                  />
                </div>

                <div>
                  <label className="form-label">Reason for Return</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={returnReason}
                    onChange={e => setReturnReason(e.target.value)} 
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowReturnModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Process Return & Restock
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
