import React, { useState } from 'react';
import { useEmr } from '../../context/EmrContext';
import { 
  History, Calendar, Clock, Filter, Activity, 
  Stethoscope, Pill, Droplets, HeartPulse, FileText, 
  Scissors, UserPlus, ArrowRight, ExternalLink 
} from 'lucide-react';

export default function DoctorTimelineView({ onJumpToSource, onShowToast }) {
  const { patientRecord } = useEmr();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Appointment', 'Laboratory', 'Medication', 'Diagnosis', 'Consultation', 'Admission', 'Diagnostic', 'Vitals', 'Clinical Note'];

  const filteredTimeline = selectedCategory === 'All' 
    ? patientRecord.longitudinalTimeline 
    : patientRecord.longitudinalTimeline.filter(t => t.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'appointment': return <Calendar size={16} color="#0284c7" />;
      case 'laboratory': return <Droplets size={16} color="#06b6d4" />;
      case 'medication': return <Pill size={16} color="#10b981" />;
      case 'diagnosis': return <Stethoscope size={16} color="#ec4899" />;
      case 'admission': return <HeartPulse size={16} color="#f59e0b" />;
      case 'procedure': case 'surgical ipd': return <Scissors size={16} color="#e11d48" />;
      case 'clinical note': return <FileText size={16} color="#8b5cf6" />;
      default: return <Activity size={16} color="#64748b" />;
    }
  };

  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <div>
          <h2 className="dash-card-title">Chronological Medical Timeline</h2>
          <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
            Complete longitudinal clinical history for {patientRecord.demographics.fullName} ({patientRecord.registration.uhid})
          </div>
        </div>
        <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700 }}>
          {filteredTimeline.length} Events Logged
        </span>
      </div>

      {/* Filter Chips */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: selectedCategory === cat ? '1px solid #0284c7' : '1px solid #e2e8f0',
              background: selectedCategory === cat ? '#0284c7' : '#ffffff',
              color: selectedCategory === cat ? '#ffffff' : '#475569',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Timeline Stream */}
      <div style={{ position: 'relative', paddingLeft: '32px', borderLeft: '2px dashed #cbd5e1', marginLeft: '12px' }}>
        {filteredTimeline.map((item, idx) => (
          <div key={item.id || idx} style={{ position: 'relative', marginBottom: '28px' }}>
            {/* Timeline Dot Icon */}
            <div 
              style={{
                position: 'absolute',
                left: '-45px',
                top: '0px',
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: '#ffffff',
                border: `2px solid ${item.badgeColor || '#0284c7'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {getCategoryIcon(item.category)}
            </div>

            {/* Event Card */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{item.title}</h3>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{item.subtitle} • <strong>{item.date}</strong> at {item.time}</div>
                </div>
                <span style={{ background: `${item.badgeColor || '#0284c7'}15`, color: item.badgeColor || '#0284c7', padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                  {item.badge}
                </span>
              </div>

              <p style={{ margin: '8px 0 12px 0', fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                {item.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  onClick={() => {
                    if (onJumpToSource) onJumpToSource(item.category);
                    if (onShowToast) onShowToast(`Jumped to ${item.category} record in EHR chart.`, 'info');
                  }}
                >
                  <span>Jump to Source Record</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
