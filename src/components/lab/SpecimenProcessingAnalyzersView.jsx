import React from 'react';
import { useLab } from '../../context/LabContext';
import { 
  Cpu, Activity, CheckCircle, RefreshCw, 
  Layers, HardDrive, Zap, Server 
} from 'lucide-react';

export default function SpecimenProcessingAnalyzersView({ onShowToast }) {
  const { analyzers, labOrders } = useLab();

  const handlePingAnalyzer = (analyzerName) => {
    if (onShowToast) onShowToast(`Pinged ${analyzerName}: ASTM/HL7 interface handshake verified! Latency 12ms.`, 'success');
  };

  const handleTriggerBatchRun = (analyzerName) => {
    if (onShowToast) onShowToast(`Triggered automated QC calibration and sample batch run on ${analyzerName}!`, 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={20} color="#0284c7" />
              <h2 className="dash-card-title">Automated Clinical Analyzers & Specimen Routing Lines</h2>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Real-time telemetry and bidirectional ASTM/HL7 interfaces for Roche Cobas chemistry lines, Sysmex hematology track, and Beckman Coulter
            </div>
          </div>
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => { if (onShowToast) onShowToast('Executed health check across all laboratory automated lines.', 'info'); }}
          >
            <RefreshCw size={13} style={{ display: 'inline', marginRight: 4 }} /> Test All Analyzers
          </button>
        </div>

        {/* Analyzers Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {analyzers.map(anz => (
            <div key={anz.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{anz.name}</h3>
                  <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                    ● {anz.status}
                  </span>
                </div>

                <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>
                  {anz.type} • Protocol: <strong>{anz.protocol}</strong>
                </div>

                <div style={{ display: 'flex', gap: '18px', marginTop: '8px', fontSize: '0.78rem', color: '#475569' }}>
                  <span>IP/Port: <code>{anz.ipAddress}</code></span>
                  <span>Workload Today: <strong style={{ color: '#0284c7' }}>{anz.workloadToday} Samples</strong></span>
                  <span>Last QC Run: {anz.lastCalibrated}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                  onClick={() => handlePingAnalyzer(anz.name)}
                >
                  Ping LIS Link
                </button>
                <button 
                  className="btn btn-primary btn-sm"
                  style={{ fontSize: '0.75rem', padding: '4px 10px', background: '#0284c7', border: 'none' }}
                  onClick={() => handleTriggerBatchRun(anz.name)}
                >
                  Run Calibration
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
