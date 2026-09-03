import React, { useState } from 'react';
import { servicesData } from '../data/servicesData';
import { 
  Users, Stethoscope, Calendar, FileText, 
  Pill, FlaskConical, CreditCard, UserCheck, 
  Boxes, BarChart3, Check, ArrowUpRight 
} from 'lucide-react';

const iconMap = {
  Users: Users,
  Stethoscope: Stethoscope,
  CalendarClock: Calendar,
  FileHeart: FileText,
  Pill: Pill,
  FlaskConical: FlaskConical,
  CreditCard: CreditCard,
  UserCheck: UserCheck,
  Boxes: Boxes,
  BarChart3: BarChart3
};

export default function ServicesSection({ onOpenBooking, onShowToast }) {
  const [selectedService, setSelectedService] = useState(null);

  const handleLearnMore = (service) => {
    setSelectedService(service);
    if (onShowToast) {
      onShowToast(`Viewing module: ${service.title} (${service.stat})`, 'info');
    }
  };

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header">
          <span className="section-tag blue">Enterprise Hospital Ecosystem</span>
          <h2 className="section-title">10 Comprehensive Healthcare Modules</h2>
          <p className="section-subtitle">
            From patient admission and doctor duty rosters to robotic surgical scheduling and electronic health records, our unified platform orchestrates hospital workflows seamlessly.
          </p>
        </div>

        <div className="services-grid">
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.icon] || Stethoscope;
            return (
              <div className="service-card" key={service.id}>
                <div className="service-card-top">
                  <div className="service-icon-box" style={{ background: service.color }}>
                    <IconComponent size={26} />
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
                  <span className="service-badge">{service.badge}</span>
                  <span className="service-stat">{service.stat}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
