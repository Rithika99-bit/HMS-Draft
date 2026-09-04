import React, { useState } from 'react';
import { useImaging } from '../../context/ImagingContext';
import {
  Stethoscope, Plus, Search, Eye, FileText, CheckCircle,
  AlertTriangle, Clock, Zap, Layers, RefreshCw, Download, ArrowRight, Activity
} from 'lucide-react';

export default function DoctorImagingView({ onShowToast }) {
  const {
    imagingOrders, testMaster, imagingReports,
    createImagingOrder, criticalFindings, acknowledgeCriticalFinding
  } = useImaging();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'new-requisition' | 'results' | 'history'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(imagingOrders[0]?.orderId || null);

  // New Requisition Form State
  const [reqForm, setReqForm] = useState({
    patientName: 'Sarah Connor',
    patientUhid: 'UHID-MED-2026-08942',
    patientAge: 38,
    patientGender: 'Female',
    testCode: 'IMG-CT-CHEST-05',
    priority: 'Urgent',
    clinicalIndication: 'Shortness of breath, chest pain. Rule out PE.',
    contrastRequired: true,
    clinicalNotes: 'eGFR 88 mL/min (Normal). No contrast allergy history.',
    drName: 'Dr. Sarah Mitchell, MD (Cardiology)'
  });

  // Critical Finding Acknowledgement State
  const [ackAction, setAckAction] = useState('Immediate neurosurgery consultation requested. Patient transferred to Neuro-ICU.');

  const selectedOrder = imagingOrders.find(o => o.orderId === selectedOrderId) || imagingOrders[0];
  const activeReport = selectedOrder ? imagingReports[selectedOrder.orderId] : null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const test = testMaster.find(t => t.testCode === reqForm.testCode);
    const newOrd = createImagingOrder({
      patientUhid: reqForm.patientUhid,
      patientName: reqForm.patientName,
      patientAge: reqForm.patientAge,
      patientGender: reqForm.patientGender,
      testCode: reqForm.testCode,
      clinicalIndication: reqForm.clinicalIndication,
      priority: reqForm.priority,
      drName: reqForm.drName
    });
    if (onShowToast) onShowToast(`Imaging Requisition Placed: ${test?.testName} for ${reqForm.patientName}!`, 'success');
    setActiveTab('orders');
  };

  const handleAckFinding = (findingId) => {
    acknowledgeCriticalFinding(findingId, 'Dr. Sarah Mitchell, MD', ackAction);
    if (onShowToast) onShowToast('Critical finding acknowledged & clinical action logged!', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
      <div className="dash-card" style={{ background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Stethoscope size={24} color="#99f6e4" />
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>Physician Imaging & Radiology Workbench</h2>
            </div>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem', color: '#ccfbf1' }}>
              Place imaging requisitions, track real-time study lifecycle, review verified radiologist reports & DICOM images.
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => setActiveTab('new-requisition')} style={{ background: '#fff', color: '#0f766e', border: 'none', fontWeight: 800 }}>
            <Plus size={16} /> Order Imaging Study
          </button>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '14px', flexWrap: 'wrap' }}>
          {[
            { id: 'orders', label: 'Order Tracking Pipeline', icon: Activity },
            { id: 'new-requisition', label: 'Place Requisition Order', icon: Plus },
            { id: 'results', label: 'Radiology Reports & PACS Viewer', icon: Eye },
            { id: 'history', label: 'Patient Imaging Timeline', icon: Layers }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                background: active ? '#ffffff' : 'rgba(255,255,255,0.15)',
                color: active ? '#0f766e' : '#ffffff',
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

      {/* Critical Findings Alert Banner */}
      {criticalFindings.filter(f => f.status === 'Pending Acknowledgment').map(finding => (
        <div key={finding.findingId} style={{
          background: '#fef2f2', border: '2px solid #ef4444', borderRadius: '12px', padding: '16px',
          display: 'flex', flexDirection: 'column', gap: '10px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', fontWeight: 800 }}>
              <AlertTriangle size={20} />
              CRITICAL RADIOLOGY FINDING REQUIRING IMMEDIATE ACKNOWLEDGMENT
            </div>
            <span style={{ background: '#dc2626', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
              STAT RED ALERT
            </span>
          </div>

          <div style={{ fontSize: '0.88rem', color: '#7f1d1d' }}>
            <strong>Patient:</strong> {finding.patientName} ({finding.patientUhid}) • <strong>Finding:</strong> {finding.finding}
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input type="text" className="form-input" style={{ flex: 1, minWidth: '280px', fontSize: '0.82rem' }}
              value={ackAction} onChange={e => setAckAction(e.target.value)} placeholder="Document clinical action taken..." />
            <button className="btn btn-primary btn-sm" onClick={() => handleAckFinding(finding.findingId)} style={{ background: '#dc2626', borderColor: '#dc2626' }}>
              Confirm & Acknowledge Finding
            </button>
          </div>
        </div>
      ))}

      {/* ── 1. ORDER TRACKING PIPELINE ────────────────────────────────────────── */}
      {activeTab === 'orders' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h3 className="dash-card-title">My Requested Imaging Orders & Lifecycle Tracking</h3>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                Track ordered imaging studies from intake → scheduled → exam complete → report verified.
              </div>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Patient</th>
                  <th>Modality & Study</th>
                  <th>Priority</th>
                  <th>Current Status</th>
                  <th>Report Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {imagingOrders.map(order => {
                  const isStat = order.priority.includes('STAT');
                  return (
                    <tr key={order.orderId} style={{ background: isStat ? '#fff5f5' : undefined }}>
                      <td style={{ fontWeight: 800, color: '#0f172a' }}>{order.orderId}</td>
                      <td>
                        <div style={{ fontWeight: 700, color: '#0284c7' }}>{order.patientName}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{order.patientUhid} ({order.patientAge}y/{order.patientGender})</div>
                      </td>
                      <td>
                        <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, marginRight: '6px' }}>
                          {order.modality}
                        </span>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{order.testName}</span>
                      </td>
                      <td>
                        <span style={{
                          background: isStat ? '#fee2e2' : '#f1f5f9',
                          color: isStat ? '#dc2626' : '#475569',
                          padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800
                        }}>
                          {order.priority}
                        </span>
                      </td>
                      <td>
                        <span style={{
                          background: order.status.includes('Ready') || order.status.includes('Final') ? '#dcfce7' : '#fef3c7',
                          color: order.status.includes('Ready') || order.status.includes('Final') ? '#15803d' : '#d97706',
                          padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <span style={{
                          background: order.reportStatus === 'Final' ? '#dcfce7' : order.reportStatus === 'Preliminary' ? '#e0f2fe' : '#fef3c7',
                          color: order.reportStatus === 'Final' ? '#15803d' : order.reportStatus === 'Preliminary' ? '#0284c7' : '#d97706',
                          padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700
                        }}>
                          {order.reportStatus}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-primary btn-sm" onClick={() => { setSelectedOrderId(order.orderId); setActiveTab('results'); }} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
                          <Eye size={13} /> View Findings
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── 2. PLACE REQUISITION ORDER WIZARD ───────────────────────────────── */}
      {activeTab === 'new-requisition' && (
        <div className="dash-card" style={{ maxWidth: '680px' }}>
          <h3 className="dash-card-title" style={{ marginBottom: '6px' }}>Place New Diagnostic Imaging Requisition</h3>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '18px' }}>
            Select patient, modality procedure, clinical indication, priority level, and contrast media requirements.
          </p>

          <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="form-label">Patient Full Name</label>
                <input type="text" className="form-input" value={reqForm.patientName}
                  onChange={e => setReqForm({ ...reqForm, patientName: e.target.value })} required />
              </div>
              <div>
                <label className="form-label">Patient UHID Number</label>
                <input type="text" className="form-input" value={reqForm.patientUhid}
                  onChange={e => setReqForm({ ...reqForm, patientUhid: e.target.value })} required />
              </div>
            </div>

            <div>
              <label className="form-label">Select Modality Procedure / Test</label>
              <select className="form-input" value={reqForm.testCode} onChange={e => setReqForm({ ...reqForm, testCode: e.target.value })}>
                {testMaster.map(t => (
                  <option key={t.testCode} value={t.testCode}>
                    [{t.modality}] {t.testName} — Body Region: {t.bodyRegion} (${t.price})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="form-label">Requisition Priority</label>
                <select className="form-input" value={reqForm.priority} onChange={e => setReqForm({ ...reqForm, priority: e.target.value })}>
                  <option value="Routine">Routine (24 Hour)</option>
                  <option value="Urgent">Urgent (4 Hour)</option>
                  <option value="STAT (Emergency)">STAT — Emergency Immediate</option>
                </select>
              </div>
              <div>
                <label className="form-label">Ordering Physician</label>
                <input type="text" className="form-input" value={reqForm.drName}
                  onChange={e => setReqForm({ ...reqForm, drName: e.target.value })} required />
              </div>
            </div>

            <div>
              <label className="form-label">Clinical Indication (ICD-10 / Clinical Context)</label>
              <textarea className="form-input" rows="2" value={reqForm.clinicalIndication}
                onChange={e => setReqForm({ ...reqForm, clinicalIndication: e.target.value })} required />
            </div>

            <div>
              <label className="form-label">Clinical Notes & Safety Considerations</label>
              <input type="text" className="form-input" value={reqForm.clinicalNotes}
                onChange={e => setReqForm({ ...reqForm, clinicalNotes: e.target.value })} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setActiveTab('orders')}>Cancel</button>
              <button type="submit" className="btn btn-primary">
                Issue Requisition Order
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── 3. RADIOLOGY REPORTS & PACS VIEWER ──────────────────────────────── */}
      {activeTab === 'results' && (
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '16px' }}>
          {/* Order Selection Sidebar */}
          <div className="dash-card" style={{ padding: '14px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 800 }}>Select Imaging Study</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {imagingOrders.map(o => (
                <button key={o.orderId} onClick={() => setSelectedOrderId(o.orderId)} style={{
                  padding: '10px', borderRadius: '8px', textAlign: 'left',
                  border: selectedOrderId === o.orderId ? '2px solid #0d9488' : '1px solid #e2e8f0',
                  background: selectedOrderId === o.orderId ? '#ccfbf1' : '#ffffff',
                  cursor: 'pointer'
                }}>
                  <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#0f172a' }}>{o.orderId}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0f766e' }}>{o.patientName}</div>
                  <div style={{ fontSize: '0.72rem', color: '#475569' }}>{o.modality} — {o.testName}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Report View & Image Viewer */}
          <div className="dash-card">
            {selectedOrder ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', pb: '12px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                      [{selectedOrder.modality}] {selectedOrder.testName}
                    </h3>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>
                      Patient: <strong>{selectedOrder.patientName}</strong> ({selectedOrder.patientUhid}) • Date: {selectedOrder.orderDate}
                    </div>
                  </div>
                  <span style={{
                    background: selectedOrder.reportStatus === 'Final' ? '#dcfce7' : '#fef3c7',
                    color: selectedOrder.reportStatus === 'Final' ? '#15803d' : '#d97706',
                    padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800
                  }}>
                    {selectedOrder.reportStatus} Report
                  </span>
                </div>

                {/* Simulated DICOM Image Viewer Canvas */}
                <div style={{
                  background: '#090d16', color: '#38bdf8', padding: '20px', borderRadius: '10px', marginBottom: '18px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '220px'
                }}>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>STUDY UID: {selectedOrder.studyInstanceUid || '1.2.840.10008.5.1.4.1.1'}</span>
                    <span>WINDOW / LEVEL: W:350 L:40 (CT Soft Tissue)</span>
                  </div>

                  <div style={{ background: '#1e293b', border: '2px dashed #0284c7', borderRadius: '8px', padding: '30px 50px', textAlign: 'center' }}>
                    <Activity size={48} color="#38bdf8" />
                    <div style={{ color: '#ffffff', fontWeight: 700, marginTop: '8px' }}>
                      DICOM 3.0 High-Resolution Modality Scan
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: '4px' }}>
                      Acc #{selectedOrder.accessionNumber} • Series 1 / Slice 24 of 120
                    </div>
                  </div>
                </div>

                {/* Report Text */}
                {activeReport ? (
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div style={{ fontWeight: 800, color: '#0f172a' }}>Radiologist Findings & Interpretation</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>By: {activeReport.radiologist}</div>
                    </div>

                    <div style={{ fontSize: '0.85rem', whiteSpace: 'pre-line', color: '#334155', lineHeight: 1.5, marginBottom: '14px' }}>
                      {activeReport.findings}
                    </div>

                    <div style={{ background: '#e0f2fe', borderLeft: '4px solid #0284c7', padding: '12px', borderRadius: '4px' }}>
                      <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.82rem' }}>IMPRESSION:</div>
                      <div style={{ fontSize: '0.85rem', color: '#0f172a', fontWeight: 600, marginTop: '4px' }}>
                        {activeReport.impression}
                      </div>
                    </div>

                    {activeReport.signedAt && (
                      <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700, marginTop: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle size={14} /> Digitally Signed: {activeReport.radiologistSignature} on {activeReport.signedAt}
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                    Radiologist report is currently pending sign-off. Examination status: {selectedOrder.status}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ padding: '20px', color: '#64748b' }}>Select an order to view findings.</div>
            )}
          </div>
        </div>
      )}

      {/* ── 4. PATIENT IMAGING TIMELINE ────────────────────────────────────── */}
      {activeTab === 'history' && (
        <div className="dash-card">
          <h3 className="dash-card-title" style={{ marginBottom: '14px' }}>Longitudinal Patient Imaging Timeline</h3>
          <div style={{ position: 'relative', paddingLeft: '24px', borderLeft: '2px solid #cbd5e1' }}>
            {imagingOrders.map((o, idx) => (
              <div key={o.orderId} style={{ marginBottom: '20px', position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: '-31px', top: '2px', width: '14px', height: '14px',
                  borderRadius: '50%', background: '#0d9488', border: '3px solid #fff'
                }} />
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>{o.orderDate}</div>
                <div style={{ fontWeight: 700, color: '#0f766e', fontSize: '0.85rem' }}>{o.patientName} — {o.modality}: {o.testName}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Indication: {o.clinicalIndication}</div>
                <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, marginTop: '2px' }}>
                  Status: {o.status} ({o.reportStatus})
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
