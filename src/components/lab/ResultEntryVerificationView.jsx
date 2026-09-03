import React, { useState } from 'react';
import { useLab } from '../../context/LabContext';
import { 
  CheckCircle, AlertTriangle, ShieldCheck, Download, 
  FileText, Edit3, Check, RefreshCw, Cpu, Sparkles 
} from 'lucide-react';

export default function ResultEntryVerificationView({ onShowToast }) {
  const { labOrders, labResults, importAnalyzerResults, verifyResult, amendResult, enterLabResult } = useLab();
  const [selectedOrderId, setSelectedOrderId] = useState('LAB-ORD-2026-0941');
  
  // Amendment modal state
  const [showAmendModal, setShowAmendModal] = useState(false);
  const [amendAnalyte, setAmendAnalyte] = useState('Direct LDL Cholesterol');
  const [amendOldVal, setAmendOldVal] = useState(138);
  const [amendNewVal, setAmendNewVal] = useState(132);
  const [amendReason, setAmendReason] = useState('Recalibration baseline adjustment upon duplicate specimen rerun');

  const selectedOrder = labOrders.find(o => o.orderId === selectedOrderId) || labOrders[0];
  const activeResult = labResults[selectedOrderId];

  const handleImport = () => {
    importAnalyzerResults(selectedOrderId, 'ANZ-COBAS', 'Lab Tech Maya Lin, MT(ASCP)');
    if (onShowToast) onShowToast(`Imported telemetry results from Roche Cobas 8000 into order ${selectedOrderId}!`, 'success');
  };

  const handlePathologistSign = () => {
    verifyResult(selectedOrderId, 'Dr. Arthur Sterling, MD (Board-Certified Pathologist)', 'SIG-PATH-88902');
    if (onShowToast) onShowToast(`Pathologist digitally validated & signed final report for ${selectedOrderId}! Released to EMR.`, 'success');
  };

  const handleAmendSubmit = (e) => {
    e.preventDefault();
    amendResult(
      selectedOrderId, 
      amendAnalyte, 
      amendOldVal, 
      parseFloat(amendNewVal), 
      amendReason, 
      'Dr. Arthur Sterling, MD (Board-Certified Pathologist)'
    );
    if (onShowToast) onShowToast(`Amended ${amendAnalyte} in report ${selectedOrderId}! Audit trail logged.`, 'warning');
    setShowAmendModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Laboratory Result Entry, Verification & Pathologist Certification</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Manual & analyzer data import, abnormal panic flagging, technical verification, pathologist digital signature, and report amendment
            </div>
          </div>
        </div>

        {/* 2-Column Split: Orders Requisition Selector & Result Terminal */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '20px' }}>
          
          {/* Left Column: Requisition List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
              Laboratory Requisition Orders ({labOrders.length})
            </h3>

            {labOrders.map(order => {
              const isSelected = order.orderId === selectedOrderId;
              const hasResults = Boolean(labResults[order.orderId]);
              const isVerified = order.status.includes('Verified');

              return (
                <div
                  key={order.orderId}
                  onClick={() => setSelectedOrderId(order.orderId)}
                  style={{
                    padding: '14px',
                    borderRadius: '10px',
                    border: isSelected ? '2px solid #0284c7' : '1px solid #e2e8f0',
                    background: isSelected ? '#f0f9ff' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a' }}>{order.orderId}</span>
                    <span style={{ 
                      background: isVerified ? '#dcfce7' : hasResults ? '#e0f2fe' : '#fef3c7',
                      color: isVerified ? '#15803d' : hasResults ? '#0284c7' : '#d97706',
                      padding: '2px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: 700 
                    }}>
                      {isVerified ? 'Certified' : hasResults ? 'Tech Verified' : 'Awaiting Entry'}
                    </span>
                  </div>

                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0284c7' }}>
                    {order.patientName} <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 400 }}>({order.patientUhid})</span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '4px' }}>
                    {order.tests.map(t => t.testName || t.name).join(', ')}
                  </div>

                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '6px' }}>
                    Priority: <strong>{order.priority}</strong> • Barcode: {order.barcodeNumber}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Result Verification Terminal */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                    Result Worksheet: {selectedOrder.orderId}
                  </h3>
                  <span style={{ 
                    background: selectedOrder.priority.includes('STAT') ? '#fee2e2' : '#f1f5f9',
                    color: selectedOrder.priority.includes('STAT') ? '#dc2626' : '#475569',
                    padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 
                  }}>
                    {selectedOrder.priority}
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>
                  Patient: <strong>{selectedOrder.patientName}</strong> ({selectedOrder.patientAge}y/{selectedOrder.patientGender}) • Accession: <code>{selectedOrder.accessionNumber}</code>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                {!activeResult && (
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={handleImport}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}
                  >
                    <Cpu size={13} /> Import Analyzer Feed
                  </button>
                )}
                {activeResult && (
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={() => setShowAmendModal(true)}
                    style={{ color: '#d97706', borderColor: '#fde68a', fontSize: '0.75rem' }}
                  >
                    <Edit3 size={13} style={{ display: 'inline', marginRight: 3 }} /> Amend Result
                  </button>
                )}
              </div>
            </div>

            {/* Results Table */}
            {activeResult ? (
              <div>
                <table className="dash-table" style={{ background: '#f8fafc', marginBottom: '14px' }}>
                  <thead>
                    <tr>
                      <th>Analyte (Test Parameter)</th>
                      <th>Observed Value</th>
                      <th>Units</th>
                      <th>Biological Reference Interval</th>
                      <th>Flag Status</th>
                      <th>Methodology</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeResult.results.map((res, idx) => {
                      const isCritical = res.flag && res.flag.toLowerCase().includes('critical');
                      const isHigh = res.flag && (res.flag.includes('High') || res.flag.includes('(H)'));
                      const isAmended = res.flag && res.flag.includes('AMENDED');

                      return (
                        <tr key={idx} style={{ background: isCritical ? '#fee2e2' : isHigh ? '#fffbeb' : undefined }}>
                          <td style={{ fontWeight: 800, color: '#0f172a' }}>{res.analyte}</td>
                          <td>
                            <strong style={{ fontSize: '0.95rem', color: isCritical ? '#dc2626' : isHigh ? '#d97706' : '#16a34a' }}>
                              {res.value}
                            </strong>
                          </td>
                          <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{res.unit}</td>
                          <td style={{ fontSize: '0.8rem', color: '#334155' }}>{res.range}</td>
                          <td>
                            <span style={{ 
                              background: isCritical ? '#dc2626' : isHigh ? '#fef3c7' : isAmended ? '#e0e7ff' : '#dcfce7',
                              color: isCritical ? '#ffffff' : isHigh ? '#d97706' : isAmended ? '#4338ca' : '#15803d',
                              padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 
                            }}>
                              {res.flag}
                            </span>
                          </td>
                          <td style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{res.method}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Pathologist Comments Box */}
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '12px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.82rem', color: '#334155' }}>
                  <strong style={{ color: '#0f172a' }}>Pathologist Clinical Interpretation:</strong><br />
                  {activeResult.comments}
                </div>

                {/* Pathologist Validation Action Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    Sign-off: <strong>{activeResult.pathologistSign}</strong>
                  </div>

                  {selectedOrder.status.includes('Verified') ? (
                    <div style={{ background: '#dcfce7', color: '#15803d', padding: '6px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Check size={16} /> Certified & Signed by Pathologist
                    </div>
                  ) : (
                    <button 
                      className="btn btn-primary btn-sm"
                      style={{ background: '#16a34a', border: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                      onClick={handlePathologistSign}
                    >
                      <ShieldCheck size={15} /> Pathologist Validate & Sign (SIG-PATH-88902)
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                <FileText size={36} color="#94a3b8" style={{ marginBottom: '10px' }} />
                <h4 style={{ margin: '0 0 6px 0', fontWeight: 700 }}>No Results Entered Yet</h4>
                <p style={{ fontSize: '0.82rem', margin: 0 }}>Click "Import Analyzer Feed" to pull live telemetry results from the clinical chemistry analyzer.</p>
              </div>
            )}

          </div>

        </div>

        {/* Result Amendment Modal */}
        {showAmendModal && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '480px', width: '90%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309', marginBottom: '10px' }}>
                <Edit3 size={20} />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>
                  Amend Certified Laboratory Result
                </h3>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '14px' }}>
                Amending an issued laboratory report requires strict clinical justification. All amendments are permanently logged into the LIS audit ledger.
              </p>

              <form onSubmit={handleAmendSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label className="form-label">Analyte Parameter</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={amendAnalyte}
                    onChange={e => setAmendAnalyte(e.target.value)}
                    required 
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Original Value</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={amendOldVal}
                      disabled 
                    />
                  </div>
                  <div>
                    <label className="form-label">Corrected / New Value</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      className="form-input" 
                      value={amendNewVal}
                      onChange={e => setAmendNewVal(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Clinical Justification for Amendment</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={amendReason}
                    onChange={e => setAmendReason(e.target.value)}
                    required 
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAmendModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm" style={{ background: '#d97706', border: 'none' }}>
                    Issue Certified Amendment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
