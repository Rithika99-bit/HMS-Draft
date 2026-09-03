import React, { useState, useEffect } from 'react';
import { doctorsData, consultationTimeSlots } from '../../data/doctorsData';
import { departmentsData } from '../../data/departmentsData';
import { 
  X, Calendar, Clock, User, CheckCircle2, 
  ArrowRight, ArrowLeft, Stethoscope, Video, 
  MapPin, ShieldCheck, Download, Check 
} from 'lucide-react';

export default function BookingModal({ isOpen, onClose, initialDept, initialDoctor, onShowToast }) {
  const [step, setStep] = useState(1);
  const [dept, setDept] = useState(initialDept || 'Cardiology & Heart Care');
  const [consultType, setConsultType] = useState('in-person'); // 'in-person' | 'telehealth'
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  
  // Patient details form
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [symptoms, setSymptoms] = useState('');
  
  // Generated booking ref
  const [bookingRef, setBookingRef] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (initialDept) setDept(initialDept);
      if (initialDoctor) {
        const doc = doctorsData.find(d => d.name.toLowerCase().includes(initialDoctor.toLowerCase())) || doctorsData[0];
        setSelectedDoctor(doc);
      } else {
        setSelectedDoctor(doctorsData[0]);
      }
      setStep(1);
      setErrors({});
    }
  }, [isOpen, initialDept, initialDoctor]);

  if (!isOpen) return null;

  // Filter doctors by chosen department or default to all
  const availableDoctors = doctorsData.filter(d => 
    dept ? d.dept.toLowerCase().includes(dept.toLowerCase().split(' ')[0]) || dept.toLowerCase().includes(d.dept.toLowerCase()) : true
  );
  const displayDoctors = availableDoctors.length > 0 ? availableDoctors : doctorsData;

  const handleNextStep1 = () => {
    setStep(2);
  };

  const handleNextStep2 = () => {
    if (!selectedDoctor) {
      setSelectedDoctor(displayDoctors[0]);
    }
    setStep(3);
  };

  const handleNextStep3 = () => {
    if (!selectedDate || !selectedSlot) {
      if (onShowToast) onShowToast('Please select a consultation date and time slot.', 'error');
      return;
    }
    setStep(4);
  };

  const handleNextStep4 = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!patientName.trim()) newErrors.patientName = 'Please enter patient full name.';
    if (!patientPhone.trim()) newErrors.patientPhone = 'Please enter mobile number.';
    if (!patientEmail.trim() || !patientEmail.includes('@')) newErrors.patientEmail = 'Please enter a valid email address.';
    if (!patientAge || patientAge < 1 || patientAge > 120) newErrors.patientAge = 'Please enter a valid age.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generate reference number
    const ref = 'MC-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setStep(5);

    if (onShowToast) {
      onShowToast(`Appointment Confirmed! Ref #${ref}`, 'success');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-box">
            <div className="modal-icon-badge">
              <Calendar size={20} />
            </div>
            <div>
              <h2 className="modal-title">Book an Appointment</h2>
              <div className="modal-subtitle">Fast, secure 5-step clinical reservation</div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Wizard Progress Indicator */}
        <div style={{ padding: '20px 28px 0' }}>
          <div className="wizard-progress">
            {[
              { num: 1, label: 'Department' },
              { num: 2, label: 'Doctor' },
              { num: 3, label: 'Date & Slot' },
              { num: 4, label: 'Patient Info' },
              { num: 5, label: 'Confirm' }
            ].map(s => (
              <div 
                key={s.num} 
                className={`wizard-step-indicator ${step === s.num ? 'active' : ''} ${step > s.num ? 'completed' : ''}`}
              >
                <div className="wizard-circle">
                  {step > s.num ? <Check size={16} /> : s.num}
                </div>
                <span className="wizard-step-name">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Body: Steps */}
        <div className="modal-body">
          {/* STEP 1: Department & Mode */}
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px', color: '#0f172a' }}>
                Select Department & Consultation Mode
              </h3>

              <div className="form-group">
                <label className="form-label">Clinical Department</label>
                <select 
                  className="form-select"
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                >
                  {departmentsData.map(d => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Consultation Format</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div 
                    onClick={() => setConsultType('in-person')}
                    style={{
                      border: `2px solid ${consultType === 'in-person' ? '#0284c7' : '#e2e8f0'}`,
                      background: consultType === 'in-person' ? '#f0f9ff' : '#ffffff',
                      borderRadius: '12px',
                      padding: '16px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#0f172a' }}>
                      <MapPin size={18} color="#0284c7" />
                      <span>In-Hospital Visit</span>
                    </div>
                    <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      Visit our medical center in person for physical examination.
                    </span>
                  </div>

                  <div 
                    onClick={() => setConsultType('telehealth')}
                    style={{
                      border: `2px solid ${consultType === 'telehealth' ? '#0284c7' : '#e2e8f0'}`,
                      background: consultType === 'telehealth' ? '#f0f9ff' : '#ffffff',
                      borderRadius: '12px',
                      padding: '16px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#0f172a' }}>
                      <Video size={18} color="#0d9488" />
                      <span>Telehealth Video</span>
                    </div>
                    <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      Encrypted HD video consult from the comfort of your home.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Doctor Selection */}
          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px', color: '#0f172a' }}>
                Select Physician / Specialist
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {displayDoctors.map(doctor => (
                  <div
                    key={doctor.id}
                    onClick={() => setSelectedDoctor(doctor)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '14px',
                      borderRadius: '12px',
                      border: `2px solid ${selectedDoctor?.id === doctor.id ? '#0284c7' : '#e2e8f0'}`,
                      background: selectedDoctor?.id === doctor.id ? '#f0f9ff' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 150ms ease'
                    }}
                  >
                    <img 
                      src={doctor.image} 
                      alt={doctor.name} 
                      style={{ width: '54px', height: '54px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.98rem' }}>{doctor.name}</div>
                      <div style={{ fontSize: '0.82rem', color: '#0284c7', fontWeight: 600 }}>{doctor.specialty}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{doctor.experience} • Rating: ⭐ {doctor.rating}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.92rem' }}>{doctor.fee.split(' ')[0]}</div>
                      <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700 }}>{doctor.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Date & Slot Selection */}
          {step === 3 && (
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px', color: '#0f172a' }}>
                Select Date & Preferred Time Slot
              </h3>

              <div className="form-group">
                <label className="form-label">Consultation Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Available Time Slots ({selectedDoctor?.name || 'Selected Doctor'})</label>
                <div className="time-slots-grid">
                  {consultationTimeSlots.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      className={`slot-pill ${selectedSlot === slot ? 'selected' : ''}`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Patient Info Form */}
          {step === 4 && (
            <form id="booking-patient-form" onSubmit={handleNextStep4}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px', color: '#0f172a' }}>
                Patient Demographic Details
              </h3>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="e.g. Eleanor Vance"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                  />
                  {errors.patientName && <span style={{ color: '#dc2626', fontSize: '0.78rem' }}>{errors.patientName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Age *</label>
                  <input 
                    type="number" 
                    className="form-input"
                    placeholder="e.g. 34"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                  />
                  {errors.patientAge && <span style={{ color: '#dc2626', fontSize: '0.78rem' }}>{errors.patientAge}</span>}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Mobile Phone Number *</label>
                  <input 
                    type="tel" 
                    className="form-input"
                    placeholder="+1 (555) 000-0000"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                  />
                  {errors.patientPhone && <span style={{ color: '#dc2626', fontSize: '0.78rem' }}>{errors.patientPhone}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    className="form-input"
                    placeholder="patient@example.com"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                  />
                  {errors.patientEmail && <span style={{ color: '#dc2626', fontSize: '0.78rem' }}>{errors.patientEmail}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Primary Symptoms / Reason for Visit</label>
                <textarea 
                  className="form-textarea"
                  rows={2}
                  placeholder="Briefly describe what symptoms or questions you have..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
              </div>
            </form>
          )}

          {/* STEP 5: Live Confirmation Voucher */}
          {step === 5 && (
            <div className="booking-voucher">
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <CheckCircle2 size={28} />
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>Appointment Confirmed!</h3>
              <p style={{ fontSize: '0.86rem', color: '#64748b' }}>
                Your appointment slip and reminder have been generated and sent to <strong>{patientEmail}</strong>.
              </p>

              <div className="voucher-ref-code">{bookingRef}</div>

              <div style={{ background: '#ffffff', borderRadius: '10px', padding: '16px', textAlign: 'left', fontSize: '0.88rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px', margin: '16px 0' }}>
                <div><strong>Patient:</strong> {patientName} ({patientAge} yrs)</div>
                <div><strong>Physician:</strong> {selectedDoctor?.name}</div>
                <div><strong>Specialty:</strong> {selectedDoctor?.specialty}</div>
                <div><strong>Date & Slot:</strong> {selectedDate} at {selectedSlot}</div>
                <div><strong>Mode:</strong> {consultType === 'in-person' ? '🏥 In-Hospital Clinic Visit (Room 304)' : '📹 Encrypted Telehealth Video Link'}</div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="modal-footer">
          {step > 1 && step < 5 ? (
            <button className="btn btn-secondary btn-sm" onClick={() => setStep(step - 1)}>
              <ArrowLeft size={16} /> Back
            </button>
          ) : (
            <div />
          )}

          {step === 1 && (
            <button className="btn btn-primary btn-sm" onClick={handleNextStep1}>
              Select Doctor <ArrowRight size={16} />
            </button>
          )}

          {step === 2 && (
            <button className="btn btn-primary btn-sm" onClick={handleNextStep2}>
              Select Time <ArrowRight size={16} />
            </button>
          )}

          {step === 3 && (
            <button className="btn btn-primary btn-sm" onClick={handleNextStep3}>
              Enter Details <ArrowRight size={16} />
            </button>
          )}

          {step === 4 && (
            <button 
              type="submit" 
              form="booking-patient-form" 
              className="btn btn-primary btn-sm"
            >
              Confirm Appointment <Check size={16} />
            </button>
          )}

          {step === 5 && (
            <button className="btn btn-primary btn-sm btn-full" onClick={onClose}>
              Done & Return
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
