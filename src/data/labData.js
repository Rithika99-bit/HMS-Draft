/**
 * MediCare Hospital Clinical Laboratory Information System (LIS) Data
 * Comprehensive data for:
 * - Test Master & LOINC codes
 * - Sample Types (Specimen directory, tube color codes, rejection criteria)
 * - Lab Orders & Priority Queue (STAT, Urgent, Routine)
 * - Phlebotomy Worklist & Barcode Accessioning
 * - Automated Clinical Analyzers (Roche Cobas, Sysmex, Beckman Coulter)
 * - Lab Results, Reference Ranges & Critical Panic Thresholds
 * - Critical Alerts & Escalation Tracker
 * - Lab Billing & Invoices
 * - LIS Audit Trail & Amendment History
 */

export const initialTestMaster = [
  {
    testCode: 'LAB-CMP-01',
    loincCode: '24323-8',
    testName: 'Comprehensive Metabolic Panel (CMP-14)',
    category: 'Clinical Biochemistry',
    sampleType: 'Serum / Plasma',
    tubeType: 'SST Gold Top / Heparin Green',
    volumeRequired: '4.0 mL',
    fastingRequired: 'Yes (10-12 Hours)',
    turnaroundTimeHours: 2,
    price: 65.00,
    cptCode: '80053',
    analytes: [
      { name: 'Serum Sodium (Na+)', unit: 'mmol/L', normalRange: '136 - 145', criticalLow: 120, criticalHigh: 160 },
      { name: 'Serum Potassium (K+)', unit: 'mmol/L', normalRange: '3.5 - 5.1', criticalLow: 2.8, criticalHigh: 6.0 },
      { name: 'Serum Chloride (Cl-)', unit: 'mmol/L', normalRange: '98 - 107', criticalLow: 80, criticalHigh: 120 },
      { name: 'Serum Carbon Dioxide (CO2)', unit: 'mmol/L', normalRange: '22 - 29', criticalLow: 10, criticalHigh: 40 },
      { name: 'Blood Urea Nitrogen (BUN)', unit: 'mg/dL', normalRange: '7 - 20', criticalLow: 2, criticalHigh: 100 },
      { name: 'Serum Creatinine', unit: 'mg/dL', normalRange: '0.70 - 1.30', criticalLow: 0.2, criticalHigh: 4.0 },
      { name: 'Fasting Plasma Glucose', unit: 'mg/dL', normalRange: '70 - 99', criticalLow: 50, criticalHigh: 400 },
      { name: 'Serum Calcium', unit: 'mg/dL', normalRange: '8.6 - 10.2', criticalLow: 6.5, criticalHigh: 13.0 },
      { name: 'Total Protein', unit: 'g/dL', normalRange: '6.4 - 8.3', criticalLow: 4.0, criticalHigh: 10.0 },
      { name: 'Serum Albumin', unit: 'g/dL', normalRange: '3.5 - 5.0', criticalLow: 2.0, criticalHigh: 6.0 },
      { name: 'Total Bilirubin', unit: 'mg/dL', normalRange: '0.2 - 1.2', criticalLow: null, criticalHigh: 15.0 },
      { name: 'Alkaline Phosphatase (ALP)', unit: 'U/L', normalRange: '44 - 147', criticalLow: null, criticalHigh: 500 },
      { name: 'AST (SGOT)', unit: 'U/L', normalRange: '10 - 40', criticalLow: null, criticalHigh: 300 },
      { name: 'ALT (SGPT)', unit: 'U/L', normalRange: '7 - 56', criticalLow: null, criticalHigh: 300 }
    ],
    status: 'Active'
  },
  {
    testCode: 'LAB-CBC-02',
    loincCode: '57021-8',
    testName: 'Complete Blood Count with 5-Part Diff (CBC)',
    category: 'Hematology',
    sampleType: 'Whole Blood',
    tubeType: 'EDTA Lavender Top',
    volumeRequired: '3.0 mL',
    fastingRequired: 'No',
    turnaroundTimeHours: 1,
    price: 45.00,
    cptCode: '85025',
    analytes: [
      { name: 'White Blood Cell (WBC)', unit: 'x10^3/uL', normalRange: '4.5 - 11.0', criticalLow: 2.0, criticalHigh: 30.0 },
      { name: 'Red Blood Cell (RBC)', unit: 'x10^6/uL', normalRange: '4.20 - 5.80', criticalLow: 2.0, criticalHigh: 7.0 },
      { name: 'Hemoglobin (Hgb)', unit: 'g/dL', normalRange: '13.5 - 17.5', criticalLow: 7.0, criticalHigh: 20.0 },
      { name: 'Hematocrit (Hct)', unit: 'percent', normalRange: '38.8 - 50.0', criticalLow: 20.0, criticalHigh: 60.0 },
      { name: 'Platelets Count', unit: 'x10^3/uL', normalRange: '150 - 450', criticalLow: 30, criticalHigh: 1000 }
    ],
    status: 'Active'
  },
  {
    testCode: 'LAB-LIP-03',
    loincCode: '57698-3',
    testName: 'Lipid Panel with Direct LDL (Lipid Battery)',
    category: 'Clinical Biochemistry',
    sampleType: 'Serum',
    tubeType: 'SST Gold Top',
    volumeRequired: '3.5 mL',
    fastingRequired: 'Yes (12 Hours Fasting)',
    turnaroundTimeHours: 2,
    price: 55.00,
    cptCode: '80061',
    analytes: [
      { name: 'Total Cholesterol', unit: 'mg/dL', normalRange: '< 200', criticalLow: null, criticalHigh: 350 },
      { name: 'HDL Cholesterol (Good)', unit: 'mg/dL', normalRange: '> 40', criticalLow: 20, criticalHigh: null },
      { name: 'Direct LDL Cholesterol', unit: 'mg/dL', normalRange: '< 100', criticalLow: null, criticalHigh: 250 },
      { name: 'Triglycerides', unit: 'mg/dL', normalRange: '< 150', criticalLow: null, criticalHigh: 500 }
    ],
    status: 'Active'
  },
  {
    testCode: 'LAB-TROP-04',
    loincCode: '89579-7',
    testName: 'High-Sensitivity Troponin I (hs-cTnI - Cardiac)',
    category: 'Cardiology & Critical Care',
    sampleType: 'Plasma (Lithium Heparin)',
    tubeType: 'Heparin Green Top',
    volumeRequired: '2.0 mL',
    fastingRequired: 'No (STAT / Emergency)',
    turnaroundTimeHours: 0.5,
    price: 85.00,
    cptCode: '84484',
    analytes: [
      { name: 'Troponin I (hs-cTnI)', unit: 'ng/mL', normalRange: '< 0.04', criticalLow: null, criticalHigh: 0.04 }
    ],
    status: 'Active / STAT Available'
  },
  {
    testCode: 'LAB-HBA1C-05',
    loincCode: '4548-4',
    testName: 'Glycated Hemoglobin (HbA1c)',
    category: 'Endocrinology & Diabetes',
    sampleType: 'Whole Blood',
    tubeType: 'EDTA Lavender Top',
    volumeRequired: '2.0 mL',
    fastingRequired: 'No',
    turnaroundTimeHours: 2,
    price: 40.00,
    cptCode: '83036',
    analytes: [
      { name: 'HbA1c Percentage', unit: 'percent', normalRange: '4.0 - 5.6', criticalLow: null, criticalHigh: 10.0 }
    ],
    status: 'Active'
  },
  {
    testCode: 'LAB-TSH-06',
    loincCode: '3016-3',
    testName: 'Thyroid Stimulating Hormone (TSH Ultrasensitive)',
    category: 'Immunology & Endocrinology',
    sampleType: 'Serum',
    tubeType: 'SST Gold Top',
    volumeRequired: '3.0 mL',
    fastingRequired: 'No',
    turnaroundTimeHours: 3,
    price: 50.00,
    cptCode: '84443',
    analytes: [
      { name: 'Serum TSH', unit: 'uIU/mL', normalRange: '0.40 - 4.50', criticalLow: 0.01, criticalHigh: 20.0 }
    ],
    status: 'Active'
  }
];

export const initialSampleTypes = [
  {
    id: 'SMP-01',
    name: 'Serum (SST Gel Clot Activator)',
    tubeColor: 'Gold / Red Top',
    additive: 'Silica Clot Activator + Polymer Gel',
    temperature: 'Ambient (2-8°C after spin)',
    stability: '48 Hours at 4°C',
    rejectionCriteria: 'Gross hemolysis (+++), Severe lipemia, Icteric > 20mg/dL'
  },
  {
    id: 'SMP-02',
    name: 'Whole Blood (EDTA K2/K3)',
    tubeColor: 'Lavender / Purple Top',
    additive: 'Dipotassium EDTA (Anticoagulant)',
    temperature: 'Ambient (15-25°C)',
    stability: '24 Hours (Do not freeze)',
    rejectionCriteria: 'Clotted specimen, QNS (Quantity Not Sufficient < 1mL), Underfilled tube'
  },
  {
    id: 'SMP-03',
    name: 'Plasma (Lithium Heparin)',
    tubeColor: 'Mint Green Top',
    additive: 'Lithium Heparin + Gel Separator',
    temperature: 'Ambient (STAT Spin)',
    stability: '24 Hours at 4°C',
    rejectionCriteria: 'Micro-clots, Broken vacuum, Incorrect tube type'
  },
  {
    id: 'SMP-04',
    name: 'Plasma (Sodium Citrate 3.2%)',
    tubeColor: 'Light Blue Top',
    additive: 'Buffered Sodium Citrate (1:9 Ratio)',
    temperature: 'Ambient',
    stability: '4 Hours for PT/INR, 2 Hours for aPTT',
    rejectionCriteria: 'Overfilled/Underfilled tube (>10% volume deviation), Hemolysis'
  },
  {
    id: 'SMP-05',
    name: 'Midstream Clean Catch Urine',
    tubeColor: 'Yellow / Red Top Urine Tube',
    additive: 'Preservative Free / Boric Acid',
    temperature: 'Refrigerate (2-8°C)',
    stability: '24 Hours',
    rejectionCriteria: 'Unlabeled container, Leaking cup, Stool contamination'
  }
];

export const initialAnalyzers = [
  {
    id: 'ANZ-COBAS',
    name: 'Roche Cobas 8000 (c702 + e801 Modules)',
    type: 'High-Throughput Clinical Chemistry & Immunoassay',
    ipAddress: '192.168.10.45:5000',
    protocol: 'HL7 LIS / ASTM 1394-97 (Bidirectional)',
    status: 'Online & Ready',
    lastCalibrated: 'Today, 06:00 AM',
    workloadToday: 218
  },
  {
    id: 'ANZ-SYSMEX',
    name: 'Sysmex XN-1000 Automated Hematology Line',
    type: 'Fluorescent Flow Cytometry Hematology Analyzer',
    ipAddress: '192.168.10.46:5000',
    protocol: 'HL7 v2.5 LIS Interface',
    status: 'Online & Ready',
    lastCalibrated: 'Today, 06:30 AM',
    workloadToday: 184
  },
  {
    id: 'ANZ-BECKMAN',
    name: 'Beckman Coulter AU5800 High-Speed Chemistry',
    type: 'Dual-Ring Spectrophotometric Analyzer',
    ipAddress: '192.168.10.47:5000',
    protocol: 'ASTM 1381 TCP/IP',
    status: 'Online & Ready',
    lastCalibrated: 'Yesterday, 11:00 PM',
    workloadToday: 312
  }
];

export const initialLabOrders = [
  {
    orderId: 'LAB-ORD-2026-0941',
    patientUhid: 'UHID-MED-2026-08942',
    patientName: 'Sarah Connor',
    patientAge: 38,
    patientGender: 'Female',
    prescribingDoctor: 'Dr. Sarah Mitchell, MD (Cardiology)',
    orderDate: 'Today (03 Sep 2026, 09:30 AM)',
    priority: 'Routine', // 'STAT' | 'Urgent' | 'Routine'
    clinicalIndication: 'Routine hypertension and hyperlipidemia semi-annual review',
    tests: [
      { testCode: 'LAB-CMP-01', testName: 'Comprehensive Metabolic Panel (CMP-14)', category: 'Clinical Biochemistry', price: 65.00 },
      { testCode: 'LAB-LIP-03', testName: 'Lipid Panel with Direct LDL', category: 'Clinical Biochemistry', price: 55.00 }
    ],
    status: 'Verified & Final Report Issued', // 'Ordered' | 'Sample Collected' | 'In Processing' | 'Technically Verified' | 'Verified & Final Report Issued'
    accessionNumber: 'ACC-2026-08941',
    barcodeNumber: 'BAR-LAB-99201',
    collectedAt: '03 Sep 2026, 10:00 AM',
    collectedBy: 'Phlebotomist James Vance, CPT',
    verifiedAt: '03 Sep 2026, 11:30 AM',
    verifiedBy: 'Dr. Arthur Sterling, MD (Board-Certified Pathologist)',
    isCritical: false,
    invoiceId: 'INV-LAB-8941',
    totalPrice: 120.00
  },
  {
    orderId: 'LAB-ORD-2026-0942',
    patientUhid: 'PT-9022',
    patientName: 'Robert Chen',
    patientAge: 45,
    patientGender: 'Male',
    prescribingDoctor: 'Dr. Sarah Mitchell, MD (Cardiology)',
    orderDate: 'Today (03 Sep 2026, 11:15 AM)',
    priority: 'STAT (Emergency)',
    clinicalIndication: 'Substernal chest pain radiating to left jaw, rule out NSTEMI',
    tests: [
      { testCode: 'LAB-TROP-04', testName: 'High-Sensitivity Troponin I (hs-cTnI)', category: 'Cardiology & Critical Care', price: 85.00 },
      { testCode: 'LAB-CBC-02', testName: 'Complete Blood Count (CBC)', category: 'Hematology', price: 45.00 }
    ],
    status: 'Verified & Final Report Issued',
    accessionNumber: 'ACC-2026-08942',
    barcodeNumber: 'BAR-LAB-99202',
    collectedAt: '03 Sep 2026, 11:20 AM',
    collectedBy: 'Phlebotomist Emily Watson, CPT',
    verifiedAt: '03 Sep 2026, 11:55 AM',
    verifiedBy: 'Dr. Arthur Sterling, MD (Board-Certified Pathologist)',
    isCritical: true,
    criticalValueNote: 'CRITICAL HIGH: Troponin I = 0.85 ng/mL (Normal < 0.04 ng/mL). Panic alert dispatched to attending physician.',
    invoiceId: 'INV-LAB-8942',
    totalPrice: 130.00
  },
  {
    orderId: 'LAB-ORD-2026-0943',
    patientUhid: 'UHID-MED-2026-08942',
    patientName: 'Sarah Connor',
    patientAge: 38,
    patientGender: 'Female',
    prescribingDoctor: 'Dr. Alex Rivera, MD (Pulmonology)',
    orderDate: 'Today (03 Sep 2026, 01:15 PM)',
    priority: 'Urgent',
    clinicalIndication: 'Follow-up for asthma and seasonal allergy markers',
    tests: [
      { testCode: 'LAB-CBC-02', testName: 'Complete Blood Count with Diff', category: 'Hematology', price: 45.00 },
      { testCode: 'LAB-TSH-06', testName: 'Thyroid Stimulating Hormone (TSH)', category: 'Immunology', price: 50.00 }
    ],
    status: 'Sample Collected (In Processing)',
    accessionNumber: 'ACC-2026-08943',
    barcodeNumber: 'BAR-LAB-99203',
    collectedAt: '03 Sep 2026, 01:30 PM',
    collectedBy: 'Phlebotomist James Vance, CPT',
    verifiedAt: null,
    verifiedBy: null,
    isCritical: false,
    invoiceId: 'INV-LAB-8943',
    totalPrice: 95.00
  }
];

export const initialLabResults = {
  'LAB-ORD-2026-0941': {
    orderId: 'LAB-ORD-2026-0941',
    patientName: 'Sarah Connor',
    testDate: '03 Sep 2026',
    status: 'Final Certified Report',
    pathologistSign: 'Dr. Arthur Sterling, MD (Pathology Lic #PATH-88902)',
    results: [
      { analyte: 'Serum Sodium (Na+)', value: 140, unit: 'mmol/L', range: '136 - 145', flag: 'Normal', method: 'ISE Indirect' },
      { analyte: 'Serum Potassium (K+)', value: 4.2, unit: 'mmol/L', range: '3.5 - 5.1', flag: 'Normal', method: 'ISE Indirect' },
      { analyte: 'Serum Chloride (Cl-)', value: 102, unit: 'mmol/L', range: '98 - 107', flag: 'Normal', method: 'ISE Indirect' },
      { analyte: 'Blood Urea Nitrogen (BUN)', value: 14, unit: 'mg/dL', range: '7 - 20', flag: 'Normal', method: 'Urease Kinetic' },
      { analyte: 'Serum Creatinine', value: 0.88, unit: 'mg/dL', range: '0.70 - 1.30', flag: 'Normal', method: 'Jaffe Modified' },
      { analyte: 'Fasting Plasma Glucose', value: 92, unit: 'mg/dL', range: '70 - 99', flag: 'Normal', method: 'Hexokinase' },
      { analyte: 'Serum Calcium', value: 9.4, unit: 'mg/dL', range: '8.6 - 10.2', flag: 'Normal', method: 'Arsenazo III' },
      { analyte: 'Total Cholesterol', value: 218, unit: 'mg/dL', range: '< 200', flag: 'High (H)', method: 'Enzymatic CHOD-PAP' },
      { analyte: 'Direct LDL Cholesterol', value: 138, unit: 'mg/dL', range: '< 100', flag: 'High (H)', method: 'Direct Homogeneous' },
      { analyte: 'HDL Cholesterol (Good)', value: 52, unit: 'mg/dL', range: '> 40', flag: 'Normal', method: 'Direct Clearance' },
      { analyte: 'Triglycerides', value: 165, unit: 'mg/dL', range: '< 150', flag: 'High (H)', method: 'GPO-PAP' }
    ],
    comments: 'Lipid profile demonstrates borderline hyperlipidemia with elevated direct LDL (138 mg/dL). Renal and electrolyte parameters within normal clinical limits.'
  },
  'LAB-ORD-2026-0942': {
    orderId: 'LAB-ORD-2026-0942',
    patientName: 'Robert Chen',
    testDate: '03 Sep 2026',
    status: 'Final Certified Report (CRITICAL ALERT)',
    pathologistSign: 'Dr. Arthur Sterling, MD (Pathology Lic #PATH-88902)',
    results: [
      { analyte: 'Troponin I (hs-cTnI)', value: 0.85, unit: 'ng/mL', range: '< 0.04', flag: 'CRITICAL HIGH (Panic Value)', method: 'Chemiluminescent ECLIA' },
      { analyte: 'White Blood Cell (WBC)', value: 12.4, unit: 'x10^3/uL', range: '4.5 - 11.0', flag: 'High (H)', method: 'Flow Cytometry' },
      { analyte: 'Hemoglobin (Hgb)', value: 14.8, unit: 'g/dL', range: '13.5 - 17.5', flag: 'Normal', method: 'SLS-Hemoglobin' },
      { analyte: 'Platelets Count', value: 260, unit: 'x10^3/uL', range: '150 - 450', flag: 'Normal', method: 'Impedance Aperture' }
    ],
    comments: 'CRITICAL ELEVATION OF HIGH-SENSITIVITY TROPONIN I (0.85 ng/mL). Strongly suggestive of acute coronary syndrome (NSTEMI). Result telephoned directly to Dr. Sarah Mitchell at 11:58 AM.'
  }
};

export const initialCriticalAlerts = [
  {
    alertId: 'CRIT-2026-094',
    orderId: 'LAB-ORD-2026-0942',
    patientUhid: 'PT-9022',
    patientName: 'Robert Chen',
    doctorName: 'Dr. Sarah Mitchell, MD',
    analyte: 'High-Sensitivity Troponin I',
    reportedValue: '0.85 ng/mL',
    criticalThreshold: '> 0.04 ng/mL',
    reportedAt: 'Today, 11:55 AM',
    status: 'Acknowledged by Doctor', // 'Pending Acknowledgment' | 'Acknowledged by Doctor' | 'Escalated to Chief of Staff'
    acknowledgedAt: 'Today, 12:02 PM',
    clinicalActionTaken: 'Immediate Cardiology consult; patient transferred to Coronary Care Unit (CCU 3B) for emergency heparinization & catheterization prep.'
  }
];

export const initialLabInvoices = [
  {
    invoiceId: 'INV-LAB-8941',
    orderId: 'LAB-ORD-2026-0941',
    patientName: 'Sarah Connor',
    patientUhid: 'UHID-MED-2026-08942',
    date: '03 Sep 2026',
    testsTotal: 120.00,
    pharmaGstTax: 6.00,
    insuranceCovered: 100.00,
    patientCopayDue: 26.00,
    paymentStatus: 'Paid (Credit Card)',
    status: 'Settled'
  },
  {
    invoiceId: 'INV-LAB-8942',
    orderId: 'LAB-ORD-2026-0942',
    patientName: 'Robert Chen',
    patientUhid: 'PT-9022',
    date: '03 Sep 2026',
    testsTotal: 130.00,
    pharmaGstTax: 6.50,
    insuranceCovered: 136.50,
    patientCopayDue: 0.00,
    paymentStatus: 'Direct Insurance Billing (BlueCross)',
    status: 'Settled'
  }
];

export const initialLisAuditTrail = [
  {
    auditId: 'LIS-AUD-991',
    timestamp: '2026-09-03 11:58 AM',
    user: 'Dr. Arthur Sterling, MD',
    role: 'Board-Certified Pathologist',
    action: 'RESULT_VALIDATION_SIGN',
    orderId: 'LAB-ORD-2026-0942',
    details: 'Electronically signed and validated STAT Troponin I critical report (0.85 ng/mL). Dispatched panic alert to Dr. Sarah Mitchell.'
  },
  {
    auditId: 'LIS-AUD-990',
    timestamp: '2026-09-03 11:45 AM',
    user: 'Lab Tech Maya Lin, MT(ASCP)',
    role: 'Medical Laboratory Technologist',
    action: 'ANALYZER_RESULT_IMPORT',
    orderId: 'LAB-ORD-2026-0942',
    details: 'Automated data import from Roche Cobas 8000 (c702 module) via HL7 ASTM interface. Repeat run verified on duplicate aliquot.'
  },
  {
    auditId: 'LIS-AUD-989',
    timestamp: '2026-09-03 11:30 AM',
    user: 'Dr. Arthur Sterling, MD',
    role: 'Board-Certified Pathologist',
    action: 'RESULT_VALIDATION_SIGN',
    orderId: 'LAB-ORD-2026-0941',
    details: 'Certified CMP and Lipid Battery final report for Sarah Connor. High LDL flagged.'
  }
];
