import React, { useState } from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import { 
  Building2, Phone, Mail, MapPin, Plus, 
  ShieldCheck, Star, Clock, Check 
} from 'lucide-react';

export default function SuppliersView({ onShowToast }) {
  const { suppliers, addSupplier } = usePharmacy();
  const [showAddModal, setShowAddModal] = useState(false);
  const [supForm, setSupForm] = useState({
    name: 'PharmaCore Life Sciences Inc.',
    contactPerson: 'Sarah Jenkins',
    phone: '+1 (555) 902-3344',
    email: 'orders@pharmacore.com',
    address: '500 Enterprise Way, Indianapolis, IN 46204',
    drugLicense: 'DL-IN-2026-8812',
    gstin: '18AAACC4410K1Z8',
    paymentTerms: 'Net 30 Days',
    leadTimeDays: 2
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addSupplier(supForm);
    if (onShowToast) onShowToast(`Supplier ${supForm.name} onboarded successfully!`, 'success');
    setShowAddModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Approved Pharmaceutical Suppliers & Vendors</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Vendor contracts, drug manufacturing licenses, GST compliance, credit terms, and performance ratings
            </div>
          </div>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setShowAddModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={15} /> Add New Supplier
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {suppliers.map(sup => (
            <div key={sup.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{sup.name}</h3>
                  <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                    {sup.code}
                  </span>
                  <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                    ● {sup.status}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '18px', marginTop: '8px', fontSize: '0.82rem', color: '#475569', flexWrap: 'wrap' }}>
                  <span>Contact: <strong>{sup.contactPerson}</strong> ({sup.phone})</span>
                  <span>Email: {sup.email}</span>
                  <span>License: <strong>{sup.drugLicense}</strong></span>
                  <span>GSTIN: <code>{sup.gstin}</code></span>
                </div>

                <div style={{ display: 'flex', gap: '18px', marginTop: '6px', fontSize: '0.78rem', color: '#64748b' }}>
                  <span>Payment Terms: <strong>{sup.paymentTerms}</strong></span>
                  <span>Avg Lead Time: <strong>{sup.leadTimeDays} Days</strong></span>
                  <span>Location: {sup.address}</span>
                </div>
              </div>

              <div style={{ textAlign: 'right', minWidth: '140px' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Vendor Rating</div>
                <div style={{ fontWeight: 800, color: '#f59e0b', fontSize: '0.95rem', marginTop: '2px' }}>
                  ★ {sup.rating}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Supplier Modal */}
        {showAddModal && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '540px', width: '90%' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                Onboard Pharmaceutical Supplier
              </h3>

              <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label className="form-label">Company / Distributor Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={supForm.name}
                    onChange={e => setSupForm({ ...supForm, name: e.target.value })}
                    required 
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Contact Person</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={supForm.contactPerson}
                      onChange={e => setSupForm({ ...supForm, contactPerson: e.target.value })}
                      required 
                    />
                  </div>
                  <div>
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={supForm.phone}
                      onChange={e => setSupForm({ ...supForm, phone: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      value={supForm.email}
                      onChange={e => setSupForm({ ...supForm, email: e.target.value })}
                      required 
                    />
                  </div>
                  <div>
                    <label className="form-label">Drug License No.</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={supForm.drugLicense}
                      onChange={e => setSupForm({ ...supForm, drugLicense: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Payment Terms</label>
                    <select 
                      className="form-input" 
                      value={supForm.paymentTerms}
                      onChange={e => setSupForm({ ...supForm, paymentTerms: e.target.value })}
                    >
                      <option value="Net 15 Days">Net 15 Days</option>
                      <option value="Net 30 Days">Net 30 Days</option>
                      <option value="Net 45 Days">Net 45 Days</option>
                      <option value="Immediate / COD">Immediate / COD</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Lead Time (Days)</label>
                    <input 
                      type="number" 
                      min="1" 
                      className="form-input" 
                      value={supForm.leadTimeDays}
                      onChange={e => setSupForm({ ...supForm, leadTimeDays: e.target.value })} 
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Onboard Vendor
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
