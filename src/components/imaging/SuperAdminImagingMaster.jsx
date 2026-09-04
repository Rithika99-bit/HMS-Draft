import React, { useState } from 'react';
import { useImaging } from '../../context/ImagingContext';
import {
  Shield, Layers, Plus, Edit2, CheckCircle2, XCircle,
  Database, Server, Lock, Cpu, Eye, FileText, Check, AlertCircle
} from 'lucide-react';

export default function SuperAdminImagingMaster({ onShowToast }) {
  const {
    testMaster, addImagingTest, toggleTestStatus, updateImagingTest,
    pacsConfig, updatePacsConfig, risAuditTrail
  } = useImaging();

  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'config' | 'pacs' | 'audit'
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTest, setEditingTest] = useState(null);

  // Form for New/Edit Test
  const [testForm, setTestForm] = useState({
    testCode: '', testName: '', modality: 'X-Ray', bodyRegion: 'Chest',
    price: 100, contrastRequired: false, fastingRequired: 'No',
    turnaroundTimeHours: 2, patientPrep: 'No special prep required.',
    equipment: 'DR Suite 1 — GE Definium 6000', reportTemplate: 'Standard'
  });

  // PACS Form
  const [pacsForm, setPacsForm] = useState(pacsConfig);

  const handleOpenAdd = () => {
    setEditingTest(null);
    setTestForm({
      testCode: `IMG-NEW-${Math.floor(100 + Math.random() * 900)}`,
      testName: '', modality: 'X-Ray', bodyRegion: 'Thorax',
      price: 150, contrastRequired: false, fastingRequired: 'No',
      turnaroundTimeHours: 2, patientPrep: 'Remove metal objects.',
      equipment: 'Suite 1 DR GE', reportTemplate: 'General'
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (test) => {
    setEditingTest(test.testCode);
    setTestForm({ ...test });
    setShowAddModal(true);
  };

  const handleSaveTest = (e) => {
    e.preventDefault();
    if (editingTest) {
      updateImagingTest(editingTest, { ...testForm, price: parseFloat(testForm.price) });
      if (onShowToast) onShowToast(`Updated test ${testForm.testName}`, 'success');
    } else {
      addImagingTest({
        ...testForm,
        price: parseFloat(testForm.price),
        status: 'Active'
      });
      if (onShowToast) onShowToast(`Added new imaging test ${testForm.testName}!`, 'success');
    }
    setShowAddModal(false);
  };

  const handleSavePacs = (e) => {
    e.preventDefault();
    updatePacsConfig(pacsForm);
    if (onShowToast) onShowToast('PACS & DICOM integration settings updated successfully!', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Module Header */}
      <div className="dash-card" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={24} color="#818cf8" />
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>Super Admin — Imaging Governance & Master Control</h2>
            </div>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem', color: '#c7d2fe' }}>
              Master test catalog creation, pricing, modality room allocation, DICOM/PACS system parameters & audit trails.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ background: 'rgba(255,255,255,0.15)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700 }}>
              Modality Test Master: {testMaster.length} Cataloged
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '14px', flexWrap: 'wrap' }}>
          {[
            { id: 'catalog', label: 'Imaging Test Master', icon: Layers },
            { id: 'pacs', label: 'PACS & DICOM Integrations', icon: Server },
            { id: 'config', label: 'Rooms & Department Config', icon: Cpu },
            { id: 'audit', label: 'RIS Audit & Security Logs', icon: Lock }
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

      {/* ── 1. IMAGING TEST MASTER CATALOG ───────────────────────────────────── */}
      {activeTab === 'catalog' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h3 className="dash-card-title">Imaging Test Master Catalog</h3>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                Configure modalities (X-Ray, CT, MRI, Ultrasound), codes, pricing, contrast requirements, duration, and patient prep instructions.
              </div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={handleOpenAdd} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Plus size={15} /> Add New Imaging Test
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Code / Modality</th>
                  <th>Test Name & Region</th>
                  <th>Pricing ($)</th>
                  <th>Contrast & Prep</th>
                  <th>Duration</th>
                  <th>Equipment Suite</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {testMaster.map(test => (
                  <tr key={test.testCode} style={{ opacity: test.status === 'Active' ? 1 : 0.6 }}>
                    <td>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.82rem' }}>{test.testCode}</div>
                      <span style={{
                        background: test.modality === 'MRI' ? '#f3e8ff' : test.modality === 'CT Scan' ? '#fee2e2' : '#e0f2fe',
                        color: test.modality === 'MRI' ? '#7c3aed' : test.modality === 'CT Scan' ? '#dc2626' : '#0284c7',
                        padding: '1px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800
                      }}>
                        {test.modality}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{test.testName}</div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b' }}>Body Region: {test.bodyRegion}</div>
                    </td>
                    <td style={{ fontWeight: 800, color: '#16a34a', fontSize: '0.9rem' }}>
                      ${test.price.toFixed(2)}
                    </td>
                    <td>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: test.contrastRequired ? '#dc2626' : '#475569' }}>
                        {test.contrastRequired ? '⚠️ Contrast Required' : '✓ Non-Contrast'}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', fontStyle: 'italic' }}>
                        Fasting: {test.fastingRequired}
                      </div>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#475569' }}>
                      ~{test.turnaroundTimeHours} hr turnaround
                    </td>
                    <td style={{ fontSize: '0.75rem', color: '#475569' }}>
                      {test.equipment}
                    </td>
                    <td>
                      <span style={{
                        background: test.status === 'Active' ? '#dcfce7' : '#fee2e2',
                        color: test.status === 'Active' ? '#15803d' : '#dc2626',
                        padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800
                      }}>
                        {test.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="btn btn-secondary btn-sm" onClick={() => handleOpenEdit(test)} style={{ padding: '4px 8px' }}>
                          <Edit2 size={13} />
                        </button>
                        <button className={`btn btn-sm ${test.status === 'Active' ? 'btn-outline' : 'btn-primary'}`}
                          onClick={() => toggleTestStatus(test.testCode)} style={{ padding: '4px 8px', fontSize: '0.72rem' }}>
                          {test.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── 2. PACS & DICOM INTEGRATION CONFIG ──────────────────────────────── */}
      {activeTab === 'pacs' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h3 className="dash-card-title">PACS & DICOM Master Gateway Configuration</h3>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                Manage DICOM C-STORE, C-FIND, C-MOVE endpoints, Application Entity (AE) Titles, and HL7 FHIR v4 RIS sync.
              </div>
            </div>
          </div>

          <form onSubmit={handleSavePacs} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="form-label">PACS AE Title (Application Entity)</label>
              <input type="text" className="form-input" value={pacsForm.pacsAeTitle}
                onChange={e => setPacsForm({ ...pacsForm, pacsAeTitle: e.target.value })} required />
            </div>
            <div>
              <label className="form-label">PACS IP Address / Hostname</label>
              <input type="text" className="form-input" value={pacsForm.pacsIpAddress}
                onChange={e => setPacsForm({ ...pacsForm, pacsIpAddress: e.target.value })} required />
            </div>
            <div>
              <label className="form-label">DICOM Port (Default: 104 / 11112)</label>
              <input type="number" className="form-input" value={pacsForm.dicomPort}
                onChange={e => setPacsForm({ ...pacsForm, dicomPort: parseInt(e.target.value) })} required />
            </div>
            <div>
              <label className="form-label">DICOM Storage Archival Tier</label>
              <select className="form-input" value={pacsForm.storageTier} onChange={e => setPacsForm({ ...pacsForm, storageTier: e.target.value })}>
                <option value="Hot Cloud Archive (Amazon S3 / DICOM Web)">Hot Cloud Archive (Amazon S3 / DICOM Web)</option>
                <option value="On-Premises SAN/NAS Array">On-Premises SAN/NAS Array</option>
                <option value="Hybrid Cold Glacier Storage">Hybrid Cold Glacier Storage</option>
              </select>
            </div>
            <div>
              <label className="form-label">Legal Image Retention Policy</label>
              <select className="form-input" value={pacsForm.retentionYears} onChange={e => setPacsForm({ ...pacsForm, retentionYears: parseInt(e.target.value) })}>
                <option value={7}>7 Years (Standard Adult)</option>
                <option value={10}>10 Years (HIPAA Recommended)</option>
                <option value={21}>21 Years (Pediatric Protocol)</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                <input type="checkbox" checked={pacsForm.hl7FhirSync}
                  onChange={e => setPacsForm({ ...pacsForm, hl7FhirSync: e.target.checked })} />
                Enable Automated HL7 / FHIR R4 DiagnosticReport Sync
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                <input type="checkbox" checked={pacsForm.autoRouting}
                  onChange={e => setPacsForm({ ...pacsForm, autoRouting: e.target.checked })} />
                Auto-Route Modality Modality Worklist (MWL) to Modality Suites
              </label>
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button type="submit" className="btn btn-primary">
                Save PACS Gateway Configuration
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── 3. ROOMS & DEPARTMENT CONFIG ──────────────────────────────────── */}
      {activeTab === 'config' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h3 className="dash-card-title">Radiology Department Rooms & Equipment Master</h3>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                Managed rooms, radiation calibration certificates, and modality equipment specifications.
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {[
              { room: 'DR Suite 1', modality: 'X-Ray', machine: 'GE Definium 6000', status: 'Operational', calib: 'Valid thru Nov 2026' },
              { room: 'DR Suite 2', modality: 'X-Ray', machine: 'Siemens Multix', status: 'Operational', calib: 'Valid thru Jan 2027' },
              { room: 'CT Suite A', modality: 'CT Scan', machine: 'Siemens SOMATOM 128-Slice', status: 'Operational', calib: 'Valid thru Dec 2026' },
              { room: 'CT Suite B', modality: 'CT Scan', machine: 'GE Revolution 256-Slice', status: 'Operational', calib: 'Valid thru Oct 2026' },
              { room: 'MRI Room 1', modality: 'MRI', machine: 'Philips Ingenia 3.0 Tesla', status: 'Operational', calib: 'Valid thru Aug 2027' },
              { room: 'MRI Room 2', modality: 'MRI', machine: 'Siemens MAGNETOM 1.5T', status: 'Operational', calib: 'Valid thru Feb 2027' },
              { room: 'US Bay 1 & 2', modality: 'Ultrasound', machine: 'GE LOGIQ E10', status: 'Operational', calib: 'Calibrated Daily' },
              { room: 'Echo Lab Suite', modality: 'Echo', machine: 'Philips EPIQ CVx', status: 'Operational', calib: 'Calibrated Daily' }
            ].map((item, idx) => (
              <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', background: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 800, color: '#0f172a' }}>{item.room}</span>
                  <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>
                    {item.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#0284c7', fontWeight: 700 }}>{item.modality}</div>
                <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '4px' }}>Machine: {item.machine}</div>
                <div style={{ fontSize: '0.72rem', color: '#16a34a', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={12} /> {item.calib}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 4. RIS AUDIT & SECURITY LOGS ──────────────────────────────────── */}
      {activeTab === 'audit' && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h3 className="dash-card-title">Radiology Information System (RIS) Audit & Security Ledger</h3>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                Immutable SHA-256 event log tracking order creation, exam status transitions, PACS transfers, report sign-offs, and critical findings.
              </div>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Audit ID & Timestamp</th>
                  <th>User & Role</th>
                  <th>Action Event</th>
                  <th>Target Order</th>
                  <th>Audit Details</th>
                </tr>
              </thead>
              <tbody>
                {risAuditTrail.map(log => (
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
                        background: log.action.includes('SIGNED') ? '#dcfce7' : log.action.includes('CRITICAL') ? '#fee2e2' : '#e0f2fe',
                        color: log.action.includes('SIGNED') ? '#15803d' : log.action.includes('CRITICAL') ? '#dc2626' : '#0284c7',
                        padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800
                      }}>
                        {log.action}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, fontSize: '0.8rem', color: '#334155' }}>
                      {log.orderId}
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#475569' }}>
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Test Modal */}
      {showAddModal && (
        <div className="modal-overlay" style={{ zIndex: 1200 }}>
          <div className="modal-content-card" style={{ maxWidth: '580px', width: '92%' }}>
            <h3 style={{ margin: '0 0 14px 0', fontWeight: 800, fontSize: '1.15rem', color: '#0f172a' }}>
              {editingTest ? 'Edit Imaging Test Master' : 'Create New Imaging Test Master'}
            </h3>
            <form onSubmit={handleSaveTest} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">Test Code</label>
                  <input type="text" className="form-input" value={testForm.testCode}
                    onChange={e => setTestForm({ ...testForm, testCode: e.target.value })} required readOnly={!!editingTest} />
                </div>
                <div>
                  <label className="form-label">Modality</label>
                  <select className="form-input" value={testForm.modality} onChange={e => setTestForm({ ...testForm, modality: e.target.value })}>
                    <option value="X-Ray">X-Ray</option>
                    <option value="CT Scan">CT Scan</option>
                    <option value="MRI">MRI</option>
                    <option value="Ultrasound">Ultrasound</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Test Name</label>
                <input type="text" className="form-input" value={testForm.testName}
                  onChange={e => setTestForm({ ...testForm, testName: e.target.value })} placeholder="e.g. CT Chest HRCT" required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">Body Region</label>
                  <input type="text" className="form-input" value={testForm.bodyRegion}
                    onChange={e => setTestForm({ ...testForm, bodyRegion: e.target.value })} required />
                </div>
                <div>
                  <label className="form-label">Price ($ USD)</label>
                  <input type="number" step="0.01" className="form-input" value={testForm.price}
                    onChange={e => setTestForm({ ...testForm, price: e.target.value })} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">Fasting Required</label>
                  <select className="form-input" value={testForm.fastingRequired} onChange={e => setTestForm({ ...testForm, fastingRequired: e.target.value })}>
                    <option value="No">No</option>
                    <option value="Yes (4 Hours)">Yes (4 Hours)</option>
                    <option value="Yes (6 Hours)">Yes (6 Hours)</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={testForm.contrastRequired}
                      onChange={e => setTestForm({ ...testForm, contrastRequired: e.target.checked })} />
                    Requires IV Contrast Media
                  </label>
                </div>
              </div>

              <div>
                <label className="form-label">Patient Preparation Instructions</label>
                <textarea className="form-input" rows="2" value={testForm.patientPrep}
                  onChange={e => setTestForm({ ...testForm, patientPrep: e.target.value })} required />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Save Test Master</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
