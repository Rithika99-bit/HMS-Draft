import React, { useState } from 'react';
import { useLab } from '../../context/LabContext';
import { FlaskConical, Plus, Search, Edit3, Trash2, TestTube } from 'lucide-react';

export default function TestMasterDirectoryView({ onShowToast }) {
  const { testMaster, sampleTypes, addTestMaster } = useLab();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedTest, setExpandedTest] = useState(null);

  const [newTestForm, setNewTestForm] = useState({
    testCode: 'LAB-NEW-07',
    loincCode: '55425-0',
    testName: 'Thyroid Stimulating Hormone (TSH) with Reflex FT4',
    category: 'Endocrinology',
    sampleType: 'Serum',
    tubeType: 'SST Gold Top',
    volumeRequired: '2.5 mL',
    fastingRequired: 'No',
    turnaroundTimeHours: 4,
    price: 48.00,
    cptCode: '84443',
  });

  const categories = ['all', ...Array.from(new Set(testMaster.map(t => t.category)))];

  const filtered = testMaster.filter(t => {
    const matchSearch =
      t.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.testCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.loincCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = categoryFilter === 'all' || t.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const handleAddTest = (e) => {
    e.preventDefault();
    addTestMaster({
      ...newTestForm,
      price: parseFloat(newTestForm.price),
      turnaroundTimeHours: parseInt(newTestForm.turnaroundTimeHours),
      analytes: [],
      status: 'Active',
    });
    if (onShowToast) onShowToast(`New test "${newTestForm.testName}" added to Test Master!`, 'success');
    setShowAddModal(false);
  };

  const tubeColorMap = {
    'SST Gold Top': '#f59e0b',
    'EDTA Lavender Top': '#8b5cf6',
    'Citrate Light Blue': '#38bdf8',
    'Fluoride Gray Top': '#6b7280',
    'Heparin Green Top': '#16a34a',
    'EDTA Lavender': '#8b5cf6',
    'SST Gold Top / Heparin Green': '#f59e0b',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FlaskConical size={20} color="#0284c7" />
              <h2 className="dash-card-title">Diagnostic Test Master Directory & LOINC Catalog</h2>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Test definitions with LOINC codes, CPT codes, specimen requirements, TAT, pricing, and analyte reference ranges
            </div>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowAddModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={14} /> Add New Test Definition
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={15} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              placeholder="Search by test name, LOINC code, CPT code, or category..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                style={{
                  padding: '5px 11px', borderRadius: '6px',
                  border: categoryFilter === cat ? '1px solid #0284c7' : '1px solid #e2e8f0',
                  background: categoryFilter === cat ? '#0284c7' : '#ffffff',
                  color: categoryFilter === cat ? '#ffffff' : '#475569',
                  fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize'
                }}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Test Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map(test => {
            const isExpanded = expandedTest === test.testCode;
            const tubeColor = tubeColorMap[test.tubeType] || '#94a3b8';

            return (
              <div key={test.testCode}
                style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', background: '#ffffff' }}
              >
                <div
                  onClick={() => setExpandedTest(isExpanded ? null : test.testCode)}
                  style={{ padding: '14px 18px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {/* Tube Color Indicator */}
                    <div style={{
                      width: '10px', height: '32px', borderRadius: '3px',
                      background: tubeColor, flexShrink: 0
                    }} title={`Vacuum Tube: ${test.tubeType}`} />

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>{test.testName}</span>
                        <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 7px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>
                          {test.category}
                        </span>
                        <span style={{ background: '#f1f5f9', color: '#64748b', padding: '2px 7px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }}>
                          CPT: {test.cptCode}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '3px' }}>
                        LOINC: <strong>{test.loincCode}</strong> &nbsp;|&nbsp; Code: {test.testCode} &nbsp;|&nbsp;
                        Specimen: {test.sampleType} ({test.tubeType}) &nbsp;|&nbsp;
                        Volume: {test.volumeRequired} &nbsp;|&nbsp; TAT: {test.turnaroundTimeHours}h &nbsp;|&nbsp;
                        Fasting: {test.fastingRequired}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontWeight: 800, color: '#16a34a', fontSize: '1.05rem' }}>${test.price.toFixed(2)}</span>
                    <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                      {test.status}
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ borderTop: '1px solid #f1f5f9', padding: '14px 18px', background: '#f8fafc' }}>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>
                      Analyte Parameters & Biological Reference Intervals
                    </h4>
                    {test.analytes && test.analytes.length > 0 ? (
                      <table className="dash-table">
                        <thead>
                          <tr>
                            <th>Analyte / Test Component</th>
                            <th>Biological Reference Interval</th>
                            <th>Unit</th>
                            <th>Critical Low (Panic)</th>
                            <th>Critical High (Panic)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {test.analytes.map((analyte, idx) => (
                            <tr key={idx}>
                              <td style={{ fontWeight: 700 }}>{analyte.name}</td>
                              <td>{analyte.normalRange}</td>
                              <td style={{ color: '#64748b' }}>{analyte.unit}</td>
                              <td style={{ color: '#dc2626', fontWeight: 700 }}>
                                {analyte.criticalLow !== null ? `< ${analyte.criticalLow}` : '—'}
                              </td>
                              <td style={{ color: '#dc2626', fontWeight: 700 }}>
                                {analyte.criticalHigh !== null ? `> ${analyte.criticalHigh}` : '—'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>No analyte definitions yet. Edit this test to add analyte ranges.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add Test Modal */}
        {showAddModal && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '560px', width: '92%' }}>
              <h3 style={{ margin: '0 0 14px 0', fontWeight: 800, fontSize: '1.15rem', color: '#0f172a' }}>
                Add New Diagnostic Test to Master Catalog
              </h3>
              <form onSubmit={handleAddTest} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Test Name</label>
                    <input type="text" className="form-input" value={newTestForm.testName}
                      onChange={e => setNewTestForm({ ...newTestForm, testName: e.target.value })} required />
                  </div>
                  <div>
                    <label className="form-label">LOINC Code</label>
                    <input type="text" className="form-input" value={newTestForm.loincCode}
                      onChange={e => setNewTestForm({ ...newTestForm, loincCode: e.target.value })} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Test Code</label>
                    <input type="text" className="form-input" value={newTestForm.testCode}
                      onChange={e => setNewTestForm({ ...newTestForm, testCode: e.target.value })} required />
                  </div>
                  <div>
                    <label className="form-label">CPT Code</label>
                    <input type="text" className="form-input" value={newTestForm.cptCode}
                      onChange={e => setNewTestForm({ ...newTestForm, cptCode: e.target.value })} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Category</label>
                    <input type="text" className="form-input" value={newTestForm.category}
                      onChange={e => setNewTestForm({ ...newTestForm, category: e.target.value })} required />
                  </div>
                  <div>
                    <label className="form-label">Price ($)</label>
                    <input type="number" step="0.01" className="form-input" value={newTestForm.price}
                      onChange={e => setNewTestForm({ ...newTestForm, price: e.target.value })} required />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Sample Type</label>
                    <input type="text" className="form-input" value={newTestForm.sampleType}
                      onChange={e => setNewTestForm({ ...newTestForm, sampleType: e.target.value })} />
                  </div>
                  <div>
                    <label className="form-label">Volume Required</label>
                    <input type="text" className="form-input" value={newTestForm.volumeRequired}
                      onChange={e => setNewTestForm({ ...newTestForm, volumeRequired: e.target.value })} />
                  </div>
                  <div>
                    <label className="form-label">TAT (Hours)</label>
                    <input type="number" className="form-input" value={newTestForm.turnaroundTimeHours}
                      onChange={e => setNewTestForm({ ...newTestForm, turnaroundTimeHours: e.target.value })} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary btn-sm">Add to Test Master</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
