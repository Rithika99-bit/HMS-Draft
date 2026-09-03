import React, { createContext, useContext, useState } from 'react';
import { 
  initialTestMaster, 
  initialSampleTypes, 
  initialAnalyzers, 
  initialLabOrders, 
  initialLabResults, 
  initialCriticalAlerts, 
  initialLabInvoices, 
  initialLisAuditTrail 
} from '../data/labData';

const LabContext = createContext(null);

export function LabProvider({ children }) {
  const [testMaster, setTestMaster] = useState(initialTestMaster);
  const [sampleTypes, setSampleTypes] = useState(initialSampleTypes);
  const [analyzers, setAnalyzers] = useState(initialAnalyzers);
  const [labOrders, setLabOrders] = useState(initialLabOrders);
  const [labResults, setLabResults] = useState(initialLabResults);
  const [criticalAlerts, setCriticalAlerts] = useState(initialCriticalAlerts);
  const [labInvoices, setLabInvoices] = useState(initialLabInvoices);
  const [lisAuditTrail, setLisAuditTrail] = useState(initialLisAuditTrail);

  // ─── 1. AUDIT LOGGER ──────────────────────────────────────────────────
  const logLisAudit = ({ user, role, action, orderId, details }) => {
    const newAudit = {
      auditId: `LIS-AUD-${lisAuditTrail.length + 992}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      user,
      role,
      action, // 'ORDER_CREATED' | 'SAMPLE_COLLECTED' | 'SAMPLE_REJECTED' | 'RESULT_ENTERED' | 'ANALYZER_IMPORT' | 'RESULT_VALIDATION_SIGN' | 'RESULT_AMENDED' | 'CRITICAL_ACKNOWLEDGED'
      orderId,
      details
    };
    setLisAuditTrail(prev => [newAudit, ...prev]);
    return newAudit;
  };

  // ─── 2. LAB ORDER CREATION & WORKBENCH ────────────────────────────────
  const createLabOrder = ({
    patientUhid = 'UHID-MED-2026-08942',
    patientName = 'Sarah Connor',
    patientAge = 38,
    patientGender = 'Female',
    tests = [],
    clinicalIndication = 'Routine clinical checkup',
    priority = 'Routine',
    drName = 'Dr. Sarah Mitchell, MD'
  }) => {
    const orderNum = String(labOrders.length + 944).padStart(4, '0');
    const orderId = `LAB-ORD-2026-${orderNum}`;
    const accessionNumber = `ACC-2026-${orderNum}`;
    const barcodeNumber = `BAR-LAB-${Math.floor(10000 + Math.random() * 90000)}`;

    const totalPrice = tests.reduce((acc, t) => acc + (t.price || 50), 0);

    const newOrder = {
      orderId,
      patientUhid,
      patientName,
      patientAge,
      patientGender,
      prescribingDoctor: drName,
      orderDate: 'Today (' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ')',
      priority, // 'STAT' | 'Urgent' | 'Routine'
      clinicalIndication,
      tests,
      status: 'Ordered (Pending Phlebotomy)',
      accessionNumber,
      barcodeNumber,
      collectedAt: null,
      collectedBy: null,
      verifiedAt: null,
      verifiedBy: null,
      isCritical: false,
      invoiceId: `INV-LAB-${orderNum}`,
      totalPrice
    };

    setLabOrders(prev => [newOrder, ...prev]);

    // Create corresponding Lab Invoice
    const newInvoice = {
      invoiceId: newOrder.invoiceId,
      orderId,
      patientName,
      patientUhid,
      date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      testsTotal: totalPrice,
      pharmaGstTax: parseFloat((totalPrice * 0.05).toFixed(2)),
      insuranceCovered: parseFloat((totalPrice * 0.8).toFixed(2)),
      patientCopayDue: parseFloat((totalPrice * 0.25).toFixed(2)),
      paymentStatus: 'Pending Insurance Adjudication',
      status: 'Open'
    };
    setLabInvoices(prev => [newInvoice, ...prev]);

    logLisAudit({
      user: drName,
      role: 'Prescribing Physician',
      action: 'ORDER_CREATED',
      orderId,
      details: `Created ${priority} lab order for ${patientName} (${tests.map(t => t.testName || t.name).join(', ')}). Indication: ${clinicalIndication}`
    });

    return newOrder;
  };

  // ─── 3. PHLEBOTOMY SAMPLE COLLECTION & REJECTION ──────────────────────
  const recordSampleCollection = (orderId, collectorName = 'Phlebotomist James Vance, CPT', tubeType = 'SST Gold / EDTA') => {
    const collTime = 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setLabOrders(prev => prev.map(o => {
      if (o.orderId === orderId) {
        return {
          ...o,
          status: 'Sample Collected (In Processing)',
          collectedAt: collTime,
          collectedBy: collectorName
        };
      }
      return o;
    }));

    logLisAudit({
      user: collectorName,
      role: 'Certified Phlebotomist',
      action: 'SAMPLE_COLLECTED',
      orderId,
      details: `Specimen collected successfully (${tubeType}). Barcode printed & routed to accessioning lab.`
    });
  };

  const acceptRejectSample = (orderId, status = 'Accepted', rejectionReason = '', actor = 'Lab Accessioning Clerk') => {
    setLabOrders(prev => prev.map(o => {
      if (o.orderId === orderId) {
        return {
          ...o,
          status: status === 'Rejected' ? `Sample Rejected (${rejectionReason})` : 'In Processing (Routed to Analyzer)'
        };
      }
      return o;
    }));

    logLisAudit({
      user: actor,
      role: 'Lab Accessioning Technician',
      action: status === 'Rejected' ? 'SAMPLE_REJECTED' : 'SAMPLE_ACCEPTED',
      orderId,
      details: status === 'Rejected' ? `Specimen rejected. Reason: ${rejectionReason}. Phlebotomy recollect requested.` : 'Specimen passed quality check and accessioned to analyzer worklist.'
    });
  };

  // ─── 4. RESULT ENTRY & ANALYZER DATA IMPORT ───────────────────────────
  const enterLabResult = (orderId, resultsArray = [], comments = 'All analytes verified.', actor = 'Lab Tech Maya Lin, MT(ASCP)') => {
    const order = labOrders.find(o => o.orderId === orderId);
    let hasCriticalPanic = false;
    let criticalDetail = '';

    // Inspect if any analyte is critical
    resultsArray.forEach(r => {
      if (r.flag && r.flag.toLowerCase().includes('critical')) {
        hasCriticalPanic = true;
        criticalDetail = `CRITICAL: ${r.analyte} = ${r.value} ${r.unit} (Ref: ${r.range})`;
      }
    });

    const newResultRecord = {
      orderId,
      patientName: order?.patientName || 'Patient',
      testDate: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: hasCriticalPanic ? 'Technically Verified (CRITICAL ALERT)' : 'Technically Verified (Pending Pathologist)',
      pathologistSign: 'Pending Final Validation',
      results: resultsArray,
      comments
    };

    setLabResults(prev => ({
      ...prev,
      [orderId]: newResultRecord
    }));

    // Update Order Status
    setLabOrders(prev => prev.map(o => {
      if (o.orderId === orderId) {
        return {
          ...o,
          status: 'Technically Verified (Pending Sign-off)',
          isCritical: hasCriticalPanic,
          criticalValueNote: hasCriticalPanic ? criticalDetail : null
        };
      }
      return o;
    }));

    // If critical panic value detected, automatically dispatch Critical Panic Alert!
    if (hasCriticalPanic) {
      const newAlert = {
        alertId: `CRIT-2026-${String(criticalAlerts.length + 95).padStart(3, '0')}`,
        orderId,
        patientUhid: order?.patientUhid || 'UHID-08942',
        patientName: order?.patientName || 'Patient',
        doctorName: order?.prescribingDoctor || 'Attending Physician',
        analyte: resultsArray.find(r => r.flag?.toLowerCase().includes('critical'))?.analyte || 'Critical Analyte',
        reportedValue: resultsArray.find(r => r.flag?.toLowerCase().includes('critical'))?.value + ' ' + (resultsArray.find(r => r.flag?.toLowerCase().includes('critical'))?.unit || ''),
        criticalThreshold: 'Panic Level Exceeded',
        reportedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Pending Acknowledgment',
        acknowledgedAt: null,
        clinicalActionTaken: null
      };
      setCriticalAlerts(prev => [newAlert, ...prev]);
    }

    logLisAudit({
      user: actor,
      role: 'Medical Laboratory Technologist',
      action: 'RESULT_ENTERED',
      orderId,
      details: `Technical result entry completed. ${resultsArray.length} analytes tested. ${hasCriticalPanic ? 'CRITICAL PANIC VALUE FLAGGED!' : 'Normal/Standard ranges verified.'}`
    });
  };

  const importAnalyzerResults = (orderId, analyzerId = 'ANZ-COBAS', actor = 'Lab Tech Maya Lin, MT(ASCP)') => {
    // Default automated multi-analyte import
    const simulatedResults = [
      { analyte: 'Serum Sodium (Na+)', value: 141, unit: 'mmol/L', range: '136 - 145', flag: 'Normal', method: 'Roche Cobas ISE' },
      { analyte: 'Serum Potassium (K+)', value: 4.4, unit: 'mmol/L', range: '3.5 - 5.1', flag: 'Normal', method: 'Roche Cobas ISE' },
      { analyte: 'Serum Creatinine', value: 0.92, unit: 'mg/dL', range: '0.70 - 1.30', flag: 'Normal', method: 'Roche Cobas Jaffe' },
      { analyte: 'Fasting Plasma Glucose', value: 96, unit: 'mg/dL', range: '70 - 99', flag: 'Normal', method: 'Roche Cobas Hexokinase' }
    ];

    enterLabResult(orderId, simulatedResults, 'Automated results imported from Roche Cobas 8000 via bidirectional HL7 interface.', actor);
  };

  // ─── 5. PATHOLOGIST VALIDATION & RESULT AMENDMENT ─────────────────────
  const verifyResult = (orderId, pathologistName = 'Dr. Arthur Sterling, MD (Board-Certified Pathologist)', signature = 'SIG-PATH-88902') => {
    const verTime = 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setLabResults(prev => {
      if (!prev[orderId]) return prev;
      return {
        ...prev,
        [orderId]: {
          ...prev[orderId],
          status: prev[orderId].status.includes('CRITICAL') ? 'Final Certified Report (CRITICAL ALERT)' : 'Final Certified Report',
          pathologistSign: `${pathologistName} (${signature})`
        }
      };
    });

    setLabOrders(prev => prev.map(o => {
      if (o.orderId === orderId) {
        return {
          ...o,
          status: 'Verified & Final Report Issued',
          verifiedAt: verTime,
          verifiedBy: pathologistName
        };
      }
      return o;
    }));

    logLisAudit({
      user: pathologistName,
      role: 'Board-Certified Pathologist',
      action: 'RESULT_VALIDATION_SIGN',
      orderId,
      details: `Clinically validated and digitally signed final laboratory report (${signature}). Released to patient EMR & ordering doctor.`
    });
  };

  const amendResult = (orderId, analyteName, oldValue, newValue, reason = 'Dilution correction upon repeat test', pathologistName = 'Dr. Arthur Sterling, MD') => {
    setLabResults(prev => {
      if (!prev[orderId]) return prev;
      const updatedResults = prev[orderId].results.map(r => {
        if (r.analyte === analyteName) {
          return { ...r, value: newValue, flag: `${r.flag} (AMENDED)` };
        }
        return r;
      });

      return {
        ...prev,
        [orderId]: {
          ...prev[orderId],
          status: 'Amended Certified Report',
          comments: `${prev[orderId].comments} • [AMENDMENT NOTE]: ${analyteName} corrected from ${oldValue} to ${newValue} due to: ${reason}`,
          results: updatedResults
        }
      };
    });

    logLisAudit({
      user: pathologistName,
      role: 'Board-Certified Pathologist',
      action: 'RESULT_AMENDED',
      orderId,
      details: `AMENDMENT: ${analyteName} corrected from ${oldValue} to ${newValue}. Justification: ${reason}`
    });
  };

  // ─── 6. CRITICAL PANIC ALERT ACKNOWLEDGMENT & CLINICAL ACTION ─────────
  const acknowledgeCriticalAlert = (alertId, doctorName = 'Dr. Sarah Mitchell, MD', clinicalActionTaken = 'Patient evaluated and immediate therapy initiated.') => {
    const ackTime = 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setCriticalAlerts(prev => prev.map(a => {
      if (a.alertId === alertId) {
        return {
          ...a,
          status: 'Acknowledged by Doctor',
          acknowledgedAt: ackTime,
          clinicalActionTaken
        };
      }
      return a;
    }));

    const alertObj = criticalAlerts.find(a => a.alertId === alertId);

    logLisAudit({
      user: doctorName,
      role: 'Attending Physician',
      action: 'CRITICAL_ACKNOWLEDGED',
      orderId: alertObj?.orderId || 'N/A',
      details: `Critical panic alert acknowledged for ${alertObj?.patientName} (${alertObj?.analyte} = ${alertObj?.reportedValue}). Documented Action: ${clinicalActionTaken}`
    });
  };

  const addTestMaster = (newTest) => {
    setTestMaster(prev => [newTest, ...prev]);
    logLisAudit({
      user: 'SuperAdmin Clinical Director',
      role: 'System Administrator',
      action: 'TEST_MASTER_ADDED',
      orderId: 'N/A',
      details: `Added new diagnostic test definition: ${newTest.testName} (${newTest.testCode}) with LOINC: ${newTest.loincCode}`
    });
  };

  return (
    <LabContext.Provider
      value={{
        testMaster,
        sampleTypes,
        analyzers,
        labOrders,
        labResults,
        criticalAlerts,
        labInvoices,
        lisAuditTrail,
        // Action Methods
        createLabOrder,
        recordSampleCollection,
        acceptRejectSample,
        enterLabResult,
        importAnalyzerResults,
        verifyResult,
        amendResult,
        acknowledgeCriticalAlert,
        addTestMaster,
        logLisAudit
      }}
    >
      {children}
    </LabContext.Provider>
  );
}

export function useLab() {
  const context = useContext(LabContext);
  if (!context) {
    throw new Error('useLab must be used within a LabProvider');
  }
  return context;
}
