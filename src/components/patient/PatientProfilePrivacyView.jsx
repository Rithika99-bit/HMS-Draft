import React, { useState } from 'react';
import { useEmr } from '../../context/EmrContext';
import { 
  User, Phone, Mail, MapPin, ShieldCheck, 
  CreditCard, Eye, Lock, Edit3, Send, AlertCircle, Check 
} from 'lucide-react';

export default function PatientProfilePrivacyView({ onShowToast }) {
  const { patientRecord, submitCorrectionRequest } = useEmr();
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [correctionForm, setCorrectionForm] = useState({
    section: 'Demographics & Address',
    currentText: '742 Evergreen Terrace, Springfield, IL 62704',
    requestedText: '742 Evergreen Terrace, Suite 5A, Springfield, IL 62704',
    reason: 'Updated apartment suite number after relocation.'
  });

  const handleCorrectionSubmit = (e) => {
    e.preventDefault();
    submitCorrectionRequest(correctionForm, patientRecord.demographics.fullName);
    if (onShowToast) onShowToast('Correction request submitted to Medical Records Department (MRD)!', 'success');
    setShowCorrectionModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 2 Column Layout: Demographics & Insurance / Access Logs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.6fr', gap: '20px' }}>
        
        {/* Left Column: Demographics & Emergency Contacts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Demographics Card */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={18} color="#0284c7" />
                <h3 className="dash-card-title">Personal Demographics</h3>
              </div>
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => setShowCorrectionModal(true)}
                style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Edit3 size={12} /> Request Edit
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.75rem' }}>FULL NAME</span>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{patientRecord.demographics.fullName}</div>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.75rem' }}>DATE OF BIRTH & AGE</span>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{patientRecord.demographics.dateOfBirth} ({patientRecord.demographics.age} yrs)</div>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.75rem' }}>PRIMARY PHONE</span>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{patientRecord.demographics.primaryPhone}</div>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.75rem' }}>EMAIL ADDRESS</span>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{patientRecord.demographics.email}</div>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <span style={{ color: '#64748b', fontSize: '0.75rem' }}>RESIDENTIAL ADDRESS</span>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>
                  {patientRecord.demographics.address.street}, {patientRecord.demographics.address.city}, {patientRecord.demographics.address.state} {patientRecord.demographics.address.postalCode}
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={18} color="#16a34a" />
                <h3 className="dash-card-title">Emergency Contacts & Next of Kin</h3>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {patientRecord.emergencyContacts.map(ec => (
                <div key={ec.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', background: '#f8fafc' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a' }}>{ec.name}</div>
                    {ec.isPrimary && (
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                        Primary Healthcare Proxy
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 600 }}>{ec.relationship}</div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '4px' }}>
                    Phone: <strong>{ec.phone}</strong> • {ec.email}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Insurance & Privacy Access Transparency Log */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Insurance Card */}
          <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)', color: '#ffffff', borderRadius: '14px', padding: '20px 24px', boxShadow: '0 10px 25px rgba(30, 58, 138, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '1px' }}>Healthcare Insurance Policy</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{patientRecord.insurance.insuranceProvider}</div>
              </div>
              <CreditCard size={28} color="#93c5fd" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.82rem', marginTop: '14px' }}>
              <div>
                <span style={{ color: '#93c5fd', fontSize: '0.72rem' }}>POLICY NUMBER</span>
                <div style={{ fontWeight: 700 }}>{patientRecord.insurance.policyNumber}</div>
              </div>
              <div>
                <span style={{ color: '#93c5fd', fontSize: '0.72rem' }}>GROUP NUMBER</span>
                <div style={{ fontWeight: 700 }}>{patientRecord.insurance.groupNumber}</div>
              </div>
              <div>
                <span style={{ color: '#93c5fd', fontSize: '0.72rem' }}>ANNUAL COVERAGE</span>
                <div style={{ fontWeight: 700, color: '#34d399' }}>{patientRecord.insurance.sumInsuredAnnual}</div>
              </div>
              <div>
                <span style={{ color: '#93c5fd', fontSize: '0.72rem' }}>PRE-AUTH STATUS</span>
                <div style={{ fontWeight: 700, color: '#38bdf8' }}>{patientRecord.insurance.preAuthStatus}</div>
              </div>
            </div>
          </div>

          {/* Privacy & Record Access Transparency Log */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={18} color="#0284c7" />
                <h3 className="dash-card-title">Record Access Transparency Log</h3>
              </div>
              <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: 700 }}>
                HIPAA Compliant
              </span>
            </div>
            <p style={{ margin: '0 0 12px 0', fontSize: '0.78rem', color: '#64748b' }}>
              You have the right to inspect who has accessed your medical file across the hospital network.
            </p>

            <table className="dash-table">
              <thead>
                <tr>
                  <th>Accessed By</th>
                  <th>Purpose / Department</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {patientRecord.accessLogs.map(log => (
                  <tr key={log.id}>
                    <td>
                      <div style={{ fontWeight: 700 }}>{log.accessedBy}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{log.role}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8rem' }}>{log.purpose}</div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{log.department}</div>
                    </td>
                    <td style={{ fontSize: '0.78rem', color: '#475569' }}>{log.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* Correction Request Modal */}
      {showCorrectionModal && (
        <div className="modal-overlay" style={{ zIndex: 1200 }}>
          <div className="modal-content-card" style={{ maxWidth: '480px', width: '90%' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
              Submit EMR Correction Request
            </h3>
            <p style={{ margin: '0 0 14px 0', fontSize: '0.82rem', color: '#64748b' }}>
              Under medical governance policies, demographic corrections are reviewed by the Medical Records Department (MRD).
            </p>

            <form onSubmit={handleCorrectionSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label className="form-label">Record Section</label>
                <select 
                  className="form-input" 
                  value={correctionForm.section}
                  onChange={e => setCorrectionForm({ ...correctionForm, section: e.target.value })}
                >
                  <option value="Demographics & Address">Demographics & Address</option>
                  <option value="Contact Information">Contact Information (Phone / Email)</option>
                  <option value="Emergency Contact">Emergency Contact</option>
                  <option value="Insurance Policy Details">Insurance Policy Details</option>
                </select>
              </div>

              <div>
                <label className="form-label">Current Information on Record</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={correctionForm.currentText}
                  onChange={e => setCorrectionForm({ ...correctionForm, currentText: e.target.value })} 
                />
              </div>

              <div>
                <label className="form-label">Requested New Information</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={correctionForm.requestedText}
                  onChange={e => setCorrectionForm({ ...correctionForm, requestedText: e.target.value })} 
                  required 
                />
              </div>

              <div>
                <label className="form-label">Reason for Request</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={correctionForm.reason}
                  onChange={e => setCorrectionForm({ ...correctionForm, reason: e.target.value })} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowCorrectionModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Submit to MRD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
