import React, { useState } from 'react';
import { useEmr } from '../../context/EmrContext';
import { 
  ShieldCheck, FileText, CheckCircle, AlertTriangle, 
  X, Check, Lock, Sparkles, Key 
} from 'lucide-react';

export default function PatientConsentsView({ onShowToast }) {
  const { patientRecord, signConsent, revokeConsent } = useEmr();
  const [signingConsent, setSigningConsent] = useState(null);
  const [otpCode, setOtpCode] = useState('8492');
  const [revokingConsent, setRevokingConsent] = useState(null);
  const [revokeReason, setRevokeReason] = useState('');

  const handleSignSubmit = () => {
    if (!signingConsent) return;
    signConsent(signingConsent.id, patientRecord.demographics.fullName, 'SMS OTP Verified');
    if (onShowToast) onShowToast(`Successfully signed consent: "${signingConsent.title}"`, 'success');
    setSigningConsent(null);
  };

  const handleRevokeSubmit = () => {
    if (!revokingConsent) return;
    revokeConsent(revokingConsent.id, revokeReason || 'Patient withdrawal', patientRecord.demographics.fullName);
    if (onShowToast) onShowToast(`Consent form ${revokingConsent.id} revoked.`, 'info');
    setRevokingConsent(null);
    setRevokeReason('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Electronic Consents & Legal Authorizations</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Review informed medical consents, provide legally binding e-signatures via OTP, and manage authorization history
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {patientRecord.documentsAndConsent.map(doc => {
            const isSigned = doc.status.includes('Signed') || doc.status.includes('Active') || doc.status.includes('Executed');
            const isRevoked = doc.status.includes('Revoked');

            return (
              <div key={doc.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px', background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{doc.title}</h3>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                      Category: <strong>{doc.category}</strong> • Validity: {doc.validity}
                    </div>
                  </div>
                  <span style={{ background: isRevoked ? '#fee2e2' : isSigned ? '#dcfce7' : '#fef3c7', color: isRevoked ? '#dc2626' : isSigned ? '#15803d' : '#d97706', padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {doc.status}
                  </span>
                </div>

                <p style={{ margin: '8px 0 12px 0', fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                  {doc.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    Signatory: <strong>{doc.signatory}</strong> • Date: {doc.signedDate}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {isSigned && !isRevoked && (
                      <button 
                        className="btn btn-outline btn-sm"
                        style={{ color: '#dc2626', borderColor: '#fca5a5', fontSize: '0.75rem' }}
                        onClick={() => setRevokingConsent(doc)}
                      >
                        Revoke Consent
                      </button>
                    )}

                    {!isSigned && !isRevoked && (
                      <button 
                        className="btn btn-primary btn-sm"
                        style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                        onClick={() => setSigningConsent(doc)}
                      >
                        <ShieldCheck size={14} /> E-Sign Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* E-Sign OTP Modal Dialog */}
        {signingConsent && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '460px', width: '90%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <ShieldCheck size={24} color="#16a34a" />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                  Electronic Signature Verification
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '14px' }}>
                You are executing legal informed consent for: <strong>{signingConsent.title}</strong>
              </p>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
                <label className="form-label" style={{ fontWeight: 700 }}>Enter SMS OTP (Simulated: 8492)</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={otpCode}
                    onChange={e => setOtpCode(e.target.value)}
                    style={{ textAlign: 'center', fontSize: '1.1rem', letterSpacing: '4px', fontWeight: 800 }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setSigningConsent(null)}>
                  Cancel
                </button>
                <button className="btn btn-primary btn-sm" onClick={handleSignSubmit}>
                  Verify OTP & Sign
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Revoke Consent Modal Dialog */}
        {revokingConsent && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '460px', width: '90%' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.15rem', fontWeight: 800, color: '#991b1b' }}>
                Revoke Consent Authorization
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '14px' }}>
                Are you sure you want to revoke: <strong>{revokingConsent.title}</strong>?
              </p>
              <div style={{ marginBottom: '16px' }}>
                <label className="form-label">Reason for Revocation</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Change of treatment plan, privacy preference"
                  value={revokeReason}
                  onChange={e => setRevokeReason(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setRevokingConsent(null)}>
                  Cancel
                </button>
                <button className="btn btn-primary btn-sm" style={{ background: '#dc2626' }} onClick={handleRevokeSubmit}>
                  Confirm Revocation
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
