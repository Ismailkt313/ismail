import React, { useCallback, useState } from 'react';
import { ChevronRight, X } from 'lucide-react';

/* ── Technology Ecosystem Data ── */
const ECO_SKILLS = [
  { name: 'React', color: '#60A5FA' },
  { name: 'TypeScript', color: '#4F46E5' },
  { name: 'Node.js', color: '#16A34A' },
  { name: 'MongoDB', color: '#10B981' },
  { name: 'Docker', color: '#0ea5e9' },
  { name: 'AWS', color: '#F97316' },
];

const NODE_POSITIONS = [
  { x: 50, y: 15 },    // React (top center)
  { x: 79, y: 32.5 },  // TypeScript (top right)
  { x: 79, y: 67.5 },  // Node.js (bottom right)
  { x: 50, y: 85 },    // MongoDB (bottom center)
  { x: 21, y: 67.5 },  // Docker (bottom left)
  { x: 21, y: 32.5 },  // AWS (top left)
];

interface SkillDetail {
  category: string;
  projects: string[];
}

const SKILL_DETAILS: Record<string, SkillDetail> = {
  'React': { category: 'Frontend Development', projects: ['QuickWork', 'DevShowroom', 'ErrorLens'] },
  'TypeScript': { category: 'Type-Safe Programming', projects: ['QuickWork', 'ErrorLens', 'Timzo'] },
  'Node.js': { category: 'Backend Runtime', projects: ['QuickWork', 'ErrorLens', 'Timzo'] },
  'MongoDB': { category: 'Database Systems', projects: ['QuickWork', 'DevShowroom'] },
  'Docker': { category: 'DevOps & Containerization', projects: ['ErrorLens', 'DevShowroom'] },
  'AWS': { category: 'Cloud Infrastructure', projects: ['QuickWork', 'ErrorLens'] },
};

/* ── Tech Preview Pills ── */
const TECH_PILLS = ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS', 'Docker'];

export const HeroSection: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);

  /* ── Smooth scroll helper ── */
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  return (
    <section className="hero" id="hero">
      {/* ── Ambient background effects ── */}
      <div className="hero-bg" aria-hidden="true">
        {/* Decorative futuristic grids and glows removed to support editorial clean style */}
      </div>

      <div className="hero-container container-max">
        {/* ══════════════════════════════════
            Left Column — Introduction
        ══════════════════════════════════ */}
        <div className="hero-left">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span>Available for opportunities</span>
          </div>

          <h1 className="hero-name">
            Muhammed<br />
            <span className="hero-name-highlight">Ismail KT</span>
          </h1>

          <p className="hero-role">Full Stack Developer</p>

          <p className="hero-intro">
            Building modern web applications,<br className="hero-br-desktop" />
            real-time systems, and AI-powered experiences.
          </p>

          {/* ── CTA Buttons ── */}
          <div className="hero-cta-group">
            <button
              className="hero-btn hero-btn--primary"
              onClick={() => scrollToSection('my-journey')}
              id="hero-cta-primary"
            >
              <span>Explore My Journey</span>
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
            <button
              className="hero-btn hero-btn--secondary"
              onClick={() => scrollToSection('whats-built')}
              id="hero-cta-secondary"
            >
              <span>What I've Built</span>
            </button>
          </div>

          {/* ── Tech Preview Pills ── */}
          <div className="hero-tech-strip">
            <span className="hero-tech-label">Tech I work with</span>
            <div className="hero-tech-pills">
              {TECH_PILLS.map((t) => (
                <span key={t} className="hero-pill">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════
            Right Column — Connected Ecosystem
        ══════════════════════════════════ */}
        <div className="hero-right">
          <div className="tech-ecosystem-container" aria-label="Interactive technology ecosystem">
            {/* Concentric rings and connecting lines */}
            <svg viewBox="0 0 100 100" className="tech-ecosystem-svg">
              <circle cx="50" cy="50" r="16" className="concentric-ring ring-inner" />
              <circle cx="50" cy="50" r="33" className="concentric-ring ring-outer" />
              
              {/* Lines from center to nodes */}
              {ECO_SKILLS.map((skill, i) => {
                const isHovered = hoveredNode === i;
                const pos = NODE_POSITIONS[i];
                return (
                  <line
                    key={skill.name}
                    x1="50"
                    y1="50"
                    x2={pos.x}
                    y2={pos.y}
                    className={`connection-line ${isHovered ? 'highlighted' : ''}`}
                  />
                );
              })}
            </svg>

            {/* Central Hub Core */}
            <div className="center-hub-node">
              <div className="hub-pulse" />
              <div className="hub-dot" />
              <span className="hub-label">Core Tech</span>
            </div>

            {/* Technology Nodes */}
            {ECO_SKILLS.map((skill, i) => {
              const isHovered = hoveredNode === i;
              const pos = NODE_POSITIONS[i];
              return (
                <button
                  key={skill.name}
                  className={`ecosystem-node ${isHovered ? 'hovered' : ''} ${selectedSkill === i ? 'selected' : ''}`}
                  style={{
                    top: `${pos.y}%`,
                    left: `${pos.x}%`,
                  }}
                  onMouseEnter={() => setHoveredNode(i)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setSelectedSkill(i)}
                  type="button"
                >
                  <span className="node-dot" style={{ backgroundColor: skill.color }} />
                  <span className="node-name">{skill.name}</span>
                </button>
              );
            })}

            {/* Tooltip Card Overlay for clicked node details */}
            {selectedSkill !== null && (
              <div className="sphere-tooltip-overlay" onClick={() => setSelectedSkill(null)}>
                <div className="sphere-tooltip-card" onClick={(e) => e.stopPropagation()}>
                  <button className="sphere-tooltip-close" onClick={() => setSelectedSkill(null)} aria-label="Close details">
                    <X size={14} />
                  </button>
                  <h4 className="sphere-tooltip-title">{ECO_SKILLS[selectedSkill].name}</h4>
                  <p className="sphere-tooltip-category">{SKILL_DETAILS[ECO_SKILLS[selectedSkill].name]?.category}</p>
                  <div className="sphere-tooltip-divider" />
                  <div className="sphere-tooltip-projects">
                    <span className="sphere-tooltip-projects-label">Used in:</span>
                    <div className="sphere-tooltip-project-list">
                      {SKILL_DETAILS[ECO_SKILLS[selectedSkill].name]?.projects.map((proj) => (
                        <span key={proj} className="sphere-tooltip-project-pill">{proj}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
