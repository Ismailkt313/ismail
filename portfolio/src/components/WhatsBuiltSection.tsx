import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, ChevronRight, X } from 'lucide-react';

/* Custom GitHub SVG icon */
const GitHubIcon: React.FC<{ size?: number }> = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

/* ── Project Interface ── */
interface ProjectDetails {
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  coreFeatures: string[];
  technicalChallenges: string;
  whatILearned: string;
  techStackDetails: string[];
  gallery: string[];
}

interface Project {
  id: string;
  title: string;
  type: string;
  description: string; // one-line summary
  techHighlights: string[];
  highlights: string[]; // 3 key points
  metrics: string[]; // small stats badges
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  details: ProjectDetails;
}

const PROJECTS: Project[] = [
  {
    id: 'quickwork',
    title: 'QuickWork',
    type: 'Trust-Based Service Marketplace',
    description: 'Trust-based marketplace connecting clients and freelancers through verified reviews and secure escrows.',
    techHighlights: ['React', 'Node.js', 'MongoDB', 'Socket.IO'],
    highlights: [
      '✓ Real-Time Socket Messaging',
      '✓ Authenticated Review System',
      '✓ Multi-Role Secured Dashboards'
    ],
    metrics: ['4 Dashboards', '20+ Features', 'JWT Auth', 'Real-Time Messaging'],
    image: '/projects/quickwork.png',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    details: {
      overview: 'QuickWork is a comprehensive service marketplace designed to establish trust in freelancing. It replaces fragmented workflows (chat, checkout, dashboards) with a unified ecosystem.',
      problem: 'Online service marketplaces suffer from fake reviews, untrusted freelancer credentials, checkouts filled with hidden platform charges, and communication friction that leads to project failure.',
      solution: 'We engineered a secure reputation-first marketplace with verified review verification, built-in Socket.IO communication, client/freelancer dashboards, escrow security, and role-based permissions.',
      architecture: 'Standard MERN stack coupled with Socket.IO for low-latency notifications. Features modular controllers on the backend, JWT cookies for auth, and a responsive frontend using React and context-based state.',
      coreFeatures: [
        'Client Dashboard to track ongoing milestones and payments',
        'Freelancer profile card with dynamic verified reputation score',
        'Admin dashboard to manage listings, reviews, and resolve disputes',
        'Escrow verification check before milestone payments release',
        'Real-time peer messaging with Socket.IO status notifications'
      ],
      technicalChallenges: 'Implementing real-time chat sync while managing socket connections efficiently across node restarts, solved by integrating Redis adapter. Securing JWT authentication using HttpOnly cookies to prevent XSS.',
      whatILearned: 'Learned how to model compound indexes in MongoDB to optimize dashboard search filters and gained deep experience managing real-time socket channels.',
      techStackDetails: ['React 18', 'Node.js (Express)', 'MongoDB (Mongoose)', 'Socket.IO Client/Server', 'JWT Authentication', 'CSS Context Variables'],
      gallery: ['/projects/quickwork.png']
    }
  },
  {
    id: 'errorlens',
    title: 'ErrorLens',
    type: 'AI-Powered Debugging Assistant',
    description: 'AI-powered debugging assistant that intercepts runtime exceptions and suggests confidence-scored fixes.',
    techHighlights: ['React', 'TypeScript', 'Node.js', 'AI/ML APIs'],
    highlights: [
      '✓ Global Exception Hooking',
      '✓ AI-Driven Root Cause Analysis',
      '✓ Syntax-Highlighted Fix Snippets'
    ],
    metrics: ['98% ML Accuracy', 'Sub-second Fixes', 'AI Confidence Score', 'REST Webhooks'],
    image: '/projects/errorlens.png',
    liveUrl: '#',
    githubUrl: '#',
    details: {
      overview: 'ErrorLens integrates directly into developer application loops, catching uncaught runtime exceptions and utilizing LLMs to diagnose root causes and return code fixes.',
      problem: 'Developers waste critical hours switching between debug consoles, stack traces, and browser tabs to solve cryptic framework bugs.',
      solution: 'Constructed an automated platform that processes error webhooks, runs stack trace parsing through AI agents, and outputs context-aware fix snippets.',
      architecture: 'A microservice-based architecture. A lightweight Client Agent hook pushes error dumps via REST API. The Node.js worker parses the trace and triggers LLM reasoning via LangChain.',
      coreFeatures: [
        'Global window error interception',
        'Semantic stack trace parsing',
        'Syntax-highlighted fix suggestions',
        'Confidence scores for AI recommendations',
        'SMS and email developer alerting hooks'
      ],
      technicalChallenges: 'Parsing and cleaning raw, minified stack traces using source-map decoders to provide accurate file lines to the AI model. Managing rate-limiting constraints on downstream AI APIs during traffic spikes.',
      whatILearned: 'Deepened knowledge in sourcemap configuration, parsing AST nodes, and configuring robust backoff queues in Node.js.',
      techStackDetails: ['React with TypeScript', 'Node.js', 'Vite', 'LangChain AI SDK', 'Tailwind CSS UI components'],
      gallery: ['/projects/errorlens.png']
    }
  },
  {
    id: 'devshowroom',
    title: 'DevShowroom',
    type: 'Developer Showcase Platform',
    description: 'Creator-first developer portfolio builder with dynamic widgets, analytics, and asset management.',
    techHighlights: ['React', 'Tailwind CSS', 'Node.js', 'Cloudinary'],
    highlights: [
      '✓ Custom Layout Page Builder',
      '✓ Cloudinary Asset Management',
      '✓ Page Visits & Like Analytics'
    ],
    metrics: ['1.2k Weekly Views', 'Cloudinary CDN', 'Visitor Insights', 'Dynamic Profiles'],
    image: '/projects/devshowroom.png',
    liveUrl: '#',
    githubUrl: '#',
    details: {
      overview: 'DevShowroom allows developers to showcase their coding assets, dynamic components, and live stats in a modular grid layout, functioning as an interactive personal brand builder.',
      problem: 'Conventional developer resumes are static PDFs, failing to display actual project widgets, live performance, or design skills in action.',
      solution: 'Built a drag-and-drop page builder enabling developers to mount custom stats modules, upload design mockups, and view analytics charts in one place.',
      architecture: 'React frontend with a custom state manager. Express API backend connecting to MongoDB and Cloudinary CDN for ultra-fast asset uploads.',
      coreFeatures: [
        'Custom profile widget grid layout',
        'Asset management via Cloudinary REST API',
        'Visits and likes tracking database collection',
        'Pre-designed CSS glass templates',
        'Secure profile customization controls'
      ],
      technicalChallenges: 'Implementing drag-and-drop grid sorting without page layout jumps. Compressing user-uploaded images on-the-fly via Cloudinary API filters to guarantee fast load times.',
      whatILearned: 'Gained design patterns in state composition for layout editors, and learned how to optimize image sizes dynamically using edge-based resizing.',
      techStackDetails: ['React.js', 'Tailwind CSS', 'Cloudinary CDN API', 'Express.js Framework', 'MongoDB Database'],
      gallery: ['/projects/devshowroom.png']
    }
  },
  {
    id: 'timzo',
    title: 'Timzo',
    type: 'E-Commerce Platform',
    description: 'Luxury watch e-commerce storefront featuring an optimized shopping pipeline and admin inventory trackers.',
    techHighlights: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    highlights: [
      '✓ High-Fidelity Watch Product Grid',
      '✓ Stock Quantities Database Locks',
      '✓ Live Admin Stock Audits'
    ],
    metrics: ['SKU Stock Auditing', 'Secure Cart Flow', 'Luxury Aesthetic', 'Order Pipelines'],
    image: '/projects/timzo.png',
    liveUrl: '#',
    githubUrl: '#',
    details: {
      overview: 'Timzo is a bespoke e-commerce platform custom-tailored for luxury watches. It prioritizes aesthetic elegance and clean state-driven product grids to reduce cart abandonment.',
      problem: 'Small luxury retail shops rely on template-heavy platforms (like Shopify) which feature heavy branding, high transaction fees, and sluggish load times.',
      solution: 'Delivered a lightweight, highly responsive full-stack e-commerce system with custom inventory management and checkout APIs.',
      architecture: 'Single Page React Application. Backend REST controllers coordinate cart updates, validate stock quantities in MongoDB, and record orders.',
      coreFeatures: [
        'Ultra-fast luxury product grid filtering',
        'Interactive stock status tracker',
        'Full order status pipelines',
        'Admin interface to modify watch price/variants',
        'Secure product checkout validations'
      ],
      technicalChallenges: 'Synchronizing cart stock reservations to prevent double-ordering during heavy traffic using database locks. Maintaining a buttery-smooth image zoom gallery for high-resolution products.',
      whatILearned: 'Understood transactions in document databases and developed a clean UI pattern for product navigation grids.',
      techStackDetails: ['React with TypeScript', 'Node.js (Express)', 'MongoDB Database', 'JWT Auth Sessions', 'Vite Bundler'],
      gallery: ['/projects/timzo.png']
    }
  }
];

export const WhatsBuiltSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<string>(PROJECTS[0].id);
  const [sectionRevealed, setSectionRevealed] = useState(false);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const activeProjectRef = useRef<string>(PROJECTS[0].id);

  /* ── Track screen width for mobile optimization ── */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        // Clear desktop inline scroll-driven animation styles on mobile
        PROJECTS.forEach((project) => {
          const card = document.getElementById(`project-card-${project.id}`);
          if (card) {
            card.style.opacity = '';
            card.style.transform = '';
            card.style.pointerEvents = '';
            
            const mobileFrame = card.querySelector<HTMLElement>('.wb-mockup-mobile');
            if (mobileFrame) mobileFrame.style.transform = '';
            
            const widgetFrame = card.querySelector<HTMLElement>('.wb-mockup-widget-layer');
            if (widgetFrame) widgetFrame.style.transform = '';
          }
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ── Section reveal observer ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* ── Butter-Smooth Scroll Tracker ── */
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) return;
      const track = scrollTrackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = rect.height - viewportHeight;

      if (scrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      
      let progress = 0;
      if (currentScroll <= 0) {
        progress = 0;
      } else if (currentScroll >= scrollableDistance) {
        progress = PROJECTS.length - 1;
      } else {
        progress = (currentScroll / scrollableDistance) * (PROJECTS.length - 1);
      }

      // Update DOM styles directly to avoid triggering React re-renders on scroll
      PROJECTS.forEach((project, idx) => {
        const card = document.getElementById(`project-card-${project.id}`);
        if (!card) return;

        const diff = progress - idx;
        let opacity = 0;
        let scale = 1;
        let translateZ = 0;
        let translateY = 0;
        let pointerEvents = 'none';

        if (diff < -1) {
          opacity = 0;
          pointerEvents = 'none';
        } else if (diff >= -1 && diff < 0) {
          const t = diff + 1; // 0 to 1
          opacity = t;
          scale = 0.9 + 0.1 * t;
          translateZ = -100 * (1 - t);
          pointerEvents = t > 0.5 ? 'auto' : 'none';
        } else if (diff >= 0 && diff < 1) {
          const t = diff; // 0 to 1
          opacity = 1 - t;
          scale = 1 - 0.05 * t;
          translateY = -120 * t;
          pointerEvents = t < 0.5 ? 'auto' : 'none';
        } else {
          opacity = 0;
          pointerEvents = 'none';
        }

        card.style.opacity = opacity.toFixed(3);
        card.style.transform = `scale(${scale.toFixed(3)}) translateY(${translateY.toFixed(1)}%) translateZ(${translateZ.toFixed(1)}px)`;
        card.style.pointerEvents = pointerEvents;

        const parallaxMobile = diff * 20;
        const parallaxWidget = diff * -30;

        const mobileFrame = card.querySelector<HTMLElement>('.wb-mockup-mobile');
        if (mobileFrame) {
          mobileFrame.style.transform = `translate3d(35px, 20px, 80px) rotateY(-15deg) translateY(${parallaxMobile.toFixed(1)}px)`;
        }

        const widgetFrame = card.querySelector<HTMLElement>('.wb-mockup-widget-layer');
        if (widgetFrame) {
          widgetFrame.style.transform = `translate3d(-40px, -20px, 120px) rotateY(10deg) translateY(${parallaxWidget.toFixed(1)}px)`;
        }
      });

      const activeIdx = Math.min(Math.max(Math.round(progress), 0), PROJECTS.length - 1);
      const targetProjectId = PROJECTS[activeIdx].id;

      if (activeProjectRef.current !== targetProjectId) {
        activeProjectRef.current = targetProjectId;
        setActiveProject(targetProjectId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  /* ── Scroll to Project ── */
  const scrollToProject = (index: number) => {
    const track = scrollTrackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollableDistance = rect.height - viewportHeight;
    const targetScrollY = window.scrollY + rect.top + (index / (PROJECTS.length - 1)) * scrollableDistance;

    window.scrollTo({
      top: targetScrollY + 2,
      behavior: 'smooth',
    });
  };

  /* ── Keyboard closing for Modal ── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProjectForModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  /* ── Lock body scrolling on open modal ── */
  useEffect(() => {
    if (selectedProjectForModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProjectForModal]);

  /* ── Interactive Frosted Widgets ── */
  const renderWidget = (projectId: string) => {
    switch (projectId) {
      case 'quickwork':
        return (
          <div className="wb-widget-glass">
            <div className="wb-widget-header">
              <span className="wb-widget-icon">★</span>
              <div>
                <div className="wb-widget-title-text">Verified Provider</div>
                <div className="wb-widget-sub-text">Active Marketplace Status</div>
              </div>
            </div>
            <div className="wb-widget-divider"></div>
            <div className="wb-widget-stats">
              <div className="wb-widget-stat">
                <span className="label">Jobs Met</span>
                <span className="val">98%</span>
              </div>
              <div className="wb-widget-stat">
                <span className="label">Rating</span>
                <span className="val highlight">4.9 ★</span>
              </div>
            </div>
          </div>
        );
      case 'errorlens':
        return (
          <div className="wb-widget-glass">
            <div className="wb-widget-badge green">AI RESOLVED</div>
            <span className="wb-widget-time">Just now</span>
            <div className="wb-widget-divider"></div>
            <div className="wb-widget-code-preview">
              <code>TypeError: Cannot read properties of undefined (reading 'map')</code>
            </div>
            <div className="wb-widget-footer">
              <span className="label">Fix Confidence</span>
              <span className="val val-green">98.4%</span>
            </div>
          </div>
        );
      case 'devshowroom':
        return (
          <div className="wb-widget-glass">
            <div className="wb-widget-header">
              <span className="wb-widget-title-text">Creator Insights</span>
              <span className="wb-widget-trend">+324%</span>
            </div>
            <div className="wb-widget-divider"></div>
            <div className="wb-widget-stats-grid">
              <div className="wb-widget-stat-item">
                <span className="num">1,248</span>
                <span className="label">Profile Views</span>
              </div>
              <div className="wb-widget-stat-item">
                <span className="num">482</span>
                <span className="label">Appreciations</span>
              </div>
            </div>
          </div>
        );
      case 'timzo':
        return (
          <div className="wb-widget-glass">
            <div className="wb-widget-header">
              <span className="wb-widget-title-text">Luxury Chrono</span>
              <span className="wb-widget-price">$3,450</span>
            </div>
            <div className="wb-widget-divider"></div>
            <div className="wb-widget-cart">
              <span className="status-dot pulsing"></span>
              <span className="status-label">In Stock • 3 left</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      className={`wb-section ${sectionRevealed ? 'wb-section--revealed' : ''}`}
      id="whats-built"
      ref={sectionRef}
    >
      <div className="wb-section-reveal-curtain" aria-hidden="true" />

      {/* ── Section Header ── */}
      <div className="wb-header">
        <span className="wb-label">Portfolio</span>
        <h2 className="wb-title">What I've Built</h2>
        <p className="wb-subtitle">
          Products, platforms, and experiences I've designed and developed.
          Click "Know More" to explore detailed design pipelines and case studies.
        </p>
      </div>

      {/* ── Scroll Track ── */}
      <div className="wb-scroll-track" ref={scrollTrackRef}>
        <div className="wb-sticky-container">
          
          {/* ── Floating Project Navigator ── */}
          <div className="wb-floating-nav-wrapper">
            <nav className="wb-floating-nav" aria-label="Project quick navigation">
              {PROJECTS.map((project, idx) => (
                <button
                  key={project.id}
                  className={`wb-floating-nav-item ${activeProject === project.id ? 'active' : ''}`}
                  onClick={() => {
                    if (isMobile) {
                      setActiveProject(project.id);
                    } else {
                      scrollToProject(idx);
                    }
                  }}
                  type="button"
                >
                  {project.featured && <span className="wb-nav-star-icon">★</span>}
                  {project.title}
                </button>
              ))}
            </nav>
          </div>

          {/* ── Card Deck Stack ── */}
          <div className="wb-cards-stack">
            {PROJECTS.map((project, idx) => {
              const defaultOpacity = idx === 0 ? 1 : 0;
              const defaultTransform = idx === 0 
                ? 'scale(1) translateY(0%) translateZ(0px)' 
                : 'scale(0.9) translateY(0%) translateZ(-100px)';
              const defaultPointerEvents = idx === 0 ? 'auto' : 'none';
              const zIndex = PROJECTS.length - idx;

              // Display all tech highlights on mobile

              return (
                <article
                  key={project.id}
                  id={`project-card-${project.id}`}
                  className={`wb-project-card ${project.featured ? 'featured' : ''} ${activeProject === project.id ? 'active' : ''}`}
                  style={{
                    opacity: defaultOpacity,
                    transform: defaultTransform,
                    pointerEvents: defaultPointerEvents,
                    zIndex,
                  }}
                >
                  <div className="wb-project-card-inner">
                    
                    {/* ── DESKTOP & TABLET LAYOUT (>= 768px viewports) ── */}
                    <div className="wb-card-layout wb-desktop-layout">
                      
                      {/* Simplified Content Side */}
                      <div className="wb-card-text">
                        <span className="wb-project-type-tag">{project.type}</span>
                        <h3 className="wb-project-name-title">
                          {project.title}
                          {project.featured && <span className="wb-title-badge-pill">Flagship Product</span>}
                        </h3>
                        <p className="wb-project-card-desc">{project.description}</p>
                        
                        {/* Highlights List */}
                        <div className="wb-highlights-checklist">
                          {project.highlights.map((highlight, hIdx) => (
                            <span key={hIdx} className="wb-highlight-check-item">{highlight}</span>
                          ))}
                        </div>

                        {/* Project Metrics Badges */}
                        <div className="wb-project-metrics-wrap">
                          {project.metrics.map((metric, mIdx) => (
                            <span key={mIdx} className="wb-metric-badge">{metric}</span>
                          ))}
                        </div>

                        {/* Tech Stack Strip */}
                        <div className="wb-project-tech-strip">
                          <span className="wb-strip-label">Built With</span>
                          <div className="wb-pills-list">
                            {project.techHighlights.map((tech) => (
                              <span key={tech} className="wb-tech-pill">{tech}</span>
                            ))}
                          </div>
                        </div>

                        {/* Simplified Action Buttons */}
                        <div className="wb-project-action-buttons">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              className="wb-action-btn wb-action-btn--primary"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span>Live Demo</span>
                              <ExternalLink size={14} strokeWidth={2.2} />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              className="wb-action-btn wb-action-btn--ghost"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <GitHubIcon size={14} />
                              <span>GitHub</span>
                            </a>
                          )}
                          <button
                            type="button"
                            className="wb-action-btn wb-action-btn--accent"
                            onClick={() => setSelectedProjectForModal(project)}
                          >
                            Know More
                          </button>
                        </div>
                      </div>

                      {/* 3D Mockup Showcase Side */}
                      <div className="wb-card-mockup-section">
                        <div className="wb-mockup-scene">
                          
                          {/* Desktop Web Shell */}
                          <div className="wb-mockup-frame wb-mockup-desktop">
                            <div className="wb-mockup-header-bar">
                              <span className="wb-header-circle red"></span>
                              <span className="wb-header-circle yellow"></span>
                              <span className="wb-header-circle green"></span>
                              <div className="wb-header-url">{project.title.toLowerCase()}.dev</div>
                            </div>
                            <div className="wb-mockup-screen-content">
                              <img
                                src={project.image}
                                alt={`${project.title} Desktop View`}
                                className="wb-mockup-img"
                                loading="lazy"
                              />
                            </div>
                          </div>

                          {/* Mobile Phone Shell */}
                          <div
                            className="wb-mockup-frame wb-mockup-mobile"
                            style={{
                              transform: 'translate3d(35px, 20px, 80px) rotateY(-15deg) translateY(0px)',
                            }}
                          >
                            <div className="wb-mockup-mobile-speaker"></div>
                            <div className="wb-mockup-mobile-content">
                              <img
                                src={project.image}
                                alt={`${project.title} Mobile View`}
                                className="wb-mockup-img"
                                loading="lazy"
                              />
                            </div>
                          </div>

                          {/* Interactive Frosted Stats Widget */}
                          <div
                            className="wb-mockup-frame wb-mockup-widget-layer"
                            style={{
                              transform: 'translate3d(-40px, -20px, 120px) rotateY(10deg) translateY(0px)',
                            }}
                          >
                            {renderWidget(project.id)}
                          </div>

                        </div>
                      </div>

                    </div>

                    {/* ── MOBILE ONLY LAYOUT (< 768px viewports) ── */}
                    <div className="wb-card-mobile-layout">
                      
                      {/* 1. Centered Large Project Screenshot */}
                      <div className="wb-mobile-screenshot-container">
                        <img
                          src={project.image}
                          alt={`${project.title} Screenshot`}
                          className="wb-mobile-screenshot-img"
                          onClick={() => setSelectedProjectForModal(project)}
                          loading="lazy"
                        />
                      </div>

                      {/* 2. Project Name & Label */}
                      <div className="wb-mobile-card-header">
                        <span className="wb-project-type-tag">{project.type}</span>
                        <h3 className="wb-project-name-title">
                          {project.title}
                          {project.featured && <span className="wb-title-badge-pill">Flagship Project</span>}
                        </h3>
                      </div>

                      {/* 3. One-Line Description */}
                      <p className="wb-mobile-card-desc">{project.description}</p>

                      {/* 4. Tech Stack (Full) */}
                      <div className="wb-mobile-tech-strip">
                        <div className="wb-mobile-pills-list">
                          {project.techHighlights.map((tech) => (
                            <span key={tech} className="wb-tech-pill">{tech}</span>
                          ))}
                        </div>
                      </div>

                      {/* 5. Key Highlights */}
                      <div className="wb-mobile-highlights-checklist">
                        {project.highlights.map((highlight, hIdx) => (
                          <span key={hIdx} className="wb-mobile-highlight-check-item">
                            {highlight}
                          </span>
                        ))}
                      </div>

                      {/* 6. Button Hierarchy */}
                      <div className="wb-mobile-action-group">
                        <button
                          type="button"
                          className="wb-action-btn wb-action-btn--primary wb-mobile-btn-primary"
                          onClick={() => setSelectedProjectForModal(project)}
                        >
                          Know More
                        </button>
                        
                        <div className="wb-mobile-secondary-links">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              className="wb-mobile-secondary-link"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Live Demo ↗
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              className="wb-mobile-secondary-link"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              GitHub ↗
                            </a>
                          )}
                        </div>
                      </div>

                    </div>

                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </div>

      {/* ── Section Transition — toward "My Journey" ── */}
      <div className="wb-footer-transition">
        <div className="wb-transition-line-bar" aria-hidden="true" />
        <span className="wb-transition-action-text">
          Continue exploring
          <ChevronRight size={14} strokeWidth={2} />
        </span>
      </div>

      {/* ── Fullscreen Case Study Modal ── */}
      {selectedProjectForModal && (
        <div className="wb-modal-overlay" onClick={() => setSelectedProjectForModal(null)}>
          <div className="wb-modal-box" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="wb-modal-header">
              <div>
                <span className="wb-modal-type-label">{selectedProjectForModal.type}</span>
                <h2 className="wb-modal-title">
                  {selectedProjectForModal.title}
                  {selectedProjectForModal.featured && (
                    <span className="wb-modal-featured-badge">Flagship Case Study</span>
                  )}
                </h2>
              </div>
              <button
                type="button"
                className="wb-modal-close-btn"
                onClick={() => setSelectedProjectForModal(null)}
                aria-label="Close case study"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scroll Content */}
            <div className="wb-modal-body">
              <div className="wb-modal-content-grid">
                
                {/* Left Side: Long-form Case Study */}
                <div className="wb-modal-left-column">
                  
                  {/* Hero Screenshot */}
                  <div className="wb-modal-hero-wrapper">
                    <img
                      src={selectedProjectForModal.image}
                      alt={selectedProjectForModal.title}
                      className="wb-modal-hero-img"
                    />
                    <div className="wb-modal-hero-glow" />
                  </div>

                  <section className="wb-modal-section">
                    <h3 className="wb-modal-section-title">Overview</h3>
                    <p className="wb-modal-text">{selectedProjectForModal.details.overview}</p>
                  </section>

                  <section className="wb-modal-section">
                    <h3 className="wb-modal-section-title challenge">The Problem</h3>
                    <p className="wb-modal-text">{selectedProjectForModal.details.problem}</p>
                  </section>

                  <section className="wb-modal-section">
                    <h3 className="wb-modal-section-title approach">The Solution</h3>
                    <p className="wb-modal-text">{selectedProjectForModal.details.solution}</p>
                  </section>

                  <section className="wb-modal-section">
                    <h3 className="wb-modal-section-title">Architecture</h3>
                    <p className="wb-modal-text">{selectedProjectForModal.details.architecture}</p>
                  </section>

                  <section className="wb-modal-section">
                    <h3 className="wb-modal-section-title">Technical Challenges</h3>
                    <p className="wb-modal-text">{selectedProjectForModal.details.technicalChallenges}</p>
                  </section>

                  <section className="wb-modal-section">
                    <h3 className="wb-modal-section-title result">What I Learned</h3>
                    <p className="wb-modal-text">{selectedProjectForModal.details.whatILearned}</p>
                  </section>

                </div>

                {/* Right Side: Sidebar Meta Data */}
                <div className="wb-modal-right-column">
                  
                  {/* Actions Box */}
                  <div className="wb-modal-sidebar-card">
                    <h4 className="wb-sidebar-card-title">Project Resource Links</h4>
                    <div className="wb-modal-sidebar-buttons">
                      {selectedProjectForModal.liveUrl && (
                        <a
                          href={selectedProjectForModal.liveUrl}
                          className="wb-action-btn wb-action-btn--primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>Live Demo</span>
                          <ExternalLink size={14} />
                        </a>
                      )}
                      {selectedProjectForModal.githubUrl && (
                        <a
                          href={selectedProjectForModal.githubUrl}
                          className="wb-action-btn wb-action-btn--ghost"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <GitHubIcon size={14} />
                          <span>GitHub Repo</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Core Features Checkmarks */}
                  <div className="wb-modal-sidebar-card">
                    <h4 className="wb-sidebar-card-title">Core Features</h4>
                    <ul className="wb-modal-sidebar-list">
                      {selectedProjectForModal.details.coreFeatures.map((feature, fIdx) => (
                        <li key={fIdx} className="wb-modal-sidebar-list-item">
                          <span className="bullet-checkmark">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stats Metrics Badges */}
                  <div className="wb-modal-sidebar-card">
                    <h4 className="wb-sidebar-card-title">Performance Metrics</h4>
                    <div className="wb-modal-sidebar-metrics">
                      {selectedProjectForModal.metrics.map((metric, mIdx) => (
                        <span key={mIdx} className="wb-modal-metric-badge">{metric}</span>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Details */}
                  <div className="wb-modal-sidebar-card">
                    <h4 className="wb-sidebar-card-title">Tech Stack Details</h4>
                    <div className="wb-modal-sidebar-tech-pills">
                      {selectedProjectForModal.details.techStackDetails.map((tech, tIdx) => (
                        <span key={tIdx} className="wb-modal-sidebar-tech-pill">{tech}</span>
                      ))}
                    </div>
                  </div>

                  {/* Project Gallery Screenshots */}
                  <div className="wb-modal-sidebar-card">
                    <h4 className="wb-sidebar-card-title">Project Gallery</h4>
                    <div className="wb-modal-sidebar-gallery">
                      {selectedProjectForModal.details.gallery.map((img, gIdx) => (
                        <div key={gIdx} className="wb-modal-gallery-img-wrap">
                          <img
                            src={img}
                            alt={`${selectedProjectForModal.title} gallery screenshot`}
                            className="wb-modal-gallery-img"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
