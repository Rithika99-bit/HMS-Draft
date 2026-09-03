import React from 'react';
import { 
  X, Star, Calendar, Award, GraduationCap, 
  Clock, DollarSign, Globe, CheckCircle2, Stethoscope 
} from 'lucide-react';

export default function DoctorProfileModal({ doctor, isOpen, onClose, onBookWithDoctor }) {
  if (!isOpen || !doctor) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-box">
            <div className="modal-icon-badge">
              <Stethoscope size={20} />
            </div>
            <div>
              <h2 className="modal-title">Physician Biography</h2>
              <div className="modal-subtitle">Board-Certified Medical Specialist</div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
            <img 
              src={doctor.image} 
              alt={doctor.name} 
              style={{ width: '90px', height: '90px', borderRadius: '16px', objectFit: 'cover', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}
            />
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {doctor.specialty}
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 6px' }}>
                {doctor.name}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', color: '#f59e0b', gap: '3px' }}>
                  <Star size={15} fill="#f59e0b" color="#f59e0b" />
                  <strong>{doctor.rating}</strong>
                </div>
                <span style={{ color: '#64748b' }}>({doctor.reviews} verified reviews)</span>
                <span style={{ background: '#dcfce7', color: '#16a34a', padding: '2px 8px', borderRadius: '20px', fontSize: '0.74rem', fontWeight: 700 }}>
                  {doctor.status}
                </span>
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Clinical Biography</h4>
            <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>{doctor.bio}</p>
          </div>

          {/* Education & Fellowships */}
          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <GraduationCap size={18} color="#0284c7" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a' }}>Education & Training</div>
                <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{doctor.education}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Clock size={18} color="#0d9488" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a' }}>Consulting Hours</div>
                <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{doctor.hours}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <DollarSign size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a' }}>Standard Consultation Fee</div>
                <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{doctor.fee}</div>
              </div>
            </div>

            {doctor.languages && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <Globe size={18} color="#6366f1" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a' }}>Languages Spoken</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{doctor.languages.join(', ')}</div>
                </div>
              </div>
            )}
          </div>

          {/* Awards */}
          {doctor.awards && (
            <div>
              <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={16} color="#f59e0b" /> Honors & Recognitions
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {doctor.awards.map((award, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: '#475569' }}>
                    <CheckCircle2 size={14} color="#10b981" />
                    <span>{award}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
          <button 
            className="btn btn-primary btn-sm" 
            onClick={() => {
              onClose();
              onBookWithDoctor(doctor.dept, doctor.name);
            }}
          >
            <Calendar size={16} />
            <span>Book Appointment with {doctor.name.split(' ')[0]} {doctor.name.split(' ')[1]}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
