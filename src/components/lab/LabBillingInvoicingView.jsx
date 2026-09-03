import React, { useState } from 'react';
import { useLab } from '../../context/LabContext';
import { Receipt, Search, DollarSign, CheckCircle, Clock, FileText } from 'lucide-react';

export default function LabBillingInvoicingView({ onShowToast }) {
  const { labInvoices } = useLab();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = labInvoices.filter(inv => {
    const matchSearch =
      inv.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.patientUhid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || inv.paymentStatus.toLowerCase().includes(statusFilter.toLowerCase());
    return matchSearch && matchStatus;
  });

  const totalRevenue = labInvoices.reduce((acc, inv) => acc + (inv.testsTotal || 0), 0);
  const pendingAmount = labInvoices
    .filter(inv => inv.status === 'Open')
    .reduce((acc, inv) => acc + (inv.patientCopayDue || 0), 0);
  const paidCount = labInvoices.filter(inv => inv.status === 'Paid').length;

  const handlePrintInvoice = (invoiceId) => {
    if (onShowToast) onShowToast(`Invoice ${invoiceId} sent to printer / PDF export queue!`, 'info');
  };

  const handleMarkPaid = (invoiceId) => {
    if (onShowToast) onShowToast(`Invoice ${invoiceId} marked as Paid. Receipt generated!`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
        {[
          { label: 'Total Lab Revenue (Gross)', value: `$${totalRevenue.toFixed(2)}`, color: '#0284c7', bg: '#e0f2fe', icon: <DollarSign size={18} /> },
          { label: 'Pending Patient Copay', value: `$${pendingAmount.toFixed(2)}`, color: '#d97706', bg: '#fef3c7', icon: <Clock size={18} /> },
          { label: 'Invoices Fully Settled', value: paidCount, color: '#16a34a', bg: '#dcfce7', icon: <CheckCircle size={18} /> },
        ].map((card, i) => (
          <div key={i} className="dash-card" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: card.color, marginBottom: '6px' }}>
              <div style={{ background: card.bg, padding: '6px', borderRadius: '8px' }}>{card.icon}</div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{card.label}</span>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: card.color }}>{card.value}</div>
          </div>
        ))}
      </div>

      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Receipt size={20} color="#0284c7" />
              <h2 className="dash-card-title">Laboratory Billing Ledger & Invoice Management</h2>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Test charges, insurance adjudication, patient copay tracking, and invoice PDF generation
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={15} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              placeholder="Search by invoice ID, order ID, patient name or UHID..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['all', 'pending', 'paid', 'insurance'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                style={{
                  padding: '5px 11px', borderRadius: '6px',
                  border: statusFilter === s ? '1px solid #0284c7' : '1px solid #e2e8f0',
                  background: statusFilter === s ? '#0284c7' : '#ffffff',
                  color: statusFilter === s ? '#ffffff' : '#475569',
                  fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize'
                }}
              >
                {s === 'all' ? 'All' : s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Patient</th>
                <th>Lab Order</th>
                <th>Test Total</th>
                <th>Tax (5%)</th>
                <th>Insurance Covered</th>
                <th>Patient Copay Due</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(inv => {
                const isPaid = inv.status === 'Paid';
                const isPending = inv.paymentStatus.toLowerCase().includes('pending');

                return (
                  <tr key={inv.invoiceId}>
                    <td>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontFamily: 'monospace' }}>{inv.invoiceId}</div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{inv.date}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0284c7' }}>{inv.patientName}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{inv.patientUhid}</div>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                      {inv.orderId}
                    </td>
                    <td style={{ fontWeight: 800, color: '#0f172a' }}>${(inv.testsTotal || 0).toFixed(2)}</td>
                    <td style={{ color: '#64748b' }}>${(inv.pharmaGstTax || 0).toFixed(2)}</td>
                    <td style={{ color: '#16a34a', fontWeight: 700 }}>${(inv.insuranceCovered || 0).toFixed(2)}</td>
                    <td style={{ color: isPaid ? '#16a34a' : '#dc2626', fontWeight: 800, fontSize: '0.95rem' }}>
                      ${(inv.patientCopayDue || 0).toFixed(2)}
                    </td>
                    <td>
                      <span style={{
                        background: isPaid ? '#dcfce7' : isPending ? '#fef3c7' : '#e0f2fe',
                        color: isPaid ? '#15803d' : isPending ? '#d97706' : '#0284c7',
                        padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700
                      }}>
                        {inv.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          className="btn btn-outline btn-sm"
                          style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                          onClick={() => handlePrintInvoice(inv.invoiceId)}
                        >
                          <FileText size={12} style={{ display: 'inline', marginRight: 3 }} />
                          Invoice
                        </button>
                        {!isPaid && (
                          <button
                            className="btn btn-primary btn-sm"
                            style={{ fontSize: '0.72rem', padding: '3px 8px', background: '#16a34a', border: 'none' }}
                            onClick={() => handleMarkPaid(inv.invoiceId)}
                          >
                            Mark Paid
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
