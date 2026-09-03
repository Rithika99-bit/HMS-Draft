import React, { useState } from 'react';
import { useLab } from '../../context/LabContext';
import { Download, ShieldCheck, FileText, History, Search } from 'lucide-react';

export default function LabReportsArchiveView({ onShowToast }) {
  const { labOrders, labResults } = useLab();
  const [searchTerm, setSearchTerm] = useState('');

  // Only show orders that have a corresponding result
  const reportableOrders = labOrders.filter(o => labResults[o.orderId]);

  const filtered = reportableOrders.filter(o => {
    const result = labResults[o.orderId];
    return (
      o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result?.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDownload = (orderId, patientName) => {
    if (onShowToast) onShowToast(`Generating certified PDF report for ${patientName} (${orderId})...`, 'info');
  };

  const handleViewAmendmentHistory = (orderId) => {
    if (onShowToast) onShowToast(`Loading LIS amendment history for ${orderId}...`, 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={20} color="#0284c7" />
              <h2 className="dash-card-title">Certified Laboratory Reports Archive & PDF Generator</h2>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Preliminary, final, and amended certified reports with pathologist digital signature, amendment history tracking
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <Search size={15} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Search by order ID, patient name or report status..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '36px' }}
          />
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            <FileText size={36} color="#94a3b8" style={{ marginBottom: '10px' }} />
            <h4 style={{ margin: '0 0 6px 0', fontWeight: 700 }}>No Reports Available</h4>
            <p style={{ fontSize: '0.82rem', margin: 0 }}>
              Reports appear here after results are entered and verified. Use the Result Entry tab to import analyzer data and validate results.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map(order => {
              const result = labResults[order.orderId];
              const isCertified = result?.status?.includes('Final Certified') || result?.status?.includes('Amended');
              const isAmended = result?.status?.includes('Amended');

              return (
                <div
                  key={order.orderId}
                  style={{
                    border: `1px solid ${isAmended ? '#fde68a' : isCertified ? '#bbf7d0' : '#e2e8f0'}`,
                    borderRadius: '10px',
                    padding: '16px 20px',
                    background: isAmended ? '#fffbeb' : isCertified ? '#f0fdf4' : '#ffffff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '16px'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>{order.orderId}</span>
                      <span style={{
                        background: isAmended ? '#fef3c7' : isCertified ? '#dcfce7' : '#e0f2fe',
                        color: isAmended ? '#b45309' : isCertified ? '#15803d' : '#0284c7',
                        padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700
                      }}>
                        {result?.status}
                      </span>
                      {isAmended && (
                        <span style={{ background: '#fde68a', color: '#92400e', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>
                          ✏️ AMENDED REPORT
                        </span>
                      )}
                    </div>

                    <div style={{ fontWeight: 700, color: '#0284c7', fontSize: '0.9rem' }}>
                      {order.patientName} <span style={{ color: '#64748b', fontWeight: 400, fontSize: '0.78rem' }}>({order.patientUhid}, {order.patientAge}y/{order.patientGender})</span>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '4px' }}>
                      Tests: <strong>{order.tests.map(t => t.testName || t.name).join(', ')}</strong>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
                      Pathologist: <strong style={{ color: '#0f172a' }}>{result?.pathologistSign || 'Pending Validation'}</strong>
                    </div>

                    {result?.comments && (
                      <div style={{
                        marginTop: '8px', background: '#ffffff', border: '1px solid #e2e8f0',
                        borderRadius: '6px', padding: '8px 12px',
                        fontSize: '0.78rem', color: '#334155', fontStyle: 'italic'
                      }}>
                        <strong>Report Interpretation:</strong> {result.comments}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleDownload(order.orderId, order.patientName)}
                      style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem' }}
                    >
                      <Download size={13} /> Download PDF Report
                    </button>
                    {isAmended && (
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handleViewAmendmentHistory(order.orderId)}
                        style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: '#b45309', borderColor: '#fde68a' }}
                      >
                        <History size={13} /> Amendment History
                      </button>
                    )}
                    {isCertified && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#15803d', fontSize: '0.72rem', fontWeight: 700 }}>
                        <ShieldCheck size={13} /> Pathologist Certified
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
