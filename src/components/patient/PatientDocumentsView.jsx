import React, { useState } from 'react';
import { useEmr } from '../../context/EmrContext';
import { 
  FileText, Upload, Download, QrCode, FileCheck, 
  ExternalLink, Eye, Plus, Check, ShieldCheck 
} from 'lucide-react';

export default function PatientDocumentsView({ onShowToast }) {
  const { patientRecord, uploadPatientDocument } = useEmr();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: 'External COVID-19 & Flu Vaccination Certificate',
    category: 'Vaccination Record',
    description: 'Updated booster vaccine certificate from Springfield Community Clinic.'
  });

  const handleUpload = (e) => {
    e.preventDefault();
    uploadPatientDocument(uploadForm, patientRecord.demographics.fullName);
    if (onShowToast) onShowToast(`Uploaded document: "${uploadForm.title}"`, 'success');
    setShowUploadModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">My Medical Documents & E-Prescriptions</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Secure cloud vault containing digital prescriptions with QR verification, lab summaries, and uploaded external files
            </div>
          </div>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setShowUploadModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Upload size={14} />
            <span>Upload Document</span>
          </button>
        </div>

        {/* Upload Modal Dialog */}
        {showUploadModal && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '480px', width: '90%' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                Upload External Health Document
              </h3>

              <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label className="form-label">Document Title</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={uploadForm.title}
                    onChange={e => setUploadForm({ ...uploadForm, title: e.target.value })}
                    required 
                  />
                </div>

                <div>
                  <label className="form-label">Category</label>
                  <select 
                    className="form-input" 
                    value={uploadForm.category}
                    onChange={e => setUploadForm({ ...uploadForm, category: e.target.value })}
                  >
                    <option value="Vaccination Record">Vaccination Record</option>
                    <option value="External Lab Report">External Lab Report</option>
                    <option value="Prior Hospital Discharge Summary">Prior Hospital Discharge Summary</option>
                    <option value="Insurance Policy Document">Insurance Policy Document</option>
                    <option value="Government ID Proof">Government ID Proof</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Description / Notes</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={uploadForm.description}
                    onChange={e => setUploadForm({ ...uploadForm, description: e.target.value })}
                  />
                </div>

                <div style={{ background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
                  <Upload size={24} color="#0284c7" style={{ margin: '0 auto 6px auto' }} />
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>vaccine_record_2026.pdf (1.4 MB)</div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Ready for encrypted upload</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowUploadModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Upload to Vault
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Section 1: Verifiable Digital Prescriptions */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
            Digital E-Prescriptions with QR Verification
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {patientRecord.prescriptions.map(rx => (
              <div key={rx.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>{rx.id}</span>
                    <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                      Verified
                    </span>
                  </div>

                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0284c7', marginTop: '4px' }}>
                    {rx.items.map(i => `${i.drug} (${i.instructions})`).join(' • ')}
                  </div>

                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
                    Prescribed by: {rx.prescriber} on <strong>{rx.date}</strong> • Diagnosis: {rx.diagnosis}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', textAlign: 'center' }}>
                    <QrCode size={24} color="#0f172a" style={{ display: 'block', margin: '0 auto' }} />
                    <span style={{ fontSize: '0.65rem', color: '#64748b', fontFamily: 'monospace' }}>SHA-256</span>
                  </div>

                  <button 
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.78rem' }}
                    onClick={() => { if (onShowToast) onShowToast(`Downloaded prescription PDF for ${rx.id}`, 'info'); }}
                  >
                    <Download size={13} style={{ display: 'inline', marginRight: 4 }} /> PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Stored Documents & Consent Forms */}
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
            Stored Medical Documents & Certificates ({patientRecord.documentsAndConsent.length})
          </h3>

          <table className="dash-table">
            <thead>
              <tr>
                <th>Document Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Validity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patientRecord.documentsAndConsent.map(doc => (
                <tr key={doc.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{doc.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{doc.description}</div>
                  </td>
                  <td>{doc.category}</td>
                  <td>
                    <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                      {doc.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{doc.validity}</td>
                  <td>
                    <button 
                      className="btn btn-outline btn-sm"
                      style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                      onClick={() => { if (onShowToast) onShowToast(`Viewing document ${doc.title}`, 'info'); }}
                    >
                      <Eye size={12} style={{ display: 'inline', marginRight: 4 }} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
