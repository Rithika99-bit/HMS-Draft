import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const icons = {
    success: <CheckCircle2 size={18} color="#10b981" />,
    error: <AlertCircle size={18} color="#ef4444" />,
    info: <Info size={18} color="#0284c7" />
  };

  return (
    <div className="toast-container">
      <div className={`toast-alert ${type}`}>
        {icons[type] || icons.info}
        <span style={{ flexGrow: 1 }}>{message}</span>
        <button 
          onClick={onClose} 
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          aria-label="Dismiss toast"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
