import React from 'react';
import { doctorsData } from '../data/doctorsData';
import { Star, Calendar, User, Award, ArrowRight } from 'lucide-react';

export default function DoctorsSection({ onOpenBooking, onOpenDoctorProfile }) {
  return (
    <section className="doctors-section" id="doctors">
      <div className="container">
        <div className="section-header">
          <span className="section-tag blue">Distinguished Medical Faculty</span>
          <h2 className="section-title">Meet Our Leading Specialists</h2>
          <p className="section-subtitle">
            Board-certified physicians and surgeons providing patient-centered clinical care.
          </p>
        </div>

        <div className="doctors-grid">
          {doctorsData.map((doctor) => (
            <div className="doctor-card" key={doctor.id}>
              <div className="doctor-image-wrapper">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="doctor-image"
                  loading="lazy"
                />
                <span className="doctor-status-tag">{doctor.status}</span>
              </div>

              <div className="doctor-info-box">
                <span className="doctor-specialty">{doctor.specialty}</span>
                <h3 className="doctor-name">{doctor.name}</h3>

                <div className="doctor-rating-row">
                  <div className="stars-box">
                    <Star size={15} fill="#f59e0b" color="#f59e0b" />
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{doctor.rating}</span>
                  </div>
                  <span style={{ color: '#64748b' }}>({doctor.reviews} patient reviews)</span>
                </div>

                <div className="doctor-exp">
                  <span>{doctor.experience}</span> • <span>{doctor.dept}</span>
                </div>

                <div className="doctor-actions">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => onOpenDoctorProfile(doctor)}
                    aria-label={`View profile for ${doctor.name}`}
                  >
                    <User size={14} />
                    <span>Bio Profile</span>
                  </button>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onOpenBooking(doctor.dept, doctor.name)}
                    aria-label={`Book appointment with ${doctor.name}`}
                  >
                    <Calendar size={14} />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
