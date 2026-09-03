import React, { useState } from 'react';
import PharmacyDashboardView from './PharmacyDashboardView';
import MedicineMasterView from './MedicineMasterView';
import StockBatchTrackingView from './StockBatchTrackingView';
import PrescriptionDispenseView from './PrescriptionDispenseView';
import PharmacyPosView from './PharmacyPosView';
import PurchasesGrnView from './PurchasesGrnView';
import StockTransfersView from './StockTransfersView';
import SuppliersView from './SuppliersView';
import AlertsCenterView from './AlertsCenterView';
import StockMovementLedgerView from './StockMovementLedgerView';
import PharmacyReportsView from './PharmacyReportsView';
import { 
  Pill, Activity, Package, ShoppingCart, 
  RotateCw, Truck, Building2, AlertTriangle, 
  BarChart3, FileText, CheckCircle, Clock, ShieldCheck 
} from 'lucide-react';

export default function PharmacyModule({ onShowToast }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const pharmacyNavTabs = [
    { id: 'dashboard', label: 'Pharmacy Dashboard', icon: Activity },
    { id: 'dispense', label: 'E-Rx Dispensing', icon: CheckCircle, highlight: true },
    { id: 'pos', label: 'POS Counter Sales', icon: ShoppingCart },
    { id: 'medicines', label: 'Medicine Master', icon: Pill },
    { id: 'batches', label: 'Batch & Expiry (FEFO)', icon: Package },
    { id: 'purchases', label: 'Purchases & GRN', icon: Truck },
    { id: 'transfers', label: 'Transfers & Adjust', icon: Building2 },
    { id: 'suppliers', label: 'Suppliers & Vendors', icon: FileText },
    { id: 'alerts', label: 'Alerts Radar', icon: AlertTriangle, warning: true },
    { id: 'movements', label: 'Traceable Stock Ledger', icon: RotateCw, ledger: true },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Pharmacy Horizontal Subnav Tabs */}
      <div className="admin-subnav-tabs" style={{ background: '#ffffff', padding: '10px 14px', boxShadow: 'var(--shadow-sm)', overflowX: 'auto', flexWrap: 'nowrap' }}>
        {pharmacyNavTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`admin-sub-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                fontSize: '0.84rem',
                padding: '9px 15px',
                whiteSpace: 'nowrap',
                color: tab.warning 
                  ? (isActive ? '#ffffff' : '#d97706') 
                  : tab.highlight 
                  ? (isActive ? '#ffffff' : '#16a34a')
                  : tab.ledger
                  ? (isActive ? '#ffffff' : '#0284c7')
                  : undefined
              }}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Views */}
      {activeTab === 'dashboard' && (
        <PharmacyDashboardView onNavigate={setActiveTab} onShowToast={onShowToast} />
      )}

      {activeTab === 'dispense' && (
        <PrescriptionDispenseView onShowToast={onShowToast} />
      )}

      {activeTab === 'pos' && (
        <PharmacyPosView onShowToast={onShowToast} />
      )}

      {activeTab === 'medicines' && (
        <MedicineMasterView onShowToast={onShowToast} />
      )}

      {activeTab === 'batches' && (
        <StockBatchTrackingView onShowToast={onShowToast} />
      )}

      {activeTab === 'purchases' && (
        <PurchasesGrnView onShowToast={onShowToast} />
      )}

      {activeTab === 'transfers' && (
        <StockTransfersView onShowToast={onShowToast} />
      )}

      {activeTab === 'suppliers' && (
        <SuppliersView onShowToast={onShowToast} />
      )}

      {activeTab === 'alerts' && (
        <AlertsCenterView onShowToast={onShowToast} />
      )}

      {activeTab === 'movements' && (
        <StockMovementLedgerView onShowToast={onShowToast} />
      )}

      {activeTab === 'reports' && (
        <PharmacyReportsView onShowToast={onShowToast} />
      )}

    </div>
  );
}
