import React, { useState } from 'react';
import { useEmr } from '../../context/EmrContext';
import { 
  User, Stethoscope, AlertTriangle, Pill, Activity, 
  FileText, Droplets, HeartPulse, Scissors, FileCheck, 
  ShieldCheck, Download, Eye, CheckCircle 
} from 'lucide-react';

export default function PatientMedicalRecordView({ onShowToast }) {
  const { patientRecord } = useEmr();
  const [activeSubTab, setActiveSubTab] = useState('diagnoses');

  const subTabs = [
    { id: 'diagnoses', label: 'My Diagnoses', icon: Stethoscope },
    { id: 'allergies', label: 'Allergies & Alert Card', icon: AlertTriangle, alert: true },
    { id: 'medications', label: 'Active Medications', icon: Pill },
    { id: 'vitals', label: 'Vitals & Health Gauges', icon: Activity },
    { id: 'notes', label: 'Doctor Visit Notes', icon: FileText },
    { id: 'labs-imaging', label: 'Test & Scan Reports', icon: Droplets },
    { id: 'procedures', label: 'Surgeries & Procedures', icon: Scissors },
    { id: 'discharge', label: 'Discharge Summaries', icon: FileCheck }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Subnav Pills */}
      <div className="admin-subnav-tabs" style={{ background: '#ffffff', padding: '8px 12px', overflowX: 'auto', flexWrap: 'nowrap' }}>
        {subTabs.map(t => {
          const Icon = t.icon;
          const isActive = activeSubTab === t.id;
          return (
            <button
              key={t.id}
              className={`admin-sub-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveSubTab(t.id)}
              style={{ whiteSpace: 'nowrap', fontSize: '0.82rem', padding: '8px 14px' }}
            >
              <Icon size={15} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUBTAB 1: DIAGNOSES */}
      {activeSubTab === 'diagnoses' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">My Health Conditions & Diagnoses</h2>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Verified medical diagnoses documented by your healthcare team</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {patientRecord.history.chronicConditions.map((cond, idx) => (
              <div key={idx} style={{ padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{cond.condition}</h3>
                    <div style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 600 }}>ICD-10 Code: {cond.icdCode}</div>
                  </div>
                  <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {cond.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '6px' }}>
                  Diagnosed on: <strong>{cond.diagnosisDate}</strong> by {cond.attending}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: ALLERGIES */}
      {activeSubTab === 'allergies' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Emergency Medical Alert Bracelet Simulation */}
          <div style={{ background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)', color: '#ffffff', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 8px 20px rgba(220, 38, 38, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertTriangle size={24} color="#ffffff" />
                <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.5px' }}>EMERGENCY MEDICAL ALLERGY BRACELET</span>
              </div>
              <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                Blood Group: {patientRecord.allergiesAndBlood.bloodGroup}
              </span>
            </div>
            <p style={{ margin: '0 0 14px 0', fontSize: '0.85rem', color: '#fee2e2' }}>
              Show this card to any healthcare worker, EMT, or emergency room staff before receiving medications or treatment.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {patientRecord.allergiesAndBlood.allergies.map(alg => (
                <div key={alg.id} style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(5px)', padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{alg.allergen}</div>
                  <div style={{ fontSize: '0.75rem', color: '#fecaca' }}>Reaction: {alg.reaction}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="dash-card">
            <h3 className="dash-card-title" style={{ marginBottom: '12px' }}>Detailed Allergy Registry</h3>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Allergen Substance</th>
                  <th>Category</th>
                  <th>Severity</th>
                  <th>Reaction Details</th>
                  <th>Verified By</th>
                </tr>
              </thead>
              <tbody>
                {patientRecord.allergiesAndBlood.allergies.map(alg => (
                  <tr key={alg.id}>
                    <td style={{ fontWeight: 700, color: '#dc2626' }}>{alg.allergen}</td>
                    <td>{alg.category}</td>
                    <td>
                      <span style={{ background: '#fee2e2', color: '#dc2626', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                        {alg.severity}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem' }}>{alg.reaction}</td>
                    <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{alg.verifiedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 3: MEDICATIONS */}
      {activeSubTab === 'medications' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">My Active Prescriptions & Medications</h2>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Current medication schedule with usage instructions and prescriber info</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {patientRecord.medications.active.map(med => (
              <div key={med.id} style={{ padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                    {med.drugName} <span style={{ color: '#0284c7' }}>{med.dosage}</span>
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: '#16a34a', fontWeight: 700, marginTop: '2px' }}>
                    How to take: {med.frequency} ({med.route})
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '4px' }}>
                    <strong>Purpose:</strong> {med.purpose} • Prescribed by {med.prescriber}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                    {med.refillsRemaining} Refills Available
                  </span>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                    Adherence: {med.complianceRate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: VITALS */}
      {activeSubTab === 'vitals' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">My Vital Signs & Health Metrics</h2>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Recorded vitals from clinic visits and telehealth sessions</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
            <div style={{ background: '#f0f9ff', padding: '16px', borderRadius: '10px', border: '1px solid #bae6fd', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#0369a1', fontWeight: 700 }}>BLOOD PRESSURE</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0c4a6e', marginTop: '4px' }}>124 / 80</div>
              <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700, marginTop: '4px' }}>✓ Normal / Healthy</div>
            </div>

            <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '10px', border: '1px solid #bbf7d0', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 700 }}>HEART RATE</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#14532d', marginTop: '4px' }}>72 BPM</div>
              <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700, marginTop: '4px' }}>✓ Optimal Range</div>
            </div>

            <div style={{ background: '#faf5ff', padding: '16px', borderRadius: '10px', border: '1px solid #e9d5ff', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#7e22ce', fontWeight: 700 }}>OXYGEN LEVEL (SPO2)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#581c87', marginTop: '4px' }}>99%</div>
              <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700, marginTop: '4px' }}>✓ Excellent</div>
            </div>

            <div style={{ background: '#fffbeb', padding: '16px', borderRadius: '10px', border: '1px solid #fde68a', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: 700 }}>BODY MASS INDEX</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#78350f', marginTop: '4px' }}>22.4</div>
              <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700, marginTop: '4px' }}>✓ Healthy Weight (63 kg)</div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: CLINICAL NOTES */}
      {activeSubTab === 'notes' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">Doctor Consultation & Visit Summaries</h2>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Clinical encounter notes released to your patient portal</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {patientRecord.clinicalNotes.map(note => (
              <div key={note.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px', background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{note.type}</h3>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{note.author} • {note.date}</div>
                  </div>
                  <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                    Verified by Physician
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5, background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                  <strong>Doctor's Plan & Instructions:</strong><br />
                  <span style={{ whiteSpace: 'pre-line' }}>{note.plan}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 6: LABS & IMAGING */}
      {activeSubTab === 'labs-imaging' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">Laboratory & Diagnostic Imaging Reports</h2>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>View doctor-verified laboratory tests, blood work, ECG, and X-Ray results</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {patientRecord.labAndImagingReports.map(rep => (
              <div key={rep.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{rep.testName}</h3>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{rep.modality} • {rep.date}</div>
                  </div>
                  <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {rep.status}
                  </span>
                </div>
                <p style={{ margin: '8px 0', fontSize: '0.85rem', color: '#475569' }}>
                  {rep.findings || 'All metabolic markers verified. Fasting blood glucose normal.'}
                </p>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Verified by: {rep.labPathologist}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 7: PROCEDURES */}
      {activeSubTab === 'procedures' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">Surgical & Medical Procedures History</h2>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Record of all surgical procedures performed at MediCare facilities</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {patientRecord.history.surgicalHistory.map((proc, idx) => (
              <div key={idx} style={{ padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{proc.procedure}</h3>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                  Performed on: <strong>{proc.date}</strong> by {proc.surgeon} at {proc.hospital}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#16a34a', fontWeight: 600, marginTop: '8px' }}>
                  Outcome: {proc.outcome}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 8: DISCHARGE SUMMARIES */}
      {activeSubTab === 'discharge' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">Hospital Discharge Summaries</h2>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Post-admission discharge summaries with medication guidance and home care advice</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {patientRecord.admissionsAndDischarges.map((adm, idx) => (
              <div key={idx} style={{ padding: '18px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{adm.department}</h3>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                  Admission: {adm.admissionDate} → Discharge: {adm.dischargeDate}
                </div>
                <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#334155', background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                  <strong>Home Care Advice:</strong> {adm.dischargeAdvice}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
