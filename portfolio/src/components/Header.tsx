import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, Download, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onAskClick?: () => void; // kept optional for backwards compatibility
}

const NAV_ITEMS = [
  { label: 'My Journey',     id: 'my-journey',  desc: 'My background and story' },
  { label: "What I've Built", id: 'whats-built', desc: 'Projects and products' },
  { label: 'Tech Stack',     id: 'tech-stack',  desc: 'Technologies and tools' },
  { label: 'Contact',        id: 'contact',     desc: 'Ways to reach me' },
];

export const Header: React.FC<HeaderProps> = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [active, setActive]         = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* ── Scroll → glassmorphism ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // set initial state
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Scrollspy via Scroll Position ── */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160; // offset header height + padding

      let currentActive = NAV_ITEMS[0].id;

      // 1. Iterate through sections to find the last one we have scrolled past
      NAV_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            currentActive = id;
          }
        }
      });

      // 2. Fallback: if at the very bottom of the page, force the last item active
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (isAtBottom) {
        currentActive = NAV_ITEMS[NAV_ITEMS.length - 1].id;
      }

      setActive(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialize on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Lock body scroll when drawer is open ── */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  /* ── Smooth scroll helper ── */
  const scrollTo = useCallback((id: string) => {
    setDrawerOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  /* ── Resume download ── */
  const downloadResume = useCallback(() => {
    const content = [
      'Muhammad Ismail KT — Full Stack Software Engineer',
      '════════════════════════════════════════════════════',
      '',
      'Contact',
      '────────────',
      'Email   : ismail@engineering.dev',
      'GitHub  : github.com/ismail-code',
      'LinkedIn: linkedin.com/in/ismail-kt',
      '',
      'Products Built',
      '────────────────',
      '• QuickWork   — Freelance workflow management platform',
      '• ErrorLens   — Real-time error monitoring SaaS',
      '• DevShowroom — Developer portfolio showcase platform',
      '• Timzo       — Time-tracking and productivity tool',
      '',
      'Core Expertise',
      '────────────────',
      '• React · Next.js · TypeScript · Vite',
      '• Node.js · Fastify · GraphQL · PostgreSQL · Redis',
      '• AWS (EC2 · S3 · Lambda) · Docker · Vercel · Supabase',
      '• System Design · Performance Engineering · Product Thinking',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), {
      href: url,
      download: 'Muhammad_Ismail_KT_Resume.txt',
    });
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════
          Main Header
      ════════════════════════════════════════ */}
      <header className={`header-root${scrolled ? ' scrolled' : ''}`}>
        <div
          className="container-max"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >

          {/* ─── Logo + Status ─────────────────── */}
          <div className="logo-block">
            <button
              className="logo-link"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
            >
              <span className="logo-text">M.ISMAIL</span>
            </button>
            <div className="logo-status" aria-label="Open to Opportunities">
              <span className="logo-status-dot" aria-hidden="true" />
              <span className="logo-status-label">full stack developer</span>
            </div>
          </div>

          {/* ─── Desktop Nav ────────────────────── */}
          <nav className="nav-desktop" aria-label="Primary navigation">
            {NAV_ITEMS.map(({ label, id }) => (
              <button
                key={id}
                className={`nav-link${active === id ? ' active' : ''}`}
                onClick={() => scrollTo(id)}
                aria-current={active === id ? 'true' : undefined}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* ─── Single CTA: View Resume ─────────── */}
          <div className="cta-group">
            <button
              className="btn-ghost btn-resume"
              onClick={downloadResume}
              id="view-resume-btn"
              aria-label="Download resume"
            >
              <Download size={13} strokeWidth={2.2} />
              <span>View Resume</span>
            </button>
          </div>

          {/* ─── Mobile Hamburger ────────────────── */}
          <button
            className="hamburger-btn"
            onClick={() => setDrawerOpen((o) => !o)}
            aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={drawerOpen}
          >
            {drawerOpen
              ? <X    size={18} strokeWidth={2} />
              : <Menu size={18} strokeWidth={2} />
            }
          </button>
        </div>
      </header>

      {/* ════════════════════════════════════════
          Mobile Full-Screen Drawer
      ════════════════════════════════════════ */}
      {drawerOpen && (
        <>
          {/* Dark blurred overlay backdrop */}
          <div
            className="mobile-drawer-backdrop"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Navigation panel */}
          <div
            className="mobile-drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Nav Links */}
            <nav className="mobile-nav-list">
              {NAV_ITEMS.map(({ label, id, desc }) => (
                <div key={id} className="mobile-nav-item">
                  <button
                    className={`mobile-nav-link-block${active === id ? ' active' : ''}`}
                    onClick={() => scrollTo(id)}
                    aria-current={active === id ? 'true' : undefined}
                  >
                    <span className="mobile-nav-label">{label}</span>
                    {desc && <span className="mobile-nav-desc">{desc}</span>}
                  </button>
                  <ArrowRight
                    size={16}
                    className="mobile-nav-arrow"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
              ))}

              {/* View Resume as a menu item */}
              <div className="mobile-nav-item">
                <button
                  className="mobile-nav-link-block"
                  onClick={() => { setDrawerOpen(false); downloadResume(); }}
                >
                  <span className="mobile-nav-label">View Resume</span>
                  <span className="mobile-nav-desc">Career overview</span>
                </button>
                <Download
                  size={16}
                  className="mobile-nav-arrow"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};
