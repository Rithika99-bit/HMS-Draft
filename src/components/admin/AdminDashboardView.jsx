import React from 'react';
import { useEmr } from '../../context/EmrContext';
import { 
  Building2, Users, Calendar, Activity, 
  ShieldCheck, AlertTriangle, CheckCircle, Bed, 
  TrendingUp, Clock, FileText, Stethoscope 
} from 'lucide-react';

export default function AdminDashboardView({ onNavigate, onShowToast }) {
  const { auditLedger, usersList, orgConfig } = useEmr();

  const alertIcon = (type) => {
    if (type === 'warning') return <AlertTriangle size={18} color="#d97706" />;
    if (type === 'success') return <CheckCircle size={18} color="#10b981" />;
    return <Activity size={18} color="#0284c7" />;
  };

  const alertBg = (type) => {
    if (type === 'warning') return { background: '#fffbeb', border: '1px solid #fde68a' };
    if (type === 'success') return { background: '#f0fdf4', border: '1px solid #bbf7d0' };
    return { background: '#f0f9ff', border: '1px solid #bae6fd' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 4 Operations KPI Cards */}
      <div className="dash-stats-grid">
        <div className="dash-stat-card" style={{ borderLeft: '4px solid #2563eb' }}>
          <div className="dash-stat-label">Total Inpatient Census</div>
          <div className="dash-stat-val">284 Patients</div>
          <div className="dash-stat-sub">378 / 450 Beds Active (84.2%)</div>
        </div>

        <div className="dash-stat-card" style={{ borderLeft: '4px solid #10b981' }}>
          <div className="dash-stat-label">OPD Encounters Today</div>
          <div className="dash-stat-val" style={{ color: '#059669' }}>312 Tokens</div>
          <div className="dash-stat-sub">18 Active Consultation Suites</div>
        </div>

        <div className="dash-stat-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
          <div className="dash-stat-label">Active Hospital Staff</div>
          <div className="dash-stat-val" style={{ color: '#7c3aed' }}>
            {usersList.length * 18} Active
          </div>
          <div className="dash-stat-sub">38 Doctors • 84 Nurses • 42 Staff</div>
        </div>

        <div className="dash-stat-card" style={{ borderLeft: '4px solid #f59e0b' }}>
          <div className="dash-stat-label">Insurance Claims Flow</div>
          <div className="dash-stat-val" style={{ color: '#d97706' }}>$128,450</div>
          <div className="dash-stat-sub">99.4% Electronic Auto-Settlement</div>
        </div>
      </div>

      {/* Grid: Department Census & Live Real-Time Events */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
        
        {/* Department Utilization Table */}
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">Hospital Department Utilization & Capacity</h2>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Live departmental bed occupancy and clinician on-call status</div>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => onNavigate('doctor-staff')}>
              Manage Rosters
            </button>
          </div>

          <table className="dash-table">
            <thead>
              <tr>
                <th>Department & Specialty</th>
                <th>Department Head</th>
                <th>Bed Allocation</th>
                <th>Doctors Active</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orgConfig.departments.map(dept => (
                <tr key={dept.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{dept.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{dept.id}</div>
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>{dept.head}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: '#0284c7' }}>{dept.beds} Beds</span>
                  </td>
                  <td>{dept.activeDoctors} MDs</td>
                  <td>
                    <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                      ● Operational
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Real-time System Audit & Operational Stream */}
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h3 className="dash-card-title">Real-Time Operational Feed</h3>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Live audit events across all hospital desks</div>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => onNavigate('audit-logs')}>
              Full Audit
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {auditLedger.slice(0, 5).map(log => (
              <div key={log.id} style={{ padding: '10px 12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{log.action}</span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{log.timestamp}</span>
                </div>
                <div style={{ color: '#475569', fontSize: '0.78rem' }}>{log.details}</div>
                <div style={{ fontSize: '0.72rem', color: '#0284c7', marginTop: '2px' }}>
                  User: {log.user} ({log.role})
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
