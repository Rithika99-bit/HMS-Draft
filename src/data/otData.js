/**
 * MediCare Hospital Operation Theatre (OT) & Surgical Management System Data
 */

// ─── 1. OT SUITES & ROOMS MASTER ──────────────────────────────────────────────
export const initialOtSuites = [
  {
    otId: 'OT-SUITE-A', name: 'Major OT Suite A (Cardiothoracic & Vascular)',
    category: 'Cardiothoracic / Major Surgical', location: '3rd Floor Surgical Block',
    equipment: ['Heart-Lung Bypass Machine', '3D TTE Echocardiogram', 'Electrocautery Unit', 'Surgical Microscope'],
    status: 'Operational', operatingHours: '24/7 Emergency & Scheduled',
    hourlyRate: 350.00
  },
  {
    otId: 'OT-SUITE-B', name: 'Major OT Suite B (Orthopedic & Joint Replacement)',
    category: 'Orthopedic & Traumatology', location: '3rd Floor Surgical Block',
    equipment: ['Laminar Airflow Hood', 'C-Arm Fluoroscopy Machine', 'Arthroscope Tower', 'Orthopedic Traction Table'],
    status: 'Operational', operatingHours: '07:00 - 20:00 Daily',
    hourlyRate: 300.00
  },
  {
    otId: 'OT-SUITE-C', name: 'Advanced Robotic Surgery Suite (da Vinci Xi)',
    category: 'Robotic & Minimally Invasive', location: '4th Floor Special Suites',
    equipment: ['da Vinci Xi Dual Console Robot', 'HD Laparoscopic Tower', 'CO2 Insufflator', 'Vessel Sealer'],
    status: 'Operational', operatingHours: '08:00 - 18:00 Scheduled',
    hourlyRate: 650.00
  },
  {
    otId: 'OT-SUITE-D', name: 'Neurosurgery & Spine OT Suite',
    category: 'Neurosurgery & Micro-Spine', location: '3rd Floor Surgical Block',
    equipment: ['Neuronavigation System', 'Zeiss Surgical Microscope', 'Ultrasonic Aspirator (CUSA)', 'C-Arm'],
    status: 'Operational', operatingHours: '24/7 Emergency & Scheduled',
    hourlyRate: 400.00
  },
  {
    otId: 'OT-SUITE-E', name: 'Day Care & Endoscopy Surgical Unit',
    category: 'Minor / Outpatient Surgery', location: '2nd Floor Day Care Center',
    equipment: ['Endoscopy Suite', 'Light Source & Camera', 'Suction Pump', 'Pulse Oximeter Monitored'],
    status: 'Operational', operatingHours: '07:00 - 17:00 Weekdays',
    hourlyRate: 180.00
  }
];

// ─── 2. SURGICAL PROCEDURE MASTER ─────────────────────────────────────────────
export const initialProcedureMaster = [
  {
    procCode: 'SURG-CABG-01', cptCode: '33533', name: 'Coronary Artery Bypass Grafting (CABG) x4',
    category: 'Cardiothoracic', estDurationMins: 240, baseCost: 12500.00,
    requiredOtType: 'Cardiothoracic / Major Surgical', defaultAnaesthesia: 'General Anaesthesia with ETT'
  },
  {
    procCode: 'SURG-TKA-02', cptCode: '27447', name: 'Total Knee Arthroplasty (TKA) — Right Knee',
    category: 'Orthopedic', estDurationMins: 150, baseCost: 8800.00,
    requiredOtType: 'Orthopedic & Traumatology', defaultAnaesthesia: 'Combined Spinal-Epidural (CSE)'
  },
  {
    procCode: 'SURG-LAP-CHOLE-03', cptCode: '47562', name: 'Laparoscopic Cholecystectomy',
    category: 'General Surgery', estDurationMins: 75, baseCost: 3400.00,
    requiredOtType: 'Robotic & Minimally Invasive', defaultAnaesthesia: 'General Anaesthesia with ETT'
  },
  {
    procCode: 'SURG-CRANIO-04', cptCode: '61510', name: 'Craniotomy for Tumor Resection / Hematoma Evacuation',
    category: 'Neurosurgery', estDurationMins: 300, baseCost: 14200.00,
    requiredOtType: 'Neurosurgery & Micro-Spine', defaultAnaesthesia: 'General Anaesthesia with Invasive Arterial Line'
  },
  {
    procCode: 'SURG-CATARACT-05', cptCode: '66984', name: 'Cataract Surgery with Intraocular Lens (IOL) Implant',
    category: 'Ophthalmology', estDurationMins: 45, baseCost: 1800.00,
    requiredOtType: 'Minor / Outpatient Surgery', defaultAnaesthesia: 'Topical / Monitored Anaesthesia Care (MAC)'
  }
];

// ─── 3. ANAESTHESIA TYPES & ASA CLASSIFICATION ───────────────────────────────
export const initialAnaesthesiaTypes = [
  { code: 'GA-ETT', name: 'General Anaesthesia — Endotracheal Intubation (GA-ETT)', category: 'General' },
  { code: 'GA-LMA', name: 'General Anaesthesia — Laryngeal Mask Airway (GA-LMA)', category: 'General' },
  { code: 'SAB', name: 'Subarachnoid Block (Spinal Anaesthesia)', category: 'Neuraxial Regional' },
  { code: 'EPI', name: 'Epidural Anaesthesia / Analgesia', category: 'Neuraxial Regional' },
  { code: 'PNB', name: 'Peripheral Nerve Block (Ultrasound-Guided)', category: 'Peripheral Regional' },
  { code: 'MAC', name: 'Monitored Anaesthesia Care & Deep Sedation (MAC)', category: 'Sedation' }
];

export const asaClassifications = [
  { classId: 'ASA-1', title: 'ASA I — Normal Healthy Patient', desc: 'No organic, physiological, or psychiatric disturbance.' },
  { classId: 'ASA-2', title: 'ASA II — Patient with Mild Systemic Disease', desc: 'Mild diseases without substantive functional limitations (e.g. controlled HTN, DM).' },
  { classId: 'ASA-3', title: 'ASA III — Patient with Severe Systemic Disease', desc: 'Substantive functional limitations (e.g. poorly controlled DM/HTN, COPD, morbid obesity).' },
  { classId: 'ASA-4', title: 'ASA IV — Patient with Severe Systemic Disease Threat to Life', desc: 'Recent MI, stroke, severe valve dysfunction, sepsis.' },
  { classId: 'ASA-5', title: 'ASA V — Moribund Patient Not Expected to Survive Without Operation', desc: 'Ruptured abdominal aortic aneurysm, massive trauma.' },
  { classId: 'ASA-6', title: 'ASA VI — Declared Brain-Dead Patient for Organ Harvest', desc: 'Organ donor procedure.' }
];

// ─── 4. IMPLANT & CONSUMABLE MASTER CATALOG ──────────────────────────────────
export const initialOtImplants = [
  {
    implantId: 'IMP-ORTHO-001', name: 'Stryker Triathlon Total Knee System (Femoral & Tibial Component)',
    category: 'Orthopedic Joint Replacement', manufacturer: 'Stryker Orthopedics',
    unitCost: 3200.00, serialLotRequired: true, status: 'In Stock'
  },
  {
    implantId: 'IMP-CARD-002', name: 'Medtronic Onyx Drug-Eluting Coronary Stent 3.5 x 18mm',
    category: 'Cardiovascular Stent', manufacturer: 'Medtronic Vascular',
    unitCost: 1450.00, serialLotRequired: true, status: 'In Stock'
  },
  {
    implantId: 'IMP-OPHTH-003', name: 'Alcon AcrySof IQ Foldable Intraocular Lens (+21.5D)',
    category: 'Ophthalmic IOL', manufacturer: 'Alcon Surgical',
    unitCost: 450.00, serialLotRequired: true, status: 'In Stock'
  },
  {
    implantId: 'IMP-NEURO-004', name: 'DePuy Synthes Titanium Cranial Plate & Screw Kit',
    category: 'Neurosurgical Fixation', manufacturer: 'DePuy Synthes',
    unitCost: 2100.00, serialLotRequired: true, status: 'In Stock'
  }
];

export const initialOtConsumables = [
  { id: 'CON-001', name: 'Vicryl 3-0 Absorbable Suture (Ethicon)', unitCost: 18.00, inStock: 140 },
  { id: 'CON-002', name: 'Prolene 4-0 Non-Absorbable Vascular Suture', unitCost: 24.00, inStock: 95 },
  { id: 'CON-003', name: 'Sterile Surgical Drapes & Gown Pack (Full OT Barrier)', unitCost: 45.00, inStock: 60 },
  { id: 'CON-004', name: 'Monopolar Electrocautery Pencil with Grounding Pad', unitCost: 32.00, inStock: 80 },
  { id: 'CON-005', name: 'Abdominal Laparotomy Sponge Pack (5 Sterilized Sponges)', unitCost: 15.00, inStock: 200 }
];

// ─── 5. ACTIVE SURGICAL CASES & WORKFLOW RECORDS ──────────────────────────────
export const initialSurgicalCases = [
  {
    caseId: 'SURG-2026-0081',
    patientUhid: 'UHID-MED-2026-08942', patientName: 'Sarah Connor',
    patientAge: 38, patientGender: 'Female',
    procCode: 'SURG-CABG-01', procedureName: 'Coronary Artery Bypass Grafting (CABG) x4',
    category: 'Cardiothoracic', priority: 'Urgent',
    preopDiagnosis: 'Severe Triple Vessel Coronary Artery Disease with Left Main Stenosis',
    requestingDoctor: 'Dr. Sarah Mitchell, MD',
    scheduledOtRoom: 'OT Suite A (Cardiothoracic & Vascular)',
    scheduledDate: 'Today, 01:30 PM', estDurationMins: 240,
    status: 'In OT (Intra-Operative)',
    preopClearance: {
      cardiologyCleared: true, anaesthesiaCleared: true, consentSigned: true,
      bloodReserved: '4 Units PRBC Crossmatched', npoHours: 8
    },
    surgicalTeam: {
      primarySurgeon: 'Dr. Sarah Mitchell, MD (Cardiovascular Surgery)',
      assistantSurgeon: 'Dr. James Vance, MD',
      anaesthetist: 'Dr. Robert Chen, MD (Consultant Anaesthesiologist)',
      scrubNurse: 'Sister Sarah Connor, RN (Scrub Specialist)',
      circulatingNurse: 'Nurse Maya Patel, RN',
      otTechnician: 'Tech Alex Rivera'
    },
    anaesthesiaRecord: {
      asaClass: 'ASA-3',
      type: 'General Anaesthesia — Endotracheal Intubation (GA-ETT)',
      airwayGrade: 'Mallampati Class I',
      drugsAdministered: [
        { drug: 'Propofol 1% IV', dose: '150 mg', time: '13:35' },
        { drug: 'Fentanyl IV', dose: '150 mcg', time: '13:36' },
        { drug: 'Rocuronium IV', dose: '50 mg', time: '13:38' },
        { drug: 'Sevoflurane Inhalation', dose: '1.8-2.2%', time: 'Continuous' }
      ],
      vitalsLog: 'BP 118/76 • HR 68 • SpO2 100% • EtCO2 36 mmHg',
      pacuHandoverNotes: 'Hemodynamically stable. Intubated on propofol infusion transferred to CVICU.'
    },
    whoSafetyChecklist: {
      signInCompleted: true, // Before Anaesthesia
      timeOutCompleted: true, // Before Skin Incision
      signOutCompleted: false // Before Leaving OT
    },
    instrumentCount: {
      preIncisionSponges: 20, postClosureSponges: 20,
      preIncisionNeedles: 14, postClosureNeedles: 14,
      preIncisionInstruments: 48, postClosureInstruments: 48,
      verifiedByNurse: 'Sister Sarah Connor, RN'
    },
    operativeNotes: {
      postopDiagnosis: 'Quadruple Coronary Artery Bypass Grafting (LIMA -> LAD, SVG -> Diag, SVG -> OM, SVG -> PDA)',
      procedurePerformed: 'Off-pump Coronary Artery Bypass Grafting (OPCAB) x4 grafts',
      findings: 'Diffuse calcification in LAD and OM1. LIMA flow robust (> 60 mL/min). Good target vessel caliber.',
      technique: 'Median sternotomy. LIMA harvested with pedicle. Saphenous vein grafts harvested from left lower extremity.',
      estimatedBloodLossMl: 350,
      specimensCollected: 'Vein Segment for Quality Assurance',
      complications: 'None. Smooth intra-operative course.',
      signedBySurgeon: 'Dr. Sarah Mitchell, MD',
      signedAt: 'Today, 04:15 PM'
    },
    implantsUsed: [
      {
        implantId: 'IMP-CARD-002', name: 'Medtronic Onyx Drug-Eluting Coronary Stent 3.5 x 18mm',
        serialLotNumber: 'LOT-2026-9923-MED', quantity: 1, cost: 1450.00
      }
    ],
    invoiceId: 'INV-OT-081', totalPrice: 14250.00
  },
  {
    caseId: 'SURG-2026-0082',
    patientUhid: 'PT-9021', patientName: 'Eleanor Vance',
    patientAge: 62, patientGender: 'Female',
    procCode: 'SURG-TKA-02', procedureName: 'Total Knee Arthroplasty (TKA) — Right Knee',
    category: 'Orthopedic', priority: 'Routine',
    preopDiagnosis: 'Severe End-Stage Osteoarthritis Right Knee (Kellgren-Lawrence Grade IV)',
    requestingDoctor: 'Dr. Marcus Vance, MD',
    scheduledOtRoom: 'OT Suite B (Orthopedic & Joint Replacement)',
    scheduledDate: 'Today, 09:00 AM', estDurationMins: 150,
    status: 'Completed (In PACU Recovery)',
    preopClearance: {
      cardiologyCleared: true, anaesthesiaCleared: true, consentSigned: true,
      bloodReserved: '2 Units Crossmatched', npoHours: 10
    },
    surgicalTeam: {
      primarySurgeon: 'Dr. Marcus Vance, MD (Orthopedic Surgery)',
      assistantSurgeon: 'Dr. Alan Graves, MD',
      anaesthetist: 'Dr. Robert Chen, MD (Consultant Anaesthesiologist)',
      scrubNurse: 'Sister Sarah Connor, RN',
      circulatingNurse: 'Nurse Maya Patel, RN',
      otTechnician: 'Tech Alex Rivera'
    },
    anaesthesiaRecord: {
      asaClass: 'ASA-2',
      type: 'Combined Spinal-Epidural (CSE)',
      airwayGrade: 'Mallampati Class I',
      drugsAdministered: [
        { drug: 'Bupivacaine 0.5% Heavy Spinal', dose: '2.5 mL', time: '09:10' },
        { drug: 'Fentanyl Intrathecal', dose: '25 mcg', time: '09:10' }
      ],
      vitalsLog: 'BP 122/78 • HR 64 • SpO2 99%',
      pacuHandoverNotes: 'Spinal sensory block regression to T10. Comfortable with epidural PCEA.'
    },
    whoSafetyChecklist: {
      signInCompleted: true,
      timeOutCompleted: true,
      signOutCompleted: true
    },
    instrumentCount: {
      preIncisionSponges: 15, postClosureSponges: 15,
      preIncisionNeedles: 10, postClosureNeedles: 10,
      preIncisionInstruments: 64, postClosureInstruments: 64,
      verifiedByNurse: 'Sister Sarah Connor, RN'
    },
    operativeNotes: {
      postopDiagnosis: 'Status Post Total Knee Arthroplasty Right Knee',
      procedurePerformed: 'Right Total Knee Arthroplasty with Stryker Triathlon Prosthesis',
      findings: 'Complete destruction of articular cartilage in medial and patellofemoral compartments with osteophytes.',
      technique: 'Medial parapatellar approach. Distal femoral and proximal tibial cuts performed. Prosthesis cemented.',
      estimatedBloodLossMl: 200,
      specimensCollected: 'Femoral & Tibial Bone Cuts for Histology',
      complications: 'None.',
      signedBySurgeon: 'Dr. Marcus Vance, MD',
      signedAt: 'Today, 11:45 AM'
    },
    implantsUsed: [
      {
        implantId: 'IMP-ORTHO-001', name: 'Stryker Triathlon Total Knee System',
        serialLotNumber: 'LOT-STR-88341-TK', quantity: 1, cost: 3200.00
      }
    ],
    invoiceId: 'INV-OT-082', totalPrice: 12300.00
  },
  {
    caseId: 'SURG-2026-0083',
    patientUhid: 'PT-9022', patientName: 'Robert Chen',
    patientAge: 45, patientGender: 'Male',
    procCode: 'SURG-LAP-CHOLE-03', procedureName: 'Laparoscopic Cholecystectomy',
    category: 'General Surgery', priority: 'Urgent',
    preopDiagnosis: 'Acute Calculous Cholecystitis with Symptomatic Cholelithiasis',
    requestingDoctor: 'Dr. Sarah Mitchell, MD',
    scheduledOtRoom: 'OT Suite C (Robotic & Minimally Invasive)',
    scheduledDate: 'Tomorrow, 08:30 AM', estDurationMins: 75,
    status: 'Scheduled (Pre-Op Clearance)',
    preopClearance: {
      cardiologyCleared: true, anaesthesiaCleared: true, consentSigned: true,
      bloodReserved: 'Type & Screen Valid', npoHours: 8
    },
    surgicalTeam: {
      primarySurgeon: 'Dr. Sarah Mitchell, MD',
      assistantSurgeon: 'Dr. James Vance, MD',
      anaesthetist: 'Dr. Robert Chen, MD',
      scrubNurse: 'Sister Sarah Connor, RN',
      circulatingNurse: 'Nurse Maya Patel, RN',
      otTechnician: 'Tech Alex Rivera'
    },
    anaesthesiaRecord: null,
    whoSafetyChecklist: { signInCompleted: false, timeOutCompleted: false, signOutCompleted: false },
    instrumentCount: null,
    operativeNotes: null,
    implantsUsed: [],
    invoiceId: 'INV-OT-083', totalPrice: 3400.00
  }
];

// ─── 6. OT INVOICES ────────────────────────────────────────────────────────────
export const initialOtInvoices = [
  {
    invoiceId: 'INV-OT-081', caseId: 'SURG-2026-0081',
    patientName: 'Sarah Connor', patientUhid: 'UHID-MED-2026-08942',
    date: '04 Sep 2026', procedureCost: 12500.00, otRoomFee: 1400.00,
    anaesthesiaFee: 1200.00, surgeonFee: 4500.00, implantCost: 1450.00,
    totalPrice: 21050.00, insuranceCovered: 16840.00, patientCopayDue: 4210.00,
    paymentStatus: 'Pending Insurance Adjudication', status: 'Open'
  },
  {
    invoiceId: 'INV-OT-082', caseId: 'SURG-2026-0082',
    patientName: 'Eleanor Vance', patientUhid: 'PT-9021',
    date: '04 Sep 2026', procedureCost: 8800.00, otRoomFee: 900.00,
    anaesthesiaFee: 950.00, surgeonFee: 3200.00, implantCost: 3200.00,
    totalPrice: 17050.00, insuranceCovered: 13640.00, patientCopayDue: 3410.00,
    paymentStatus: 'Paid in Full', status: 'Paid'
  }
];

// ─── 7. OT AUDIT TRAIL LOG ────────────────────────────────────────────────────
export const initialOtAuditTrail = [
  {
    auditId: 'OT-AUD-001', timestamp: 'Today, 01:30 PM',
    user: 'Sister Sarah Connor, RN', role: 'Scrub Nurse',
    action: 'WHO_TIMEOUT_COMPLETED', caseId: 'SURG-2026-0081',
    details: 'WHO Surgical Safety Timeout completed for CABG (Sarah Connor). Patient, site, and procedure verified. Pre-incision count confirmed.'
  },
  {
    auditId: 'OT-AUD-002', timestamp: 'Today, 01:35 PM',
    user: 'Dr. Robert Chen, MD', role: 'Anaesthetist',
    action: 'ANAESTHESIA_STARTED', caseId: 'SURG-2026-0081',
    details: 'GA-ETT initiated. ASA Class III documented. Endotracheal tube placed without airway difficulty.'
  },
  {
    auditId: 'OT-AUD-003', timestamp: 'Today, 04:15 PM',
    user: 'Dr. Sarah Mitchell, MD', role: 'Primary Surgeon',
    action: 'OPERATIVE_NOTE_SIGNED', caseId: 'SURG-2026-0081',
    details: 'Operative note signed for Quadruple CABG (Off-pump). Medtronic Onyx stent lot LOT-2026-9923-MED recorded.'
  }
];
