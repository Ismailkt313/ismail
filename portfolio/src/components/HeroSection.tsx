import React, { useEffect, useRef, useCallback, useState } from 'react';
import { ArrowDown, ChevronRight } from 'lucide-react';

/* ── Skill Sphere Data ────────────────────────────── */
const SKILLS = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Express.js',
  'MongoDB', 'Socket.IO', 'JWT', 'AWS', 'Docker',
  'Tailwind CSS', 'GitHub', 'Cloudinary', 'REST APIs',
];

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
  const velocityRef = useRef({ x: 0.0003, y: 0.0005 });
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

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
    const RADIUS = container.offsetWidth * 0.38;

    const animate = () => {
      // Slow rotation speed when hovering a skill
      const speedMultiplier = hoveredSkill !== null ? 0.3 : 1;

      // Apply mouse influence
      if (mouseRef.current.active) {
        velocityRef.current.x += mouseRef.current.y * 0.000002;
        velocityRef.current.y += mouseRef.current.x * 0.000002;
      }

      // Dampen velocity
      velocityRef.current.x *= 0.995;
      velocityRef.current.y *= 0.995;

      // Enforce minimum rotation speed
      const minSpeed = 0.0002;
      if (Math.abs(velocityRef.current.x) < minSpeed) velocityRef.current.x = minSpeed;
      if (Math.abs(velocityRef.current.y) < minSpeed) velocityRef.current.y = minSpeed;

      angleRef.current.x += velocityRef.current.x * speedMultiplier;
      angleRef.current.y += velocityRef.current.y * speedMultiplier;

      tags.forEach((tag, i) => {
        const [px, py, pz] = SPHERE_POINTS[i];

        // Apply rotation
        const [rx, rz1] = rotateY(px, pz, angleRef.current.y);
        const [ry, rz2] = rotateX(py, rz1, angleRef.current.x);

        // Map z to opacity and scale for depth
        const depth = (rz2 + 1) / 2; // 0 (back) to 1 (front)
        const scale = 0.55 + depth * 0.55;
        const opacity = 0.2 + depth * 0.8;

        const translateX = rx * RADIUS;
        const translateY = ry * RADIUS;

        tag.style.transform = `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) scale(${scale})`;
        tag.style.opacity = String(opacity);
        tag.style.zIndex = String(Math.round(depth * 100));
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [hoveredSkill, rotateX, rotateY]);

  /* ── Mouse tracking for sphere interaction ── */
  const handleSphereMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left - rect.width / 2) / rect.width,
      y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      active: true,
    };
  }, []);

  const handleSphereMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
    setHoveredSkill(null);
  }, []);

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
            className="sphere-wrapper"
            ref={sphereRef}
            onMouseMove={handleSphereMouseMove}
            onMouseLeave={handleSphereMouseLeave}
            aria-label="Interactive technology skill sphere"
          >
            {/* Ambient ring */}
            <div className="sphere-ring" aria-hidden="true" />
            <div className="sphere-ring sphere-ring--inner" aria-hidden="true" />

            {/* Skill tags */}
            {SKILLS.map((skill, i) => (
              <span
                key={skill}
                className={`sphere-tag${hoveredSkill === i ? ' sphere-tag--hovered' : ''}`}
                onMouseEnter={() => setHoveredSkill(i)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <span className="hero-scroll-text">Scroll to Explore</span>
        <div className="hero-scroll-line">
          <ArrowDown size={14} strokeWidth={1.5} />
        </div>
      </div>
    </section>
  );
};
