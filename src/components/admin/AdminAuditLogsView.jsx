import React, { useState } from 'react';
import { useEmr } from '../../context/EmrContext';
import { 
  ShieldCheck, Search, Filter, Download, 
  Eye, CheckCircle, AlertTriangle, Key, Activity 
} from 'lucide-react';

export default function AdminAuditLogsView({ onShowToast }) {
  const { auditLedger } = useEmr();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredLogs = auditLedger.filter(log => {
    const matchSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === 'all' || log.role.toLowerCase().includes(roleFilter.toLowerCase());
    return matchSearch && matchRole;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Hospital Audit Trail & Compliance Ledger</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Immutable real-time record of clinical modifications, record access, authentication events, and HIPAA compliance
            </div>
          </div>
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => { if (onShowToast) onShowToast('Exported encrypted CSV audit trail for compliance review.', 'success'); }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Download size={14} />
            <span>Export Audit Trail (CSV)</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search audit trail by user, action, UHID, or details..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['all', 'doctor', 'patient', 'admin', 'superadmin'].map(r => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: roleFilter === r ? '1px solid #2563eb' : '1px solid #e2e8f0',
                  background: roleFilter === r ? '#2563eb' : '#ffffff',
                  color: roleFilter === r ? '#ffffff' : '#475569',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  cursor: 'pointer'
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Audit Log Table */}
        <table className="dash-table">
          <thead>
            <tr>
              <th>Audit ID & Time</th>
              <th>Actor User</th>
              <th>Role</th>
              <th>Action Code</th>
              <th>Target Record</th>
              <th>Details & Context</th>
              <th>IP / Endpoint</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr key={log.id}>
                <td>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{log.id}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{log.timestamp}</div>
                </td>
                <td style={{ fontWeight: 700 }}>{log.user}</td>
                <td>
                  <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                    {log.role}
                  </span>
                </td>
                <td>
                  <code style={{ fontSize: '0.75rem', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#0f172a' }}>
                    {log.action}
                  </code>
                </td>
                <td style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 600 }}>{log.target}</td>
                <td style={{ fontSize: '0.8rem', color: '#334155' }}>{log.details}</td>
                <td style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace' }}>{log.ipAddress}</td>
                <td>
                  <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
