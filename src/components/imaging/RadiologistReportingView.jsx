import React, { useState } from 'react';
import { useImaging } from '../../context/ImagingContext';
import { FileText, Edit3, ShieldCheck, Eye, AlertTriangle } from 'lucide-react';

export default function RadiologistReportingView({ onShowToast }) {
  const { imagingOrders, imagingReports, submitRadiologistReport, amendReport } = useImaging();
  const [selectedOrderId, setSelectedOrderId] = useState('IMG-ORD-2026-0033');
  const [reportForm, setReportForm] = useState({
    findings: '', impression: '', isCritical: false, criticalFindingText: '',
    radiologist: 'Dr. Priya Shah, MD (Neuroradiology)',
    signature: 'SIG-RAD-DR-SHAH-77312', reportType: 'Final'
  });
  const [showAmendModal, setShowAmendModal] = useState(false);
  const [amendForm, setAmendForm] = useState({ findings: '', impression: '', reason: '' });

  const reportableOrders = imagingOrders.filter(o =>
    o.status.includes('Exam Complete') || o.status.includes('Report Ready') || o.reportStatus !== 'Pending'
  );

  const selectedOrder = imagingOrders.find(o => o.orderId === selectedOrderId) || reportableOrders[0];
  const activeReport = imagingReports[selectedOrderId];

  const handleSelectOrder = (order) => {
    setSelectedOrderId(order.orderId);
    const existingReport = imagingReports[order.orderId];
    if (existingReport) {
      setReportForm(f => ({ ...f, findings: existingReport.findings, impression: existingReport.impression }));
    } else {
      setReportForm(f => ({ ...f, findings: '', impression: '' }));
    }
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    submitRadiologistReport({ orderId: selectedOrderId, ...reportForm });
    if (onShowToast) onShowToast(
      `${reportForm.reportType} radiology report submitted for ${selectedOrder?.patientName}!${reportForm.isCritical ? ' ⚠️ CRITICAL FINDING DISPATCHED!' : ''}`,
      reportForm.isCritical ? 'warning' : 'success'
    );
  };

  const handleAmend = (e) => {
    e.preventDefault();
    amendReport(selectedOrderId, amendForm.findings, amendForm.impression, amendForm.reason, selectedOrder?.assignedRadiologist);
    if (onShowToast) onShowToast(`Report amended for ${selectedOrder?.patientName}. Audit trail updated.`, 'warning');
    setShowAmendModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Radiologist Reporting & Digital Sign-off Console</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Structured dictation workspace — findings & impression, preliminary/final report, critical finding dispatch, and amendment
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.9fr', gap: '20px' }}>
          {/* Left: Study Queue */}
          <div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
              Pending Radiologist Reporting ({reportableOrders.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {reportableOrders.map(order => {
                const report = imagingReports[order.orderId];
                const isSelected = order.orderId === selectedOrderId;
                return (
                  <div key={order.orderId} onClick={() => handleSelectOrder(order)} style={{
                    padding: '12px 14px', borderRadius: '10px', cursor: 'pointer',
                    border: isSelected ? '2px solid #0284c7' : '1px solid #e2e8f0',
                    background: isSelected ? '#f0f9ff' : '#ffffff'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a' }}>{order.orderId}</span>
                      <span style={{
                        background: report?.status === 'Final' ? '#dcfce7' : report?.status === 'Preliminary' ? '#e0f2fe' : '#fef3c7',
                        color: report?.status === 'Final' ? '#15803d' : report?.status === 'Preliminary' ? '#0284c7' : '#d97706',
                        padding: '2px 7px', borderRadius: '10px', fontSize: '0.68rem', fontWeight: 700
                      }}>
                        {report?.status || 'Awaiting'}
                      </span>
                    </div>
                    <div style={{ fontWeight: 700, color: '#0284c7', fontSize: '0.85rem', marginTop: '4px' }}>
                      {order.patientName}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '2px' }}>
                      <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '1px 5px', borderRadius: '3px', fontSize: '0.68rem', fontWeight: 700, marginRight: 4 }}>
                        {order.modality}
                      </span>
                      {order.testName}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Reporting Terminal */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px' }}>
            {selectedOrder ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                      Reporting: {selectedOrder.orderId}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                      Patient: <strong>{selectedOrder.patientName}</strong> ({selectedOrder.patientAge}y/{selectedOrder.patientGender}) &nbsp;|&nbsp;
                      Accession: <code>{selectedOrder.accessionNumber}</code>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 700, marginTop: '2px' }}>
                      {selectedOrder.modality} — {selectedOrder.testName} ({selectedOrder.bodyRegion})
                    </div>
                  </div>
                  {activeReport && (
                    <button className="btn btn-outline btn-sm"
                      style={{ color: '#d97706', borderColor: '#fde68a', fontSize: '0.75rem' }}
                      onClick={() => { setAmendForm({ findings: activeReport.findings, impression: activeReport.impression, reason: '' }); setShowAmendModal(true); }}>
                      <Edit3 size={13} style={{ display: 'inline', marginRight: 3 }} /> Amend Report
                    </button>
                  )}
                </div>

                {/* Existing Final Report Display */}
                {activeReport?.status === 'Final' || activeReport?.status === 'Amended' ? (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', color: '#15803d', fontWeight: 800 }}>
                      <ShieldCheck size={18} /> {activeReport.status} Report — Signed by {activeReport.radiologist}
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Findings:</div>
                      <pre style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap', fontSize: '0.82rem', color: '#334155', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        {activeReport.findings}
                      </pre>
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Impression / Conclusion:</div>
                      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '12px', fontSize: '0.82rem', color: '#166534' }}>
                        {activeReport.impression}
                      </div>
                    </div>
                    {activeReport.criticalFinding && (
                      <div style={{ background: '#fee2e2', border: '2px solid #f87171', borderRadius: '8px', padding: '12px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <AlertTriangle size={18} color="#dc2626" style={{ flexShrink: 0, marginTop: '1px' }} />
                        <div style={{ fontSize: '0.82rem', color: '#991b1b', fontWeight: 700 }}>
                          CRITICAL FINDING: {activeReport.criticalFindingText}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Reporting Form */
                  <form onSubmit={handleSubmitReport} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {activeReport?.status === 'Preliminary' && (
                      <div style={{ background: '#e0f2fe', border: '1px solid #93c5fd', borderRadius: '8px', padding: '10px 14px', fontSize: '0.82rem', color: '#1e3a5f' }}>
                        <strong>Preliminary report exists.</strong> Complete findings below and select "Final" to issue certified report.
                      </div>
                    )}
                    <div>
                      <label className="form-label">Radiological Findings</label>
                      <textarea rows={7} className="form-input" placeholder="Enter detailed findings (technique, observations, measurements)..."
                        value={reportForm.findings} onChange={e => setReportForm({ ...reportForm, findings: e.target.value })} required />
                    </div>
                    <div>
                      <label className="form-label">Impression / Clinical Conclusion</label>
                      <textarea rows={4} className="form-input" placeholder="Summarize the radiological impression and key conclusions..."
                        value={reportForm.impression} onChange={e => setReportForm({ ...reportForm, impression: e.target.value })} required />
                    </div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div>
                        <label className="form-label">Report Type</label>
                        <select className="form-input" value={reportForm.reportType} onChange={e => setReportForm({ ...reportForm, reportType: e.target.value })}>
                          <option value="Preliminary">Preliminary</option>
                          <option value="Final">Final (Digital Sign-off)</option>
                        </select>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '18px' }}>
                        <input type="checkbox" id="criticalCheck" checked={reportForm.isCritical}
                          onChange={e => setReportForm({ ...reportForm, isCritical: e.target.checked })} />
                        <label htmlFor="criticalCheck" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#dc2626', cursor: 'pointer' }}>
                          Flag Critical Finding
                        </label>
                      </div>
                    </div>
                    {reportForm.isCritical && (
                      <div>
                        <label className="form-label">Critical Finding Summary (for doctor notification)</label>
                        <input type="text" className="form-input" value={reportForm.criticalFindingText}
                          onChange={e => setReportForm({ ...reportForm, criticalFindingText: e.target.value })} required />
                      </div>
                    )}
                    <div>
                      <label className="form-label">Radiologist</label>
                      <input type="text" className="form-input" value={reportForm.radiologist}
                        onChange={e => setReportForm({ ...reportForm, radiologist: e.target.value })} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button type="submit" className="btn btn-primary btn-sm"
                        style={{ background: reportForm.reportType === 'Final' ? '#16a34a' : '#0284c7', border: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ShieldCheck size={14} />
                        {reportForm.reportType === 'Final' ? 'Sign & Issue Final Report' : 'Submit Preliminary Report'}
                      </button>
                    </div>
                  </form>
                )}
              </>
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                <FileText size={36} style={{ marginBottom: '10px' }} />
                <p>Select a study from the queue to begin reporting.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Amend Modal */}
      {showAmendModal && (
        <div className="modal-overlay" style={{ zIndex: 1200 }}>
          <div className="modal-content-card" style={{ maxWidth: '540px', width: '92%' }}>
            <h3 style={{ margin: '0 0 10px 0', fontWeight: 800, color: '#b45309' }}>Amend Certified Radiology Report</h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '14px' }}>
              All amendments are permanently recorded in the RIS audit trail.
            </p>
            <form onSubmit={handleAmend} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label className="form-label">Amended Findings</label>
                <textarea rows={5} className="form-input" value={amendForm.findings}
                  onChange={e => setAmendForm({ ...amendForm, findings: e.target.value })} required />
              </div>
              <div>
                <label className="form-label">Amended Impression</label>
                <textarea rows={3} className="form-input" value={amendForm.impression}
                  onChange={e => setAmendForm({ ...amendForm, impression: e.target.value })} required />
              </div>
              <div>
                <label className="form-label">Justification for Amendment</label>
                <input type="text" className="form-input" value={amendForm.reason}
                  onChange={e => setAmendForm({ ...amendForm, reason: e.target.value })} required />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAmendModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ background: '#d97706', border: 'none' }}>
                  Issue Amended Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
