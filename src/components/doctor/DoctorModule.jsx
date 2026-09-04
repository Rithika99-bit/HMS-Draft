import React, { useState } from 'react';
import DoctorDashboard from './DoctorDashboard';
import DoctorPatientChart from './DoctorPatientChart';
import DoctorTimelineView from './DoctorTimelineView';
import DoctorResultsView from './DoctorResultsView';
import EmergencyModule from '../emergency/EmergencyModule';
import DoctorImagingView from '../imaging/DoctorImagingView';
import SurgeonOtView from '../ot/SurgeonOtView';
import { 
  Stethoscope, User, Calendar, History, 
  Activity, Ambulance, ShieldCheck, FileText, Droplets, Camera, HeartPulse 
} from 'lucide-react';

export default function DoctorModule({ onShowToast }) {
  const [activeDoctorView, setActiveDoctorView] = useState('dashboard'); // 'dashboard' | 'chart' | 'timeline' | 'results' | 'imaging' | 'ot' | 'emergency'

  const handleOpenPatientChart = (uhid) => {
    setActiveDoctorView('chart');
    if (onShowToast) onShowToast(`Opened comprehensive 15-Facet EHR Chart for ${uhid}`, 'success');
  };

  const handleJumpToSource = (category) => {
    setActiveDoctorView('chart');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Doctor Module Primary Navigation Bar */}
      <div className="admin-subnav-tabs" style={{ background: '#ffffff', padding: '10px 14px', boxShadow: 'var(--shadow-sm)' }}>
        <button 
          className={`admin-sub-btn ${activeDoctorView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveDoctorView('dashboard')}
          style={{ fontSize: '0.88rem', padding: '10px 16px' }}
        >
          <Stethoscope size={16} />
          <span>Clinical Dashboard & Queue</span>
        </button>

        <button 
          className={`admin-sub-btn ${activeDoctorView === 'ot' ? 'active' : ''}`}
          onClick={() => setActiveDoctorView('ot')}
          style={{ fontSize: '0.88rem', padding: '10px 16px' }}
        >
          <HeartPulse size={16} />
          <span>Operation Theatre & Surgery</span>
        </button>

        <button 
          className={`admin-sub-btn ${activeDoctorView === 'imaging' ? 'active' : ''}`}
          onClick={() => setActiveDoctorView('imaging')}
          style={{ fontSize: '0.88rem', padding: '10px 16px' }}
        >
          <Camera size={16} />
          <span>Diagnostic Imaging & PACS</span>
        </button>

        <button 
          className={`admin-sub-btn ${activeDoctorView === 'chart' ? 'active' : ''}`}
          onClick={() => setActiveDoctorView('chart')}
          style={{ fontSize: '0.88rem', padding: '10px 16px' }}
        >
          <User size={16} />
          <span>Patient Chart (15-Facet EHR)</span>
        </button>

        <button 
          className={`admin-sub-btn ${activeDoctorView === 'chart' ? 'active' : ''}`}
          onClick={() => setActiveDoctorView('chart')}
          style={{ fontSize: '0.88rem', padding: '10px 16px' }}
        >
          <User size={16} />
          <span>Patient Chart (15-Facet EHR)</span>
        </button>

        <button 
          className={`admin-sub-btn ${activeDoctorView === 'timeline' ? 'active' : ''}`}
          onClick={() => setActiveDoctorView('timeline')}
          style={{ fontSize: '0.88rem', padding: '10px 16px' }}
        >
          <History size={16} />
          <span>Medical Timeline</span>
        </button>

        <button 
          className={`admin-sub-btn ${activeDoctorView === 'results' ? 'active' : ''}`}
          onClick={() => setActiveDoctorView('results')}
          style={{ fontSize: '0.88rem', padding: '10px 16px' }}
        >
          <Droplets size={16} />
          <span>Results & Historical Comparison</span>
        </button>

        <button 
          className={`admin-sub-btn ${activeDoctorView === 'emergency' ? 'active' : ''}`}
          onClick={() => setActiveDoctorView('emergency')}
          style={{ fontSize: '0.88rem', padding: '10px 16px', color: activeDoctorView === 'emergency' ? '#ffffff' : '#dc2626' }}
        >
          <Ambulance size={16} />
          <span>Emergency & Trauma Center (ED)</span>
        </button>
      </div>

      {/* View Switcher */}
      {activeDoctorView === 'dashboard' && (
        <DoctorDashboard 
          onOpenPatientChart={handleOpenPatientChart} 
          onOpenEmergency={() => setActiveDoctorView('emergency')}
          onShowToast={onShowToast} 
        />
      )}

      {activeDoctorView === 'ot' && (
        <SurgeonOtView onShowToast={onShowToast} />
      )}

      {activeDoctorView === 'imaging' && (
        <DoctorImagingView onShowToast={onShowToast} />
      )}

      {activeDoctorView === 'chart' && (
        <DoctorPatientChart onShowToast={onShowToast} />
      )}

      {activeDoctorView === 'timeline' && (
        <DoctorTimelineView 
          onJumpToSource={handleJumpToSource} 
          onShowToast={onShowToast} 
        />
      )}

      {activeDoctorView === 'results' && (
        <DoctorResultsView onShowToast={onShowToast} />
      )}

      {activeDoctorView === 'emergency' && (
        <EmergencyModule role="doctor" onShowToast={onShowToast} />
      )}
    </div>
  );
}
