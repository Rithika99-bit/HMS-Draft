import React, { useState } from 'react';
import { departmentCategories, departmentsData } from '../data/departmentsData';
import { 
  HeartPulse, Brain, Bone, Baby, 
  AlertCircle, Sparkles, Users, Stethoscope, 
  Clock, UserCheck, CheckCircle2 
} from 'lucide-react';

const deptIconMap = {
  HeartPulse: HeartPulse,
  Brain: Brain,
  Bone: Bone,
  Baby: Baby,
  AlertCircle: AlertCircle,
  Sparkles: Sparkles,
  Users: Users,
  Stethoscope: Stethoscope
};

export default function DepartmentsSection({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredDepts = activeCategory === 'all' 
    ? departmentsData 
    : departmentsData.filter(d => d.category === activeCategory);

  return (
    <section className="departments-section" id="departments">
      <div className="container">
        <div className="section-header">
          <span className="section-tag teal">Centers of Medical Excellence</span>
          <h2 className="section-title">Specialized Clinical Departments</h2>
          <p className="section-subtitle">
            Advanced clinical units equipped with precision surgical, robotic, and diagnostic technologies.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="dept-tabs">
          {departmentCategories.map(cat => (
            <button
              key={cat.id}
              className={`dept-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Departments Grid */}
        <div className="departments-grid">
          {filteredDepts.map(dept => {
            const IconComp = deptIconMap[dept.icon] || Stethoscope;
            return (
              <div className="department-card" key={dept.id}>
                <div className="dept-header">
                  <div className="dept-icon" style={{ background: `${dept.color}15`, color: dept.color }}>
                    <IconComp size={24} />
                  </div>
                  <span className="dept-badge">{dept.badge}</span>
                </div>

                <h3 className="dept-title">{dept.name}</h3>
                <p className="dept-desc">{dept.shortDesc}</p>

                <div className="dept-meta-row">
                  <div className="dept-meta-item">
                    <span className="dept-meta-label">Avg. Wait Time</span>
                    <span className="dept-meta-val" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} color="#0284c7" /> {dept.avgWait}
                    </span>
                  </div>

                  <div className="dept-meta-item">
                    <span className="dept-meta-label">On-Duty Doctors</span>
                    <span className="dept-meta-val" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <UserCheck size={12} color="#0d9488" /> {dept.specialistsCount} Specialists
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '18px' }}>
                  {dept.features.slice(0, 2).map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#64748b' }}>
                      <CheckCircle2 size={13} color="#10b981" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <button 
                  className="btn btn-secondary btn-sm btn-full"
                  onClick={() => onOpenBooking(dept.name)}
                >
                  Consult Department
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
