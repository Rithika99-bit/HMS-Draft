import React, { useState } from 'react';
import { useImaging } from '../../context/ImagingContext';
import ImagingOrdersView from './ImagingOrdersView';
import ImagingSchedulingView from './ImagingSchedulingView';
import {
  Calendar, Clock, Users, FileText, DollarSign, Activity,
  CheckCircle, AlertTriangle, Plus, Search, Eye, Filter, XCircle, Shield
} from 'lucide-react';

export default function RadiologyAdminModule({ onShowToast }) {
  const {
    imagingOrders, imagingReports, imagingInvoices, imagingStaff,
    cancelImagingOrder
  } = useImaging();

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'orders' | 'scheduling' | 'assignments' | 'billing'
  const [cancelModalOrder, setCancelModalOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState('Contraindication / Duplicate Order');

  // KPI Computations
  const totalToday = imagingOrders.length;
  const pendingScheduling = imagingOrders.filter(o => o.status.includes('Pending Scheduling') || o.status.includes('Ordered')).length;
  const scheduledCount = imagingOrders.filter(o => o.status === 'Scheduled').length;
  const pendingReports = imagingOrders.filter(o => o.status.includes('Exam Complete') || o.reportStatus === 'Preliminary').length;
  const completedReports = imagingOrders.filter(o => o.reportStatus === 'Final' || o.status.includes('Report Ready')).length;
  const statCount = imagingOrders.filter(o => o.priority.includes('STAT')).length;

  const totalBilling = imagingInvoices.reduce((sum, inv) => sum + (inv.testsTotal || 0), 0);

  const handleCancelOrder = (e) => {
    e.preventDefault();
    if (!cancelModalOrder) return;
    cancelImagingOrder(cancelModalOrder.orderId, cancelReason, 'Radiology Admin');
    if (onShowToast) onShowToast(`Order ${cancelModalOrder.orderId} cancelled`, 'info');
    setCancelModalOrder(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Admin Module Banner */}
      <div className="dash-card" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={24} color="#7dd3fc" />
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>Radiology Admin & Workflow Operations Center</h2>
            </div>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem', color: '#e0f2fe' }}>
              Manage imaging orders intake, room scheduling, technician & radiologist worklist assignments, and billing.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700 }}>
              Active Orders: {totalToday} ({statCount} STAT)
            </span>
          </div>
        </div>

        {/* Subnav Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '14px', flexWrap: 'wrap' }}>
          {[
            { id: 'dashboard', label: 'Operations Dashboard', icon: Activity },
            { id: 'orders', label: 'Imaging Requisitions', icon: FileText },
            { id: 'scheduling', label: 'Suite & Room Scheduling', icon: Calendar },
            { id: 'assignments', label: 'Staff Workload Assignments', icon: Users },
            { id: 'billing', label: 'Imaging Billing & Claims', icon: DollarSign }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                background: active ? '#ffffff' : 'rgba(255,255,255,0.15)',
                color: active ? '#0369a1' : '#ffffff',
                border: 'none', padding: '8px 16px', borderRadius: '8px',
                fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s'
              }}>
                <Icon size={15} /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 1. OPERATIONS DASHBOARD ────────────────────────────────────────── */}
      {activeTab === 'dashboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* KPI Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div className="dash-card" style={{ borderLeft: '4px solid #0284c7' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Today's Total Orders</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>{totalToday}</div>
              <div style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 600 }}>Across all 4 modalities</div>
            </div>

            <div className="dash-card" style={{ borderLeft: '4px solid #d97706' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Pending Scheduling</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#d97706', margin: '4px 0' }}>{pendingScheduling}</div>
              <div style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 600 }}>Needs room assignment</div>
            </div>

            <div className="dash-card" style={{ borderLeft: '4px solid #16a34a' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Scheduled Scans</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#16a34a', margin: '4px 0' }}>{scheduledCount}</div>
              <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>Ready for Technicians</div>
            </div>

            <div className="dash-card" style={{ borderLeft: '4px solid #7c3aed' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Pending Radiology Reports</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#7c3aed', margin: '4px 0' }}>{pendingReports}</div>
              <div style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: 600 }}>In Radiologist queue</div>
            </div>

            <div className="dash-card" style={{ borderLeft: '4px solid #059669' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Completed & Verified</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669', margin: '4px 0' }}>{completedReports}</div>
              <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>Signed reports released</div>
            </div>
          </div>

          {/* Workflow Monitor Table */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div>
                <h3 className="dash-card-title">Live Imaging Study Workflow Monitor</h3>
                <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  Real-time status tracking from order intake → room scheduling → scan completion → radiologist verification.
                </div>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Order ID / Priority</th>
                    <th>Patient</th>
                    <th>Modality & Study</th>
                    <th>Assigned Tech</th>
                    <th>Assigned Radiologist</th>
                    <th>Workflow Stage</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {imagingOrders.map(order => {
                    const isStat = order.priority.includes('STAT');
                    return (
                      <tr key={order.orderId} style={{ background: isStat ? '#fff5f5' : undefined }}>
                        <td>
                          <div style={{ fontWeight: 800, color: '#0f172a' }}>{order.orderId}</div>
                          <span style={{
                            background: isStat ? '#fee2e2' : '#f1f5f9',
                            color: isStat ? '#dc2626' : '#475569',
                            padding: '1px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800
                          }}>
                            {order.priority}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, color: '#0284c7' }}>{order.patientName}</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{order.patientUhid}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>
                            <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '1px 5px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 800, marginRight: '4px' }}>
                              {order.modality}
                            </span>
                            {order.testName}
                          </div>
                        </td>
                        <td style={{ fontSize: '0.78rem', color: order.assignedTechnician ? '#0f172a' : '#94a3b8' }}>
                          {order.assignedTechnician || '— Unassigned'}
                        </td>
                        <td style={{ fontSize: '0.78rem', color: order.assignedRadiologist ? '#0f172a' : '#94a3b8' }}>
                          {order.assignedRadiologist || '— Unassigned'}
                        </td>
                        <td>
                          <span style={{
                            background: order.status.includes('Ready') || order.status.includes('Final') ? '#dcfce7' : order.status === 'Scheduled' ? '#fef3c7' : '#e0f2fe',
                            color: order.status.includes('Ready') || order.status.includes('Final') ? '#15803d' : order.status === 'Scheduled' ? '#d97706' : '#0284c7',
                            padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800
                          }}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          {order.status !== 'Cancelled / Rejected' && (
                            <button className="btn btn-outline btn-sm" onClick={() => setCancelModalOrder(order)} style={{ fontSize: '0.72rem', padding: '4px 8px', color: '#dc2626', borderColor: '#fca5a5' }}>
                              Cancel / Reject
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── 2. IMAGING ORDERS TAB ────────────────────────────────────────── */}
      {activeTab === 'orders' && (
        <ImagingOrdersView onShowToast={onShowToast} />
      )}

      {/* ── 3. SCHEDULING TAB ────────────────────────────────────────────── */}
      {activeTab === 'scheduling' && (
        <ImagingSchedulingView onShowToast={onShowToast} />
      )}

      {/* ── 4. STAFF ASSIGNMENTS ────────────────────────────────────────── */}
      {activeTab === 'assignments' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h3 className="dash-card-title">Technician & Radiologist Workload Roster</h3>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                Monitor staff assignments, shift schedules, and active modality suites.
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Technicians */}
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#f8fafc' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 800, color: '#0284c7' }}>
                📷 Radiology Technicians ({imagingStaff.technicians.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {imagingStaff.technicians.map(tech => (
                  <div key={tech.id} style={{ background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.85rem' }}>{tech.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Subspeciality: {tech.speciality} • Shift: {tech.shift}</div>
                    <div style={{ fontSize: '0.72rem', color: '#16a34a', marginTop: '4px', fontWeight: 600 }}>
                      Assigned Suites: {tech.assigned.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Radiologists */}
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#f8fafc' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 800, color: '#7c3aed' }}>
                🧠 Radiologists & Signatories ({imagingStaff.radiologists.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {imagingStaff.radiologists.map(rad => (
                  <div key={rad.id} style={{ background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.85rem' }}>{rad.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Specialty: {rad.specialty}</div>
                    <div style={{ fontSize: '0.72rem', color: '#7c3aed', marginTop: '4px', fontWeight: 600 }}>
                      Subspecialty Coverage: {rad.subspecialty}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 5. BILLING & CLAIMS TAB ──────────────────────────────────────── */}
      {activeTab === 'billing' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h3 className="dash-card-title">Imaging Billing & Insurance Claims Workbench</h3>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                Generate imaging charges, track co-pay balances, insurance pre-authorizations, and payment release.
              </div>
            </div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#16a34a' }}>
              Total Billed Today: ${totalBilling.toFixed(2)}
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Invoice ID / Date</th>
                  <th>Patient & UHID</th>
                  <th>Order ID</th>
                  <th>Gross Charge ($)</th>
                  <th>Insurance Coverage ($)</th>
                  <th>Patient Co-pay ($)</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {imagingInvoices.map(inv => (
                  <tr key={inv.invoiceId}>
                    <td>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.82rem' }}>{inv.invoiceId}</div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{inv.date}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0284c7' }}>{inv.patientName}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{inv.patientUhid}</div>
                    </td>
                    <td style={{ fontWeight: 700, fontSize: '0.8rem', color: '#334155' }}>
                      {inv.orderId}
                    </td>
                    <td style={{ fontWeight: 800, color: '#0f172a' }}>
                      ${inv.testsTotal.toFixed(2)}
                    </td>
                    <td style={{ fontWeight: 700, color: '#16a34a' }}>
                      ${inv.insuranceCovered.toFixed(2)}
                    </td>
                    <td style={{ fontWeight: 700, color: '#d97706' }}>
                      ${inv.patientCopayDue.toFixed(2)}
                    </td>
                    <td>
                      <span style={{
                        background: inv.status === 'Paid' ? '#dcfce7' : '#fef3c7',
                        color: inv.status === 'Paid' ? '#15803d' : '#d97706',
                        padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800
                      }}>
                        {inv.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cancel Order Modal */}
      {cancelModalOrder && (
        <div className="modal-overlay" style={{ zIndex: 1200 }}>
          <div className="modal-content-card" style={{ maxWidth: '460px', width: '92%' }}>
            <h3 style={{ margin: '0 0 10px 0', fontWeight: 800, fontSize: '1.1rem', color: '#dc2626' }}>
              Cancel / Reject Imaging Order
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '12px' }}>
              Are you sure you want to cancel order <strong>{cancelModalOrder.orderId}</strong> for <strong>{cancelModalOrder.patientName}</strong>?
            </p>
            <form onSubmit={handleCancelOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label className="form-label">Cancellation Reason</label>
                <select className="form-input" value={cancelReason} onChange={e => setCancelReason(e.target.value)}>
                  <option value="Clinical Contraindication (Contrast / Pregnancy)">Clinical Contraindication (Contrast / Pregnancy)</option>
                  <option value="Duplicate Order Request">Duplicate Order Request</option>
                  <option value="Patient Declined / No-Show">Patient Declined / No-Show</option>
                  <option value="Insurance Authorization Denied">Insurance Authorization Denied</option>
                  <option value="Physician Discontinued Request">Physician Discontinued Request</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setCancelModalOrder(null)}>Dismiss</button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ background: '#dc2626', borderColor: '#dc2626' }}>
                  Confirm Cancellation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
