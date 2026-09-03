import React, { useState } from 'react';
import { useEmr } from '../../context/EmrContext';
import { 
  Calendar, Clock, User, Video, MapPin, 
  Check, X, Plus, AlertCircle, Sparkles, ChevronRight 
} from 'lucide-react';

export default function PatientAppointmentsView({ onShowToast }) {
  const { patientRecord, bookAppointment, cancelAppointment } = useEmr();
  const [showBookingWizard, setShowBookingWizard] = useState(false);
  const [cancelModalApt, setCancelModalApt] = useState(null);
  const [cancelReason, setCancelReason] = useState('');

  // Booking Form State
  const [bookForm, setBookForm] = useState({
    specialist: 'Dr. Sarah Mitchell, MD (Cardiology)',
    department: 'Cardiology & Vascular Medicine',
    date: '2026-09-18',
    time: '10:30 AM',
    mode: 'In-Clinic Physical Consult',
    notes: 'Routine cardiovascular follow-up & blood pressure check'
  });

  const handleBook = (e) => {
    e.preventDefault();
    bookAppointment(bookForm, patientRecord.demographics.fullName);
    if (onShowToast) onShowToast(`Appointment successfully booked for ${bookForm.date}!`, 'success');
    setShowBookingWizard(false);
  };

  const handleCancelSubmit = () => {
    if (!cancelReason) {
      if (onShowToast) onShowToast('Please provide a cancellation reason.', 'warning');
      return;
    }
    cancelAppointment(cancelModalApt.id, cancelReason, patientRecord.demographics.fullName);
    if (onShowToast) onShowToast('Appointment cancelled successfully.', 'info');
    setCancelModalApt(null);
    setCancelReason('');
  };

  const upcomingApts = patientRecord.appointmentsAndVisits.filter(a => !a.type.toLowerCase().includes('past') && !a.status.toLowerCase().includes('completed'));
  const pastVisits = patientRecord.appointmentsAndVisits.filter(a => a.type.toLowerCase().includes('past') || a.status.toLowerCase().includes('completed'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Banner & Book Action */}
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Appointments & Consultations Hub</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Schedule in-clinic visits, join telehealth video consults, or reschedule upcoming appointments
            </div>
          </div>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setShowBookingWizard(!showBookingWizard)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={15} />
            <span>{showBookingWizard ? 'Close Booking Form' : 'Book New Appointment'}</span>
          </button>
        </div>

        {/* Booking Wizard Form */}
        {showBookingWizard && (
          <form onSubmit={handleBook} style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px', padding: '18px', marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '1rem', fontWeight: 800, color: '#0369a1' }}>
              Schedule an Appointment with a Specialist
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label className="form-label">Select Specialist & Department</label>
                <select 
                  className="form-input" 
                  value={bookForm.specialist}
                  onChange={e => setBookForm({ ...bookForm, specialist: e.target.value })}
                >
                  <option value="Dr. Sarah Mitchell, MD (Cardiology)">Dr. Sarah Mitchell, MD (Cardiology)</option>
                  <option value="Dr. Alex Rivera, MD (Pulmonology)">Dr. Alex Rivera, MD (Pulmonology)</option>
                  <option value="Dr. Emily Chen, MD (Internal Medicine)">Dr. Emily Chen, MD (Internal Medicine)</option>
                  <option value="Dr. Priya Patel, MD (Family Medicine)">Dr. Priya Patel, MD (Family Medicine)</option>
                </select>
              </div>

              <div>
                <label className="form-label">Consultation Mode</label>
                <select 
                  className="form-input" 
                  value={bookForm.mode}
                  onChange={e => setBookForm({ ...bookForm, mode: e.target.value })}
                >
                  <option value="In-Clinic Physical Consult">In-Clinic Physical Consult</option>
                  <option value="Telehealth Video Consultation">Telehealth Video Consultation</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label className="form-label">Preferred Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={bookForm.date}
                  onChange={e => setBookForm({ ...bookForm, date: e.target.value })}
                  required 
                />
              </div>
              <div>
                <label className="form-label">Preferred Time Slot</label>
                <select 
                  className="form-input" 
                  value={bookForm.time}
                  onChange={e => setBookForm({ ...bookForm, time: e.target.value })}
                >
                  <option value="09:00 AM">09:00 AM (Morning Slot)</option>
                  <option value="10:30 AM">10:30 AM (Morning Slot)</option>
                  <option value="02:15 PM">02:15 PM (Afternoon Slot)</option>
                  <option value="04:00 PM">04:00 PM (Evening Slot)</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label className="form-label">Reason for Visit / Symptoms</label>
              <input 
                type="text" 
                className="form-input" 
                value={bookForm.notes}
                onChange={e => setBookForm({ ...bookForm, notes: e.target.value })}
                placeholder="Brief description of symptoms or routine follow-up reason..." 
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowBookingWizard(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Confirm & Book Appointment
              </button>
            </div>
          </form>
        )}

        {/* Upcoming Appointments List */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
            Upcoming Appointments ({upcomingApts.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {upcomingApts.map(apt => (
              <div key={apt.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>{apt.specialist}</span>
                    <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: 700 }}>
                      {apt.mode || 'In-Clinic Consult'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '4px' }}>
                    {apt.department} • <strong>{apt.date}</strong> at <strong>{apt.time}</strong> • {apt.room || 'Suite 304'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                    Notes: {apt.notes}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {apt.status.includes('Cancelled') ? (
                    <span style={{ background: '#fee2e2', color: '#dc2626', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                      {apt.status}
                    </span>
                  ) : (
                    <>
                      <button 
                        className="btn btn-outline btn-sm"
                        style={{ color: '#dc2626', borderColor: '#fca5a5', fontSize: '0.75rem' }}
                        onClick={() => setCancelModalApt(apt)}
                      >
                        Cancel
                      </button>
                      <button 
                        className="btn btn-primary btn-sm"
                        style={{ fontSize: '0.75rem' }}
                        onClick={() => { if (onShowToast) onShowToast(`Checked in for ${apt.specialist}. Token generated.`, 'success'); }}
                      >
                        Check-In
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cancellation Modal Dialog */}
        {cancelModalApt && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '440px', width: '90%' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', fontWeight: 800, color: '#991b1b' }}>
                Cancel Appointment
              </h3>
              <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: '#475569' }}>
                Are you sure you want to cancel your appointment with <strong>{cancelModalApt.specialist}</strong> on {cancelModalApt.date}?
              </p>
              <div style={{ marginBottom: '16px' }}>
                <label className="form-label">Reason for Cancellation</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Schedule conflict, Feeling better, Rescheduling..."
                  value={cancelReason}
                  onChange={e => setCancelReason(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setCancelModalApt(null)}>
                  Keep Appointment
                </button>
                <button className="btn btn-primary btn-sm" style={{ background: '#dc2626' }} onClick={handleCancelSubmit}>
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Past Appointments & Visit History */}
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
            Past Visits & Encounter History ({pastVisits.length})
          </h3>

          <table className="dash-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Specialist & Department</th>
                <th>Encounter Mode</th>
                <th>Clinical Summary / Notes</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pastVisits.map(visit => (
                <tr key={visit.id}>
                  <td style={{ fontWeight: 700 }}>{visit.date}</td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{visit.specialist}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{visit.department}</div>
                  </td>
                  <td>{visit.mode}</td>
                  <td style={{ fontSize: '0.82rem', color: '#475569' }}>{visit.notes}</td>
                  <td>
                    <span style={{ background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {visit.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
