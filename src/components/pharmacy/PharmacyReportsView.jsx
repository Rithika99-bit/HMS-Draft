import React, { useState } from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import { 
  BarChart3, TrendingUp, DollarSign, Download, 
  Layers, Package, AlertTriangle, PieChart 
} from 'lucide-react';

export default function PharmacyReportsView({ onShowToast }) {
  const { medicines, posSales, stockMovements } = usePharmacy();
  const [reportTab, setReportTab] = useState('abc-ved'); // 'abc-ved' | 'valuation' | 'sales-register' | 'fast-slow'

  const totalCostValuation = medicines.reduce((acc, m) => acc + (m.currentStock * m.unitCost), 0);
  const totalMrpValuation = medicines.reduce((acc, m) => acc + (m.currentStock * m.unitMrp), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Pharmacy Financial Analytics & Executive Reports</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              ABC/VED inventory stratification, stock valuation, fast/slow-moving velocity analysis, and sales tax registers
            </div>
          </div>
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => { if (onShowToast) onShowToast('Exported Pharmacy Executive Financial Report (PDF).', 'success'); }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Download size={14} />
            <span>Export Report (PDF)</span>
          </button>
        </div>

        {/* Report Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', flexWrap: 'wrap' }}>
          {[
            { id: 'abc-ved', label: 'ABC / VED Matrix Analysis' },
            { id: 'valuation', label: 'Inventory Stock Valuation' },
            { id: 'sales-register', label: 'Daily Sales & Tax Register' },
            { id: 'fast-slow', label: 'Fast vs Slow Moving Velocity' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setReportTab(t.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: reportTab === t.id ? '2px solid #16a34a' : '1px solid #e2e8f0',
                background: reportTab === t.id ? '#f0fdf4' : '#ffffff',
                color: reportTab === t.id ? '#15803d' : '#475569',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab 1: ABC / VED Analysis */}
        {reportTab === 'abc-ved' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#475569' }}>
              <strong>ABC Analysis:</strong> High-value Class A items (70% value, 10% volume) vs Class B (20% value, 20% volume) vs Class C (10% value, 70% volume).<br />
              <strong>VED Analysis:</strong> Vital (Life saving), Essential (Standard hospital therapy), Desirable (OTC/Supportive).
            </div>

            <table className="dash-table">
              <thead>
                <tr>
                  <th>Drug Name</th>
                  <th>Therapeutic Group</th>
                  <th>ABC Category</th>
                  <th>VED Criticality</th>
                  <th>Annual Consumption Value</th>
                  <th>Inventory Control Strategy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 800 }}>Lantus (Insulin Glargine)</td>
                  <td>Endocrine</td>
                  <td><span style={{ background: '#fee2e2', color: '#dc2626', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>Category A (High Value)</span></td>
                  <td><span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>Vital (V)</span></td>
                  <td style={{ fontWeight: 800, color: '#16a34a' }}>$14,200.00</td>
                  <td style={{ fontSize: '0.78rem' }}>Tight daily inventory monitoring & cold chain logging</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 800 }}>Ancef (Cefazolin 1g Vial)</td>
                  <td>Antibiotic</td>
                  <td><span style={{ background: '#fee2e2', color: '#dc2626', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>Category A</span></td>
                  <td><span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>Vital (V)</span></td>
                  <td style={{ fontWeight: 800, color: '#16a34a' }}>$11,800.00</td>
                  <td style={{ fontSize: '0.78rem' }}>Buffer stock maintenance (Min: 100 units)</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 800 }}>Lipitor (Atorvastatin 20mg)</td>
                  <td>Cardiovascular</td>
                  <td><span style={{ background: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>Category B</span></td>
                  <td><span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>Essential (E)</span></td>
                  <td style={{ fontWeight: 800, color: '#16a34a' }}>$6,400.00</td>
                  <td style={{ fontSize: '0.78rem' }}>Periodic review with supplier Net 30 terms</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 800 }}>Calpol (Paracetamol 650mg)</td>
                  <td>Analgesic</td>
                  <td><span style={{ background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>Category C</span></td>
                  <td><span style={{ background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>Desirable (D)</span></td>
                  <td style={{ fontWeight: 800, color: '#16a34a' }}>$1,850.00</td>
                  <td style={{ fontSize: '0.78rem' }}>Bulk bulk-order discounts (Annual PO)</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Stock Valuation */}
        {reportTab === 'valuation' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '16px', borderRadius: '10px', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '0.85rem', color: '#166534', fontWeight: 600 }}>Total Purchase Cost Valuation</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#15803d' }}>${totalCostValuation.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              </div>
              <div style={{ padding: '16px', borderRadius: '10px', background: '#f0f9ff', border: '1px solid #bae6fd' }}>
                <div style={{ fontSize: '0.85rem', color: '#0369a1', fontWeight: 600 }}>Total Retail MRP Valuation</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0284c7' }}>${totalMrpValuation.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              </div>
            </div>

            <table className="dash-table">
              <thead>
                <tr>
                  <th>Drug Brand & Form</th>
                  <th>Current Units</th>
                  <th>Unit Cost</th>
                  <th>Unit MRP</th>
                  <th>Total Cost Valuation</th>
                  <th>Total MRP Valuation</th>
                  <th>Expected Margin</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map(m => {
                  const costVal = m.currentStock * m.unitCost;
                  const mrpVal = m.currentStock * m.unitMrp;
                  const marginPct = (((m.unitMrp - m.unitCost) / m.unitMrp) * 100).toFixed(1);

                  return (
                    <tr key={m.id}>
                      <td style={{ fontWeight: 700 }}>{m.brandName}</td>
                      <td><strong>{m.currentStock}</strong></td>
                      <td>${m.unitCost}</td>
                      <td>${m.unitMrp}</td>
                      <td style={{ fontWeight: 700 }}>${costVal.toFixed(2)}</td>
                      <td style={{ fontWeight: 700, color: '#0284c7' }}>${mrpVal.toFixed(2)}</td>
                      <td>
                        <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
                          +{marginPct}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Sales Register */}
        {reportTab === 'sales-register' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Invoice ID & Date</th>
                  <th>Customer Name</th>
                  <th>Payment Mode</th>
                  <th>Gross Total</th>
                  <th>Pharma GST (12%)</th>
                  <th>Discount</th>
                  <th>Net Paid</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {posSales.map(sale => (
                  <tr key={sale.invoiceId}>
                    <td style={{ fontWeight: 800 }}>{sale.invoiceId}</td>
                    <td>{sale.customerName}</td>
                    <td>{sale.paymentMode}</td>
                    <td>${sale.totalGross.toFixed(2)}</td>
                    <td style={{ color: '#0284c7', fontWeight: 600 }}>+${sale.gstTaxAmount.toFixed(2)}</td>
                    <td style={{ color: '#16a34a' }}>-${sale.discountAmount.toFixed(2)}</td>
                    <td style={{ fontWeight: 800, color: '#15803d' }}>${sale.netPaid.toFixed(2)}</td>
                    <td>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 4: Fast / Slow Moving Velocity */}
        {reportTab === 'fast-slow' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Drug Name</th>
                  <th>Dispensed / Month</th>
                  <th>Stock Turnover Rate</th>
                  <th>Velocity Classification</th>
                  <th>Days of Supply Remaining</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 800 }}>Paracetamol 650mg</td>
                  <td>1,420 Units</td>
                  <td>12.4x / Year</td>
                  <td><span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>Fast-Moving (High Velocity)</span></td>
                  <td><strong>19 Days</strong></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 800 }}>Zestril (Lisinopril 10mg)</td>
                  <td>680 Units</td>
                  <td>8.6x / Year</td>
                  <td><span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>Fast-Moving</span></td>
                  <td><strong>24 Days</strong></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 800 }}>Ventolin (Salbutamol Inhaler)</td>
                  <td>120 Units</td>
                  <td>4.2x / Year</td>
                  <td><span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>Medium-Moving</span></td>
                  <td><strong>38 Days</strong></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 800 }}>Enoxaparin 40mg Syringe</td>
                  <td>35 Units</td>
                  <td>1.8x / Year</td>
                  <td><span style={{ background: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>Slow-Moving</span></td>
                  <td><strong>65 Days</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
