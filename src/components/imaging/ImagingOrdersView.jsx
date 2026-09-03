import React, { useState } from 'react';
import { useImaging } from '../../context/ImagingContext';
import { ListOrdered, Search, Plus, Zap, Clock, CheckCircle } from 'lucide-react';

export default function ImagingOrdersView({ onShowToast }) {
  const { imagingOrders, testMaster, createImagingOrder } = useImaging();
  const [searchTerm, setSearchTerm] = useState('');
  const [modalityFilter, setModalityFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);

  const [form, setForm] = useState({
    patientName: 'Sarah Connor', patientUhid: 'UHID-MED-2026-08942',
    patientAge: 38, patientGender: 'Female',
    testCode: 'IMG-CT-CHEST-05', priority: 'Routine',
    clinicalIndication: 'Routine follow-up imaging', drName: 'Dr. Sarah Mitchell, MD'
  });

  const modalities = ['all', 'X-Ray', 'CT Scan', 'MRI', 'Ultrasound'];
  const priorities = ['all', 'STAT (Emergency)', 'Urgent', 'Routine'];

  const filtered = imagingOrders.filter(o => {
    const matchSearch = [o.orderId, o.patientName, o.testName, o.modality, o.prescribingDoctor]
      .some(v => v?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchModality = modalityFilter === 'all' || o.modality === modalityFilter;
    const matchPriority = priorityFilter === 'all' || o.priority === priorityFilter;
    return matchSearch && matchModality && matchPriority;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    const test = testMaster.find(t => t.testCode === form.testCode);
    createImagingOrder({ ...form });
    if (onShowToast) onShowToast(`Imaging order created: ${test?.testName} for ${form.patientName}!`, 'success');
    setShowNewOrderModal(false);
  };

  const statusColor = (status) => {
    if (status.includes('Report Ready') || status.includes('Final')) return { bg: '#dcfce7', color: '#15803d' };
    if (status.includes('Exam Complete')) return { bg: '#e0f2fe', color: '#0284c7' };
    if (status.includes('Scheduled')) return { bg: '#fef3c7', color: '#d97706' };
    return { bg: '#f1f5f9', color: '#64748b' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Imaging Orders Intake & Tracking Workbench</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              All modality orders — X-Ray, CT, MRI, Ultrasound — with STAT priority triage and full lifecycle tracking
            </div>
          </div>
          <button className="btn btn-primary btn-sm"
            onClick={() => setShowNewOrderModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Plus size={14} /> New Imaging Requisition
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={15} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="text" className="form-input" placeholder="Search by order ID, patient, test name or doctor..."
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ paddingLeft: '36px' }} />
          </div>
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
            {modalities.map(m => (
              <button key={m} onClick={() => setModalityFilter(m)} style={{
                padding: '5px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                border: modalityFilter === m ? '1px solid #0284c7' : '1px solid #e2e8f0',
                background: modalityFilter === m ? '#0284c7' : '#ffffff',
                color: modalityFilter === m ? '#ffffff' : '#475569'
              }}>{m === 'all' ? 'All Modalities' : m}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            {priorities.map(p => (
              <button key={p} onClick={() => setPriorityFilter(p)} style={{
                padding: '5px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                border: priorityFilter === p ? '1px solid #dc2626' : '1px solid #e2e8f0',
                background: priorityFilter === p ? '#dc2626' : '#ffffff',
                color: priorityFilter === p ? '#ffffff' : '#475569'
              }}>{p === 'all' ? 'All Priorities' : p.replace(' (Emergency)', '')}</button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Order ID / Date</th>
                <th>Patient</th>
                <th>Modality & Study</th>
                <th>Priority</th>
                <th>Prescribing Doctor</th>
                <th>Scheduled</th>
                <th>Report Status</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => {
                const isStat = order.priority.includes('STAT');
                const sc = statusColor(order.status);
                return (
                  <tr key={order.orderId} style={{ background: isStat ? '#fff5f5' : undefined }}>
                    <td>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.85rem' }}>{order.orderId}</div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{order.orderDate}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0284c7' }}>{order.patientName}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{order.patientUhid} ({order.patientAge}y/{order.patientGender})</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                        <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '1px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, marginRight: '6px' }}>
                          {order.modality}
                        </span>
                        {order.testName}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', fontStyle: 'italic', marginTop: '2px' }}>{order.bodyRegion}</div>
                    </td>
                    <td>
                      <span style={{
                        background: isStat ? '#fee2e2' : order.priority === 'Urgent' ? '#fef3c7' : '#f1f5f9',
                        color: isStat ? '#dc2626' : order.priority === 'Urgent' ? '#d97706' : '#475569',
                        padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800
                      }}>
                        {isStat ? '⚡ ' : ''}{order.priority}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>{order.prescribingDoctor}</td>
                    <td style={{ fontSize: '0.78rem', color: order.scheduledDate ? '#16a34a' : '#94a3b8' }}>
                      {order.scheduledDate || '— Not Scheduled'}
                    </td>
                    <td>
                      <span style={{
                        background: order.reportStatus === 'Final' ? '#dcfce7' : order.reportStatus === 'Preliminary' ? '#e0f2fe' : '#fef3c7',
                        color: order.reportStatus === 'Final' ? '#15803d' : order.reportStatus === 'Preliminary' ? '#0284c7' : '#d97706',
                        padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700
                      }}>
                        {order.reportStatus}
                      </span>
                    </td>
                    <td>
                      <span style={{ background: sc.bg, color: sc.color, padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* New Order Modal */}
        {showNewOrderModal && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '540px', width: '92%' }}>
              <h3 style={{ margin: '0 0 14px 0', fontWeight: 800, fontSize: '1.15rem', color: '#0f172a' }}>
                New Imaging Requisition Order
              </h3>
              <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Patient Name</label>
                    <input type="text" className="form-input" value={form.patientName}
                      onChange={e => setForm({ ...form, patientName: e.target.value })} required />
                  </div>
                  <div>
                    <label className="form-label">Patient UHID</label>
                    <input type="text" className="form-input" value={form.patientUhid}
                      onChange={e => setForm({ ...form, patientUhid: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <label className="form-label">Imaging Study / Test</label>
                  <select className="form-input" value={form.testCode} onChange={e => setForm({ ...form, testCode: e.target.value })}>
                    {testMaster.map(t => (
                      <option key={t.testCode} value={t.testCode}>
                        [{t.modality}] {t.testName} — ${t.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Priority</label>
                    <select className="form-input" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                      <option value="Routine">Routine</option>
                      <option value="Urgent">Urgent</option>
                      <option value="STAT (Emergency)">STAT — Emergency</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Ordering Doctor</label>
                    <input type="text" className="form-input" value={form.drName}
                      onChange={e => setForm({ ...form, drName: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="form-label">Clinical Indication</label>
                  <input type="text" className="form-input" value={form.clinicalIndication}
                    onChange={e => setForm({ ...form, clinicalIndication: e.target.value })} required />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowNewOrderModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary btn-sm">Issue Imaging Requisition</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
