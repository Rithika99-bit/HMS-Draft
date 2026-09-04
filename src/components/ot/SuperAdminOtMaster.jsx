import React, { useState } from 'react';
import { useOt } from '../../context/OtContext';
import {
  Shield, Layers, Plus, Edit2, CheckCircle2, Lock,
  Cpu, Server, Activity, FileText, Check, DollarSign, Package, Syringe
} from 'lucide-react';

export default function SuperAdminOtMaster({ onShowToast }) {
  const {
    otSuites, procedureMaster, anaesthesiaTypes, asaClassifications,
    otImplants, otConsumables, otAuditTrail
  } = useOt();

  const [activeTab, setActiveTab] = useState('suites'); // 'suites' | 'procedures' | 'implants' | 'roles' | 'audit'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Module Header */}
      <div className="dash-card" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={24} color="#818cf8" />
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>Super Admin — Operation Theatre (OT) Governance Master</h2>
            </div>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem', color: '#c7d2fe' }}>
              Configure OT suites, room operating rules, procedure fee schedules, implant serial/lot tracking, staff roles, and audit trails.
            </p>
          </div>
          <span style={{ background: 'rgba(255,255,255,0.15)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700 }}>
            Active OT Suites: {otSuites.length} Suites Configured
          </span>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '14px', flexWrap: 'wrap' }}>
          {[
            { id: 'suites', label: 'OT Rooms & Suites Master', icon: Cpu },
            { id: 'procedures', label: 'Surgical Procedure Master', icon: Layers },
            { id: 'implants', label: 'Implant & Consumable Catalog', icon: Package },
            { id: 'roles', label: 'Staff Roles & Permissions', icon: Shield },
            { id: 'audit', label: 'OT Audit & Security Logs', icon: Lock }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                background: active ? '#ffffff' : 'rgba(255,255,255,0.1)',
                color: active ? '#312e81' : '#ffffff',
                border: 'none', padding: '8px 16px', borderRadius: '8px',
                fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s'
              }}>
                <Icon size={15} /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 1. OT SUITES & ROOMS MASTER ──────────────────────────────────────── */}
      {activeTab === 'suites' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h3 className="dash-card-title">Operation Theatre Suites & Equipment Configuration</h3>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                Manage OT rooms, operating hours, hourly billing rates, and surgical equipment setup.
              </div>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>OT Suite Code</th>
                  <th>Name & Category</th>
                  <th>Location</th>
                  <th>Operating Hours</th>
                  <th>Hourly Rate ($)</th>
                  <th>Key Equipment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {otSuites.map(suite => (
                  <tr key={suite.otId}>
                    <td style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.82rem' }}>{suite.otId}</td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{suite.name}</div>
                      <div style={{ fontSize: '0.74rem', color: '#0284c7', fontWeight: 600 }}>{suite.category}</div>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#475569' }}>{suite.location}</td>
                    <td style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 600 }}>{suite.operatingHours}</td>
                    <td style={{ fontWeight: 800, color: '#0f172a' }}>${suite.hourlyRate.toFixed(2)}/hr</td>
                    <td style={{ fontSize: '0.75rem', color: '#475569' }}>
                      {suite.equipment.join(', ')}
                    </td>
                    <td>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
                        {suite.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── 2. SURGICAL PROCEDURE MASTER ────────────────────────────────────── */}
      {activeTab === 'procedures' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h3 className="dash-card-title">Surgical Procedure & CPT Master Catalog</h3>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                Master CPT codes, estimated durations, default anaesthesia protocols, and base procedure fees.
              </div>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Code / CPT</th>
                  <th>Procedure Name</th>
                  <th>Category</th>
                  <th>Est Duration</th>
                  <th>Required OT Suite Type</th>
                  <th>Base Procedure Fee ($)</th>
                </tr>
              </thead>
              <tbody>
                {procedureMaster.map(proc => (
                  <tr key={proc.procCode}>
                    <td>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.82rem' }}>{proc.procCode}</div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>CPT: {proc.cptCode}</div>
                    </td>
                    <td style={{ fontWeight: 700, color: '#0f172a' }}>{proc.name}</td>
                    <td>
                      <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 6px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                        {proc.category}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#475569' }}>~{proc.estDurationMins} mins</td>
                    <td style={{ fontSize: '0.78rem', color: '#334155' }}>{proc.requiredOtType}</td>
                    <td style={{ fontWeight: 800, color: '#16a34a', fontSize: '0.9rem' }}>
                      ${proc.baseCost.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── 3. IMPLANT & CONSUMABLE MASTER CATALOG ─────────────────────────── */}
      {activeTab === 'implants' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="dash-card">
            <h3 className="dash-card-title" style={{ marginBottom: '12px' }}>Surgical Implant Master (Serial & Lot # Tracked)</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Implant ID</th>
                    <th>Implant Description</th>
                    <th>Category</th>
                    <th>Manufacturer</th>
                    <th>Unit Price ($)</th>
                    <th>Tracking Policy</th>
                  </tr>
                </thead>
                <tbody>
                  {otImplants.map(imp => (
                    <tr key={imp.implantId}>
                      <td style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.82rem' }}>{imp.implantId}</td>
                      <td style={{ fontWeight: 700, color: '#0f172a' }}>{imp.name}</td>
                      <td style={{ fontSize: '0.78rem', color: '#0284c7' }}>{imp.category}</td>
                      <td style={{ fontSize: '0.78rem', color: '#475569' }}>{imp.manufacturer}</td>
                      <td style={{ fontWeight: 800, color: '#16a34a' }}>${imp.unitCost.toFixed(2)}</td>
                      <td>
                        <span style={{ background: '#fef3c7', color: '#d97706', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>
                          Mandatory Serial/Lot #
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dash-card">
            <h3 className="dash-card-title" style={{ marginBottom: '12px' }}>OT Consumables Inventory</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              {otConsumables.map(con => (
                <div key={con.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', background: '#f8fafc' }}>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.85rem' }}>{con.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 700, marginTop: '4px' }}>${con.unitCost.toFixed(2)} / unit</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>Stock: {con.inStock} units</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 4. STAFF ROLES & PERMISSIONS ──────────────────────────────────── */}
      {activeTab === 'roles' && (
        <div className="dash-card">
          <h3 className="dash-card-title" style={{ marginBottom: '12px' }}>OT Staff Roles & Access Control Matrix</h3>
          <table className="dash-table">
            <thead>
              <tr>
                <th>OT Role</th>
                <th>Primary Responsibilities</th>
                <th>Operative Note Permission</th>
                <th>WHO Safety Checklist</th>
                <th>Anaesthesia Record</th>
                <th>Billing & Stock Access</th>
              </tr>
            </thead>
            <tbody>
              {[
                { role: 'Primary Surgeon (MD)', resp: 'Owns clinical request, surgical technique, operative note & implants', note: 'Write & Sign', who: 'View', anaes: 'View', bill: 'View' },
                { role: 'Anaesthetist (MD)', resp: 'Pre-anaesthesia PAC, ASA classification, vitals, drugs, PACU handover', note: 'View', who: 'View', anaes: 'Full Control', bill: 'View' },
                { role: 'OT Scrub Nurse (RN)', resp: 'WHO Timeout, instrument/sponge count, patient prep, specimen dispatch', note: 'View', who: 'Execute & Sign', anaes: 'View', bill: 'Deduct Stock' },
                { role: 'OT Admin Director', resp: 'Calendar, room allocation, staff assignment, emergency surge, OT billing', note: 'View', who: 'Monitor', anaes: 'View', bill: 'Full Invoice Control' }
              ].map((r, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 800, color: '#0f172a' }}>{r.role}</td>
                  <td style={{ fontSize: '0.78rem', color: '#475569' }}>{r.resp}</td>
                  <td style={{ fontWeight: 700, color: '#0284c7', fontSize: '0.78rem' }}>{r.note}</td>
                  <td style={{ fontWeight: 700, color: '#e11d48', fontSize: '0.78rem' }}>{r.who}</td>
                  <td style={{ fontWeight: 700, color: '#059669', fontSize: '0.78rem' }}>{r.anaes}</td>
                  <td style={{ fontWeight: 700, color: '#334155', fontSize: '0.78rem' }}>{r.bill}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── 5. OT AUDIT LOGS ──────────────────────────────────────────────── */}
      {activeTab === 'audit' && (
        <div className="dash-card">
          <h3 className="dash-card-title" style={{ marginBottom: '12px' }}>Operation Theatre (OT) Audit Trail Ledger</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Audit ID & Timestamp</th>
                  <th>User & Role</th>
                  <th>Action Event</th>
                  <th>Case ID</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {otAuditTrail.map(log => (
                  <tr key={log.auditId}>
                    <td>
                      <div style={{ fontWeight: 800, fontFamily: 'monospace', fontSize: '0.8rem', color: '#0f172a' }}>{log.auditId}</div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{log.timestamp}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0284c7', fontSize: '0.82rem' }}>{log.user}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{log.role}</div>
                    </td>
                    <td>
                      <span style={{
                        background: log.action.includes('SIGNED') ? '#dcfce7' : log.action.includes('WHO') ? '#ffe4e6' : '#e0f2fe',
                        color: log.action.includes('SIGNED') ? '#15803d' : log.action.includes('WHO') ? '#e11d48' : '#0284c7',
                        padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800
                      }}>
                        {log.action}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, fontSize: '0.8rem', color: '#334155' }}>{log.caseId}</td>
                    <td style={{ fontSize: '0.8rem', color: '#475569' }}>{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
