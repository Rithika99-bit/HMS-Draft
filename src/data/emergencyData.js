/**
 * MediCare Hospital Management System - Emergency Department (ED / ER / Trauma) Data
 * Supports 3 role-separated workflows:
 * - Admin / Super Admin (Management & Operations)
 * - Doctor (Clinical Assessment & Directives)
 * - Patient (Patient Portal Emergency Encounter View)
 */

export const triageSeverityLevels = [
  { level: 'ESI-1', name: 'Resuscitation / Immediate', color: '#dc2626', bg: '#fee2e2', maxWait: '0 Mins (Immediate)', desc: 'Immediate life-saving intervention required (Cardiac arrest, massive polytrauma, anaphylaxis)' },
  { level: 'ESI-2', name: 'Emergent / High Risk', color: '#ea580c', bg: '#ffedd5', maxWait: '< 10 Mins', desc: 'High-risk situation, severe respiratory distress, acute coronary syndrome, acute stroke' },
  { level: 'ESI-3', name: 'Urgent / Moderate', color: '#ca8a04', bg: '#fef9c3', maxWait: '< 30 Mins', desc: 'Stable vital signs, but requires multiple emergency diagnostic investigations' },
  { level: 'ESI-4', name: 'Less Urgent', color: '#16a34a', bg: '#dcfce7', maxWait: '< 60 Mins', desc: 'Single simple diagnostic/procedure required (e.g., uncomplicated minor laceration, sprain)' },
  { level: 'ESI-5', name: 'Non-Urgent', color: '#0284c7', bg: '#e0f2fe', maxWait: '< 120 Mins', desc: 'Low acuity, medication refill, suture removal, minor chronic rash' },
  { level: 'Deceased', name: 'Expired / MLC Documentation', color: '#1e293b', bg: '#f1f5f9', maxWait: 'N/A', desc: 'Brought in Dead (BID) or failed resuscitation with death certification' }
];

export const emergencyPatients = [
  {
    erId: 'ER-2026-081',
    token: 'EM-RED-01',
    uhid: 'UHID-MED-2026-08942',
    patientName: 'Sarah Connor',
    age: 38,
    gender: 'Female',
    bloodGroup: 'O+',
    arrivalTime: 'Today, 08:15 AM',
    arrivalMode: 'Emergency Advanced Life Support (ALS) Ambulance',
    chiefComplaint: 'Acute substernal crushing chest pain radiating to left jaw, profuse diaphoresis, dyspnea',
    triageLevel: 'ESI-1',
    triageColor: '#dc2626',
    triageCategory: 'Resuscitation',
    traumaScore: 'GCS: 15/15 (E4 V5 M6)',
    
    // Initial Assessment & Vitals
    initialVitals: {
      bp: '88/54 mmHg (Hypotensive)',
      hr: '118 bpm (Sinus Tachycardia)',
      temp: '98.6 °F',
      spo2: '91% on Room Air -> 99% on 4L High-Flow O2',
      rr: '24 breaths/min',
      bloodSugar: '112 mg/dL',
      painScore: '9/10 (Severe Anginal Pain)',
      triageNurse: 'Nurse Elena Chen, RN (Triage Team Lead)'
    },

    // Doctor & Nursing Management
    attendingDoctor: 'Dr. Sarah Mitchell, MD (Chief ER / Interventional Cardiologist)',
    consultantSpecialists: ['Dr. Alex Rivera, MD (Critical Care)', 'Dr. Kevin Zhao, MD (Emergency Resident)'],
    assignedERStaffNurse: 'Nurse Marcus Holloway, RN (Trauma Bay 1)',
    resuscitationTeam: 'Code STEMI Rapid Response Team Alpha (Cath Lab On Standby)',

    // Investigations & Medications
    statInvestigations: [
      { test: 'STAT 12-Lead Electrocardiogram (ECG)', time: '08:18 AM', result: 'Hyperacute ST-elevation in Leads V1-V4 (Anterior STEMI)', status: 'Critical Alert Flagged' },
      { test: 'STAT Cardiac Troponin I (High Sensitivity)', time: '08:22 AM', result: '1.84 ng/mL (Significantly Elevated, Normal < 0.01)', status: 'Verified by Lab' },
      { test: 'Arterial Blood Gas (ABG)', time: '08:25 AM', result: 'pH: 7.34, pO2: 92, pCO2: 36, Lactate: 2.4 mmol/L', status: 'Completed' },
      { test: 'Point-of-Care Bedside Echocardiogram (POCUS)', time: '08:30 AM', result: 'Anterior wall hypokinesis, EF estimated ~45%', status: 'Done by Dr. Mitchell' }
    ],

    emergencyMedications: [
      { drug: 'Aspirin (Soluble / Chewable)', dose: '325 mg PO STAT', time: '08:19 AM', route: 'Oral', nurse: 'Nurse Marcus', status: 'Administered' },
      { drug: 'Ticagrelor (Loading Dose)', dose: '180 mg PO STAT', time: '08:20 AM', route: 'Oral', nurse: 'Nurse Marcus', status: 'Administered' },
      { drug: 'Sublingual Nitroglycerin', dose: '0.4 mg SL (Withheld after BP 88)', time: '08:22 AM', route: 'Sublingual', nurse: 'Nurse Marcus', status: 'Held due to Hypotension' },
      { drug: 'IV Unfractionated Heparin Bolus', dose: '5000 Units IV STAT', time: '08:26 AM', route: 'IV Bolus', nurse: 'Nurse Marcus', status: 'Administered' },
      { drug: 'IV Norepinephrine Infusion', dose: '0.05 mcg/kg/min (Titrated for MAP > 65)', time: '08:32 AM', route: 'IV Infusion via Pump', nurse: 'Nurse Marcus', status: 'Active Infusion' }
    ],

    // Procedures Management
    emergencyProcedures: [
      { procedure: 'Emergency Dual Peripheral IV Access (18G Bilateral)', time: '08:17 AM', performedBy: 'Nurse Marcus', notes: 'Successful on first attempt' },
      { procedure: 'Continuous 12-Lead Defibrillator Pad Placement', time: '08:18 AM', performedBy: 'Nurse Elena', notes: 'Zoll R-Series Defibrillator synch standby' },
      { procedure: 'Point-of-Care Ultrasound (POCUS / Cardiac Bedside)', time: '08:30 AM', performedBy: 'Dr. Sarah Mitchell', notes: 'R/O aortic dissection, confirmed LV wall motion deficit' }
    ],

    // Observation Management
    observation: {
      bedId: 'ER-RESUS-BAY-01',
      unit: 'Trauma & Resuscitation Unit (Red Bay)',
      durationInER: '1 Hour 12 Minutes',
      reassessmentVitals: 'BP 102/68 mmHg (Post-Norepi), HR 88 bpm, SpO2 99% on 2L O2, Pain 4/10',
      status: 'Stabilized for Emergency Cath Lab Transfer'
    },

    // Admission / Transfer / Referral
    disposition: {
      decision: 'Immediate Transfer to Cardiac Catheterization Suite (Primary PCI)',
      destinationUnit: 'Cardiac Cath Lab Suite 2 / Coronary Care Unit (CCU)',
      transitStatus: 'Patient in Transit with ER Transport Monitor & Defibrillator',
      receivingDoctor: 'Dr. Sarah Mitchell, MD & Cath Lab Team',
      timeOfDecision: '08:35 AM'
    },

    // Discharge
    discharge: {
      status: 'Transferred to Inpatient Cath Lab (Not Discharged Home)',
      dischargeDate: 'N/A (Admitted to Inpatient CCU)',
      summaryNotes: 'Emergency resuscitation successful. Door-to-Cath Lab time: 38 minutes (Exceeds 90-minute international benchmark).'
    },

    // Death documentation
    deathDocumentation: null
  },
  {
    erId: 'ER-2026-082',
    token: 'EM-YEL-03',
    uhid: 'UHID-MED-2026-03112',
    patientName: 'Robert Chen',
    age: 45,
    gender: 'Male',
    bloodGroup: 'B+',
    arrivalTime: 'Today, 09:30 AM',
    arrivalMode: 'Walk-In with Family',
    chiefComplaint: 'Acute sudden severe right lower quadrant abdominal pain, nausea, low-grade pyrexia',
    triageLevel: 'ESI-3',
    triageColor: '#ca8a04',
    triageCategory: 'Urgent',
    traumaScore: 'GCS: 15/15',

    initialVitals: {
      bp: '136/84 mmHg',
      hr: '92 bpm',
      temp: '100.4 °F',
      spo2: '99% on Room Air',
      rr: '18 breaths/min',
      bloodSugar: '98 mg/dL',
      painScore: '7/10',
      triageNurse: 'Nurse Elena Chen, RN'
    },

    attendingDoctor: 'Dr. Robert Miller, FACS (Emergency Surgeon)',
    consultantSpecialists: ['Dr. Kevin Zhao, MD'],
    assignedERStaffNurse: 'Nurse Amanda Scott, RN (Yellow Bay 4)',
    resuscitationTeam: 'Acute Abdomen Surgical Team',

    statInvestigations: [
      { test: 'STAT Complete Blood Count (CBC) with Diff', time: '09:40 AM', result: 'WBC: 16.2 x 10^3/uL (Leukocytosis with Neutrophilia 84%)', status: 'Verified' },
      { test: 'Contrast-Enhanced Abdominal & Pelvic CT Scan', time: '10:05 AM', result: 'Acutely dilated appendix (11mm), periappendiceal fat stranding, no perforation', status: 'Radiologist Verified' }
    ],

    emergencyMedications: [
      { drug: 'IV Ceftriaxone', dose: '1g IV STAT in 100mL NS', time: '09:50 AM', route: 'Intravenous', nurse: 'Nurse Amanda', status: 'Administered' },
      { drug: 'IV Metronidazole', dose: '500mg IV Infusion', time: '09:55 AM', route: 'Intravenous', nurse: 'Nurse Amanda', status: 'Administered' },
      { drug: 'IV Acetaminophen', dose: '1000mg IV Infusion for fever/pain', time: '10:00 AM', route: 'Intravenous', nurse: 'Nurse Amanda', status: 'Administered' }
    ],

    emergencyProcedures: [
      { procedure: 'Focused Abdominal Ultrasound & Palpation (McBurney / Rovsing Positive)', time: '09:45 AM', performedBy: 'Dr. Robert Miller', notes: 'Localized guarding present' },
      { procedure: 'Pre-Surgical Blood Typing & Cross-match (2 Units PRBC Reserved)', time: '10:10 AM', performedBy: 'Blood Bank Team', notes: 'Crossmatch completed' }
    ],

    observation: {
      bedId: 'ER-OBS-03',
      unit: 'Short Stay Observation Unit',
      durationInER: '2 Hours 15 Minutes',
      reassessmentVitals: 'BP 128/80 mmHg, HR 80 bpm, Temp 99.1 °F, Pain reduced to 4/10',
      status: 'Admitted for Emergency Laparoscopic Appendectomy'
    },

    disposition: {
      decision: 'Emergency Inpatient Surgical Admission (OT 2 Scheduled)',
      destinationUnit: 'Surgical OT 2 -> Surgical Ward B',
      transitStatus: 'Pre-Op Checklist Completed, OT Call Received',
      receivingDoctor: 'Dr. Robert Miller, FACS',
      timeOfDecision: '10:20 AM'
    },

    discharge: {
      status: 'Admitted to Inpatient Surgery (Not Discharged Home)',
      dischargeDate: 'Inpatient OT 2',
      summaryNotes: 'Emergency surgical admission for Acute Non-Perforated Appendicitis.'
    },

    deathDocumentation: null
  },
  {
    erId: 'ER-2026-079',
    token: 'EM-GRN-04',
    uhid: 'UHID-MED-2026-07741',
    patientName: 'Eleanor Vance',
    age: 62,
    gender: 'Female',
    bloodGroup: 'A+',
    arrivalTime: 'Yesterday, 04:30 PM',
    arrivalMode: 'Walk-In Ambulatory',
    chiefComplaint: 'Minor laceration on left dorsal forearm following domestic glass breakage',
    triageLevel: 'ESI-4',
    triageColor: '#16a34a',
    triageCategory: 'Less Urgent',
    traumaScore: 'GCS: 15/15',

    initialVitals: {
      bp: '128/82 mmHg',
      hr: '76 bpm',
      temp: '98.4 °F',
      spo2: '99% on Room Air',
      rr: '16 breaths/min',
      bloodSugar: '104 mg/dL',
      painScore: '3/10',
      triageNurse: 'Nurse Jessica Taylor'
    },

    attendingDoctor: 'Dr. Kevin Zhao, MD',
    consultantSpecialists: [],
    assignedERStaffNurse: 'Nurse Jessica Taylor',
    resuscitationTeam: 'Minor Trauma Green Zone',

    statInvestigations: [
      { test: 'Plain Radiograph Left Forearm (X-Ray)', time: '04:45 PM', result: 'No radiopaque foreign body or fracture', status: 'Normal' }
    ],

    emergencyMedications: [
      { drug: 'Tetanus Toxoid Booster (0.5mL IM)', time: '04:55 PM', route: 'Intramuscular', nurse: 'Nurse Jessica', status: 'Administered' },
      { drug: 'Lidocaine 1% with Epinephrine (Local infiltration)', time: '05:05 PM', route: 'Subcutaneous Local', nurse: 'Dr. Zhao', status: 'Administered' }
    ],

    emergencyProcedures: [
      { procedure: 'Wound Debridement, Irrigation with 500mL Saline & Layered Suture Repair (5-0 Ethilon, 4 Simple Interrupted Sutures)', time: '05:15 PM', performedBy: 'Dr. Kevin Zhao', notes: 'Clean margins, hemostasis achieved, sterile dressing' }
    ],

    observation: {
      bedId: 'ER-FAST-TRACK-02',
      unit: 'Fast-Track Ambulatory Clinic',
      durationInER: '1 Hour 30 Minutes',
      reassessmentVitals: 'BP 124/80 mmHg, HR 72 bpm, Pain 1/10',
      status: 'Ready for Home Discharge'
    },

    disposition: {
      decision: 'Discharged Home with Outpatient Follow-up',
      destinationUnit: 'Home (Self-Care)',
      transitStatus: 'Discharged',
      receivingDoctor: 'Outpatient Care',
      timeOfDecision: '06:00 PM'
    },

    discharge: {
      status: 'Discharged in Stable Condition',
      dischargeDate: 'Yesterday, 06:15 PM',
      summaryNotes: 'Laceration sutured. Keep wound dry for 48 hours. Suture removal in 7-10 days in OPD. Report if redness, warmth, or purulent drainage occurs.'
    },

    deathDocumentation: null
  },
  {
    erId: 'ER-2026-074',
    token: 'EM-BLK-01',
    uhid: 'UHID-MED-2026-01109',
    patientName: 'John Doe (Unidentified Trauma Victim #4)',
    age: 52,
    gender: 'Male',
    bloodGroup: 'Unknown (O- Emergency PRBC issued)',
    arrivalTime: 'Yesterday, 11:45 PM',
    arrivalMode: 'Police Highway Patrol Trauma Dispatch',
    chiefComplaint: 'Severe polytrauma following high-speed motor vehicle rollover collision. Asystole on scene.',
    triageLevel: 'Deceased',
    triageColor: '#1e293b',
    triageCategory: 'Expired / MLC Documentation',
    traumaScore: 'GCS: 3/15 (Flaccid, Fixed Dilated Pupils 7mm, Unresponsive)',

    initialVitals: {
      bp: 'Unrecordable / 0 mmHg',
      hr: '0 bpm (Asystole / Fine PEA)',
      temp: '95.2 °F (Hypothermic)',
      spo2: '0%',
      rr: 'Apneic',
      bloodSugar: '64 mg/dL',
      painScore: 'Unresponsive',
      triageNurse: 'Nurse Elena Chen, RN'
    },

    attendingDoctor: 'Dr. Alex Rivera, MD (Critical Care / Resuscitation Lead)',
    consultantSpecialists: ['Dr. Robert Miller, FACS (Trauma Surgeon)', 'Dr. Sarah Mitchell, MD'],
    assignedERStaffNurse: 'Nurse Marcus Holloway, RN',
    resuscitationTeam: 'Code Blue Resuscitation Crash Team 1',

    statInvestigations: [
      { test: 'STAT Bedside Cardiac Ultrasound / Subxiphoid View', time: '11:48 PM', result: 'Standstill / Zero cardiac contractility, bilateral hemothoraces', status: 'Documented' },
      { test: 'Arterial Blood Gas (Arrest Sample)', time: '11:52 PM', result: 'pH: 6.82, Lactate > 18 mmol/L, Severe refractory acidosis', status: 'Documented' }
    ],

    emergencyMedications: [
      { drug: 'IV Epinephrine 1mg (1:10,000)', dose: '1mg q3m x 5 doses (Total 5mg)', time: '11:48 PM', route: 'IV Push via IO access', nurse: 'Nurse Marcus', status: 'Administered per ACLS' },
      { drug: 'IV Sodium Bicarbonate 8.4%', dose: '100 mEq IV STAT', time: '11:55 PM', route: 'IV Push', nurse: 'Nurse Marcus', status: 'Administered' }
    ],

    emergencyProcedures: [
      { procedure: 'Immediate Endotracheal Intubation (7.5mm ETT with Video Laryngoscopy)', time: '11:47 PM', performedBy: 'Dr. Alex Rivera', notes: 'Tube verified via bilateral chest auscultation and colorimetric capnography' },
      { procedure: 'Advanced Cardiac Life Support (ACLS) CPR x 32 Minutes', time: '11:46 PM - 12:18 AM', performedBy: 'Code Blue Team', notes: 'High quality chest compressions, LUCAS device, bag-valve mask, 5 cycles ACLS' },
      { procedure: 'Bilateral Emergency Tube Thoracostomy (Chest Tube insertion)', time: '11:50 PM', performedBy: 'Dr. Robert Miller', notes: 'Massive hemothorax drained > 1500mL blood bilaterally' }
    ],

    observation: {
      bedId: 'ER-TRAUMA-RESUS-BAY',
      unit: 'Resuscitation Bay',
      durationInER: '45 Minutes',
      reassessmentVitals: 'Persistent Asystole across all leads. Zero neurological or pupillary reflexes.',
      status: 'Pronounced Deceased'
    },

    disposition: {
      decision: 'Mortuary Cold Storage / Medico-Legal Autopsy Handover',
      destinationUnit: 'Hospital Mortuary / Forensic Pathology Facility',
      transitStatus: 'Handed over to Forensic Custodian Officer',
      receivingDoctor: 'Dr. Nathan Reed (Medical Examiner / Pathologist)',
      timeOfDecision: '12:18 AM'
    },

    discharge: {
      status: 'Deceased / Medico-Legal Case (MLC)',
      dischargeDate: 'Today, 12:18 AM',
      summaryNotes: 'Resuscitation discontinued after 32 minutes of ACLS. Patient pronounced dead at 12:18 AM.'
    },

    // Death documentation
    deathDocumentation: {
      declaredTimeOfDeath: '03 Sep 2026 at 12:18 AM',
      pronouncingPhysician: 'Dr. Alex Rivera, MD (Lic #MD-55102)',
      witnessingPhysician: 'Dr. Robert Miller, FACS (Lic #MD-33190)',
      immediateCauseOfDeath: 'Refractory Traumatic Hemorrhagic Shock & Cardiac Standstill',
      antecedentCause: 'Massive Bilateral Hemothorax & Polytrauma (High-Speed Vehicular Rollover)',
      medicoLegalCaseNo: 'MLC-2026-08842',
      policeIntimationSent: 'Intimated to Central Traffic & Highway Police Precinct 4',
      coronerNotified: 'Yes (Coroner Case #COR-8842)',
      mortuaryHandoverTime: 'Today, 01:05 AM',
      personalEffectsLogged: 'Wallet, wrist watch, keys inventoried and sealed with hospital security'
    }
  }
];
