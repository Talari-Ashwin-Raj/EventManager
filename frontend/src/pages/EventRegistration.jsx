import React, { useState } from 'react';

const EVENTS_CATALOG = [
  { id: 1, title: 'Tech Symposium 2026', desc: 'Annual technology convention showcasing student projects.', date: 'Dec 15, 2026', spotsLeft: 15 },
  { id: 2, title: 'Hackathon Weekly', desc: 'Friday night coding jam session.', date: 'Oct 10, 2026', spotsLeft: 0 },
  { id: 3, title: 'Career Fair', desc: 'Meet local campus recruiters.', date: 'Nov 2, 2026', spotsLeft: 120 },
];

export default function EventRegistration() {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (id) => {
    setLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${baseUrl}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // Using a hardcoded userId for demo purposes. In production this comes from context/JWT.
        body: JSON.stringify({ eventId: id, userId: 1 })
      });
      const data = await response.json();
      
      if (response.ok) {
        alert(data.message || `Successfully registered for event #${id}!`);
      } else {
        alert(`Failed to register: ${data.error || data.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert(`Network error connecting to backend: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
      {EVENTS_CATALOG.map(evt => (
        <div key={evt.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem' }}>{evt.title}</h3>
            <p style={{ color: 'var(--text-muted)', margin: '12px 0' }}>{evt.desc}</p>
            <p style={{ fontSize: '0.9rem', marginBottom: '16px' }}>🗓 {evt.date}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ 
              fontWeight: '600', 
              color: evt.spotsLeft > 0 ? 'var(--success)' : 'var(--warning)' 
            }}>
              {evt.spotsLeft > 0 ? `${evt.spotsLeft} spots left` : 'Waitlist Open'}
            </span>
            <button 
              onClick={() => handleRegister(evt.id)} 
              disabled={loading || evt.spotsLeft === 0}
              style={{ opacity: (loading || evt.spotsLeft === 0) ? 0.6 : 1, cursor: (loading || evt.spotsLeft === 0) ? 'not-allowed' : 'pointer'}}
            >
              Register
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
