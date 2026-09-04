import React from 'react';
import { UserPlus, Search, CalendarCheck, Stethoscope, FileText, CreditCard } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Easy Registration',
    desc: 'Instant digital onboarding with patient ID.',
    icon: UserPlus
  },
  {
    num: '02',
    title: 'Find Doctor',
    desc: 'Browse top certified specialists.',
    icon: Search
  },
  {
    num: '03',
    title: 'Book Live Slot',
    desc: 'Select preferred date and consultation time.',
    icon: CalendarCheck
  },
  {
    num: '04',
    title: 'Consultation',
    desc: 'In-person clinic or encrypted video visit.',
    icon: Stethoscope
  },
  {
    num: '05',
    title: 'Instant EMR Record',
    desc: 'Digital e-prescriptions and lab orders synced.',
    icon: FileText
  },
  {
    num: '06',
    title: 'Cashless Checkout',
    desc: 'Hassle-free insurance and transparent receipts.',
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
            Simple 6-step digital healthcare journey from first booking to full recovery.
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
