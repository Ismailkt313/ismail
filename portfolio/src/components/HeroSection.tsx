import React, { useEffect, useRef, useCallback, useState } from 'react';
import { ChevronRight, X } from 'lucide-react';

/* ── Skill Sphere Data ────────────────────────────── */
const SKILLS = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Express.js',
  'MongoDB', 'Socket.IO', 'JWT', 'AWS', 'Docker',
  'Tailwind CSS', 'GitHub', 'Cloudinary', 'REST APIs',
];

interface SkillDetail {
  category: string;
  projects: string[];
}

const SKILL_DETAILS: Record<string, SkillDetail> = {
  'React': { category: 'Frontend Development', projects: ['QuickWork', 'DevShowroom', 'ErrorLens'] },
  'TypeScript': { category: 'Type-Safe Programming', projects: ['QuickWork', 'ErrorLens', 'Timzo'] },
  'JavaScript': { category: 'Core Web Language', projects: ['QuickWork', 'DevShowroom', 'Timzo'] },
  'Node.js': { category: 'Backend Runtime', projects: ['QuickWork', 'ErrorLens', 'Timzo'] },
  'Express.js': { category: 'Backend Framework', projects: ['QuickWork', 'ErrorLens'] },
  'MongoDB': { category: 'Database Systems', projects: ['QuickWork', 'DevShowroom'] },
  'Socket.IO': { category: 'Real-time WebSockets', projects: ['QuickWork', 'ErrorLens'] },
  'JWT': { category: 'Secure Authentication', projects: ['QuickWork', 'ErrorLens', 'DevShowroom'] },
  'AWS': { category: 'Cloud Infrastructure', projects: ['QuickWork', 'ErrorLens'] },
  'Docker': { category: 'DevOps & Containerization', projects: ['ErrorLens', 'DevShowroom'] },
  'Tailwind CSS': { category: 'CSS Utility Framework', projects: ['QuickWork', 'DevShowroom', 'Timzo'] },
  'GitHub': { category: 'Version Control', projects: ['All Projects'] },
  'Cloudinary': { category: 'Media Management', projects: ['DevShowroom'] },
  'REST APIs': { category: 'API Integration', projects: ['All Projects'] },
};


/* ── Tech Preview Pills ───────────────────────────── */
const TECH_PILLS = ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS', 'Docker'];

/* ── Fibonacci sphere point distribution ──────────── */
function fibonacciSphere(count: number): [number, number, number][] {
  const points: [number, number, number][] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push([Math.cos(theta) * radius, y, Math.sin(theta) * radius]);
  }
  return points;
}

const SPHERE_POINTS = fibonacciSphere(SKILLS.length);

/* ── Component ────────────────────────────────────── */
export const HeroSection: React.FC = () => {
  const sphereRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const angleRef = useRef({ x: 0, y: 0 });
  
  // Set initial slow automatic rotation velocity
  const velocityRef = useRef({ x: 0.0003, y: 0.0005 });
  
  // Interaction and hover states
  const [hoveredSkill, setHoveredSkillState] = useState<number | null>(null);
  const [selectedSkill, setSelectedSkillState] = useState<number | null>(null);
  const [isDragging, setIsDraggingState] = useState(false);

  const hoveredSkillRef = useRef<number | null>(null);
  const selectedSkillRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const lastPointerPosition = useRef({ x: 0, y: 0 });
  const dragDistance = useRef(0);
  const hoverProgressRef = useRef<number[]>(new Array(SKILLS.length).fill(0));

  const setHoveredSkill = (val: number | null) => {
    hoveredSkillRef.current = val;
    setHoveredSkillState(val);
  };

  const setSelectedSkill = (val: number | null) => {
    selectedSkillRef.current = val;
    setSelectedSkillState(val);
  };

  /* ── Rotation matrix helpers ── */
  const rotateY = useCallback((x: number, z: number, a: number): [number, number] => {
    const cos = Math.cos(a), sin = Math.sin(a);
    return [x * cos - z * sin, x * sin + z * cos];
  }, []);

  const rotateX = useCallback((y: number, z: number, a: number): [number, number] => {
    const cos = Math.cos(a), sin = Math.sin(a);
    return [y * cos - z * sin, y * sin + z * cos];
  }, []);

  /* ── Animation loop ── */
  useEffect(() => {
    const container = sphereRef.current;
    if (!container) return;

    const tags = container.querySelectorAll<HTMLSpanElement>('.sphere-tag');
    
    const animate = () => {
      const RADIUS = container.offsetWidth * 0.38;
      const friction = 0.95; // momentum damping
      const idleVelocity = { x: 0.0003, y: 0.0005 };

      if (!isDraggingRef.current) {
        // Slow down automatic rotation when hovering or if a tooltip is open
        const speedMultiplier = (hoveredSkillRef.current !== null || selectedSkillRef.current !== null) ? 0.3 : 1;
        const targetVelX = idleVelocity.x * speedMultiplier;
        const targetVelY = idleVelocity.y * speedMultiplier;

        // Smoothly decay velocity towards target idle velocity
        velocityRef.current.x = velocityRef.current.x * friction + targetVelX * (1 - friction);
        velocityRef.current.y = velocityRef.current.y * friction + targetVelY * (1 - friction);

        // Apply velocity to angles
        angleRef.current.x += velocityRef.current.x;
        angleRef.current.y += velocityRef.current.y;
      } else {
        // Dragging decays velocity towards 0 so it slows down if held stationary
        velocityRef.current.x *= 0.85;
        velocityRef.current.y *= 0.85;
      }

      tags.forEach((tag, i) => {
        const isHovered = hoveredSkillRef.current === i;
        const targetProgress = isHovered ? 1 : 0;
        
        // Smoothly lerp hover scaling factor
        hoverProgressRef.current[i] += (targetProgress - hoverProgressRef.current[i]) * 0.15;

        const [px, py, pz] = SPHERE_POINTS[i];

        // Apply rotation
        const [rx, rz1] = rotateY(px, pz, angleRef.current.y);
        const [ry, rz2] = rotateX(py, rz1, angleRef.current.x);

        // Map z to opacity and scale for depth
        const depth = (rz2 + 1) / 2; // 0 (back) to 1 (front)
        
        // Base scale and depth opacity
        const baseScale = 0.55 + depth * 0.55;
        // 20% scale boost on hover, scaled smoothly by hoverProgress
        const hoverScaleMultiplier = 1 + hoverProgressRef.current[i] * 0.2;
        const scale = baseScale * hoverScaleMultiplier;

        // Boost opacity when hovered to draw focus
        const baseOpacity = 0.2 + depth * 0.8;
        const opacity = Math.min(1, baseOpacity + hoverProgressRef.current[i] * 0.3);

        const translateX = rx * RADIUS;
        const translateY = ry * RADIUS;

        tag.style.transform = `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) scale(${scale})`;
        tag.style.opacity = String(opacity);
        
        // Bring hovered tags to front
        const baseZIndex = Math.round(depth * 100);
        const zIndex = isHovered ? 200 : baseZIndex;
        tag.style.zIndex = String(zIndex);
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [rotateX, rotateY]);

  /* ── Pointer event setup for physical drag and rotate ── */
  useEffect(() => {
    const handlePointerMove = (clientX: number, clientY: number) => {
      if (!isDraggingRef.current) return;

      const dx = clientX - lastPointerPosition.current.x;
      const dy = clientY - lastPointerPosition.current.y;
      
      const sensitivity = 0.006;

      angleRef.current.y += dx * sensitivity;
      angleRef.current.x -= dy * sensitivity;

      // Map horizontal drag to Y-rotation, vertical drag to X-rotation
      velocityRef.current.y = dx * sensitivity;
      velocityRef.current.x = -dy * sensitivity;

      lastPointerPosition.current = { x: clientX, y: clientY };
      dragDistance.current += Math.sqrt(dx * dx + dy * dy);
    };

    const handleMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      // Prevent scrolling page while actively dragging the sphere
      if (isDraggingRef.current) {
        e.preventDefault();
      }
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handlePointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDraggingState(false);
        document.body.classList.remove('global-grabbing');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);
    window.addEventListener('touchcancel', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('touchcancel', handlePointerUp);
    };
  }, []);

  const handleDragStart = (clientX: number, clientY: number) => {
    isDraggingRef.current = true;
    setIsDraggingState(true);
    document.body.classList.add('global-grabbing');
    lastPointerPosition.current = { x: clientX, y: clientY };
    dragDistance.current = 0;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // only left click
    handleDragStart(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTagClick = (e: React.MouseEvent, index: number) => {
    if (dragDistance.current > 8) {
      // It was a drag, not a tap!
      e.preventDefault();
      return;
    }
    setSelectedSkill(index);
  };


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
        <div className="hero-grid" />
        <div className="hero-glow hero-glow--blue" />
        <div className="hero-glow hero-glow--purple" />
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
            Right Column — Skill Sphere
        ══════════════════════════════════ */}
        <div className="hero-right">
          <div
            className={`sphere-wrapper${isDragging ? ' is-dragging' : ''}`}
            ref={sphereRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            aria-label="Interactive technology skill sphere"
          >
            {/* Skill tags */}
            {SKILLS.map((skill, i) => (
              <span
                key={skill}
                className={`sphere-tag${hoveredSkill === i ? ' sphere-tag--hovered' : ''}`}
                onMouseEnter={() => setHoveredSkill(i)}
                onMouseLeave={() => setHoveredSkill(null)}
                onClick={(e) => handleTagClick(e, i)}
              >
                {skill}
              </span>
            ))}

            {/* Premium details card overlay for clicked/tapped skill */}
            {selectedSkill !== null && (
              <div className="sphere-tooltip-overlay" onClick={() => setSelectedSkill(null)}>
                <div className="sphere-tooltip-card" onClick={(e) => e.stopPropagation()}>
                  <button className="sphere-tooltip-close" onClick={() => setSelectedSkill(null)} aria-label="Close details">
                    <X size={14} />
                  </button>
                  <h4 className="sphere-tooltip-title">{SKILLS[selectedSkill]}</h4>
                  <p className="sphere-tooltip-category">{SKILL_DETAILS[SKILLS[selectedSkill]]?.category}</p>
                  <div className="sphere-tooltip-divider" />
                  <div className="sphere-tooltip-projects">
                    <span className="sphere-tooltip-projects-label">Used in:</span>
                    <div className="sphere-tooltip-project-list">
                      {SKILL_DETAILS[SKILLS[selectedSkill]]?.projects.map((proj) => (
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
