import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Award, Zap, HeartHandshake, 
  Cpu, Clock, CheckCircle2 
} from 'lucide-react';

const statsData = [
  { target: 99.8, suffix: '%', label: 'Patient Satisfaction', sub: 'Across 140,000+ patient surveys' },
  { target: 15200, suffix: '+', label: 'Successful Surgeries', sub: 'Minimally invasive & robotic procedures' },
  { target: 120, suffix: '+', label: 'Board-Certified Specialists', sub: 'Representing 32 medical disciplines' },
  { target: 24, suffix: '/7', label: 'Trauma & Emergency Care', sub: 'Level-1 rapid resuscitation response' }
];

const pillars = [
  {
    icon: Award,
    title: 'Global Accreditations',
    desc: 'JCI & NABH accredited standards guaranteeing patient safety.'
  },
  {
    icon: Cpu,
    title: 'Robotic Diagnostics',
    desc: 'Robotic surgical suites, 512-slice CT, and 3T MRI systems.'
  },
  {
    icon: Zap,
    title: 'Fast Emergency Dispatch',
    desc: 'GPS-tracked mobile ICUs with live vitals synced to trauma ER.'
  },
  {
    icon: ShieldCheck,
    title: 'Encrypted Records',
    desc: 'HIPAA & HL7 certified 256-bit encrypted health data.'
  },
  {
    icon: HeartHandshake,
    title: 'Compassionate Care',
    desc: 'Dedicated patient navigators guiding your recovery.'
  },
  {
    icon: Clock,
    title: 'Rapid Telehealth',
    desc: 'Consult top medical specialists from home in minutes.'
  }
];

export default function WhyUsSection() {
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const duration = 2000;
    const steps = 40;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setCounts(
        statsData.map((stat) => {
          const progress = Math.min(step / steps, 1);
          if (stat.target % 1 !== 0) {
            return (stat.target * progress).toFixed(1);
          }
          return Math.floor(stat.target * progress);
        })
      );

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="why-us-section" id="why-us">
      <div className="container">
        <div className="section-header">
          <span className="section-tag blue">Clinical Excellence & Innovation</span>
          <h2 className="section-title">Why Patients Choose MediCare</h2>
          <p className="section-subtitle">
            Uniting clinical expertise, surgical robotics, and compassionate patient care.
          </p>
        </div>

        {/* Animated Metric Cards */}
        <div className="stats-grid-row">
          {statsData.map((stat, idx) => (
            <div className="stat-metric-card" key={idx}>
              <div className="stat-metric-num">
                {counts[idx]}
                {stat.suffix}
              </div>
              <div className="stat-metric-label">{stat.label}</div>
              <div className="stat-metric-sub">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* 6 Value Pillars */}
        <div className="pillars-grid">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div className="pillar-item" key={idx}>
                <div className="pillar-icon-box">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-desc">{pillar.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
