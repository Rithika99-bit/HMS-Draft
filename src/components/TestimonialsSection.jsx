import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    quote: "Real-time telemetry updates sent to our family portal kept us calm and informed throughout my father's emergency cardiac procedure.",
    author: 'Michael H. Sterling',
    role: 'Cardiac Surgery Family',
    treatment: 'Emergency Angioplasty',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    quote: "1-click booking and gentle pediatric specialists made our twin boys' visits prompt, warm, and completely stress-free.",
    author: 'Rebecca Thompson',
    role: 'Mother of Two',
    treatment: 'Pediatric Wellness',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
  },
  {
    quote: "Walking pain-free in 3 weeks after robotic knee surgery with Dr. Vance. The digital rehabilitation guides were outstanding.",
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
          <h2 className="section-title">Trusted by 140,000+ Families</h2>
          <p className="section-subtitle">
            Real feedback from patients and families transformed by our clinical care.
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
