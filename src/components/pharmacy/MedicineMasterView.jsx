import React, { useState } from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import { 
  Pill, Search, Plus, Filter, Building2, 
  Tag, ShieldCheck, Check, AlertCircle 
} from 'lucide-react';

export default function MedicineMasterView({ onShowToast }) {
  const { medicines, categories, manufacturers, addMedicine } = usePharmacy();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Drug Form State
  const [medForm, setMedForm] = useState({
    brandName: 'Augmentin 625 (Amoxicillin + Clavulanate)',
    genericName: 'Amoxicillin 500mg + Potassium Clavulanate 125mg',
    categoryId: 'CAT-02',
    categoryName: 'Antimicrobials & Antibiotics',
    mfgId: 'MFG-05',
    mfgName: 'GlaxoSmithKline (GSK)',
    dosageForm: 'Oral Film-Coated Tablet',
    strength: '625 mg',
    packSize: '10 Tablets / Strip',
    storageCondition: 'Ambient (Below 25°C, Moisture Sensitive)',
    scheduleType: 'Schedule H (Rx Only)',
    purchasePrice: 14.00,
    unitCost: 1.40,
    sellingPriceMrp: 26.00,
    unitMrp: 2.60,
    gstTaxSlab: '12%',
    hsnCode: '30041090',
    reorderLevel: 80,
    safetyStock: 30,
    initialStock: 150
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addMedicine(medForm);
    if (onShowToast) onShowToast(`Drug "${medForm.brandName}" added to master catalog!`, 'success');
    setShowAddModal(false);
  };

  const filteredMedicines = medicines.filter(m => {
    const matchSearch = m.brandName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.mfgName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'all' || m.categoryId === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Medicine Master Catalog & Classifications</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Central formulary directory, dosage forms, therapeutic classifications, manufacturers, and tax matrices
            </div>
          </div>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setShowAddModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={15} />
            <span>Add Medicine to Master</span>
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search by brand name, generic INN, code, or manufacturer..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>

          <select 
            className="form-input" 
            style={{ width: 'auto', minWidth: '220px' }}
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Therapeutic Categories ({medicines.length})</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Medicine Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Drug Code & Brand Name</th>
                <th>Generic Composition</th>
                <th>Form & Strength</th>
                <th>Therapeutic Category</th>
                <th>Manufacturer</th>
                <th>Unit Cost / MRP</th>
                <th>GST Tax</th>
                <th>Central Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map(med => (
                <tr key={med.id}>
                  <td>
                    <div style={{ fontWeight: 800, color: '#0f172a' }}>{med.brandName}</div>
                    <div style={{ fontSize: '0.72rem', color: '#0284c7', fontFamily: 'monospace' }}>{med.code}</div>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#334155' }}>{med.genericName}</td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>{med.strength}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{med.dosageForm}</div>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#475569' }}>{med.categoryName}</td>
                  <td style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 600 }}>{med.mfgName}</td>
                  <td>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a' }}>MRP: ${med.unitMrp}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Cost: ${med.unitCost}</div>
                  </td>
                  <td>
                    <span style={{ background: '#f1f5f9', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {med.gstTaxSlab}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 800, color: med.currentStock <= med.reorderLevel ? '#dc2626' : '#0f172a' }}>
                      {med.currentStock} Units
                    </span>
                  </td>
                  <td>
                    <span style={{ 
                      background: med.status.includes('Low') ? '#fee2e2' : '#dcfce7',
                      color: med.status.includes('Low') ? '#dc2626' : '#15803d',
                      padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 
                    }}>
                      {med.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Medicine Modal */}
        {showAddModal && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '680px', width: '92%', maxHeight: '90vh', overflowY: 'auto' }}>
              <h3 style={{ margin: '0 0 14px 0', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                Add New Drug to Medicine Master
              </h3>

              <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Brand Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={medForm.brandName}
                      onChange={e => setMedForm({ ...medForm, brandName: e.target.value })}
                      required 
                    />
                  </div>
                  <div>
                    <label className="form-label">Generic Name (INN)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={medForm.genericName}
                      onChange={e => setMedForm({ ...medForm, genericName: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Therapeutic Category</label>
                    <select 
                      className="form-input" 
                      value={medForm.categoryId}
                      onChange={e => {
                        const cat = categories.find(c => c.id === e.target.value);
                        setMedForm({ ...medForm, categoryId: e.target.value, categoryName: cat?.name });
                      }}
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Manufacturer</label>
                    <select 
                      className="form-input" 
                      value={medForm.mfgId}
                      onChange={e => {
                        const mfg = manufacturers.find(m => m.id === e.target.value);
                        setMedForm({ ...medForm, mfgId: e.target.value, mfgName: mfg?.name });
                      }}
                    >
                      {manufacturers.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Dosage Form</label>
                    <select 
                      className="form-input" 
                      value={medForm.dosageForm}
                      onChange={e => setMedForm({ ...medForm, dosageForm: e.target.value })}
                    >
                      <option value="Oral Tablet">Oral Tablet</option>
                      <option value="Oral Capsule">Oral Capsule</option>
                      <option value="IV / IM Injection Vial">IV / IM Injection Vial</option>
                      <option value="Inhalation Aerosol (MDI)">Inhalation Aerosol (MDI)</option>
                      <option value="Oral Liquid / Syrup">Oral Liquid / Syrup</option>
                      <option value="Topical Gel / Ointment">Topical Gel / Ointment</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Strength</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={medForm.strength}
                      onChange={e => setMedForm({ ...medForm, strength: e.target.value })} 
                    />
                  </div>
                  <div>
                    <label className="form-label">GST Tax Slab</label>
                    <select 
                      className="form-input" 
                      value={medForm.gstTaxSlab}
                      onChange={e => setMedForm({ ...medForm, gstTaxSlab: e.target.value })}
                    >
                      <option value="0%">0% (Exempt)</option>
                      <option value="5%">5% (Life Saving)</option>
                      <option value="12%">12% (Standard Pharma)</option>
                      <option value="18%">18% (Cosmetic / Sanitizer)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Unit Cost ($)</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      className="form-input" 
                      value={medForm.unitCost}
                      onChange={e => setMedForm({ ...medForm, unitCost: parseFloat(e.target.value) })} 
                    />
                  </div>
                  <div>
                    <label className="form-label">Unit MRP ($)</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      className="form-input" 
                      value={medForm.unitMrp}
                      onChange={e => setMedForm({ ...medForm, unitMrp: parseFloat(e.target.value) })} 
                    />
                  </div>
                  <div>
                    <label className="form-label">Initial Opening Stock</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={medForm.initialStock}
                      onChange={e => setMedForm({ ...medForm, initialStock: parseInt(e.target.value, 10) })} 
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Save to Master Catalog
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
