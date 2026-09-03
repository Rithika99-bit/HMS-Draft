import React, { useState } from 'react';
import { 
  primaryPatientData, 
  existingPatientDatabase 
} from '../../data/patientMasterData';
import { 
  User, Shield, Phone, AlertTriangle, HeartPulse, 
  FileText, Pill, Calendar, Clock, Activity, 
  CreditCard, ShieldCheck, FileCheck, History, 
  Search, Copy, Check, Printer, Download, 
  ExternalLink, UserPlus, AlertCircle, Sparkles, 
  MapPin, Mail, Droplets, Scissors, Stethoscope,
  ChevronRight, RefreshCw, Eye
} from 'lucide-react';

export default function PatientMasterModule({ onShowToast }) {
  const [activeTab, setActiveTab] = useState('timeline');
  const [patientData, setPatientData] = useState(primaryPatientData);
  const [copiedUhid, setCopiedUhid] = useState(false);

  // Duplicate Detection Tool States
  const [dupSearchQuery, setDupSearchQuery] = useState({
    name: 'Sarah Connor',
    phone: '+1 (555) 234-8901',
    email: 'patient@medicare.health',
    nationalId: 'XXXX-XXXX-4921'
  });
  const [duplicateMatches, setDuplicateMatches] = useState([]);
  const [dupChecked, setDupChecked] = useState(false);

  // Run Duplicate Detection Simulation
  const runDuplicateDetection = (customQuery = dupSearchQuery) => {
    const qName = (customQuery.name || '').toLowerCase().trim();
    const qPhone = (customQuery.phone || '').replace(/\D/g, '');
    const qEmail = (customQuery.email || '').toLowerCase().trim();
    const qId = (customQuery.nationalId || '').toLowerCase().trim();

    const matches = existingPatientDatabase.map(p => {
      let score = 0;
      let reasons = [];

      const pPhoneClean = p.phone.replace(/\D/g, '');
      if (qPhone && pPhoneClean === qPhone) {
        score += 50;
        reasons.push('Exact Mobile Match');
      }
      if (qId && p.nationalId.toLowerCase() === qId) {
        score += 35;
        reasons.push('Exact National ID / Aadhaar Match');
      }
      if (qEmail && p.email.toLowerCase() === qEmail) {
        score += 30;
        reasons.push('Exact Email Match');
      }
      if (qName && p.fullName.toLowerCase().includes(qName)) {
        score += 25;
        reasons.push('Fuzzy Name Match');
      } else if (qName && p.fullName.toLowerCase().split(' ')[0] === qName.split(' ')[0]) {
        score += 15;
        reasons.push('First Name Match');
      }

      return {
        ...p,
        matchScore: Math.min(100, score),
        reasons
      };
    }).filter(m => m.matchScore > 20).sort((a, b) => b.matchScore - a.matchScore);

    setDuplicateMatches(matches);
    setDupChecked(true);

    if (onShowToast) {
      if (matches.length > 1) {
        onShowToast(`Duplicate Detection: Found ${matches.length - 1} possible duplicate record(s)!`, 'warning');
      } else {
        onShowToast('Duplicate Detection: No external duplicates found. Record is unique.', 'success');
      }
    }
  };

  const copyUhid = () => {
    navigator.clipboard?.writeText(patientData.registration.uhid);
    setCopiedUhid(true);
    if (onShowToast) onShowToast(`UHID ${patientData.registration.uhid} copied to clipboard!`, 'info');
    setTimeout(() => setCopiedUhid(false), 2000);
  };

  const tabs = [
    { id: 'timeline', label: 'Longitudinal Timeline', icon: History, count: patientData.longitudinalTimeline.length },
    { id: 'registration', label: 'Registration & UHID', icon: UserPlus },
    { id: 'duplicate-detection', label: 'Duplicate Detection', icon: Search, badge: 'AI Tool' },
    { id: 'demographics', label: 'Demographics & Contact', icon: User },
    { id: 'emergency-contacts', label: 'Emergency Contacts', icon: Phone, count: patientData.emergencyContacts.length },
    { id: 'allergies-blood', label: 'Allergies & Blood Group', icon: Droplets, alert: true },
    { id: 'history', label: 'Medical & Surgical History', icon: Scissors },
    { id: 'medications', label: 'Medication History', icon: Pill, count: patientData.medications.active.length },
    { id: 'appointments', label: 'Appointments & Visits', icon: Calendar, count: patientData.appointmentsAndVisits.length },
    { id: 'prescriptions', label: 'Digital Prescriptions', icon: FileText, count: patientData.prescriptions.length },
    { id: 'lab-imaging', label: 'Lab & Imaging Reports', icon: Activity, count: patientData.labAndImagingReports.length },
    { id: 'admissions', label: 'Admissions & Discharges (ADT)', icon: HeartPulse },
    { id: 'billing', label: 'Billing & Payments', icon: CreditCard, count: patientData.billingHistory.length },
    { id: 'insurance', label: 'Insurance & Pre-Auth', icon: ShieldCheck },
    { id: 'documents', label: 'Documents & Consent', icon: FileCheck, count: patientData.documentsAndConsent.length }
  ];

  return (
    <div className="patient-master-container">
      {/* ── HEADER SUMMARY BANNER ──────────────────────────────────────── */}
      <div className="patient-banner-card">
        <div className="patient-banner-main">
          <div className="patient-avatar-box">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300" 
              alt={patientData.demographics.fullName} 
              className="patient-banner-photo"
            />
            <span className="patient-status-indicator" title="Active Verified Patient"></span>
          </div>

          <div className="patient-banner-meta">
            <div className="patient-title-row">
              <h1 className="patient-name">{patientData.demographics.fullName}</h1>
              <span className="uhid-pill" onClick={copyUhid} title="Click to copy UHID">
                <span>{patientData.registration.uhid}</span>
                {copiedUhid ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              </span>
              <span className="abha-pill">ABHA: {patientData.registration.nationalHealthId}</span>
            </div>

            <div className="patient-demographics-strip">
              <span><strong>Age:</strong> {patientData.demographics.age} Yrs</span>
              <span className="sep">•</span>
              <span><strong>Gender:</strong> {patientData.demographics.gender}</span>
              <span className="sep">•</span>
              <span><strong>DOB:</strong> {patientData.demographics.dateOfBirth}</span>
              <span className="sep">•</span>
              <span><strong>Primary:</strong> {patientData.demographics.primaryPhone}</span>
              <span className="sep">•</span>
              <span><strong>Consultant:</strong> {patientData.registration.assignedPrimaryCarePhysician.split('(')[0]}</span>
            </div>

            {/* Critical Clinical Flags */}
            <div className="patient-flags-row">
              <div className="blood-group-tag">
                <Droplets size={14} />
                <span>{patientData.allergiesAndBlood.bloodGroup}</span>
              </div>

              <div className="critical-allergy-tag" onClick={() => setActiveTab('allergies-blood')}>
                <AlertTriangle size={14} />
                <span>CRITICAL ALLERGY: Penicillin (Anaphylaxis Risk)</span>
              </div>

              <div className="insurance-verified-tag" onClick={() => setActiveTab('insurance')}>
                <ShieldCheck size={14} />
                <span>BCBS Insurance Pre-Approved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="patient-banner-actions">
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => {
              if (onShowToast) onShowToast('Digital Health Smart Card formatted for PDF print.', 'info');
              window.print();
            }}
          >
            <Printer size={15} />
            <span>Print Health ID</span>
          </button>
          
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => {
              setActiveTab('duplicate-detection');
              runDuplicateDetection();
            }}
          >
            <Search size={15} />
            <span>Check Duplicates</span>
          </button>
        </div>
      </div>

      {/* ── 15-MODULE NAVIGATION TABS ─────────────────────────────────── */}
      <div className="patient-tabs-nav-wrapper">
        <div className="patient-tabs-nav">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`patient-nav-tab ${activeTab === tab.id ? 'active' : ''} ${tab.alert ? 'has-alert' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="nav-tab-counter">{tab.count}</span>
                )}
                {tab.badge && (
                  <span className="nav-tab-badge">{tab.badge}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── CONTENT CONTAINER ─────────────────────────────────────────── */}
      <div className="patient-module-content">

        {/* ════ 1. REGISTRATION & UHID ═════════════════════════════════ */}
        {activeTab === 'registration' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <div>
                <h3 className="pm-card-title">Registration & Unique Healthcare Identifier (UHID)</h3>
                <p className="pm-card-subtitle">Permanent digital health registration, ABHA synchronization, and biometric verification</p>
              </div>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={copyUhid}
              >
                <Copy size={14} /> Copy UHID
              </button>
            </div>

            <div className="pm-grid-2">
              <div className="uhid-card-display">
                <div className="uhid-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Activity size={20} color="#0284c7" />
                    <span style={{ fontWeight: 800, color: '#0f172a' }}>MediCare Smart Health Card</span>
                  </div>
                  <span style={{ fontSize: '0.72rem', background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '12px', fontWeight: 700 }}>
                    ACTIVE VERIFIED
                  </span>
                </div>

                <div className="uhid-card-body">
                  <div className="barcode-box">
                    <span className="barcode-font">{patientData.registration.barcode}</span>
                    <span className="barcode-text">{patientData.registration.uhid}</span>
                  </div>

                  <div className="uhid-details-list">
                    <div>
                      <span className="lbl">Patient Name:</span>
                      <span className="val">{patientData.demographics.fullName}</span>
                    </div>
                    <div>
                      <span className="lbl">Date of Birth / Age:</span>
                      <span className="val">{patientData.demographics.dateOfBirth} ({patientData.demographics.age} Yrs)</span>
                    </div>
                    <div>
                      <span className="lbl">Blood Group:</span>
                      <span className="val" style={{ color: '#dc2626', fontWeight: 800 }}>{patientData.allergiesAndBlood.bloodGroup}</span>
                    </div>
                    <div>
                      <span className="lbl">National Health ID (ABHA):</span>
                      <span className="val">{patientData.registration.nationalHealthId}</span>
                    </div>
                    <div>
                      <span className="lbl">Aadhaar Govt ID:</span>
                      <span className="val">{patientData.registration.aadhaarGovtId}</span>
                    </div>
                  </div>
                </div>

                <div className="uhid-card-footer">
                  <span>Registered: {patientData.registration.registeredDate}</span>
                  <span>Branch: MediCare Central</span>
                </div>
              </div>

              {/* Registration Meta Information */}
              <div className="pm-info-table-box">
                <table className="pm-meta-table">
                  <tbody>
                    <tr>
                      <td className="meta-lbl">Registration Type</td>
                      <td className="meta-val">{patientData.registration.registrationType}</td>
                    </tr>
                    <tr>
                      <td className="meta-lbl">Registered Center</td>
                      <td className="meta-val">{patientData.registration.registeredBranch}</td>
                    </tr>
                    <tr>
                      <td className="meta-lbl">Primary Care Physician</td>
                      <td className="meta-val">{patientData.registration.assignedPrimaryCarePhysician}</td>
                    </tr>
                    <tr>
                      <td className="meta-lbl">Patient Category</td>
                      <td className="meta-val">{patientData.registration.patientCategory}</td>
                    </tr>
                    <tr>
                      <td className="meta-lbl">Organ Donor Registry</td>
                      <td className="meta-val" style={{ color: '#0d9488', fontWeight: 700 }}>{patientData.demographics.organDonor}</td>
                    </tr>
                    <tr>
                      <td className="meta-lbl">Biometric ID Verification</td>
                      <td className="meta-val" style={{ color: '#10b981', fontWeight: 700 }}>✓ Verified via UIDAI / Govt Repository</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ════ 2. DUPLICATE PATIENT DETECTION ══════════════════════════ */}
        {activeTab === 'duplicate-detection' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <div>
                <h3 className="pm-card-title">Duplicate Patient Detection & Record Deduplication Engine</h3>
                <p className="pm-card-subtitle">AI-assisted cross-matching by exact phone number, national ID, email, and phonetic/fuzzy name match</p>
              </div>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => runDuplicateDetection()}
              >
                <RefreshCw size={14} /> Run Duplicate Scan
              </button>
            </div>

            <div className="duplicate-search-box">
              <div className="dup-input-grid">
                <div>
                  <label className="pm-form-label">Patient Name</label>
                  <input 
                    type="text" 
                    className="pm-input" 
                    value={dupSearchQuery.name} 
                    onChange={e => setDupSearchQuery({ ...dupSearchQuery, name: e.target.value })}
                    placeholder="Enter full name" 
                  />
                </div>
                <div>
                  <label className="pm-form-label">Phone Number</label>
                  <input 
                    type="text" 
                    className="pm-input" 
                    value={dupSearchQuery.phone} 
                    onChange={e => setDupSearchQuery({ ...dupSearchQuery, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000" 
                  />
                </div>
                <div>
                  <label className="pm-form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="pm-input" 
                    value={dupSearchQuery.email} 
                    onChange={e => setDupSearchQuery({ ...dupSearchQuery, email: e.target.value })}
                    placeholder="email@example.com" 
                  />
                </div>
                <div>
                  <label className="pm-form-label">National ID / Aadhaar</label>
                  <input 
                    type="text" 
                    className="pm-input" 
                    value={dupSearchQuery.nationalId} 
                    onChange={e => setDupSearchQuery({ ...dupSearchQuery, nationalId: e.target.value })}
                    placeholder="XXXX-XXXX-4921" 
                  />
                </div>
              </div>

              <div style={{ marginTop: '14px', display: 'flex', gap: '10px' }}>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => runDuplicateDetection()}
                >
                  <Search size={14} /> Scan Patient Registry Database
                </button>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    const testQuery = { name: 'Sarah J. Connor', phone: '+1 (555) 234-8901', email: 'sarahconnor.old@gmail.com', nationalId: 'XXXX-XXXX-4921' };
                    setDupSearchQuery(testQuery);
                    runDuplicateDetection(testQuery);
                  }}
                >
                  <Sparkles size={14} /> Load Test Duplicate Sample
                </button>
              </div>
            </div>

            {dupChecked && (
              <div className="dup-results-wrapper">
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
                  Cross-Matched Database Results ({duplicateMatches.length} Records Analyzed)
                </h4>

                {duplicateMatches.map(match => {
                  const isPrimary = match.uhid === patientData.registration.uhid;
                  const isHighRiskDup = !isPrimary && match.matchScore >= 50;

                  return (
                    <div 
                      key={match.uhid} 
                      className={`dup-match-card ${isPrimary ? 'primary-record' : isHighRiskDup ? 'duplicate-flagged' : ''}`}
                    >
                      <div className="dup-card-top">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span className="dup-uhid-badge">{match.uhid}</span>
                          <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>{match.fullName}</span>
                          {isPrimary ? (
                            <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '3px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 700 }}>
                              Current Active Record
                            </span>
                          ) : (
                            <span style={{ background: '#fee2e2', color: '#dc2626', padding: '3px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 700 }}>
                              ⚠️ Potential Duplicate Detected ({match.matchScore}% Confidence)
                            </span>
                          )}
                        </div>

                        {!isPrimary && (
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                              className="btn btn-secondary btn-sm"
                              style={{ fontSize: '0.76rem', padding: '4px 10px' }}
                              onClick={() => {
                                if (onShowToast) onShowToast(`Initiated merge workflow for ${match.uhid} into primary UHID!`, 'success');
                              }}
                            >
                              Merge Records
                            </button>
                            <button 
                              className="btn btn-outline btn-sm"
                              style={{ fontSize: '0.76rem', padding: '4px 10px' }}
                              onClick={() => {
                                if (onShowToast) onShowToast(`Marked ${match.uhid} as verified distinct patient.`, 'info');
                              }}
                            >
                              Mark Distinct
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="dup-card-details">
                        <div><strong>DOB:</strong> {match.dob}</div>
                        <div><strong>Phone:</strong> {match.phone}</div>
                        <div><strong>Email:</strong> {match.email}</div>
                        <div><strong>Govt ID:</strong> {match.nationalId}</div>
                      </div>

                      {match.reasons && match.reasons.length > 0 && (
                        <div className="dup-match-reasons">
                          <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#475569' }}>Matched On:</span>
                          {match.reasons.map((r, i) => (
                            <span key={i} className="dup-reason-pill">{r}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ════ 3. DEMOGRAPHICS & CONTACT INFORMATION ═══════════════════ */}
        {activeTab === 'demographics' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <div>
                <h3 className="pm-card-title">Demographics & Contact Information</h3>
                <p className="pm-card-subtitle">Verified patient address, residential district, occupation, and language preference</p>
              </div>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => { if (onShowToast) onShowToast('Demographic information update mode enabled.', 'info'); }}
              >
                Edit Demographics
              </button>
            </div>

            <div className="pm-grid-2">
              <div className="demographics-panel">
                <h4 className="sub-title">Personal Information</h4>
                <div className="demographic-row">
                  <span className="d-label">Full Legal Name</span>
                  <span className="d-val">{patientData.demographics.fullName}</span>
                </div>
                <div className="demographic-row">
                  <span className="d-label">Preferred Name</span>
                  <span className="d-val">{patientData.demographics.preferredName}</span>
                </div>
                <div className="demographic-row">
                  <span className="d-label">Date of Birth & Age</span>
                  <span className="d-val">{patientData.demographics.dateOfBirth} ({patientData.demographics.age} Years)</span>
                </div>
                <div className="demographic-row">
                  <span className="d-label">Biological Gender</span>
                  <span className="d-val">{patientData.demographics.gender}</span>
                </div>
                <div className="demographic-row">
                  <span className="d-label">Marital Status</span>
                  <span className="d-val">{patientData.demographics.maritalStatus}</span>
                </div>
                <div className="demographic-row">
                  <span className="d-label">Nationality</span>
                  <span className="d-val">{patientData.demographics.nationality}</span>
                </div>
                <div className="demographic-row">
                  <span className="d-label">Preferred Languages</span>
                  <span className="d-val">{patientData.demographics.language}</span>
                </div>
                <div className="demographic-row">
                  <span className="d-label">Occupation & Employer</span>
                  <span className="d-val">{patientData.demographics.occupation}</span>
                </div>
              </div>

              <div className="demographics-panel">
                <h4 className="sub-title">Contact & Communication</h4>
                <div className="demographic-row">
                  <span className="d-label">Primary Mobile Phone</span>
                  <span className="d-val">{patientData.demographics.primaryPhone} (SMS & Call Verified)</span>
                </div>
                <div className="demographic-row">
                  <span className="d-label">Alternative Phone</span>
                  <span className="d-val">{patientData.demographics.alternativePhone}</span>
                </div>
                <div className="demographic-row">
                  <span className="d-label">Official Email Address</span>
                  <span className="d-val">{patientData.demographics.email}</span>
                </div>
                <div className="demographic-row">
                  <span className="d-label">Residential Address</span>
                  <span className="d-val">
                    {patientData.demographics.address.street}, {patientData.demographics.address.district}, {patientData.demographics.address.city}, {patientData.demographics.address.state} - {patientData.demographics.address.postalCode}
                  </span>
                </div>
                <div className="demographic-row">
                  <span className="d-label">Comms Preference</span>
                  <span className="d-val" style={{ color: '#0284c7', fontWeight: 600 }}>{patientData.demographics.communicationPreference}</span>
                </div>
                <div className="demographic-row">
                  <span className="d-label">Organ Donation Status</span>
                  <span className="d-val" style={{ color: '#10b981', fontWeight: 700 }}>{patientData.demographics.organDonor}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════ 4. EMERGENCY CONTACTS ═══════════════════════════════════ */}
        {activeTab === 'emergency-contacts' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <div>
                <h3 className="pm-card-title">Emergency Contacts & Next of Kin</h3>
                <p className="pm-card-subtitle">Designated medical decision makers and authorized surrogate contacts for critical admissions</p>
              </div>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => { if (onShowToast) onShowToast('New emergency contact form opened.', 'info'); }}
              >
                <UserPlus size={14} /> Add Emergency Contact
              </button>
            </div>

            <div className="pm-grid-2">
              {patientData.emergencyContacts.map(contact => (
                <div key={contact.id} className="emergency-card">
                  <div className="emergency-card-top">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>{contact.name}</span>
                        {contact.isPrimary && (
                          <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700 }}>
                            PRIMARY NEXT OF KIN
                          </span>
                        )}
                        {contact.decisionMaker && (
                          <span style={{ background: '#e0e7ff', color: '#4f46e5', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700 }}>
                            LEGAL MEDICAL PROXY
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.84rem', color: '#0284c7', fontWeight: 600, marginTop: '2px' }}>
                        {contact.relationship}
                      </div>
                    </div>

                    <a 
                      href={`tel:${contact.phone}`} 
                      className="btn btn-primary btn-sm"
                      style={{ padding: '6px 12px', borderRadius: '20px' }}
                    >
                      <Phone size={13} /> Call
                    </a>
                  </div>

                  <div className="emergency-contact-details">
                    <div><strong>Mobile:</strong> {contact.phone}</div>
                    <div><strong>Alternative:</strong> {contact.alternativePhone}</div>
                    <div><strong>Email:</strong> {contact.email}</div>
                    <div><strong>Address:</strong> {contact.address}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ 5. ALLERGIES AND BLOOD GROUP ════════════════════════════ */}
        {activeTab === 'allergies-blood' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <div>
                <h3 className="pm-card-title">Allergies, Sensitivities & Blood Group Compatibility</h3>
                <p className="pm-card-subtitle">Critical clinical contraindications, drug anaphylaxis safeguards, and blood transfusion records</p>
              </div>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => { if (onShowToast) onShowToast('Allergy addition dialog displayed.', 'info'); }}
              >
                <AlertTriangle size={14} /> Record New Allergy
              </button>
            </div>

            {/* Blood Typing Card */}
            <div className="blood-group-overview-card">
              <div className="blood-drop-badge">
                <Droplets size={32} color="#dc2626" />
                <span className="blood-type-text">O+</span>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                  {patientData.allergiesAndBlood.bloodGroup}
                </h4>
                <p style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: '8px' }}>
                  {patientData.allergiesAndBlood.donorCompatibility} • Antibody Screen: <strong>{patientData.allergiesAndBlood.antibodyScreen}</strong>
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="blood-tag">Can Receive From: O+, O-</span>
                  <span className="blood-tag">Can Donate To: O+, A+, B+, AB+</span>
                  <span className="blood-tag" style={{ background: '#dcfce7', color: '#15803d' }}>Cross-match ready in Blood Bank</span>
                </div>
              </div>
            </div>

            {/* Allergy Table */}
            <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a', margin: '24px 0 12px' }}>
              Documented Clinical Allergies ({patientData.allergiesAndBlood.allergies.length})
            </h4>

            <div className="pm-table-responsive">
              <table className="pm-table">
                <thead>
                  <tr>
                    <th>Allergen Substance</th>
                    <th>Category</th>
                    <th>Severity Level</th>
                    <th>Observed Reaction</th>
                    <th>Diagnosed</th>
                    <th>Verified By</th>
                    <th>Clinical Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patientData.allergiesAndBlood.allergies.map(alg => {
                    const isSevere = alg.severity.toLowerCase().includes('critical') || alg.severity.toLowerCase().includes('high');
                    return (
                      <tr key={alg.id} className={isSevere ? 'severe-allergy-row' : ''}>
                        <td>
                          <div style={{ fontWeight: 800, color: isSevere ? '#dc2626' : '#0f172a' }}>
                            {alg.allergen}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{alg.id}</div>
                        </td>
                        <td>{alg.category}</td>
                        <td>
                          <span style={{ 
                            background: isSevere ? '#fee2e2' : '#fef3c7', 
                            color: isSevere ? '#dc2626' : '#b45309',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '0.74rem',
                            fontWeight: 800
                          }}>
                            {alg.severity}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.82rem', color: '#475569' }}>{alg.reaction}</td>
                        <td>{alg.diagnosedYear}</td>
                        <td style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 600 }}>{alg.verifiedBy}</td>
                        <td>
                          <span style={{ 
                            background: isSevere ? '#fef2f2' : '#f8fafc',
                            color: isSevere ? '#dc2626' : '#334155',
                            border: isSevere ? '1px solid #fecaca' : '1px solid #e2e8f0',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '0.74rem',
                            fontWeight: 700
                          }}>
                            {alg.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ════ 6. MEDICAL AND SURGICAL HISTORY ═════════════════════════ */}
        {activeTab === 'history' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <div>
                <h3 className="pm-card-title">Medical, Surgical & Family History</h3>
                <p className="pm-card-subtitle">Documented chronic pathologies, past surgical interventions, surgical implants, and hereditary risk factors</p>
              </div>
            </div>

            {/* Chronic Conditions */}
            <h4 className="sub-title">1. Chronic Medical Conditions</h4>
            <div className="pm-grid-2" style={{ marginBottom: '24px' }}>
              {patientData.history.chronicConditions.map((c, idx) => (
                <div key={idx} className="history-box">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>{c.condition}</span>
                    <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 700 }}>
                      {c.icdCode}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', margin: '4px 0 8px' }}>
                    Diagnosed: <strong>{c.diagnosisDate}</strong> • Attending: {c.attending}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#166534', background: '#f0fdf4', padding: '6px 10px', borderRadius: '6px', fontWeight: 600 }}>
                    Status: {c.status}
                  </div>
                </div>
              ))}
            </div>

            {/* Past Surgeries */}
            <h4 className="sub-title">2. Surgical History & Medical Implants</h4>
            <div className="pm-table-responsive" style={{ marginBottom: '24px' }}>
              <table className="pm-table">
                <thead>
                  <tr>
                    <th>Procedure Performed</th>
                    <th>Date</th>
                    <th>Facility & Operating Surgeon</th>
                    <th>Indication</th>
                    <th>Implants / Devices</th>
                    <th>Clinical Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {patientData.history.surgicalHistory.map((s, idx) => (
                    <tr key={idx}>
                      <td><strong style={{ color: '#0f172a' }}>{s.procedure}</strong></td>
                      <td>{s.date}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{s.hospital}</div>
                        <div style={{ fontSize: '0.78rem', color: '#0284c7' }}>{s.surgeon}</div>
                      </td>
                      <td style={{ fontSize: '0.82rem' }}>{s.indication}</td>
                      <td>
                        <span style={{ background: '#f1f5f9', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 700 }}>
                          {s.implants}
                        </span>
                      </td>
                      <td>
                        <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 700 }}>
                          {s.outcome}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Family Medical History */}
            <h4 className="sub-title">3. Hereditary & Family Medical History</h4>
            <div className="pm-grid-3">
              {patientData.history.familyHistory.map((f, idx) => (
                <div key={idx} className="family-history-card">
                  <span style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.9rem' }}>{f.relation}</span>
                  <p style={{ fontSize: '0.84rem', color: '#334155', marginTop: '4px', lineHeight: 1.4 }}>{f.condition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ 7. MEDICATION HISTORY ═══════════════════════════════════ */}
        {activeTab === 'medications' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <div>
                <h3 className="pm-card-title">Medication History & Active Regimen</h3>
                <p className="pm-card-subtitle">Current pharmaceutical therapies, dosage compliance, refill schedules, and discontinued drugs</p>
              </div>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => { if (onShowToast) onShowToast('Refill request routed to MediCare automated pharmacy.', 'success'); }}
              >
                Request Refill
              </button>
            </div>

            <h4 className="sub-title">Active Prescribed Medications ({patientData.medications.active.length})</h4>
            <div className="pm-grid-3" style={{ marginBottom: '28px' }}>
              {patientData.medications.active.map(med => (
                <div key={med.id} className="medication-card">
                  <div className="med-card-top">
                    <div>
                      <span className="med-name">{med.drugName}</span>
                      <span className="med-dosage">{med.dosage} • {med.route}</span>
                    </div>
                    <span className="med-pill-icon"><Pill size={18} /></span>
                  </div>

                  <div className="med-card-body">
                    <div className="med-row"><strong>Frequency:</strong> {med.frequency}</div>
                    <div className="med-row"><strong>Indication:</strong> {med.purpose}</div>
                    <div className="med-row"><strong>Prescribed:</strong> {med.startDate} ({med.prescriber})</div>
                    <div className="med-row"><strong>Compliance:</strong> <span style={{ color: '#16a34a', fontWeight: 700 }}>{med.complianceRate}</span></div>
                    <div className="med-row"><strong>Refills Left:</strong> {med.refillsRemaining} Refills</div>
                  </div>

                  <div className="med-card-footer">
                    <button 
                      className="btn btn-outline btn-sm btn-full"
                      onClick={() => { if (onShowToast) onShowToast(`Refill requested for ${med.drugName}`, 'success'); }}
                    >
                      Refill Medication
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <h4 className="sub-title">Past / Discontinued Medications</h4>
            <div className="pm-table-responsive">
              <table className="pm-table">
                <thead>
                  <tr>
                    <th>Medication Name & Strength</th>
                    <th>Reason for Discontinuation</th>
                    <th>Stop Date</th>
                  </tr>
                </thead>
                <tbody>
                  {patientData.medications.pastDiscontinued.map((p, idx) => (
                    <tr key={idx}>
                      <td><strong style={{ color: '#0f172a' }}>{p.drugName} ({p.dosage})</strong></td>
                      <td style={{ color: '#dc2626', fontWeight: 600 }}>{p.reason}</td>
                      <td>{p.stopDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ════ 8. APPOINTMENTS AND VISITS ═══════════════════════════════ */}
        {activeTab === 'appointments' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <div>
                <h3 className="pm-card-title">Appointments, Outpatient Encounters & Clinical Visits</h3>
                <p className="pm-card-subtitle">Scheduled doctor consultations, token queue telemetry, and historic OPD visit summaries</p>
              </div>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => { if (onShowToast) onShowToast('Booking wizard invoked.', 'info'); }}
              >
                <Calendar size={14} /> Book New Visit
              </button>
            </div>

            <div className="pm-table-responsive">
              <table className="pm-table">
                <thead>
                  <tr>
                    <th>Encounter ID</th>
                    <th>Specialist Doctor</th>
                    <th>Department</th>
                    <th>Date & Time</th>
                    <th>Consultation Mode</th>
                    <th>Location / Room</th>
                    <th>Clinical Notes</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {patientData.appointmentsAndVisits.map(apt => (
                    <tr key={apt.id}>
                      <td><strong>{apt.id}</strong></td>
                      <td>
                        <div style={{ fontWeight: 800, color: '#0f172a' }}>{apt.specialist}</div>
                      </td>
                      <td>{apt.department}</td>
                      <td>
                        <div style={{ fontWeight: 700 }}>{apt.date}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{apt.time}</div>
                      </td>
                      <td>
                        <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 700 }}>
                          {apt.mode}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.82rem' }}>{apt.room}</td>
                      <td style={{ fontSize: '0.8rem', color: '#475569', maxWidth: '200px' }}>{apt.notes}</td>
                      <td>
                        <span style={{ 
                          background: apt.status.includes('Confirmed') ? '#dcfce7' : '#f1f5f9',
                          color: apt.status.includes('Confirmed') ? '#15803d' : '#334155',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.76rem',
                          fontWeight: 700
                        }}>
                          {apt.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                          onClick={() => { if (onShowToast) onShowToast(`Downloaded visit slip for ${apt.id}`, 'info'); }}
                        >
                          <Download size={12} /> Slip
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ════ 9. DIGITAL PRESCRIPTIONS ═════════════════════════════════ */}
        {activeTab === 'prescriptions' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <div>
                <h3 className="pm-card-title">Digital E-Prescriptions & Dispensing Log</h3>
                <p className="pm-card-subtitle">Cryptographically signed electronic prescriptions with QR code pharmacy verification</p>
              </div>
            </div>

            <div className="pm-grid-2">
              {patientData.prescriptions.map(rx => (
                <div key={rx.id} className="rx-card">
                  <div className="rx-card-header">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>{rx.id}</span>
                        <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: 700 }}>
                          DIGITALLY SIGNED
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        Date: {rx.date} • Prescriber: <strong>{rx.prescriber}</strong>
                      </div>
                    </div>
                    <span className="rx-symbol">℞</span>
                  </div>

                  <div className="rx-diagnosis-box">
                    <strong>Indication / Diagnosis:</strong> {rx.diagnosis}
                  </div>

                  <div className="rx-meds-list">
                    {rx.items.map((item, i) => (
                      <div key={i} className="rx-item">
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{item.drug}</div>
                        <div style={{ fontSize: '0.82rem', color: '#475569' }}>{item.instructions}</div>
                        <div style={{ fontSize: '0.76rem', color: '#0284c7', marginTop: '2px' }}>
                          Quantity: {item.qty} • Refills: {item.refills} authorized
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rx-card-footer">
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Hash Signature: {rx.qrVerification}</div>
                      <div style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: 600 }}>{rx.pharmacyStatus}</div>
                    </div>

                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => { if (onShowToast) onShowToast(`Prescription ${rx.id} downloaded with digital seal.`, 'success'); }}
                    >
                      <Download size={13} /> Download Rx
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ 10. LABORATORY AND IMAGING REPORTS ═══════════════════════ */}
        {activeTab === 'lab-imaging' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <div>
                <h3 className="pm-card-title">Laboratory & Diagnostic Imaging Reports (PACS)</h3>
                <p className="pm-card-subtitle">Biochemistry panels, hematology, ECG traces, PACS chest X-Rays, and 2D Echocardiograms</p>
              </div>
            </div>

            <div className="pm-reports-stack">
              {patientData.labAndImagingReports.map(rpt => (
                <div key={rpt.id} className="report-card">
                  <div className="report-card-top">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>{rpt.testName}</span>
                        <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700 }}>
                          {rpt.modality}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>
                        Encounter ID: <strong>{rpt.id}</strong> • Date: {rpt.date} • Verified by: {rpt.labPathologist}
                      </div>
                    </div>

                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => { if (onShowToast) onShowToast(`Full clinical diagnostic report ${rpt.id} PDF downloaded.`, 'info'); }}
                    >
                      <Download size={13} /> Full Report PDF
                    </button>
                  </div>

                  {/* Highlights Table if CMP */}
                  {rpt.highlights ? (
                    <div className="pm-table-responsive" style={{ marginTop: '14px' }}>
                      <table className="pm-table">
                        <thead>
                          <tr>
                            <th>Parameter</th>
                            <th>Result Value</th>
                            <th>Reference Biological Interval</th>
                            <th>Diagnostic Flag</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rpt.highlights.map((h, i) => (
                            <tr key={i}>
                              <td style={{ fontWeight: 600 }}>{h.parameter}</td>
                              <td><strong>{h.value}</strong></td>
                              <td style={{ fontSize: '0.82rem', color: '#64748b' }}>{h.reference}</td>
                              <td>
                                <span style={{ 
                                  background: h.flag === 'Borderline' ? '#fef3c7' : '#dcfce7',
                                  color: h.flag === 'Borderline' ? '#b45309' : '#15803d',
                                  padding: '2px 8px',
                                  borderRadius: '6px',
                                  fontSize: '0.74rem',
                                  fontWeight: 700
                                }}>
                                  {h.flag}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="imaging-findings-box">
                      <strong>Radiologist / Specialist Findings:</strong>
                      <p style={{ marginTop: '4px', lineHeight: 1.5, color: '#334155' }}>{rpt.findings}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ 11. ADMISSIONS AND DISCHARGES (ADT) ══════════════════════ */}
        {activeTab === 'admissions' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <div>
                <h3 className="pm-card-title">Inpatient Admissions, Bed Transfers & Discharges (ADT)</h3>
                <p className="pm-card-subtitle">Comprehensive IPD inpatient hospitalization records, surgical summaries, and discharge counseling</p>
              </div>
            </div>

            {patientData.admissionsAndDischarges.map(adm => (
              <div key={adm.ipdNumber} className="adt-card">
                <div className="adt-header">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="adt-number">{adm.ipdNumber}</span>
                      <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>{adm.admittingDiagnosis}</span>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: '12px', fontSize: '0.74rem', fontWeight: 800 }}>
                        DISCHARGED STABLE
                      </span>
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '4px' }}>
                      {adm.department} • Consultant: <strong>{adm.admittingConsultant}</strong>
                    </div>
                  </div>

                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => { if (onShowToast) onShowToast(`Complete discharge summary for ${adm.ipdNumber} generated.`, 'success'); }}
                  >
                    <FileText size={14} /> Discharge Summary
                  </button>
                </div>

                <div className="adt-details-grid">
                  <div className="adt-metric">
                    <span className="lbl">Admission Date</span>
                    <span className="val">{adm.admissionDate}</span>
                  </div>
                  <div className="adt-metric">
                    <span className="lbl">Discharge Date</span>
                    <span className="val">{adm.dischargeDate}</span>
                  </div>
                  <div className="adt-metric">
                    <span className="lbl">Length of Stay (LOS)</span>
                    <span className="val">{adm.lengthOfStay}</span>
                  </div>
                  <div className="adt-metric">
                    <span className="lbl">Allocated Bed & Ward</span>
                    <span className="val">{adm.ward} — {adm.bedNumber}</span>
                  </div>
                </div>

                <div className="adt-summary-box">
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Surgical Procedure:</strong> {adm.surgeryPerformed}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Condition at Discharge:</strong> <span style={{ color: '#166534' }}>{adm.dischargeCondition}</span>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Take-Home Medications:</strong> {adm.dischargeMedications}
                  </div>
                  <div>
                    <strong>Discharge Follow-Up Advice:</strong> {adm.dischargeAdvice}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ════ 12. BILLING AND PAYMENT HISTORY ═════════════════════════ */}
        {activeTab === 'billing' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <div>
                <h3 className="pm-card-title">Billing, Invoices & Payment Settlement History</h3>
                <p className="pm-card-subtitle">Transparent itemized clinical tariffs, insurance coverage breakdown, and zero outstanding balance</p>
              </div>
            </div>

            <div className="pm-billing-summary-strip">
              <div className="bill-stat">
                <span className="lbl">Total Invoiced to Date</span>
                <span className="val">$5,520.00</span>
              </div>
              <div className="bill-stat">
                <span className="lbl">Covered by Insurance (BCBS)</span>
                <span className="val" style={{ color: '#0284c7' }}>$4,950.00 (89.7%)</span>
              </div>
              <div className="bill-stat">
                <span className="lbl">Patient Co-Pay Settled</span>
                <span className="val" style={{ color: '#16a34a' }}>$570.00</span>
              </div>
              <div className="bill-stat">
                <span className="lbl">Outstanding Patient Due</span>
                <span className="val" style={{ color: '#10b981', fontWeight: 800 }}>$0.00 (Settled)</span>
              </div>
            </div>

            <div className="pm-table-responsive" style={{ marginTop: '16px' }}>
              <table className="pm-table">
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Billing Date</th>
                    <th>Clinical Service Rendered</th>
                    <th>Gross Amount</th>
                    <th>Insurance Paid</th>
                    <th>Patient Paid</th>
                    <th>Payment Instrument</th>
                    <th>Status</th>
                    <th>Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {patientData.billingHistory.map(inv => (
                    <tr key={inv.invoiceId}>
                      <td><strong>{inv.invoiceId}</strong></td>
                      <td>{inv.date}</td>
                      <td style={{ fontWeight: 600 }}>{inv.serviceDescription}</td>
                      <td>${inv.grossAmount.toFixed(2)}</td>
                      <td style={{ color: '#0284c7', fontWeight: 600 }}>${inv.insuranceCovered.toFixed(2)}</td>
                      <td style={{ fontWeight: 600 }}>${inv.patientCoPay.toFixed(2)}</td>
                      <td style={{ fontSize: '0.8rem', color: '#475569' }}>{inv.paymentMethod}</td>
                      <td>
                        <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 700 }}>
                          {inv.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '3px 8px', fontSize: '0.74rem' }}
                          onClick={() => { if (onShowToast) onShowToast(`Downloaded tax invoice receipt for ${inv.invoiceId}`, 'info'); }}
                        >
                          <Download size={12} /> Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ════ 13. INSURANCE AND PRE-AUTHORIZATION ═════════════════════ */}
        {activeTab === 'insurance' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <div>
                <h3 className="pm-card-title">Health Insurance, TPA & Pre-Authorization Status</h3>
                <p className="pm-card-subtitle">Active cashless medical insurance coverage, policy benefits, annual sum insured, and pre-authorization</p>
              </div>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => { if (onShowToast) onShowToast('Synced latest insurance coverage details with BCBS TPA.', 'success'); }}
              >
                <RefreshCw size={14} /> Refresh TPA Status
              </button>
            </div>

            <div className="pm-grid-2">
              <div className="insurance-policy-card">
                <div className="ins-header">
                  <div>
                    <span className="ins-badge">TIER 1 CASHLESS PRE-APPROVED</span>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
                      {patientData.insurance.insuranceProvider}
                    </h4>
                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      Plan: {patientData.insurance.policyName}
                    </div>
                  </div>
                  <ShieldCheck size={36} color="#0284c7" />
                </div>

                <div className="ins-policy-body">
                  <div className="ins-row">
                    <span className="lbl">Policy / Member ID:</span>
                    <span className="val" style={{ fontWeight: 800 }}>{patientData.insurance.policyNumber}</span>
                  </div>
                  <div className="ins-row">
                    <span className="lbl">Corporate Group #:</span>
                    <span className="val">{patientData.insurance.groupNumber}</span>
                  </div>
                  <div className="ins-row">
                    <span className="lbl">Primary Policyholder:</span>
                    <span className="val">{patientData.insurance.primaryPolicyHolder}</span>
                  </div>
                  <div className="ins-row">
                    <span className="lbl">TPA Administrator:</span>
                    <span className="val">{patientData.insurance.tpaName}</span>
                  </div>
                  <div className="ins-row">
                    <span className="lbl">Coverage Period:</span>
                    <span className="val">{patientData.insurance.coverageValidity}</span>
                  </div>
                  <div className="ins-row">
                    <span className="lbl">Hospital Network Tier:</span>
                    <span className="val" style={{ color: '#16a34a', fontWeight: 700 }}>{patientData.insurance.cashlessNetworkStatus}</span>
                  </div>
                </div>
              </div>

              {/* Financial Coverage Limits */}
              <div className="insurance-limits-panel">
                <h4 className="sub-title">Annual Sum Insured & Utilization</h4>

                <div className="coverage-bar-container">
                  <div className="coverage-bar-labels">
                    <span>Utilized: {patientData.insurance.utilizedAmount}</span>
                    <span>Total Limit: {patientData.insurance.sumInsuredAnnual}</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: '1.1%' }}></div>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: 700, marginTop: '6px' }}>
                    Available Cashless Balance: {patientData.insurance.balanceAvailable}
                  </div>
                </div>

                <div className="co-pay-box">
                  <strong>Co-Payment Clause:</strong>
                  <p style={{ fontSize: '0.84rem', color: '#475569', marginTop: '4px' }}>
                    {patientData.insurance.coPayClause}
                  </p>
                </div>

                <div className="preauth-status-box">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={18} color="#15803d" />
                    <strong>Pre-Authorization Status:</strong>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: '#166534', marginTop: '4px' }}>
                    {patientData.insurance.preAuthStatus}. Instant cashless approval granted for all emergency & scheduled surgical admissions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════ 14. DOCUMENTS AND CONSENT ═══════════════════════════════ */}
        {activeTab === 'documents' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <div>
                <h3 className="pm-card-title">Documents, Digital Consents & Legal Directives</h3>
                <p className="pm-card-subtitle">Informed procedural consent forms, HIPAA privacy releases, government identification proofs, and living wills</p>
              </div>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => { if (onShowToast) onShowToast('Digital consent signing portal initiated.', 'info'); }}
              >
                <FileCheck size={14} /> Sign New Consent
              </button>
            </div>

            <div className="pm-grid-2">
              {patientData.documentsAndConsent.map(doc => (
                <div key={doc.id} className="doc-card">
                  <div className="doc-card-top">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>{doc.title}</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 600, marginTop: '2px' }}>
                        {doc.category} • {doc.validity}
                      </div>
                    </div>
                    <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                      {doc.status}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.84rem', color: '#475569', margin: '10px 0', lineHeight: 1.4 }}>
                    {doc.description}
                  </p>

                  <div className="doc-card-footer">
                    <span style={{ fontSize: '0.76rem', color: '#64748b' }}>
                      Signatory: <strong>{doc.signatory}</strong> ({doc.signedDate})
                    </span>

                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => { if (onShowToast) onShowToast(`Archived legal document ${doc.id} PDF opened.`, 'info'); }}
                    >
                      <Eye size={13} /> View PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ 15. LONGITUDINAL PATIENT TIMELINE ═══════════════════════ */}
        {activeTab === 'timeline' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <div>
                <h3 className="pm-card-title">Longitudinal Patient Health Timeline</h3>
                <p className="pm-card-subtitle">Unified chronological health trajectory tracking admissions, surgeries, diagnostic results, and clinical encounters</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '12px', fontSize: '0.76rem', fontWeight: 700 }}>
                  Chronological Lifetime Record
                </span>
              </div>
            </div>

            <div className="longitudinal-timeline-container">
              {patientData.longitudinalTimeline.map((item, idx) => (
                <div key={item.id} className="timeline-event-item">
                  <div className="timeline-marker-column">
                    <div className="timeline-dot" style={{ background: item.badgeColor }} />
                    {idx < patientData.longitudinalTimeline.length - 1 && (
                      <div className="timeline-line" />
                    )}
                  </div>

                  <div className="timeline-event-content">
                    <div className="timeline-event-header">
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>{item.title}</span>
                          <span 
                            style={{ 
                              background: `${item.badgeColor}18`, 
                              color: item.badgeColor, 
                              padding: '2px 8px', 
                              borderRadius: '6px', 
                              fontSize: '0.72rem', 
                              fontWeight: 700 
                            }}
                          >
                            {item.badge}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#0284c7', fontWeight: 600, marginTop: '2px' }}>
                          {item.subtitle}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>{item.date}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{item.time}</div>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.86rem', color: '#475569', marginTop: '8px', lineHeight: 1.5 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
