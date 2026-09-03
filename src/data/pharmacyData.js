/**
 * MediCare Hospital Pharmacy & Inventory Management System Data
 * Comprehensive data for:
 * - Medicine Master (Brand, Generic, Form, Strength, Classification)
 * - Categories & Manufacturers
 * - Suppliers / Vendors
 * - Batches & Expiry (FEFO matrix, Rack/Bin locator)
 * - Purchases, GRN & Purchase Returns
 * - Stock Transfers & Inter-department Movements
 * - Prescription Processing & Clinical Dispensing
 * - POS Counter Sales & Customer Returns
 * - Low-stock and Expiry Alerts
 * - Pricing, GST Tax Slabs (0%, 5%, 12%, 18%)
 * - Traceable Stock Movement Engine (SME)
 */

export const initialCategories = [
  { id: 'CAT-01', name: 'Cardiovascular & Antihypertensive', code: 'CV-01', description: 'ACE inhibitors, Beta blockers, Statins, ARBs' },
  { id: 'CAT-02', name: 'Antimicrobials & Antibiotics', code: 'AB-02', description: 'Cephalosporins, Macrolides, Penicillins, Fluoroquinolones' },
  { id: 'CAT-03', name: 'Analgesics, NSAIDs & Antipyretics', code: 'AN-03', description: 'Pain management, Anti-inflammatory, Fever control' },
  { id: 'CAT-04', name: 'Respiratory & Bronchodilators', code: 'RS-04', description: 'Inhalers, MDI, Nebulizer solutions, Leukotriene antagonists' },
  { id: 'CAT-05', name: 'Gastrointestinal & Antacids', code: 'GI-05', description: 'Proton pump inhibitors, Antiemetics, Laxatives' },
  { id: 'CAT-06', name: 'Endocrine & Diabetes Care', code: 'ED-06', description: 'Insulins, Metformin, Sulfonylureas, Thyroid hormones' },
  { id: 'CAT-07', name: 'Anticoagulants & Thrombolytics', code: 'AC-07', description: 'Heparin, Warfarin, DOACs, Antiplatelets' },
  { id: 'CAT-08', name: 'Emergency & Critical Care Inotropes', code: 'EM-08', description: 'Adrenaline, Noradrenaline, Atropine, Amiodarone' }
];

export const initialManufacturers = [
  { id: 'MFG-01', name: 'Pfizer Inc.', country: 'United States', qualityCert: 'US-FDA & GMP Approved', contact: 'contact@pfizer.com' },
  { id: 'MFG-02', name: 'Novartis AG', country: 'Switzerland', qualityCert: 'EMA & GMP Certified', contact: 'support@novartis.com' },
  { id: 'MFG-03', name: 'Cipla Global Therapeutics', country: 'India', qualityCert: 'WHO-GMP Certified', contact: 'institutional@cipla.com' },
  { id: 'MFG-04', name: 'Sun Pharmaceutical Industries', country: 'India', qualityCert: 'US-FDA & WHO-GMP', contact: 'sales@sunpharma.com' },
  { id: 'MFG-05', name: 'GlaxoSmithKline (GSK)', country: 'United Kingdom', qualityCert: 'MHRA & GMP Certified', contact: 'supply@gsk.com' },
  { id: 'MFG-06', name: 'AstraZeneca Pharmaceuticals', country: 'United Kingdom / Sweden', qualityCert: 'US-FDA & EMA', contact: 'hospital@astrazeneca.com' }
];

export const initialSuppliers = [
  {
    id: 'SUP-101',
    name: 'Apex Healthcare Distributors Ltd.',
    code: 'VEND-APEX',
    contactPerson: 'David Miller',
    phone: '+1 (555) 345-9801',
    email: 'orders@apexhealth.com',
    address: '1400 Industrial Parkway, Chicago, IL 60607',
    drugLicense: 'DL-IL-2026-9941',
    gstin: '17AAACA9942F1Z4',
    paymentTerms: 'Net 30 Days',
    leadTimeDays: 2,
    rating: '4.9 / 5.0 (Preferred Partner)',
    status: 'Active'
  },
  {
    id: 'SUP-102',
    name: 'MedLife Wholesale Pharma Logistics',
    code: 'VEND-MEDLIFE',
    contactPerson: 'Karen Rodriguez',
    phone: '+1 (555) 789-2234',
    email: 'supply@medlifewholesale.com',
    address: '890 Commerce Blvd, Suite 200, Springfield, IL 62703',
    drugLicense: 'DL-IL-2025-4412',
    gstin: '17BBBCB8810K2Z1',
    paymentTerms: 'Net 45 Days',
    leadTimeDays: 3,
    rating: '4.7 / 5.0',
    status: 'Active'
  },
  {
    id: 'SUP-103',
    name: 'BioGen Cold Chain Logistics Group',
    code: 'VEND-BIOGEN',
    contactPerson: 'Marcus Thorne',
    phone: '+1 (555) 432-1100',
    email: 'coldchain@biogenlogistics.com',
    address: '220 Airport Way, St. Louis, MO 63101',
    drugLicense: 'DL-MO-2026-0819',
    gstin: '29CCCC88291P1Z9',
    paymentTerms: 'Net 15 Days',
    leadTimeDays: 1,
    rating: '5.0 / 5.0 (Cold Chain Certified)',
    status: 'Active'
  }
];

export const initialMedicinesMaster = [
  {
    id: 'MED-M01',
    code: 'DRG-LIS-10',
    brandName: 'Zestril (Lisinopril)',
    genericName: 'Lisinopril USP',
    categoryId: 'CAT-01',
    categoryName: 'Cardiovascular & Antihypertensive',
    mfgId: 'MFG-06',
    mfgName: 'AstraZeneca Pharmaceuticals',
    dosageForm: 'Oral Tablet',
    strength: '10 mg',
    packSize: '100 Tablets / Bottle',
    storageCondition: 'Ambient (15°C - 25°C)',
    scheduleType: 'Schedule H (Rx Only)',
    purchasePrice: 12.50, // per pack of 100
    unitCost: 0.125, // per tab
    sellingPriceMrp: 28.00, // per pack
    unitMrp: 0.28,
    gstTaxSlab: '12%',
    hsnCode: '30049099',
    reorderLevel: 150, // units
    safetyStock: 50,
    currentStock: 420, // units in central pharmacy
    status: 'In Stock / Optimal'
  },
  {
    id: 'MED-M02',
    code: 'DRG-ATO-20',
    brandName: 'Lipitor (Atorvastatin)',
    genericName: 'Atorvastatin Calcium Trihydrate',
    categoryId: 'CAT-01',
    categoryName: 'Cardiovascular & Antihypertensive',
    mfgId: 'MFG-01',
    mfgName: 'Pfizer Inc.',
    dosageForm: 'Oral Tablet',
    strength: '20 mg',
    packSize: '30 Tablets / Strip',
    storageCondition: 'Ambient (15°C - 25°C)',
    scheduleType: 'Schedule H (Rx Only)',
    purchasePrice: 18.00,
    unitCost: 0.60,
    sellingPriceMrp: 36.00,
    unitMrp: 1.20,
    gstTaxSlab: '12%',
    hsnCode: '30049099',
    reorderLevel: 200,
    safetyStock: 60,
    currentStock: 310,
    status: 'In Stock / Optimal'
  },
  {
    id: 'MED-M03',
    code: 'DRG-CEF-1G',
    brandName: 'Ancef (Cefazolin)',
    genericName: 'Cefazolin Sodium for Injection',
    categoryId: 'CAT-02',
    categoryName: 'Antimicrobials & Antibiotics',
    mfgId: 'MFG-03',
    mfgName: 'Cipla Global Therapeutics',
    dosageForm: 'IV / IM Vial (Powder for Reconstitution)',
    strength: '1 g / Vial',
    packSize: '10 Vials / Box',
    storageCondition: 'Ambient (Below 25°C)',
    scheduleType: 'Schedule H1 (Controlled Antibiotic)',
    purchasePrice: 45.00,
    unitCost: 4.50,
    sellingPriceMrp: 95.00,
    unitMrp: 9.50,
    gstTaxSlab: '12%',
    hsnCode: '30042099',
    reorderLevel: 100,
    safetyStock: 30,
    currentStock: 120,
    status: 'Low Stock Alert'
  },
  {
    id: 'MED-M04',
    code: 'DRG-SAL-100',
    brandName: 'Ventolin HFA (Salbutamol)',
    genericName: 'Salbutamol Sulfate Inhalation Aerosol',
    categoryId: 'CAT-04',
    categoryName: 'Respiratory & Bronchodilators',
    mfgId: 'MFG-05',
    mfgName: 'GlaxoSmithKline (GSK)',
    dosageForm: 'Metered Dose Inhaler (MDI)',
    strength: '100 mcg / Puff',
    packSize: '1 Canister (200 Doses)',
    storageCondition: 'Ambient (Store between 15°C - 30°C)',
    scheduleType: 'Schedule H (Rx Only)',
    purchasePrice: 8.20,
    unitCost: 8.20,
    sellingPriceMrp: 18.50,
    unitMrp: 18.50,
    gstTaxSlab: '12%',
    hsnCode: '30049099',
    reorderLevel: 40,
    safetyStock: 15,
    currentStock: 85,
    status: 'In Stock / Optimal'
  },
  {
    id: 'MED-M05',
    code: 'DRG-MET-25',
    brandName: 'Toprol-XL (Metoprolol Succinate)',
    genericName: 'Metoprolol Succinate Extended Release',
    categoryId: 'CAT-01',
    categoryName: 'Cardiovascular & Antihypertensive',
    mfgId: 'MFG-06',
    mfgName: 'AstraZeneca Pharmaceuticals',
    dosageForm: 'Extended Release Tablet',
    strength: '25 mg',
    packSize: '100 Tablets / Bottle',
    storageCondition: 'Ambient (15°C - 25°C)',
    scheduleType: 'Schedule H (Rx Only)',
    purchasePrice: 15.00,
    unitCost: 0.15,
    sellingPriceMrp: 32.00,
    unitMrp: 0.32,
    gstTaxSlab: '12%',
    hsnCode: '30049099',
    reorderLevel: 120,
    safetyStock: 40,
    currentStock: 240,
    status: 'In Stock / Optimal'
  },
  {
    id: 'MED-M06',
    code: 'DRG-AMX-500',
    brandName: 'Amoxil (Amoxicillin)',
    genericName: 'Amoxicillin Trihydrate',
    categoryId: 'CAT-02',
    categoryName: 'Antimicrobials & Antibiotics',
    mfgId: 'MFG-05',
    mfgName: 'GlaxoSmithKline (GSK)',
    dosageForm: 'Oral Capsule',
    strength: '500 mg',
    packSize: '500 Capsules / Bulk Drum',
    storageCondition: 'Ambient (Dry place)',
    scheduleType: 'Schedule H (Rx Only)',
    purchasePrice: 35.00,
    unitCost: 0.07,
    sellingPriceMrp: 75.00,
    unitMrp: 0.15,
    gstTaxSlab: '12%',
    hsnCode: '30041090',
    reorderLevel: 300,
    safetyStock: 100,
    currentStock: 650,
    status: 'In Stock / Optimal'
  },
  {
    id: 'MED-M07',
    code: 'DRG-PAN-40',
    brandName: 'Protonix (Pantoprazole)',
    genericName: 'Pantoprazole Sodium Gastro-resistant',
    categoryId: 'CAT-05',
    categoryName: 'Gastrointestinal & Antacids',
    mfgId: 'MFG-04',
    mfgName: 'Sun Pharmaceutical Industries',
    dosageForm: 'Delayed-Release Tablet',
    strength: '40 mg',
    packSize: '30 Tablets / Strip',
    storageCondition: 'Ambient (15°C - 25°C)',
    scheduleType: 'Schedule H (Rx Only)',
    purchasePrice: 6.50,
    unitCost: 0.216,
    sellingPriceMrp: 16.00,
    unitMrp: 0.533,
    gstTaxSlab: '12%',
    hsnCode: '30049099',
    reorderLevel: 150,
    safetyStock: 50,
    currentStock: 380,
    status: 'In Stock / Optimal'
  },
  {
    id: 'MED-M08',
    code: 'DRG-INS-GLA',
    brandName: 'Lantus (Insulin Glargine)',
    genericName: 'Insulin Glargine Recombinant (rDNA)',
    categoryId: 'CAT-06',
    categoryName: 'Endocrine & Diabetes Care',
    mfgId: 'MFG-02',
    mfgName: 'Novartis AG',
    dosageForm: 'Prefilled SoloStar Pen (3 mL)',
    strength: '100 Units / mL (300 Units/Pen)',
    packSize: '5 Pens / Pack',
    storageCondition: 'Cold Chain (2°C - 8°C Strictly)',
    scheduleType: 'Schedule H (Biologic)',
    purchasePrice: 110.00,
    unitCost: 22.00,
    sellingPriceMrp: 195.00,
    unitMrp: 39.00,
    gstTaxSlab: '5%',
    hsnCode: '30043110',
    reorderLevel: 25,
    safetyStock: 10,
    currentStock: 14,
    status: 'Low Stock Alert (Cold Chain)'
  },
  {
    id: 'MED-M09',
    code: 'DRG-ENX-40',
    brandName: 'Lovenox (Enoxaparin Sodium)',
    genericName: 'Enoxaparin Sodium Low Molecular Weight Heparin',
    categoryId: 'CAT-07',
    categoryName: 'Anticoagulants & Thrombolytics',
    mfgId: 'MFG-02',
    mfgName: 'Novartis AG',
    dosageForm: 'Prefilled SubQ Syringe (0.4 mL)',
    strength: '40 mg / 0.4 mL',
    packSize: '10 Syringes / Box',
    storageCondition: 'Ambient (Store below 25°C, Do not freeze)',
    scheduleType: 'Schedule H (Rx Only)',
    purchasePrice: 65.00,
    unitCost: 6.50,
    sellingPriceMrp: 130.00,
    unitMrp: 13.00,
    gstTaxSlab: '12%',
    hsnCode: '30049099',
    reorderLevel: 30,
    safetyStock: 10,
    currentStock: 45,
    status: 'In Stock / Optimal'
  },
  {
    id: 'MED-M10',
    code: 'DRG-PAR-650',
    brandName: 'Calpol (Paracetamol / Acetaminophen)',
    genericName: 'Paracetamol IP/USP',
    categoryId: 'CAT-03',
    categoryName: 'Analgesics, NSAIDs & Antipyretics',
    mfgId: 'MFG-05',
    mfgName: 'GlaxoSmithKline (GSK)',
    dosageForm: 'Oral Tablet',
    strength: '650 mg',
    packSize: '150 Tablets / Box (10x15)',
    storageCondition: 'Ambient (Dry place)',
    scheduleType: 'OTC / General Drug',
    purchasePrice: 7.50,
    unitCost: 0.05,
    sellingPriceMrp: 18.00,
    unitMrp: 0.12,
    gstTaxSlab: '12%',
    hsnCode: '30049060',
    reorderLevel: 400,
    safetyStock: 150,
    currentStock: 920,
    status: 'In Stock / Optimal'
  }
];

export const initialBatches = [
  {
    batchId: 'BAT-2026-001',
    medicineId: 'MED-M01',
    medicineName: 'Zestril (Lisinopril 10mg)',
    batchNumber: 'LIS-B89201',
    supplierId: 'SUP-101',
    supplierName: 'Apex Healthcare Distributors Ltd.',
    mfgDate: '2025-10-01',
    expiryDate: '2027-09-30',
    rackLocation: 'Rack-A1 / Shelf-2 / Bin-04',
    initialQty: 500,
    currentStockQty: 420,
    unitCost: 0.125,
    unitMrp: 0.28,
    status: 'Active / Available (FEFO Priority 1)'
  },
  {
    batchId: 'BAT-2026-002',
    medicineId: 'MED-M02',
    medicineName: 'Lipitor (Atorvastatin 20mg)',
    batchNumber: 'ATO-P44102',
    supplierId: 'SUP-101',
    supplierName: 'Apex Healthcare Distributors Ltd.',
    mfgDate: '2025-11-15',
    expiryDate: '2027-11-14',
    rackLocation: 'Rack-A1 / Shelf-3 / Bin-12',
    initialQty: 400,
    currentStockQty: 310,
    unitCost: 0.60,
    unitMrp: 1.20,
    status: 'Active / Available'
  },
  {
    batchId: 'BAT-2026-003',
    medicineId: 'MED-M03',
    medicineName: 'Ancef (Cefazolin 1g Vial)',
    batchNumber: 'CEF-C99182',
    supplierId: 'SUP-102',
    supplierName: 'MedLife Wholesale Pharma Logistics',
    mfgDate: '2024-10-01',
    expiryDate: '2026-10-15', // Near expiry (<60 Days)
    rackLocation: 'Rack-B2 / Shelf-1 / Bin-08',
    initialQty: 200,
    currentStockQty: 120,
    unitCost: 4.50,
    unitMrp: 9.50,
    status: 'Warning: Near Expiry (42 Days Remaining)'
  },
  {
    batchId: 'BAT-2026-004',
    medicineId: 'MED-M04',
    medicineName: 'Ventolin HFA (Salbutamol Inhaler)',
    batchNumber: 'SAL-G77190',
    supplierId: 'SUP-101',
    supplierName: 'Apex Healthcare Distributors Ltd.',
    mfgDate: '2025-08-01',
    expiryDate: '2027-08-31',
    rackLocation: 'Rack-C1 / Shelf-2 / Bin-01',
    initialQty: 100,
    currentStockQty: 85,
    unitCost: 8.20,
    unitMrp: 18.50,
    status: 'Active / Available'
  },
  {
    batchId: 'BAT-2026-005',
    medicineId: 'MED-M08',
    medicineName: 'Lantus (Insulin Glargine SoloStar)',
    batchNumber: 'INS-N20194',
    supplierId: 'SUP-103',
    supplierName: 'BioGen Cold Chain Logistics Group',
    mfgDate: '2025-09-01',
    expiryDate: '2026-09-28', // Expiring in 25 Days
    rackLocation: 'Refrigerator-Unit-2 / Shelf-1 (Cold Chain 4°C)',
    initialQty: 50,
    currentStockQty: 14,
    unitCost: 22.00,
    unitMrp: 39.00,
    status: 'Critical Alert: Expiry within 25 Days'
  }
];

export const initialPurchaseOrders = [
  {
    poId: 'PO-2026-081',
    date: '2026-09-01',
    supplierId: 'SUP-101',
    supplierName: 'Apex Healthcare Distributors Ltd.',
    totalAmount: 1850.00,
    itemsCount: 3,
    status: 'Received & GRN Generated',
    expectedDelivery: '2026-09-03',
    grnId: 'GRN-2026-0941',
    items: [
      { medicineId: 'MED-M01', name: 'Zestril 10mg', orderQty: 500, unitCost: 0.125, total: 62.50 },
      { medicineId: 'MED-M02', name: 'Lipitor 20mg', orderQty: 400, unitCost: 0.60, total: 240.00 },
      { medicineId: 'MED-M04', name: 'Ventolin Inhaler', orderQty: 100, unitCost: 8.20, total: 820.00 }
    ]
  },
  {
    poId: 'PO-2026-082',
    date: '2026-09-03',
    supplierId: 'SUP-102',
    supplierName: 'MedLife Wholesale Pharma Logistics',
    totalAmount: 900.00,
    itemsCount: 1,
    status: 'Pending Vendor Dispatch',
    expectedDelivery: '2026-09-05',
    grnId: null,
    items: [
      { medicineId: 'MED-M03', name: 'Ancef Cefazolin 1g Vial', orderQty: 200, unitCost: 4.50, total: 900.00 }
    ]
  }
];

export const initialPrescriptionsQueue = [
  {
    rxId: 'RX-2026-9042',
    patientUhid: 'UHID-MED-2026-08942',
    patientName: 'Sarah Connor',
    patientAge: 38,
    patientGender: 'Female',
    prescriber: 'Dr. Sarah Mitchell, MD (Cardiology)',
    date: 'Today (03 Sep 2026)',
    items: [
      { drug: 'Lisinopril 10mg', dosage: '10 mg', qty: 30, route: 'Oral Tablet', frequency: 'Once Daily (Morning)', days: 30, batchAllocated: 'LIS-B89201' },
      { drug: 'Atorvastatin 20mg', dosage: '20 mg', qty: 30, route: 'Oral Tablet', frequency: 'Once Daily at Bedtime', days: 30, batchAllocated: 'ATO-P44102' }
    ],
    allergyWarning: 'Patient has Penicillin allergy (No cross-reactivity with current Rx)',
    status: 'Ready for Dispensing',
    dispensedBy: null,
    dispensedAt: null
  },
  {
    rxId: 'RX-2026-7811',
    patientUhid: 'UHID-MED-2026-08942',
    patientName: 'Sarah Connor',
    patientAge: 38,
    patientGender: 'Female',
    prescriber: 'Dr. Alex Rivera, MD (Pulmonology)',
    date: '12 Jun 2026',
    items: [
      { drug: 'Salbutamol 100mcg Inhaler', dosage: '100 mcg', qty: 1, route: 'Inhalation', frequency: '1-2 Puffs PRN', days: 60, batchAllocated: 'SAL-G77190' }
    ],
    allergyWarning: 'None',
    status: 'Dispensed',
    dispensedBy: 'Dr. Kevin Okafor, PharmD',
    dispensedAt: '12 Jun 2026, 12:30 PM'
  },
  {
    rxId: 'RX-2026-9104',
    patientUhid: 'PT-9022',
    patientName: 'Robert Chen',
    patientAge: 45,
    patientGender: 'Male',
    prescriber: 'Dr. Sarah Mitchell, MD (Cardiology)',
    date: 'Today (03 Sep 2026)',
    items: [
      { drug: 'Metoprolol 25mg', dosage: '25 mg', qty: 60, route: 'Oral Tablet', frequency: 'Twice Daily with food', days: 30, batchAllocated: 'MET-M10291' }
    ],
    allergyWarning: 'None',
    status: 'Pending Pharmacist Review',
    dispensedBy: null,
    dispensedAt: null
  }
];

export const initialTransfers = [
  {
    transferId: 'TRF-2026-041',
    date: '02 Sep 2026, 10:15 AM',
    fromLocation: 'Central Pharmacy Dispensary',
    toLocation: 'Intensive Care Unit (ICU) Satellite',
    medicineName: 'Ancef (Cefazolin 1g Vial)',
    batchNumber: 'CEF-C99182',
    qty: 30,
    requestedBy: 'Nurse Clara Oswald, RN (ICU)',
    authorizedBy: 'Dr. Kevin Okafor, PharmD',
    status: 'Completed & Acknowledged'
  },
  {
    transferId: 'TRF-2026-042',
    date: '03 Sep 2026, 08:30 AM',
    fromLocation: 'Central Pharmacy Dispensary',
    toLocation: 'Emergency Department (ED) Trauma Crash Cart',
    medicineName: 'Lovenox (Enoxaparin 40mg Syringe)',
    batchNumber: 'ENO-E88421',
    qty: 15,
    requestedBy: 'Dr. Gregory House, MD (ED)',
    authorizedBy: 'Dr. Kevin Okafor, PharmD',
    status: 'Completed & Acknowledged'
  }
];

// Initial Traceable Stock Movement Engine Ledger (SME)
export const initialStockMovements = [
  {
    movementId: 'SM-2026-00104',
    timestamp: '2026-09-03 10:30 AM',
    medicineId: 'MED-M01',
    medicineName: 'Zestril (Lisinopril 10mg)',
    batchNumber: 'LIS-B89201',
    movementType: 'DISPENSE_OUT',
    qtyChange: -30,
    previousBalance: 450,
    newBalance: 420,
    unitPrice: 0.28,
    totalValue: 8.40,
    sourceLocation: 'Central Pharmacy Shelf-2',
    destLocation: 'Patient: Sarah Connor (UHID-08942)',
    referenceDoc: 'RX-2026-9042',
    actor: 'Dr. Kevin Okafor, PharmD',
    reason: 'Outpatient clinical prescription fulfillment'
  },
  {
    movementId: 'SM-2026-00103',
    timestamp: '2026-09-03 08:30 AM',
    medicineId: 'MED-M09',
    medicineName: 'Lovenox (Enoxaparin 40mg)',
    batchNumber: 'ENO-E88421',
    movementType: 'TRANSFER_OUT',
    qtyChange: -15,
    previousBalance: 60,
    newBalance: 45,
    unitPrice: 13.00,
    totalValue: 195.00,
    sourceLocation: 'Central Pharmacy',
    destLocation: 'Emergency Department (ED) Crash Cart',
    referenceDoc: 'TRF-2026-042',
    actor: 'Dr. Kevin Okafor, PharmD',
    reason: 'Daily emergency department satellite stock replenishment'
  },
  {
    movementId: 'SM-2026-00102',
    timestamp: '2026-09-02 10:15 AM',
    medicineId: 'MED-M03',
    medicineName: 'Ancef (Cefazolin 1g Vial)',
    batchNumber: 'CEF-C99182',
    movementType: 'TRANSFER_OUT',
    qtyChange: -30,
    previousBalance: 150,
    newBalance: 120,
    unitPrice: 9.50,
    totalValue: 285.00,
    sourceLocation: 'Central Pharmacy',
    destLocation: 'Intensive Care Unit (ICU)',
    referenceDoc: 'TRF-2026-041',
    actor: 'Dr. Kevin Okafor, PharmD',
    reason: 'ICU surgical prophylaxis allocation'
  },
  {
    movementId: 'SM-2026-00101',
    timestamp: '2026-09-01 02:00 PM',
    medicineId: 'MED-M01',
    medicineName: 'Zestril (Lisinopril 10mg)',
    batchNumber: 'LIS-B89201',
    movementType: 'PURCHASE_GRN_IN',
    qtyChange: +500,
    previousBalance: 0,
    newBalance: 500,
    unitPrice: 0.125,
    totalValue: 62.50,
    sourceLocation: 'Vendor: Apex Healthcare Distributors',
    destLocation: 'Central Pharmacy Shelf-2',
    referenceDoc: 'GRN-2026-0941 (PO-081)',
    actor: 'Store Clerk Mark Jenkins',
    reason: 'Goods received note verified against PO-2026-081'
  }
];

export const initialPosSales = [
  {
    invoiceId: 'POS-2026-8941',
    date: 'Today, 11:15 AM',
    customerName: 'Eleanor Vance (Walk-In)',
    customerPhone: '+1 (555) 456-7890',
    totalGross: 45.00,
    gstTaxAmount: 5.40,
    discountAmount: 2.40,
    netPaid: 48.00,
    paymentMode: 'Credit Card (Visa)',
    items: [
      { drug: 'Zestril 10mg', qty: 30, unitMrp: 0.28, total: 8.40 },
      { drug: 'Lipitor 20mg', qty: 30, unitMrp: 1.20, total: 36.00 }
    ],
    status: 'Completed / Paid'
  }
];
