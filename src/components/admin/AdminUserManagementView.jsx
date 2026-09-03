import React, { useState } from 'react';
import { useEmr } from '../../context/EmrContext';
import { 
  Users, UserPlus, Shield, ShieldCheck, 
  Check, X, Search, Filter, Lock, Key 
} from 'lucide-react';

export default function AdminUserManagementView({ onShowToast }) {
  const { usersList, addUser, toggleUserStatus } = useEmr();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New User Form State
  const [userForm, setUserForm] = useState({
    name: 'Dr. Lucas Hayes, MD',
    email: 'dr.hayes@medicare.health',
    role: 'doctor',
    department: 'Cardiology',
    specialty: 'Electrophysiology'
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addUser(userForm);
    if (onShowToast) onShowToast(`User ${userForm.name} added successfully!`, 'success');
    setShowAddModal(false);
  };

  const filteredUsers = usersList.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()) || u.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = selectedRoleFilter === 'all' || u.role.toLowerCase() === selectedRoleFilter.toLowerCase();
    return matchSearch && matchRole;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">User & Staff Identity Management</h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Manage clinicians, nurses, pharmacists, administrators, and patients with role-based access
            </div>
          </div>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setShowAddModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <UserPlus size={15} />
            <span>Add New User</span>
          </button>
        </div>

        {/* Search & Role Filter Bar */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search user by name, email, or department..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'doctor', 'patient', 'admin', 'superadmin', 'pharmacist', 'nurse'].map(r => (
              <button
                key={r}
                onClick={() => setSelectedRoleFilter(r)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: selectedRoleFilter === r ? '1px solid #2563eb' : '1px solid #e2e8f0',
                  background: selectedRoleFilter === r ? '#2563eb' : '#ffffff',
                  color: selectedRoleFilter === r ? '#ffffff' : '#475569',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  cursor: 'pointer'
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <table className="dash-table">
          <thead>
            <tr>
              <th>User Name & ID</th>
              <th>Role</th>
              <th>Department / Specialty</th>
              <th>Email</th>
              <th>MFA / Security</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{user.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{user.id}</div>
                </td>
                <td>
                  <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'capitalize' }}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>{user.department}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{user.specialty}</div>
                </td>
                <td style={{ fontSize: '0.82rem', color: '#475569' }}>{user.email}</td>
                <td>
                  <span style={{ fontSize: '0.75rem', color: user.mfaEnabled ? '#16a34a' : '#d97706', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={14} /> {user.mfaEnabled ? 'MFA Active' : 'MFA Optional'}
                  </span>
                </td>
                <td>
                  <span style={{ background: user.status === 'Active' ? '#dcfce7' : '#fee2e2', color: user.status === 'Active' ? '#15803d' : '#dc2626', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                    onClick={() => {
                      toggleUserStatus(user.id);
                      if (onShowToast) onShowToast(`Toggled status for ${user.name}`, 'info');
                    }}
                  >
                    {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add User Modal */}
        {showAddModal && (
          <div className="modal-overlay" style={{ zIndex: 1200 }}>
            <div className="modal-content-card" style={{ maxWidth: '500px', width: '90%' }}>
              <h3 style={{ margin: '0 0 14px 0', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                Create New Hospital User Account
              </h3>

              <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={userForm.name}
                    onChange={e => setUserForm({ ...userForm, name: e.target.value })}
                    required 
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Hospital Email</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      value={userForm.email}
                      onChange={e => setUserForm({ ...userForm, email: e.target.value })}
                      required 
                    />
                  </div>
                  <div>
                    <label className="form-label">Assigned Role</label>
                    <select 
                      className="form-input" 
                      value={userForm.role}
                      onChange={e => setUserForm({ ...userForm, role: e.target.value })}
                    >
                      <option value="doctor">Doctor</option>
                      <option value="nurse">Nurse</option>
                      <option value="pharmacist">Pharmacist</option>
                      <option value="admin">Operations Admin</option>
                      <option value="superadmin">SuperAdmin</option>
                      <option value="patient">Patient</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Department</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={userForm.department}
                      onChange={e => setUserForm({ ...userForm, department: e.target.value })} 
                    />
                  </div>
                  <div>
                    <label className="form-label">Specialty / Sub-discipline</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={userForm.specialty}
                      onChange={e => setUserForm({ ...userForm, specialty: e.target.value })} 
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Create User Account
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
