import React, { useState } from 'react';
import { 
  X, PhoneCall, AlertTriangle, Navigation, 
  Clock, ShieldAlert, CheckCircle2, Activity 
} from 'lucide-react';

export default function EmergencyModal({ isOpen, onClose, onShowToast }) {
  const [dispatchState, setDispatchState] = useState('idle'); // 'idle' | 'dispatching' | 'enroute' | 'arrived'

  if (!isOpen) return null;

  const handleStartDispatch = () => {
    setDispatchState('dispatching');
    if (onShowToast) {
      onShowToast('Emergency Trauma Unit ICU-4 Dispatched!', 'error');
    }

    setTimeout(() => {
      setDispatchState('enroute');
      if (onShowToast) {
        onShowToast('Mobile ICU En Route • ETA: 4 Mins', 'info');
      }
    }, 2000);

    setTimeout(() => {
      setDispatchState('arrived');
      if (onShowToast) {
        onShowToast('Unit ICU-4 Arrived at Scene • Telemetry Active', 'success');
      }
    }, 5000);
  };

  const handleReset = () => {
    setDispatchState('idle');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-box">
            <div className="modal-icon-badge" style={{ background: '#fee2e2', color: '#ef4444' }}>
              <ShieldAlert size={20} />
            </div>
            <div>
              <h2 className="modal-title">24/7 Emergency & Trauma Command</h2>
              <div className="modal-subtitle">Instant Speed Dial & GPS Ambulance Dispatch</div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Top Red Alert Banner */}
          <div className="emergency-banner-box">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="pulse-dot" style={{ color: '#ffffff' }} />
              <span style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.88rem' }}>
                Life-Threatening Emergency Helpline
              </span>
            </div>

            <p style={{ fontSize: '0.92rem', opacity: 0.95, marginBottom: '14px' }}>
              If you or someone nearby is experiencing acute chest pain, severe trauma, stroke symptoms, or breathing difficulty, call immediately:
            </p>

            <a href="tel:8009116334" className="emergency-phone-btn">
              <PhoneCall size={22} />
              <span>(800) 911-MEDICARE</span>
            </a>
          </div>

          {/* 1-Click GPS Ambulance Dispatch Simulator */}
          <div className="dispatch-simulator-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#0f172a' }}>
                <Navigation size={18} color="#ef4444" />
                <span>1-Click GPS Mobile ICU Ambulance Dispatch</span>
              </div>
              <span style={{ fontSize: '0.74rem', background: '#e0f2fe', color: '#0284c7', padding: '3px 8px', borderRadius: '12px', fontWeight: 700 }}>
                Live Simulator
              </span>
            </div>

            <p style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: '16px' }}>
              Triggers instant geo-located satellite dispatch to the nearest Advanced Cardiac Life Support (ACLS) mobile unit with telemetry link to Trauma ER.
            </p>

            {dispatchState === 'idle' ? (
              <button 
                className="btn btn-emergency btn-full"
                onClick={handleStartDispatch}
              >
                <Navigation size={18} />
                <span>Simulate GPS Ambulance Dispatch</span>
              </button>
            ) : (
              <div>
                <div className="dispatch-timeline">
                  <div className={`dispatch-step ${dispatchState !== 'idle' ? (dispatchState === 'dispatching' ? 'active' : 'done') : ''}`}>
                    <div className="dispatch-step-dot">1</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>Unit ICU-4 Dispatched</div>
                      <div style={{ fontSize: '0.76rem', color: '#64748b' }}>Metro Trauma Center Bay 2</div>
                    </div>
                  </div>

                  <div className={`dispatch-step ${dispatchState === 'enroute' ? 'active' : (dispatchState === 'arrived' ? 'done' : '')}`}>
                    <div className="dispatch-step-dot">2</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                        {dispatchState === 'dispatching' ? 'Calculating route...' : 'Paramedic Unit En Route (ETA: 4 Mins)'}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#64748b' }}>Sirens Active • Priority Green Corridor</div>
                    </div>
                  </div>

                  <div className={`dispatch-step ${dispatchState === 'arrived' ? 'active done' : ''}`}>
                    <div className="dispatch-step-dot">3</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                        {dispatchState === 'arrived' ? '✓ Ambulance Arrived at Scene' : 'Standby for On-Site Arrival'}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#64748b' }}>Live ECG & SpO2 Streaming to Hospital ER</div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn btn-secondary btn-sm" onClick={handleReset}>
                    Reset Simulator
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Level 1 Trauma Verified Center • Metro District
          </span>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
