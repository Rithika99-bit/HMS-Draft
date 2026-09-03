import React, { useState } from 'react';
import { useEmr } from '../../context/EmrContext';
import { 
  ShieldCheck, Lock, Key, Database, 
  RefreshCw, CheckCircle, AlertTriangle, Download, Server 
} from 'lucide-react';

export default function SuperAdminSecurityAuditView({ onShowToast }) {
  const [backupGenerated, setBackupGenerated] = useState(false);
  const [mfaEnforced, setMfaEnforced] = useState(true);
  const [sessionTimeoutMin, setSessionTimeoutMin] = useState(15);

  const handleGenerateBackup = () => {
    setBackupGenerated(true);
    if (onShowToast) onShowToast('Encrypted EMR Snapshot Backup (2.8 GB) generated and archived to cold cloud storage!', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Security Policies Card */}
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="#4f46e5" />
              <h2 className="dash-card-title">HIPAA Security Policies & Authentication Enforcement</h2>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Configure cryptographic session lifecycles, mandatory Multi-Factor Authentication (MFA), and password complexity
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          
          <div style={{ padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontWeight: 800, fontSize: '0.92rem' }}>Mandatory Multi-Factor Authentication (MFA)</span>
              <input 
                type="checkbox" 
                checked={mfaEnforced}
                onChange={e => {
                  setMfaEnforced(e.target.checked);
                  if (onShowToast) onShowToast(`MFA enforcement set to ${e.target.checked ? 'Enabled' : 'Disabled'}`, 'info');
                }}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>
              Enforces TOTP Authenticator / SMS verification for all clinical and administrative staff logins.
            </p>
          </div>

          <div style={{ padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontWeight: 800, fontSize: '0.92rem' }}>Inactivity Session Timeout</span>
              <select 
                className="form-input" 
                style={{ width: '120px', padding: '4px 8px', fontSize: '0.78rem' }}
                value={sessionTimeoutMin}
                onChange={e => {
                  setSessionTimeoutMin(e.target.value);
                  if (onShowToast) onShowToast(`Session timeout updated to ${e.target.value} minutes`, 'info');
                }}
              >
                <option value="5">5 Minutes</option>
                <option value="15">15 Minutes (HIPAA)</option>
                <option value="30">30 Minutes</option>
                <option value="60">60 Minutes</option>
              </select>
            </div>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>
              Auto-locks clinical workstation terminals when left unattended to prevent unauthorized patient record visibility.
            </p>
          </div>

        </div>
      </div>

      {/* Disaster Recovery & Encrypted Backups Card */}
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={20} color="#0284c7" />
              <h2 className="dash-card-title">Disaster Recovery & Encrypted Snapshot Backups</h2>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Automated geo-redundant database replication and cryptographic point-in-time recovery
            </div>
          </div>
          <button 
            className="btn btn-primary btn-sm"
            onClick={handleGenerateBackup}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Server size={14} />
            <span>Generate Live Backup Snapshot</span>
          </button>
        </div>

        <table className="dash-table">
          <thead>
            <tr>
              <th>Snapshot ID</th>
              <th>Created Timestamp</th>
              <th>Archive Size</th>
              <th>Encryption Algorithm</th>
              <th>Replication Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {backupGenerated && (
              <tr style={{ background: '#f0fdf4' }}>
                <td style={{ fontWeight: 800, color: '#166534' }}>SNAP-2026-LIVE-NOW</td>
                <td>Just now (03 Sep 2026)</td>
                <td><strong>2.84 GB</strong></td>
                <td>AES-256-GCM</td>
                <td>US-East Cold Storage (Encrypted)</td>
                <td>
                  <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                    ✓ Verified & Synced
                  </span>
                </td>
              </tr>
            )}
            <tr>
              <td style={{ fontWeight: 700 }}>SNAP-2026-0902-0400</td>
              <td>02 Sep 2026, 04:00 AM</td>
              <td>2.81 GB</td>
              <td>AES-256-GCM</td>
              <td>US-East + US-West (Dual Region)</td>
              <td>
                <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                  ✓ Archived
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 700 }}>SNAP-2026-0901-0400</td>
              <td>01 Sep 2026, 04:00 AM</td>
              <td>2.79 GB</td>
              <td>AES-256-GCM</td>
              <td>US-East Cold Vault</td>
              <td>
                <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                  ✓ Archived
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
