import React from 'react';
import { useEmr } from '../../context/EmrContext';
import { 
  Calendar, Clock, User, Activity, AlertTriangle, 
  CheckCircle, FileText, Pill, ArrowRight, Stethoscope, 
  Droplets, ShieldAlert, Sparkles, ChevronRight, Eye
} from 'lucide-react';

export default function DoctorDashboard({ onOpenPatientChart, onOpenEmergency, onShowToast }) {
  const { patientRecord, acknowledgeResult } = useEmr();

  const handleAcknowledge = (id, name) => {
    acknowledgeResult(id, 'Dr. Sarah Mitchell, MD');
    if (onShowToast) onShowToast(`Acknowledged diagnostic result for ${name}`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 4 KPI Banner Cards */}
      <div className="dash-stats-grid">
        <div className="dash-stat-card" style={{ borderLeft: '4px solid #0284c7' }}>
          <div className="dash-stat-label">Today's OPD Queue</div>
          <div className="dash-stat-val">18 Patients</div>
          <div className="dash-stat-sub">4 in waiting room • Next: Sarah Connor</div>
        </div>

        <div className="dash-stat-card" style={{ borderLeft: '4px solid #f59e0b' }}>
          <div className="dash-stat-label">Patients Requiring Attention</div>
          <div className="dash-stat-val" style={{ color: '#d97706' }}>3 Flagged</div>
          <div className="dash-stat-sub">1 Critical Lab • 1 High BP • 1 Post-Op</div>
        </div>

        <div className="dash-stat-card" style={{ borderLeft: '4px solid #10b981' }}>
          <div className="dash-stat-label">Recent Results Ready</div>
          <div className="dash-stat-val" style={{ color: '#059669' }}>2 Unreviewed</div>
          <div className="dash-stat-sub">CMP Lipid Battery & 12-Lead ECG</div>
        </div>

        <div className="dash-stat-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
          <div className="dash-stat-label">Clinical Alerts & Refills</div>
          <div className="dash-stat-val" style={{ color: '#7c3aed' }}>
            {patientRecord.refillRequests.filter(r => r.status.includes('Pending')).length + 2} Pending
          </div>
          <div className="dash-stat-sub">E-Prescription sign-offs pending</div>
        </div>
      </div>

      {/* Main Grid: Today's Appointments & Attention Stream */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px' }}>
        
        {/* Left Column: Today's Outpatient Queue */}
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">Today's Appointment Queue & Clinical Triage</h2>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Cardiology Outpatient Wing Suite 304 • Live OPD Feed</div>
            </div>
            <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700 }}>
              Token #14 Active
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Patient & UHID</th>
                  <th>Clinical Reason</th>
                  <th>Triage Vitals</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Primary Patient: Sarah Connor */}
                <tr style={{ background: '#f0fdf4' }}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img 
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" 
                        alt="Sarah Connor" 
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 800, color: '#0f172a' }}>{patientRecord.demographics.fullName}</div>
                        <div style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 600 }}>{patientRecord.registration.uhid}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>6-Month Routine Cardiac Check</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Lisinopril refill & CMP review</div>
                  </td>
                  <td>
                    <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '3px 8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                      BP 124/80 • HR 72
                    </span>
                  </td>
                  <td>
                    <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                      Ready for Consult
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => onOpenPatientChart(patientRecord.registration.uhid)}
                      style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <span>Open Chart</span>
                      <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>

                {/* Patient 2: Eleanor Vance */}
                <tr>
                  <td>
                    <div style={{ fontWeight: 700 }}>Eleanor Vance</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>PT-9021 • 62y / F</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem' }}>Post-Angioplasty Follow-up</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Stent patency check</div>
                  </td>
                  <td>
                    <span style={{ background: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '6px', fontSize: '0.78rem' }}>
                      BP 125/80 • HR 72
                    </span>
                  </td>
                  <td>
                    <span style={{ background: '#fef3c7', color: '#d97706', padding: '3px 8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600 }}>
                      In Waiting Room
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => onOpenPatientChart('PT-9021')}
                      style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                    >
                      View Chart
                    </button>
                  </td>
                </tr>

                {/* Patient 3: Robert Chen */}
                <tr>
                  <td>
                    <div style={{ fontWeight: 700 }}>Robert Chen</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>PT-9022 • 45y / M</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem' }}>Arrhythmia & Palpitations</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Holter monitor review</div>
                  </td>
                  <td>
                    <span style={{ background: '#fee2e2', color: '#dc2626', padding: '3px 8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                      BP 138/90 • HR 88
                    </span>
                  </td>
                  <td>
                    <span style={{ background: '#e0e7ff', color: '#4338ca', padding: '3px 8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600 }}>
                      In Diagnostic Lab
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => onOpenPatientChart('PT-9022')}
                      style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                    >
                      View Chart
                    </button>
                  </td>
                </tr>

                {/* Patient 4: James Thornton */}
                <tr>
                  <td>
                    <div style={{ fontWeight: 700 }}>James Thornton</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>PT-9024 • 71y / M</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem' }}>Pacemaker Routine Check</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Telemetry interrogation</div>
                  </td>
                  <td>
                    <span style={{ background: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '6px', fontSize: '0.78rem' }}>
                      BP 130/82 • HR 65
                    </span>
                  </td>
                  <td>
                    <span style={{ background: '#f8fafc', color: '#64748b', padding: '3px 8px', borderRadius: '6px', fontSize: '0.78rem' }}>
                      Scheduled 1:30 PM
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => onOpenPatientChart('PT-9024')}
                      style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                    >
                      View Chart
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Patients Requiring Attention & Recent Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Patients Requiring Attention */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={18} color="#d97706" />
                <h3 className="dash-card-title">Patients Requiring Attention</h3>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '12px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#92400e' }}>Sarah Connor (UHID-08942)</span>
                  <span style={{ fontSize: '0.75rem', background: '#fef3c7', color: '#92400e', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>Borderline LDL</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#78350f' }}>
                  Fasting LDL cholesterol at 104 mg/dL (target &lt; 100 mg/dL). Statins dose review recommended.
                </div>
              </div>

              <div style={{ padding: '12px', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#991b1b' }}>Robert Chen (PT-9022)</span>
                  <span style={{ fontSize: '0.75rem', background: '#fee2e2', color: '#991b1b', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>Elevated BP</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#7f1d1d' }}>
                  Stage 1 HTN spike (138/90 mm Hg). Awaiting 24-hr Holter report.
                </div>
              </div>

              <div style={{ padding: '12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#166534' }}>Eleanor Vance (PT-9021)</span>
                  <span style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#166534', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>Post-Op Day 14</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#14532d' }}>
                  Angioplasty recovery smooth. Radial puncture site healed.
                </div>
              </div>
            </div>
          </div>

          {/* Recent Diagnostic Results to Acknowledge */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Droplets size={18} color="#0284c7" />
                <h3 className="dash-card-title">Recent Lab & Imaging Results</h3>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {patientRecord.labAndImagingReports.slice(0, 2).map((rep) => (
                <div key={rep.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', background: '#ffffff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>{rep.testName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{rep.modality} • {rep.date}</div>
                    </div>
                    <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {rep.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: '#475569', marginBottom: '10px' }}>
                    {rep.findings || 'Fasting glucose 94 mg/dL • Total Chol 186 mg/dL • Creatinine 0.88 mg/dL'}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Verified by: {rep.labPathologist}</span>
                    {rep.acknowledgedByDoctor ? (
                      <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle size={14} /> Acknowledged
                      </span>
                    ) : (
                      <button 
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 8px', fontSize: '0.75rem', background: '#0284c7', color: '#ffffff', border: 'none' }}
                        onClick={() => handleAcknowledge(rep.id, rep.testName)}
                      >
                        Acknowledge Result
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
