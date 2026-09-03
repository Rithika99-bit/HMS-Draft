/**
 * MediCare Longitudinal EMR Core Store & State Engine
 * Shared across Doctor, Patient, Admin, and SuperAdmin modules.
 * Implements immutable versioning, audit trails, and dynamic RBAC.
 */

import { primaryPatientData, existingPatientDatabase } from './patientMasterData';

// Initial Clinical Version History
export const initialClinicalVersions = [
  {
    versionId: 'VER-2026-004',
    timestamp: '2026-09-03 10:15 AM',
    author: 'Dr. Sarah Mitchell, MD',
    authorRole: 'Doctor / Cardiologist',
    category: 'Medication',
    action: 'Renewed Prescription',
    field: 'Medications: Lisinopril 10mg',
    previousValue: 'Lisinopril 10mg (1 Refill remaining)',
    newValue: 'Lisinopril 10mg (4 Refills authorized - 90 Days supply)',
    reason: '6-Month routine hypertension review. Blood pressure stable at 124/80 mm Hg.',
    auditHash: '0x8f2d91bc4a72e901'
  },
  {
    versionId: 'VER-2026-003',
    timestamp: '2026-09-02 09:45 AM',
    author: 'Dr. Nathan Reed, MD',
    authorRole: 'Pathologist',
    category: 'Lab Results',
    action: 'Verified CMP & Lipid Panel',
    field: 'Laboratory: LAB-2026-9481',
    previousValue: 'Status: Pending Lab Analysis',
    newValue: 'Status: Final / Doctor Verified (Fasting Glucose 94 mg/dL, Total Chol 186 mg/dL)',
    reason: 'Automated analyzer run completed and pathologist digitally verified.',
    auditHash: '0x3c7e14d9a2b58f03'
  },
  {
    versionId: 'VER-2026-002',
    timestamp: '2026-06-12 12:10 PM',
    author: 'Dr. Alex Rivera, MD',
    authorRole: 'Doctor / Pulmonologist',
    category: 'Clinical Note',
    action: 'Added SOAP Progress Note',
    field: 'Clinical Notes: Pulmonology Encounter',
    previousValue: 'None (New Encounter Note)',
    newValue: 'Subjective: Mild exertional dyspnea with seasonal pollen. Plan: Continue Salbutamol PRN.',
    reason: 'Routine outpatient encounter documentation.',
    auditHash: '0x5b90f412cc8a31e8'
  },
  {
    versionId: 'VER-2026-001',
    timestamp: '2024-01-12 09:30 AM',
    author: 'Admin Frontdesk Desk-02',
    authorRole: 'Admin / Registration',
    category: 'Registration',
    action: 'Created Patient Master Record',
    field: 'Patient Master: UHID-MED-2026-08942',
    previousValue: 'None (Initial Registration)',
    newValue: 'Patient: Sarah Connor, DOB: 1988-05-14, Primary Care: Dr. Sarah Mitchell',
    reason: 'Initial OPD registration and biometric identification verification.',
    auditHash: '0x1a9e33d45f09b7c2'
  }
];

// Initial Audit Ledger (HIPAA Compliance & Security Trail)
export const initialAuditLedger = [
  {
    id: 'AUD-8921',
    timestamp: 'Today, 10:15 AM',
    user: 'Dr. Sarah Mitchell, MD',
    role: 'Doctor',
    action: 'CLINICAL_UPDATE',
    module: 'Medications',
    target: 'UHID-MED-2026-08942 (Sarah Connor)',
    details: 'Prescription renewed: Lisinopril 10mg (4 refills)',
    ipAddress: '192.168.1.104',
    status: 'Success / Verified'
  },
  {
    id: 'AUD-8920',
    timestamp: 'Today, 09:30 AM',
    user: 'Sarah Connor',
    role: 'Patient',
    action: 'RECORD_ACCESS',
    module: 'Patient Portal',
    target: 'Own Record (UHID-MED-2026-08942)',
    details: 'Viewed Lab Results: Comprehensive Metabolic Panel (CMP)',
    ipAddress: '172.56.21.88',
    status: 'Success'
  },
  {
    id: 'AUD-8919',
    timestamp: 'Today, 08:45 AM',
    user: 'Marcus Vance, MHA',
    role: 'SuperAdmin',
    action: 'SECURITY_POLICY_CHECK',
    module: 'System Governance',
    target: 'EMR RBAC Matrix',
    details: 'Automated HIPAA access token refresh & certificate re-validation',
    ipAddress: '10.0.0.1',
    status: 'Success'
  },
  {
    id: 'AUD-8918',
    timestamp: '02 Sep 2026, 04:30 PM',
    user: 'Dr. Nathan Reed, MD',
    role: 'Doctor / Lab',
    action: 'RESULT_SIGNOFF',
    module: 'Laboratory',
    target: 'LAB-2026-9481 (Sarah Connor)',
    details: 'Verified and released CMP & Lipid results to patient chart',
    ipAddress: '192.168.1.142',
    status: 'Success / Signed'
  },
  {
    id: 'AUD-8917',
    timestamp: '02 Sep 2026, 11:20 AM',
    user: 'Desk Admin Lisa Wong',
    role: 'Admin',
    action: 'RECORD_MERGE_CHECK',
    module: 'Patient Management',
    target: 'UHID-MED-2025-01449 vs UHID-MED-2026-08942',
    details: 'AI duplicate detection scan executed on Sarah Connor record',
    ipAddress: '192.168.1.20',
    status: 'Warning (Duplicate Detected)'
  },
  {
    id: 'AUD-8916',
    timestamp: '01 Sep 2026, 02:15 PM',
    user: 'Dr. Sarah Mitchell, MD',
    role: 'Doctor',
    action: 'RECORD_ACCESS',
    module: 'Patient Chart',
    target: 'UHID-MED-2026-08942 (Sarah Connor)',
    details: 'Pre-consultation chart review for upcoming OPD appointment',
    ipAddress: '192.168.1.104',
    status: 'Success'
  }
];

// Initial Clinical Notes (SOAP notes)
export const initialClinicalNotes = [
  {
    id: 'NOTE-2026-003',
    date: '03 Sep 2026, 02:30 PM',
    type: 'SOAP Outpatient Encounter Note',
    author: 'Dr. Sarah Mitchell, MD (Cardiology)',
    status: 'Signed & Locked',
    isSigned: true,
    signatureHash: 'SIG-SHA256-8a7e09b1f234ce',
    signedAt: '03 Sep 2026, 02:45 PM',
    subjective: '38-year-old female presents for 6-month routine cardiovascular check-up and medication refill. Patient reports good exercise tolerance (walks 4 miles 4x weekly) with no chest tightness, palpitations, orthopnea, or lower extremity edema. Adherent with daily Lisinopril 10mg and Atorvastatin 20mg.',
    objective: 'Vitals: BP 124/80 mm Hg (Right arm, sitting), HR 72 bpm regular, SpO2 99% on room air, BMI 22.4 kg/m². Physical Exam: Heart sounds S1 S2 normal with no murmurs, rubs, or gallops. Lungs clear to auscultation bilaterally without wheezing or crackles. Peripheral pulses intact 2+ bilaterally.',
    assessment: '1. Essential Hypertension (ICD-10 I10) - Well controlled on current ACE-inhibitor regimen.\n2. Cardiovascular Primary Prophylaxis - Normal lipid profile on Atorvastatin.\n3. Mild Intermittent Asthma (ICD-10 J45.20) - Quiescent.',
    plan: '1. Continue Lisinopril 10mg once daily; authorized 4 refills (90-day supplies).\n2. Continue Atorvastatin 20mg PO at bedtime.\n3. Repeat CMP, fasting lipid profile, and 12-lead ECG in 6 months.\n4. Advised continued regular aerobic exercise and low sodium diet.\n5. Follow-up in Cardiology OPD in 6 months or sooner if symptoms arise.'
  },
  {
    id: 'NOTE-2026-002',
    date: '12 Jun 2026, 11:45 AM',
    type: 'Pulmonology Progress Note',
    author: 'Dr. Alex Rivera, MD (Pulmonology)',
    status: 'Signed & Locked',
    isSigned: true,
    signatureHash: 'SIG-SHA256-4c91d8e031ba55',
    signedAt: '12 Jun 2026, 12:05 PM',
    subjective: 'Follow-up for mild seasonal wheezing during spring pollen season. Denies nocturnal awakenings or emergency department visits.',
    objective: 'Chest clear, normal vesicular breath sounds. Spirometry: FEV1/FVC ratio 82% of predicted. Chest X-Ray PA view clear.',
    assessment: 'Mild Intermittent Asthma (ICD-10 J45.20) - Well controlled.',
    plan: 'Continue Salbutamol 100mcg MDI 1-2 puffs PRN. Return in 1 year or PRN.'
  },
  {
    id: 'NOTE-2021-001',
    date: '16 Mar 2021, 02:00 PM',
    type: 'Inpatient Surgical Discharge Note',
    author: 'Dr. Robert Miller, FACS (General Surgery)',
    status: 'Signed & Locked',
    isSigned: true,
    signatureHash: 'SIG-SHA256-91e847c210ab64',
    signedAt: '16 Mar 2021, 02:15 PM',
    subjective: 'Post-operative Day 3 following elective laparoscopic cholecystectomy for symptomatic cholelithiasis. Tolerating normal diet, ambulating well, minimal trocar site discomfort.',
    objective: 'Afebrile, BP 120/78, HR 68. Abdomen soft, non-distended. 4 laparoscopic port incisions clean, dry, and intact with surgical glue.',
    assessment: 'Status post successful laparoscopic cholecystectomy. Uneventful recovery.',
    plan: 'Discharge home today. Avoid lifting > 10 lbs for 3 weeks. Acetaminophen PRN for pain. Suture/glue check in 1 week.'
  }
];

// Initial RBAC Permissions Matrix
export const initialRbacMatrix = {
  doctor: {
    roleName: 'Doctor / Clinician',
    permissions: {
      patientSummary: { read: true, write: true, sign: true, delete: false, level: 'Full Clinical' },
      diagnoses: { read: true, write: true, sign: true, delete: false, level: 'Full Clinical' },
      allergies: { read: true, write: true, sign: true, delete: false, level: 'Full Clinical' },
      medications: { read: true, write: true, sign: true, delete: false, level: 'Prescribe & Manage' },
      vitals: { read: true, write: true, sign: false, delete: false, level: 'Record & View' },
      clinicalNotes: { read: true, write: true, sign: true, delete: false, level: 'Create, Edit & Sign' },
      labs: { read: true, write: true, sign: true, delete: false, level: 'Order & Acknowledge' },
      imaging: { read: true, write: true, sign: true, delete: false, level: 'Order & PACS View' },
      procedures: { read: true, write: true, sign: true, delete: false, level: 'Document & Sign' },
      surgeries: { read: true, write: true, sign: true, delete: false, level: 'Operative Log' },
      dischargeSummary: { read: true, write: true, sign: true, delete: false, level: 'Draft & Finalize' },
      consents: { read: true, write: true, sign: true, delete: false, level: 'Request & Review' },
      documents: { read: true, write: true, sign: false, delete: false, level: 'Upload & View' },
      timeline: { read: true, write: false, sign: false, delete: false, level: 'Full Clinical Timeline' },
      versionHistory: { read: true, write: true, sign: false, delete: false, level: 'View Diffs & Amend' },
      userManagement: { read: false, write: false, sign: false, delete: false, level: 'No Access' },
      systemConfig: { read: false, write: false, sign: false, delete: false, level: 'No Access' },
      auditLogs: { read: true, write: false, sign: false, delete: false, level: 'Clinical Events Only' }
    }
  },
  patient: {
    roleName: 'Patient (Self-Record Access)',
    permissions: {
      patientSummary: { read: true, write: false, sign: false, delete: false, level: 'View Own Record' },
      diagnoses: { read: true, write: false, sign: false, delete: false, level: 'View Own' },
      allergies: { read: true, write: false, sign: false, delete: false, level: 'View Own' },
      medications: { read: true, write: true, sign: false, delete: false, level: 'View & Request Refills' },
      vitals: { read: true, write: true, sign: false, delete: false, level: 'View & Self-Record' },
      clinicalNotes: { read: true, write: false, sign: false, delete: false, level: 'View Released Summaries' },
      labs: { read: true, write: false, sign: false, delete: false, level: 'View Released Reports' },
      imaging: { read: true, write: false, sign: false, delete: false, level: 'View Released Findings' },
      procedures: { read: true, write: false, sign: false, delete: false, level: 'View Own' },
      surgeries: { read: true, write: false, sign: false, delete: false, level: 'View Own' },
      dischargeSummary: { read: true, write: false, sign: false, delete: false, level: 'View Own' },
      consents: { read: true, write: true, sign: true, delete: false, level: 'Review & e-Sign / Revoke' },
      documents: { read: true, write: true, sign: false, delete: false, level: 'Upload Personal & View' },
      timeline: { read: true, write: false, sign: false, delete: false, level: 'Personal Health Timeline' },
      versionHistory: { read: true, write: false, sign: false, delete: false, level: 'Access Transparency Log' },
      userManagement: { read: false, write: false, sign: false, delete: false, level: 'No Access' },
      systemConfig: { read: false, write: false, sign: false, delete: false, level: 'No Access' },
      auditLogs: { read: true, write: false, sign: false, delete: false, level: 'Own Access Log' }
    }
  },
  admin: {
    roleName: 'Hospital Operations Admin',
    permissions: {
      patientSummary: { read: true, write: true, sign: false, delete: false, level: 'Administrative Demographics' },
      diagnoses: { read: true, write: false, sign: false, delete: false, level: 'View Limited' },
      allergies: { read: true, write: false, sign: false, delete: false, level: 'View Summary' },
      medications: { read: true, write: false, sign: false, delete: false, level: 'View & Dispense Tracking' },
      vitals: { read: true, write: false, sign: false, delete: false, level: 'View' },
      clinicalNotes: { read: true, write: false, sign: false, delete: false, level: 'Encounter Metadata Only' },
      labs: { read: true, write: false, sign: false, delete: false, level: 'Billing & Order Status' },
      imaging: { read: true, write: false, sign: false, delete: false, level: 'Order Status & Billing' },
      procedures: { read: true, write: false, sign: false, delete: false, level: 'Coding & Billing' },
      surgeries: { read: true, write: false, sign: false, delete: false, level: 'OT Schedule & Billing' },
      dischargeSummary: { read: true, write: false, sign: false, delete: false, level: 'Archive & Billing' },
      consents: { read: true, write: true, sign: false, delete: false, level: 'Manage Consent Archive' },
      documents: { read: true, write: true, sign: false, delete: true, level: 'MRD Record Archive' },
      timeline: { read: true, write: false, sign: false, delete: false, level: 'Administrative Overview' },
      versionHistory: { read: true, write: false, sign: false, delete: false, level: 'Audit & Compliance View' },
      userManagement: { read: true, write: true, sign: false, delete: false, level: 'Manage Users & Staff' },
      systemConfig: { read: true, write: false, sign: false, delete: false, level: 'View Settings' },
      auditLogs: { read: true, write: false, sign: false, delete: false, level: 'Full Operational Log' }
    }
  },
  superadmin: {
    roleName: 'System Superadmin / Chief IT & Governance',
    permissions: {
      patientSummary: { read: true, write: true, sign: true, delete: true, level: 'Full System Control' },
      diagnoses: { read: true, write: true, sign: true, delete: true, level: 'Full Control' },
      allergies: { read: true, write: true, sign: true, delete: true, level: 'Full Control' },
      medications: { read: true, write: true, sign: true, delete: true, level: 'Full Control' },
      vitals: { read: true, write: true, sign: true, delete: true, level: 'Full Control' },
      clinicalNotes: { read: true, write: true, sign: true, delete: true, level: 'Full Governance' },
      labs: { read: true, write: true, sign: true, delete: true, level: 'Full Control & LIS Config' },
      imaging: { read: true, write: true, sign: true, delete: true, level: 'Full Control & PACS Config' },
      procedures: { read: true, write: true, sign: true, delete: true, level: 'Full Control' },
      surgeries: { read: true, write: true, sign: true, delete: true, level: 'Full Control' },
      dischargeSummary: { read: true, write: true, sign: true, delete: true, level: 'Full Control' },
      consents: { read: true, write: true, sign: true, delete: true, level: 'Legal & Policy Master' },
      documents: { read: true, write: true, sign: true, delete: true, level: 'Enterprise Vault Control' },
      timeline: { read: true, write: true, sign: true, delete: true, level: 'Master Longitudinal View' },
      versionHistory: { read: true, write: true, sign: true, delete: true, level: 'Full Immutable Ledger' },
      userManagement: { read: true, write: true, sign: true, delete: true, level: 'Enterprise Identity & RBAC' },
      systemConfig: { read: true, write: true, sign: true, delete: true, level: 'Full EMR System Config' },
      auditLogs: { read: true, write: true, sign: true, delete: true, level: 'HIPAA Master Compliance' }
    }
  }
};

// Organization & Facility Configuration
export const initialOrgConfig = {
  hospitalName: 'MediCare Central Multispeciality Hospital',
  network: 'MediCare Global Health System',
  accreditation: 'JCI & NABH Level-5 Certified',
  branches: [
    { id: 'BR-01', name: 'MediCare Central Campus (Springfield)', type: 'Tertiary Quaternary Care', beds: 450, status: 'Active' },
    { id: 'BR-02', name: 'MediCare West Outpatient & Surgery Center', type: 'Ambulatory Surgical Center', beds: 60, status: 'Active' },
    { id: 'BR-03', name: 'MediCare North Pediatric & Maternity Wing', type: 'Specialty Hospital', beds: 120, status: 'Active' }
  ],
  departments: [
    { id: 'DEP-01', name: 'Cardiology & Vascular Medicine', head: 'Dr. Sarah Mitchell, MD', beds: 65, activeDoctors: 8 },
    { id: 'DEP-02', name: 'Pulmonology & Respiratory Care', head: 'Dr. Alex Rivera, MD', beds: 40, activeDoctors: 5 },
    { id: 'DEP-03', name: 'General & Laparoscopic Surgery', head: 'Dr. Robert Miller, FACS', beds: 50, activeDoctors: 7 },
    { id: 'DEP-04', name: 'Internal Medicine & Executive Health', head: 'Dr. Emily Chen, MD', beds: 45, activeDoctors: 9 },
    { id: 'DEP-05', name: 'Emergency Medicine & Trauma Center', head: 'Dr. Gregory House, MD', beds: 30, activeDoctors: 12 }
  ],
  integrations: [
    { id: 'INT-01', name: 'HL7 / FHIR R4 Interoperability Gateway', status: 'Connected & Live', latency: '24ms', uptime: '99.99%', lastSync: 'Just now' },
    { id: 'INT-02', name: 'PACS / DICOM Imaging Server (GE Healthcare)', status: 'Connected & Live', latency: '42ms', uptime: '99.95%', lastSync: '1 min ago' },
    { id: 'INT-03', name: 'LIS Laboratory Information Feed (Roche Cobas)', status: 'Connected & Live', latency: '18ms', uptime: '100%', lastSync: '3 mins ago' },
    { id: 'INT-04', name: 'Pharmacy Automated Dispensing Machine (Pyxis)', status: 'Connected & Live', latency: '35ms', uptime: '99.9%', lastSync: 'Just now' },
    { id: 'INT-05', name: 'National Insurance Clearinghouse (ABHA / BlueCross)', status: 'Connected & Live', latency: '110ms', uptime: '99.8%', lastSync: '10 mins ago' }
  ]
};

// Initial Registered Users Directory
export const initialUsersList = [
  { id: 'USR-101', name: 'Dr. Sarah Mitchell, MD', email: 'dr.sarah@medicare.health', role: 'doctor', department: 'Cardiology', specialty: 'Interventional Cardiology', status: 'Active', mfaEnabled: true, lastLogin: 'Today, 08:30 AM' },
  { id: 'USR-102', name: 'Sarah Connor', email: 'patient@medicare.health', role: 'patient', department: 'Outpatient Care', specialty: 'N/A', status: 'Active', mfaEnabled: true, lastLogin: 'Today, 09:30 AM' },
  { id: 'USR-103', name: 'Marcus Vance, MHA', email: 'admin@medicare.health', role: 'admin', department: 'Executive Operations', specialty: 'Hospital Administration', status: 'Active', mfaEnabled: true, lastLogin: 'Today, 08:00 AM' },
  { id: 'USR-104', name: 'SuperAdmin IT Governance', email: 'superadmin@medicare.health', role: 'superadmin', department: 'IT Governance', specialty: 'Cybersecurity & HIPAA', status: 'Active', mfaEnabled: true, lastLogin: 'Today, 07:45 AM' },
  { id: 'USR-105', name: 'Dr. Alex Rivera, MD', email: 'dr.rivera@medicare.health', role: 'doctor', department: 'Pulmonology', specialty: 'Pulmonary Critical Care', status: 'Active', mfaEnabled: true, lastLogin: 'Yesterday, 04:15 PM' },
  { id: 'USR-106', name: 'Dr. Kevin Okafor, PharmD', email: 'pharmacist@medicare.health', role: 'pharmacist', department: 'Pharmacy', specialty: 'Clinical Pharmacotherapy', status: 'Active', mfaEnabled: false, lastLogin: 'Today, 08:15 AM' },
  { id: 'USR-107', name: 'Nurse Clara Oswald, RN', email: 'clara.rn@medicare.health', role: 'nurse', department: 'Cardiology Inpatient', specialty: 'Cardiac Care Unit', status: 'Active', mfaEnabled: true, lastLogin: 'Today, 07:00 AM' }
];

// Initial Doctor Schedules & Availability
export const initialDoctorSchedules = [
  { doctorId: 'USR-101', doctorName: 'Dr. Sarah Mitchell, MD', department: 'Cardiology', days: 'Mon, Tue, Wed, Fri', hours: '09:00 AM - 04:30 PM', room: 'Suite 304, Tower A', maxTokens: 25, activeTokens: 18, status: 'In Clinic' },
  { doctorId: 'USR-105', doctorName: 'Dr. Alex Rivera, MD', department: 'Pulmonology', days: 'Mon, Thu, Sat', hours: '10:00 AM - 03:00 PM', room: 'Clinic 210, Tower B', maxTokens: 20, activeTokens: 14, status: 'In Clinic' },
  { doctorId: 'USR-108', doctorName: 'Dr. Robert Miller, FACS', department: 'Surgery', days: 'Tue, Wed, Fri (OT: Thu)', hours: '08:00 AM - 02:00 PM', room: 'Surgical Clinic 102', maxTokens: 15, activeTokens: 12, status: 'In Surgery' }
];
