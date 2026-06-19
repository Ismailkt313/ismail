import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Question {
  id:    string;
  icon:  string;
  label: string;
  text:  string;
}

const QUESTIONS: Question[] = [
  {
    id:    'unique',
    icon:  '✦',
    label: 'What makes Ismail unique?',
    text:  "Ismail sits at the intersection of product thinking and systems engineering. He doesn't just ship features — he identifies friction, architects around scale, and sweats the details that create premium software experiences.\n\nMost engineers build what's asked. Ismail builds what's needed.",
  },
  {
    id:    'journey',
    icon:  '◈',
    label: 'Tell me about his journey',
    text:  "His path started from pure curiosity — building interfaces and APIs before he had a framework for either. Over time that evolved into founding-engineer roles, leading backend migrations, and architecting SaaS platforms used by thousands daily.\n\nToday he focuses on TypeScript-first full-stack systems and premium product engineering.",
  },
  {
    id:    'projects',
    icon:  '⬡',
    label: 'What projects has he built?',
    text:  "• SyncEngine — A node-based flow editor for deploying database sync pipelines. Built on React Flow + Fastify.\n\n• Telemetry Dashboard — Real-time SaaS analytics platform with sub-10ms query latency via PostgreSQL + Redis.\n\n• AI Copilot Workspace — Collaborative document editor integrating local LLM pipelines with socket-based multi-user sync.",
  },
  {
    id:    'tech',
    icon:  '⟐',
    label: 'What technologies does he use?',
    text:  "Frontend: React, Next.js, TypeScript, Vite, CSS-in-JS, Framer Motion, Canvas/WebGL.\n\nBackend: Node.js, Fastify, Express, GraphQL, REST, PostgreSQL, Redis, Supabase.\n\nInfrastructure: AWS (EC2, S3, Lambda), Docker, GitHub Actions CI/CD, Vercel.",
  },
  {
    id:    'contact',
    icon:  '→',
    label: 'How can I contact him?',
    text:  "Email   : ismail@engineering.dev\nLinkedIn: linkedin.com/in/ismail-eng\nGitHub  : github.com/ismail-code\n\nOr use the Connect section at the bottom of this portfolio — he checks it regularly.",
  },
];

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const [selectedId, setSelectedId]   = useState<string | null>(null);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping]       = useState(false);
  const intervalRef                   = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Lock body scroll ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (!isOpen) {
      setSelectedId(null);
      setDisplayText('');
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* ── Typewriter effect ── */
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!selectedId) { setDisplayText(''); return; }

    const full = QUESTIONS.find((q) => q.id === selectedId)?.text ?? '';
    setDisplayText('');
    setIsTyping(true);

    let i = 0;
    intervalRef.current = setInterval(() => {
      i += 1;
      setDisplayText(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(intervalRef.current!);
        setIsTyping(false);
      }
    }, 6);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [selectedId]);

  /* ── Close on Escape ── */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>

        {/* ── Panel Header ── */}
        <div className="modal-header">
          <div className="modal-brand">
            <div className="modal-icon-wrap">
              <Sparkles size={15} strokeWidth={2} />
            </div>
            <div>
              <div className="modal-title">AI Portfolio Assistant</div>
              <div className="modal-subtitle">Ask anything about Ismail's work</div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close assistant">
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* ── Panel Body ── */}
        <div className="modal-body">

          {/* Hint */}
          <p className="modal-hint">
            Select a question to see a personalised response from Ismail's profile:
          </p>

          {/* Question Cards */}
          <div className="question-grid">
            {QUESTIONS.map((q) => (
              <button
                key={q.id}
                className={`question-btn${selectedId === q.id ? ' selected' : ''}`}
                onClick={() => setSelectedId(q.id)}
              >
                <span className="question-icon">{q.icon}</span>
                <span style={{ flex: 1 }}>{q.label}</span>
                <MessageSquare
                  size={13}
                  className="question-arrow"
                  strokeWidth={2}
                />
              </button>
            ))}
          </div>

          {/* Answer Pane */}
          <div className={`answer-pane${selectedId ? ' active' : ''}`}>
            {selectedId ? (
              <>
                <div className="answer-label">Response</div>
                <p className="answer-text">
                  {displayText}
                  {isTyping && <span className="answer-cursor" aria-hidden="true" />}
                </p>
              </>
            ) : (
              <div className="answer-placeholder">
                <ArrowRight size={18} strokeWidth={1.5} style={{ opacity: 0.3 }} />
                <span>Select a question above to see the response</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
