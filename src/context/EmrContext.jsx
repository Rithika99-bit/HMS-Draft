import React, { createContext, useContext, useState } from 'react';
import { primaryPatientData, existingPatientDatabase } from '../data/patientMasterData';
import { 
  initialClinicalVersions, 
  initialAuditLedger, 
  initialClinicalNotes, 
  initialRbacMatrix, 
  initialOrgConfig, 
  initialUsersList, 
  initialDoctorSchedules 
} from '../data/emrStore';

const EmrContext = createContext(null);

export function EmrProvider({ children }) {
  // ─── 1. SHARED LONGITUDINAL PATIENT RECORD ─────────────────────────────
  const [patientRecord, setPatientRecord] = useState({
    ...primaryPatientData,
    clinicalNotes: initialClinicalNotes,
    refillRequests: [
      { id: 'REF-01', medId: 'MED-1', drugName: 'Lisinopril 10mg', requestedDate: '02 Sep 2026', status: 'Approved', reason: 'Routine refill', prescriber: 'Dr. Sarah Mitchell' }
    ],
    correctionRequests: [],
    accessLogs: [
      { id: 'ACC-01', accessedBy: 'Dr. Sarah Mitchell, MD', role: 'Cardiologist', department: 'Cardiology', purpose: 'Outpatient Consultation', timestamp: 'Today, 10:15 AM' },
      { id: 'ACC-02', accessedBy: 'Dr. Nathan Reed, MD', role: 'Pathologist', department: 'Pathology Lab', purpose: 'Diagnostic Sign-off', timestamp: '02 Sep 2026, 04:30 PM' },
      { id: 'ACC-03', accessedBy: 'Desk Admin Lisa Wong', role: 'Frontdesk Clerk', department: 'Outpatient Registration', purpose: 'Appointment Check-in', timestamp: '02 Sep 2026, 11:20 AM' }
    ]
  });

  // ─── 2. CLINICAL VERSION HISTORY & AUDIT LEDGER ─────────────────────────
  const [clinicalVersions, setClinicalVersions] = useState(initialClinicalVersions);
  const [auditLedger, setAuditLedger] = useState(initialAuditLedger);
  const [rbacMatrix, setRbacMatrix] = useState(initialRbacMatrix);
  const [orgConfig, setOrgConfig] = useState(initialOrgConfig);
  const [usersList, setUsersList] = useState(initialUsersList);
  const [doctorSchedules, setDoctorSchedules] = useState(initialDoctorSchedules);
  const [patientDatabase, setPatientDatabase] = useState(existingPatientDatabase);

  // Helper to log audit event
  const logAudit = (action, module, details, user = 'Dr. Sarah Mitchell, MD', role = 'Doctor') => {
    const newEntry = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      user,
      role,
      action,
      module,
      target: `UHID-MED-2026-08942 (${patientRecord.demographics.fullName})`,
      details,
      ipAddress: '192.168.1.' + Math.floor(10 + Math.random() * 200),
      status: 'Success'
    };
    setAuditLedger(prev => [newEntry, ...prev]);
  };

  // Helper to append version history
  const addVersion = ({ category, action, field, previousValue, newValue, reason, author = 'Dr. Sarah Mitchell, MD', authorRole = 'Doctor / Cardiologist' }) => {
    const newVer = {
      versionId: `VER-2026-${String(clinicalVersions.length + 1).padStart(3, '0')}`,
      timestamp: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
      author,
      authorRole,
      category,
      action,
      field,
      previousValue: previousValue || 'None',
      newValue,
      reason: reason || 'Clinical routine update',
      auditHash: '0x' + Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10)
    };
    setClinicalVersions(prev => [newVer, ...prev]);
  };

  // ─── 3. CLINICAL MUTATION ACTIONS ────────────────────────────────────────

  // Add Diagnosis
  const addDiagnosis = (diagnosisData, author = 'Dr. Sarah Mitchell, MD', reason = 'New clinical finding') => {
    const newDiag = {
      condition: diagnosisData.condition,
      icdCode: diagnosisData.icdCode || 'ICD-10 R69',
      diagnosisDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      status: diagnosisData.status || 'Active / Managed',
      attending: author,
      severity: diagnosisData.severity || 'Moderate',
      notes: diagnosisData.notes || ''
    };

    setPatientRecord(prev => ({
      ...prev,
      history: {
        ...prev.history,
        chronicConditions: [newDiag, ...prev.history.chronicConditions]
      },
      longitudinalTimeline: [
        {
          id: `TL-${prev.longitudinalTimeline.length + 1}`,
          date: 'Today, ' + new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'Diagnosis',
          title: `Diagnosis Added: ${newDiag.condition} (${newDiag.icdCode})`,
          subtitle: `By ${author}`,
          description: `Status: ${newDiag.status}. Notes: ${newDiag.notes || 'Documented in EHR chart.'}`,
          badge: 'New Diagnosis',
          badgeColor: '#ec4899'
        },
        ...prev.longitudinalTimeline
      ]
    }));

    addVersion({
      category: 'Diagnosis',
      action: 'Added Diagnosis',
      field: `History: ${newDiag.condition} (${newDiag.icdCode})`,
      previousValue: 'None',
      newValue: `${newDiag.condition} - ${newDiag.status}`,
      reason,
      author,
      authorRole: 'Doctor'
    });

    logAudit('DIAGNOSIS_ADDED', 'Diagnoses', `Added diagnosis ${newDiag.condition} (${newDiag.icdCode})`, author, 'Doctor');
  };

  // Add Allergy
  const addAllergy = (allergyData, author = 'Dr. Sarah Mitchell, MD', reason = 'Patient clinical review') => {
    const newAllergy = {
      id: `ALG-${patientRecord.allergiesAndBlood.allergies.length + 1}`,
      allergen: allergyData.allergen,
      category: allergyData.category || 'Drug Allergy',
      severity: allergyData.severity || 'Critical / High Risk',
      reaction: allergyData.reaction,
      diagnosedYear: new Date().getFullYear().toString(),
      verifiedBy: author,
      status: allergyData.status || 'Active - Strictly Contraindicated'
    };

    setPatientRecord(prev => ({
      ...prev,
      allergiesAndBlood: {
        ...prev.allergiesAndBlood,
        allergies: [newAllergy, ...prev.allergiesAndBlood.allergies]
      },
      longitudinalTimeline: [
        {
          id: `TL-${prev.longitudinalTimeline.length + 1}`,
          date: 'Today',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'Allergy',
          title: `Allergy Flagged: ${newAllergy.allergen}`,
          subtitle: `Verified by ${author}`,
          description: `Reaction: ${newAllergy.reaction}. Severity: ${newAllergy.severity}`,
          badge: 'Allergy Alert',
          badgeColor: '#ef4444'
        },
        ...prev.longitudinalTimeline
      ]
    }));

    addVersion({
      category: 'Allergies',
      action: 'Added Allergy Warning',
      field: `Allergies: ${newAllergy.allergen}`,
      previousValue: 'None',
      newValue: `${newAllergy.allergen} (${newAllergy.severity}) - ${newAllergy.reaction}`,
      reason,
      author,
      authorRole: 'Doctor'
    });

    logAudit('ALLERGY_FLAGGED', 'Allergies', `Added critical allergy ${newAllergy.allergen}`, author, 'Doctor');
  };

  // Prescribe Medication
  const prescribeMedication = (medData, author = 'Dr. Sarah Mitchell, MD', reason = 'Clinical prescription') => {
    const newMed = {
      id: `MED-${patientRecord.medications.active.length + 1}`,
      drugName: medData.drugName,
      dosage: medData.dosage,
      route: medData.route || 'Oral Tablet',
      frequency: medData.frequency,
      purpose: medData.purpose || 'Therapeutic indication',
      startDate: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      prescriber: author,
      refillsRemaining: parseInt(medData.refills || 3, 10),
      complianceRate: '100% (New)'
    };

    const newRx = {
      id: `RX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Today, ' + new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      prescriber: `${author} (Lic #MD-78291)`,
      department: 'Cardiology & Internal Medicine',
      items: [
        { drug: `${newMed.drugName} ${newMed.dosage}`, instructions: `${newMed.frequency} (${newMed.route})`, qty: '30 Tablets', refills: newMed.refillsRemaining }
      ],
      diagnosis: newMed.purpose,
      qrVerification: `VERIFIED-SIG-SHA256-MC${Math.floor(1000 + Math.random() * 9000)}`,
      pharmacyStatus: 'Auto-Synced with Pharmacy Dispensary'
    };

    setPatientRecord(prev => ({
      ...prev,
      medications: {
        ...prev.medications,
        active: [newMed, ...prev.medications.active]
      },
      prescriptions: [newRx, ...prev.prescriptions],
      longitudinalTimeline: [
        {
          id: `TL-${prev.longitudinalTimeline.length + 1}`,
          date: 'Today',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'Medication',
          title: `Prescribed: ${newMed.drugName} ${newMed.dosage}`,
          subtitle: `Prescribed by ${author}`,
          description: `Dose: ${newMed.dosage} • ${newMed.frequency} • Purpose: ${newMed.purpose}`,
          badge: 'Prescription Issued',
          badgeColor: '#10b981'
        },
        ...prev.longitudinalTimeline
      ]
    }));

    addVersion({
      category: 'Medication',
      action: 'Issued E-Prescription',
      field: `Medications: ${newMed.drugName} ${newMed.dosage}`,
      previousValue: 'None',
      newValue: `${newMed.drugName} ${newMed.dosage} - ${newMed.frequency}`,
      reason,
      author,
      authorRole: 'Doctor'
    });

    logAudit('MEDICATION_PRESCRIBED', 'Medications', `Prescribed ${newMed.drugName} ${newMed.dosage} (${newMed.frequency})`, author, 'Doctor');
  };

  // Discontinue Medication
  const discontinueMedication = (medId, stopReason, author = 'Dr. Sarah Mitchell, MD') => {
    const medToStop = patientRecord.medications.active.find(m => m.id === medId);
    if (!medToStop) return;

    setPatientRecord(prev => ({
      ...prev,
      medications: {
        active: prev.medications.active.filter(m => m.id !== medId),
        pastDiscontinued: [
          { drugName: medToStop.drugName, dosage: medToStop.dosage, reason: stopReason, stopDate: 'Today, Sep 2026' },
          ...prev.medications.pastDiscontinued
        ]
      }
    }));

    addVersion({
      category: 'Medication',
      action: 'Discontinued Medication',
      field: `Medications: ${medToStop.drugName}`,
      previousValue: `${medToStop.drugName} ${medToStop.dosage} (Active)`,
      newValue: `Discontinued (${stopReason})`,
      reason: stopReason,
      author,
      authorRole: 'Doctor'
    });

    logAudit('MEDICATION_DISCONTINUED', 'Medications', `Discontinued ${medToStop.drugName} - Reason: ${stopReason}`, author, 'Doctor');
  };

  // Record Vitals
  const recordVitals = (vitalsData, author = 'Dr. Sarah Mitchell, MD') => {
    const sys = parseInt(vitalsData.bpSystolic || 120, 10);
    const dia = parseInt(vitalsData.bpDiastolic || 80, 10);
    const heightM = parseFloat(vitalsData.heightCm || 168) / 100;
    const weightKg = parseFloat(vitalsData.weightKg || 63);
    const bmi = (weightKg / (heightM * heightM)).toFixed(1);
    const map = (dia + (sys - dia) / 3).toFixed(0);

    const vitalsSummary = `BP ${sys}/${dia} mm Hg • HR ${vitalsData.heartRate || 72} bpm • SpO2 ${vitalsData.spo2 || 99}% • BMI ${bmi}`;

    setPatientRecord(prev => ({
      ...prev,
      latestVitals: {
        bp: `${sys}/${dia} mm Hg`,
        heartRate: `${vitalsData.heartRate || 72} bpm`,
        spo2: `${vitalsData.spo2 || 99}%`,
        temperature: `${vitalsData.temperature || 98.4}°F`,
        respiratoryRate: `${vitalsData.respiratoryRate || 16} /min`,
        bmi: `${bmi} kg/m²`,
        map: `${map} mm Hg`,
        bloodGlucose: vitalsData.bloodGlucose ? `${vitalsData.bloodGlucose} mg/dL` : '94 mg/dL',
        painScale: `${vitalsData.painScale || 0}/10`,
        recordedAt: 'Just now by ' + author
      },
      longitudinalTimeline: [
        {
          id: `TL-${prev.longitudinalTimeline.length + 1}`,
          date: 'Today',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'Vitals',
          title: `Vitals Recorded: BP ${sys}/${dia} mm Hg`,
          subtitle: `Taken by ${author}`,
          description: `${vitalsSummary} • MAP ${map} mm Hg`,
          badge: 'Vitals Check',
          badgeColor: '#0284c7'
        },
        ...prev.longitudinalTimeline
      ]
    }));

    addVersion({
      category: 'Vitals',
      action: 'Recorded Clinical Vitals',
      field: 'Vitals: Vital Signs Observation Set',
      previousValue: 'Previous reading on chart',
      newValue: vitalsSummary,
      reason: 'Routine encounter vitals measurement',
      author,
      authorRole: 'Doctor / Nurse'
    });

    logAudit('VITALS_RECORDED', 'Vitals', `Recorded vitals: ${vitalsSummary}`, author, 'Doctor');
  };

  // Create & Sign SOAP Clinical Note
  const createClinicalNote = (noteData, author = 'Dr. Sarah Mitchell, MD') => {
    const isSigned = noteData.isSigned || false;
    const sigHash = isSigned ? `SIG-SHA256-${Math.random().toString(16).substring(2, 12)}` : null;

    const newNote = {
      id: `NOTE-2026-${String(patientRecord.clinicalNotes.length + 1).padStart(3, '0')}`,
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: noteData.type || 'SOAP Outpatient Encounter Note',
      author: `${author} (Cardiology)`,
      status: isSigned ? 'Signed & Locked' : 'Draft / In Progress',
      isSigned,
      signatureHash: sigHash,
      signedAt: isSigned ? 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null,
      subjective: noteData.subjective || '',
      objective: noteData.objective || '',
      assessment: noteData.assessment || '',
      plan: noteData.plan || ''
    };

    setPatientRecord(prev => ({
      ...prev,
      clinicalNotes: [newNote, ...prev.clinicalNotes],
      longitudinalTimeline: [
        {
          id: `TL-${prev.longitudinalTimeline.length + 1}`,
          date: 'Today',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'Clinical Note',
          title: `${newNote.type}`,
          subtitle: `By ${author}`,
          description: `${newNote.assessment.substring(0, 100)}... Status: ${newNote.status}`,
          badge: isSigned ? 'Finalized Note' : 'Draft Note',
          badgeColor: '#8b5cf6'
        },
        ...prev.longitudinalTimeline
      ]
    }));

    addVersion({
      category: 'Clinical Note',
      action: isSigned ? 'Signed & Locked SOAP Note' : 'Created Draft Clinical Note',
      field: `Clinical Notes: ${newNote.type}`,
      previousValue: 'None',
      newValue: `Note ${newNote.id} - ${newNote.status}`,
      reason: 'Encounter documentation',
      author,
      authorRole: 'Doctor'
    });

    logAudit(isSigned ? 'CLINICAL_NOTE_SIGNED' : 'CLINICAL_NOTE_CREATED', 'Clinical Notes', `Encounter note ${newNote.id} created & signed`, author, 'Doctor');
  };

  // Sign Existing Note
  const signClinicalNote = (noteId, author = 'Dr. Sarah Mitchell, MD') => {
    const sigHash = `SIG-SHA256-${Math.random().toString(16).substring(2, 12)}`;
    const signTime = 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setPatientRecord(prev => ({
      ...prev,
      clinicalNotes: prev.clinicalNotes.map(n => {
        if (n.id === noteId) {
          return {
            ...n,
            status: 'Signed & Locked',
            isSigned: true,
            signatureHash: sigHash,
            signedAt: signTime
          };
        }
        return n;
      })
    }));

    addVersion({
      category: 'Clinical Note',
      action: 'Digitally Signed & Locked Note',
      field: `Clinical Notes: Note ${noteId}`,
      previousValue: 'Draft / In Progress',
      newValue: `Signed & Locked (Hash: ${sigHash})`,
      reason: 'Clinical author final sign-off',
      author,
      authorRole: 'Doctor'
    });

    logAudit('CLINICAL_NOTE_SIGNED', 'Clinical Notes', `Note ${noteId} finalized and cryptographically signed`, author, 'Doctor');
  };

  // Order Lab
  const orderLab = (labData, author = 'Dr. Sarah Mitchell, MD') => {
    const newLab = {
      id: `LAB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      testName: labData.testName,
      modality: labData.modality || 'Clinical Laboratory',
      date: 'Today (Ordered)',
      specimen: labData.specimen || 'Venous Blood',
      status: 'Ordered / In Processing',
      labPathologist: 'Assigned to Central Laboratory',
      priority: labData.priority || 'Routine',
      highlights: [
        { parameter: 'Order Placed', value: 'Pending Lab Draw', reference: 'Routine Turnaround ~2 hrs', flag: 'Pending' }
      ]
    };

    setPatientRecord(prev => ({
      ...prev,
      labAndImagingReports: [newLab, ...prev.labAndImagingReports],
      longitudinalTimeline: [
        {
          id: `TL-${prev.longitudinalTimeline.length + 1}`,
          date: 'Today',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'Laboratory',
          title: `Lab Ordered: ${newLab.testName}`,
          subtitle: `Ordered by ${author} (${newLab.priority})`,
          description: `Specimen: ${newLab.specimen}. Priority: ${newLab.priority}`,
          badge: 'Lab Order',
          badgeColor: '#06b6d4'
        },
        ...prev.longitudinalTimeline
      ]
    }));

    addVersion({
      category: 'Lab Results',
      action: 'Ordered Diagnostic Lab',
      field: `Laboratory: ${newLab.testName}`,
      previousValue: 'None',
      newValue: `Order ${newLab.id} - ${newLab.priority}`,
      reason: labData.clinicalNotes || 'Clinical diagnostic workup',
      author,
      authorRole: 'Doctor'
    });

    logAudit('LAB_ORDERED', 'Laboratory', `Ordered ${newLab.testName} (Priority: ${newLab.priority})`, author, 'Doctor');
  };

  // Order Imaging
  const orderImaging = (imgData, author = 'Dr. Sarah Mitchell, MD') => {
    const newImg = {
      id: `IMG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      testName: imgData.testName,
      modality: imgData.modality || 'Radiology / PACS',
      date: 'Today (Scheduled)',
      specimen: imgData.bodyRegion || 'Chest / Thorax',
      status: 'Scheduled in Imaging Suite',
      labPathologist: 'Attending Radiologist On-Call',
      priority: imgData.priority || 'Routine',
      findings: 'Imaging scheduled with Radiology Department. Protocol prepared.'
    };

    setPatientRecord(prev => ({
      ...prev,
      labAndImagingReports: [newImg, ...prev.labAndImagingReports],
      longitudinalTimeline: [
        {
          id: `TL-${prev.longitudinalTimeline.length + 1}`,
          date: 'Today',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'Diagnostic',
          title: `Imaging Ordered: ${newImg.testName}`,
          subtitle: `Ordered by ${author}`,
          description: `Modality: ${newImg.modality}. Priority: ${newImg.priority}`,
          badge: 'Radiology Order',
          badgeColor: '#0d9488'
        },
        ...prev.longitudinalTimeline
      ]
    }));

    addVersion({
      category: 'Imaging',
      action: 'Ordered Diagnostic Imaging',
      field: `Imaging: ${newImg.testName}`,
      previousValue: 'None',
      newValue: `Order ${newImg.id} - ${newImg.priority}`,
      reason: imgData.clinicalIndication || 'Diagnostic evaluation',
      author,
      authorRole: 'Doctor'
    });

    logAudit('IMAGING_ORDERED', 'Imaging', `Ordered imaging ${newImg.testName}`, author, 'Doctor');
  };

  // Acknowledge Diagnostic Result
  const acknowledgeResult = (reportId, author = 'Dr. Sarah Mitchell, MD') => {
    setPatientRecord(prev => ({
      ...prev,
      labAndImagingReports: prev.labAndImagingReports.map(rep => {
        if (rep.id === reportId) {
          return {
            ...rep,
            acknowledgedByDoctor: author,
            acknowledgedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        return rep;
      })
    }));

    logAudit('RESULT_ACKNOWLEDGED', 'Diagnostic Results', `Clinician acknowledged report ${reportId}`, author, 'Doctor');
  };

  // Document Procedure
  const documentProcedure = (procData, author = 'Dr. Sarah Mitchell, MD') => {
    const newProc = {
      procedure: procData.procedureName,
      date: procData.date || 'Today, ' + new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      hospital: 'MediCare Central Hospital',
      surgeon: author,
      indication: procData.indication,
      implants: procData.implants || 'None',
      outcome: procData.outcome || 'Procedure completed successfully without immediate complications.'
    };

    setPatientRecord(prev => ({
      ...prev,
      history: {
        ...prev.history,
        surgicalHistory: [newProc, ...prev.history.surgicalHistory]
      },
      longitudinalTimeline: [
        {
          id: `TL-${prev.longitudinalTimeline.length + 1}`,
          date: 'Today',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'Procedure',
          title: `Procedure Performed: ${newProc.procedure}`,
          subtitle: `Surgeon: ${author}`,
          description: `Indication: ${newProc.indication}. Outcome: ${newProc.outcome}`,
          badge: 'Procedure Log',
          badgeColor: '#f59e0b'
        },
        ...prev.longitudinalTimeline
      ]
    }));

    addVersion({
      category: 'Procedures',
      action: 'Documented Clinical Procedure',
      field: `Procedures: ${newProc.procedure}`,
      previousValue: 'None',
      newValue: `${newProc.procedure} - ${newProc.outcome}`,
      reason: 'Procedural documentation',
      author,
      authorRole: 'Doctor / Surgeon'
    });

    logAudit('PROCEDURE_LOGGED', 'Procedures', `Documented procedure: ${newProc.procedure}`, author, 'Doctor');
  };

  // Request Medication Refill (Patient Action)
  const requestMedicationRefill = (medId, reason = 'Refill needed', patientAuthor = 'Sarah Connor') => {
    const med = patientRecord.medications.active.find(m => m.id === medId);
    if (!med) return;

    const newReq = {
      id: `REF-${Math.floor(100 + Math.random() * 900)}`,
      medId,
      drugName: `${med.drugName} ${med.dosage}`,
      requestedDate: 'Today, ' + new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Pending Clinician Review',
      reason,
      prescriber: med.prescriber
    };

    setPatientRecord(prev => ({
      ...prev,
      refillRequests: [newReq, ...prev.refillRequests]
    }));

    logAudit('REFILL_REQUESTED', 'Medications', `Patient requested refill for ${med.drugName} ${med.dosage}`, patientAuthor, 'Patient');
  };

  // Sign Consent (Patient Action)
  const signConsent = (consentId, signatoryName = 'Sarah Connor', method = 'Electronic SMS OTP') => {
    setPatientRecord(prev => ({
      ...prev,
      documentsAndConsent: prev.documentsAndConsent.map(doc => {
        if (doc.id === consentId) {
          return {
            ...doc,
            status: 'Digitally Signed & Active',
            signedDate: 'Today, ' + new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
            signatory: `${signatoryName} (via ${method})`
          };
        }
        return doc;
      })
    }));

    addVersion({
      category: 'Consents',
      action: 'Signed Electronic Consent Form',
      field: `Consents: Consent Form ${consentId}`,
      previousValue: 'Pending Patient Signature',
      newValue: `Digitally Signed by ${signatoryName} (${method})`,
      reason: 'Patient electronic consent submission',
      author: signatoryName,
      authorRole: 'Patient'
    });

    logAudit('CONSENT_SIGNED', 'Consents', `Patient signed consent form ${consentId}`, signatoryName, 'Patient');
  };

  // Revoke Consent (Patient Action)
  const revokeConsent = (consentId, reason = 'Patient requested withdrawal', signatoryName = 'Sarah Connor') => {
    setPatientRecord(prev => ({
      ...prev,
      documentsAndConsent: prev.documentsAndConsent.map(doc => {
        if (doc.id === consentId) {
          return {
            ...doc,
            status: 'Revoked by Patient',
            signedDate: 'Revoked Today (' + new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) + ')',
            description: `${doc.description} [REVOKED: ${reason}]`
          };
        }
        return doc;
      })
    }));

    addVersion({
      category: 'Consents',
      action: 'Revoked Consent Form',
      field: `Consents: Consent Form ${consentId}`,
      previousValue: 'Active Signed Consent',
      newValue: `Revoked (${reason})`,
      reason,
      author: signatoryName,
      authorRole: 'Patient'
    });

    logAudit('CONSENT_REVOKED', 'Consents', `Patient revoked consent ${consentId}: ${reason}`, signatoryName, 'Patient');
  };

  // Upload Patient Document
  const uploadPatientDocument = (docData, author = 'Sarah Connor') => {
    const newDoc = {
      id: `DOC-2026-${Math.floor(10 + Math.random() * 90)}`,
      title: docData.title,
      category: docData.category || 'Patient Uploaded Record',
      signedDate: 'Today, ' + new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      validity: 'Permanent Vault Storage',
      status: 'Archived & Verified',
      signatory: `Uploaded by ${author}`,
      description: docData.description || 'External health document uploaded by patient.'
    };

    setPatientRecord(prev => ({
      ...prev,
      documentsAndConsent: [newDoc, ...prev.documentsAndConsent]
    }));

    logAudit('DOCUMENT_UPLOADED', 'Documents', `Uploaded document: ${newDoc.title}`, author, 'Patient');
  };

  // Submit Correction Request (Patient Action)
  const submitCorrectionRequest = (reqData, author = 'Sarah Connor') => {
    const newReq = {
      id: `CORR-${Math.floor(100 + Math.random() * 900)}`,
      section: reqData.section,
      currentText: reqData.currentText,
      requestedText: reqData.requestedText,
      reason: reqData.reason,
      submittedDate: 'Today, ' + new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Under Review by Medical Records Department (MRD)'
    };

    setPatientRecord(prev => ({
      ...prev,
      correctionRequests: [newReq, ...prev.correctionRequests]
    }));

    logAudit('CORRECTION_REQUESTED', 'Profile & Privacy', `Patient requested correction in ${reqData.section}`, author, 'Patient');
  };

  // AI-Powered Patient Record Merge (Admin / SuperAdmin Action)
  const mergePatientRecords = (primaryUhid, secondaryUhid, mergedData, adminUser = 'Marcus Vance, MHA') => {
    setPatientDatabase(prev => prev.map(p => {
      if (p.uhid === secondaryUhid) {
        return {
          ...p,
          status: `Merged into ${primaryUhid} (Historical Archived Record)`
        };
      }
      return p;
    }));

    // Update patient demographics with any merged fields
    if (mergedData) {
      setPatientRecord(prev => ({
        ...prev,
        demographics: {
          ...prev.demographics,
          ...mergedData
        }
      }));
    }

    addVersion({
      category: 'Patient Management',
      action: 'Merged Duplicate Patient Record',
      field: `Patient Master: Consolidated ${secondaryUhid} into ${primaryUhid}`,
      previousValue: `Separate record ${secondaryUhid}`,
      newValue: `Merged into Master UHID ${primaryUhid}`,
      reason: 'Controlled duplicate record consolidation workflow',
      author: adminUser,
      authorRole: 'Admin / SuperAdmin'
    });

    logAudit('PATIENT_RECORD_MERGED', 'Patient Management', `Merged record ${secondaryUhid} into ${primaryUhid}`, adminUser, 'Admin');
  };

  // Update Dynamic RBAC Permission (Superadmin Action)
  const updateRbacPermission = (roleKey, moduleKey, permKey, value) => {
    setRbacMatrix(prev => ({
      ...prev,
      [roleKey]: {
        ...prev[roleKey],
        permissions: {
          ...prev[roleKey].permissions,
          [moduleKey]: {
            ...prev[roleKey].permissions[moduleKey],
            [permKey]: value
          }
        }
      }
    }));

    logAudit('RBAC_MODIFIED', 'System Governance', `Updated ${roleKey} permission for ${moduleKey}.${permKey} to ${value}`, 'SuperAdmin IT Governance', 'SuperAdmin');
  };

  // Add / Toggle Users
  const addUser = (userData) => {
    const newUser = {
      id: `USR-${Math.floor(200 + Math.random() * 800)}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      department: userData.department,
      specialty: userData.specialty || 'General',
      status: 'Active',
      mfaEnabled: true,
      lastLogin: 'Never'
    };
    setUsersList(prev => [newUser, ...prev]);
    logAudit('USER_CREATED', 'User Management', `Created new user ${newUser.name} (${newUser.role})`, 'Marcus Vance, MHA', 'Admin');
  };

  const toggleUserStatus = (userId) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Active' ? 'Deactivated' : 'Active';
        logAudit('USER_STATUS_TOGGLED', 'User Management', `User ${u.name} set to ${nextStatus}`, 'Marcus Vance, MHA', 'Admin');
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  // Appointments Management
  const bookAppointment = (aptData, author = 'Sarah Connor') => {
    const newApt = {
      id: `APT-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      type: 'Upcoming Consult',
      specialist: aptData.specialist || 'Dr. Sarah Mitchell, MD',
      department: aptData.department || 'Cardiology',
      date: aptData.date || 'Tomorrow, 04 Sep 2026',
      time: aptData.time || '10:30 AM',
      room: aptData.room || 'Clinic Suite 304',
      status: 'Confirmed',
      mode: aptData.mode || 'In-Clinic Physical Consult',
      notes: aptData.notes || 'Routine follow-up'
    };

    setPatientRecord(prev => ({
      ...prev,
      appointmentsAndVisits: [newApt, ...prev.appointmentsAndVisits],
      longitudinalTimeline: [
        {
          id: `TL-${prev.longitudinalTimeline.length + 1}`,
          date: newApt.date,
          time: newApt.time,
          category: 'Appointment',
          title: `Appointment Booked: ${newApt.specialist}`,
          subtitle: `${newApt.department} • ${newApt.mode}`,
          description: `Reason: ${newApt.notes}`,
          badge: 'Scheduled',
          badgeColor: '#0284c7'
        },
        ...prev.longitudinalTimeline
      ]
    }));

    logAudit('APPOINTMENT_BOOKED', 'Appointments', `Booked appointment with ${newApt.specialist} for ${newApt.date}`, author, 'Patient');
  };

  const cancelAppointment = (aptId, reason = 'Patient cancellation', author = 'Sarah Connor') => {
    setPatientRecord(prev => ({
      ...prev,
      appointmentsAndVisits: prev.appointmentsAndVisits.map(apt => {
        if (apt.id === aptId) {
          return {
            ...apt,
            status: `Cancelled (${reason})`
          };
        }
        return apt;
      })
    }));

    logAudit('APPOINTMENT_CANCELLED', 'Appointments', `Cancelled appointment ${aptId}: ${reason}`, author, 'Patient');
  };

  return (
    <EmrContext.Provider
      value={{
        patientRecord,
        setPatientRecord,
        clinicalVersions,
        auditLedger,
        rbacMatrix,
        orgConfig,
        usersList,
        doctorSchedules,
        patientDatabase,
        // Methods
        logAudit,
        addVersion,
        addDiagnosis,
        addAllergy,
        prescribeMedication,
        discontinueMedication,
        recordVitals,
        createClinicalNote,
        signClinicalNote,
        orderLab,
        orderImaging,
        acknowledgeResult,
        documentProcedure,
        requestMedicationRefill,
        signConsent,
        revokeConsent,
        uploadPatientDocument,
        submitCorrectionRequest,
        mergePatientRecords,
        updateRbacPermission,
        addUser,
        toggleUserStatus,
        bookAppointment,
        cancelAppointment
      }}
    >
      {children}
    </EmrContext.Provider>
  );
}

export function useEmr() {
  const context = useContext(EmrContext);
  if (!context) {
    throw new Error('useEmr must be used within an EmrProvider');
  }
  return context;
}
