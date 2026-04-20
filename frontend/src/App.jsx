import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import EventRegistration from './pages/EventRegistration';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="layout-container animate-in">
      <nav className="nav-bar glass-panel">
        <h2 style={{margin: 0}}>Smart Campus</h2>
        <div className="nav-links">
          <button onClick={() => setCurrentView('dashboard')}>Dashboard</button>
          <button onClick={() => setCurrentView('events')}>Events</button>
        </div>
      </nav>

      {currentView === 'dashboard' ? <Dashboard /> : <EventRegistration />}
    </div>
  );
}

export default App;
