import React, { useState } from 'react';
import { useEmr } from '../../context/EmrContext';
import { 
  ShieldCheck, Shield, Lock, Check, X, 
  Settings, Key, AlertCircle, RefreshCw 
} from 'lucide-react';

export default function SuperAdminRbacView({ onShowToast }) {
  const { rbacMatrix, updateRbacPermission } = useEmr();
  const [selectedRole, setSelectedRole] = useState('doctor');

  const moduleNames = [
    { key: 'patientSummary', label: 'Patient Summary Header' },
    { key: 'diagnoses', label: 'Diagnoses & Problems (ICD-10)' },
    { key: 'allergies', label: 'Allergies & Blood Group' },
    { key: 'medications', label: 'Medications & Prescriptions' },
    { key: 'vitals', label: 'Vitals & Flowsheet' },
    { key: 'clinicalNotes', label: 'Clinical SOAP Notes' },
    { key: 'labs', label: 'Laboratory Orders & Results' },
    { key: 'imaging', label: 'Radiology & PACS Imaging' },
    { key: 'procedures', label: 'Procedures & Surgeries' },
    { key: 'dischargeSummary', label: 'Discharge Summaries (ADT)' },
    { key: 'consents', label: 'Informed Consents & Legal' },
    { key: 'documents', label: 'Document Archive & Vault' },
    { key: 'timeline', label: 'Medical Timeline' },
    { key: 'versionHistory', label: 'Version History & Audit' },
    { key: 'userManagement', label: 'User Directory & Identity' },
    { key: 'systemConfig', label: 'EMR System Configuration' },
    { key: 'auditLogs', label: 'HIPAA Audit Trail' }
  ];

  const handleToggle = (moduleKey, permKey, currentVal) => {
    updateRbacPermission(selectedRole, moduleKey, permKey, !currentVal);
    if (onShowToast) onShowToast(`Updated ${selectedRole.toUpperCase()} permission for ${moduleKey}.${permKey}`, 'info');
  };

  const roleObj = rbacMatrix[selectedRole] || rbacMatrix.doctor;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="#4f46e5" />
              <h2 className="dash-card-title">Role-Based Access Control (RBAC) Governance Matrix</h2>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Configure granular module-level and action-level permissions (Read, Write, Sign, Delete) across the entire longitudinal EMR
            </div>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
          {Object.keys(rbacMatrix).map(roleKey => (
            <button
              key={roleKey}
              onClick={() => setSelectedRole(roleKey)}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: selectedRole === roleKey ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                background: selectedRole === roleKey ? '#e0e7ff' : '#ffffff',
                color: selectedRole === roleKey ? '#4338ca' : '#475569',
                fontWeight: 700,
                fontSize: '0.88rem',
                textTransform: 'capitalize',
                cursor: 'pointer'
              }}
            >
              {rbacMatrix[roleKey].roleName}
            </button>
          ))}
        </div>

        {/* Permission Grid Table */}
        <table className="dash-table">
          <thead>
            <tr>
              <th>EMR Module / Facet</th>
              <th style={{ textAlign: 'center' }}>Read (View)</th>
              <th style={{ textAlign: 'center' }}>Write (Create/Edit)</th>
              <th style={{ textAlign: 'center' }}>Sign (Lock)</th>
              <th style={{ textAlign: 'center' }}>Delete (Purge)</th>
              <th>Authorization Level Context</th>
            </tr>
          </thead>
          <tbody>
            {moduleNames.map(mod => {
              const perm = roleObj.permissions[mod.key] || { read: false, write: false, sign: false, delete: false, level: 'Restricted' };
              return (
                <tr key={mod.key}>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{mod.label}</td>

                  {/* Read Toggle */}
                  <td style={{ textAlign: 'center' }}>
                    <input 
                      type="checkbox" 
                      checked={perm.read}
                      onChange={() => handleToggle(mod.key, 'read', perm.read)}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                  </td>

                  {/* Write Toggle */}
                  <td style={{ textAlign: 'center' }}>
                    <input 
                      type="checkbox" 
                      checked={perm.write}
                      onChange={() => handleToggle(mod.key, 'write', perm.write)}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                  </td>

                  {/* Sign Toggle */}
                  <td style={{ textAlign: 'center' }}>
                    <input 
                      type="checkbox" 
                      checked={perm.sign}
                      onChange={() => handleToggle(mod.key, 'sign', perm.sign)}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                  </td>

                  {/* Delete Toggle */}
                  <td style={{ textAlign: 'center' }}>
                    <input 
                      type="checkbox" 
                      checked={perm.delete}
                      onChange={() => handleToggle(mod.key, 'delete', perm.delete)}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                  </td>

                  <td>
                    <span style={{ 
                      background: perm.level.includes('Full') ? '#e0e7ff' : perm.level.includes('No') ? '#fee2e2' : '#f0fdf4',
                      color: perm.level.includes('Full') ? '#4338ca' : perm.level.includes('No') ? '#dc2626' : '#15803d',
                      padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 
                    }}>
                      {perm.level}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
