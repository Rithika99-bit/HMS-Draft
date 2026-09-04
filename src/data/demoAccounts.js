/**
 * MediCare Hospital Management System - Demo Accounts & Role Dashboard Data
 * Roles: Doctor (Clinician) | Patient | Admin (Operations) | Superadmin (Governance) | Pharmacist
 */

export const demoAccounts = [
  // ─── 1. DOCTOR / CLINICIAN ────────────────────────────────────────────────
  {
    id: 'doctor',
    role: 'Chief Physician / Cardiologist',
    name: 'Dr. Sarah Mitchell, MD',
    email: 'dr.sarah@medicare.health',
    pass: 'DocPass#2026',
    badge: 'Doctor',
    icon: 'Stethoscope',
    department: 'Cardiology & Vascular Medicine',
    color: '#0284c7',
    bgColor: '#e0f2fe',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    stats: [
      { label: "Today's Appointments",    value: '18',          subtext: '4 in active queue',        change: '+3 vs yesterday' },
      { label: 'Patients Requiring Care',  value: '3 Flagged',   subtext: 'Abnormal labs / High BP',  change: 'High priority' },
      { label: 'Diagnostic Results',      value: '2 Unreviewed',subtext: 'CMP & 12-Lead ECG',       change: 'Ready for sign-off' },
      { label: 'Pending E-Prescriptions', value: '4 Orders',    subtext: 'Requires digital sign',    change: 'Action needed' }
    ],
    patientQueue: [
      { id: 'UHID-MED-2026-08942', name: 'Sarah Connor',   age: 38, gender: 'Female', reason: '6-Mo Routine Cardiac Check & Refill', time: '02:15 PM', status: 'Ready for Consult', vitals: 'BP 124/80 • HR 72 • SpO2 99%' },
      { id: 'PT-9021', name: 'Eleanor Vance',   age: 62, gender: 'Female', reason: 'Post-Angioplasty Follow-up',  time: '10:30 AM', status: 'In Waiting Room',   vitals: 'BP 125/80 • HR 72 • SpO2 99%' },
      { id: 'PT-9022', name: 'Robert Chen',     age: 45, gender: 'Male',   reason: 'Arrhythmia & Palpitations',  time: '11:15 AM', status: 'In Diagnostic Lab', vitals: 'BP 138/90 • HR 88 • SpO2 97%' },
      { id: 'PT-9024', name: 'James Thornton',  age: 71, gender: 'Male',   reason: 'Pacemaker Routine Check',    time: '01:30 PM', status: 'Scheduled',         vitals: 'BP 130/82 • HR 65 • SpO2 96%' }
    ]
  },

  // ─── 2. PATIENT ───────────────────────────────────────────────────────────
  {
    id: 'patient',
    role: 'Registered Patient (Self Portal)',
    name: 'Sarah Connor',
    email: 'patient@medicare.health',
    pass: 'Patient#2026',
    badge: 'Patient',
    icon: 'User',
    department: 'Outpatient Care (Cardiology & Wellness)',
    color: '#0891b2',
    bgColor: '#cffafe',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    stats: [
      { label: 'Upcoming Appointment', value: 'Today, 2:15 PM',     subtext: 'Dr. Sarah Mitchell',         change: 'Suite 304' },
      { label: 'Active Prescriptions', value: '3 Medications',      subtext: 'Refills available',          change: '98% Adherence' },
      { label: 'Recent Lab Reports',   value: '2 Verified',         subtext: 'CMP & 12-Lead ECG',          change: 'Normal ranges' },
      { label: 'Insurance Coverage',   value: 'BlueCross PPO',      subtext: '100% In-network covered',   change: 'Pre-Approved' }
    ]
  },

  // ─── 3. ADMIN (HOSPITAL OPERATIONS) ───────────────────────────────────────
  {
    id: 'admin',
    role: 'Hospital Operations Director',
    name: 'Marcus Vance, MHA',
    email: 'admin@medicare.health',
    pass: 'AdminPass#2026',
    badge: 'Admin',
    icon: 'ShieldCheck',
    department: 'Hospital Operations & Administration',
    color: '#2563eb',
    bgColor: '#dbeafe',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    stats: [
      { label: 'Hospital Census',      value: '284 Patients',   subtext: 'Inpatient + Day Care',     change: '+12% vs last week' },
      { label: 'Bed Occupancy',        value: '84.2%',          subtext: '378 / 450 Beds Active',    change: 'Capacity Normal' },
      { label: 'OPD Flow Today',       value: '312 Tokens',     subtext: '18 Active Specialty Desks',change: 'On Schedule' },
      { label: 'Insurance Claims',     value: '$128,450',        subtext: 'Processed today',          change: '99.4% approval' }
    ],
    alerts: [
      { id: 'ALT-1', type: 'info',    text: 'Pharmacy automated reorder triggered for Cefazolin 1g (Stock: 120 vials)',      time: '10 mins ago' },
      { id: 'ALT-2', type: 'success', text: 'NABH annual surveillance accreditation audit passed with 99.4% score',          time: '1 hr ago' },
      { id: 'ALT-3', type: 'warning', text: 'ICU Bed Occupancy reached 92%. Standby surge capacity alerted.',               time: '2 hrs ago' },
      { id: 'ALT-4', type: 'info',    text: 'New staff onboarding: 3 Resident Doctors added to Cardiology wing',            time: '3 hrs ago' }
    ]
  },

  // ─── 4. SUPERADMIN (SYSTEM GOVERNANCE & IT) ───────────────────────────────
  {
    id: 'superadmin',
    role: 'Chief IT Officer & HIPAA Governance Master',
    name: 'SuperAdmin IT Governance',
    email: 'superadmin@medicare.health',
    pass: 'SuperAdmin#2026',
    badge: 'SuperAdmin',
    icon: 'Shield',
    department: 'Enterprise IT Governance & Security',
    color: '#4f46e5',
    bgColor: '#e0e7ff',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    stats: [
      { label: 'System Uptime',        value: '99.99%',         subtext: 'All 8 FHIR clusters live', change: 'Zero incidents' },
      { label: 'Active RBAC Roles',    value: '4 Role Sets',    subtext: '18 Modules Configured',    change: 'HIPAA Compliant' },
      { label: 'Live Audit Stream',    value: '1,420 Events',   subtext: 'Encrypted SHA-256 Ledger', change: 'Real-time' },
      { label: 'Health Integrations',  value: '5 / 5 Connected',subtext: 'HL7, PACS, LIS, Pyxis',    change: 'Latency < 45ms' }
    ],
    alerts: [
      { id: 'ALT-S1', type: 'info',    text: 'HL7 / FHIR Gateway processed 4,892 transactions with zero sync drops',       time: '5 mins ago' },
      { id: 'ALT-S2', type: 'success', text: 'Daily encrypted snapshot backup stored to cold cloud repository',              time: '2 hrs ago' },
      { id: 'ALT-S3', type: 'warning', text: 'MFA session renewal enforced for 14 administrative workstations',             time: '4 hrs ago' }
    ]
  },

  // ─── 5. PHARMACIST (CLINICAL SUPPORT) ─────────────────────────────────────
  {
    id: 'pharmacist',
    role: 'Senior Clinical Pharmacist',
    name: 'Dr. Kevin Okafor, PharmD',
    email: 'pharmacist@medicare.health',
    pass: 'PharmaRx#2026',
    badge: 'Pharmacist',
    icon: 'Pill',
    department: 'Pharmacy & Medication Management',
    color: '#16a34a',
    bgColor: '#dcfce7',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    stats: [
      { label: 'Prescriptions Dispensed',  value: '128',       subtext: 'Verified today',              change: '+22 vs yesterday' },
      { label: 'Low Stock Alerts',         value: '7 Items',   subtext: 'Auto-reorder triggered',      change: 'Action needed' },
      { label: 'Expiry Alerts (30 Days)',   value: '14 Batches',subtext: 'Flagged for disposal',        change: '3 Controlled' },
      { label: 'Drug Interaction Flags',   value: '2 Alerts',  subtext: 'Awaiting physician review',   change: 'High priority' }
    ],
    prescriptions: [
      { id: 'RX-441', patient: 'Eleanor Vance',  drug: 'Atorvastatin 40mg',   qty: '30 Tabs',  dr: 'Dr. Mitchell', status: 'Dispensed',    instructions: 'Once daily at night' },
      { id: 'RX-442', patient: 'Robert Chen',    drug: 'Metoprolol 25mg',      qty: '60 Tabs',  dr: 'Dr. Mitchell', status: 'Pending',      instructions: 'Twice daily with food' },
      { id: 'RX-443', patient: 'Maria Santos',   drug: 'Lisinopril 10mg',      qty: '30 Tabs',  dr: 'Dr. Rodriguez',status: 'Dispensed',    instructions: 'Once daily in morning' },
      { id: 'RX-444', patient: 'James Thornton', drug: 'Warfarin 5mg',         qty: '90 Tabs',  dr: 'Dr. Mitchell', status: 'On Hold',      instructions: 'Daily INR monitoring required' }
    ]
  },

  // ─── 6. LAB TECHNOLOGIST (CLINICAL LABORATORY) ────────────────────────────
  {
    id: 'lab',
    role: 'Senior Medical Laboratory Technologist, MT(ASCP)',
    name: 'Maya Lin, MT(ASCP)',
    email: 'lab@medicare.health',
    pass: 'LabTech#2026',
    badge: '🔬 Lab',
    icon: 'FlaskConical',
    department: 'Clinical Laboratory (LIS) — CLIA Certified',
    color: '#0284c7',
    bgColor: '#e0f2fe',
    avatar: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=300',
    stats: [
      { label: 'Orders in Queue',          value: '14 Pending',  subtext: '3 STAT, 4 Urgent',           change: 'STAT Priority' },
      { label: 'Pending Phlebotomy',       value: '6 Patients',  subtext: 'Waiting for blood draw',      change: 'ICU + Ward B' },
      { label: 'Results Awaiting Sign-off',value: '4 Reports',   subtext: 'Pathologist validation',      change: 'Ready to issue' },
      { label: 'Critical Panic Alerts',    value: '2 Active',    subtext: 'Doctor notification sent',    change: 'Unacknowledged' }
    ]
  },

  // ─── 7. RADIOLOGY TECHNICIAN ──────────────────────────────────────────────
  {
    id: 'technician',
    role: 'Senior Radiology & CT/MRI Technologist, RT(R)(CT)(MR)',
    name: 'Alex Rivera, RT(R)',
    email: 'technician@medicare.health',
    pass: 'TechRad#2026',
    badge: '📷 Technician',
    icon: 'Camera',
    department: 'Diagnostic Imaging & Radiology (RIS/PACS)',
    color: '#0284c7',
    bgColor: '#e0f2fe',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=300',
    stats: [
      { label: "Today's Assigned Studies", value: '8 Exams', subtext: '2 STAT CT, 1 MRI', change: 'On schedule' },
      { label: 'Pending Scans',            value: '3 Patients', subtext: 'CT Suite A & DR 1', change: 'Immediate' },
      { label: 'Completed Scans Today',    value: '5 Acquired', subtext: 'DICOM sent to PACS', change: 'Verified' },
      { label: 'Contrast Safety Checks',   value: '100% Passed', subtext: 'eGFR > 60 verified', change: 'Safe' }
    ]
  },

  // ─── 8. CONSULTANT RADIOLOGIST ───────────────────────────────────────────
  {
    id: 'radiologist',
    role: 'Consultant Neuroradiologist & PACS Signatory',
    name: 'Dr. Alan Graves, MD',
    email: 'radiologist@medicare.health',
    pass: 'RadDoc#2026',
    badge: '🧠 Radiologist',
    icon: 'Activity',
    department: 'Radiology & Molecular Imaging (PACS/RIS)',
    color: '#7c3aed',
    bgColor: '#f3e8ff',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    stats: [
      { label: 'Reporting Queue',        value: '6 Unread', subtext: '1 STAT SAH Alert', change: 'Priority STAT' },
      { label: 'Pending Sign-Off',        value: '2 Drafts', subtext: 'L-Spine MRI & Chest CT', change: 'Action needed' },
      { label: 'Signed Reports Today',    value: '14 Reports', subtext: 'Released to EMR/Portal', change: '100% Verified' },
      { label: 'Critical Finding Alerts', value: '1 Active', subtext: 'Dr. Mitchell notified', change: 'Ack Pending' }
    ]
  },

  // ─── 9. CONSULTANT ANAESTHESIOLOGIST ─────────────────────────────────────
  {
    id: 'anaesthetist',
    role: 'Consultant Anaesthesiologist & Perioperative Care Specialist',
    name: 'Dr. Robert Chen, MD, FACA',
    email: 'anaesthetist@medicare.health',
    pass: 'AnaesDoc#2026',
    badge: '💉 Anaesthetist',
    icon: 'Activity',
    department: 'Anaesthesiology & Perioperative Medicine',
    color: '#059669',
    bgColor: '#d1fae5',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    stats: [
      { label: "Today's Active Cases",   value: '3 Surgeries', subtext: '1 GA-ETT, 1 CSE, 1 MAC', change: 'Active' },
      { label: 'Pre-Anaesthesia (PAC)',   value: '2 Cleared',   subtext: 'ASA-2 & ASA-3',         change: 'Cleared' },
      { label: 'PACU Recovery Queue',     value: '1 Patient',   subtext: 'Aldrete Score 9/10',     change: 'Stable' },
      { label: 'Controlled Anaesthetics', value: '100% Audited', subtext: 'Propofol & Fentanyl Logged', change: 'Verified' }
    ]
  },

  // ─── 10. SENIOR OT NURSE & SCRUB SPECIALIST ──────────────────────────────
  {
    id: 'nurse',
    role: 'Senior OT Scrub & Surgical Safety Specialist',
    name: 'Sister Sarah Connor, RN, BSN',
    email: 'nurse.ot@medicare.health',
    pass: 'NurseOT#2026',
    badge: '🩺 OT Nurse',
    icon: 'HeartPulse',
    department: 'Operation Theatre & Perioperative Nursing',
    color: '#e11d48',
    bgColor: '#ffe4e6',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    stats: [
      { label: 'Active OT Suite',         value: 'OT Suite A', subtext: 'Cardiothoracic Surgery', change: 'In Progress' },
      { label: 'WHO Safety Checklists',   value: '100% Passed', subtext: 'Briefing, Timeout & Sign-out', change: 'Verified' },
      { label: 'Instrument Counts',       value: '3/3 Matched', subtext: 'Zero count discrepancies', change: '100% Match' },
      { label: 'Specimen Dispatches',     value: '2 Sent to Lab', subtext: 'Histology & Frozen Section', change: 'Dispatched' }
    ]
  }
];

// ─── RESTRICTED 4-PORTAL ACCESS LIST ─────────────────────────────────────────
// Only Admin / SuperAdmin, Patient, Doctor, and Pharmacist portals are permitted
export const portalAccounts = demoAccounts.filter(a => 
  ['admin', 'superadmin', 'patient', 'doctor', 'pharmacist'].includes(a.id)
);

export const portalCategories = [
  {
    id: 'admin_group',
    name: 'Admin / SuperAdmin',
    badge: '🛡️ Admin / SuperAdmin',
    description: 'Operations & Enterprise IT Governance',
    color: '#4f46e5',
    subRoles: [
      { id: 'admin', label: 'Operations Admin', accountId: 'admin' },
      { id: 'superadmin', label: 'IT SuperAdmin', accountId: 'superadmin' }
    ]
  },
  {
    id: 'doctor',
    name: 'Doctor Portal',
    badge: '🩺 Doctor',
    description: 'Chief Physician & Clinical Queues',
    color: '#0284c7',
    accountId: 'doctor'
  },
  {
    id: 'patient',
    name: 'Patient Portal',
    badge: '👤 Patient',
    description: 'Patient Health Chart & Appointments',
    color: '#0891b2',
    accountId: 'patient'
  },
  {
    id: 'pharmacist',
    name: 'Pharmacist Portal',
    badge: '💊 Pharmacist',
    description: 'Medication Dispense & Inventory',
    color: '#16a34a',
    accountId: 'pharmacist'
  }
];
