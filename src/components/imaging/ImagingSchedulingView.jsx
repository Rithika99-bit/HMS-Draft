import React, { useState } from 'react';
import { useImaging } from '../../context/ImagingContext';
import { Calendar, Clock, UserCheck, CheckCircle, Plus } from 'lucide-react';

export default function ImagingSchedulingView({ onShowToast }) {
  const { imagingOrders, imagingStaff, scheduleImagingStudy } = useImaging();
  const [scheduleModal, setScheduleModal] = useState(null);
  const [form, setForm] = useState({
    scheduledDate: 'Today, 03:00 PM',
    scheduledRoom: 'CT Suite A — Siemens SOMATOM',
    technicianId: 'TECH-001',
    radiologistId: 'RAD-001'
  });

  const roomsByModality = {
    'X-Ray': ['DR Suite 1 — GE Definium 6000', 'DR Suite 2 — Siemens Multix'],
    'CT Scan': ['CT Suite A — Siemens SOMATOM', 'CT Suite B — GE Revolution CT'],
    'MRI': ['MRI Scan Room 1 — Philips Ingenia 3.0T', 'MRI Scan Room 2 — Siemens MAGNETOM 1.5T'],
    'Ultrasound': ['US Bay 1 — GE LOGIQ E10', 'US Bay 2 — GE LOGIQ E10', 'Echo Lab — Philips EPIQ CVx']
  };

  const pendingOrders = imagingOrders.filter(o => o.status.includes('Pending Scheduling') || o.status.includes('Ordered'));
  const scheduledOrders = imagingOrders.filter(o => o.status === 'Scheduled');

  const handleSchedule = (e) => {
    e.preventDefault();
    if (!scheduleModal) return;
    scheduleImagingStudy(
      scheduleModal.orderId,
      form.scheduledDate,
      form.scheduledRoom,
      form.technicianId,
      form.radiologistId
    );
    if (onShowToast) onShowToast(`Study scheduled for ${scheduleModal.patientName} on ${form.scheduledDate}!`, 'success');
    setScheduleModal(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Imaging Scheduling & Appointment Management</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Book modality suites, assign technician and radiologist, confirm patient preparation instructions
            </div>
          </div>
        </div>

        {/* Pending Scheduling */}
        {pendingOrders.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 800, color: '#dc2626' }}>
              ⏳ Awaiting Scheduling ({pendingOrders.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {pendingOrders.map(order => (
                <div key={order.orderId} style={{
                  border: order.priority.includes('STAT') ? '2px solid #f87171' : '1px solid #fde68a',
                  borderRadius: '10px', padding: '14px 18px',
                  background: order.priority.includes('STAT') ? '#fff5f5' : '#fffbeb',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 800, color: '#0f172a' }}>{order.orderId}</span>
                      <span style={{
                        background: order.priority.includes('STAT') ? '#dc2626' : '#d97706',
                        color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800
                      }}>{order.priority.includes('STAT') ? '⚡ STAT' : order.priority}</span>
                    </div>
                    <div style={{ fontWeight: 700, color: '#0284c7', marginTop: '4px' }}>{order.patientName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                      <strong>{order.modality}</strong> — {order.testName}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic', marginTop: '2px' }}>
                      Indication: {order.clinicalIndication}
                    </div>
                  </div>
                  <button className="btn btn-primary btn-sm"
                    onClick={() => { setScheduleModal(order); setForm(f => ({ ...f, scheduledRoom: (roomsByModality[order.modality] || [])[0] || '' })); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem' }}>
                    <Calendar size={13} /> Schedule Study
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scheduled Today */}
        {scheduledOrders.length > 0 && (
          <div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
              📅 Scheduled Studies ({scheduledOrders.length})
            </h3>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Patient</th>
                  <th>Study</th>
                  <th>Scheduled Time</th>
                  <th>Room / Suite</th>
                  <th>Technician</th>
                  <th>Radiologist</th>
                  <th>Patient Prep</th>
                </tr>
              </thead>
              <tbody>
                {scheduledOrders.map(order => {
                  const test = null; // Prep from test master
                  return (
                    <tr key={order.orderId}>
                      <td style={{ fontWeight: 800, color: '#0f172a', fontFamily: 'monospace', fontSize: '0.82rem' }}>{order.orderId}</td>
                      <td>
                        <div style={{ fontWeight: 700, color: '#0284c7' }}>{order.patientName}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{order.patientUhid}</div>
                      </td>
                      <td>
                        <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, marginRight: 4 }}>{order.modality}</span>
                        <span style={{ fontSize: '0.82rem' }}>{order.testName}</span>
                      </td>
                      <td style={{ fontWeight: 700, color: '#16a34a', fontSize: '0.85rem' }}>{order.scheduledDate}</td>
                      <td style={{ fontSize: '0.78rem', color: '#334155' }}>{order.scheduledRoom}</td>
                      <td style={{ fontSize: '0.78rem', color: '#475569' }}>{order.assignedTechnician}</td>
                      <td style={{ fontSize: '0.78rem', color: '#475569' }}>{order.assignedRadiologist}</td>
                      <td style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        {order.contrastUsed !== 'None' ? '⚠️ Contrast' : '✓ No prep'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      {scheduleModal && (
        <div className="modal-overlay" style={{ zIndex: 1200 }}>
          <div className="modal-content-card" style={{ maxWidth: '520px', width: '92%' }}>
            <h3 style={{ margin: '0 0 10px 0', fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>
              Schedule Imaging Study
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '14px' }}>
              Scheduling <strong>{scheduleModal.testName}</strong> for patient <strong>{scheduleModal.patientName}</strong>
            </p>
            <form onSubmit={handleSchedule} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label className="form-label">Appointment Date & Time</label>
                <input type="text" className="form-input" value={form.scheduledDate}
                  onChange={e => setForm({ ...form, scheduledDate: e.target.value })} required />
              </div>
              <div>
                <label className="form-label">Modality Room / Suite</label>
                <select className="form-input" value={form.scheduledRoom} onChange={e => setForm({ ...form, scheduledRoom: e.target.value })}>
                  {(roomsByModality[scheduleModal.modality] || []).map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">Assign Technician</label>
                  <select className="form-input" value={form.technicianId} onChange={e => setForm({ ...form, technicianId: e.target.value })}>
                    {imagingStaff.technicians.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Assign Radiologist</label>
                  <select className="form-input" value={form.radiologistId} onChange={e => setForm({ ...form, radiologistId: e.target.value })}>
                    {imagingStaff.radiologists.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setScheduleModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Confirm Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
