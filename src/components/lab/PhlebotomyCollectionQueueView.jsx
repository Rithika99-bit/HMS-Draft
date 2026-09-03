import React, { useState } from 'react';
import { useLab } from '../../context/LabContext';
import { 
  Droplet, Search, Printer, CheckCircle, 
  XCircle, Barcode, ShieldAlert, UserCheck 
} from 'lucide-react';

export default function PhlebotomyCollectionQueueView({ onShowToast }) {
  const { labOrders, recordSampleCollection, acceptRejectSample } = useLab();
  const [searchTerm, setSearchTerm] = useState('');
  const [collectorName, setCollectorName] = useState('Phlebotomist James Vance, CPT');
  const [rejectionModalOrder, setRejectionModalOrder] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('QNS (Quantity Not Sufficient < 1.0 mL)');

  const handleCollect = (orderId, tubeType) => {
    recordSampleCollection(orderId, collectorName, tubeType);
    if (onShowToast) onShowToast(`Specimen collected for order ${orderId}! Barcode generated.`, 'success');
  };

  const handlePrintBarcode = (barcodeNumber, patientName) => {
    if (onShowToast) onShowToast(`Printed Barcode Label [${barcodeNumber}] for ${patientName}`, 'info');
  };

  const handleRejectSubmit = () => {
    if (!rejectionModalOrder) return;
    acceptRejectSample(rejectionModalOrder.orderId, 'Rejected', rejectionReason, collectorName);
    if (onShowToast) onShowToast(`Specimen rejected for ${rejectionModalOrder.orderId} (${rejectionReason}). Phlebotomy notified for recollect.`, 'warning');
    setRejectionModalOrder(null);
  };

  const pendingCollectionOrders = labOrders.filter(o => {
    const matchSearch = o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.barcodeNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Droplet size={20} color="#dc2626" />
              <h2 className="dash-card-title">Phlebotomy Sample Collection & Accessioning Worklist</h2>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Sample draw worklist, correct vacuum tube selection, physical accession barcode printing, and quality acceptance/rejection
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Duty Phlebotomist:</span>
            <input 
              type="text" 
              className="form-input" 
              style={{ width: '240px', padding: '4px 8px', fontSize: '0.78rem' }}
              value={collectorName}
              onChange={e => setCollectorName(e.target.value)}
            />
          </div>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search phlebotomy worklist by patient name, order ID, or accession barcode..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '36px' }}
          />
        </div>

        {/* Collection Queue Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {pendingCollectionOrders.map(order => {
            const isCollected = order.status.includes('Collected') || order.status.includes('Processing') || order.status.includes('Verified');
            const isRejected = order.status.includes('Rejected');

            return (
              <div 
                key={order.orderId}
                style={{ 
                  border: order.priority.includes('STAT') ? '2px solid #f87171' : '1px solid #e2e8f0', 
                  borderRadius: '10px', 
                  padding: '16px', 
                  background: isRejected ? '#fef2f2' : order.priority.includes('STAT') ? '#fff5f5' : '#ffffff',
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>{order.orderId}</span>
                    <span style={{ 
                      background: order.priority.includes('STAT') ? '#fee2e2' : '#f1f5f9',
                      color: order.priority.includes('STAT') ? '#dc2626' : '#475569',
                      padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 
                    }}>
                      {order.priority}
                    </span>
                    <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                      UHID: {order.patientUhid}
                    </span>
                    <span style={{ 
                      background: isCollected ? '#dcfce7' : isRejected ? '#fee2e2' : '#fef3c7',
                      color: isCollected ? '#15803d' : isRejected ? '#dc2626' : '#d97706',
                      padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 
                    }}>
                      {order.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
                    {order.patientName} <span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#64748b' }}>({order.patientAge}y / {order.patientGender})</span>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 600, marginTop: '2px' }}>
                    Tests: {order.tests.map(t => t.testName || t.name).join(', ')}
                  </div>

                  <div style={{ display: 'flex', gap: '16px', marginTop: '6px', fontSize: '0.78rem', color: '#64748b' }}>
                    <span>Barcode: <strong style={{ color: '#0f172a', fontFamily: 'monospace' }}>{order.barcodeNumber}</strong></span>
                    <span>Accession: {order.accessionNumber}</span>
                    {order.collectedBy && <span>Collected by: <strong>{order.collectedBy}</strong> ({order.collectedAt})</span>}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button 
                    className="btn btn-outline btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}
                    onClick={() => handlePrintBarcode(order.barcodeNumber, order.patientName)}
                  >
                    <Printer size={13} /> Print Barcode Label
                  </button>

                  {!isCollected && !isRejected && (
                    <>
                      <button 
                        className="btn btn-outline btn-sm"
                        style={{ color: '#dc2626', borderColor: '#fca5a5', fontSize: '0.78rem' }}
                        onClick={() => setRejectionModalOrder(order)}
                      >
                        Reject Sample
                      </button>

                      <button 
                        className="btn btn-primary btn-sm"
                        style={{ background: '#16a34a', border: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}
                        onClick={() => handleCollect(order.orderId, 'SST Gold / EDTA')}
                      >
                        <CheckCircle size={14} /> Record Specimen Draw
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Specimen Rejection Modal */}
        {rejectionModalOrder && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '480px', width: '90%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#991b1b', marginBottom: '10px' }}>
                <ShieldAlert size={22} />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>
                  Reject Specimen Draw
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '14px' }}>
                Rejecting specimen for <strong>{rejectionModalOrder.patientName}</strong> ({rejectionModalOrder.orderId}). This will request an immediate recollection from phlebotomy.
              </p>

              <div style={{ marginBottom: '16px' }}>
                <label className="form-label">Specimen Rejection Criteria</label>
                <select 
                  className="form-input" 
                  value={rejectionReason}
                  onChange={e => setRejectionReason(e.target.value)}
                >
                  <option value="QNS (Quantity Not Sufficient < 1.0 mL)">QNS (Quantity Not Sufficient &lt; 1.0 mL)</option>
                  <option value="Gross Hemolysis (+++) Red Cell Lysis">Gross Hemolysis (+++) Red Cell Lysis</option>
                  <option value="Clotted EDTA Whole Blood Specimen">Clotted EDTA Whole Blood Specimen</option>
                  <option value="Incorrect Vacuum Tube Container Used">Incorrect Vacuum Tube Container Used</option>
                  <option value="Unlabeled / Mislabeled Specimen Tube">Unlabeled / Mislabeled Specimen Tube</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setRejectionModalOrder(null)}>
                  Cancel
                </button>
                <button className="btn btn-primary btn-sm" style={{ background: '#dc2626' }} onClick={handleRejectSubmit}>
                  Confirm Specimen Rejection
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
