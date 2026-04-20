import React, { useState } from 'react';

const STATIC_EVENTS = [
  { id: 1, title: 'Tech Symposium 2026', capacity: 100, current: 85, status: 'Active' },
  { id: 2, title: 'Hackathon Weekly', capacity: 50, current: 50, status: 'Full' },
];

const STATIC_TASKS = [
  { id: 101, desc: 'Setup Networking Gear', status: 'COMPLETED', eventId: 1 },
  { id: 102, desc: 'Catering Coordination', status: 'PENDING', eventId: 1 },
];

export default function Dashboard() {
  const [tasks, setTasks] = useState(STATIC_TASKS);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, status: t.status === 'PENDING' ? 'COMPLETED' : 'PENDING' } : t
    ));
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
      <div className="glass-panel">
        <h3 style={{ marginBottom: '16px' }}>Event Metrics</h3>
        {STATIC_EVENTS.map(event => (
          <div key={event.id} style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{event.title}</span>
              <span style={{ color: event.status === 'Full' ? 'var(--warning)' : 'var(--success)' }}>
                {event.current} / {event.capacity}
              </span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--glass-bg)', borderRadius: '4px', marginTop: '8px' }}>
              <div 
                style={{ 
                  width: `${(event.current / event.capacity) * 100}%`, 
                  height: '100%', 
                  background: event.status === 'Full' ? 'var(--warning)' : 'var(--success)',
                  borderRadius: '4px' 
                }} 
              />
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel">
        <h3 style={{ marginBottom: '16px' }}>My Tasks</h3>
        <ul style={{ listStyle: 'none' }}>
          {tasks.map(t => (
            <li key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--glass-border)' }}>
              <span style={{ textDecoration: t.status === 'COMPLETED' ? 'line-through' : 'none', opacity: t.status === 'COMPLETED' ? 0.5 : 1 }}>
                {t.desc}
              </span>
              <button 
                onClick={() => toggleTask(t.id)}
                style={{ background: t.status === 'COMPLETED' ? 'var(--glass-bg)' : 'var(--primary-color)' }}
              >
                {t.status === 'COMPLETED' ? 'Undo' : 'Complete'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
