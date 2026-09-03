/**
 * Comprehensive Patient Master Record & Database
 * Supporting all 15 patient management facets:
 * 1. Registration & UHID
 * 2. Duplicate Detection Database
 * 3. Demographics & Contact
 * 4. Emergency Contacts
 * 5. Allergies & Blood Group
 * 6. Medical & Surgical History
 * 7. Medication History
 * 8. Appointments & Visits
 * 9. Prescriptions
 * 10. Laboratory & Imaging Reports
 * 11. Admissions & Discharges
 * 12. Billing & Payment History
 * 13. Insurance & Pre-Auth
 * 14. Documents & Consent
 * 15. Longitudinal Patient Timeline
 */

export const primaryPatientData = {
  // ─── 1. REGISTRATION & UHID ──────────────────────────────────────────
  registration: {
    uhid: 'UHID-MED-2026-08942',
    barcode: '||| |||| || ||||| ||| || ||||',
    registeredDate: '12 Jan 2024, 09:30 AM',
    registeredBranch: 'MediCare Central Multispeciality Hospital',
    registrationType: 'Regular Outpatient (OPD)',
    nationalHealthId: 'ABHA-9942-0192-8812',
    aadhaarGovtId: 'XXXX-XXXX-4921',
    patientCategory: 'Insured Private Corporate',
    assignedPrimaryCarePhysician: 'Dr. Sarah Mitchell, MD (Cardiology)',
    status: 'Active / Verified'
  },

  // ─── 3. DEMOGRAPHICS & CONTACT INFORMATION ───────────────────────────
  demographics: {
    fullName: 'Sarah Connor',
    preferredName: 'Sarah',
    dateOfBirth: '1988-05-14',
    age: 38,
    gender: 'Female',
    maritalStatus: 'Married',
    nationality: 'United States',
    language: 'English (Primary), Spanish (Conversational)',
    occupation: 'Senior Software Systems Architect',
    primaryPhone: '+1 (555) 234-8901',
    alternativePhone: '+1 (555) 890-1234',
    email: 'patient@medicare.health',
    address: {
      street: '742 Evergreen Terrace, Suite 4B',
      district: 'Medical District',
      city: 'Springfield',
      state: 'Illinois',
      postalCode: '62704',
      country: 'United States'
    },
    communicationPreference: 'SMS & WhatsApp Notifications Enabled',
    organDonor: 'Registered Organ Donor (Yes)'
  },

  // ─── 4. EMERGENCY CONTACTS ───────────────────────────────────────────
  emergencyContacts: [
    {
      id: 'EC-1',
      name: 'John Connor',
      relationship: 'Spouse / Next of Kin',
      phone: '+1 (555) 901-2345',
      alternativePhone: '+1 (555) 901-2346',
      email: 'john.connor@gmail.com',
      isPrimary: true,
      decisionMaker: true,
      address: '742 Evergreen Terrace, Springfield, IL 62704'
    },
    {
      id: 'EC-2',
      name: 'Martha Vance',
      relationship: 'Mother',
      phone: '+1 (555) 789-0123',
      alternativePhone: '+1 (555) 789-0124',
      email: 'martha.vance@yahoo.com',
      isPrimary: false,
      decisionMaker: false,
      address: '124 Elmwood Avenue, Chicago, IL 60611'
    }
  ],

  // ─── 5. ALLERGIES AND BLOOD GROUP ────────────────────────────────────
  allergiesAndBlood: {
    bloodGroup: 'O Rh Positive (O+)',
    donorCompatibility: 'Universal Red Cell Donor for O+, A+, B+, AB+',
    antibodyScreen: 'Negative',
    allergies: [
      {
        id: 'ALG-1',
        allergen: 'Penicillin / Beta-Lactams',
        category: 'Drug Allergy',
        severity: 'Critical / High Risk',
        reaction: 'Severe urticaria, bronchospasm, anaphylaxis risk',
        diagnosedYear: '2018',
        verifiedBy: 'Dr. Emily Chen, MD',
        status: 'Active - Strictly Contraindicated'
      },
      {
        id: 'ALG-2',
        allergen: 'Ibuprofen / NSAIDs',
        category: 'Drug Allergy',
        severity: 'Moderate',
        reaction: 'Facial angioedema, periorbital swelling, dyspepsia',
        diagnosedYear: '2020',
        verifiedBy: 'Dr. Sarah Mitchell, MD',
        status: 'Active - Avoid'
      },
      {
        id: 'ALG-3',
        allergen: 'Roasted Peanuts',
        category: 'Food Allergy',
        severity: 'Mild to Moderate',
        reaction: 'Oral itching, localized erythema',
        diagnosedYear: '2012',
        verifiedBy: 'Self-reported / Verified',
        status: 'Active'
      },
      {
        id: 'ALG-4',
        allergen: 'Natural Rubber Latex',
        category: 'Environmental / Medical Device',
        severity: 'Mild',
        reaction: 'Contact dermatitis on extended exposure',
        diagnosedYear: '2021',
        verifiedBy: 'Nurse Station Ward B',
        status: 'Active - Use Latex-Free Gloves'
      }
    ]
  },

  // ─── 6. MEDICAL AND SURGICAL HISTORY ─────────────────────────────────
  history: {
    chronicConditions: [
      {
        condition: 'Essential Hypertension',
        icdCode: 'ICD-10 I10',
        diagnosisDate: 'Nov 2019',
        status: 'Controlled on ACE Inhibitor (Lisinopril 10mg)',
        attending: 'Dr. Sarah Mitchell'
      },
      {
        condition: 'Intermittent Mild Asthma',
        icdCode: 'ICD-10 J45.20',
        diagnosisDate: 'Apr 2015',
        status: 'Controlled, Salbutamol inhaler PRN',
        attending: 'Dr. Alex Rivera'
      }
    ],
    surgicalHistory: [
      {
        procedure: 'Laparoscopic Cholecystectomy',
        date: '14 Mar 2021',
        hospital: 'MediCare Central Hospital',
        surgeon: 'Dr. Robert Miller, FACS',
        indication: 'Symptomatic cholelithiasis with biliary colic',
        implants: 'Titanium surgical clips (4)',
        outcome: 'Uneventful recovery, discharged Day 3'
      },
      {
        procedure: 'Elective Lower Segment Cesarean Section (LSCS)',
        date: '08 Aug 2016',
        hospital: 'MediCare Maternity & Women Health Wing',
        surgeon: 'Dr. Elena Rostova, OB-GYN',
        indication: 'Breech presentation at 39 weeks',
        implants: 'None',
        outcome: 'Healthy newborn, uncomplicated recovery'
      }
    ],
    familyHistory: [
      { relation: 'Father', condition: 'Coronary Artery Disease, Myocardial Infarction at age 58' },
      { relation: 'Mother', condition: 'Type 2 Diabetes Mellitus, Osteoporosis' },
      { relation: 'Maternal Grandmother', condition: 'Hypertension, Stroke at age 76' }
    ]
  },

  // ─── 7. MEDICATION HISTORY ───────────────────────────────────────────
  medications: {
    active: [
      {
        id: 'MED-1',
        drugName: 'Lisinopril',
        dosage: '10 mg',
        route: 'Oral Tablet',
        frequency: 'Once Daily (Morning)',
        purpose: 'Essential Hypertension Control',
        startDate: '15 Nov 2019',
        prescriber: 'Dr. Sarah Mitchell',
        refillsRemaining: 4,
        complianceRate: '98%'
      },
      {
        id: 'MED-2',
        drugName: 'Atorvastatin',
        dosage: '20 mg',
        route: 'Oral Tablet',
        frequency: 'Once Daily at Bedtime',
        purpose: 'Cardiovascular Lipid Prophylaxis',
        startDate: '10 Jan 2023',
        prescriber: 'Dr. Sarah Mitchell',
        refillsRemaining: 3,
        complianceRate: '95%'
      },
      {
        id: 'MED-3',
        drugName: 'Salbutamol HFA Inhaler',
        dosage: '100 mcg / puff',
        route: 'Inhalation',
        frequency: '1-2 Puffs as needed (PRN)',
        purpose: 'Acute Asthma Bronchospasm relief',
        startDate: '20 Apr 2015',
        prescriber: 'Dr. Alex Rivera',
        refillsRemaining: 2,
        complianceRate: 'As Needed'
      }
    ],
    pastDiscontinued: [
      {
        drugName: 'Amoxicillin Trihydrate',
        dosage: '500 mg',
        reason: 'Discontinued due to allergic urticaria & rash (Penicillin cross-sensitivity)',
        stopDate: 'Oct 2018'
      },
      {
        drugName: 'Omeprazole',
        dosage: '20 mg',
        reason: 'Completed 4-week short course for post-op dyspepsia',
        stopDate: 'Apr 2021'
      }
    ]
  },

  // ─── 8. APPOINTMENTS AND VISITS ──────────────────────────────────────
  appointmentsAndVisits: [
    {
      id: 'APT-2026-849201',
      type: 'Upcoming Consult',
      specialist: 'Dr. Sarah Mitchell, MD',
      department: 'Cardiology & Vascular',
      date: 'Today, 03 Sep 2026',
      time: '02:15 PM',
      room: 'Cardiology Suite 304, Tower A',
      status: 'Confirmed & Token #14 Issued',
      mode: 'In-Clinic Physical Consult',
      notes: '6-Month Routine Cardiac Check & Lipid Panel Evaluation'
    },
    {
      id: 'APT-2026-720194',
      type: 'Upcoming Telehealth',
      specialist: 'Dr. Priya Patel, MD',
      department: 'Family & Preventive Medicine',
      date: '18 Sep 2026',
      time: '10:00 AM',
      room: 'HD Telehealth Room (Virtual)',
      status: 'Scheduled',
      mode: 'Video Consultation',
      notes: 'Seasonal wellness check & vaccination update'
    },
    {
      id: 'VIS-2026-1920',
      type: 'Past Visit',
      specialist: 'Dr. Alex Rivera, MD',
      department: 'Pulmonology',
      date: '12 Jun 2026, 11:30 AM',
      time: '11:30 AM',
      room: 'OPD Clinic 210',
      status: 'Completed',
      mode: 'Outpatient Encounter',
      notes: 'Spirometry test review. FEV1/FVC ratio normal (82%). Continued Salbutamol PRN.'
    },
    {
      id: 'VIS-2026-0811',
      type: 'Past Visit',
      specialist: 'Dr. Emily Chen, MD',
      department: 'Internal Medicine',
      date: '04 Jan 2026, 09:00 AM',
      time: '09:00 AM',
      room: 'Executive Health Clinic',
      status: 'Completed',
      mode: 'Annual Health Screen',
      notes: 'Comprehensive annual physical, ECG, and bloodwork completed. BP: 124/80.'
    }
  ],

  // ─── 9. PRESCRIPTIONS ────────────────────────────────────────────────
  prescriptions: [
    {
      id: 'RX-2026-9042',
      date: '03 Sep 2026',
      prescriber: 'Dr. Sarah Mitchell, MD (Lic #MD-78291)',
      department: 'Cardiology',
      items: [
        { drug: 'Lisinopril 10mg', instructions: 'Take 1 tablet by mouth daily in the morning', qty: '30 Tablets', refills: 4 },
        { drug: 'Atorvastatin 20mg', instructions: 'Take 1 tablet by mouth at bedtime', qty: '30 Tablets', refills: 3 }
      ],
      diagnosis: 'Essential Hypertension, Cardiovascular Primary Prevention',
      qrVerification: 'VERIFIED-SIG-SHA256-MC9042',
      pharmacyStatus: 'Ready for Dispensing / Auto-Synced'
    },
    {
      id: 'RX-2026-7811',
      date: '12 Jun 2026',
      prescriber: 'Dr. Alex Rivera, MD (Lic #MD-55102)',
      department: 'Pulmonology',
      items: [
        { drug: 'Salbutamol 100mcg MDI Inhaler', instructions: '1-2 puffs as required for wheezing', qty: '1 Canister (200 Doses)', refills: 2 }
      ],
      diagnosis: 'Intermittent Bronchial Asthma',
      qrVerification: 'VERIFIED-SIG-SHA256-MC7811',
      pharmacyStatus: 'Dispensed on 12 Jun 2026'
    }
  ],

  // ─── 10. LABORATORY AND IMAGING REPORTS ──────────────────────────────
  labAndImagingReports: [
    {
      id: 'LAB-2026-9481',
      testName: 'Comprehensive Metabolic Panel (CMP) + Lipid Battery',
      modality: 'Clinical Biochemistry',
      date: '02 Sep 2026',
      specimen: 'Venous Blood',
      status: 'Final / Doctor Verified',
      labPathologist: 'Dr. Nathan Reed, MD (Pathology)',
      highlights: [
        { parameter: 'Fasting Blood Glucose', value: '94 mg/dL', reference: '70 - 99 mg/dL', flag: 'Normal' },
        { parameter: 'Total Cholesterol', value: '186 mg/dL', reference: '< 200 mg/dL', flag: 'Normal' },
        { parameter: 'HDL Cholesterol', value: '54 mg/dL', reference: '> 50 mg/dL', flag: 'Optimal' },
        { parameter: 'LDL Cholesterol', value: '104 mg/dL', reference: '< 100 mg/dL', flag: 'Borderline' },
        { parameter: 'Triglycerides', value: '128 mg/dL', reference: '< 150 mg/dL', flag: 'Normal' },
        { parameter: 'Serum Creatinine', value: '0.88 mg/dL', reference: '0.59 - 1.04 mg/dL', flag: 'Normal' },
        { parameter: 'eGFR', value: '96 mL/min/1.73m²', reference: '> 90 mL/min', flag: 'Normal' }
      ]
    },
    {
      id: 'IMG-2026-4412',
      testName: '12-Lead Standard Electrocardiogram (ECG)',
      modality: 'Cardiology Diagnostics',
      date: '02 Sep 2026',
      specimen: 'Non-Invasive Diagnostic',
      status: 'Normal Sinus Rhythm',
      labPathologist: 'Dr. Sarah Mitchell, MD',
      findings: 'Ventricular Rate: 72 BPM, PR Interval: 154 ms, QRS Duration: 88 ms, QTc: 412 ms. Normal P-wave axis. No pathological Q waves or acute ST-T elevation / depression. Stable baseline compared to 2025.'
    },
    {
      id: 'IMG-2026-2104',
      testName: 'Digital Chest Radiograph (X-Ray PA View)',
      modality: 'Radiology / PACS',
      date: '12 Jun 2026',
      specimen: 'Diagnostic Imaging',
      status: 'Clear / Unremarkable',
      labPathologist: 'Dr. Marcus Holloway, MD (Radiology)',
      findings: 'Lungs are clear with no consolidation, effusion, or pneumothorax. Normal cardiothoracic silhouette ratio (CTR < 0.50). Costophrenic sulci sharp. Visualized bony thorax intact.'
    },
    {
      id: 'IMG-2026-0841',
      testName: 'Transthoracic Echocardiogram (2D & Color Doppler)',
      modality: 'Cardiac Ultrasound',
      date: '15 Jan 2026',
      specimen: 'Echocardiography',
      status: 'Normal Systolic Function',
      labPathologist: 'Dr. Sarah Mitchell, MD',
      findings: 'Left Ventricular Ejection Fraction (LVEF): 62%. Normal LV cavity size and wall thickness. Normal left atrial volume index. Trace physiological tricuspid regurgitation. No pericardial effusion.'
    }
  ],

  // ─── 11. ADMISSIONS AND DISCHARGES (ADT) ─────────────────────────────
  admissionsAndDischarges: [
    {
      ipdNumber: 'IPD-2021-0491',
      admissionDate: '13 Mar 2021, 07:45 AM',
      dischargeDate: '16 Mar 2021, 02:30 PM',
      lengthOfStay: '3 Days',
      department: 'Department of General & Laparoscopic Surgery',
      ward: 'Surgical Care Inpatient Wing B',
      bedNumber: 'Bed #204 (Private Single Room)',
      admittingConsultant: 'Dr. Robert Miller, FACS',
      admittingDiagnosis: 'Acute Symptomatic Cholelithiasis with Biliary Colic',
      surgeryPerformed: 'Elective 4-Port Laparoscopic Cholecystectomy (14 Mar 2021)',
      dischargeCondition: 'Hemodynamically Stable, Afebrile, Surgical Wounds Clean & Dry, Tolerating Regular Diet',
      dischargeMedications: 'Acetaminophen 500mg PO TID PRN, Pantoprazole 40mg daily x 7 days',
      dischargeAdvice: 'No heavy lifting > 5kg for 3 weeks; follow-up suture check in 7 days (Completed)'
    }
  ],

  // ─── 12. BILLING AND PAYMENT HISTORY ─────────────────────────────────
  billingHistory: [
    {
      invoiceId: 'INV-2026-8941',
      date: '03 Sep 2026',
      serviceDescription: 'Cardiology Specialist Outpatient Consultation (Dr. Mitchell)',
      grossAmount: 120.00,
      insuranceCovered: 120.00,
      patientCoPay: 0.00,
      paymentMethod: 'Cashless Direct Insurance Settlement (BlueCross)',
      status: 'Paid in Full',
      receiptUrl: '#receipt-8941'
    },
    {
      invoiceId: 'INV-2026-8802',
      date: '02 Sep 2026',
      serviceDescription: 'Comprehensive Metabolic Battery + 12-Lead Digital ECG',
      grossAmount: 240.00,
      insuranceCovered: 200.00,
      patientCoPay: 40.00,
      paymentMethod: 'Credit Card (Visa ending in 4242)',
      status: 'Paid in Full',
      receiptUrl: '#receipt-8802'
    },
    {
      invoiceId: 'INV-2026-5120',
      date: '12 Jun 2026',
      serviceDescription: 'Pulmonology Consultation + Digital Chest PA X-Ray + Spirometry',
      grossAmount: 310.00,
      insuranceCovered: 280.00,
      patientCoPay: 30.00,
      paymentMethod: 'Credit Card (Visa ending in 4242)',
      status: 'Paid in Full',
      receiptUrl: '#receipt-5120'
    },
    {
      invoiceId: 'INV-2021-0199',
      date: '16 Mar 2021',
      serviceDescription: 'Inpatient Hospitalization (3 Days), Laparoscopic Surgery OT, Anesthesia & Pharmacy',
      grossAmount: 4850.00,
      insuranceCovered: 4350.00,
      patientCoPay: 500.00,
      paymentMethod: 'Electronic Bank Wire (Settled on Discharge)',
      status: 'Paid & Closed',
      receiptUrl: '#receipt-0199'
    }
  ],

  // ─── 13. INSURANCE AND PRE-AUTHORIZATION ─────────────────────────────
  insurance: {
    insuranceProvider: 'BlueCross BlueShield Healthcare Group',
    tpaName: 'MediAssure Third Party Administrator (TPA)',
    policyName: 'Executive Global Comprehensive PPO Plan',
    policyNumber: 'BCBS-99420-CON-01',
    groupNumber: 'GRP-77401-TECH',
    primaryPolicyHolder: 'Sarah Connor (Self)',
    sumInsuredAnnual: '$500,000.00 USD',
    utilizedAmount: '$5,520.00 USD',
    balanceAvailable: '$494,480.00 USD',
    preAuthStatus: 'Pre-Approved & Active for Inpatient/Daycare',
    cashlessNetworkStatus: '100% In-Network Tier 1 Hospital Facility',
    coverageValidity: '01 Jan 2026 to 31 Dec 2026',
    coPayClause: 'Zero Copay for Preventive Visits; 10% on Non-Formulary Drugs'
  },

  // ─── 14. DOCUMENTS AND CONSENT ───────────────────────────────────────
  documentsAndConsent: [
    {
      id: 'DOC-2026-01',
      title: 'General Outpatient Treatment & Telehealth Digital Consent',
      category: 'Informed Consent',
      signedDate: '12 Jan 2024 (Re-confirmed 02 Jan 2026)',
      validity: 'Valid through 31 Dec 2026',
      status: 'Digitally Signed & Active',
      signatory: 'Sarah Connor (via Aadhaar e-Sign / SMS OTP)',
      description: 'Comprehensive consent for non-invasive clinical examination, emergency first-aid, tele-consultations, and electronic prescription delivery.'
    },
    {
      id: 'DOC-2026-02',
      title: 'HIPAA & HL7 Health Information Release Authorization',
      category: 'Privacy & Data Protection',
      signedDate: '12 Jan 2024',
      validity: 'Active (3 Years Duration)',
      status: 'Active / Compliant',
      signatory: 'Sarah Connor',
      description: 'Authorizes MediCare Hospital to share laboratory results with primary care physicians and process insurance claims via encrypted HL7 FHIR APIs.'
    },
    {
      id: 'DOC-2026-03',
      title: 'Government Identity Proof & Address Verification',
      category: 'KYC / Identification',
      signedDate: '12 Jan 2024',
      validity: 'Permanent',
      status: 'Verified by Hospital Frontdesk',
      signatory: 'Verified via Govt Database',
      description: 'State Issued Drivers License & Passport copy archived under encrypted medical records vault.'
    },
    {
      id: 'DOC-2021-04',
      title: 'Informed Surgical & Anesthesia Consent Form',
      category: 'Surgical Consent',
      signedDate: '13 Mar 2021',
      validity: 'Archived Encounter Record',
      status: 'Executed',
      signatory: 'Sarah Connor & John Connor (Witness)',
      description: 'Specific consent for Laparoscopic Cholecystectomy under General Endotracheal Anesthesia.'
    },
    {
      id: 'DOC-2023-05',
      title: 'Advance Medical Directive & Living Will Declaration',
      category: 'Legal Medical Document',
      signedDate: '10 Oct 2023',
      validity: 'Permanent / Revocable',
      status: 'On File with Medical Superintendent',
      signatory: 'Sarah Connor (Notarized)',
      description: 'Appoints John Connor as primary Healthcare Healthcare Proxy for critical emergency decision-making.'
    }
  ],

  // ─── 15. LONGITUDINAL PATIENT TIMELINE ───────────────────────────────
  longitudinalTimeline: [
    {
      id: 'TL-8',
      date: '03 Sep 2026',
      time: '02:15 PM',
      category: 'Appointment',
      title: 'Cardiology OPD Encounter',
      subtitle: 'Dr. Sarah Mitchell — Suite 304',
      description: '6-Month Cardiovascular risk assessment, lipid profile review, and Lisinopril refill authorization.',
      badge: 'Active Today',
      badgeColor: '#0284c7'
    },
    {
      id: 'TL-7',
      date: '02 Sep 2026',
      time: '08:30 AM',
      category: 'Laboratory',
      title: 'Comprehensive Metabolic Panel & 12-Lead ECG',
      subtitle: 'Pathology & Diagnostic Laboratory',
      description: 'Fasting glucose: 94 mg/dL; Total cholesterol: 186 mg/dL; ECG shows normal sinus rhythm.',
      badge: 'Completed',
      badgeColor: '#10b981'
    },
    {
      id: 'TL-6',
      date: '12 Jun 2026',
      time: '11:30 AM',
      category: 'Consultation',
      title: 'Pulmonology Follow-Up & Chest X-Ray',
      subtitle: 'Dr. Alex Rivera',
      description: 'Spirometry test shows stable lung volumes. Digital PA chest X-Ray normal and clear.',
      badge: 'Routine Review',
      badgeColor: '#6366f1'
    },
    {
      id: 'TL-5',
      date: '15 Jan 2026',
      time: '10:00 AM',
      category: 'Diagnostic',
      title: 'Transthoracic Echocardiogram (2D Echo)',
      subtitle: 'Cardiac Non-Invasive Lab',
      description: 'Normal left ventricular systolic function (EF 62%). No structural abnormalities noted.',
      badge: 'Diagnostic',
      badgeColor: '#0d9488'
    },
    {
      id: 'TL-4',
      date: '10 Oct 2023',
      time: '03:00 PM',
      category: 'Document',
      title: 'Advance Medical Directive Registered',
      subtitle: 'Legal & Medical Records Department',
      description: 'Formal health proxy documentation archived designating John Connor as medical surrogate.',
      badge: 'Legal',
      badgeColor: '#8b5cf6'
    },
    {
      id: 'TL-3',
      date: '13 Mar 2021 – 16 Mar 2021',
      time: '3 Days Inpatient',
      category: 'Admission',
      title: 'Laparoscopic Cholecystectomy (Surgical Admission)',
      subtitle: 'Dr. Robert Miller, FACS — Ward B, Bed #204',
      description: 'Successful minimally invasive gallbladder removal. Uneventful post-op course; discharged Day 3.',
      badge: 'Surgical IPD',
      badgeColor: '#f59e0b'
    },
    {
      id: 'TL-2',
      date: '15 Nov 2019',
      time: '11:00 AM',
      category: 'Clinical',
      title: 'Essential Hypertension Diagnosed',
      subtitle: 'Internal Medicine OPD',
      description: 'Baseline blood pressure 146/94 mm Hg. Commenced on Lisinopril 10mg once daily with dietary sodium restriction.',
      badge: 'Diagnosis',
      badgeColor: '#ec4899'
    },
    {
      id: 'TL-1',
      date: '12 Jan 2014',
      time: '09:30 AM',
      category: 'Registration',
      title: 'Initial Hospital Registration & UHID Generation',
      subtitle: 'Central Medical Records Department (MRD)',
      description: 'Issued permanent unique healthcare identifier UHID-MED-2026-08942 and biometric verification.',
      badge: 'Registration',
      badgeColor: '#0284c7'
    }
  ]
};

// ─── 2. DUPLICATE PATIENT DETECTION DATABASE ──────────────────────────
export const existingPatientDatabase = [
  {
    uhid: 'UHID-MED-2026-08942',
    fullName: 'Sarah Connor',
    dob: '1988-05-14',
    gender: 'Female',
    phone: '+1 (555) 234-8901',
    email: 'patient@medicare.health',
    nationalId: 'XXXX-XXXX-4921',
    status: 'Primary Active Record'
  },
  {
    uhid: 'UHID-MED-2025-01449',
    fullName: 'Sarah J. Connor',
    dob: '1988-05-14',
    gender: 'Female',
    phone: '+1 (555) 234-8901',
    email: 'sarahconnor.old@gmail.com',
    nationalId: 'XXXX-XXXX-4921',
    status: 'Flagged Potential Duplicate (Historical Record)'
  },
  {
    uhid: 'UHID-MED-2024-99120',
    fullName: 'Sara Conner',
    dob: '1988-06-20',
    gender: 'Female',
    phone: '+1 (555) 992-1100',
    email: 'sara.conner88@gmail.com',
    nationalId: 'XXXX-XXXX-8822',
    status: 'Distinct Patient'
  },
  {
    uhid: 'UHID-MED-2026-03112',
    fullName: 'Robert Chen',
    dob: '1981-03-22',
    gender: 'Male',
    phone: '+1 (555) 345-6789',
    email: 'robert.chen@gmail.com',
    nationalId: 'XXXX-XXXX-3341',
    status: 'Primary Active Record'
  },
  {
    uhid: 'UHID-MED-2026-07741',
    fullName: 'Eleanor Vance',
    dob: '1964-11-08',
    gender: 'Female',
    phone: '+1 (555) 456-7890',
    email: 'eleanor.vance@gmail.com',
    nationalId: 'XXXX-XXXX-1190',
    status: 'Primary Active Record'
  }
];
