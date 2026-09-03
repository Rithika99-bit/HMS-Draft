/**
 * MediCare Hospital Management System - 10 Enterprise Hospital Modules
 */

export const servicesData = [
  {
    id: 'patient-management',
    number: '01',
    title: 'Patient Management',
    subtitle: 'Admission, Bed Tracking & Demographics',
    icon: 'Users',
    description: 'Streamlined digital admission, discharge, transfer (ADT) workflows, RFID patient wristband tracking, and unified electronic registration.',
    features: ['Instant Digital Onboarding', 'Smart Bed Allocation Matrix', 'Emergency Triage Tagging', 'Family Consent Management'],
    badge: 'Core Clinical',
    stat: '140k+ Patients Handled',
    color: '#0284c7'
  },
  {
    id: 'doctor-management',
    number: '02',
    title: 'Doctor Management',
    subtitle: 'Duty Rostering, Licensing & Queues',
    icon: 'Stethoscope',
    description: 'Automated on-call rotation schedules, surgical theater duty rosters, medical licensing credentialing, and live outpatient consultation queues.',
    features: ['Dynamic Shift & Call Rosters', 'Surgeon OT Scheduling', 'Credential & CME Tracking', 'Teleconsultation Queues'],
    badge: 'Staff Operations',
    stat: '120+ Active Doctors',
    color: '#0d9488'
  },
  {
    id: 'appointment-scheduling',
    number: '03',
    title: 'Appointment Scheduling',
    subtitle: 'Multi-Channel Online & In-Clinic Booking',
    icon: 'CalendarClock',
    description: 'Intelligent appointment scheduling with automated SMS/email reminders, calendar synchronization, and instant doctor availability checks.',
    features: ['Self-Service Web Portal', 'Automated SMS & WhatsApp Alerts', 'Walk-in Token Dispenser', 'Conflict-Free Slot Allocation'],
    badge: 'Patient Experience',
    stat: '450+ Daily Slots',
    color: '#3b82f6'
  },
  {
    id: 'emr-system',
    number: '04',
    title: 'Electronic Medical Records (EMR)',
    subtitle: 'HIPAA & HL7 Encrypted Health Charts',
    icon: 'FileHeart',
    description: 'Unified longitudinal health record encompassing clinical notes, diagnostic imaging, lab results, allergy warnings, and digital e-prescriptions.',
    features: ['FHIR & HL7 Compliant Data', 'Voice-to-Text Clinical Dictation', 'Drug-Drug Interaction Warnings', 'Role-Based Access Control'],
    badge: 'Data Security',
    stat: '256-Bit Encrypted',
    color: '#8b5cf6'
  },
  {
    id: 'pharmacy-management',
    number: '05',
    title: 'Pharmacy Management',
    subtitle: 'Automated Dispensation & Batch Expiry',
    icon: 'Pill',
    description: 'Direct EMR e-prescription integration, barcode medication scanning, batch-wise expiry alerts, and automated re-ordering thresholds.',
    features: ['Barcode Dispensing Verification', 'Real-time Stock Depletion', 'Expiry & Recall Tracking', 'Controlled Substance Logs'],
    badge: 'Pharmacy 4.0',
    stat: '99.9% Stock Accuracy',
    color: '#ec4899'
  },
  {
    id: 'laboratory-management',
    number: '06',
    title: 'Laboratory Management (LIS)',
    subtitle: 'Specimen Barcoding & Auto-Analyzers',
    icon: 'FlaskConical',
    description: 'Automated sample accessioning, bi-directional analyzer interfacing, critical value auto-notifications, and instant patient portal result delivery.',
    features: ['Bi-directional Analyzer Sync', 'Color-Coded Specimen Tracking', 'Critical Panic Result Alerts', 'PDF Report Auto-Generation'],
    badge: 'Diagnostics',
    stat: '12-Min Turnaround',
    color: '#f59e0b'
  },
  {
    id: 'billing-payments',
    number: '07',
    title: 'Billing & Payments',
    subtitle: 'Insurance TPA & Cashless Claims',
    icon: 'CreditCard',
    description: 'Comprehensive financial engine managing itemized billing, multi-insurer cashless approvals, online payment gateways, and transparent invoice breakdowns.',
    features: ['Real-time Insurance Eligibility', 'Itemized Service Breakdown', 'Split-Payment Gateway Support', 'Automated Dispute Audits'],
    badge: 'Revenue Cycle',
    stat: '$4.2M Claims Processed',
    color: '#10b981'
  },
  {
    id: 'staff-management',
    number: '08',
    title: 'Staff Management',
    subtitle: 'Biometric Attendance & Task Delegation',
    icon: 'UserCheck',
    description: 'End-to-end nursing and administrative personnel oversight, shift swap requests, biometric attendance synchronization, and ward assignment delegation.',
    features: ['Biometric & Geo-fenced Check-in', 'Nurse-to-Patient Ratio Monitor', 'Clinical Performance Metrics', 'Overtime & Payroll Sync'],
    badge: 'Human Resources',
    stat: '450+ Hospital Staff',
    color: '#06b6d4'
  },
  {
    id: 'inventory-management',
    number: '09',
    title: 'Inventory & Supplies',
    subtitle: 'Surgical Supplies & Equipment Maintenance',
    icon: 'Boxes',
    description: 'Hospital-wide supply chain management tracking surgical consumables, PPE reserves, oxygen tank levels, and biomedical equipment preventive maintenance.',
    features: ['Automated PO Generation', 'Medical Device Calibration Log', 'Oxygen & Gas Cylinder Telemetry', 'Sterilization Tracking'],
    badge: 'Supply Chain',
    stat: '99.8% Uptime',
    color: '#6366f1'
  },
  {
    id: 'reports-analytics',
    number: '10',
    title: 'Reports & Analytics',
    subtitle: 'Executive KPIs, Bed Turnover & Audits',
    icon: 'BarChart3',
    description: 'Executive dashboards delivering real-time clinical KPIs, bed occupancy heatmaps, average length of stay (ALOS) analytics, and regulatory compliance reports.',
    features: ['Executive Real-time Dashboard', 'ALOS & Readmission Heatmaps', 'Infection Control Surveillance', 'One-Click Compliance Export'],
    badge: 'Executive Suite',
    stat: '50+ KPI Dashboards',
    color: '#14b8a6'
  }
];
