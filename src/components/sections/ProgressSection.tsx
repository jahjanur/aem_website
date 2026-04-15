'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Check, Hammer, Compass, Home, Key } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const phases = [
  {
    id: 1,
    icon: Compass,
    label: 'Design & Planning',
    date: 'Q1 2023',
    desc: 'Architectural design, engineering plans, and all permits secured.',
    progress: 100,
    image: '/renders/floor-plan.jpg',
    tag: 'Blueprints finalized',
  },
  {
    id: 2,
    icon: Hammer,
    label: 'Foundation',
    date: 'Q3 2023',
    desc: 'Reinforced concrete foundation and structural framework completed.',
    progress: 100,
    image: '/renders/exterior-02.jpg',
    tag: 'Structure complete',
  },
  {
    id: 3,
    icon: Home,
    label: 'Construction',
    date: 'Q2 2024',
    desc: 'Facade, interior works, plumbing, electrical, and finishes.',
    progress: 75,
    image: '/renders/exterior-01.jpg',
    tag: 'In progress',
  },
  {
    id: 4,
    icon: Key,
    label: 'Handover',
    date: 'Q4 2024',
    desc: 'Final inspections, owner handovers, and move-in ready apartments.',
    progress: 0,
    image: '/renders/hero.png',
    tag: 'Coming soon',
  },
];

const overall = Math.round(phases.reduce((acc, p) => acc + p.progress, 0) / phases.length);

// Waypoint positions on the SVG path
const waypoints = [
  { x: 80, y: 150 },
  { x: 380, y: 280 },
  { x: 620, y: 120 },
  { x: 920, y: 250 },
];

const pathD =
  'M 80 150 C 180 150, 240 280, 380 280 S 560 50, 620 120 S 840 280, 920 250';

export default function ProgressSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayProgress, setDisplayProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(2); // Start on current construction phase
  const [isPaused, setIsPaused] = useState(false);

  // Counter animation
  useEffect(() => {
    if (!isInView) return;
    const start = Date.now();
    const duration = 2000;
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayProgress(Math.round(eased * overall));
      if (t >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView]);

  // Auto-cycle through phases
  useEffect(() => {
    if (!isInView || isPaused) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % phases.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isInView, isPaused]);

  const activePhase = phases[activeIdx];
  const ActiveIcon = activePhase.icon;
  const activePoint = waypoints[activeIdx];

  return (
    <section
      ref={ref}
      style={{
        padding: '120px 0',
        background: '#F8F3EB',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-15%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,130,79,0.12), transparent 65%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            marginBottom: 32,
            flexWrap: 'wrap',
          }}
        >
          <p className="eyebrow" style={{ margin: 0 }}>
            Construction Roadmap
          </p>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 14px',
              borderRadius: 999,
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
            }}
          >
            <span
              className="anim-pulse-glow"
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#10B981',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              On Schedule · {displayProgress}%
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.8, 0.25, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            color: '#1A1208',
            maxWidth: 760,
            marginBottom: 16,
          }}
        >
          The journey from blueprint{' '}
          <span style={{ color: '#B8824F', fontStyle: 'italic' }}>to home.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: '#6B5340',
            maxWidth: 540,
            marginBottom: 56,
          }}
        >
          Follow each milestone of AEM Residence from foundation to final handover.
        </motion.p>

        {/* ============ INTERACTIVE ROADMAP ============ */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            position: 'relative',
            marginBottom: 56,
          }}
        >
          {/* Grid: SVG road + preview panel */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 32,
              alignItems: 'center',
            }}
            className="lg:!grid-cols-[1.3fr_1fr]"
          >
            {/* LEFT — SVG Road (desktop only) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden md:block"
              style={{ position: 'relative' }}
            >
              <svg
                viewBox="0 0 1000 400"
                preserveAspectRatio="xMidYMid meet"
                style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
              >
                <defs>
                  <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5E35" />
                    <stop offset="50%" stopColor="#B8824F" />
                    <stop offset="100%" stopColor="#D4A878" />
                  </linearGradient>
                  <filter id="roadGlow">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Dashed background track */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="rgba(184, 130, 79, 0.2)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="2 8"
                />

                {/* Animated progress path */}
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="url(#roadGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  filter="url(#roadGlow)"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: overall / 100 } : {}}
                  transition={{ duration: 1.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                />

                {/* Looping traveling glow along the path */}
                <motion.circle
                  r="8"
                  fill="#D4A878"
                  filter="url(#roadGlow)"
                  animate={{ offsetDistance: ['0%', '100%'] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    offsetPath: `path('${pathD}')`,
                    // @ts-expect-error CSS property
                    'offset-path': `path('${pathD}')`,
                  }}
                />

                {/* Waypoints */}
                {waypoints.map((pt, i) => {
                  const phase = phases[i];
                  const complete = phase.progress === 100;
                  const isActive = i === activeIdx;

                  return (
                    <motion.g
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        delay: 0.6 + i * 0.25,
                        duration: 0.6,
                        ease: [0.25, 0.8, 0.25, 1],
                      }}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setActiveIdx(i)}
                      onClick={() => setActiveIdx(i)}
                    >
                      {/* Pulse ring on active */}
                      {isActive && (
                        <motion.circle
                          cx={pt.x}
                          cy={pt.y}
                          fill="none"
                          stroke="#B8824F"
                          strokeWidth="2"
                          animate={{ r: [24, 44, 24], opacity: [0.7, 0, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      )}

                      {/* Outer ring — bigger when active */}
                      <motion.circle
                        cx={pt.x}
                        cy={pt.y}
                        animate={{
                          r: isActive ? 28 : 22,
                          fill: complete ? '#1A1208' : isActive ? '#1A1208' : '#F8F3EB',
                        }}
                        transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                        stroke="#B8824F"
                        strokeWidth={isActive ? '2.5' : '2'}
                        style={{ filter: 'drop-shadow(0 8px 16px rgba(184, 130, 79, 0.3))' }}
                      />

                      {/* Inner dot */}
                      <motion.circle
                        cx={pt.x}
                        cy={pt.y}
                        animate={{ r: isActive ? 10 : 7 }}
                        transition={{ duration: 0.4 }}
                        fill={complete ? '#B8824F' : isActive ? '#D4A878' : 'rgba(184,130,79,0.4)'}
                      />

                      {/* Check for complete */}
                      {complete && (
                        <path
                          d={`M ${pt.x - 5} ${pt.y} L ${pt.x - 1} ${pt.y + 4} L ${pt.x + 5} ${pt.y - 4}`}
                          fill="none"
                          stroke="#F8F3EB"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          pointerEvents="none"
                        />
                      )}

                      {/* Labels */}
                      <text
                        x={pt.x}
                        y={pt.y < 200 ? pt.y - 46 : pt.y + 56}
                        textAnchor="middle"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 16,
                          fontWeight: 500,
                          fill: isActive ? '#1A1208' : '#6B5340',
                          letterSpacing: '-0.01em',
                          transition: 'fill 0.3s ease',
                        }}
                      >
                        {phase.label}
                      </text>
                      <text
                        x={pt.x}
                        y={pt.y < 200 ? pt.y - 28 : pt.y + 74}
                        textAnchor="middle"
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 10,
                          fontWeight: 700,
                          fill: '#B8824F',
                          letterSpacing: '0.15em',
                        }}
                      >
                        {phase.date.toUpperCase()}
                      </text>
                    </motion.g>
                  );
                })}
              </svg>
            </motion.div>

            {/* RIGHT — Active phase preview card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                position: 'relative',
                borderRadius: 24,
                overflow: 'hidden',
                background: '#FFFFFF',
                border: '1px solid rgba(184, 130, 79, 0.2)',
                boxShadow: '0 30px 60px -20px rgba(58, 30, 10, 0.15)',
              }}
            >
              {/* Image area */}
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '16 / 11',
                  overflow: 'hidden',
                  background: '#F5EBE0',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIdx}
                    src={activePhase.image}
                    alt={activePhase.label}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </AnimatePresence>

                {/* Gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(26, 18, 8, 0.8) 0%, rgba(26, 18, 8, 0.1) 45%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Top-left tag */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`tag-${activeIdx}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      position: 'absolute',
                      top: 20,
                      left: 20,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 14px',
                      borderRadius: 999,
                      background: 'rgba(248, 243, 235, 0.15)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(248, 243, 235, 0.2)',
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: 'rgba(184, 130, 79, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ActiveIcon size={14} style={{ color: '#F8F3EB' }} />
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: '#F8F3EB',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Phase 0{activePhase.id}
                    </span>
                  </motion.div>
                </AnimatePresence>

                {/* Top-right phase indicator dots */}
                <div
                  style={{
                    position: 'absolute',
                    top: 24,
                    right: 20,
                    display: 'flex',
                    gap: 6,
                  }}
                >
                  {phases.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      style={{
                        width: i === activeIdx ? 24 : 8,
                        height: 8,
                        borderRadius: 999,
                        background:
                          i === activeIdx
                            ? '#F8F3EB'
                            : 'rgba(248, 243, 235, 0.35)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
                        padding: 0,
                      }}
                    />
                  ))}
                </div>

                {/* Bottom content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-${activeIdx}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 24,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: '#D4A878',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        marginBottom: 6,
                      }}
                    >
                      {activePhase.date} · {activePhase.tag}
                    </p>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 26,
                        fontWeight: 500,
                        color: '#F8F3EB',
                        letterSpacing: '-0.02em',
                        marginBottom: 6,
                        lineHeight: 1.1,
                      }}
                    >
                      {activePhase.label}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        lineHeight: 1.55,
                        color: 'rgba(248, 243, 235, 0.7)',
                        maxWidth: 360,
                      }}
                    >
                      {activePhase.desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom progress bar */}
              <div style={{ padding: 20 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: '#8A6B4F',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Completion
                  </span>
                  <motion.span
                    key={`pct-${activeIdx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 16,
                      fontWeight: 500,
                      color: '#1A1208',
                    }}
                  >
                    {activePhase.progress}%
                  </motion.span>
                </div>
                <div
                  style={{
                    height: 4,
                    borderRadius: 999,
                    background: 'rgba(184, 130, 79, 0.15)',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    key={`bar-${activeIdx}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${activePhase.progress}%` }}
                    transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{
                      height: '100%',
                      borderRadius: 999,
                      background: 'linear-gradient(90deg, #8B5E35, #B8824F, #D4A878)',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Phase tab strip — click to jump */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 8,
          }}
          className="md:!grid-cols-4"
        >
          {phases.map((phase, i) => {
            const Icon = phase.icon;
            const active = i === activeIdx;
            const complete = phase.progress === 100;

            return (
              <motion.button
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 + i * 0.08, duration: 0.5 }}
                onClick={() => setActiveIdx(i)}
                onMouseEnter={() => setActiveIdx(i)}
                style={{
                  position: 'relative',
                  padding: '18px 20px',
                  borderRadius: 16,
                  background: active
                    ? 'linear-gradient(135deg, #1A1208 0%, #3A2A1A 100%)'
                    : 'rgba(255, 255, 255, 0.6)',
                  border: active
                    ? '1px solid rgba(184, 130, 79, 0.4)'
                    : '1px solid rgba(184, 130, 79, 0.15)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  boxShadow: active ? '0 16px 32px -12px rgba(26, 18, 8, 0.25)' : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      background: active
                        ? 'linear-gradient(135deg, #B8824F, #D4A878)'
                        : 'rgba(184, 130, 79, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={14} style={{ color: active ? '#FFFFFF' : '#8B5E35' }} strokeWidth={2} />
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: active ? '#D4A878' : '#B8824F',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {phase.date}
                  </span>
                  {complete && (
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        background: '#10B981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 'auto',
                      }}
                    >
                      <Check size={10} strokeWidth={3} style={{ color: '#FFFFFF' }} />
                    </div>
                  )}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 15,
                    fontWeight: 500,
                    color: active ? '#F8F3EB' : '#1A1208',
                    letterSpacing: '-0.01em',
                    marginBottom: 10,
                  }}
                >
                  {phase.label}
                </p>

                {/* Mini progress bar */}
                <div
                  style={{
                    height: 2,
                    borderRadius: 999,
                    background: active ? 'rgba(248, 243, 235, 0.12)' : 'rgba(184, 130, 79, 0.15)',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${phase.progress}%` } : {}}
                    transition={{ delay: 1.2 + i * 0.1, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{
                      height: '100%',
                      background: active
                        ? 'linear-gradient(90deg, #B8824F, #D4A878)'
                        : complete
                          ? 'linear-gradient(90deg, #B8824F, #D4A878)'
                          : 'linear-gradient(90deg, #8B5E35, #B8824F)',
                    }}
                  />
                </div>

                {/* Auto-progress indicator line when active */}
                {active && !isPaused && (
                  <motion.div
                    key={`timer-${activeIdx}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 3.5, ease: 'linear' }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: 'linear-gradient(90deg, #B8824F, #D4A878)',
                      transformOrigin: 'left',
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
