import React, { useState } from 'react';
import { useImaging } from '../../context/ImagingContext';
import { MonitorCheck, CheckCircle, Camera } from 'lucide-react';

export default function TechnicianWorklistView({ onShowToast }) {
  const { imagingOrders, markExamComplete } = useImaging();
  const [techName, setTechName] = useState('RT James Vance, ARRT');
  const [techNoteModal, setTechNoteModal] = useState(null);
  const [techNote, setTechNote] = useState('Acquisition completed without complications. Images transferred to PACS.');

  const scheduledOrders = imagingOrders.filter(o => o.status === 'Scheduled');
  const inProgressOrders = imagingOrders.filter(o => o.status.includes('Exam Complete'));

  const handleComplete = (e) => {
    e.preventDefault();
    if (!techNoteModal) return;
    markExamComplete(techNoteModal.orderId, techNote, techName);
    if (onShowToast) onShowToast(`Exam complete for ${techNoteModal.patientName}! Images sent to PACS.`, 'success');
    setTechNoteModal(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Radiology Technician Worklist & Acquisition Console</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Study acquisition queue, patient positioning notes, contrast protocols, and PACS image transfer confirmation
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Active Technician:</span>
            <input type="text" className="form-input" style={{ width: '220px', padding: '4px 8px', fontSize: '0.78rem' }}
              value={techName} onChange={e => setTechName(e.target.value)} />
          </div>
        </div>

        {/* Active Queue */}
        <h3 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
          Active Acquisition Queue — {scheduledOrders.length} Studies
        </h3>
        {scheduledOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
            <MonitorCheck size={32} style={{ marginBottom: '8px' }} />
            <p style={{ fontSize: '0.85rem' }}>No studies currently scheduled. Check back after scheduling is confirmed.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {scheduledOrders.map(order => (
              <div key={order.orderId} style={{
                border: order.priority.includes('STAT') ? '2px solid #f87171' : '1px solid #e2e8f0',
                borderRadius: '10px', padding: '16px 18px', background: '#ffffff',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 800, color: '#0f172a' }}>{order.orderId}</span>
                    <span style={{
                      background: order.priority.includes('STAT') ? '#fee2e2' : '#fef3c7',
                      color: order.priority.includes('STAT') ? '#dc2626' : '#d97706',
                      padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800
                    }}>{order.priority}</span>
                    <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                      {order.modality}
                    </span>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>
                    {order.patientName} <span style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 400 }}>({order.patientAge}y / {order.patientGender})</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 700, marginTop: '3px' }}>{order.testName}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '3px' }}>
                    Room: <strong>{order.scheduledRoom}</strong> &nbsp;|&nbsp; Time: <strong>{order.scheduledDate}</strong>
                  </div>
                  {order.contrastUsed && order.contrastUsed !== 'None' && (
                    <div style={{ marginTop: '6px', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '6px', padding: '6px 10px', fontSize: '0.78rem', color: '#92400e', fontWeight: 700 }}>
                      ⚠️ Contrast Required: {order.contrastUsed}
                    </div>
                  )}
                  <div style={{ marginTop: '6px', fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic' }}>
                    Indication: {order.clinicalIndication}
                  </div>
                </div>
                <button className="btn btn-primary btn-sm"
                  style={{ background: '#16a34a', border: 'none', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', flexShrink: 0 }}
                  onClick={() => setTechNoteModal(order)}>
                  <Camera size={14} /> Mark Exam Complete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Completed Today */}
        {inProgressOrders.length > 0 && (
          <>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 800, color: '#16a34a' }}>
              ✅ Completed — Pending Radiologist ({inProgressOrders.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {inProgressOrders.map(order => (
                <div key={order.orderId} style={{
                  border: '1px solid #bbf7d0', borderRadius: '8px', padding: '12px 16px',
                  background: '#f0fdf4', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div>
                    <span style={{ fontWeight: 800, color: '#0f172a', marginRight: '8px' }}>{order.orderId}</span>
                    <strong style={{ color: '#0284c7' }}>{order.patientName}</strong>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', marginLeft: '8px' }}>{order.testName}</span>
                  </div>
                  <div style={{ display: 'flex', items: 'center', gap: '8px' }}>
                    <CheckCircle size={16} color="#16a34a" />
                    <span style={{ fontSize: '0.78rem', color: '#15803d', fontWeight: 700 }}>
                      Images Transferred to PACS
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Exam Complete Modal */}
        {techNoteModal && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '480px', width: '90%' }}>
              <h3 style={{ margin: '0 0 10px 0', fontWeight: 800, color: '#0f172a' }}>
                Mark Examination Complete
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '14px' }}>
                Confirming acquisition for <strong>{techNoteModal.testName}</strong> — Patient: <strong>{techNoteModal.patientName}</strong>
              </p>
              <form onSubmit={handleComplete} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label className="form-label">Technician Acquisition Notes</label>
                  <textarea rows={3} className="form-input" value={techNote}
                    onChange={e => setTechNote(e.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setTechNoteModal(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary btn-sm" style={{ background: '#16a34a', border: 'none' }}>
                    <CheckCircle size={13} style={{ display: 'inline', marginRight: 4 }} />
                    Confirm Exam Complete & Transfer to PACS
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
