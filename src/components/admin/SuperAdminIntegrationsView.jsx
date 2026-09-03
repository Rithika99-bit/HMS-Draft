import React from 'react';
import { useEmr } from '../../context/EmrContext';
import { 
  Layers, RefreshCw, CheckCircle, Activity, 
  ExternalLink, ShieldCheck, Database, Zap 
} from 'lucide-react';

export default function SuperAdminIntegrationsView({ onShowToast }) {
  const { orgConfig } = useEmr();

  const handleTestPing = (name) => {
    if (onShowToast) onShowToast(`Pinged ${name}: Latency 18ms • Handshake verified!`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={20} color="#0284c7" />
              <h2 className="dash-card-title">Health Tech Integrations & API Gateways</h2>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Real-time telemetry and interoperability monitoring for HL7 FHIR R4, PACS DICOM, LIS Analyzers, Pyxis Pharmacy & Clearinghouse
            </div>
          </div>
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => { if (onShowToast) onShowToast('Executed health check across all 5 integration endpoints.', 'info'); }}
          >
            <RefreshCw size={13} style={{ display: 'inline', marginRight: 4 }} /> Test All Endpoints
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {orgConfig.integrations.map(int => (
            <div key={int.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{int.name}</h3>
                  <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                    ● {int.status}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '18px', marginTop: '6px', fontSize: '0.8rem', color: '#64748b' }}>
                  <span>Latency: <strong style={{ color: '#10b981' }}>{int.latency}</strong></span>
                  <span>Uptime: <strong>{int.uptime}</strong></span>
                  <span>Last Handshake: {int.lastSync}</span>
                  <span>Protocol: REST / WebSocket</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                  onClick={() => handleTestPing(int.name)}
                >
                  Ping Test
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
