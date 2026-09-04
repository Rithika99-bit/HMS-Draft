import React, { createContext, useContext, useState } from 'react';
import {
  initialImagingTestMaster,
  initialImagingOrders,
  initialImagingReports,
  initialCriticalImagingFindings,
  initialImagingInvoices,
  initialRisAuditTrail,
  initialImagingStaff
} from '../data/imagingData';

const ImagingContext = createContext(null);

export function ImagingProvider({ children }) {
  const [testMaster, setTestMaster] = useState(initialImagingTestMaster);
  const [imagingOrders, setImagingOrders] = useState(initialImagingOrders);
  const [imagingReports, setImagingReports] = useState(initialImagingReports);
  const [criticalFindings, setCriticalFindings] = useState(initialCriticalImagingFindings);
  const [imagingInvoices, setImagingInvoices] = useState(initialImagingInvoices);
  const [risAuditTrail, setRisAuditTrail] = useState(initialRisAuditTrail);
  const [imagingStaff] = useState(initialImagingStaff);

  // ─── 1. AUDIT LOGGER ─────────────────────────────────────────────────────────
  const logRisAudit = ({ user, role, action, orderId, details }) => {
    const newAudit = {
      auditId: `RIS-AUD-${String(risAuditTrail.length + 10).padStart(3, '0')}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' +
        new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      user, role, action, orderId, details
    };
    setRisAuditTrail(prev => [newAudit, ...prev]);
    return newAudit;
  };

  // ─── 2. CREATE IMAGING ORDER ─────────────────────────────────────────────────
  const createImagingOrder = ({
    patientUhid = 'UHID-MED-2026-08942',
    patientName = 'Sarah Connor',
    patientAge = 38,
    patientGender = 'Female',
    testCode,
    clinicalIndication = 'Clinical evaluation',
    priority = 'Routine',
    drName = 'Dr. Sarah Mitchell, MD'
  }) => {
    const test = testMaster.find(t => t.testCode === testCode) || testMaster[0];
    const orderNum = String(imagingOrders.length + 40).padStart(4, '0');
    const orderId = `IMG-ORD-2026-${orderNum}`;
    const invoiceId = `INV-IMG-${orderNum}`;

    const newOrder = {
      orderId,
      patientUhid, patientName, patientAge, patientGender,
      prescribingDoctor: drName,
      orderDate: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      priority,
      modality: test.modality,
      testCode: test.testCode,
      testName: test.testName,
      bodyRegion: test.bodyRegion,
      clinicalIndication,
      status: 'Ordered (Pending Scheduling)',
      scheduledDate: null, scheduledRoom: null,
      assignedTechnician: null, assignedRadiologist: null,
      contrastUsed: test.contrastRequired ? 'Contrast Required (To Be Confirmed)' : 'None',
      studyInstanceUid: null,
      accessionNumber: `ACC-RIS-2026-${orderNum}`,
      reportStatus: 'Pending',
      isCritical: false, invoiceId,
      totalPrice: test.price
    };
    setImagingOrders(prev => [newOrder, ...prev]);

    // Auto-create invoice
    const newInvoice = {
      invoiceId, orderId, patientName, patientUhid,
      date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      testsTotal: test.price,
      tax: parseFloat((test.price * 0.05).toFixed(2)),
      insuranceCovered: parseFloat((test.price * 0.8).toFixed(2)),
      patientCopayDue: parseFloat((test.price * 0.25).toFixed(2)),
      paymentStatus: 'Pending Insurance Adjudication',
      status: 'Open'
    };
    setImagingInvoices(prev => [newInvoice, ...prev]);

    logRisAudit({
      user: drName, role: 'Prescribing Physician', action: 'ORDER_CREATED',
      orderId,
      details: `${priority} ${test.modality} order created for ${patientName}: ${test.testName}. Indication: ${clinicalIndication}`
    });

    return newOrder;
  };

  // ─── 3. SCHEDULE IMAGING STUDY ───────────────────────────────────────────────
  const scheduleImagingStudy = (orderId, scheduledDate, scheduledRoom, technicianId, radiologistId, actor = 'Scheduling Coordinator') => {
    const tech = imagingStaff.technicians.find(t => t.id === technicianId);
    const rad = imagingStaff.radiologists.find(r => r.id === radiologistId);

    setImagingOrders(prev => prev.map(o => {
      if (o.orderId === orderId) {
        return {
          ...o,
          status: 'Scheduled',
          scheduledDate,
          scheduledRoom,
          assignedTechnician: tech?.name || 'Assigned Technician',
          assignedRadiologist: rad?.name || 'Assigned Radiologist'
        };
      }
      return o;
    }));

    logRisAudit({
      user: actor, role: 'Scheduling Coordinator', action: 'STUDY_SCHEDULED',
      orderId,
      details: `Study scheduled for ${scheduledDate} in ${scheduledRoom}. Technician: ${tech?.name}. Radiologist: ${rad?.name}.`
    });
  };

  // ─── 4. MARK EXAM COMPLETE (TECHNICIAN) ──────────────────────────────────────
  const markExamComplete = (orderId, techNote = '', actor = 'RT James Vance, ARRT') => {
    const uid = `1.2.840.10008.5.1.4.1.1.2.${Date.now()}`;
    setImagingOrders(prev => prev.map(o => {
      if (o.orderId === orderId) {
        return {
          ...o,
          status: 'Exam Complete (Pending Report)',
          studyInstanceUid: uid,
          reportStatus: 'Pending Radiologist'
        };
      }
      return o;
    }));
    logRisAudit({
      user: actor, role: 'Radiology Technician', action: 'EXAM_COMPLETE',
      orderId,
      details: `Imaging acquisition complete. Images transferred to PACS (Study UID: ${uid}). ${techNote}`
    });
  };

  // ─── 5. SUBMIT RADIOLOGIST REPORT ────────────────────────────────────────────
  const submitRadiologistReport = ({
    orderId, findings, impression, isCritical = false,
    criticalFindingText = '',
    radiologist = 'Dr. Alan Graves, MD (Radiology)',
    signature = 'SIG-RAD-DR-GRAVES-88234',
    reportType = 'Final' // 'Preliminary' | 'Final'
  }) => {
    const order = imagingOrders.find(o => o.orderId === orderId);
    const signTime = 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const reportRecord = {
      orderId,
      patientName: order?.patientName || 'Patient',
      modality: order?.modality || 'Imaging',
      testName: order?.testName || 'Study',
      studyDate: order?.scheduledDate || 'Today',
      radiologist,
      radiologistSignature: reportType === 'Final' ? signature : 'Pending Final Sign-off',
      status: reportType,
      findings,
      impression,
      criticalFinding: isCritical,
      criticalFindingText,
      signedAt: reportType === 'Final' ? signTime : null,
      amendmentHistory: []
    };

    setImagingReports(prev => ({ ...prev, [orderId]: reportRecord }));

    setImagingOrders(prev => prev.map(o => {
      if (o.orderId === orderId) {
        return {
          ...o,
          status: reportType === 'Final' ? 'Report Ready' : 'Exam Complete (Pending Report)',
          reportStatus: reportType,
          isCritical,
          criticalFinding: isCritical ? criticalFindingText : null
        };
      }
      return o;
    }));

    // Auto-dispatch critical finding alert
    if (isCritical && reportType === 'Final') {
      const newFinding = {
        findingId: `CRIT-IMG-2026-${String(criticalFindings.length + 10).padStart(3, '0')}`,
        orderId,
        patientUhid: order?.patientUhid || 'UHID',
        patientName: order?.patientName || 'Patient',
        patientAge: order?.patientAge, patientGender: order?.patientGender,
        doctorName: order?.prescribingDoctor || 'Attending Physician',
        modality: order?.modality || 'Imaging',
        finding: criticalFindingText,
        severity: 'Life-Threatening',
        reportedBy: radiologist,
        reportedAt: signTime,
        status: 'Pending Acknowledgment',
        acknowledgedAt: null, clinicalActionTaken: null
      };
      setCriticalFindings(prev => [newFinding, ...prev]);

      logRisAudit({
        user: 'System RIS (Auto)', role: 'System', action: 'CRITICAL_FINDING_DISPATCHED',
        orderId, details: `Critical imaging finding auto-dispatched: ${criticalFindingText}`
      });
    }

    logRisAudit({
      user: radiologist, role: 'Radiologist',
      action: reportType === 'Final' ? 'FINAL_REPORT_SIGNED' : 'PRELIMINARY_REPORT_SUBMITTED',
      orderId,
      details: `${reportType} report submitted for ${order?.testName} (${order?.patientName}). ${isCritical ? 'CRITICAL FINDING FLAGGED!' : 'No critical findings.'}`
    });
  };

  // ─── 6. AMEND REPORT ─────────────────────────────────────────────────────────
  const amendReport = (orderId, amendedFindings, amendedImpression, reason, radiologist = 'Dr. Alan Graves, MD') => {
    setImagingReports(prev => {
      if (!prev[orderId]) return prev;
      const oldReport = prev[orderId];
      return {
        ...prev,
        [orderId]: {
          ...oldReport,
          status: 'Amended',
          findings: amendedFindings,
          impression: amendedImpression,
          amendmentHistory: [
            ...oldReport.amendmentHistory,
            {
              amendedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              amendedBy: radiologist,
              reason,
              previousFindings: oldReport.findings,
              previousImpression: oldReport.impression
            }
          ]
        }
      };
    });

    setImagingOrders(prev => prev.map(o =>
      o.orderId === orderId ? { ...o, reportStatus: 'Amended' } : o
    ));

    logRisAudit({
      user: radiologist, role: 'Radiologist', action: 'REPORT_AMENDED',
      orderId, details: `Report amended. Reason: ${reason}`
    });
  };

  // ─── 7. ACKNOWLEDGE CRITICAL FINDING ─────────────────────────────────────────
  const acknowledgeCriticalFinding = (findingId, doctorName, clinicalActionTaken) => {
    const ackTime = 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCriticalFindings(prev => prev.map(f => {
      if (f.findingId === findingId) {
        return { ...f, status: 'Acknowledged by Doctor', acknowledgedAt: ackTime, clinicalActionTaken };
      }
      return f;
    }));
    const finding = criticalFindings.find(f => f.findingId === findingId);
    logRisAudit({
      user: doctorName, role: 'Attending Physician', action: 'CRITICAL_FINDING_ACKNOWLEDGED',
      orderId: finding?.orderId || 'N/A',
      details: `Critical imaging finding acknowledged for ${finding?.patientName}. Clinical action: ${clinicalActionTaken}`
    });
  };

  // ─── 8. PACS / DICOM SYSTEM CONFIGURATION ──────────────────────────────────────
  const [pacsConfig, setPacsConfig] = useState({
    pacsAeTitle: 'MEDICARE_PACS_SERVER',
    pacsIpAddress: '192.168.10.45',
    dicomPort: 104,
    hl7FhirSync: true,
    autoRouting: true,
    storageTier: 'Hot Cloud Archive (Amazon S3 / DICOM Web)',
    retentionYears: 10
  });

  const updatePacsConfig = (newConfig, user = 'SuperAdmin IT Governance') => {
    setPacsConfig(prev => ({ ...prev, ...newConfig }));
    logRisAudit({
      user, role: 'SuperAdmin', action: 'PACS_CONFIG_UPDATED', orderId: 'N/A',
      details: `PACS/DICOM server settings updated: AE Title=${newConfig.pacsAeTitle || pacsConfig.pacsAeTitle}, Port=${newConfig.dicomPort || pacsConfig.dicomPort}`
    });
  };

  // ─── 9. TEST MASTER EDIT & TOGGLE STATUS ────────────────────────────────────
  const addImagingTest = (newTest) => {
    setTestMaster(prev => [newTest, ...prev]);
    logRisAudit({
      user: 'SuperAdmin Governance', role: 'SuperAdmin', action: 'TEST_MASTER_ADDED',
      orderId: 'N/A',
      details: `New imaging test added: ${newTest.testName} (${newTest.testCode}, ${newTest.modality})`
    });
  };

  const toggleTestStatus = (testCode) => {
    setTestMaster(prev => prev.map(t => {
      if (t.testCode === testCode) {
        const nextStatus = t.status === 'Active' ? 'Inactive' : 'Active';
        logRisAudit({
          user: 'SuperAdmin Governance', role: 'SuperAdmin', action: 'TEST_STATUS_TOGGLED',
          orderId: 'N/A', details: `Imaging test ${t.testName} (${testCode}) set to ${nextStatus}`
        });
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const updateImagingTest = (testCode, updatedFields) => {
    setTestMaster(prev => prev.map(t => {
      if (t.testCode === testCode) {
        const updated = { ...t, ...updatedFields };
        logRisAudit({
          user: 'SuperAdmin Governance', role: 'SuperAdmin', action: 'TEST_MASTER_UPDATED',
          orderId: 'N/A', details: `Imaging test ${t.testName} updated (Price: $${updated.price})`
        });
        return updated;
      }
      return t;
    }));
  };

  // ─── 10. CANCEL OR REJECT ORDER (ADMIN) ────────────────────────────────────
  const cancelImagingOrder = (orderId, reason = 'Clinical cancellation requested', actor = 'Radiology Admin') => {
    setImagingOrders(prev => prev.map(o => {
      if (o.orderId === orderId) {
        return { ...o, status: 'Cancelled / Rejected', reportStatus: 'Cancelled', cancellationReason: reason };
      }
      return o;
    }));
    logRisAudit({
      user: actor, role: 'Radiology Admin', action: 'ORDER_CANCELLED', orderId,
      details: `Order ${orderId} cancelled/rejected. Reason: ${reason}`
    });
  };

  // ─── 11. PAY IMAGING INVOICE (PATIENT / BILLING) ───────────────────────────
  const payImagingInvoice = (invoiceId, paymentMethod = 'Online Credit Card', actor = 'Patient Portal') => {
    setImagingInvoices(prev => prev.map(inv => {
      if (inv.invoiceId === invoiceId) {
        return { ...inv, paymentStatus: 'Paid in Full', status: 'Paid', paymentMethod, paidAt: new Date().toLocaleDateString() };
      }
      return inv;
    }));
    logRisAudit({
      user: actor, role: 'Patient / Billing', action: 'INVOICE_PAID', orderId: invoiceId,
      details: `Invoice ${invoiceId} paid in full via ${paymentMethod}`
    });
  };

  return (
    <ImagingContext.Provider value={{
      testMaster, imagingOrders, imagingReports,
      criticalFindings, imagingInvoices, risAuditTrail, imagingStaff,
      pacsConfig,
      // Actions
      createImagingOrder, scheduleImagingStudy, markExamComplete,
      submitRadiologistReport, amendReport, acknowledgeCriticalFinding,
      addImagingTest, toggleTestStatus, updateImagingTest,
      cancelImagingOrder, payImagingInvoice, updatePacsConfig, logRisAudit
    }}>
      {children}
    </ImagingContext.Provider>
  );
}

export function useImaging() {
  const context = useContext(ImagingContext);
  if (!context) throw new Error('useImaging must be used within an ImagingProvider');
  return context;
}
