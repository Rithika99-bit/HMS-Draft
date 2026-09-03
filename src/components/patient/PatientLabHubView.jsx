import React, { useState } from 'react';
import { useLab } from '../../context/LabContext';
import {
  FlaskConical, Clock, CheckCircle, Download, Droplet,
  AlertCircle, TrendingUp, Receipt, ChevronDown, ChevronUp
} from 'lucide-react';

export default function PatientLabHubView({ onShowToast }) {
  const { labOrders, labResults, labInvoices, criticalAlerts } = useLab();
  const [expandedOrder, setExpandedOrder] = useState(null);

  // In a real app these would be filtered to the logged-in patient
  const myOrders = labOrders;
  const myInvoices = labInvoices;
  const myAlerts = criticalAlerts;

  const handleDownloadReport = (orderId, patientName) => {
    if (onShowToast) onShowToast(`Preparing your certified lab report (${orderId}) for download...`, 'info');
  };

  const handlePayInvoice = (invoiceId) => {
    if (onShowToast) onShowToast(`Redirecting to secure payment gateway for invoice ${invoiceId}...`, 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Critical Alerts for Patient */}
      {myAlerts.some(a => a.status.includes('Pending')) && (
        <div style={{
          background: '#fef2f2', border: '2px solid #f87171', borderRadius: '12px',
          padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px'
        }}>
          <AlertCircle size={24} color="#dc2626" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 800, color: '#991b1b', fontSize: '0.95rem' }}>
              Critical Lab Result — Immediate Medical Attention Required
            </div>
            <div style={{ fontSize: '0.82rem', color: '#dc2626', marginTop: '2px' }}>
              Your doctor has been notified and will contact you shortly. Please do not disregard this notice.
            </div>
          </div>
        </div>
      )}

      {/* Summary Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
        {[
          {
            label: 'My Lab Orders',
            value: myOrders.length,
            sub: `${myOrders.filter(o => o.status.includes('Verified')).length} results ready`,
            color: '#0284c7', bg: '#e0f2fe',
            icon: <FlaskConical size={18} />
          },
          {
            label: 'Results Available',
            value: Object.keys(labResults).length,
            sub: 'View reference ranges & trends',
            color: '#16a34a', bg: '#dcfce7',
            icon: <TrendingUp size={18} />
          },
          {
            label: 'Outstanding Balance',
            value: `$${myInvoices.filter(i => i.status === 'Open').reduce((a, i) => a + (i.patientCopayDue || 0), 0).toFixed(2)}`,
            sub: `${myInvoices.filter(i => i.status === 'Open').length} invoice(s) pending`,
            color: '#d97706', bg: '#fef3c7',
            icon: <Receipt size={18} />
          }
        ].map((card, i) => (
          <div key={i} className="dash-card" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: card.color, marginBottom: '6px' }}>
              <div style={{ background: card.bg, padding: '6px', borderRadius: '8px' }}>{card.icon}</div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{card.label}</span>
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: card.color }}>{card.value}</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '3px' }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* My Lab Orders & Results */}
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">My Lab Orders & Test Results</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Live status tracking from order to certified report — click any order to view detailed results with reference ranges
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {myOrders.map(order => {
            const result = labResults[order.orderId];
            const isExpanded = expandedOrder === order.orderId;
            const isReady = order.status.includes('Verified');
            const isCollected = order.status.includes('Collected') || order.status.includes('Processing') || isReady;

            // Status steps for visual tracker
            const steps = [
              { label: 'Order Placed', done: true },
              { label: 'Sample Collected', done: isCollected },
              { label: 'Lab Processing', done: result !== undefined },
              { label: 'Result Ready', done: isReady },
            ];

            return (
              <div key={order.orderId}
                style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', background: '#ffffff' }}
              >
                {/* Order Header (clickable) */}
                <div
                  onClick={() => setExpandedOrder(isExpanded ? null : order.orderId)}
                  style={{ padding: '14px 18px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, color: '#0f172a' }}>{order.orderId}</span>
                      <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                        {order.priority}
                      </span>
                      <span style={{
                        background: isReady ? '#dcfce7' : isCollected ? '#e0f2fe' : '#fef3c7',
                        color: isReady ? '#15803d' : isCollected ? '#0284c7' : '#d97706',
                        padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700
                      }}>
                        {order.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0284c7', marginTop: '4px' }}>
                      Tests: {order.tests.map(t => t.testName || t.name).join(', ')}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '3px' }}>
                      Ordered: {order.orderDate} • Dr: {order.prescribingDoctor}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isReady && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={e => { e.stopPropagation(); handleDownloadReport(order.orderId, order.patientName); }}
                        style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Download size={13} /> Download Report
                      </button>
                    )}
                    {isExpanded ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
                  </div>
                </div>

                {/* Progress Tracker */}
                <div style={{ padding: '0 18px 14px', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px', gap: '0' }}>
                    {steps.map((step, idx) => (
                      <React.Fragment key={step.label}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div style={{
                            width: '24px', height: '24px', borderRadius: '50%',
                            background: step.done ? '#0284c7' : '#e2e8f0',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                            {step.done && <CheckCircle size={14} color="#ffffff" fill="#0284c7" />}
                          </div>
                          <div style={{ fontSize: '0.65rem', color: step.done ? '#0284c7' : '#94a3b8', marginTop: '4px', fontWeight: step.done ? 700 : 400, textAlign: 'center', width: '70px' }}>
                            {step.label}
                          </div>
                        </div>
                        {idx < steps.length - 1 && (
                          <div style={{ flex: 1, height: '2px', background: step.done && steps[idx + 1]?.done ? '#0284c7' : '#e2e8f0', margin: '0 4px', marginBottom: '18px' }} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Expanded: Full Results View */}
                {isExpanded && result && (
                  <div style={{ borderTop: '1px solid #e2e8f0', padding: '16px 18px', background: '#f8fafc' }}>
                    <h4 style={{ margin: '0 0 12px 0', fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>
                      Your Lab Results — Reference Range Guide
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {result.results.map((res, idx) => {
                        const isCritical = res.flag && res.flag.toLowerCase().includes('critical');
                        const isHigh = res.flag && res.flag.includes('High');
                        const isNormal = !isCritical && !isHigh && res.flag && !res.flag.includes('Low');

                        return (
                          <div key={idx} style={{
                            background: isCritical ? '#fef2f2' : isHigh ? '#fffbeb' : '#ffffff',
                            border: `1px solid ${isCritical ? '#fca5a5' : isHigh ? '#fde68a' : '#e2e8f0'}`,
                            borderRadius: '8px', padding: '12px 16px',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                          }}>
                            <div>
                              <div style={{ fontWeight: 700, color: '#0f172a' }}>{res.analyte}</div>
                              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                                Normal Range: {res.range} {res.unit} • Method: {res.method}
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: isCritical ? '#dc2626' : isHigh ? '#d97706' : '#16a34a' }}>
                                {res.value} <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>{res.unit}</span>
                              </div>
                              <span style={{
                                background: isCritical ? '#dc2626' : isHigh ? '#fef3c7' : '#dcfce7',
                                color: isCritical ? '#ffffff' : isHigh ? '#d97706' : '#15803d',
                                padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800
                              }}>
                                {res.flag}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div style={{ marginTop: '12px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '0.8rem', color: '#334155' }}>
                      <strong>Pathologist Interpretation:</strong> {result.comments}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* My Lab Bills */}
      <div className="dash-card">
        <div className="dash-card-header">
          <h2 className="dash-card-title">My Lab Bills & Invoices</h2>
        </div>

        <table className="dash-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Lab Order</th>
              <th>Test Charge</th>
              <th>Insurance Covered</th>
              <th>Your Copay Due</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myInvoices.map(inv => (
              <tr key={inv.invoiceId}>
                <td style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.82rem' }}>{inv.invoiceId}</td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#0284c7' }}>{inv.orderId}</td>
                <td style={{ fontWeight: 700 }}>${(inv.testsTotal || 0).toFixed(2)}</td>
                <td style={{ color: '#16a34a', fontWeight: 700 }}>${(inv.insuranceCovered || 0).toFixed(2)}</td>
                <td style={{ fontWeight: 800, fontSize: '0.95rem', color: inv.status === 'Paid' ? '#16a34a' : '#dc2626' }}>
                  ${(inv.patientCopayDue || 0).toFixed(2)}
                </td>
                <td>
                  <span style={{
                    background: inv.status === 'Paid' ? '#dcfce7' : '#fef3c7',
                    color: inv.status === 'Paid' ? '#15803d' : '#d97706',
                    padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700
                  }}>
                    {inv.paymentStatus}
                  </span>
                </td>
                <td>
                  {inv.status !== 'Paid' && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handlePayInvoice(inv.invoiceId)}
                      style={{ fontSize: '0.75rem', background: '#16a34a', border: 'none' }}
                    >
                      Pay Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
