import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    quote: "The cardiac team under Dr. Sarah Mitchell saved my father's life during an unexpected acute emergency. The real-time telemetry updates sent to our family portal kept us calm and informed every minute.",
    author: 'Michael H. Sterling',
    role: 'Cardiac Surgery Patient Family',
    treatment: 'Emergency Angioplasty',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    quote: "Booking pediatric appointments for my twins used to be stressful. MediCare's 1-click booking and Dr. Priya Patel's gentle approach made our hospital visit warm, prompt, and completely seamless.",
    author: 'Rebecca Thompson',
    role: 'Mother of Two',
    treatment: 'Pediatric Wellness Care',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
  },
  {
    quote: "Following my robotic knee replacement with Dr. Marcus Vance, I was walking pain-free in just 3 weeks. The physical therapy and digital EMR exercise guides were world-class.",
    author: 'Arthur Vance',
    role: 'Retired Architect',
    treatment: 'Robotic Knee Replacement',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-tag teal">Verified Patient Stories</span>
          <h2 className="section-title">Trusted by Over 140,000+ Families</h2>
          <p className="section-subtitle">
            Hear directly from patients whose lives have been transformed through our medical precision, surgical excellence, and compassionate care.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((test, idx) => (
            <div className="testimonial-card" key={idx}>
              <div className="test-stars-row">
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>

              <p className="test-quote">"{test.quote}"</p>

              <div className="test-author-row">
                <img 
                  src={test.avatar} 
                  alt={test.author} 
                  className="test-avatar" 
                  loading="lazy"
                />
                <div>
                  <div className="test-name">{test.author}</div>
                  <div className="test-tag">{test.treatment}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
