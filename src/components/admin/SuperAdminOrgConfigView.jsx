import React, { useState } from 'react';
import { useEmr } from '../../context/EmrContext';
import { 
  Building, Settings, Layers, MapPin, 
  Check, Plus, Sparkles, BookOpen, BellRing 
} from 'lucide-react';

export default function SuperAdminOrgConfigView({ onShowToast }) {
  const { orgConfig } = useEmr();
  const [activeConfigTab, setActiveConfigTab] = useState('facilities');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Organization Hierarchy & System Configuration</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Multi-facility campus configuration, clinical terminology dictionaries, workflow triggers, and document schemas
            </div>
          </div>
        </div>

        {/* Subnav Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
          <button 
            className={`admin-sub-btn ${activeConfigTab === 'facilities' ? 'active' : ''}`}
            onClick={() => setActiveConfigTab('facilities')}
            style={{ fontSize: '0.85rem' }}
          >
            <Building size={15} />
            <span>Campuses & Branches ({orgConfig.branches.length})</span>
          </button>
          <button 
            className={`admin-sub-btn ${activeConfigTab === 'terminology' ? 'active' : ''}`}
            onClick={() => setActiveConfigTab('terminology')}
            style={{ fontSize: '0.85rem' }}
          >
            <BookOpen size={15} />
            <span>Clinical Dictionaries (ICD-10 / SNOMED)</span>
          </button>
          <button 
            className={`admin-sub-btn ${activeConfigTab === 'workflows' ? 'active' : ''}`}
            onClick={() => setActiveConfigTab('workflows')}
            style={{ fontSize: '0.85rem' }}
          >
            <BellRing size={15} />
            <span>Automated Triggers & Notifications</span>
          </button>
        </div>

        {/* Tab 1: Facilities */}
        {activeConfigTab === 'facilities' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {orgConfig.branches.map(br => (
              <div key={br.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{br.name}</h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                    Type: <strong>{br.type}</strong> • Capacity: <strong>{br.beds} Inpatient Beds</strong> • Campus ID: {br.id}
                  </div>
                </div>
                <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                  ● {br.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Clinical Dictionaries */}
        {activeConfigTab === 'terminology' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0, fontWeight: 800 }}>ICD-10-CM Clinical Diagnoses Dictionary</h4>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Version 2026.1 (72,400 codes active) • Auto-suggestions enabled in Doctor chart</div>
                </div>
                <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                  Synced & Active
                </span>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0, fontWeight: 800 }}>LOINC Laboratory & Clinical Observation Codes</h4>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Universal standard for diagnostic laboratory test coding and units</div>
                </div>
                <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                  Synced & Active
                </span>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0, fontWeight: 800 }}>RxNorm / First Databank Drug Interaction Engine</h4>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Automated real-time contraindication checker on physician e-prescriptions</div>
                </div>
                <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                  Active (Real-Time)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Workflows */}
        {activeConfigTab === 'workflows' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '10px', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: 0, fontWeight: 800 }}>Automated Critical Lab Panic Value Escalation</h4>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Triggers high-priority SMS/Pager alerts to attending physician when serum Potassium &gt; 6.0 or Troponin elevated</div>
              </div>
              <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                Enabled
              </span>
            </div>

            <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '10px', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: 0, fontWeight: 800 }}>Automated Refill Request Forwarding</h4>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Routes patient portal refill requests directly to pharmacy dispensary queue if doctor pre-authorization is active</div>
              </div>
              <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                Enabled
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
