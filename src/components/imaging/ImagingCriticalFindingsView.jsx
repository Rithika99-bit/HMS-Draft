import React, { useState } from 'react';
import { useImaging } from '../../context/ImagingContext';
import { ShieldAlert, PhoneCall, CheckCircle } from 'lucide-react';

export default function ImagingCriticalFindingsView({ onShowToast }) {
  const { criticalFindings, acknowledgeCriticalFinding } = useImaging();
  const [ackModal, setAckModal] = useState(null);
  const [clinicalAction, setClinicalAction] = useState('Initiated emergency neurosurgery consultation. Patient transferred to Neurocritical ICU. CT Angiography ordered.');

  const handleAck = (e) => {
    e.preventDefault();
    if (!ackModal) return;
    acknowledgeCriticalFinding(ackModal.findingId, 'Dr. Sarah Mitchell, MD', clinicalAction);
    if (onShowToast) onShowToast(`Critical imaging finding acknowledged! Clinical action documented.`, 'success');
    setAckModal(null);
  };

  const pendingCount = criticalFindings.filter(f => f.status.includes('Pending')).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={20} color="#dc2626" />
              <h2 className="dash-card-title">Critical Imaging Findings Surveillance Board</h2>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Life-threatening radiological findings requiring immediate clinical action — pneumothorax, SAH, PE, intracranial hemorrhage
            </div>
          </div>
          {pendingCount > 0 && (
            <div style={{ background: '#dc2626', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800 }}>
              🚨 {pendingCount} Unacknowledged
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {criticalFindings.map(finding => {
            const isAck = finding.status.includes('Acknowledged');
            return (
              <div key={finding.findingId} style={{
                border: isAck ? '1px solid #bbf7d0' : '2px solid #f87171',
                borderRadius: '12px', padding: '18px 20px',
                background: isAck ? '#f0fdf4' : '#fff5f5'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 800, fontSize: '1rem', color: isAck ? '#166534' : '#991b1b' }}>
                        🚨 {finding.modality} Critical Finding
                      </span>
                      <span style={{
                        background: isAck ? '#dcfce7' : '#dc2626',
                        color: isAck ? '#15803d' : '#ffffff',
                        padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800
                      }}>
                        {finding.status}
                      </span>
                      <span style={{ background: '#fee2e2', color: '#dc2626', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                        {finding.severity}
                      </span>
                    </div>

                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '6px' }}>
                      Patient: {finding.patientName}
                      <span style={{ color: '#64748b', fontWeight: 400, fontSize: '0.8rem' }}> ({finding.patientUhid})</span>
                      &nbsp;|&nbsp; Order: <code style={{ fontSize: '0.8rem' }}>{finding.orderId}</code>
                    </div>

                    <div style={{
                      background: isAck ? '#dcfce7' : '#fee2e2',
                      border: `1px solid ${isAck ? '#86efac' : '#fca5a5'}`,
                      borderRadius: '8px', padding: '10px 14px',
                      fontSize: '0.85rem', color: isAck ? '#166534' : '#991b1b', fontWeight: 700, marginBottom: '8px'
                    }}>
                      {finding.finding}
                    </div>

                    <div style={{ display: 'flex', gap: '20px', fontSize: '0.78rem', color: '#64748b' }}>
                      <span>Attending Doctor: <strong>{finding.doctorName}</strong></span>
                      <span>Reported by: <strong>{finding.reportedBy}</strong></span>
                      <span>Time: <strong>{finding.reportedAt}</strong></span>
                    </div>

                    {finding.clinicalActionTaken && (
                      <div style={{ marginTop: '10px', background: '#ffffff', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '10px 14px', fontSize: '0.82rem', color: '#166534' }}>
                        <strong>Clinical Action Documented ({finding.acknowledgedAt}):</strong><br />
                        {finding.clinicalActionTaken}
                      </div>
                    )}
                  </div>

                  {!isAck && (
                    <button className="btn btn-primary btn-sm"
                      style={{ background: '#dc2626', border: 'none', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}
                      onClick={() => setAckModal(finding)}>
                      <PhoneCall size={14} /> Acknowledge & Document
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {criticalFindings.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
              <CheckCircle size={36} color="#16a34a" style={{ marginBottom: '10px' }} />
              <h4 style={{ margin: '0 0 6px 0', fontWeight: 700 }}>No Critical Findings</h4>
              <p style={{ fontSize: '0.82rem', margin: 0 }}>No critical imaging findings at this time.</p>
            </div>
          )}
        </div>
      </div>

      {/* Acknowledge Modal */}
      {ackModal && (
        <div className="modal-overlay" style={{ zIndex: 1200 }}>
          <div className="modal-content-card" style={{ maxWidth: '520px', width: '92%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#991b1b', marginBottom: '10px' }}>
              <ShieldAlert size={22} />
              <h3 style={{ margin: 0, fontWeight: 800 }}>Acknowledge Critical Imaging Finding</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '14px' }}>
              Acknowledging: <strong>{ackModal.finding}</strong> for patient <strong>{ackModal.patientName}</strong>
            </p>
            <form onSubmit={handleAck} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label className="form-label">Immediate Clinical Action Taken</label>
                <textarea rows={3} className="form-input" value={clinicalAction}
                  onChange={e => setClinicalAction(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setAckModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ background: '#16a34a', border: 'none' }}>
                  Confirm Acknowledgment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
