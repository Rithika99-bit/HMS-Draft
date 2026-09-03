import React, { useState } from 'react';
import { useLab } from '../../context/LabContext';
import { 
  AlertTriangle, ShieldAlert, PhoneCall, CheckCircle, 
  Clock, Check, User, HeartPulse 
} from 'lucide-react';

export default function CriticalPanicAlertsView({ onShowToast }) {
  const { criticalAlerts, acknowledgeCriticalAlert } = useLab();
  const [ackModalAlert, setAckModalAlert] = useState(null);
  const [actionNotes, setActionNotes] = useState('Initiated urgent cardiology bedside evaluation; patient started on IV protocol.');

  const handleAckSubmit = (e) => {
    e.preventDefault();
    if (!ackModalAlert) return;
    acknowledgeCriticalAlert(ackModalAlert.alertId, 'Dr. Sarah Mitchell, MD', actionNotes);
    if (onShowToast) onShowToast(`Critical Panic Alert ${ackModalAlert.alertId} acknowledged with clinical action documented!`, 'success');
    setAckModalAlert(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={20} color="#dc2626" />
              <h2 className="dash-card-title">Laboratory Critical Panic Results Surveillance Board</h2>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Real-time life-threatening panic value monitoring, doctor escalation tracking, and mandatory clinical action documentation
            </div>
          </div>
          <span style={{ background: '#fee2e2', color: '#dc2626', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800 }}>
            {criticalAlerts.length} Panic Events Logged
          </span>
        </div>

        {/* Panic Alerts Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {criticalAlerts.map(alert => {
            const isAck = alert.status.includes('Acknowledged');

            return (
              <div 
                key={alert.alertId}
                style={{ 
                  border: isAck ? '1px solid #bbf7d0' : '2px solid #f87171', 
                  borderRadius: '10px', 
                  padding: '18px', 
                  background: isAck ? '#f0fdf4' : '#fff5f5' 
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: 800, fontSize: '1rem', color: isAck ? '#166534' : '#991b1b' }}>
                        🚨 {alert.analyte}: {alert.reportedValue}
                      </span>
                      <span style={{ 
                        background: isAck ? '#dcfce7' : '#dc2626',
                        color: isAck ? '#15803d' : '#ffffff',
                        padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 
                      }}>
                        {alert.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', marginTop: '6px' }}>
                      Patient: {alert.patientName} <span style={{ color: '#64748b', fontWeight: 400 }}>({alert.patientUhid})</span> • Requisition: <code>{alert.orderId}</code>
                    </div>

                    <div style={{ display: 'flex', gap: '18px', marginTop: '6px', fontSize: '0.8rem', color: '#475569' }}>
                      <span>Attending Clinician: <strong>{alert.doctorName}</strong></span>
                      <span>Reported Time: {alert.reportedAt}</span>
                      <span>Critical Threshold: <strong>{alert.criticalThreshold}</strong></span>
                    </div>

                    {alert.clinicalActionTaken && (
                      <div style={{ marginTop: '10px', background: '#ffffff', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '10px 14px', fontSize: '0.82rem', color: '#166534' }}>
                        <strong>Documented Clinical Action Taken ({alert.acknowledgedAt}):</strong><br />
                        {alert.clinicalActionTaken}
                      </div>
                    )}
                  </div>

                  {!isAck && (
                    <button 
                      className="btn btn-primary btn-sm"
                      style={{ background: '#dc2626', border: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                      onClick={() => setAckModalAlert(alert)}
                    >
                      <PhoneCall size={14} /> Acknowledge & Document Action
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Doctor Acknowledgment Modal */}
        {ackModalAlert && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '520px', width: '90%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#991b1b', marginBottom: '10px' }}>
                <ShieldAlert size={22} />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>
                  Acknowledge Critical Panic Result
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '14px' }}>
                Acknowledging critical panic value for <strong>{ackModalAlert.patientName}</strong> (<strong>{ackModalAlert.analyte} = {ackModalAlert.reportedValue}</strong>). Enter immediate clinical intervention taken.
              </p>

              <form onSubmit={handleAckSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label className="form-label">Immediate Clinical Action & Patient Management Documentation</label>
                  <textarea 
                    rows={3} 
                    className="form-input" 
                    value={actionNotes}
                    onChange={e => setActionNotes(e.target.value)}
                    required 
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setAckModalAlert(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm" style={{ background: '#16a34a' }}>
                    Confirm Acknowledgment & Sign
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
