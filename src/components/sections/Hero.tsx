'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function Hero() {
  const t = useTranslations('hero');
  const tX = useTranslations('heroExtra');
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3, restDelta: 0.001 });
  const imgY = useTransform(smooth, [0, 1], ['0%', '20%'], { clamp: true });
  const opacity = useTransform(smooth, [0, 0.7], [1, 0], { clamp: true });

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#0A0A0A',
        paddingTop: 140,
        paddingBottom: 80,
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* Parallax background — image overhangs top & bottom so the parallax
          shift never reveals the section behind it, even at the very top. */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          y: imgY,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      >
        <motion.img
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.25, 0.8, 0.25, 1] }}
          src="/renders/hero.png"
          alt={tX('heroImageAlt')}
          style={{
            position: 'absolute',
            top: '-25%',
            left: 0,
            right: 0,
            width: '100%',
            height: '150%',
            objectFit: 'cover',
            opacity: 0.55,
            willChange: 'transform',
          }}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.7) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 30% 100%, rgba(184,130,79,0.2), transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <motion.div style={{ position: 'relative', width: '100%', opacity }}>
        <div className="container-page">
          <div className="grid-hero">
            {/* Left */}
            <div style={{ maxWidth: 780 }}>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 20px',
                  borderRadius: 999,
                  background: 'rgba(35,25,15,0.5)',
                  border: '1px solid rgba(184,130,79,0.35)',
                  backdropFilter: 'blur(12px) saturate(130%)',
                  WebkitBackdropFilter: 'blur(12px) saturate(130%)',
                  marginBottom: 36,
                }}
              >
                <span
                  className="anim-pulse-glow"
                  style={{ width: 7, height: 7, borderRadius: '50%', background: '#B8824F' }}
                />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#D4A878', letterSpacing: '0.22em' }}>
                  {tX('nowSellingBadge')}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2, ease: [0.25, 0.8, 0.25, 1] }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(38px, 5.5vw, 76px)',
                  fontWeight: 400,
                  lineHeight: 1.04,
                  letterSpacing: '-0.025em',
                  color: '#FFFFFF',
                  marginBottom: 28,
                  wordBreak: 'break-word',
                }}
              >
                {t('title')}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.3 }}
                style={{
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: 40,
                  maxWidth: 500,
                  fontWeight: 300,
                }}
              >
                {t('subtitle')}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.5 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}
              >
                <a href="#explore" className="btn btn-light">
                  {t('cta')} <ArrowRight size={16} />
                </a>
                <Link href="/contact" className="btn btn-outline-light">
                  {t('ctaSecondary')}
                </Link>
              </motion.div>
            </div>

            {/* Right — Stats card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 2.6 }}
              style={{
                padding: '36px 40px',
                borderRadius: 24,
                background: 'linear-gradient(155deg, rgba(34,25,15,0.72) 0%, rgba(16,12,7,0.66) 100%)',
                backdropFilter: 'blur(20px) saturate(130%)',
                WebkitBackdropFilter: 'blur(20px) saturate(130%)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 30px 80px -30px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.09)',
                minWidth: 0,
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: 'rgba(184,130,79,0.9)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  marginBottom: 24,
                }}
              >
                {tX('statsEyebrow')}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                {[
                  { val: 48, label: tX('statUnits') },
                  { val: 6, label: tX('statFloors') },
                  { val: 136, label: tX('statMaxArea') },
                ].map((s) => (
                  <div key={s.label}>
                    <AnimatedCounter
                      value={s.val}
                      duration={2.2}
                      className="block"
                      style={{
                        fontSize: 42,
                        fontWeight: 700,
                        color: '#FFFFFF',
                        lineHeight: 1,
                        letterSpacing: '-0.04em',
                      }}
                    />
                    <p
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.4)',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        marginTop: 8,
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '24px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
                <div>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4, letterSpacing: '0.05em' }}>
                    {tX('availabilityLabel')}
                  </p>
                  <p style={{ fontSize: 20, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                    {tX('availabilityValue')}
                  </p>
                </div>
                <Link
                  href="/apartments"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#D4A878',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '10px 16px',
                    border: '1px solid rgba(184,130,79,0.3)',
                    borderRadius: 999,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tX('viewAll')} <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
