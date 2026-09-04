import React, { useState } from 'react';
import { useImaging } from '../../context/ImagingContext';
import {
  Calendar, Clock, FileText, Eye, DollarSign, Bell, CheckCircle,
  Download, AlertCircle, Info, CreditCard, ShieldCheck
} from 'lucide-react';

export default function PatientImagingView({ onShowToast }) {
  const {
    imagingOrders, imagingReports, imagingInvoices, payImagingInvoice
  } = useImaging();

  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' | 'reports' | 'billing' | 'notifications'
  const [selectedOrderId, setSelectedOrderId] = useState(imagingOrders[0]?.orderId || null);

  const selectedOrder = imagingOrders.find(o => o.orderId === selectedOrderId) || imagingOrders[0];
  const activeReport = selectedOrder ? imagingReports[selectedOrder.orderId] : null;

  const handlePay = (invoiceId) => {
    payImagingInvoice(invoiceId, 'Credit Card (Self-Service Portal)', 'Patient Portal');
    if (onShowToast) onShowToast(`Payment processed successfully for Invoice ${invoiceId}!`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Banner */}
      <div className="dash-card" style={{ background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={24} color="#a5f3fc" />
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>My Imaging Appointments, Reports & Scans</h2>
            </div>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem', color: '#cffafe' }}>
              View upcoming scan appointments, patient preparation guidelines, final radiologist reports, and digital scan images.
            </p>
          </div>
        </div>

        {/* Subnav */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '14px', flexWrap: 'wrap' }}>
          {[
            { id: 'appointments', label: 'Upcoming Appointments & Prep', icon: Calendar },
            { id: 'reports', label: 'Radiology Reports & Scan Images', icon: FileText },
            { id: 'billing', label: 'Imaging Invoices & Co-Pay', icon: DollarSign },
            { id: 'notifications', label: 'Imaging Reminders & Alerts', icon: Bell }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                background: active ? '#ffffff' : 'rgba(255,255,255,0.15)',
                color: active ? '#0e7490' : '#ffffff',
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

      {/* ── 1. APPOINTMENTS & PREPARATION ───────────────────────────────────── */}
      {activeTab === 'appointments' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 className="dash-card-title" style={{ margin: 0 }}>Scheduled Imaging Appointments</h3>
          
          {imagingOrders.filter(o => o.status === 'Scheduled' || o.status.includes('Ordered')).map(order => (
            <div key={order.orderId} className="dash-card" style={{ borderLeft: '4px solid #0891b2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span style={{ background: '#cffafe', color: '#0891b2', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                    {order.modality}
                  </span>
                  <h4 style={{ margin: '6px 0 2px 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                    {order.testName}
                  </h4>
                  <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                    Ordered by: <strong>{order.prescribingDoctor}</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: '#16a34a', fontSize: '0.95rem' }}>
                    {order.scheduledDate || 'Awaiting Scheduling Confirmation'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                    Suite: {order.scheduledRoom || 'Radiology Department Triage'}
                  </div>
                </div>
              </div>

              {/* Preparation Banner */}
              <div style={{ marginTop: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
                <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Info size={14} /> Patient Preparation Guidelines:
                </div>
                <div style={{ fontSize: '0.8rem', color: '#334155', marginTop: '4px' }}>
                  {order.contrastUsed !== 'None' ? '⚠️ Fasting required 4 hours prior. Please report 15 mins early for IV contrast line placement.' : '✓ Wear loose clothing and remove metal jewelry before entering scan suite.'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── 2. RADIOLOGY REPORTS & IMAGES ─────────────────────────────────── */}
      {activeTab === 'reports' && (
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '16px' }}>
          <div className="dash-card" style={{ padding: '14px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 800 }}>Completed Scans</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {imagingOrders.map(o => (
                <button key={o.orderId} onClick={() => setSelectedOrderId(o.orderId)} style={{
                  padding: '10px', borderRadius: '8px', textAlign: 'left',
                  border: selectedOrderId === o.orderId ? '2px solid #0891b2' : '1px solid #e2e8f0',
                  background: selectedOrderId === o.orderId ? '#cffafe' : '#ffffff',
                  cursor: 'pointer'
                }}>
                  <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#0f172a' }}>{o.orderId}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0891b2' }}>{o.testName}</div>
                  <div style={{ fontSize: '0.72rem', color: '#475569' }}>{o.reportStatus}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="dash-card">
            {selectedOrder ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>{selectedOrder.testName}</h3>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Ordered by: {selectedOrder.prescribingDoctor}</div>
                  </div>
                  {activeReport?.signedAt && (
                    <button className="btn btn-outline btn-sm" onClick={() => alert('Downloading official PDF report...')} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Download size={14} /> Download Official PDF Report
                    </button>
                  )}
                </div>

                {/* DICOM Mock Viewer */}
                <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', color: '#38bdf8', marginBottom: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>DICOM Web Image Viewer</div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Study UID: {selectedOrder.studyInstanceUid || '1.2.840.10008.5.1.4'}</div>
                </div>

                {/* Findings */}
                {activeReport ? (
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>Diagnostic Impression:</div>
                    <div style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 600 }}>{activeReport.impression}</div>
                    <div style={{ fontSize: '0.75rem', color: '#16a34a', marginTop: '10px', fontWeight: 700 }}>
                      ✓ Signed by {activeReport.radiologist} on {activeReport.signedAt}
                    </div>
                  </div>
                ) : (
                  <div style={{ color: '#64748b', fontSize: '0.85rem' }}>Report is being processed by the radiologist.</div>
                )}
              </div>
            ) : (
              <div>Select a study to view details.</div>
            )}
          </div>
        </div>
      )}

      {/* ── 3. BILLING & INVOICES ────────────────────────────────────────── */}
      {activeTab === 'billing' && (
        <div className="dash-card">
          <h3 className="dash-card-title" style={{ marginBottom: '14px' }}>Imaging Invoices & Co-Pay Charges</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Date</th>
                  <th>Gross Total</th>
                  <th>Insurance Paid</th>
                  <th>My Co-pay Due</th>
                  <th>Payment Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {imagingInvoices.map(inv => (
                  <tr key={inv.invoiceId}>
                    <td style={{ fontWeight: 800, color: '#0f172a' }}>{inv.invoiceId}</td>
                    <td>{inv.date}</td>
                    <td style={{ fontWeight: 700 }}>${inv.testsTotal.toFixed(2)}</td>
                    <td style={{ color: '#16a34a' }}>${inv.insuranceCovered.toFixed(2)}</td>
                    <td style={{ fontWeight: 800, color: '#d97706' }}>${inv.patientCopayDue.toFixed(2)}</td>
                    <td>
                      <span style={{
                        background: inv.status === 'Paid' ? '#dcfce7' : '#fef3c7',
                        color: inv.status === 'Paid' ? '#15803d' : '#d97706',
                        padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800
                      }}>
                        {inv.paymentStatus}
                      </span>
                    </td>
                    <td>
                      {inv.status !== 'Paid' ? (
                        <button className="btn btn-primary btn-sm" onClick={() => handlePay(inv.invoiceId)} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
                          <CreditCard size={13} /> Pay Co-pay Online
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>✓ Paid</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── 4. NOTIFICATIONS & REMINDERS ─────────────────────────────────── */}
      {activeTab === 'notifications' && (
        <div className="dash-card">
          <h3 className="dash-card-title" style={{ marginBottom: '14px' }}>Imaging Notifications & Reminders</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '12px', borderRadius: '8px' }}>
              <div style={{ fontWeight: 800, color: '#16a34a', fontSize: '0.85rem' }}>✓ Scan Completed Notification</div>
              <div style={{ fontSize: '0.8rem', color: '#166534' }}>Your CT Head scan (Robert Chen) was completed and transmitted to PACS.</div>
            </div>
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '12px', borderRadius: '8px' }}>
              <div style={{ fontWeight: 800, color: '#1d4ed8', fontSize: '0.85rem' }}>ℹ️ Preparation Reminder</div>
              <div style={{ fontSize: '0.8rem', color: '#1e40af' }}>Upcoming CT Chest HRCT requires 4 hours of fasting prior to arrival.</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
