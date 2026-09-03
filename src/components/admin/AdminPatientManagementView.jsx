import React, { useState } from 'react';
import { useEmr } from '../../context/EmrContext';
import { 
  Users, Search, UserPlus, Merge, Sparkles, 
  AlertTriangle, CheckCircle, RefreshCw, Eye, 
  ArrowRight, ShieldCheck, Database 
} from 'lucide-react';

export default function AdminPatientManagementView({ onShowToast }) {
  const { patientRecord, patientDatabase, mergePatientRecords } = useEmr();
  const [searchTerm, setSearchTerm] = useState('');
  const [showMergeTool, setShowMergeTool] = useState(false);
  const [duplicateScanExecuted, setDuplicateScanExecuted] = useState(false);
  const [duplicateList, setDuplicateList] = useState([]);

  // Merge Selection State
  const [selectedPrimaryUhid, setSelectedPrimaryUhid] = useState('UHID-MED-2026-08942');
  const [selectedSecondaryUhid, setSelectedSecondaryUhid] = useState('UHID-MED-2025-01449');

  const runAiDuplicateScan = () => {
    setDuplicateScanExecuted(true);
    // Find potential duplicate pair
    const matches = patientDatabase.filter(p => p.fullName.toLowerCase().includes('sarah'));
    setDuplicateList(matches);
    if (onShowToast) onShowToast('AI Duplicate Engine detected 1 high-probability duplicate record (Score: 92%)', 'warning');
  };

  const handleMergeSubmit = () => {
    mergePatientRecords(
      selectedPrimaryUhid, 
      selectedSecondaryUhid, 
      { email: 'patient@medicare.health' }, 
      'Marcus Vance, MHA'
    );
    if (onShowToast) onShowToast(`Successfully consolidated ${selectedSecondaryUhid} into Master UHID ${selectedPrimaryUhid}!`, 'success');
    setShowMergeTool(false);
  };

  const filteredPatients = patientDatabase.filter(p => 
    p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.uhid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">Patient Master Index & Duplicate Merge Engine</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Search central patient database, manage identifiers (UHID/Barcode/National ID), and execute controlled record merges
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setShowMergeTool(true);
                runAiDuplicateScan();
              }}
              style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', fontWeight: 700 }}
            >
              <Sparkles size={14} style={{ display: 'inline', marginRight: 4 }} />
              AI Duplicate Merge Tool
            </button>
          </div>
        </div>

        {/* AI Duplicate Detection & Controlled Merge Tool */}
        {showMergeTool && (
          <div style={{ background: '#fffbeb', border: '2px solid #fde68a', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Merge size={20} color="#b45309" />
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#92400e' }}>
                  Controlled Patient Record Merge Workflow
                </h3>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowMergeTool(false)}>
                Close Merge Tool
              </button>
            </div>

            <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: '#78350f' }}>
              The AI fuzzy matching engine detected multiple records sharing identical phone numbers, National IDs, and DOB. Select which record to maintain as the surviving Master UHID:
            </p>

            {/* Side by Side Comparison Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
              
              {/* Surviving Record A */}
              <div style={{ background: '#ffffff', border: '2px solid #10b981', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 800, color: '#166534', fontSize: '0.92rem' }}>[MASTER / SURVIVING RECORD]</span>
                  <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                    Active (Primary)
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                  <div><strong>UHID:</strong> {selectedPrimaryUhid}</div>
                  <div><strong>Name:</strong> Sarah Connor</div>
                  <div><strong>DOB:</strong> 1988-05-14 (38 yrs)</div>
                  <div><strong>Phone:</strong> +1 (555) 234-8901</div>
                  <div><strong>Email:</strong> patient@medicare.health</div>
                  <div><strong>National ID:</strong> XXXX-XXXX-4921</div>
                </div>
              </div>

              {/* Secondary Record B (To be merged) */}
              <div style={{ background: '#ffffff', border: '2px solid #f59e0b', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 800, color: '#92400e', fontSize: '0.92rem' }}>[DUPLICATE TO MERGE & ARCHIVE]</span>
                  <span style={{ background: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                    Historical Flagged
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                  <div><strong>UHID:</strong> {selectedSecondaryUhid}</div>
                  <div><strong>Name:</strong> Sarah J. Connor</div>
                  <div><strong>DOB:</strong> 1988-05-14 (38 yrs)</div>
                  <div><strong>Phone:</strong> +1 (555) 234-8901</div>
                  <div><strong>Email:</strong> sarahconnor.old@gmail.com</div>
                  <div><strong>National ID:</strong> XXXX-XXXX-4921</div>
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                className="btn btn-primary btn-sm"
                onClick={handleMergeSubmit}
                style={{ background: '#b45309', border: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Merge size={15} /> Execute Controlled Merge & Re-assign Encounters
              </button>
            </div>
          </div>
        )}

        {/* Patient Registry Search & Table */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ position: 'relative', maxWidth: '380px' }}>
            <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search by UHID, patient name, phone..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>
        </div>

        <table className="dash-table">
          <thead>
            <tr>
              <th>UHID Number</th>
              <th>Full Patient Name</th>
              <th>DOB & Gender</th>
              <th>Mobile Phone</th>
              <th>Email</th>
              <th>Status / Merge History</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.uhid}>
                <td style={{ fontWeight: 700, color: '#0284c7' }}>{patient.uhid}</td>
                <td style={{ fontWeight: 800, color: '#0f172a' }}>{patient.fullName}</td>
                <td>{patient.dob} • {patient.gender}</td>
                <td>{patient.phone}</td>
                <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{patient.email}</td>
                <td>
                  <span style={{ 
                    background: patient.status.includes('Merged') ? '#f1f5f9' : patient.status.includes('Flagged') ? '#fef3c7' : '#dcfce7',
                    color: patient.status.includes('Merged') ? '#64748b' : patient.status.includes('Flagged') ? '#d97706' : '#15803d',
                    padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 
                  }}>
                    {patient.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
