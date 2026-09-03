import React, { useState } from 'react';
import { useLab } from '../../context/LabContext';
import { 
  FileText, Search, Plus, Filter, AlertTriangle, 
  Clock, CheckCircle, User, Zap, Activity 
} from 'lucide-react';

export default function LabOrdersWorkbenchView({ onNavigate, onShowToast }) {
  const { labOrders, testMaster, createLabOrder } = useLab();
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);

  // New Order Form
  const [orderForm, setOrderForm] = useState({
    patientUhid: 'UHID-MED-2026-08942',
    patientName: 'Sarah Connor',
    patientAge: 38,
    patientGender: 'Female',
    selectedTestCode: 'LAB-CMP-01',
    clinicalIndication: 'Pre-operative screening and electrolyte review',
    priority: 'Routine',
    drName: 'Dr. Sarah Mitchell, MD'
  });

  const handleCreateOrder = (e) => {
    e.preventDefault();
    const testObj = testMaster.find(t => t.testCode === orderForm.selectedTestCode);
    createLabOrder({
      patientUhid: orderForm.patientUhid,
      patientName: orderForm.patientName,
      patientAge: orderForm.patientAge,
      patientGender: orderForm.patientGender,
      tests: [testObj || testMaster[0]],
      clinicalIndication: orderForm.clinicalIndication,
      priority: orderForm.priority,
      drName: orderForm.drName
    });

    if (onShowToast) onShowToast(`Lab order created for ${orderForm.patientName} (${testObj?.testName || 'Test'})!`, 'success');
    setShowNewOrderModal(false);
  };

  const filteredOrders = labOrders.filter(o => {
    const matchSearch = o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.prescribingDoctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.tests.some(t => (t.testName || t.name).toLowerCase().includes(searchTerm.toLowerCase()));
    const matchPriority = priorityFilter === 'all' || o.priority.toLowerCase().includes(priorityFilter.toLowerCase());
    return matchSearch && matchPriority;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Laboratory Orders Intake & Processing Workbench</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Central requisition stream from Outpatient, Inpatient, and Emergency departments with STAT priority triage
            </div>
          </div>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setShowNewOrderModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={15} /> Requisition New Lab Order
          </button>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search by Order ID, patient, test name, or doctor..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['all', 'STAT', 'Urgent', 'Routine'].map(p => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: priorityFilter === p ? '1px solid #0284c7' : '1px solid #e2e8f0',
                  background: priorityFilter === p ? '#0284c7' : '#ffffff',
                  color: priorityFilter === p ? '#ffffff' : '#475569',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {p === 'all' ? 'All Priorities' : p}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Order ID & Date</th>
                <th>Patient Details</th>
                <th>Priority</th>
                <th>Ordered Diagnostic Tests</th>
                <th>Prescribing Clinician</th>
                <th>Accession & Barcode</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => {
                const isStat = order.priority.includes('STAT');
                const isVerified = order.status.includes('Verified');

                return (
                  <tr key={order.orderId} style={{ background: isStat && !isVerified ? '#fef2f2' : undefined }}>
                    <td>
                      <div style={{ fontWeight: 800, color: '#0f172a' }}>{order.orderId}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{order.orderDate}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0284c7' }}>{order.patientName}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{order.patientUhid} ({order.patientAge}y/{order.patientGender})</div>
                    </td>
                    <td>
                      <span style={{ 
                        background: isStat ? '#fee2e2' : order.priority === 'Urgent' ? '#fef3c7' : '#f1f5f9',
                        color: isStat ? '#dc2626' : order.priority === 'Urgent' ? '#d97706' : '#475569',
                        padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 
                      }}>
                        {isStat && '⚡ '} {order.priority}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                        {order.tests.map(t => t.testName || t.name).join(', ')}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', fontStyle: 'italic' }}>
                        Indication: {order.clinicalIndication}
                      </div>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
                      {order.prescribingDoctor}
                    </td>
                    <td>
                      <div style={{ fontSize: '0.78rem', fontFamily: 'monospace', fontWeight: 700, color: '#0f172a' }}>
                        {order.barcodeNumber}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{order.accessionNumber}</div>
                    </td>
                    <td>
                      <span style={{ 
                        background: isVerified ? '#dcfce7' : order.status.includes('Collected') ? '#e0f2fe' : '#fef3c7',
                        color: isVerified ? '#15803d' : order.status.includes('Collected') ? '#0284c7' : '#d97706',
                        padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 
                      }}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* New Lab Order Modal */}
        {showNewOrderModal && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '520px', width: '90%' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                Requisition New Diagnostic Lab Order
              </h3>

              <form onSubmit={handleCreateOrder} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Patient Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={orderForm.patientName}
                      onChange={e => setOrderForm({ ...orderForm, patientName: e.target.value })}
                      required 
                    />
                  </div>
                  <div>
                    <label className="form-label">Patient UHID</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={orderForm.patientUhid}
                      onChange={e => setOrderForm({ ...orderForm, patientUhid: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Diagnostic Test / Panel</label>
                  <select 
                    className="form-input" 
                    value={orderForm.selectedTestCode}
                    onChange={e => setOrderForm({ ...orderForm, selectedTestCode: e.target.value })}
                  >
                    {testMaster.map(t => (
                      <option key={t.testCode} value={t.testCode}>{t.testName} (${t.price}) - {t.category}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Order Priority</label>
                    <select 
                      className="form-input" 
                      value={orderForm.priority}
                      onChange={e => setOrderForm({ ...orderForm, priority: e.target.value })}
                    >
                      <option value="Routine">Routine (Turnaround 2-4h)</option>
                      <option value="Urgent">Urgent (Turnaround 1-2h)</option>
                      <option value="STAT (Emergency)">STAT - Emergency (Immediate 30m)</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Ordering Doctor</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={orderForm.drName}
                      onChange={e => setOrderForm({ ...orderForm, drName: e.target.value })} 
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Clinical Indication & Diagnosis</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={orderForm.clinicalIndication}
                    onChange={e => setOrderForm({ ...orderForm, clinicalIndication: e.target.value })} 
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowNewOrderModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Issue Lab Requisition
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
