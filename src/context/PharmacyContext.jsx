import React, { createContext, useContext, useState } from 'react';
import { 
  initialCategories, 
  initialManufacturers, 
  initialSuppliers, 
  initialMedicinesMaster, 
  initialBatches, 
  initialPurchaseOrders, 
  initialPrescriptionsQueue, 
  initialTransfers, 
  initialStockMovements, 
  initialPosSales 
} from '../data/pharmacyData';

const PharmacyContext = createContext(null);

export function PharmacyProvider({ children }) {
  const [medicines, setMedicines] = useState(initialMedicinesMaster);
  const [categories, setCategories] = useState(initialCategories);
  const [manufacturers, setManufacturers] = useState(initialManufacturers);
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [batches, setBatches] = useState(initialBatches);
  const [purchaseOrders, setPurchaseOrders] = useState(initialPurchaseOrders);
  const [prescriptions, setPrescriptions] = useState(initialPrescriptionsQueue);
  const [transfers, setTransfers] = useState(initialTransfers);
  const [posSales, setPosSales] = useState(initialPosSales);
  const [stockMovements, setStockMovements] = useState(initialStockMovements);

  // ─── 1. CORE TRACEABLE STOCK MOVEMENT LOGGER ──────────────────────────
  const logStockMovement = ({
    medicineId,
    medicineName,
    batchNumber,
    movementType,
    qtyChange,
    previousBalance,
    newBalance,
    unitPrice = 0,
    sourceLocation = 'Central Pharmacy Dispensary',
    destLocation = 'Patient Care',
    referenceDoc = 'N/A',
    actor = 'Dr. Kevin Okafor, PharmD',
    reason = 'Routine pharmacy stock transaction'
  }) => {
    const totalVal = Math.abs(qtyChange * (unitPrice || 0)).toFixed(2);
    const newMovement = {
      movementId: `SM-2026-${String(stockMovements.length + 105).padStart(5, '0')}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      medicineId,
      medicineName,
      batchNumber,
      movementType, // 'PURCHASE_GRN_IN' | 'PURCHASE_RETURN_OUT' | 'DISPENSE_OUT' | 'POS_SALE_OUT' | 'SALE_RETURN_IN' | 'TRANSFER_OUT' | 'TRANSFER_IN' | 'ADJUSTMENT_VARIANCE' | 'ADJUSTMENT_DAMAGE' | 'EXPIRY_QUARANTINE'
      qtyChange,
      previousBalance,
      newBalance,
      unitPrice,
      totalValue: parseFloat(totalVal),
      sourceLocation,
      destLocation,
      referenceDoc,
      actor,
      reason
    };

    setStockMovements(prev => [newMovement, ...prev]);
    return newMovement;
  };

  // ─── 2. MEDICINE MASTER & CATALOG ACTIONS ──────────────────────────────
  const addMedicine = (medData) => {
    const newMed = {
      id: `MED-M${String(medicines.length + 1).padStart(2, '0')}`,
      code: medData.code || `DRG-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      brandName: medData.brandName,
      genericName: medData.genericName,
      categoryId: medData.categoryId || 'CAT-01',
      categoryName: medData.categoryName || 'General Pharmaceutical',
      mfgId: medData.mfgId || 'MFG-01',
      mfgName: medData.mfgName || 'Pfizer Inc.',
      dosageForm: medData.dosageForm || 'Oral Tablet',
      strength: medData.strength || '10 mg',
      packSize: medData.packSize || '100 Tablets / Bottle',
      storageCondition: medData.storageCondition || 'Ambient (15°C - 25°C)',
      scheduleType: medData.scheduleType || 'Schedule H (Rx Only)',
      purchasePrice: parseFloat(medData.purchasePrice || 10.0),
      unitCost: parseFloat(medData.unitCost || 0.1),
      sellingPriceMrp: parseFloat(medData.sellingPriceMrp || 25.0),
      unitMrp: parseFloat(medData.unitMrp || 0.25),
      gstTaxSlab: medData.gstTaxSlab || '12%',
      hsnCode: medData.hsnCode || '30049099',
      reorderLevel: parseInt(medData.reorderLevel || 100, 10),
      safetyStock: parseInt(medData.safetyStock || 30, 10),
      currentStock: parseInt(medData.initialStock || 0, 10),
      status: 'In Stock / Active'
    };

    setMedicines(prev => [newMed, ...prev]);

    // If initial stock provided, create batch & log stock movement
    if (newMed.currentStock > 0) {
      const batchNo = `BAT-${newMed.code}-01`;
      const newBatch = {
        batchId: `BAT-2026-${String(batches.length + 1).padStart(3, '0')}`,
        medicineId: newMed.id,
        medicineName: newMed.brandName,
        batchNumber: batchNo,
        supplierId: 'SUP-101',
        supplierName: 'Apex Healthcare Distributors Ltd.',
        mfgDate: '2026-01-01',
        expiryDate: '2028-01-01',
        rackLocation: 'Rack-A1 / Shelf-1',
        initialQty: newMed.currentStock,
        currentStockQty: newMed.currentStock,
        unitCost: newMed.unitCost,
        unitMrp: newMed.unitMrp,
        status: 'Active / Available'
      };
      setBatches(prev => [newBatch, ...prev]);

      logStockMovement({
        medicineId: newMed.id,
        medicineName: newMed.brandName,
        batchNumber: batchNo,
        movementType: 'PURCHASE_GRN_IN',
        qtyChange: newMed.currentStock,
        previousBalance: 0,
        newBalance: newMed.currentStock,
        unitPrice: newMed.unitCost,
        sourceLocation: 'Initial Master Catalog Inflow',
        destLocation: 'Central Pharmacy',
        referenceDoc: `INIT-${newMed.code}`,
        actor: 'Dr. Kevin Okafor, PharmD',
        reason: 'Master drug catalog entry with opening balance'
      });
    }

    return newMed;
  };

  const addSupplier = (supData) => {
    const newSup = {
      id: `SUP-${100 + suppliers.length + 1}`,
      name: supData.name,
      code: `VEND-${supData.name.split(' ')[0].toUpperCase()}`,
      contactPerson: supData.contactPerson,
      phone: supData.phone,
      email: supData.email,
      address: supData.address || 'Medical District, Springfield',
      drugLicense: supData.drugLicense || 'DL-2026-REG',
      gstin: supData.gstin || '17AAACP88491Z1',
      paymentTerms: supData.paymentTerms || 'Net 30 Days',
      leadTimeDays: parseInt(supData.leadTimeDays || 2, 10),
      rating: '4.8 / 5.0',
      status: 'Active'
    };
    setSuppliers(prev => [newSup, ...prev]);
    return newSup;
  };

  // ─── 3. PURCHASES, GRN & PURCHASE RETURNS ──────────────────────────────
  const createPurchaseOrder = (poData) => {
    const newPO = {
      poId: `PO-2026-${String(purchaseOrders.length + 83).padStart(3, '0')}`,
      date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      supplierId: poData.supplierId,
      supplierName: poData.supplierName,
      totalAmount: parseFloat(poData.totalAmount || 1200.0),
      itemsCount: poData.items ? poData.items.length : 1,
      status: 'Pending Vendor Dispatch',
      expectedDelivery: 'In 2-3 Days',
      grnId: null,
      items: poData.items || []
    };
    setPurchaseOrders(prev => [newPO, ...prev]);
    return newPO;
  };

  const receiveGrn = (poId, grnDetails = {}, actor = 'Dr. Kevin Okafor, PharmD') => {
    const po = purchaseOrders.find(p => p.poId === poId);
    if (!po) return;

    const grnId = `GRN-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    // Update PO status
    setPurchaseOrders(prev => prev.map(p => {
      if (p.poId === poId) {
        return {
          ...p,
          status: 'Received & GRN Generated',
          grnId
        };
      }
      return p;
    }));

    // For each item in PO, update medicine stock, create batch, and log stock movement
    po.items.forEach(item => {
      const med = medicines.find(m => m.id === item.medicineId) || medicines[0];
      const batchNo = `BAT-${item.medicineId}-${Math.floor(1000 + Math.random() * 9000)}`;
      const prevBal = med.currentStock;
      const newBal = prevBal + item.orderQty;

      // Update medicine master stock
      setMedicines(prev => prev.map(m => {
        if (m.id === med.id) {
          return { ...m, currentStock: newBal, status: 'In Stock / Optimal' };
        }
        return m;
      }));

      // Create new batch record
      const newBatch = {
        batchId: `BAT-2026-${String(batches.length + 10).padStart(3, '0')}`,
        medicineId: med.id,
        medicineName: med.brandName,
        batchNumber: batchNo,
        supplierId: po.supplierId,
        supplierName: po.supplierName,
        mfgDate: new Date().toLocaleDateString('en-CA'),
        expiryDate: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000).toLocaleDateString('en-CA'), // 2 years expiry
        rackLocation: 'Rack-A2 / Shelf-3 / Bin-10',
        initialQty: item.orderQty,
        currentStockQty: item.orderQty,
        unitCost: item.unitCost,
        unitMrp: med.unitMrp,
        status: 'Active / Available'
      };
      setBatches(prev => [newBatch, ...prev]);

      // Log Traceable Stock Movement
      logStockMovement({
        medicineId: med.id,
        medicineName: med.brandName,
        batchNumber: batchNo,
        movementType: 'PURCHASE_GRN_IN',
        qtyChange: +item.orderQty,
        previousBalance: prevBal,
        newBalance: newBal,
        unitPrice: item.unitCost,
        sourceLocation: `Supplier: ${po.supplierName}`,
        destLocation: 'Central Pharmacy Receiving Bay',
        referenceDoc: `${grnId} (${po.poId})`,
        actor,
        reason: 'Goods Received Note verified & stock accepted into inventory'
      });
    });
  };

  const createPurchaseReturn = (medicineId, batchNumber, returnQty, reason = 'Damaged packaging / failed quality check', supplierName = 'Apex Healthcare Distributors', actor = 'Dr. Kevin Okafor, PharmD') => {
    const med = medicines.find(m => m.id === medicineId);
    if (!med) return;

    const prevBal = med.currentStock;
    const newBal = Math.max(0, prevBal - returnQty);

    // Update master stock
    setMedicines(prev => prev.map(m => {
      if (m.id === medicineId) {
        return { ...m, currentStock: newBal };
      }
      return m;
    }));

    // Update batch stock
    setBatches(prev => prev.map(b => {
      if (b.batchNumber === batchNumber) {
        return { ...b, currentStockQty: Math.max(0, b.currentStockQty - returnQty) };
      }
      return b;
    }));

    const debitNoteId = `DN-2026-${Math.floor(100 + Math.random() * 900)}`;

    // Log Stock Movement
    logStockMovement({
      medicineId,
      medicineName: med.brandName,
      batchNumber,
      movementType: 'PURCHASE_RETURN_OUT',
      qtyChange: -returnQty,
      previousBalance: prevBal,
      newBalance: newBal,
      unitPrice: med.unitCost,
      sourceLocation: 'Central Pharmacy Quarantine',
      destLocation: `Vendor Return: ${supplierName}`,
      referenceDoc: debitNoteId,
      actor,
      reason: `Vendor purchase return debit note: ${reason}`
    });
  };

  // ─── 4. CLINICAL DISPENSING (EMR INTEGRATION) ───────────────────────────
  const dispensePrescription = (rxId, batchNumber = 'LIS-B89201', qty = 30, patientName = 'Sarah Connor', drName = 'Dr. Sarah Mitchell, MD', actor = 'Dr. Kevin Okafor, PharmD') => {
    // Find prescription
    const rx = prescriptions.find(p => p.rxId === rxId);
    const drugName = rx?.items[0]?.drug || 'Lisinopril 10mg';
    const med = medicines.find(m => drugName.toLowerCase().includes(m.genericName.toLowerCase()) || m.brandName.toLowerCase().includes(drugName.toLowerCase())) || medicines[0];

    const prevBal = med.currentStock;
    const newBal = Math.max(0, prevBal - qty);

    // Update master stock
    setMedicines(prev => prev.map(m => {
      if (m.id === med.id) {
        return { ...m, currentStock: newBal };
      }
      return m;
    }));

    // Update batch stock
    setBatches(prev => prev.map(b => {
      if (b.batchNumber === batchNumber) {
        return { ...b, currentStockQty: Math.max(0, b.currentStockQty - qty) };
      }
      return b;
    }));

    // Mark prescription dispensed
    setPrescriptions(prev => prev.map(p => {
      if (p.rxId === rxId) {
        return {
          ...p,
          status: 'Dispensed',
          dispensedBy: actor,
          dispensedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      return p;
    }));

    // Log Traceable Stock Movement
    logStockMovement({
      medicineId: med.id,
      medicineName: med.brandName,
      batchNumber,
      movementType: 'DISPENSE_OUT',
      qtyChange: -qty,
      previousBalance: prevBal,
      newBalance: newBal,
      unitPrice: med.unitMrp,
      sourceLocation: 'Central Pharmacy Dispensary Counter',
      destLocation: `Patient: ${patientName} (${rx?.patientUhid || 'UHID-08942'})`,
      referenceDoc: rxId,
      actor,
      reason: `Prescription dispensed (Dr. verified: ${drName})`
    });
  };

  // ─── 5. POINT OF SALE (POS) & CUSTOMER SALES ────────────────────────────
  const processPosSale = (saleData, actor = 'Dr. Kevin Okafor, PharmD') => {
    const invId = `POS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newSale = {
      invoiceId: invId,
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      customerName: saleData.customerName || 'Walk-In Customer',
      customerPhone: saleData.customerPhone || '+1 (555) 000-0000',
      totalGross: parseFloat(saleData.totalGross || 0),
      gstTaxAmount: parseFloat(saleData.gstTaxAmount || 0),
      discountAmount: parseFloat(saleData.discountAmount || 0),
      netPaid: parseFloat(saleData.netPaid || 0),
      paymentMode: saleData.paymentMode || 'Credit Card (Visa)',
      items: saleData.items || [],
      status: 'Completed / Paid'
    };

    setPosSales(prev => [newSale, ...prev]);

    // For each item in sale, deduct stock and log stock movement
    saleData.items.forEach(item => {
      const med = medicines.find(m => m.id === item.medicineId) || medicines[0];
      const prevBal = med.currentStock;
      const newBal = Math.max(0, prevBal - item.qty);

      setMedicines(prev => prev.map(m => {
        if (m.id === med.id) {
          return { ...m, currentStock: newBal };
        }
        return m;
      }));

      // Log Stock Movement
      logStockMovement({
        medicineId: med.id,
        medicineName: med.brandName,
        batchNumber: item.batchNumber || 'LIS-B89201',
        movementType: 'POS_SALE_OUT',
        qtyChange: -item.qty,
        previousBalance: prevBal,
        newBalance: newBal,
        unitPrice: item.unitMrp,
        sourceLocation: 'OPD Retail Pharmacy Counter',
        destLocation: `Customer: ${newSale.customerName}`,
        referenceDoc: invId,
        actor,
        reason: 'Counter retail POS sale with tax invoice'
      });
    });

    return newSale;
  };

  const processSaleReturn = (invoiceId, medicineId, batchNumber, returnQty, refundAmount, customerName = 'Customer', actor = 'Dr. Kevin Okafor, PharmD') => {
    const med = medicines.find(m => m.id === medicineId);
    if (!med) return;

    const prevBal = med.currentStock;
    const newBal = prevBal + returnQty;

    setMedicines(prev => prev.map(m => {
      if (m.id === medicineId) {
        return { ...m, currentStock: newBal };
      }
      return m;
    }));

    // Update batch stock
    setBatches(prev => prev.map(b => {
      if (b.batchNumber === batchNumber) {
        return { ...b, currentStockQty: b.currentStockQty + returnQty };
      }
      return b;
    }));

    const creditNoteId = `CN-2026-${Math.floor(100 + Math.random() * 900)}`;

    // Log Stock Movement
    logStockMovement({
      medicineId,
      medicineName: med.brandName,
      batchNumber,
      movementType: 'SALE_RETURN_IN',
      qtyChange: +returnQty,
      previousBalance: prevBal,
      newBalance: newBal,
      unitPrice: med.unitMrp,
      sourceLocation: `Customer Return: ${customerName}`,
      destLocation: 'Central Pharmacy Restocked',
      referenceDoc: `${creditNoteId} (Inv: ${invoiceId})`,
      actor,
      reason: `Patient/Customer returned unused medicine with intact seal ($${refundAmount} refunded)`
    });
  };

  // ─── 6. INTER-DEPARTMENT TRANSFERS & ADJUSTMENTS ────────────────────────
  const transferStock = (medicineId, batchNumber, fromLocation, toLocation, qty, reason = 'Department replenishment', actor = 'Dr. Kevin Okafor, PharmD') => {
    const med = medicines.find(m => m.id === medicineId);
    if (!med) return;

    const prevBal = med.currentStock;
    const newBal = Math.max(0, prevBal - qty);

    setMedicines(prev => prev.map(m => {
      if (m.id === medicineId) {
        return { ...m, currentStock: newBal };
      }
      return m;
    }));

    // Update batch stock
    setBatches(prev => prev.map(b => {
      if (b.batchNumber === batchNumber) {
        return { ...b, currentStockQty: Math.max(0, b.currentStockQty - qty) };
      }
      return b;
    }));

    const trfId = `TRF-2026-${String(transfers.length + 43).padStart(3, '0')}`;
    const newTransfer = {
      transferId: trfId,
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fromLocation,
      toLocation,
      medicineName: med.brandName,
      batchNumber,
      qty,
      requestedBy: toLocation.includes('ICU') ? 'Nurse Clara Oswald, RN' : 'Emergency Duty Officer',
      authorizedBy: actor,
      status: 'Completed & Acknowledged'
    };
    setTransfers(prev => [newTransfer, ...prev]);

    // Log Stock Movement
    logStockMovement({
      medicineId,
      medicineName: med.brandName,
      batchNumber,
      movementType: 'TRANSFER_OUT',
      qtyChange: -qty,
      previousBalance: prevBal,
      newBalance: newBal,
      unitPrice: med.unitCost,
      sourceLocation: fromLocation,
      destLocation: toLocation,
      referenceDoc: trfId,
      actor,
      reason: `Inter-department transfer: ${reason}`
    });
  };

  const adjustStock = (medicineId, batchNumber, adjustmentType, qty, reason = 'Physical audit variance count', actor = 'Dr. Kevin Okafor, PharmD') => {
    const med = medicines.find(m => m.id === medicineId);
    if (!med) return;

    const isAddition = adjustmentType === 'SURPLUS_FOUND';
    const prevBal = med.currentStock;
    const newBal = isAddition ? prevBal + qty : Math.max(0, prevBal - qty);
    const qtyChange = isAddition ? +qty : -qty;

    setMedicines(prev => prev.map(m => {
      if (m.id === medicineId) {
        return { ...m, currentStock: newBal };
      }
      return m;
    }));

    // Update batch stock
    setBatches(prev => prev.map(b => {
      if (b.batchNumber === batchNumber) {
        return { ...b, currentStockQty: Math.max(0, b.currentStockQty + qtyChange) };
      }
      return b;
    }));

    const adjId = `ADJ-2026-${Math.floor(100 + Math.random() * 900)}`;

    // Log Stock Movement
    logStockMovement({
      medicineId,
      medicineName: med.brandName,
      batchNumber,
      movementType: adjustmentType === 'DAMAGE_SPILLAGE' ? 'ADJUSTMENT_DAMAGE' : 'ADJUSTMENT_VARIANCE',
      qtyChange,
      previousBalance: prevBal,
      newBalance: newBal,
      unitPrice: med.unitCost,
      sourceLocation: 'Central Pharmacy Stock Shelf',
      destLocation: isAddition ? 'Restocked Surplus' : 'Written-Off / Damaged Disposal',
      referenceDoc: adjId,
      actor,
      reason: `Inventory count adjustment: ${reason}`
    });
  };

  const quarantineBatch = (batchId, reason = 'Near expiry / manufacturer batch recall', actor = 'Dr. Kevin Okafor, PharmD') => {
    const batch = batches.find(b => b.batchId === batchId);
    if (!batch) return;

    const med = medicines.find(m => m.id === batch.medicineId);
    const qtyToQuarantine = batch.currentStockQty;
    const prevBal = med ? med.currentStock : 0;
    const newBal = Math.max(0, prevBal - qtyToQuarantine);

    if (med) {
      setMedicines(prev => prev.map(m => {
        if (m.id === med.id) {
          return { ...m, currentStock: newBal };
        }
        return m;
      }));
    }

    setBatches(prev => prev.map(b => {
      if (b.batchId === batchId) {
        return {
          ...b,
          currentStockQty: 0,
          status: `QUARANTINED (${reason})`
        };
      }
      return b;
    }));

    const qId = `QRN-2026-${Math.floor(100 + Math.random() * 900)}`;

    // Log Stock Movement
    logStockMovement({
      medicineId: batch.medicineId,
      medicineName: batch.medicineName,
      batchNumber: batch.batchNumber,
      movementType: 'EXPIRY_QUARANTINE',
      qtyChange: -qtyToQuarantine,
      previousBalance: prevBal,
      newBalance: newBal,
      unitPrice: batch.unitCost,
      sourceLocation: batch.rackLocation,
      destLocation: 'Biological & Chemical Quarantine Room Q-102',
      referenceDoc: qId,
      actor,
      reason: `Batch quarantined & isolated: ${reason}`
    });
  };

  return (
    <PharmacyContext.Provider
      value={{
        medicines,
        categories,
        manufacturers,
        suppliers,
        batches,
        purchaseOrders,
        prescriptions,
        transfers,
        posSales,
        stockMovements,
        // Methods
        logStockMovement,
        addMedicine,
        addSupplier,
        createPurchaseOrder,
        receiveGrn,
        createPurchaseReturn,
        dispensePrescription,
        processPosSale,
        processSaleReturn,
        transferStock,
        adjustStock,
        quarantineBatch
      }}
    >
      {children}
    </PharmacyContext.Provider>
  );
}

export function usePharmacy() {
  const context = useContext(PharmacyContext);
  if (!context) {
    throw new Error('usePharmacy must be used within a PharmacyProvider');
  }
  return context;
}
