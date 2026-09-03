import React from 'react';
import { MapPin, Clock, PhoneCall, AlertTriangle } from 'lucide-react';

export default function TopBar({ onOpenEmergency }) {
  return (
    <aside className="top-bar" aria-label="Emergency and hospital helpline">
      <div className="container top-bar-container">
        <div className="top-bar-left">
          <div className="top-bar-item">
            <MapPin size={14} color="#38bdf8" />
            <span>742 Evergreen Healthcare Blvd, Metro Medical District</span>
          </div>
          <div className="top-bar-item">
            <Clock size={14} color="#34d399" />
            <span>Open 24/7 • All Critical Trauma Units Active</span>
          </div>
        </div>

        <div className="top-bar-right">
          <button 
            onClick={onOpenEmergency} 
            className="top-bar-item emergency-btn"
            aria-label="Open 24/7 Emergency Dispatch"
          >
            <PhoneCall size={14} />
            <span>24/7 Emergency Speed Dial: (800) 911-MEDICARE</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
