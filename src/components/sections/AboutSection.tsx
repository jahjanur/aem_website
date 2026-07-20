'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Layers, Shield, Zap, Maximize2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import AnimatedCounter from '../ui/AnimatedCounter';
import { useRef, useState } from 'react';

export default function AboutSection() {
  const t = useTranslations('about');
  const tX = useTranslations('aboutExtra');
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const features = [
    { icon: Layers, title: tX('featurePremiumMaterialsTitle'), desc: tX('featurePremiumMaterialsDesc') },
    { icon: Shield, title: tX('featureEarthquakeSafeTitle'), desc: tX('featureEarthquakeSafeDesc') },
    { icon: Zap, title: tX('featureEnergyEfficientTitle'), desc: tX('featureEnergyEfficientDesc') },
    { icon: Maximize2, title: tX('featureSmartLayoutsTitle'), desc: tX('featureSmartLayoutsDesc') },
  ];

  const stats = [
    { value: 48, label: tX('statUnits') },
    { value: 6, label: tX('statFloors') },
    { value: 136, prefix: '78–', suffix: 'm²', label: tX('statMaxArea') },
  ];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
    restDelta: 0.001,
  });
  const imageY = useTransform(smooth, [0, 1], ['-5%', '5%']);

  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '100px 0',
        background: '#F8F3EB',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glows */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '-15%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,130,79,0.12), transparent 65%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 32px', position: 'relative' }}>
        {/* Header row */}
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
            {tX('eyebrow')}
          </p>
          <Link
            href="/apartments"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              fontWeight: 600,
              color: '#1A1208',
              letterSpacing: '0.02em',
              borderBottom: '1px solid rgba(26, 18, 8, 0.3)',
              paddingBottom: 4,
              transition: 'all 0.3s ease',
            }}
          >
            {tX('viewAllApartments')} <ArrowUpRight size={14} />
          </Link>
        </motion.div>

        {/* Headline */}
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
            marginBottom: 48,
          }}
        >
          {tX('headlineLead')}{' '}
          <span style={{ color: '#B8824F', fontStyle: 'italic' }}>{tX('headlineAccent')}</span>
        </motion.h2>

        {/* Main grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 24,
            alignItems: 'stretch',
          }}
          className="md:!grid-cols-[1fr_1.2fr]"
        >
          {/* LEFT — Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
            style={{
              position: 'relative',
              borderRadius: 20,
              overflow: 'hidden',
              minHeight: 520,
              background: '#2A1D10',
              boxShadow: '0 24px 48px -16px rgba(58, 30, 10, 0.25)',
            }}
          >
            <motion.img
              src="/renders/exterior-02.jpg"
              alt={tX('imageAlt')}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '110%',
                top: '-5%',
                objectFit: 'cover',
                y: imageY,
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 16,
                left: 16,
                padding: '6px 12px',
                borderRadius: 999,
                background: 'rgba(248, 243, 235, 0.15)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(248, 243, 235, 0.2)',
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#F8F3EB',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Est. 2026
              </span>
            </div>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(26,18,8,0.6), transparent 50%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 20,
                left: 20,
                right: 20,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 18,
                  fontWeight: 400,
                  color: '#F8F3EB',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.25,
                }}
              >
                Shaped by nature,<br />refined by design.
              </p>
            </div>
          </motion.div>

          {/* RIGHT — Unified card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              padding: 32,
              borderRadius: 20,
              background:
                'linear-gradient(145deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.4) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(184, 130, 79, 0.15)',
              boxShadow: '0 24px 48px -16px rgba(58, 30, 10, 0.08)',
              overflow: 'hidden',
            }}
          >
            {/* Decorative corner accent */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 140,
                height: 140,
                background:
                  'radial-gradient(circle at top right, rgba(184, 130, 79, 0.12), transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Description with quote mark accent */}
            <div style={{ position: 'relative', marginBottom: 28 }}>
              <span
                style={{
                  position: 'absolute',
                  top: -10,
                  left: -6,
                  fontSize: 60,
                  fontFamily: 'var(--font-display)',
                  color: 'rgba(184, 130, 79, 0.15)',
                  lineHeight: 0.5,
                  fontWeight: 400,
                  pointerEvents: 'none',
                }}
              >
                “
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: '#3A2A1A',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  position: 'relative',
                  paddingLeft: 16,
                }}
              >
                {t('description')}
              </p>
            </div>

            {/* Stats row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                padding: '22px 0',
                marginBottom: 28,
                borderTop: '1px solid rgba(184, 130, 79, 0.2)',
                borderBottom: '1px solid rgba(184, 130, 79, 0.2)',
                position: 'relative',
              }}
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    paddingLeft: i > 0 ? 20 : 0,
                    borderLeft: i > 0 ? '1px solid rgba(184, 130, 79, 0.15)' : 'none',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                    {stat.prefix && (
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 38,
                          fontWeight: 400,
                          color: '#1A1208',
                          lineHeight: 1,
                          letterSpacing: '-0.025em',
                        }}
                      >
                        {stat.prefix}
                      </span>
                    )}
                    <AnimatedCounter
                      value={stat.value}
                      duration={2}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 38,
                        fontWeight: 400,
                        color: '#1A1208',
                        lineHeight: 1,
                        letterSpacing: '-0.025em',
                      }}
                    />
                    {stat.suffix && (
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 16,
                          color: '#B8824F',
                        }}
                      >
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: '#8A6B4F',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      marginTop: 8,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Feature tabs — interactive */}
            <div>
              {/* Tab bar — 2 cols on mobile (fits long German words), 4 on desktop */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4"
                style={{
                  gap: 6,
                  marginBottom: 18,
                }}
              >
                {features.map((f, i) => {
                  const active = activeIdx === i;
                  return (
                    <motion.button
                      key={f.title}
                      onMouseEnter={() => setActiveIdx(i)}
                      onClick={() => setActiveIdx(i)}
                      style={{
                        position: 'relative',
                        minWidth: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                        padding: '14px 8px',
                        borderRadius: 14,
                        background: active
                          ? 'linear-gradient(135deg, #1A1208, #3A2A1A)'
                          : 'rgba(255, 255, 255, 0.5)',
                        border: active
                          ? '1px solid rgba(184, 130, 79, 0.4)'
                          : '1px solid rgba(184, 130, 79, 0.12)',
                        cursor: 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.2,0.8,0.2,1)',
                        boxShadow: active
                          ? '0 8px 24px -8px rgba(26, 18, 8, 0.3)'
                          : 'none',
                      }}
                    >
                      <motion.div
                        animate={{ rotate: active ? [0, -8, 8, 0] : 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 10,
                          background: active
                            ? 'linear-gradient(135deg, #B8824F, #D4A878)'
                            : 'linear-gradient(135deg, #F5EBE0, #EAD8C2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: active
                            ? '0 4px 12px -4px rgba(184, 130, 79, 0.5)'
                            : '0 2px 6px -2px rgba(184, 130, 79, 0.2)',
                        }}
                      >
                        <f.icon
                          size={15}
                          strokeWidth={2}
                          style={{ color: active ? '#F8F3EB' : '#8B5E35' }}
                        />
                      </motion.div>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: active ? '#F8F3EB' : '#6B5340',
                          letterSpacing: '0.02em',
                          textAlign: 'center',
                          lineHeight: 1.2,
                          overflowWrap: 'anywhere',
                          transition: 'color 0.4s ease',
                        }}
                      >
                        {f.title.split(' ')[0]}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Active feature description */}
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                style={{
                  padding: '16px 18px',
                  borderRadius: 14,
                  background: 'rgba(26, 18, 8, 0.04)',
                  border: '1px solid rgba(184, 130, 79, 0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: '#B8824F',
                      letterSpacing: '0.18em',
                    }}
                  >
                    0{activeIdx + 1} / 04
                  </span>
                  <span style={{ width: 20, height: 1, background: 'rgba(184, 130, 79, 0.3)' }} />
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 15,
                      fontWeight: 500,
                      color: '#1A1208',
                      letterSpacing: '-0.01em',
                      margin: 0,
                    }}
                  >
                    {features[activeIdx].title}
                  </h4>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: '#6B5340',
                    margin: 0,
                  }}
                >
                  {features[activeIdx].desc}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
