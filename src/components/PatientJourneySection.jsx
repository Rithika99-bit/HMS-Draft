import React from 'react';
import { UserPlus, Search, CalendarCheck, Stethoscope, FileText, CreditCard } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Easy Registration',
    desc: 'Quick digital onboarding with instant patient ID and emergency profile.',
    icon: UserPlus
  },
  {
    num: '02',
    title: 'Find Doctor',
    desc: 'Browse certified specialists by department, credentials, and ratings.',
    icon: Search
  },
  {
    num: '03',
    title: 'Book Live Slot',
    desc: 'Select preferred date and real-time consultation hour in seconds.',
    icon: CalendarCheck
  },
  {
    num: '04',
    title: 'Consultation',
    desc: 'In-person clinic visit or high-definition encrypted telehealth video.',
    icon: Stethoscope
  },
  {
    num: '05',
    title: 'Instant EMR Record',
    desc: 'Digital e-prescription and diagnostic lab orders sent immediately.',
    icon: FileText
  },
  {
    num: '06',
    title: 'Cashless Checkout',
    desc: 'Hassle-free insurance claims and transparent itemized receipts.',
    icon: CreditCard
  }
];

export default function PatientJourneySection({ onOpenBooking }) {
  return (
    <section className="journey-section" id="journey">
      <div className="container">
        <div className="section-header">
          <span className="section-tag teal">Seamless Care Workflow</span>
          <h2 className="section-title">The MediCare Patient Journey</h2>
          <p className="section-subtitle">
            From your very first booking to complete post-treatment recovery, experience a connected digital healthcare workflow built around your convenience.
          </p>
        </div>

        <div className="journey-grid">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div className="journey-card" key={step.num}>
                <span className="journey-step-num">Step {step.num}</span>
                <div className="journey-icon">
                  <Icon size={22} />
                </div>
                <h3 className="journey-title">{step.title}</h3>
                <p className="journey-desc">{step.desc}</p>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button className="btn btn-primary btn-lg" onClick={() => onOpenBooking()}>
            Start Your Health Journey Today
          </button>
        </div>
      </div>
    </section>
  );
}
