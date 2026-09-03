import React, { useState } from 'react';
import { useEmr } from '../../context/EmrContext';
import { 
  Droplets, HeartPulse, CheckCircle, AlertTriangle, 
  FileText, Download, Share2, Eye, Check, Clock, Activity 
} from 'lucide-react';

export default function DoctorResultsView({ onShowToast }) {
  const { patientRecord, acknowledgeResult } = useEmr();
  const [selectedReport, setSelectedReport] = useState(patientRecord.labAndImagingReports[0]);
  const [showComparison, setShowComparison] = useState(false);

  const handleAcknowledge = (repId, testName) => {
    acknowledgeResult(repId, 'Dr. Sarah Mitchell, MD');
    if (onShowToast) onShowToast(`Result for ${testName} acknowledged and signed!`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Banner */}
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Diagnostic Results & Reports Studio</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Review laboratory biochemistry, PACS imaging studies, compare historical trends, and sign clinical acknowledgments
            </div>
          </div>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setShowComparison(!showComparison)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Activity size={15} />
            <span>{showComparison ? 'Hide Historical Comparison' : 'Compare Historical Labs'}</span>
          </button>
        </div>

        {/* Historical Delta Comparison View */}
        {showComparison && (
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
              Multi-Year Analyte Historical Comparison (Sarah Connor)
            </h3>
            <table className="dash-table" style={{ background: '#ffffff' }}>
              <thead>
                <tr>
                  <th>Analyte Parameter</th>
                  <th>Current (Sep 2026)</th>
                  <th>Prior (Jan 2026)</th>
                  <th>Baseline (Nov 2019)</th>
                  <th>Reference Target</th>
                  <th>Clinical Trend</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 700 }}>Total Cholesterol</td>
                  <td style={{ fontWeight: 800, color: '#16a34a' }}>186 mg/dL</td>
                  <td>192 mg/dL</td>
                  <td>228 mg/dL</td>
                  <td style={{ fontSize: '0.8rem', color: '#64748b' }}>&lt; 200 mg/dL</td>
                  <td><span style={{ color: '#16a34a', fontWeight: 700 }}>↓ 18.4% (Improved on Statin)</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>LDL Cholesterol</td>
                  <td style={{ fontWeight: 800, color: '#d97706' }}>104 mg/dL (Borderline)</td>
                  <td>112 mg/dL</td>
                  <td>148 mg/dL</td>
                  <td style={{ fontSize: '0.8rem', color: '#64748b' }}>&lt; 100 mg/dL</td>
                  <td><span style={{ color: '#16a34a', fontWeight: 700 }}>↓ 29.7% (Controlled)</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>Fasting Blood Glucose</td>
                  <td style={{ fontWeight: 800, color: '#16a34a' }}>94 mg/dL</td>
                  <td>91 mg/dL</td>
                  <td>88 mg/dL</td>
                  <td style={{ fontSize: '0.8rem', color: '#64748b' }}>70 - 99 mg/dL</td>
                  <td><span style={{ color: '#0284c7', fontWeight: 700 }}>↔ Stable Euglycemic</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>Serum Creatinine / eGFR</td>
                  <td style={{ fontWeight: 800, color: '#16a34a' }}>0.88 mg/dL (eGFR 96)</td>
                  <td>0.86 mg/dL (eGFR 98)</td>
                  <td>0.82 mg/dL (eGFR 102)</td>
                  <td style={{ fontSize: '0.8rem', color: '#64748b' }}>&gt; 90 mL/min</td>
                  <td><span style={{ color: '#16a34a', fontWeight: 700 }}>✓ Normal Renal Function</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Master-Detail Split Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '20px' }}>
          
          {/* Reports List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {patientRecord.labAndImagingReports.map(rep => {
              const isSelected = selectedReport?.id === rep.id;
              const isLab = !!rep.highlights;
              return (
                <div
                  key={rep.id}
                  onClick={() => setSelectedReport(rep)}
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {isLab ? <Droplets size={16} color="#0284c7" /> : <HeartPulse size={16} color="#0d9488" />}
                      <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a' }}>{rep.testName}</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                      {rep.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
                    {rep.modality} • {rep.date}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Pathologist: {rep.labPathologist}</span>
                    {rep.acknowledgedByDoctor ? (
                      <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <Check size={12} /> Acknowledged
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.72rem', color: '#d97706', fontWeight: 700 }}>
                        ● Awaiting Sign-off
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Report Dossier */}
          {selectedReport && (
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>{selectedReport.testName}</h3>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>
                    Modality: <strong>{selectedReport.modality}</strong> • Date: <strong>{selectedReport.date}</strong> • UHID: {patientRecord.registration.uhid}
                  </div>
                </div>
                <div>
                  {selectedReport.acknowledgedByDoctor ? (
                    <div style={{ background: '#dcfce7', color: '#15803d', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle size={15} /> Acknowledged by Dr. Mitchell
                    </div>
                  ) : (
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAcknowledge(selectedReport.id, selectedReport.testName)}
                    >
                      Sign & Acknowledge Result
                    </button>
                  )}
                </div>
              </div>

              {/* If Lab Analyte Table */}
              {selectedReport.highlights ? (
                <div>
                  <table className="dash-table" style={{ background: '#f8fafc', marginBottom: '16px' }}>
                    <thead>
                      <tr>
                        <th>Analyte Parameter</th>
                        <th>Observed Value</th>
                        <th>Reference Range</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedReport.highlights.map((h, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 700 }}>{h.parameter}</td>
                          <td style={{ fontWeight: 800, color: h.flag === 'Borderline' ? '#d97706' : '#0f172a' }}>{h.value}</td>
                          <td style={{ fontSize: '0.82rem', color: '#64748b' }}>{h.reference}</td>
                          <td>
                            <span style={{ background: h.flag === 'Borderline' ? '#fef3c7' : '#dcfce7', color: h.flag === 'Borderline' ? '#d97706' : '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                              {h.flag}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ fontSize: '0.82rem', color: '#475569', background: '#f1f5f9', padding: '12px', borderRadius: '8px' }}>
                    <strong>Clinical Interpretation:</strong> Fasting blood glucose, electrolytes, and renal function are completely within normal physiological limits. Fasting LDL cholesterol is borderline at 104 mg/dL; continued Atorvastatin 20mg daily recommended with lifestyle optimization.
                  </div>
                </div>
              ) : (
                /* If Imaging / Diagnostic Findings */
                <div>
                  <div style={{ background: '#0f172a', color: '#38bdf8', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px' }}>
                    <div style={{ color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '6px', marginBottom: '8px' }}>
                      PACS DICOM ARCHIVE • WORKSTATION VERIFIED
                    </div>
                    {selectedReport.findings}
                  </div>

                  <div style={{ fontSize: '0.82rem', color: '#475569', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '12px', borderRadius: '8px' }}>
                    <strong>Radiologist Impression:</strong> Stable baseline study with no acute cardiopulmonary pathology. Verified by {selectedReport.labPathologist}.
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
