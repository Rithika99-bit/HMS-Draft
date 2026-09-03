import React, { useState } from 'react';
import {
  opdFlowStages,
  initialDoctorsAvailability,
  initialSlots,
  initialAppointments,
  noShowAnalytics
} from '../../data/opdManagementData';
import {
  Calendar, Clock, CheckCircle, AlertTriangle, 
  UserPlus, UserCheck, Stethoscope, FileText, 
  CreditCard, History, Search, Plus, Filter, 
  Globe, Building, Volume2, ArrowRight, X, 
  RefreshCw, ChevronRight, Phone, ShieldCheck,
  CalendarCheck, UserX, AlertCircle, Sparkles,
  MapPin, Check
} from 'lucide-react';

export default function SuperAdminOpdModule({ onShowToast }) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [doctors, setDoctors] = useState(initialDoctorsAvailability);
  const [slots, setSlots] = useState(initialSlots);
  const [activeSubTab, setActiveSubTab] = useState('appointments'); // 'appointments' | 'opd-flow' | 'doctors-schedule' | 'slot-management' | 'token-queue' | 'no-show' | 'follow-up'
  const [activeFlowStage, setActiveFlowStage] = useState(null);
  
  // Filter state for appointments
  const [sourceFilter, setSourceFilter] = useState('all'); // 'all' | 'online' | 'front-desk'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'queue' | 'consultation' | 'completed' | 'no-show'
  const [searchQuery, setSearchQuery] = useState('');

  // New Booking Modal State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    patientName: '',
    phone: '',
    age: '',
    gender: 'Female',
    source: 'Hospital Front-Desk Booking',
    doctor: 'Dr. Sarah Mitchell, MD',
    specialty: 'Cardiology',
    date: 'Today (03 Sep 2026)',
    timeSlot: '11:00 AM - 11:15 AM',
    complaint: ''
  });

  // Reschedule Modal State
  const [rescheduleApt, setRescheduleApt] = useState(null);
  const [newSlotTime, setNewSlotTime] = useState('03:30 PM - 03:45 PM');

  // Live Token Calling Alert Simulation
  const [activeCallToken, setActiveCallToken] = useState({
    token: 'TK-14',
    patient: 'Sarah Connor',
    doctor: 'Dr. Sarah Mitchell',
    room: 'Room 304, Tower A'
  });

  // Filtered Appointments
  const filteredAppointments = appointments.filter(apt => {
    const matchesSource = sourceFilter === 'all' 
      ? true 
      : sourceFilter === 'online' 
        ? apt.bookingSource.includes('Online') 
        : apt.bookingSource.includes('Front-Desk');

    const matchesStatus = statusFilter === 'all' 
      ? true 
      : apt.statusCategory === statusFilter;

    const matchesSearch = searchQuery === '' 
      ? true 
      : apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.token.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.uhid.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSource && matchesStatus && matchesSearch;
  });

  // 1. Check-in Action
  const handleCheckIn = (aptId) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === aptId) {
        return {
          ...a,
          status: 'Checked-In (Waiting)',
          statusCategory: 'queue',
          opdStage: 'Check-in',
          opdStageIndex: 3,
          checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      return a;
    }));
    if (onShowToast) onShowToast(`Patient check-in recorded! Token generated.`, 'success');
  };

  // 2. Call Token Action
  const handleCallToken = (apt) => {
    setActiveCallToken({
      token: apt.token,
      patient: apt.patientName,
      doctor: apt.doctor,
      room: apt.room
    });
    if (onShowToast) {
      onShowToast(`📢 Token ${apt.token} called to ${apt.room} (${apt.doctor})!`, 'info');
    }
  };

  // 3. Start Consultation
  const handleStartConsultation = (aptId) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAppointments(prev => prev.map(a => {
      if (a.id === aptId) {
        return {
          ...a,
          status: 'In Consultation',
          statusCategory: 'consultation',
          opdStage: 'Consultation',
          opdStageIndex: 5,
          consultStartTime: timeNow
        };
      }
      return a;
    }));
    if (onShowToast) onShowToast(`Clinical consultation started at ${timeNow}!`, 'success');
  };

  // 4. Complete Consultation
  const handleCompleteConsultation = (aptId) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAppointments(prev => prev.map(a => {
      if (a.id === aptId) {
        return {
          ...a,
          status: 'Consultation Completed',
          statusCategory: 'completed',
          opdStage: 'Diagnosis / Investigation / Prescription',
          opdStageIndex: 6,
          consultEndTime: timeNow,
          followUpDue: 'In 7 Days (Auto-Flagged)'
        };
      }
      return a;
    }));
    if (onShowToast) onShowToast(`Consultation completed! Moved to Prescription & Billing stage.`, 'success');
  };

  // 5. Mark No-Show
  const handleMarkNoShow = (aptId) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === aptId) {
        return {
          ...a,
          status: 'No-Show / Missed Slot',
          statusCategory: 'no-show',
          opdStageIndex: 2
        };
      }
      return a;
    }));
    if (onShowToast) onShowToast(`Patient flagged as No-Show. Automated SMS reminder dispatched.`, 'warning');
  };

  // 6. Cancel Appointment
  const handleCancelAppointment = (aptId) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === aptId) {
        return {
          ...a,
          status: 'Cancelled by Admin/Patient',
          statusCategory: 'cancelled'
        };
      }
      return a;
    }));
    if (onShowToast) onShowToast(`Appointment ${aptId} cancelled. Slot released.`, 'info');
  };

  // 7. Reschedule Execution
  const executeReschedule = () => {
    if (!rescheduleApt) return;
    setAppointments(prev => prev.map(a => {
      if (a.id === rescheduleApt.id) {
        return {
          ...a,
          timeSlot: newSlotTime,
          status: `Rescheduled to ${newSlotTime}`,
          statusCategory: 'confirmed'
        };
      }
      return a;
    }));
    if (onShowToast) onShowToast(`Appointment ${rescheduleApt.id} rescheduled to ${newSlotTime}`, 'success');
    setRescheduleApt(null);
  };

  // 8. Submit New Booking (Online or Front Desk)
  const handleCreateBooking = (e) => {
    e.preventDefault();
    if (!bookingForm.patientName) return;

    const tokenNum = `TK-${Math.floor(Math.random() * 80 + 20)}`;
    const newApt = {
      id: `APT-${Math.floor(Math.random() * 9000 + 1000)}`,
      token: tokenNum,
      uhid: `UHID-MED-2026-0${Math.floor(Math.random() * 8000 + 1000)}`,
      patientName: bookingForm.patientName,
      phone: bookingForm.phone || '+1 (555) 000-0000',
      age: parseInt(bookingForm.age) || 30,
      gender: bookingForm.gender,
      bookingSource: bookingForm.source,
      sourceIcon: bookingForm.source.includes('Online') ? 'Globe' : 'Building',
      sourceBadge: bookingForm.source.includes('Online') ? 'Online Web Booking' : 'Front Desk Walk-in',
      sourceColor: bookingForm.source.includes('Online') ? '#0284c7' : '#0d9488',
      doctor: bookingForm.doctor,
      specialty: bookingForm.specialty,
      room: 'Room 304',
      date: bookingForm.date,
      timeSlot: bookingForm.timeSlot,
      status: bookingForm.source.includes('Front-Desk') ? 'Checked-In (Token Issued)' : 'Confirmed (Scheduled)',
      statusCategory: bookingForm.source.includes('Front-Desk') ? 'checked-in' : 'confirmed',
      opdStage: bookingForm.source.includes('Front-Desk') ? 'Check-in' : 'Appointment',
      opdStageIndex: bookingForm.source.includes('Front-Desk') ? 3 : 2,
      checkInTime: bookingForm.source.includes('Front-Desk') ? 'Just now' : null,
      consultStartTime: null,
      consultEndTime: null,
      billingStatus: 'Pending Consultation',
      followUpDue: 'Pending',
      chiefComplaint: bookingForm.complaint || 'General Clinical Consultation'
    };

    setAppointments([newApt, ...appointments]);
    setShowBookingModal(false);
    if (onShowToast) {
      onShowToast(`New ${bookingForm.source.includes('Online') ? 'Online' : 'Front-Desk'} Booking created! Token: ${tokenNum}`, 'success');
    }
  };

  // 9. Doctor Status Toggle
  const toggleDoctorStatus = (docId) => {
    setDoctors(prev => prev.map(d => {
      if (d.id === docId) {
        const nextStatus = d.status === 'Available / On Duty' 
          ? 'In OPD Consultation' 
          : d.status === 'In OPD Consultation' 
            ? 'In Operating Theater (OT)' 
            : 'Available / On Duty';
        return {
          ...d,
          status: nextStatus,
          statusColor: nextStatus === 'Available / On Duty' ? '#10b981' : nextStatus === 'In OPD Consultation' ? '#8b5cf6' : '#f59e0b'
        };
      }
      return d;
    }));
    if (onShowToast) onShowToast('Doctor duty status updated in hospital broadcast.', 'info');
  };

  // 10. Slot Toggle
  const toggleSlotStatus = (slotId) => {
    setSlots(prev => prev.map(s => {
      if (s.id === slotId) {
        const nextStatus = s.status === 'Available' ? 'Blocked' : 'Available';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
    if (onShowToast) onShowToast('Slot status modified in online scheduling grid.', 'info');
  };

  return (
    <div className="superadmin-opd-container">
      {/* ── TOP OPD STAGES PIPELINE (Typical OPD Flow) ─────────────────── */}
      <div className="opd-pipeline-card">
        <div className="opd-pipeline-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="pipeline-title">Typical Hospital OPD Journey Pipeline</span>
              <span className="pipeline-live-tag">
                <span className="pulse-dot"></span> Live Telemetry
              </span>
            </div>
            <p className="pipeline-subtitle">
              Registration → Appointment → Check-in → Queue → Consultation → Diagnosis / Investigation / Prescription → Billing → Follow-up
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setBookingForm({ ...bookingForm, source: 'Hospital Front-Desk Booking' });
                setShowBookingModal(true);
              }}
            >
              <Building size={14} /> Book Front-Desk Walk-In
            </button>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => {
                setBookingForm({ ...bookingForm, source: 'Online / Public Portal' });
                setShowBookingModal(true);
              }}
            >
              <Globe size={14} /> New Online Booking
            </button>
          </div>
        </div>

        {/* Visual 8-Stage Pipeline */}
        <div className="opd-stages-grid">
          {opdFlowStages.map((st, idx) => (
            <div 
              key={st.id}
              className={`opd-stage-pill ${activeFlowStage === st.id ? 'active' : ''}`}
              onClick={() => setActiveFlowStage(activeFlowStage === st.id ? null : st.id)}
            >
              <div className="opd-stage-num">{idx + 1}</div>
              <div className="opd-stage-info">
                <div className="opd-stage-name">{st.stage}</div>
                <div className="opd-stage-count">{st.count} Patients</div>
              </div>
              {idx < opdFlowStages.length - 1 && (
                <ChevronRight size={14} className="stage-arrow" />
              )}
            </div>
          ))}
        </div>

        {/* Selected Stage Detail Inspector */}
        {activeFlowStage && (
          <div className="stage-inspector-drawer">
            {(() => {
              const current = opdFlowStages.find(s => s.id === activeFlowStage);
              return (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: '#0284c7' }}>Stage Detail: {current.stage}</strong>
                    <span style={{ marginLeft: '10px', color: '#475569', fontSize: '0.84rem' }}>{current.desc}</span>
                  </div>
                  <span style={{ fontSize: '0.78rem', background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>
                    {current.count} Active Enroute
                  </span>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* ── LIVE TOKEN DISPLAY BANNER (Queue / Token Calling) ─────────── */}
      <div className="live-calling-display-strip">
        <div className="display-led-box">
          <Volume2 size={24} color="#38bdf8" />
          <div>
            <div className="calling-label">NOW CALLING TOKEN IN OUTPATIENT WING</div>
            <div className="calling-token-text">{activeCallToken.token}</div>
          </div>
        </div>

        <div className="calling-patient-meta">
          <div>
            <span className="lbl">Patient Name:</span>
            <span className="val">{activeCallToken.patient}</span>
          </div>
          <div>
            <span className="lbl">Specialist Doctor:</span>
            <span className="val">{activeCallToken.doctor}</span>
          </div>
          <div>
            <span className="lbl">Assigned Clinic:</span>
            <span className="val" style={{ color: '#34d399', fontWeight: 800 }}>{activeCallToken.room}</span>
          </div>
        </div>

        <div className="calling-actions">
          <button 
            className="btn btn-secondary btn-sm"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: 'none' }}
            onClick={() => {
              if (onShowToast) onShowToast(`Voice chime re-broadcast for token ${activeCallToken.token}!`, 'info');
            }}
          >
            <Volume2 size={14} /> Re-Announce
          </button>
        </div>
      </div>

      {/* ── SUB-NAVIGATION TABS ───────────────────────────────────────── */}
      <div className="admin-subnav-tabs">
        <button 
          className={`admin-sub-btn ${activeSubTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('appointments')}
        >
          <Calendar size={15} />
          <span>All Appointments ({appointments.length})</span>
        </button>

        <button 
          className={`admin-sub-btn ${activeSubTab === 'doctors-schedule' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('doctors-schedule')}
        >
          <Stethoscope size={15} />
          <span>Doctor Schedules & Availability ({doctors.length})</span>
        </button>

        <button 
          className={`admin-sub-btn ${activeSubTab === 'slot-management' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('slot-management')}
        >
          <Clock size={15} />
          <span>Slot Management ({slots.length})</span>
        </button>

        <button 
          className={`admin-sub-btn ${activeSubTab === 'no-show' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('no-show')}
        >
          <UserX size={15} />
          <span>No-Show Tracking ({noShowAnalytics.noShowCount})</span>
        </button>

        <button 
          className={`admin-sub-btn ${activeSubTab === 'follow-up' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('follow-up')}
        >
          <History size={15} />
          <span>Follow-Up Manager</span>
        </button>
      </div>

      {/* ── TAB 1: ALL APPOINTMENTS CONSOLE ───────────────────────────── */}
      {activeSubTab === 'appointments' && (
        <div className="superadmin-card">
          <div className="table-controls-bar">
            {/* Search Input */}
            <div className="search-pill-box">
              <Search size={16} color="#94a3b8" />
              <input 
                type="text" 
                placeholder="Search patient, token, UHID or ID..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="search-inner-input"
              />
            </div>

            {/* Source Filter (Online vs Front-Desk) */}
            <div className="filter-pill-group">
              <span className="filter-lbl">Source:</span>
              <button 
                className={`filter-btn ${sourceFilter === 'all' ? 'active' : ''}`}
                onClick={() => setSourceFilter('all')}
              >
                All Sources
              </button>
              <button 
                className={`filter-btn ${sourceFilter === 'online' ? 'active' : ''}`}
                onClick={() => setSourceFilter('online')}
              >
                <Globe size={13} /> Online / Public
              </button>
              <button 
                className={`filter-btn ${sourceFilter === 'front-desk' ? 'active' : ''}`}
                onClick={() => setSourceFilter('front-desk')}
              >
                <Building size={13} /> Front Desk Walk-In
              </button>
            </div>

            {/* Status Filter */}
            <div className="filter-pill-group">
              <span className="filter-lbl">Status:</span>
              <select 
                className="filter-select"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="checked-in">Checked-In (Token Issued)</option>
                <option value="queue">In Queue / Waiting</option>
                <option value="consultation">In Consultation</option>
                <option value="completed">Completed</option>
                <option value="no-show">No-Show / Missed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Appointments Table */}
          <div className="pm-table-responsive">
            <table className="pm-table">
              <thead>
                <tr>
                  <th>Token & ID</th>
                  <th>Patient Info & UHID</th>
                  <th>Booking Channel</th>
                  <th>Doctor & Room</th>
                  <th>Date & Time Slot</th>
                  <th>OPD Flow Stage</th>
                  <th>Encounter Status</th>
                  <th>Lifecycle Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map(apt => {
                  const isOnline = apt.bookingSource.includes('Online');

                  return (
                    <tr key={apt.id}>
                      <td>
                        <div className="token-badge-text">{apt.token}</div>
                        <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{apt.id}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 800, color: '#0f172a' }}>{apt.patientName}</div>
                        <div style={{ fontSize: '0.76rem', color: '#0284c7' }}>{apt.uhid}</div>
                        <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{apt.age}y • {apt.gender}</div>
                      </td>
                      <td>
                        <span 
                          style={{ 
                            background: isOnline ? '#e0f2fe' : '#ccfbf1', 
                            color: isOnline ? '#0284c7' : '#0d9488',
                            padding: '3px 10px',
                            borderRadius: '12px',
                            fontSize: '0.74rem',
                            fontWeight: 800,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          {isOnline ? <Globe size={12} /> : <Building size={12} />}
                          {apt.sourceBadge}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{apt.doctor}</div>
                        <div style={{ fontSize: '0.76rem', color: '#64748b' }}>{apt.specialty} • {apt.room}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700 }}>{apt.date}</div>
                        <div style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 600 }}>{apt.timeSlot}</div>
                      </td>
                      <td>
                        <span className="opd-stage-badge">
                          Stage {apt.opdStageIndex}: {apt.opdStage}
                        </span>
                      </td>
                      <td>
                        <span 
                          style={{
                            background: apt.statusCategory === 'completed' ? '#dcfce7' 
                              : apt.statusCategory === 'consultation' ? '#f3e8ff'
                              : apt.statusCategory === 'no-show' ? '#fee2e2'
                              : apt.statusCategory === 'cancelled' ? '#f1f5f9'
                              : '#fef3c7',
                            color: apt.statusCategory === 'completed' ? '#15803d'
                              : apt.statusCategory === 'consultation' ? '#7e22ce'
                              : apt.statusCategory === 'no-show' ? '#dc2626'
                              : apt.statusCategory === 'cancelled' ? '#64748b'
                              : '#b45309',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '0.74rem',
                            fontWeight: 700
                          }}
                        >
                          {apt.status}
                        </span>
                      </td>
                      <td>
                        <div className="row-actions-group">
                          {/* 1. Check in */}
                          {apt.statusCategory === 'confirmed' && (
                            <button 
                              className="btn btn-secondary btn-sm action-pill-btn"
                              onClick={() => handleCheckIn(apt.id)}
                              title="Confirm Arrival and Issue Token"
                            >
                              <UserCheck size={13} /> Check-In
                            </button>
                          )}

                          {/* 2. Call Token */}
                          {(apt.statusCategory === 'queue' || apt.statusCategory === 'checked-in') && (
                            <button 
                              className="btn btn-primary btn-sm action-pill-btn"
                              onClick={() => handleCallToken(apt)}
                              title="Call Token over Hospital Speaker"
                            >
                              <Volume2 size={13} /> Call
                            </button>
                          )}

                          {/* 3. Start Consultation */}
                          {(apt.statusCategory === 'queue' || apt.statusCategory === 'checked-in') && (
                            <button 
                              className="btn btn-secondary btn-sm action-pill-btn"
                              style={{ background: '#8b5cf6', color: '#ffffff', border: 'none' }}
                              onClick={() => handleStartConsultation(apt.id)}
                              title="Doctor starts clinical consult"
                            >
                              <Stethoscope size={13} /> Start
                            </button>
                          )}

                          {/* 4. Complete Consultation */}
                          {apt.statusCategory === 'consultation' && (
                            <button 
                              className="btn btn-primary btn-sm action-pill-btn"
                              style={{ background: '#10b981', borderColor: '#10b981' }}
                              onClick={() => handleCompleteConsultation(apt.id)}
                              title="Complete consult & route to Billing"
                            >
                              <CheckCircle size={13} /> Finish
                            </button>
                          )}

                          {/* 5. Reschedule */}
                          {apt.statusCategory !== 'completed' && apt.statusCategory !== 'cancelled' && (
                            <button 
                              className="btn btn-outline btn-sm action-pill-btn"
                              onClick={() => setRescheduleApt(apt)}
                              title="Reschedule to another slot"
                            >
                              <Clock size={13} />
                            </button>
                          )}

                          {/* 6. Mark No-Show */}
                          {apt.statusCategory !== 'completed' && apt.statusCategory !== 'cancelled' && apt.statusCategory !== 'no-show' && (
                            <button 
                              className="btn btn-outline btn-sm action-pill-btn"
                              style={{ color: '#dc2626' }}
                              onClick={() => handleMarkNoShow(apt.id)}
                              title="Flag patient as No-Show"
                            >
                              <UserX size={13} />
                            </button>
                          )}

                          {/* 7. Cancel */}
                          {apt.statusCategory !== 'completed' && apt.statusCategory !== 'cancelled' && (
                            <button 
                              className="btn btn-outline btn-sm action-pill-btn"
                              style={{ color: '#64748b' }}
                              onClick={() => handleCancelAppointment(apt.id)}
                              title="Cancel booking"
                            >
                              <X size={13} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB 2: DOCTOR AVAILABILITY & SHIFT SCHEDULES ──────────────── */}
      {activeSubTab === 'doctors-schedule' && (
        <div className="superadmin-card">
          <div className="pm-card-header">
            <div>
              <h3 className="pm-card-title">Doctor Duty Rosters & Real-Time Availability</h3>
              <p className="pm-card-subtitle">Manage doctor duty shifts, token quotas, on-call emergency status, and current clinical rooms</p>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => { if (onShowToast) onShowToast('Synced latest duty roster with Hospital ERP.', 'success'); }}
            >
              <RefreshCw size={14} /> Refresh Shifts
            </button>
          </div>

          <div className="pm-grid-2">
            {doctors.map(doc => (
              <div key={doc.id} className="doctor-schedule-card">
                <div className="doc-schedule-top">
                  <div>
                    <span className="doc-id-tag">{doc.id}</span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '4px 0 2px' }}>
                      {doc.name}
                    </h4>
                    <div style={{ fontSize: '0.82rem', color: '#0284c7', fontWeight: 600 }}>
                      {doc.specialty} • {doc.room}
                    </div>
                  </div>

                  <span 
                    style={{ 
                      background: `${doc.statusColor}18`, 
                      color: doc.statusColor,
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.74rem',
                      fontWeight: 800
                    }}
                  >
                    {doc.status}
                  </span>
                </div>

                <div className="doc-metrics-grid">
                  <div className="metric-box">
                    <span className="m-lbl">Current Shift</span>
                    <span className="m-val">{doc.shift}</span>
                  </div>
                  <div className="metric-box">
                    <span className="m-lbl">Token Capacity</span>
                    <span className="m-val">{doc.tokensIssued} / {doc.maxTokens} Issued</span>
                  </div>
                  <div className="metric-box">
                    <span className="m-lbl">Active Calling Token</span>
                    <span className="m-val" style={{ color: '#0284c7', fontWeight: 900 }}>{doc.activeToken}</span>
                  </div>
                  <div className="metric-box">
                    <span className="m-lbl">Avg Consult Time</span>
                    <span className="m-val">{doc.avgConsultMins} Mins / Patient</span>
                  </div>
                </div>

                <div className="doc-schedule-footer">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {doc.onCallEmergency ? (
                      <span style={{ fontSize: '0.74rem', background: '#fee2e2', color: '#dc2626', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>
                        🚨 On-Call Emergency Duty Active
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                        Regular Outpatient Duty
                      </span>
                    )}
                  </div>

                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => toggleDoctorStatus(doc.id)}
                  >
                    Toggle Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 3: SLOT MANAGEMENT ───────────────────────────────────── */}
      {activeSubTab === 'slot-management' && (
        <div className="superadmin-card">
          <div className="pm-card-header">
            <div>
              <h3 className="pm-card-title">OPD Consultation Slot Management</h3>
              <p className="pm-card-subtitle">Regular 15-min slots, 30-min extended consults, and emergency buffer holds</p>
            </div>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => { if (onShowToast) onShowToast('Created new emergency overflow consultation slot.', 'success'); }}
            >
              <Plus size={14} /> Add Emergency Slot
            </button>
          </div>

          <div className="pm-grid-2">
            {slots.map(slot => {
              const isAvail = slot.status === 'Available';
              const isBlocked = slot.status === 'Blocked';
              const isBuffer = slot.type.includes('Buffer');

              return (
                <div key={slot.id} className="slot-item-card">
                  <div className="slot-top">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>{slot.time}</span>
                        <span 
                          style={{
                            background: isBuffer ? '#fee2e2' : '#f1f5f9',
                            color: isBuffer ? '#dc2626' : '#475569',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            fontSize: '0.72rem',
                            fontWeight: 700
                          }}
                        >
                          {slot.type}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                        {slot.doctor} • Token: <strong>{slot.token}</strong>
                      </div>
                    </div>

                    <span 
                      style={{
                        background: isAvail ? '#dcfce7' : isBlocked ? '#fee2e2' : '#e0f2fe',
                        color: isAvail ? '#15803d' : isBlocked ? '#dc2626' : '#0284c7',
                        padding: '3px 10px',
                        borderRadius: '12px',
                        fontSize: '0.74rem',
                        fontWeight: 800
                      }}
                    >
                      {slot.status}
                    </span>
                  </div>

                  <div className="slot-bottom">
                    <span style={{ fontSize: '0.82rem', color: '#475569' }}>
                      Allocated to: <strong>{slot.patient}</strong>
                    </span>

                    <button 
                      className="btn btn-outline btn-sm"
                      style={{ padding: '3px 10px', fontSize: '0.74rem' }}
                      onClick={() => toggleSlotStatus(slot.id)}
                    >
                      {isAvail ? 'Block Slot' : isBlocked ? 'Unblock' : 'Modify'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TAB 4: NO-SHOW TRACKING & ANALYTICS ────────────────────────── */}
      {activeSubTab === 'no-show' && (
        <div className="superadmin-card">
          <div className="pm-card-header">
            <div>
              <h3 className="pm-card-title">Patient No-Show Tracking & Outpatient Telemetry</h3>
              <p className="pm-card-subtitle">Automated missed-slot tracking, rebooking reminders, and loss reduction analytics</p>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => { if (onShowToast) onShowToast('Automated SMS reminder campaign dispatched to all no-show patients.', 'success'); }}
            >
              <Phone size={14} /> Trigger Rebooking SMS
            </button>
          </div>

          {/* KPI Cards */}
          <div className="no-show-kpi-grid">
            <div className="kpi-card">
              <span className="lbl">Total Scheduled Today</span>
              <span className="val">{noShowAnalytics.totalScheduledToday}</span>
            </div>
            <div className="kpi-card">
              <span className="lbl">Arrived & Checked In</span>
              <span className="val" style={{ color: '#0284c7' }}>{noShowAnalytics.checkedInCount}</span>
            </div>
            <div className="kpi-card">
              <span className="lbl">Completed Encounters</span>
              <span className="val" style={{ color: '#16a34a' }}>{noShowAnalytics.completedCount}</span>
            </div>
            <div className="kpi-card">
              <span className="lbl">No-Show Missed Slots</span>
              <span className="val" style={{ color: '#dc2626' }}>{noShowAnalytics.noShowCount}</span>
            </div>
            <div className="kpi-card">
              <span className="lbl">No-Show Rate</span>
              <span className="val" style={{ color: '#d97706' }}>{noShowAnalytics.noShowRate}</span>
            </div>
            <div className="kpi-card">
              <span className="lbl">Average Wait Time</span>
              <span className="val">{noShowAnalytics.avgWaitTimeMins}</span>
            </div>
          </div>

          <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a', margin: '24px 0 12px' }}>
            Flagged No-Show Patients Requiring Follow-Up Action
          </h4>

          <div className="pm-table-responsive">
            <table className="pm-table">
              <thead>
                <tr>
                  <th>Appointment #</th>
                  <th>Patient Name</th>
                  <th>Contact Phone</th>
                  <th>Doctor & Clinic</th>
                  <th>Missed Slot Time</th>
                  <th>Booking Channel</th>
                  <th>Automated Follow-Up</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.filter(a => a.statusCategory === 'no-show').map(apt => (
                  <tr key={apt.id}>
                    <td><strong>{apt.id}</strong></td>
                    <td>
                      <div style={{ fontWeight: 800 }}>{apt.patientName}</div>
                      <div style={{ fontSize: '0.74rem', color: '#0284c7' }}>{apt.uhid}</div>
                    </td>
                    <td>{apt.phone}</td>
                    <td>{apt.doctor}</td>
                    <td style={{ color: '#dc2626', fontWeight: 700 }}>{apt.timeSlot}</td>
                    <td>{apt.sourceBadge}</td>
                    <td>
                      <span style={{ background: '#fef3c7', color: '#b45309', padding: '3px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 700 }}>
                        {apt.followUpDue}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button 
                          className="btn btn-primary btn-sm"
                          style={{ padding: '3px 8px', fontSize: '0.74rem' }}
                          onClick={() => { if (onShowToast) onShowToast(`Sent priority rebooking link to ${apt.phone}`, 'success'); }}
                        >
                          Send Link
                        </button>
                        <button 
                          className="btn btn-outline btn-sm"
                          style={{ padding: '3px 8px', fontSize: '0.74rem' }}
                          onClick={() => setRescheduleApt(apt)}
                        >
                          Reschedule
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB 5: FOLLOW-UP MANAGER ─────────────────────────────────── */}
      {activeSubTab === 'follow-up' && (
        <div className="superadmin-card">
          <div className="pm-card-header">
            <div>
              <h3 className="pm-card-title">Clinical Follow-Up Tracking & Automated Reminders</h3>
              <p className="pm-card-subtitle">Post-consultation follow-up scheduling (7-day, 14-day, 30-day) ensuring continuity of care</p>
            </div>
          </div>

          <div className="pm-table-responsive">
            <table className="pm-table">
              <thead>
                <tr>
                  <th>Encounter ID</th>
                  <th>Patient Name</th>
                  <th>Attending Specialist</th>
                  <th>Initial Consultation</th>
                  <th>Follow-Up Timeline</th>
                  <th>Clinical Reason</th>
                  <th>Reminder Status</th>
                  <th>Schedule Next Visit</th>
                </tr>
              </thead>
              <tbody>
                {appointments.filter(a => a.followUpDue && !a.followUpDue.includes('Decided')).map(apt => (
                  <tr key={apt.id}>
                    <td><strong>{apt.id}</strong></td>
                    <td>
                      <div style={{ fontWeight: 800 }}>{apt.patientName}</div>
                      <div style={{ fontSize: '0.74rem', color: '#0284c7' }}>{apt.uhid}</div>
                    </td>
                    <td>{apt.doctor}</td>
                    <td>{apt.date}</td>
                    <td>
                      <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 700 }}>
                        {apt.followUpDue}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: '#475569' }}>{apt.chiefComplaint}</td>
                    <td>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 700 }}>
                        ✓ SMS Reminder Queued
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 10px', fontSize: '0.76rem' }}
                        onClick={() => { if (onShowToast) onShowToast(`Booked follow-up consultation for ${apt.patientName}`, 'success'); }}
                      >
                        <CalendarCheck size={13} /> Book Slot
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── MODAL 1: CREATE NEW BOOKING (Online / Front-Desk) ────────── */}
      {showBookingModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <div className="admin-modal-header">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                Create Appointment Booking
              </h3>
              <button 
                className="admin-modal-close" 
                onClick={() => setShowBookingModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateBooking}>
              <div className="admin-form-group">
                <label className="pm-form-label">Booking Channel / Source</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    type="button"
                    className={`channel-toggle-btn ${bookingForm.source.includes('Front-Desk') ? 'active' : ''}`}
                    onClick={() => setBookingForm({ ...bookingForm, source: 'Hospital Front-Desk Booking' })}
                  >
                    <Building size={16} />
                    <span>Hospital Front-Desk / Walk-in</span>
                  </button>
                  <button
                    type="button"
                    className={`channel-toggle-btn ${bookingForm.source.includes('Online') ? 'active' : ''}`}
                    onClick={() => setBookingForm({ ...bookingForm, source: 'Online / Public Portal' })}
                  >
                    <Globe size={16} />
                    <span>Online / Public Portal</span>
                  </button>
                </div>
              </div>

              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label className="pm-form-label">Patient Full Name</label>
                  <input 
                    type="text" 
                    className="pm-input" 
                    required
                    placeholder="e.g. Johnathan Davis"
                    value={bookingForm.patientName}
                    onChange={e => setBookingForm({ ...bookingForm, patientName: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="pm-form-label">Contact Mobile</label>
                  <input 
                    type="text" 
                    className="pm-input" 
                    placeholder="+1 (555) 000-0000"
                    value={bookingForm.phone}
                    onChange={e => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label className="pm-form-label">Age</label>
                  <input 
                    type="number" 
                    className="pm-input" 
                    placeholder="35"
                    value={bookingForm.age}
                    onChange={e => setBookingForm({ ...bookingForm, age: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="pm-form-label">Gender</label>
                  <select 
                    className="pm-input"
                    value={bookingForm.gender}
                    onChange={e => setBookingForm({ ...bookingForm, gender: e.target.value })}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label className="pm-form-label">Attending Doctor</label>
                  <select 
                    className="pm-input"
                    value={bookingForm.doctor}
                    onChange={e => setBookingForm({ ...bookingForm, doctor: e.target.value })}
                  >
                    {doctors.map(d => (
                      <option key={d.id} value={d.name}>{d.name} ({d.specialty})</option>
                    ))}
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="pm-form-label">Available Time Slot</label>
                  <select 
                    className="pm-input"
                    value={bookingForm.timeSlot}
                    onChange={e => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                  >
                    <option value="11:00 AM - 11:15 AM">11:00 AM - 11:15 AM (Regular)</option>
                    <option value="11:15 AM - 11:30 AM">11:15 AM - 11:30 AM (Regular)</option>
                    <option value="11:30 AM - 11:45 AM">11:30 AM - 11:45 AM (Regular)</option>
                    <option value="02:30 PM - 02:45 PM">02:30 PM - 02:45 PM (Afternoon)</option>
                    <option value="03:00 PM - 03:15 PM">03:00 PM - 03:15 PM (Afternoon)</option>
                  </select>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="pm-form-label">Chief Complaint / Reason for Consult</label>
                <input 
                  type="text" 
                  className="pm-input" 
                  placeholder="e.g. Chest pain, palpitations, hypertension follow-up"
                  value={bookingForm.complaint}
                  onChange={e => setBookingForm({ ...bookingForm, complaint: e.target.value })}
                />
              </div>

              <div className="admin-modal-footer">
                <button 
                  type="button" 
                  className="btn btn-outline btn-sm"
                  onClick={() => setShowBookingModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-sm"
                >
                  Confirm & Issue Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 2: RESCHEDULE APPOINTMENT ───────────────────────────── */}
      {rescheduleApt && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box" style={{ maxWidth: '420px' }}>
            <div className="admin-modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                Reschedule: {rescheduleApt.patientName} ({rescheduleApt.token})
              </h3>
              <button 
                className="admin-modal-close" 
                onClick={() => setRescheduleApt(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '16px 0' }}>
              <div style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: '12px' }}>
                Current Slot: <strong>{rescheduleApt.timeSlot}</strong> with {rescheduleApt.doctor}
              </div>

              <label className="pm-form-label">Select New Available Slot</label>
              <select 
                className="pm-input"
                value={newSlotTime}
                onChange={e => setNewSlotTime(e.target.value)}
              >
                <option value="03:30 PM - 03:45 PM">Today at 03:30 PM - 03:45 PM</option>
                <option value="04:00 PM - 04:15 PM">Today at 04:00 PM - 04:15 PM</option>
                <option value="04:30 PM - 04:45 PM">Today at 04:30 PM - 04:45 PM</option>
                <option value="Tomorrow 09:30 AM">Tomorrow at 09:30 AM</option>
              </select>
            </div>

            <div className="admin-modal-footer">
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => setRescheduleApt(null)}
              >
                Abort
              </button>
              <button 
                className="btn btn-primary btn-sm"
                onClick={executeReschedule}
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
