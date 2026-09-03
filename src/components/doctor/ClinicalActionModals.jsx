import React, { useState } from 'react';
import { useEmr } from '../../context/EmrContext';
import { 
  X, Check, Plus, AlertTriangle, Pill, Activity, 
  FileText, Droplets, Scissors, Stethoscope, Sparkles,
  Lock, ShieldCheck
} from 'lucide-react';

export default function ClinicalActionModals({ 
  modalType, // 'diagnosis' | 'allergy' | 'medication' | 'vitals' | 'soap-note' | 'order-lab' | 'order-imaging' | 'procedure' | 'referral'
  isOpen, 
  onClose, 
  onShowToast,
  author = 'Dr. Sarah Mitchell, MD' 
}) {
  const { 
    addDiagnosis, 
    addAllergy, 
    prescribeMedication, 
    recordVitals, 
    createClinicalNote, 
    orderLab, 
    orderImaging, 
    documentProcedure 
  } = useEmr();

  // Diagnosis State
  const [diagForm, setDiagForm] = useState({
    condition: 'Hyperlipidemia / Dyslipidemia',
    icdCode: 'ICD-10 E78.5',
    severity: 'Moderate',
    status: 'Active / Managed',
    notes: 'Elevated LDL cholesterol on recent fasting lipid battery. Commenced on statin therapy.'
  });

  // Allergy State
  const [allergyForm, setAllergyForm] = useState({
    allergen: 'Sulfa Drugs (Sulfonamides)',
    category: 'Drug Allergy',
    severity: 'Critical / High Risk',
    reaction: 'Severe maculopapular rash and fever',
    status: 'Active - Strictly Contraindicated'
  });

  // Medication State
  const [medForm, setMedForm] = useState({
    drugName: 'Rosuvastatin',
    dosage: '10 mg',
    route: 'Oral Tablet',
    frequency: 'Once Daily at Bedtime',
    refills: '3',
    purpose: 'Hyperlipidemia & Cardiovascular primary prevention'
  });

  // Vitals State
  const [vitalsForm, setVitalsForm] = useState({
    bpSystolic: '124',
    bpDiastolic: '80',
    heartRate: '72',
    spo2: '99',
    temperature: '98.4',
    respiratoryRate: '16',
    heightCm: '168',
    weightKg: '63',
    bloodGlucose: '94',
    painScale: '0'
  });

  // SOAP Note State
  const [soapForm, setSoapForm] = useState({
    type: 'SOAP Outpatient Encounter Note',
    subjective: 'Patient reports feeling well with good exercise compliance. Denies chest pain, palpitation, or lightheadedness.',
    objective: 'BP 124/80, HR 72 bpm regular. Heart sounds S1 S2 clear. Lungs clear to auscultation bilaterally.',
    assessment: 'Essential Hypertension (ICD-10 I10) - Stable and controlled.\nCardiovascular primary prevention - Good response.',
    plan: '1. Continue current medical regimen.\n2. Recheck fasting lipid panel in 6 months.\n3. Return to clinic in 6 months.',
    isSigned: true
  });

  // Lab Order State
  const [labForm, setLabForm] = useState({
    testName: 'High-Sensitivity C-Reactive Protein (hs-CRP) + HbA1c',
    modality: 'Clinical Biochemistry',
    priority: 'Routine',
    specimen: 'Venous Blood',
    clinicalNotes: 'Cardiovascular inflammation biomarker monitoring.'
  });

  // Imaging Order State
  const [imgForm, setImgForm] = useState({
    testName: 'Coronary Calcium Scan (CT Calcium Score)',
    modality: 'Computed Tomography (CT)',
    priority: 'Routine',
    bodyRegion: 'Cardiac / Thoracic',
    clinicalIndication: 'Cardiovascular atherosclerotic plaque quantification.'
  });

  // Procedure State
  const [procForm, setProcForm] = useState({
    procedureName: 'Diagnostic Echocardiogram with Strain Imaging',
    indication: 'Routine assessment of left ventricular longitudinal strain',
    implants: 'None',
    outcome: 'Completed successfully with normal global longitudinal strain (-19.8%).'
  });

  if (!isOpen) return null;

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalType === 'diagnosis') {
      addDiagnosis(diagForm, author, 'Clinician added diagnosis in patient chart');
      if (onShowToast) onShowToast(`Diagnosis "${diagForm.condition}" added & versioned!`, 'success');
    } else if (modalType === 'allergy') {
      addAllergy(allergyForm, author, 'Clinician recorded allergy warning');
      if (onShowToast) onShowToast(`Allergy alert "${allergyForm.allergen}" recorded!`, 'success');
    } else if (modalType === 'medication') {
      prescribeMedication(medForm, author, 'E-Prescription written by clinician');
      if (onShowToast) onShowToast(`Prescription for "${medForm.drugName} ${medForm.dosage}" generated!`, 'success');
    } else if (modalType === 'vitals') {
      recordVitals(vitalsForm, author);
      if (onShowToast) onShowToast(`Vitals (BP ${vitalsForm.bpSystolic}/${vitalsForm.bpDiastolic}) recorded in chart!`, 'success');
    } else if (modalType === 'soap-note') {
      createClinicalNote(soapForm, author);
      if (onShowToast) onShowToast(`SOAP Note ${soapForm.isSigned ? 'signed & locked' : 'saved as draft'}!`, 'success');
    } else if (modalType === 'order-lab') {
      orderLab(labForm, author);
      if (onShowToast) onShowToast(`Lab order placed: "${labForm.testName}"`, 'success');
    } else if (modalType === 'order-imaging') {
      orderImaging(imgForm, author);
      if (onShowToast) onShowToast(`Imaging order placed: "${imgForm.testName}"`, 'success');
    } else if (modalType === 'procedure') {
      documentProcedure(procForm, author);
      if (onShowToast) onShowToast(`Procedure "${procForm.procedureName}" documented!`, 'success');
    }

    onClose();
  };

  // Helper title & icon
  const getModalMeta = () => {
    switch (modalType) {
      case 'diagnosis': return { title: 'Add Clinical Diagnosis', icon: <Stethoscope size={20} color="#ec4899" /> };
      case 'allergy': return { title: 'Record Critical Allergy Alert', icon: <AlertTriangle size={20} color="#ef4444" /> };
      case 'medication': return { title: 'Prescribe New Medication (E-Rx)', icon: <Pill size={20} color="#10b981" /> };
      case 'vitals': return { title: 'Record Patient Vitals & Biometrics', icon: <Activity size={20} color="#0284c7" /> };
      case 'soap-note': return { title: 'Clinical Documentation Studio (SOAP Note)', icon: <FileText size={20} color="#8b5cf6" /> };
      case 'order-lab': return { title: 'Order Laboratory Diagnostic Panel', icon: <Droplets size={20} color="#06b6d4" /> };
      case 'order-imaging': return { title: 'Order Diagnostic Imaging & Radiology', icon: <Activity size={20} color="#0d9488" /> };
      case 'procedure': return { title: 'Document Clinical Procedure', icon: <Scissors size={20} color="#f59e0b" /> };
      default: return { title: 'Clinical Action', icon: <Activity size={20} /> };
    }
  };

  const meta = getModalMeta();

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="modal-content-card" 
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: modalType === 'soap-note' ? '780px' : '580px', width: '94%', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {meta.icon}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>{meta.title}</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>Author: <strong>{author}</strong> • Shared Patient Record</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* 1. DIAGNOSIS FORM */}
          {modalType === 'diagnosis' && (
            <>
              <div>
                <label className="form-label">Condition / Disease Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={diagForm.condition} 
                  onChange={e => setDiagForm({ ...diagForm, condition: e.target.value })} 
                  required 
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">ICD-10 Code</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={diagForm.icdCode} 
                    onChange={e => setDiagForm({ ...diagForm, icdCode: e.target.value })} 
                    placeholder="e.g. ICD-10 E78.5" 
                  />
                </div>
                <div>
                  <label className="form-label">Severity</label>
                  <select 
                    className="form-input" 
                    value={diagForm.severity} 
                    onChange={e => setDiagForm({ ...diagForm, severity: e.target.value })}
                  >
                    <option value="Mild">Mild</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Severe">Severe</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">Clinical Status</label>
                <select 
                  className="form-input" 
                  value={diagForm.status} 
                  onChange={e => setDiagForm({ ...diagForm, status: e.target.value })}
                >
                  <option value="Active / Managed">Active / Managed</option>
                  <option value="Active / Uncontrolled">Active / Uncontrolled</option>
                  <option value="In Remission">In Remission</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
              <div>
                <label className="form-label">Clinical Notes & Findings</label>
                <textarea 
                  className="form-input" 
                  rows="3" 
                  value={diagForm.notes} 
                  onChange={e => setDiagForm({ ...diagForm, notes: e.target.value })} 
                />
              </div>
            </>
          )}

          {/* 2. ALLERGY FORM */}
          {modalType === 'allergy' && (
            <>
              <div>
                <label className="form-label">Allergen / Substance Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={allergyForm.allergen} 
                  onChange={e => setAllergyForm({ ...allergyForm, allergen: e.target.value })} 
                  required 
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">Category</label>
                  <select 
                    className="form-input" 
                    value={allergyForm.category} 
                    onChange={e => setAllergyForm({ ...allergyForm, category: e.target.value })}
                  >
                    <option value="Drug Allergy">Drug Allergy</option>
                    <option value="Food Allergy">Food Allergy</option>
                    <option value="Environmental">Environmental</option>
                    <option value="Medical Device / Latex">Medical Device / Latex</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Severity Level</label>
                  <select 
                    className="form-input" 
                    value={allergyForm.severity} 
                    onChange={e => setAllergyForm({ ...allergyForm, severity: e.target.value })}
                  >
                    <option value="Critical / High Risk">Critical / High Risk (Anaphylaxis)</option>
                    <option value="Moderate">Moderate (Urticaria / Angioedema)</option>
                    <option value="Mild">Mild (Localized rash / itching)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">Allergic Reaction Description</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={allergyForm.reaction} 
                  onChange={e => setAllergyForm({ ...allergyForm, reaction: e.target.value })} 
                  required 
                />
              </div>
            </>
          )}

          {/* 3. MEDICATION FORM */}
          {modalType === 'medication' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">Drug Name (Generic / Brand)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={medForm.drugName} 
                    onChange={e => setMedForm({ ...medForm, drugName: e.target.value })} 
                    required 
                  />
                </div>
                <div>
                  <label className="form-label">Dosage</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={medForm.dosage} 
                    onChange={e => setMedForm({ ...medForm, dosage: e.target.value })} 
                    placeholder="e.g. 10 mg" 
                    required 
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">Route of Administration</label>
                  <select 
                    className="form-input" 
                    value={medForm.route} 
                    onChange={e => setMedForm({ ...medForm, route: e.target.value })}
                  >
                    <option value="Oral Tablet">Oral Tablet</option>
                    <option value="Oral Capsule">Oral Capsule</option>
                    <option value="Inhalation">Inhalation (MDI / Nebulizer)</option>
                    <option value="Subcutaneous Injection">Subcutaneous Injection</option>
                    <option value="Intravenous (IV)">Intravenous (IV)</option>
                    <option value="Topical">Topical</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Frequency / Schedule</label>
                  <select 
                    className="form-input" 
                    value={medForm.frequency} 
                    onChange={e => setMedForm({ ...medForm, frequency: e.target.value })}
                  >
                    <option value="Once Daily at Bedtime">Once Daily at Bedtime</option>
                    <option value="Once Daily in the Morning">Once Daily in the Morning</option>
                    <option value="Twice Daily (BID) with food">Twice Daily (BID) with food</option>
                    <option value="Three Times Daily (TID)">Three Times Daily (TID)</option>
                    <option value="As Needed (PRN) for pain">As Needed (PRN) for pain</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div>
                  <label className="form-label">Authorized Refills</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="12" 
                    className="form-input" 
                    value={medForm.refills} 
                    onChange={e => setMedForm({ ...medForm, refills: e.target.value })} 
                  />
                </div>
                <div>
                  <label className="form-label">Indication / Purpose</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={medForm.purpose} 
                    onChange={e => setMedForm({ ...medForm, purpose: e.target.value })} 
                  />
                </div>
              </div>
            </>
          )}

          {/* 4. VITALS FORM */}
          {modalType === 'vitals' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">BP Systolic (mm Hg)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={vitalsForm.bpSystolic} 
                    onChange={e => setVitalsForm({ ...vitalsForm, bpSystolic: e.target.value })} 
                  />
                </div>
                <div>
                  <label className="form-label">BP Diastolic (mm Hg)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={vitalsForm.bpDiastolic} 
                    onChange={e => setVitalsForm({ ...vitalsForm, bpDiastolic: e.target.value })} 
                  />
                </div>
                <div>
                  <label className="form-label">Heart Rate (BPM)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={vitalsForm.heartRate} 
                    onChange={e => setVitalsForm({ ...vitalsForm, heartRate: e.target.value })} 
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">SpO2 Oxygen (%)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={vitalsForm.spo2} 
                    onChange={e => setVitalsForm({ ...vitalsForm, spo2: e.target.value })} 
                  />
                </div>
                <div>
                  <label className="form-label">Temperature (°F)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    className="form-input" 
                    value={vitalsForm.temperature} 
                    onChange={e => setVitalsForm({ ...vitalsForm, temperature: e.target.value })} 
                  />
                </div>
                <div>
                  <label className="form-label">Resp. Rate (/min)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={vitalsForm.respiratoryRate} 
                    onChange={e => setVitalsForm({ ...vitalsForm, respiratoryRate: e.target.value })} 
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">Height (cm)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={vitalsForm.heightCm} 
                    onChange={e => setVitalsForm({ ...vitalsForm, heightCm: e.target.value })} 
                  />
                </div>
                <div>
                  <label className="form-label">Weight (kg)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={vitalsForm.weightKg} 
                    onChange={e => setVitalsForm({ ...vitalsForm, weightKg: e.target.value })} 
                  />
                </div>
                <div>
                  <label className="form-label">Blood Glucose (mg/dL)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={vitalsForm.bloodGlucose} 
                    onChange={e => setVitalsForm({ ...vitalsForm, bloodGlucose: e.target.value })} 
                  />
                </div>
              </div>
            </>
          )}

          {/* 5. SOAP NOTE FORM */}
          {modalType === 'soap-note' && (
            <>
              <div>
                <label className="form-label">Encounter Note Type</label>
                <select 
                  className="form-input" 
                  value={soapForm.type} 
                  onChange={e => setSoapForm({ ...soapForm, type: e.target.value })}
                >
                  <option value="SOAP Outpatient Encounter Note">SOAP Outpatient Encounter Note</option>
                  <option value="Cardiology Specialist Progress Note">Cardiology Specialist Progress Note</option>
                  <option value="Pre-Operative Assessment Note">Pre-Operative Assessment Note</option>
                  <option value="Discharge Summary Note">Discharge Summary Note</option>
                </select>
              </div>
              <div>
                <label className="form-label" style={{ color: '#0284c7', fontWeight: 700 }}>[S] Subjective (Chief Complaint & History)</label>
                <textarea 
                  className="form-input" 
                  rows="2" 
                  value={soapForm.subjective} 
                  onChange={e => setSoapForm({ ...soapForm, subjective: e.target.value })} 
                />
              </div>
              <div>
                <label className="form-label" style={{ color: '#16a34a', fontWeight: 700 }}>[O] Objective (Physical Exam & Diagnostic Data)</label>
                <textarea 
                  className="form-input" 
                  rows="2" 
                  value={soapForm.objective} 
                  onChange={e => setSoapForm({ ...soapForm, objective: e.target.value })} 
                />
              </div>
              <div>
                <label className="form-label" style={{ color: '#d97706', fontWeight: 700 }}>[A] Assessment (Clinical Diagnoses & Progress)</label>
                <textarea 
                  className="form-input" 
                  rows="2" 
                  value={soapForm.assessment} 
                  onChange={e => setSoapForm({ ...soapForm, assessment: e.target.value })} 
                />
              </div>
              <div>
                <label className="form-label" style={{ color: '#7c3aed', fontWeight: 700 }}>[P] Plan (Orders, Therapy & Follow-up)</label>
                <textarea 
                  className="form-input" 
                  rows="2" 
                  value={soapForm.plan} 
                  onChange={e => setSoapForm({ ...soapForm, plan: e.target.value })} 
                />
              </div>
              <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="#16a34a" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                    Digitally sign & cryptographically lock note on submission
                  </span>
                </div>
                <input 
                  type="checkbox" 
                  checked={soapForm.isSigned} 
                  onChange={e => setSoapForm({ ...soapForm, isSigned: e.target.checked })} 
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }} 
                />
              </div>
            </>
          )}

          {/* 6. ORDER LAB FORM */}
          {modalType === 'order-lab' && (
            <>
              <div>
                <label className="form-label">Laboratory Diagnostic Test</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={labForm.testName} 
                  onChange={e => setLabForm({ ...labForm, testName: e.target.value })} 
                  required 
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">Priority</label>
                  <select 
                    className="form-input" 
                    value={labForm.priority} 
                    onChange={e => setLabForm({ ...labForm, priority: e.target.value })}
                  >
                    <option value="Routine">Routine (Turnaround 2-4 hrs)</option>
                    <option value="Urgent">Urgent (Turnaround 1 hr)</option>
                    <option value="STAT">STAT Emergency (Turnaround 20 mins)</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Specimen</label>
                  <select 
                    className="form-input" 
                    value={labForm.specimen} 
                    onChange={e => setLabForm({ ...labForm, specimen: e.target.value })}
                  >
                    <option value="Venous Blood">Venous Blood</option>
                    <option value="Arterial Blood Gas (ABG)">Arterial Blood Gas (ABG)</option>
                    <option value="Clean Catch Urine">Clean Catch Urine</option>
                    <option value="Serum / Plasma">Serum / Plasma</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">Clinical Indication / Reason</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={labForm.clinicalNotes} 
                  onChange={e => setLabForm({ ...labForm, clinicalNotes: e.target.value })} 
                />
              </div>
            </>
          )}

          {/* 7. ORDER IMAGING FORM */}
          {modalType === 'order-imaging' && (
            <>
              <div>
                <label className="form-label">Imaging / Radiology Procedure</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={imgForm.testName} 
                  onChange={e => setImgForm({ ...imgForm, testName: e.target.value })} 
                  required 
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">Modality</label>
                  <select 
                    className="form-input" 
                    value={imgForm.modality} 
                    onChange={e => setImgForm({ ...imgForm, modality: e.target.value })}
                  >
                    <option value="Computed Tomography (CT)">Computed Tomography (CT)</option>
                    <option value="Magnetic Resonance Imaging (MRI)">Magnetic Resonance Imaging (MRI)</option>
                    <option value="Digital Radiograph (X-Ray)">Digital Radiograph (X-Ray)</option>
                    <option value="Ultrasound / Doppler">Ultrasound / Doppler</option>
                    <option value="Echocardiogram (2D Echo)">Echocardiogram (2D Echo)</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Priority</label>
                  <select 
                    className="form-input" 
                    value={imgForm.priority} 
                    onChange={e => setImgForm({ ...imgForm, priority: e.target.value })}
                  >
                    <option value="Routine">Routine</option>
                    <option value="Urgent">Urgent</option>
                    <option value="STAT">STAT Emergency</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">Body Region / Anatomical Target</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={imgForm.bodyRegion} 
                  onChange={e => setImgForm({ ...imgForm, bodyRegion: e.target.value })} 
                />
              </div>
            </>
          )}

          {/* 8. PROCEDURE FORM */}
          {modalType === 'procedure' && (
            <>
              <div>
                <label className="form-label">Procedure Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={procForm.procedureName} 
                  onChange={e => setProcForm({ ...procForm, procedureName: e.target.value })} 
                  required 
                />
              </div>
              <div>
                <label className="form-label">Clinical Indication</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={procForm.indication} 
                  onChange={e => setProcForm({ ...procForm, indication: e.target.value })} 
                  required 
                />
              </div>
              <div>
                <label className="form-label">Implants / Devices Used</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={procForm.implants} 
                  onChange={e => setProcForm({ ...procForm, implants: e.target.value })} 
                />
              </div>
              <div>
                <label className="form-label">Outcome & Immediate Findings</label>
                <textarea 
                  className="form-input" 
                  rows="2" 
                  value={procForm.outcome} 
                  onChange={e => setProcForm({ ...procForm, outcome: e.target.value })} 
                />
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary btn-sm" 
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Check size={16} /> Save to Shared EHR Chart
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
