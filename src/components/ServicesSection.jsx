import React, { useState } from 'react';
import { servicesData } from '../data/servicesData';
import { 
  Users, Stethoscope, FileText, 
  Pill, FlaskConical, CreditCard, 
  Check, ArrowRight, Sparkles 
} from 'lucide-react';

const iconMap = {
  Users: Users,
  Stethoscope: Stethoscope,
  FileHeart: FileText,
  Pill: Pill,
  FlaskConical: FlaskConical,
  CreditCard: CreditCard
};

export default function ServicesSection({ onOpenBooking, onShowToast }) {
  const [activeModule, setActiveModule] = useState(null);

  const handleModuleClick = (service) => {
    setActiveModule(service.id);
    if (onShowToast) {
      onShowToast(`Selected ${service.title} • Live Status Active (${service.stat})`, 'info');
    }
  };

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header">
          <span className="section-tag blue">
            <Sparkles size={14} className="tag-icon-pulse" />
            Enterprise Hospital Ecosystem
          </span>
          <h2 className="section-title">6 Core Healthcare Modules</h2>
          <p className="section-subtitle">
            Smart digital hospital operations powering admissions, encrypted EMR, automated pharmacy, and diagnostics.
          </p>
        </div>

        <div className="services-grid">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Stethoscope;
            return (
              <div 
                className={`service-card ${activeModule === service.id ? 'active-card' : ''}`}
                key={service.id}
                style={{
                  '--card-color': service.color,
                  '--card-rgb': service.colorRgb,
                  '--card-index': index
                }}
                onClick={() => handleModuleClick(service)}
              >
                <div className="service-card-top">
                  <div className="service-icon-box" style={{ background: service.color }}>
                    <IconComponent size={24} strokeWidth={2.4} />
                  </div>
                  <span className="service-num">{service.number}</span>
                </div>

                <h3 className="service-title">{service.title}</h3>
                <div className="service-subtitle">{service.subtitle}</div>
                <p className="service-desc">{service.description}</p>

                <div className="service-features-list">
                  {service.features.map((feat, idx) => (
                    <div className="service-feature-item" key={idx}>
                      <Check size={14} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="service-card-footer">
                  <span className="service-badge">
                    <span className="pulse-dot-sm" style={{ background: service.color }}></span>
                    {service.badge}
                  </span>
                  <div className="service-stat-action">
                    <span className="service-stat">{service.stat}</span>
                    <ArrowRight size={14} className="service-arrow" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
