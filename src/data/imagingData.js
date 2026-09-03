/**
 * MediCare Hospital Radiology & Imaging Information System (RIS) Data
 * Modalities: X-Ray | CT Scan | MRI | Ultrasound
 */

// ─── 1. IMAGING TEST MASTER ───────────────────────────────────────────────────
export const initialImagingTestMaster = [
  // X-RAY
  {
    testCode: 'IMG-XR-CHEST-01', loincCode: '24627-2', cptCode: '71046',
    testName: 'Chest X-Ray — PA & Lateral (2-View)',
    modality: 'X-Ray', bodyRegion: 'Thorax / Chest',
    price: 85.00, turnaroundTimeHours: 1,
    contrastRequired: false, fastingRequired: 'No',
    patientPrep: 'Remove jewelry and metallic objects. Wear hospital gown.',
    reportTemplate: 'Chest', status: 'Active',
    equipment: 'Digital Radiography (DR) Suite 1 — GE Definium 6000'
  },
  {
    testCode: 'IMG-XR-ABDO-02', loincCode: '36643-5', cptCode: '74018',
    testName: 'Abdomen X-Ray — AP & Lateral Decubitus',
    modality: 'X-Ray', bodyRegion: 'Abdomen / Pelvis',
    price: 75.00, turnaroundTimeHours: 1,
    contrastRequired: false, fastingRequired: 'No',
    patientPrep: 'Remove clothing and wear hospital gown. Bladder emptied.',
    reportTemplate: 'Abdomen', status: 'Active',
    equipment: 'Digital Radiography (DR) Suite 2 — Siemens Multix'
  },
  {
    testCode: 'IMG-XR-SKULL-03', loincCode: '36643-5', cptCode: '70250',
    testName: 'Skull X-Ray — AP, Lateral & Townes View',
    modality: 'X-Ray', bodyRegion: 'Head / Skull',
    price: 70.00, turnaroundTimeHours: 1,
    contrastRequired: false, fastingRequired: 'No',
    patientPrep: 'Remove head accessories and jewelry.',
    reportTemplate: 'Musculoskeletal', status: 'Active',
    equipment: 'Digital Radiography (DR) Suite 1 — GE Definium 6000'
  },

  // CT SCAN
  {
    testCode: 'IMG-CT-HEAD-04', loincCode: '24725-4', cptCode: '70450',
    testName: 'CT Head / Brain — Non-Contrast',
    modality: 'CT Scan', bodyRegion: 'Head / Brain (Cranial)',
    price: 380.00, turnaroundTimeHours: 2,
    contrastRequired: false, fastingRequired: 'No',
    patientPrep: 'Remove metallic objects, dentures, hearing aids. Lie still during scan.',
    reportTemplate: 'Neuro CT', status: 'Active',
    equipment: 'Siemens SOMATOM Definition AS+ (128-Slice CT) — Suite A'
  },
  {
    testCode: 'IMG-CT-CHEST-05', loincCode: '36643-5', cptCode: '71250',
    testName: 'CT Chest — High Resolution (HRCT) With/Without Contrast',
    modality: 'CT Scan', bodyRegion: 'Thorax / Pulmonary',
    price: 420.00, turnaroundTimeHours: 2,
    contrastRequired: true, fastingRequired: 'Yes (4 Hours)',
    patientPrep: '4-hour fasting. IV access required for contrast injection. Creatinine check mandatory.',
    reportTemplate: 'Chest CT', status: 'Active',
    equipment: 'Siemens SOMATOM Definition AS+ (128-Slice CT) — Suite A'
  },
  {
    testCode: 'IMG-CT-ABDO-06', loincCode: '25062-4', cptCode: '74178',
    testName: 'CT Abdomen & Pelvis — With IV Contrast (Triphasic)',
    modality: 'CT Scan', bodyRegion: 'Abdomen & Pelvis',
    price: 520.00, turnaroundTimeHours: 2,
    contrastRequired: true, fastingRequired: 'Yes (6 Hours)',
    patientPrep: '6-hour fasting. Oral contrast 1h prior. IV contrast renal function check. Empty bladder.',
    reportTemplate: 'Abdo CT', status: 'Active',
    equipment: 'GE Revolution CT (256-Slice) — Suite B'
  },

  // MRI
  {
    testCode: 'IMG-MRI-BRAIN-07', loincCode: '36643-5', cptCode: '70553',
    testName: 'MRI Brain with Gadolinium Contrast',
    modality: 'MRI', bodyRegion: 'Brain / Cranial',
    price: 780.00, turnaroundTimeHours: 4,
    contrastRequired: true, fastingRequired: 'No',
    patientPrep: 'MRI safety screening mandatory. No pacemakers. Remove all metallic implants. IV access for Gadolinium.',
    reportTemplate: 'Neuro MRI', status: 'Active',
    equipment: 'Philips Ingenia 3.0 Tesla MRI — Scan Room 1'
  },
  {
    testCode: 'IMG-MRI-SPINE-08', loincCode: '36643-5', cptCode: '72148',
    testName: 'MRI Lumbar Spine — Without Contrast',
    modality: 'MRI', bodyRegion: 'Spine (Lumbar L1-S1)',
    price: 620.00, turnaroundTimeHours: 3,
    contrastRequired: false, fastingRequired: 'No',
    patientPrep: 'MRI safety screening. Remove jewelry and ferromagnetic items. Lie perfectly still for 45 mins.',
    reportTemplate: 'Spine MRI', status: 'Active',
    equipment: 'Siemens MAGNETOM Aera 1.5T MRI — Scan Room 2'
  },
  {
    testCode: 'IMG-MRI-KNEE-09', loincCode: '36643-5', cptCode: '73721',
    testName: 'MRI Right Knee — Without Contrast (MSK Protocol)',
    modality: 'MRI', bodyRegion: 'Right Knee / Musculoskeletal',
    price: 540.00, turnaroundTimeHours: 3,
    contrastRequired: false, fastingRequired: 'No',
    patientPrep: 'Comfortable clothing. Remove metallic objects. Knee coil will be applied.',
    reportTemplate: 'MSK MRI', status: 'Active',
    equipment: 'Philips Ingenia 3.0 Tesla MRI — Scan Room 1'
  },

  // ULTRASOUND
  {
    testCode: 'IMG-US-ABDO-10', loincCode: '36643-5', cptCode: '76700',
    testName: 'Ultrasound Abdomen — Complete (Liver, GB, Pancreas, Kidneys)',
    modality: 'Ultrasound', bodyRegion: 'Abdomen (All Organs)',
    price: 180.00, turnaroundTimeHours: 1,
    contrastRequired: false, fastingRequired: 'Yes (6 Hours)',
    patientPrep: '6-hour fasting for optimal gallbladder visualization. Full bladder for pelvic assessment.',
    reportTemplate: 'Abdo US', status: 'Active',
    equipment: 'GE LOGIQ E10 Ultrasound — Bay 1'
  },
  {
    testCode: 'IMG-US-ECHO-11', loincCode: '42148-7', cptCode: '93306',
    testName: '2D Echocardiography with Doppler (TTE)',
    modality: 'Ultrasound', bodyRegion: 'Heart / Cardiac',
    price: 350.00, turnaroundTimeHours: 2,
    contrastRequired: false, fastingRequired: 'No',
    patientPrep: 'ECG leads will be applied. Loose hospital gown. Light meal allowed.',
    reportTemplate: 'Echo', status: 'Active',
    equipment: 'Philips EPIQ CVx Cardiac Ultrasound — Echo Lab'
  },
  {
    testCode: 'IMG-US-THYROID-12', loincCode: '36643-5', cptCode: '76536',
    testName: 'Ultrasound Thyroid & Parathyroid (with Doppler)',
    modality: 'Ultrasound', bodyRegion: 'Neck / Thyroid',
    price: 150.00, turnaroundTimeHours: 1,
    contrastRequired: false, fastingRequired: 'No',
    patientPrep: 'Lie with neck slightly extended. No special preparation required.',
    reportTemplate: 'Thyroid US', status: 'Active',
    equipment: 'GE LOGIQ E10 Ultrasound — Bay 2'
  }
];

// ─── 2. IMAGING ORDERS ─────────────────────────────────────────────────────────
export const initialImagingOrders = [
  {
    orderId: 'IMG-ORD-2026-0031',
    patientUhid: 'UHID-MED-2026-08942',
    patientName: 'Sarah Connor',
    patientAge: 38, patientGender: 'Female',
    prescribingDoctor: 'Dr. Sarah Mitchell, MD (Cardiology)',
    orderDate: 'Today, 09:45 AM',
    priority: 'Urgent',
    modality: 'CT Scan',
    testCode: 'IMG-CT-CHEST-05',
    testName: 'CT Chest — High Resolution (HRCT) With/Without Contrast',
    bodyRegion: 'Thorax / Pulmonary',
    clinicalIndication: 'Dyspnea, cough, history of previous pulmonary embolism. Rule out recurrent PE.',
    status: 'Scheduled',
    scheduledDate: 'Today, 02:30 PM',
    scheduledRoom: 'CT Suite A — Siemens SOMATOM',
    assignedTechnician: 'RT James Vance, ARRT',
    assignedRadiologist: 'Dr. Alan Graves, MD (Radiology)',
    contrastUsed: 'Iodixanol 320mg/mL (80 mL IV)',
    studyInstanceUid: '1.2.840.10008.5.1.4.1.1.2.20260903.001',
    accessionNumber: 'ACC-RIS-2026-031',
    reportStatus: 'Pending',
    isCritical: false,
    invoiceId: 'INV-IMG-031',
    totalPrice: 420.00
  },
  {
    orderId: 'IMG-ORD-2026-0032',
    patientUhid: 'PT-9022',
    patientName: 'Robert Chen',
    patientAge: 45, patientGender: 'Male',
    prescribingDoctor: 'Dr. Sarah Mitchell, MD (Cardiology)',
    orderDate: 'Today, 08:10 AM',
    priority: 'STAT (Emergency)',
    modality: 'CT Scan',
    testCode: 'IMG-CT-HEAD-04',
    testName: 'CT Head / Brain — Non-Contrast',
    bodyRegion: 'Head / Brain (Cranial)',
    clinicalIndication: 'Sudden onset severe headache ("worst headache of life"). Rule out subarachnoid hemorrhage / intracranial bleed.',
    status: 'Report Ready',
    scheduledDate: 'Today, 08:25 AM',
    scheduledRoom: 'CT Suite A — Siemens SOMATOM',
    assignedTechnician: 'RT Maya Patel, ARRT',
    assignedRadiologist: 'Dr. Alan Graves, MD (Radiology)',
    contrastUsed: 'None (Non-Contrast)',
    studyInstanceUid: '1.2.840.10008.5.1.4.1.1.2.20260903.002',
    accessionNumber: 'ACC-RIS-2026-032',
    reportStatus: 'Final',
    isCritical: true,
    criticalFinding: 'Hyperdense CT appearance consistent with acute Subarachnoid Hemorrhage (SAH) involving bilateral Sylvian Fissures. IMMEDIATE NEUROSURGERY REVIEW REQUIRED.',
    invoiceId: 'INV-IMG-032',
    totalPrice: 380.00
  },
  {
    orderId: 'IMG-ORD-2026-0033',
    patientUhid: 'PT-9021',
    patientName: 'Eleanor Vance',
    patientAge: 62, patientGender: 'Female',
    prescribingDoctor: 'Dr. Sarah Mitchell, MD (Cardiology)',
    orderDate: 'Yesterday, 03:20 PM',
    priority: 'Routine',
    modality: 'MRI',
    testCode: 'IMG-MRI-SPINE-08',
    testName: 'MRI Lumbar Spine — Without Contrast',
    bodyRegion: 'Spine (Lumbar L1-S1)',
    clinicalIndication: 'Chronic lower back pain with bilateral radiculopathy. Rule out herniated disc / lumbar stenosis.',
    status: 'Exam Complete (Pending Report)',
    scheduledDate: 'Yesterday, 04:00 PM',
    scheduledRoom: 'MRI Scan Room 2 — Siemens MAGNETOM 1.5T',
    assignedTechnician: 'RT Sam Nguyen, ARRT',
    assignedRadiologist: 'Dr. Priya Shah, MD (Neuroradiology)',
    contrastUsed: 'None',
    studyInstanceUid: '1.2.840.10008.5.1.4.1.1.4.20260902.003',
    accessionNumber: 'ACC-RIS-2026-033',
    reportStatus: 'Preliminary',
    isCritical: false,
    invoiceId: 'INV-IMG-033',
    totalPrice: 620.00
  },
  {
    orderId: 'IMG-ORD-2026-0034',
    patientUhid: 'PT-9024',
    patientName: 'James Thornton',
    patientAge: 71, patientGender: 'Male',
    prescribingDoctor: 'Dr. Sarah Mitchell, MD (Cardiology)',
    orderDate: 'Today, 11:00 AM',
    priority: 'Routine',
    modality: 'Ultrasound',
    testCode: 'IMG-US-ECHO-11',
    testName: '2D Echocardiography with Doppler (TTE)',
    bodyRegion: 'Heart / Cardiac',
    clinicalIndication: 'Pacemaker follow-up. Evaluate ventricular function, pacemaker lead position, and valvular disease progression.',
    status: 'Ordered (Pending Scheduling)',
    scheduledDate: null,
    scheduledRoom: null,
    assignedTechnician: null,
    assignedRadiologist: null,
    contrastUsed: 'None',
    studyInstanceUid: null,
    accessionNumber: 'ACC-RIS-2026-034',
    reportStatus: 'Pending',
    isCritical: false,
    invoiceId: 'INV-IMG-034',
    totalPrice: 350.00
  }
];

// ─── 3. RADIOLOGIST REPORTS ────────────────────────────────────────────────────
export const initialImagingReports = {
  'IMG-ORD-2026-0032': {
    orderId: 'IMG-ORD-2026-0032',
    patientName: 'Robert Chen',
    modality: 'CT Scan',
    testName: 'CT Head / Brain — Non-Contrast',
    studyDate: 'Today, 08:25 AM',
    radiologist: 'Dr. Alan Graves, MD (Radiology)',
    radiologistSignature: 'SIG-RAD-DR-GRAVES-88234',
    status: 'Final',
    findings: `Technical quality: Adequate. Non-contrast axial CT images of the brain obtained at 3mm thickness.

FINDINGS:
- Hyperdense (bright) material identified in the bilateral Sylvian fissures, anterior interhemispheric fissure, and basal cisterns, consistent with acute subarachnoid hemorrhage (SAH).
- Moderate hydrocephalus noted with dilated lateral and third ventricles suggesting early obstructive component.
- No midline shift detected. No parenchymal intracerebral hemorrhage identified.
- No obvious mass lesion or herniation.
- Bone windows: No skull fractures identified.`,
    impression: `ACUTE SUBARACHNOID HEMORRHAGE (SAH) — CRITICAL FINDING.
Extensive subarachnoid blood in bilateral Sylvian fissures and basal cisterns. Moderate hydrocephalus. No midline shift.
Differential: Ruptured cerebral aneurysm vs. trauma. IMMEDIATE neurosurgery and neurocritical care consultation recommended. CT Angiography of the head strongly recommended.`,
    criticalFinding: true,
    criticalFindingText: 'Acute Subarachnoid Hemorrhage with hydrocephalus. IMMEDIATE NEUROSURGERY REVIEW REQUIRED.',
    signedAt: 'Today, 09:10 AM',
    amendmentHistory: []
  },
  'IMG-ORD-2026-0033': {
    orderId: 'IMG-ORD-2026-0033',
    patientName: 'Eleanor Vance',
    modality: 'MRI',
    testName: 'MRI Lumbar Spine — Without Contrast',
    studyDate: 'Yesterday, 04:00 PM',
    radiologist: 'Dr. Priya Shah, MD (Neuroradiology)',
    radiologistSignature: 'Pending Final Sign-off',
    status: 'Preliminary',
    findings: `PRELIMINARY REPORT (Pending Final Radiologist Sign-off):

T1, T2, STIR, and sagittal/axial sequences of the lumbar spine obtained.

FINDINGS:
- Loss of disc height and signal intensity at L4-L5 and L5-S1 levels consistent with degenerative disc disease (Grade III).
- Posterior disc bulge at L4-L5 causing mild central canal narrowing (10.8mm residual canal).
- Left paracentral disc herniation at L5-S1 with contact/compression of the traversing left S1 nerve root.
- Moderate bilateral facet hypertrophy at L4-L5 contributing to foraminal stenosis.
- Conus medullaris terminates normally at L1.`,
    impression: `PRELIMINARY: Degenerative disc disease L4-L5 and L5-S1. Left paracentral L5-S1 disc herniation with left S1 nerve root compression. Correlate with clinical radiculopathy. Physio, pain management, and neurosurgery consultation recommended.`,
    criticalFinding: false,
    signedAt: null,
    amendmentHistory: []
  }
};

// ─── 4. CRITICAL FINDINGS BOARD ───────────────────────────────────────────────
export const initialCriticalImagingFindings = [
  {
    findingId: 'CRIT-IMG-2026-001',
    orderId: 'IMG-ORD-2026-0032',
    patientUhid: 'PT-9022',
    patientName: 'Robert Chen',
    patientAge: 45, patientGender: 'Male',
    doctorName: 'Dr. Sarah Mitchell, MD (Cardiology)',
    modality: 'CT Scan',
    finding: 'Acute Subarachnoid Hemorrhage (SAH) — Bilateral Sylvian Fissures with Hydrocephalus',
    severity: 'Life-Threatening',
    reportedBy: 'Dr. Alan Graves, MD (Radiology)',
    reportedAt: 'Today, 09:10 AM',
    status: 'Pending Acknowledgment',
    acknowledgedAt: null,
    clinicalActionTaken: null
  }
];

// ─── 5. IMAGING INVOICES ──────────────────────────────────────────────────────
export const initialImagingInvoices = [
  {
    invoiceId: 'INV-IMG-031', orderId: 'IMG-ORD-2026-0031',
    patientName: 'Sarah Connor', patientUhid: 'UHID-MED-2026-08942',
    date: '03 Sep 2026', testsTotal: 420.00, tax: 21.00,
    insuranceCovered: 336.00, patientCopayDue: 105.00,
    paymentStatus: 'Pending Insurance Adjudication', status: 'Open'
  },
  {
    invoiceId: 'INV-IMG-032', orderId: 'IMG-ORD-2026-0032',
    patientName: 'Robert Chen', patientUhid: 'PT-9022',
    date: '03 Sep 2026', testsTotal: 380.00, tax: 19.00,
    insuranceCovered: 304.00, patientCopayDue: 95.00,
    paymentStatus: 'Insurance Pre-Authorized (Emergency)', status: 'Open'
  },
  {
    invoiceId: 'INV-IMG-033', orderId: 'IMG-ORD-2026-0033',
    patientName: 'Eleanor Vance', patientUhid: 'PT-9021',
    date: '02 Sep 2026', testsTotal: 620.00, tax: 31.00,
    insuranceCovered: 496.00, patientCopayDue: 155.00,
    paymentStatus: 'Paid in Full', status: 'Paid'
  },
  {
    invoiceId: 'INV-IMG-034', orderId: 'IMG-ORD-2026-0034',
    patientName: 'James Thornton', patientUhid: 'PT-9024',
    date: '03 Sep 2026', testsTotal: 350.00, tax: 17.50,
    insuranceCovered: 280.00, patientCopayDue: 87.50,
    paymentStatus: 'Pending Scheduling Confirmation', status: 'Open'
  }
];

// ─── 6. RIS AUDIT TRAIL ───────────────────────────────────────────────────────
export const initialRisAuditTrail = [
  {
    auditId: 'RIS-AUD-001', timestamp: 'Today, 09:10 AM',
    user: 'Dr. Alan Graves, MD (Radiology)', role: 'Radiologist',
    action: 'FINAL_REPORT_SIGNED',
    orderId: 'IMG-ORD-2026-0032',
    details: 'Final radiology report signed and released for CT Head (Robert Chen). Critical Finding flagged: Acute SAH.'
  },
  {
    auditId: 'RIS-AUD-002', timestamp: 'Today, 09:10 AM',
    user: 'System RIS (Auto)', role: 'System',
    action: 'CRITICAL_FINDING_DISPATCHED',
    orderId: 'IMG-ORD-2026-0032',
    details: 'Critical finding notification auto-dispatched to Dr. Sarah Mitchell for patient Robert Chen (SAH). Escalation timer started.'
  },
  {
    auditId: 'RIS-AUD-003', timestamp: 'Today, 08:25 AM',
    user: 'RT Maya Patel, ARRT', role: 'Radiology Technician',
    action: 'EXAM_COMPLETE',
    orderId: 'IMG-ORD-2026-0032',
    details: 'CT Head acquisition complete for Robert Chen. Images transferred to PACS. Study UID: 1.2.840.10008.5.1.4.1.1.2.20260903.002'
  },
  {
    auditId: 'RIS-AUD-004', timestamp: 'Today, 09:45 AM',
    user: 'Dr. Sarah Mitchell, MD (Cardiology)', role: 'Prescribing Physician',
    action: 'ORDER_CREATED',
    orderId: 'IMG-ORD-2026-0031',
    details: 'Urgent CT Chest HRCT ordered for Sarah Connor. Clinical indication: Dyspnea, rule out PE.'
  },
  {
    auditId: 'RIS-AUD-005', timestamp: 'Yesterday, 03:20 PM',
    user: 'Dr. Sarah Mitchell, MD (Cardiology)', role: 'Prescribing Physician',
    action: 'ORDER_CREATED',
    orderId: 'IMG-ORD-2026-0033',
    details: 'Routine MRI Lumbar Spine ordered for Eleanor Vance. Indication: Chronic back pain with radiculopathy.'
  },
  {
    auditId: 'RIS-AUD-006', timestamp: 'Yesterday, 04:00 PM',
    user: 'RT Sam Nguyen, ARRT', role: 'Radiology Technician',
    action: 'EXAM_COMPLETE',
    orderId: 'IMG-ORD-2026-0033',
    details: 'MRI Lumbar Spine acquisition complete for Eleanor Vance. Transferred to PACS for radiologist reporting.'
  }
];

// ─── 7. TECHNICIANS & RADIOLOGISTS DIRECTORY ─────────────────────────────────
export const initialImagingStaff = {
  technicians: [
    { id: 'TECH-001', name: 'RT James Vance, ARRT', speciality: 'CT/MRI', shift: 'Day (07:00-15:00)', assigned: ['CT Suite A'] },
    { id: 'TECH-002', name: 'RT Maya Patel, ARRT', speciality: 'CT/Radiography', shift: 'Day (07:00-15:00)', assigned: ['CT Suite A', 'DR Suite 1'] },
    { id: 'TECH-003', name: 'RT Sam Nguyen, ARRT', speciality: 'MRI', shift: 'Day (07:00-15:00)', assigned: ['MRI Scan Room 2'] },
    { id: 'TECH-004', name: 'RT Lena Okafor, RDMS', speciality: 'Ultrasound', shift: 'Day (08:00-16:00)', assigned: ['US Bay 1', 'US Bay 2', 'Echo Lab'] },
  ],
  radiologists: [
    { id: 'RAD-001', name: 'Dr. Alan Graves, MD', specialty: 'Neuroradiology / Emergency Radiology', subspecialty: 'CT Head, Chest, Abdomen' },
    { id: 'RAD-002', name: 'Dr. Priya Shah, MD', specialty: 'Neuroradiology / Spine', subspecialty: 'MRI Brain, Spine, MSK' },
    { id: 'RAD-003', name: 'Dr. Kevin Murray, MD', specialty: 'Cardiac Imaging', subspecialty: 'Echocardiography, Cardiac CT' },
    { id: 'RAD-004', name: 'Dr. Anita Reddy, MD', specialty: 'Body Imaging / Ultrasound', subspecialty: 'Abdominal US, Thyroid, Pelvic' },
  ]
};
