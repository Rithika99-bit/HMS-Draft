import React, { useState } from 'react';
import { useEmr } from '../../context/EmrContext';
import { 
  Stethoscope, Calendar, Clock, MapPin, 
  Check, Edit3, Plus, Users, ShieldCheck 
} from 'lucide-react';

export default function AdminDoctorStaffView({ onShowToast }) {
  const { doctorSchedules } = useEmr();
  const [schedules, setSchedules] = useState(doctorSchedules);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Doctor Rosters, Clinic Rooms & Availability</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Manage clinician scheduling slots, OPD room assignments, and consultation availability
            </div>
          </div>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => { if (onShowToast) onShowToast('New doctor duty roster template initialized.', 'info'); }}
          >
            <Plus size={14} /> Add Duty Schedule
          </button>
        </div>

        <table className="dash-table">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Department</th>
              <th>Duty Days</th>
              <th>Clinic Hours</th>
              <th>Room / Suite</th>
              <th>Token Capacity</th>
              <th>Live Status</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((doc, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 800, color: '#0f172a' }}>{doc.doctorName}</td>
                <td>
                  <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                    {doc.department}
                  </span>
                </td>
                <td style={{ fontSize: '0.82rem' }}>{doc.days}</td>
                <td style={{ fontSize: '0.82rem', color: '#475569' }}>{doc.hours}</td>
                <td><strong>{doc.room}</strong></td>
                <td>
                  <span style={{ fontWeight: 700, color: '#0284c7' }}>
                    {doc.activeTokens} / {doc.maxTokens} Max
                  </span>
                </td>
                <td>
                  <span style={{ 
                    background: doc.status === 'In Clinic' ? '#dcfce7' : '#fef3c7',
                    color: doc.status === 'In Clinic' ? '#15803d' : '#d97706',
                    padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 
                  }}>
                    ● {doc.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
