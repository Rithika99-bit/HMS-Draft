/**
 * MediCare Hospital Management System - SuperAdmin IPD & Inpatient Care Data
 * Features:
 * - Admission & Doctor assignment
 * - Ward / Room / Bed allocation
 * - Bed transfer
 * - Nursing care & shift handover
 * - Vitals charting
 * - Doctor rounds
 * - Medication administration (MAR)
 * - Investigations
 * - Procedures & surgery (OT)
 * - Dietary orders
 * - Progress notes (SOAP)
 * - Discharge planning & Discharge summary
 * - Final billing & Insurance clearance
 * - Bed statuses: Available, Occupied, Reserved, Cleaning, Maintenance, Blocked
 */

export const bedStatusTypes = [
  { id: 'Available', label: 'Available', color: '#16a34a', bg: '#dcfce7', desc: 'Ready for immediate admission' },
  { id: 'Occupied', label: 'Occupied', color: '#0284c7', bg: '#e0f2fe', desc: 'Patient admitted & receiving care' },
  { id: 'Reserved', label: 'Reserved', color: '#7c3aed', bg: '#f3e8ff', desc: 'Reserved for scheduled OT / transfer' },
  { id: 'Cleaning', label: 'Cleaning', color: '#0891b2', bg: '#cffafe', desc: 'Sanitization & bed linen change in progress' },
  { id: 'Maintenance', label: 'Maintenance', color: '#d97706', bg: '#fef3c7', desc: 'Biomedical engineering / fixture repair' },
  { id: 'Blocked', label: 'Blocked', color: '#dc2626', bg: '#fee2e2', desc: 'Isolation hold or administrative block' }
];

export const hospitalWards = [
  {
    id: 'WARD-ICU',
    name: 'Intensive Care Unit (ICU / CCU)',
    floor: 'Floor 3, Critical Wing',
    nurseInCharge: 'Nurse Elena Chen, RN',
    totalBeds: 8,
    beds: [
      { id: 'ICU-01', type: 'Critical Ventilator Bed', status: 'Occupied', patientName: 'Arthur Pendelton', uhid: 'UHID-MED-2026-04910', ipdId: 'IPD-9401', doctor: 'Dr. Sarah Mitchell', admDate: '01 Sep 2026', o2Support: 'High Flow BiPAP (60%)' },
      { id: 'ICU-02', type: 'Critical Ventilator Bed', status: 'Occupied', patientName: 'Helen Troy', uhid: 'UHID-MED-2026-05112', ipdId: 'IPD-9402', doctor: 'Dr. Alex Rivera', admDate: '02 Sep 2026', o2Support: 'Mechanical Invasive Vent' },
      { id: 'ICU-03', type: 'Critical Isolation Bed', status: 'Reserved', patientName: 'Reserved for Post-CABG (OR 3)', uhid: 'UHID-HOLD-01', ipdId: 'IPD-RES-01', doctor: 'Dr. Sarah Mitchell', admDate: 'Today, 03:00 PM', o2Support: 'Pre-Set Line' },
      { id: 'ICU-04', type: 'Critical Telemetry Bed', status: 'Cleaning', patientName: 'Discharged (Terminal Clean)', uhid: '-', ipdId: '-', doctor: '-', admDate: '-', o2Support: '-' },
      { id: 'ICU-05', type: 'Critical Telemetry Bed', status: 'Available', patientName: '-', uhid: '-', ipdId: '-', doctor: '-', admDate: '-', o2Support: '-' },
      { id: 'ICU-06', type: 'Critical Telemetry Bed', status: 'Available', patientName: '-', uhid: '-', ipdId: '-', doctor: '-', admDate: '-', o2Support: '-' },
      { id: 'ICU-07', type: 'Critical Telemetry Bed', status: 'Maintenance', patientName: 'Telemetry Monitor Sensor Calibration', uhid: '-', ipdId: '-', doctor: '-', admDate: '-', o2Support: '-' },
      { id: 'ICU-08', type: 'Critical Isolation Bed', status: 'Blocked', patientName: 'Negative Pressure Airborne Isolation Block', uhid: '-', ipdId: '-', doctor: '-', admDate: '-', o2Support: '-' }
    ]
  },
  {
    id: 'WARD-SURG',
    name: 'Surgical Care Inpatient Wing B',
    floor: 'Floor 4, Surgical Tower',
    nurseInCharge: 'Nurse Marcus Holloway, RN',
    totalBeds: 8,
    beds: [
      { id: 'BED-201', type: 'Standard Inpatient Bed', status: 'Occupied', patientName: 'Eleanor Vance', uhid: 'UHID-MED-2026-07741', ipdId: 'IPD-9403', doctor: 'Dr. Robert Miller', admDate: '31 Aug 2026', o2Support: 'Room Air' },
      { id: 'BED-202', type: 'Standard Inpatient Bed', status: 'Occupied', patientName: 'Robert Chen', uhid: 'UHID-MED-2026-03112', ipdId: 'IPD-9404', doctor: 'Dr. Sarah Mitchell', admDate: '02 Sep 2026', o2Support: 'Nasal Cannula 2L' },
      { id: 'BED-203', type: 'Step-Down High Care', status: 'Occupied', patientName: 'Maria Santos', uhid: 'UHID-MED-2026-06611', ipdId: 'IPD-9405', doctor: 'Dr. Alex Rivera', admDate: '01 Sep 2026', o2Support: 'Room Air' },
      { id: 'BED-204', type: 'Standard Inpatient Bed', status: 'Available', patientName: '-', uhid: '-', ipdId: '-', doctor: '-', admDate: '-', o2Support: '-' },
      { id: 'BED-205', type: 'Standard Inpatient Bed', status: 'Available', patientName: '-', uhid: '-', ipdId: '-', doctor: '-', admDate: '-', o2Support: '-' },
      { id: 'BED-206', type: 'Standard Inpatient Bed', status: 'Cleaning', patientName: 'Linen Sanitization in Progress', uhid: '-', ipdId: '-', doctor: '-', admDate: '-', o2Support: '-' },
      { id: 'BED-207', type: 'Standard Inpatient Bed', status: 'Reserved', patientName: 'Reserved for Laparoscopy Post-Op', uhid: 'UHID-HOLD-02', ipdId: 'IPD-RES-02', doctor: 'Dr. Robert Miller', admDate: 'Today, 02:00 PM', o2Support: '-' },
      { id: 'BED-208', type: 'Standard Inpatient Bed', status: 'Maintenance', patientName: 'Bed Motor Height Adjustment Repair', uhid: '-', ipdId: '-', doctor: '-', admDate: '-', o2Support: '-' }
    ]
  },
  {
    id: 'WARD-MED',
    name: 'General Medical Ward A',
    floor: 'Floor 2, Central Block',
    nurseInCharge: 'Nurse Jessica Taylor, BSN',
    totalBeds: 6,
    beds: [
      { id: 'MED-101', type: 'Multi-Bed General Care', status: 'Occupied', patientName: 'James Thornton', uhid: 'UHID-MED-2026-01994', ipdId: 'IPD-9406', doctor: 'Dr. Priya Patel', admDate: '29 Aug 2026', o2Support: 'Room Air' },
      { id: 'MED-102', type: 'Multi-Bed General Care', status: 'Occupied', patientName: 'Clara Oswald', uhid: 'UHID-MED-2026-08119', ipdId: 'IPD-9407', doctor: 'Dr. Sarah Mitchell', admDate: '02 Sep 2026', o2Support: 'Room Air' },
      { id: 'MED-103', type: 'Multi-Bed General Care', status: 'Available', patientName: '-', uhid: '-', ipdId: '-', doctor: '-', admDate: '-', o2Support: '-' },
      { id: 'MED-104', type: 'Multi-Bed General Care', status: 'Available', patientName: '-', uhid: '-', ipdId: '-', doctor: '-', admDate: '-', o2Support: '-' },
      { id: 'MED-105', type: 'Multi-Bed General Care', status: 'Cleaning', patientName: 'Discharged Bed Cleared', uhid: '-', ipdId: '-', doctor: '-', admDate: '-', o2Support: '-' },
      { id: 'MED-106', type: 'Multi-Bed General Care', status: 'Blocked', patientName: 'Reserved for Surge Capacity', uhid: '-', ipdId: '-', doctor: '-', admDate: '-', o2Support: '-' }
    ]
  },
  {
    id: 'WARD-DLX',
    name: 'Executive Deluxe Private Suites',
    floor: 'Floor 5, Skyview Pavilion',
    nurseInCharge: 'Nurse Amanda Scott, RN',
    totalBeds: 4,
    beds: [
      { id: 'SUITE-501', type: 'Single Deluxe Suite', status: 'Occupied', patientName: 'Sarah Connor', uhid: 'UHID-MED-2026-08942', ipdId: 'IPD-9408', doctor: 'Dr. Sarah Mitchell', admDate: '02 Sep 2026', o2Support: 'Room Air' },
      { id: 'SUITE-502', type: 'Single Deluxe Suite', status: 'Available', patientName: '-', uhid: '-', ipdId: '-', doctor: '-', admDate: '-', o2Support: '-' },
      { id: 'SUITE-503', type: 'Single Deluxe Suite', status: 'Reserved', patientName: 'Executive VIP Admission', uhid: 'UHID-VIP-01', ipdId: 'IPD-RES-03', doctor: 'Dr. Robert Miller', admDate: 'Tomorrow 09:00 AM', o2Support: '-' },
      { id: 'SUITE-504', type: 'Single Deluxe Suite', status: 'Cleaning', patientName: 'Deep Sanitization', uhid: '-', ipdId: '-', doctor: '-', admDate: '-', o2Support: '-' }
    ]
  }
];

export const activeInpatients = [
  {
    ipdId: 'IPD-9408',
    uhid: 'UHID-MED-2026-08942',
    patientName: 'Sarah Connor',
    age: 38,
    gender: 'Female',
    bloodGroup: 'O+',
    allergies: 'Penicillin (Severe), Ibuprofen',
    ward: 'Executive Deluxe Private Suites',
    wardId: 'WARD-DLX',
    bedNumber: 'SUITE-501',
    admissionDate: '02 Sep 2026, 10:30 AM',
    admissionType: 'Elective Observation / Workup',
    admittingDiagnosis: 'Subacute Coronary Evaluation & Refractory Hypertension',
    primaryConsultant: 'Dr. Sarah Mitchell, MD (Cardiology)',
    coConsultants: ['Dr. Alex Rivera, MD (Pulmonology)', 'Dr. Nathan Reed (Pathology)'],
    dutyResident: 'Dr. Kevin Zhao, MD',
    assignedNurse: 'Nurse Amanda Scott, RN (Shift: Morning 7A-7P)',
    lengthOfStay: '2 Days (Target Discharge: 04 Sep)',
    acuityLevel: 'Moderate Care (Telemetry)',
    
    // Clinical Parameters
    vitals: [
      { time: '08:00 AM', bp: '124/82 mmHg', hr: '72 bpm', temp: '98.4 °F', spo2: '99%', rr: '16 /min', pain: '1/10', loggedBy: 'Nurse Amanda' },
      { time: '04:00 AM', bp: '128/86 mmHg', hr: '76 bpm', temp: '98.6 °F', spo2: '98%', rr: '18 /min', pain: '2/10', loggedBy: 'Nurse Jessica' },
      { time: '12:00 AM', bp: '130/88 mmHg', hr: '78 bpm', temp: '98.4 °F', spo2: '98%', rr: '16 /min', pain: '2/10', loggedBy: 'Nurse Jessica' }
    ],

    doctorRounds: [
      {
        id: 'RND-01',
        time: 'Today, 09:15 AM',
        doctor: 'Dr. Sarah Mitchell, MD',
        notes: 'Patient resting comfortably. Chest auscultation clear. Heart sounds regular S1/S2, no murmurs. BP well controlled on Lisinopril 10mg. 12-Lead ECG confirmed normal sinus rhythm without ischemic evolution.',
        recommendation: 'Continue telemetry monitoring. Repeat fasting lipid battery in morning. Discharge readiness planned for tomorrow if ambulation stable.'
      },
      {
        id: 'RND-02',
        time: 'Yesterday, 06:00 PM',
        doctor: 'Dr. Kevin Zhao (Resident)',
        notes: 'Evening ward rounds completed. Vitals stable. No chest tightness, shortness of breath, or palpitations reported. Tolerating regular cardiac diet.',
        recommendation: 'Maintain IV saline lock. Night sedation not required.'
      }
    ],

    nursingCare: {
      plan: 'Cardiac telemetry monitoring q4h, fall precaution protocol active, daily weights, intake/output charting.',
      shiftHandover: 'Patient alert and oriented x4. Independent with ADLs. IV site right forearm clean and patent without erythema. Skin intact, Braden Score 21 (Low Risk).',
      fallRiskScore: 'Morse Fall Score: 15 (Low Risk)',
      ivAccess: '20G Cannula Right Forearm (Inserted 02 Sep)'
    },

    medicationsMAR: [
      { drug: 'Lisinopril 10mg PO', schedule: '08:00 AM Daily', status: 'Given (08:05 AM)', nurse: 'Nurse Amanda', route: 'Oral' },
      { drug: 'Atorvastatin 20mg PO', schedule: '10:00 PM Bedtime', status: 'Scheduled Tonight', nurse: 'Pending Night Shift', route: 'Oral' },
      { drug: 'Aspirin 81mg PO (E.C.)', schedule: '08:00 AM Daily', status: 'Given (08:05 AM)', nurse: 'Nurse Amanda', route: 'Oral' },
      { drug: 'Normal Saline Flush 5mL', schedule: 'q12h IV Lock', status: 'Flushed (08:10 AM)', nurse: 'Nurse Amanda', route: 'Intravenous' }
    ],

    investigations: [
      { testName: 'Fasting Lipid Panel & Cardiac Biomarkers', orderDate: '02 Sep 2026', status: 'Completed & Verified', result: 'Troponin I: < 0.01 ng/mL (Negative), Total Cholesterol: 186 mg/dL' },
      { testName: '12-Lead Digital Electrocardiogram', orderDate: '02 Sep 2026', status: 'Completed', result: 'Normal Sinus Rhythm, HR 72, Normal Axis' },
      { testName: 'Transthoracic 2D Echocardiogram', orderDate: '03 Sep 2026', status: 'Scheduled (11:30 AM)', result: 'Awaiting Echo Suite Transport' }
    ],

    proceduresAndSurgery: {
      scheduled: 'None (Medical Inpatient)',
      pastInEncounter: '12-Lead Diagnostic ECG, Continuous 24h Holter Patch application',
      preOpClearance: 'Not Applicable'
    },

    dietaryOrders: {
      dietType: 'Cardiovascular Healthy Diet (Low Sodium < 2000mg, Low Saturated Fat)',
      instructions: 'Avoid grapefruits due to Statin interaction. Fluid intake unrestricted. Warm meals preferred.',
      dietitianNotes: 'Reviewed by Chief Dietitian Clara Wood, RD. Patient counseling on Mediterranean dietary guidelines conducted.'
    },

    progressNotesSOAP: {
      subjective: 'Patient states "I feel much better today, no chest discomfort or dizzy spells overnight".',
      objective: 'BP: 124/82, HR: 72, SpO2: 99% Room Air. Clear breath sounds bilaterally. S1 S2 normal. Extremities warm with trace or zero edema.',
      assessment: '38F with Essential Hypertension & atypical chest palpitations, currently stable with no acute coronary syndrome markers. Lisinopril titration therapeutic.',
      plan: '1. Continue Lisinopril 10mg daily. 2. Await morning Echocardiogram report. 3. Initiate discharge counseling & final billing reconciliation.'
    },

    dischargePlanning: {
      checklist: [
        { task: 'Clinical Hemodynamic Stability verified (> 24h)', completed: true },
        { task: 'Inpatient Investigations finalized & reviewed', completed: true },
        { task: 'Take-Home Medication Reconciliation completed', completed: true },
        { task: 'Discharge Summary written & signed by Consultant', completed: false },
        { task: 'Insurance Pre-Auth Clearance & Final Co-Pay Settle', completed: false },
        { task: 'Patient / Family Education & Warning Signs explained', completed: true }
      ],
      estimatedDischarge: 'Tomorrow, 04 Sep 2026 at 11:00 AM',
      dischargeDisposition: 'Home (Self-Care)'
    },

    dischargeSummary: {
      finalDiagnosis: '1. Essential Hypertension (Optimized) 2. Non-Cardiac Chest Pain (R/O ACS Negative)',
      hospitalCourse: 'Patient admitted on 02 Sep for cardiovascular telemetry observation. Serial cardiac troponins remained negative. ECG demonstrated stable normal sinus rhythm. Blood pressure normalized with Lisinopril 10mg daily.',
      dischargeMeds: 'Lisinopril 10mg daily morning; Atorvastatin 20mg bedtime; Aspirin 81mg daily.',
      followUpInstructions: 'Review in Cardiology OPD with Dr. Sarah Mitchell in 14 days (18 Sep). Report to Emergency immediately if chest tightness recurs.'
    },

    finalBilling: {
      roomCharges: 900.00, // 2 days @ $450/day
      consultantRoundsFees: 350.00,
      nursingAndCareTariffs: 240.00,
      investigationsAndDiagnostics: 460.00,
      pharmacyAndConsumables: 180.00,
      grossTotal: 2130.00,
      insuranceClaimed: 1950.00,
      patientCoPay: 180.00,
      insuranceStatus: 'Pre-Approved by BlueCross (Claim Ref: BCBS-IPD-9408)',
      billingStatus: 'Interim Draft (Pending Final Clearance)'
    }
  },
  {
    ipdId: 'IPD-9403',
    uhid: 'UHID-MED-2026-07741',
    patientName: 'Eleanor Vance',
    age: 62,
    gender: 'Female',
    bloodGroup: 'A+',
    allergies: 'Sulfa Drugs',
    ward: 'Surgical Care Inpatient Wing B',
    wardId: 'WARD-SURG',
    bedNumber: 'BED-201',
    admissionDate: '31 Aug 2026, 08:00 AM',
    admissionType: 'Elective Surgical Admission',
    admittingDiagnosis: 'Cholelithiasis with Chronic Cholecystitis',
    primaryConsultant: 'Dr. Robert Miller, FACS (Surgery)',
    coConsultants: ['Dr. Sarah Mitchell, MD (Cardiac Clearance)'],
    dutyResident: 'Dr. Rachel Adams, MD',
    assignedNurse: 'Nurse Marcus Holloway, RN',
    lengthOfStay: '4 Days',
    acuityLevel: 'Post-Operative Recovery',
    vitals: [
      { time: '08:00 AM', bp: '120/78 mmHg', hr: '68 bpm', temp: '98.2 °F', spo2: '99%', rr: '16 /min', pain: '2/10', loggedBy: 'Nurse Marcus' }
    ],
    doctorRounds: [
      { id: 'RND-03', time: 'Today, 08:30 AM', doctor: 'Dr. Robert Miller, FACS', notes: 'Post-Op Day 3. Wounds dry and clean, no erythema or discharge. Tolerating soft oral diet. Flatus passed, bowel sounds active.', recommendation: 'Discharge today with oral analgesics.' }
    ],
    nursingCare: {
      plan: 'Post-op surgical dressing check, wound drain monitoring (Drain removed Day 2), ambulation assistance.',
      shiftHandover: 'Patient fully mobile. Surgical site clean. IV discontinued.',
      fallRiskScore: 'Low',
      ivAccess: 'Discontinued'
    },
    medicationsMAR: [
      { drug: 'Acetaminophen 500mg PO', schedule: 'q6h PRN Pain', status: 'Given', nurse: 'Nurse Marcus', route: 'Oral' }
    ],
    investigations: [
      { testName: 'Post-Op CBC & Electrolytes', orderDate: '01 Sep 2026', status: 'Completed', result: 'WBC 7.8 (Normal), Hb 12.4' }
    ],
    proceduresAndSurgery: {
      scheduled: 'Completed: Laparoscopic Cholecystectomy (01 Sep)',
      pastInEncounter: 'General Endotracheal Anesthesia, 4-port laparoscopy',
      preOpClearance: 'Cleared'
    },
    dietaryOrders: {
      dietType: 'Regular Low Fat Diet',
      instructions: 'Small frequent meals.',
      dietitianNotes: 'Post-cholecystectomy diet advice provided.'
    },
    progressNotesSOAP: {
      subjective: 'Pain well controlled, feeling ready to go home.',
      objective: 'Afebrile, vital signs stable, soft abdomen non-tender.',
      assessment: 'Post-Op Laparoscopic Cholecystectomy Day 3 - Uneventful recovery.',
      plan: 'Discharge home today. Suture removal in 7 days.'
    },
    dischargePlanning: {
      checklist: [
        { task: 'Clinical Hemodynamic Stability verified (> 24h)', completed: true },
        { task: 'Inpatient Investigations finalized & reviewed', completed: true },
        { task: 'Take-Home Medication Reconciliation completed', completed: true },
        { task: 'Discharge Summary written & signed by Consultant', completed: true },
        { task: 'Insurance Pre-Auth Clearance & Final Co-Pay Settle', completed: true },
        { task: 'Patient / Family Education & Warning Signs explained', completed: true }
      ],
      estimatedDischarge: 'Today, 02:00 PM',
      dischargeDisposition: 'Home'
    },
    dischargeSummary: {
      finalDiagnosis: 'Calculus of Gallbladder with Chronic Cholecystitis (ICD-10 K80.10)',
      hospitalCourse: 'Underwent elective Laparoscopic Cholecystectomy on 01 Sep. Recovery uneventful. Discharged in stable condition.',
      dischargeMeds: 'Acetaminophen 500mg TID PRN for 3 days; Pantoprazole 40mg daily x 7 days.',
      followUpInstructions: 'Surgical OPD follow-up on 10 Sep for port-site inspection.'
    },
    finalBilling: {
      roomCharges: 1200.00,
      consultantRoundsFees: 600.00,
      nursingAndCareTariffs: 320.00,
      investigationsAndDiagnostics: 580.00,
      pharmacyAndConsumables: 450.00,
      grossTotal: 3150.00,
      insuranceClaimed: 2850.00,
      patientCoPay: 300.00,
      insuranceStatus: 'Fully Approved & Settled',
      billingStatus: 'Settled & Closed'
    }
  }
];
