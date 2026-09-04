import React, { createContext, useContext, useState } from 'react';
import {
  initialOtSuites,
  initialProcedureMaster,
  initialAnaesthesiaTypes,
  asaClassifications,
  initialOtImplants,
  initialOtConsumables,
  initialSurgicalCases,
  initialOtInvoices,
  initialOtAuditTrail
} from '../data/otData';

const OtContext = createContext(null);

export function OtProvider({ children }) {
  const [otSuites, setOtSuites] = useState(initialOtSuites);
  const [procedureMaster, setProcedureMaster] = useState(initialProcedureMaster);
  const [anaesthesiaTypes] = useState(initialAnaesthesiaTypes);
  const [otImplants, setOtImplants] = useState(initialOtImplants);
  const [otConsumables, setOtConsumables] = useState(initialOtConsumables);
  const [surgicalCases, setSurgicalCases] = useState(initialSurgicalCases);
  const [otInvoices, setOtInvoices] = useState(initialOtInvoices);
  const [otAuditTrail, setOtAuditTrail] = useState(initialOtAuditTrail);

  // ─── 1. AUDIT LOGGER ─────────────────────────────────────────────────────────
  const logOtAudit = ({ user, role, action, caseId = 'N/A', details }) => {
    const newLog = {
      auditId: `OT-AUD-${String(otAuditTrail.length + 10).padStart(3, '0')}`,
      timestamp: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user, role, action, caseId, details
    };
    setOtAuditTrail(prev => [newLog, ...prev]);
    return newLog;
  };

  // ─── 2. CREATE SURGERY REQUEST (SURGEON) ──────────────────────────────────────
  const createSurgeryRequest = ({
    patientUhid = 'UHID-MED-2026-08942',
    patientName = 'Sarah Connor',
    patientAge = 38,
    patientGender = 'Female',
    procCode = 'SURG-CABG-01',
    priority = 'Routine',
    preopDiagnosis = 'Clinical evaluation',
    requestingDoctor = 'Dr. Sarah Mitchell, MD',
    preferredOtRoom = 'OT Suite A (Cardiothoracic & Vascular)',
    preferredDate = 'Tomorrow, 09:00 AM'
  }) => {
    const proc = procedureMaster.find(p => p.procCode === procCode) || procedureMaster[0];
    const caseNum = String(surgicalCases.length + 84).padStart(4, '0');
    const caseId = `SURG-2026-${caseNum}`;
    const invoiceId = `INV-OT-${caseNum}`;

    const newCase = {
      caseId, patientUhid, patientName, patientAge, patientGender,
      procCode: proc.procCode, procedureName: proc.name, category: proc.category,
      priority, preopDiagnosis, requestingDoctor,
      scheduledOtRoom: preferredOtRoom, scheduledDate: preferredDate,
      estDurationMins: proc.estDurationMins,
      status: 'Scheduled (Pre-Op Clearance)',
      preopClearance: {
        cardiologyCleared: true, anaesthesiaCleared: false, consentSigned: false,
        bloodReserved: 'Crossmatch Pending', npoHours: 8
      },
      surgicalTeam: {
        primarySurgeon: requestingDoctor,
        assistantSurgeon: 'Assigned Assistant MD',
        anaesthetist: 'Dr. Robert Chen, MD (Consultant Anaesthesiologist)',
        scrubNurse: 'Sister Sarah Connor, RN',
        circulatingNurse: 'Nurse Maya Patel, RN',
        otTechnician: 'Tech Alex Rivera'
      },
      anaesthesiaRecord: null,
      whoSafetyChecklist: { signInCompleted: false, timeOutCompleted: false, signOutCompleted: false },
      instrumentCount: null, operativeNotes: null, implantsUsed: [],
      invoiceId, totalPrice: proc.baseCost
    };

    setSurgicalCases(prev => [newCase, ...prev]);

    // Auto-create initial invoice
    const newInv = {
      invoiceId, caseId, patientName, patientUhid,
      date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      procedureCost: proc.baseCost, otRoomFee: 800.00, anaesthesiaFee: 900.00,
      surgeonFee: 3000.00, implantCost: 0, totalPrice: proc.baseCost + 4700.00,
      insuranceCovered: parseFloat(((proc.baseCost + 4700.00) * 0.8).toFixed(2)),
      patientCopayDue: parseFloat(((proc.baseCost + 4700.00) * 0.2).toFixed(2)),
      paymentStatus: 'Pending Clearance', status: 'Open'
    };
    setOtInvoices(prev => [newInv, ...prev]);

    logOtAudit({
      user: requestingDoctor, role: 'Primary Surgeon', action: 'SURGERY_REQUESTED',
      caseId, details: `Surgery request created for ${patientName}: ${proc.name} (${priority})`
    });

    return newCase;
  };

  // ─── 3. SCHEDULE / ASSIGN OT SUITE & TEAM (OT ADMIN) ─────────────────────────
  const scheduleSurgeryCase = (caseId, scheduledOtRoom, scheduledDate, teamMembers, actor = 'OT Admin') => {
    setSurgicalCases(prev => prev.map(c => {
      if (c.caseId === caseId) {
        return {
          ...c,
          scheduledOtRoom,
          scheduledDate,
          surgicalTeam: { ...c.surgicalTeam, ...teamMembers },
          status: 'Scheduled (Pre-Op Clearance)'
        };
      }
      return c;
    }));

    logOtAudit({
      user: actor, role: 'OT Admin', action: 'CASE_SCHEDULED', caseId,
      details: `Scheduled ${caseId} in ${scheduledOtRoom} for ${scheduledDate}.`
    });
  };

  // ─── 4. UPDATE CASE STATUS ───────────────────────────────────────────────────
  const updateCaseStatus = (caseId, newStatus, actor = 'OT Operations') => {
    setSurgicalCases(prev => prev.map(c => (c.caseId === caseId ? { ...c, status: newStatus } : c)));
    logOtAudit({
      user: actor, role: 'OT Staff', action: 'STATUS_UPDATED', caseId,
      details: `Case ${caseId} transition to status: ${newStatus}`
    });
  };

  // ─── 5. SUBMIT ANAESTHESIA RECORD (ANAESTHETIST) ─────────────────────────────
  const submitAnaesthesiaRecord = (caseId, asaClass, type, airwayGrade, drugItem, vitalsLog, pacuHandoverNotes, anaesthetist = 'Dr. Robert Chen, MD') => {
    setSurgicalCases(prev => prev.map(c => {
      if (c.caseId === caseId) {
        const existingRecord = c.anaesthesiaRecord || {
          asaClass: 'ASA-2', type, airwayGrade: 'Mallampati Class I',
          drugsAdministered: [], vitalsLog: '', pacuHandoverNotes: ''
        };
        const updatedDrugs = drugItem ? [...existingRecord.drugsAdministered, drugItem] : existingRecord.drugsAdministered;
        return {
          ...c,
          anaesthesiaRecord: {
            asaClass: asaClass || existingRecord.asaClass,
            type: type || existingRecord.type,
            airwayGrade: airwayGrade || existingRecord.airwayGrade,
            drugsAdministered: updatedDrugs,
            vitalsLog: vitalsLog || existingRecord.vitalsLog,
            pacuHandoverNotes: pacuHandoverNotes || existingRecord.pacuHandoverNotes
          }
        };
      }
      return c;
    }));

    logOtAudit({
      user: anaesthetist, role: 'Anaesthetist', action: 'ANAESTHESIA_RECORDED', caseId,
      details: `Anaesthesia record updated for ${caseId}. ASA Class: ${asaClass}, Type: ${type}`
    });
  };

  // ─── 6. SUBMIT WHO SAFETY CHECKLIST (NURSE) ──────────────────────────────────
  const submitWhoSafetyChecklist = (caseId, checkType, nurseName = 'Sister Sarah Connor, RN') => {
    // checkType: 'signInCompleted' | 'timeOutCompleted' | 'signOutCompleted'
    setSurgicalCases(prev => prev.map(c => {
      if (c.caseId === caseId) {
        return {
          ...c,
          whoSafetyChecklist: { ...c.whoSafetyChecklist, [checkType]: true }
        };
      }
      return c;
    }));

    logOtAudit({
      user: nurseName, role: 'OT Scrub Nurse', action: `WHO_${checkType.toUpperCase()}_COMPLETED`, caseId,
      details: `WHO Surgical Safety Checklist (${checkType}) verified.`
    });
  };

  // ─── 7. SUBMIT INSTRUMENT COUNT (NURSE) ──────────────────────────────────────
  const submitInstrumentCount = (caseId, countData, nurseName = 'Sister Sarah Connor, RN') => {
    setSurgicalCases(prev => prev.map(c => (c.caseId === caseId ? { ...c, instrumentCount: { ...countData, verifiedByNurse: nurseName } } : c)));
    logOtAudit({
      user: nurseName, role: 'OT Scrub Nurse', action: 'INSTRUMENT_COUNT_VERIFIED', caseId,
      details: `Instrument, sponge, and needle count 100% matched baseline.`
    });
  };

  // ─── 8. SUBMIT OPERATIVE NOTES (SURGEON) ─────────────────────────────────────
  const submitOperativeNote = (caseId, notesData, surgeonName = 'Dr. Sarah Mitchell, MD') => {
    const signedAt = 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSurgicalCases(prev => prev.map(c => {
      if (c.caseId === caseId) {
        return {
          ...c,
          status: 'Completed (In PACU Recovery)',
          operativeNotes: { ...notesData, signedBySurgeon: surgeonName, signedAt }
        };
      }
      return c;
    }));

    logOtAudit({
      user: surgeonName, role: 'Primary Surgeon', action: 'OPERATIVE_NOTE_SIGNED', caseId,
      details: `Operative note completed & digitally signed for case ${caseId}.`
    });
  };

  // ─── 9. RECORD IMPLANT USAGE & DEDUCT INVENTORY ──────────────────────────────
  const recordImplantUsage = (caseId, implantId, serialLotNumber, cost, actor = 'OT Admin / Nurse') => {
    const implant = otImplants.find(i => i.implantId === implantId);
    const implantName = implant ? implant.name : 'Surgical Implant';

    setSurgicalCases(prev => prev.map(c => {
      if (c.caseId === caseId) {
        const newImplant = { implantId, name: implantName, serialLotNumber, quantity: 1, cost };
        return { ...c, implantsUsed: [...c.implantsUsed, newImplant] };
      }
      return c;
    }));

    // Update OT invoice
    setOtInvoices(prev => prev.map(inv => {
      if (inv.caseId === caseId) {
        const newImplantTotal = (inv.implantCost || 0) + cost;
        const newGrossTotal = inv.totalPrice + cost;
        return {
          ...inv,
          implantCost: newImplantTotal,
          totalPrice: newGrossTotal,
          patientCopayDue: parseFloat((newGrossTotal * 0.2).toFixed(2))
        };
      }
      return inv;
    }));

    logOtAudit({
      user: actor, role: 'OT Inventory', action: 'IMPLANT_RECORDED', caseId,
      details: `Implant ${implantName} (Lot/Serial: ${serialLotNumber}) recorded & deducted from stock.`
    });
  };

  // ─── 10. PAY OT INVOICE (PATIENT) ────────────────────────────────────────────
  const payOtInvoice = (invoiceId, paymentMethod = 'Online Credit Card', actor = 'Patient Portal') => {
    setOtInvoices(prev => prev.map(inv => {
      if (inv.invoiceId === invoiceId) {
        return { ...inv, paymentStatus: 'Paid in Full', status: 'Paid', paymentMethod, paidAt: new Date().toLocaleDateString() };
      }
      return inv;
    }));

    logOtAudit({
      user: actor, role: 'Patient / Billing', action: 'OT_INVOICE_PAID', caseId: invoiceId,
      details: `OT Invoice ${invoiceId} paid in full via ${paymentMethod}`
    });
  };

  return (
    <OtContext.Provider value={{
      otSuites, procedureMaster, anaesthesiaTypes, asaClassifications,
      otImplants, otConsumables, surgicalCases, otInvoices, otAuditTrail,
      // Actions
      createSurgeryRequest, scheduleSurgeryCase, updateCaseStatus,
      submitAnaesthesiaRecord, submitWhoSafetyChecklist, submitInstrumentCount,
      submitOperativeNote, recordImplantUsage, payOtInvoice, logOtAudit
    }}>
      {children}
    </OtContext.Provider>
  );
}

export function useOt() {
  const context = useContext(OtContext);
  if (!context) throw new Error('useOt must be used within an OtProvider');
  return context;
}
