import React, { useState } from 'react';
import { useLab } from '../../context/LabContext';
import LabOrdersWorkbenchView from './LabOrdersWorkbenchView';
import PhlebotomyCollectionQueueView from './PhlebotomyCollectionQueueView';
import SpecimenProcessingAnalyzersView from './SpecimenProcessingAnalyzersView';
import ResultEntryVerificationView from './ResultEntryVerificationView';
import CriticalPanicAlertsView from './CriticalPanicAlertsView';
import TestMasterDirectoryView from './TestMasterDirectoryView';
import LabBillingInvoicingView from './LabBillingInvoicingView';
import LabReportsArchiveView from './LabReportsArchiveView';
import LisAuditTrailView from './LisAuditTrailView';

import {
  FlaskConical, ListOrdered, Droplet, Cpu, ClipboardCheck,
  ShieldAlert, BookOpen, Receipt, FileText, Shield, AlertTriangle
} from 'lucide-react';

const LAB_TABS = [
  { id: 'orders',      label: 'Order Workbench',     icon: <ListOrdered size={15} />,      badge: null },
  { id: 'phlebotomy',  label: 'Phlebotomy Queue',    icon: <Droplet size={15} />,          badge: 'New' },
  { id: 'analyzers',   label: 'Analyzers & Routing', icon: <Cpu size={15} />,              badge: null },
  { id: 'results',     label: 'Results & Verification', icon: <ClipboardCheck size={15} />,badge: null },
  { id: 'critical',    label: 'Critical Alerts',     icon: <ShieldAlert size={15} />,      badge: 'Urgent' },
  { id: 'testmaster',  label: 'Test Master',         icon: <BookOpen size={15} />,         badge: null },
  { id: 'billing',     label: 'Lab Billing',         icon: <Receipt size={15} />,          badge: null },
  { id: 'reports',     label: 'Certified Reports',   icon: <FileText size={15} />,         badge: null },
  { id: 'audit',       label: 'LIS Audit Trail',     icon: <Shield size={15} />,           badge: null },
];

function Toast({ message, type, onClose }) {
  const colors = {
    success: { bg: '#f0fdf4', border: '#86efac', text: '#166534' },
    warning: { bg: '#fefce8', border: '#fde047', text: '#854d0e' },
    info:    { bg: '#eff6ff', border: '#93c5fd', text: '#1e3a5f' },
    error:   { bg: '#fef2f2', border: '#fca5a5', text: '#991b1b' },
  };
  const c = colors[type] || colors.info;

  return (
    <div style={{
      position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
      background: c.bg, border: `1px solid ${c.border}`, color: c.text,
      padding: '12px 18px', borderRadius: '10px', maxWidth: '420px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: '0.85rem', fontWeight: 600,
      display: 'flex', alignItems: 'center', gap: '10px'
    }}>
      {type === 'success' ? '✅' : type === 'warning' ? '⚠️' : type === 'error' ? '❌' : 'ℹ️'}
      {message}
      <button onClick={onClose} style={{ marginLeft: 'auto', cursor: 'pointer', background: 'none', border: 'none', color: c.text, fontWeight: 800 }}>×</button>
    </div>
  );
}

export default function LabOperationsModule() {
  const { criticalAlerts } = useLab();
  const [activeTab, setActiveTab] = useState('orders');
  const [toast, setToast] = useState(null);

  const pendingCritical = criticalAlerts.filter(a => a.status.includes('Pending')).length;

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const renderTab = () => {
    const props = { onShowToast: showToast };
    switch (activeTab) {
      case 'orders':     return <LabOrdersWorkbenchView {...props} />;
      case 'phlebotomy': return <PhlebotomyCollectionQueueView {...props} />;
      case 'analyzers':  return <SpecimenProcessingAnalyzersView {...props} />;
      case 'results':    return <ResultEntryVerificationView {...props} />;
      case 'critical':   return <CriticalPanicAlertsView {...props} />;
      case 'testmaster': return <TestMasterDirectoryView {...props} />;
      case 'billing':    return <LabBillingInvoicingView {...props} />;
      case 'reports':    return <LabReportsArchiveView {...props} />;
      case 'audit':      return <LisAuditTrailView />;
      default:           return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Module Header */}
      <div style={{
        padding: '16px 24px',
        background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0284c7 100%)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '8px', borderRadius: '10px' }}>
            <FlaskConical size={22} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, letterSpacing: '-0.01em' }}>
              Laboratory Operations Workbench
            </h1>
            <div style={{ fontSize: '0.78rem', opacity: 0.8, marginTop: '2px' }}>
              MediCare Clinical Laboratory Information System (LIS) — CLIA Certified
            </div>
          </div>
        </div>

        {pendingCritical > 0 && (
          <div style={{
            background: '#dc2626', color: '#ffffff',
            padding: '6px 14px', borderRadius: '20px',
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '0.8rem', fontWeight: 800,
            animation: 'pulse 1.5s infinite'
          }}>
            <AlertTriangle size={15} />
            {pendingCritical} Unacknowledged Panic {pendingCritical === 1 ? 'Alert' : 'Alerts'}
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '2px',
        padding: '0 24px',
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        overflowX: 'auto',
        flexShrink: 0
      }}>
        {LAB_TABS.map(tab => {
          const isActive = activeTab === tab.id;
          const showBadge = tab.id === 'critical' && pendingCritical > 0;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '11px 14px',
                border: 'none',
                background: 'transparent',
                color: isActive ? '#0284c7' : '#64748b',
                fontWeight: isActive ? 800 : 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                borderBottom: isActive ? '2px solid #0284c7' : '2px solid transparent',
                whiteSpace: 'nowrap',
                position: 'relative',
                transition: 'color 0.15s ease'
              }}
            >
              {tab.icon}
              {tab.label}
              {showBadge && (
                <span style={{
                  background: '#dc2626', color: '#ffffff',
                  borderRadius: '10px', fontSize: '0.65rem',
                  padding: '1px 6px', fontWeight: 800,
                  minWidth: '18px', textAlign: 'center'
                }}>
                  {pendingCritical}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
        {renderTab()}
      </div>

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
