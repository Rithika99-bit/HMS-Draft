import React, { useState } from 'react';
import { useLab } from '../../context/LabContext';
import { Shield, Search, Clock, FileText } from 'lucide-react';

export default function LisAuditTrailView() {
  const { lisAuditTrail } = useLab();
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  const actionTypes = ['all', 'ORDER_CREATED', 'SAMPLE_COLLECTED', 'SAMPLE_REJECTED', 'RESULT_ENTERED', 'ANALYZER_IMPORT', 'RESULT_VALIDATION_SIGN', 'RESULT_AMENDED', 'CRITICAL_ACKNOWLEDGED'];

  const filtered = lisAuditTrail.filter(entry => {
    const matchSearch =
      entry.auditId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entry.orderId && entry.orderId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      entry.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchAction = actionFilter === 'all' || entry.action === actionFilter;
    return matchSearch && matchAction;
  });

  const actionBadgeStyle = (action) => {
    const styles = {
      ORDER_CREATED: { bg: '#e0f2fe', color: '#0284c7' },
      SAMPLE_COLLECTED: { bg: '#f0fdf4', color: '#16a34a' },
      SAMPLE_REJECTED: { bg: '#fee2e2', color: '#dc2626' },
      RESULT_ENTERED: { bg: '#f5f3ff', color: '#7c3aed' },
      ANALYZER_IMPORT: { bg: '#e0f2fe', color: '#0284c7' },
      RESULT_VALIDATION_SIGN: { bg: '#dcfce7', color: '#15803d' },
      RESULT_AMENDED: { bg: '#fef3c7', color: '#b45309' },
      CRITICAL_ACKNOWLEDGED: { bg: '#fee2e2', color: '#dc2626' },
      TEST_MASTER_ADDED: { bg: '#f0fdf4', color: '#16a34a' },
    };
    return styles[action] || { bg: '#f1f5f9', color: '#64748b' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={20} color="#7c3aed" />
              <h2 className="dash-card-title">LIS Immutable Audit Trail & Amendment Ledger</h2>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              HIPAA-compliant, tamper-proof chronological log of all LIS actions — orders, results, pathologist sign-offs, amendments, and critical acknowledgments
            </div>
          </div>
          <span style={{ background: '#f5f3ff', color: '#7c3aed', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800 }}>
            {lisAuditTrail.length} Events Logged
          </span>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search size={15} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              placeholder="Search audit events by user, order ID, or action details..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>
          <select
            className="form-input"
            style={{ width: '220px' }}
            value={actionFilter}
            onChange={e => setActionFilter(e.target.value)}
          >
            {actionTypes.map(a => (
              <option key={a} value={a}>{a === 'all' ? 'All Action Types' : a.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>

        {/* Audit Trail */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map((entry, idx) => {
            const badge = actionBadgeStyle(entry.action);
            return (
              <div key={entry.auditId}
                style={{
                  border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 16px',
                  background: '#ffffff', display: 'flex', gap: '14px', alignItems: 'flex-start'
                }}
              >
                {/* Timeline Dot */}
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: badge.color, flexShrink: 0, marginTop: '5px'
                }} />

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#0f172a', fontFamily: 'monospace' }}>
                      {entry.auditId}
                    </span>
                    <span style={{
                      background: badge.bg, color: badge.color,
                      padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700
                    }}>
                      {entry.action?.replace(/_/g, ' ')}
                    </span>
                    {entry.orderId && entry.orderId !== 'N/A' && (
                      <span style={{ background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }}>
                        Order: {entry.orderId}
                      </span>
                    )}
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginLeft: 'auto' }}>
                      <Clock size={11} style={{ display: 'inline', marginRight: 3 }} />
                      {entry.timestamp}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#334155', marginBottom: '4px' }}>
                    {entry.details}
                  </div>

                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    <strong>{entry.user}</strong> · {entry.role}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
