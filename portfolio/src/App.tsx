import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WhatsBuiltSection } from './components/WhatsBuiltSection';
import { AIAssistantModal } from './components/AIAssistantModal';
import './index.css';

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header onAskClick={() => setModalOpen(true)} />

      {/* ── Hero Section ── */}
      <HeroSection />

      {/* ── What I've Built ── */}
      <WhatsBuiltSection />

      {/* ── Scrollspy section targets ── */}
      <main>
        {[
          { id: 'my-journey',  label: 'My Journey' },
          { id: 'tech-stack',  label: 'Tech Stack' },
          { id: 'contact',     label: 'Contact' },
        ].map(({ id, label }) => (
          <section
            key={id}
            id={id}
            style={{
              height: '60vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderTop: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}>
              {label}
            </span>
          </section>
        ))}
      </main>

      <AIAssistantModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default App;

