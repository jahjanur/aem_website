'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Eye, MousePointer2 } from 'lucide-react';
import { useRef } from 'react';

export default function FloorPreview() {
  const t = useTranslations('explore');
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="section"
      style={{
        background: '#2A1D10',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Warm gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, #3A2A1A 0%, #2A1D10 50%, #1F1408 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Giant ghost number in background */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '-5%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(400px, 50vw, 800px)',
          fontWeight: 400,
          color: 'rgba(184, 130, 79, 0.03)',
          lineHeight: 0.85,
          letterSpacing: '-0.05em',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        48
      </div>

      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '-10%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,145,95,0.15), transparent 65%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '20%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(140,90,50,0.2), transparent 65%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle noise grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage:
            'linear-gradient(rgba(248,243,235,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(248,243,235,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      <div className="container-page" style={{ position: 'relative' }}>
        {/* Top section header — editorial layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 32,
            alignItems: 'end',
            marginBottom: 80,
          }}
          className="lg:!grid-cols-[1.2fr_1fr]"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <p className="eyebrow" style={{ marginBottom: 28, color: '#D4A878' }}>
              <span
                style={{
                  content: '',
                  display: 'inline-block',
                  width: 32,
                  height: 1,
                  background: '#D4A878',
                }}
              />
              Interactive Explorer
            </p>
            <h2
              className="heading-1"
              style={{
                color: '#F8F3EB',
                marginBottom: 0,
              }}
            >
              Find your perfect<br />
              <span style={{ color: '#D4A878', fontStyle: 'italic' }}>apartment.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                color: 'rgba(248, 243, 235, 0.6)',
                maxWidth: 440,
                marginBottom: 24,
              }}
            >
              Explore each floor with our interactive plan. Hover any apartment for details, pricing, and a virtual 3D tour that brings the space to life.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 16px',
                borderRadius: 999,
                background: 'rgba(184,130,79,0.12)',
                border: '1px solid rgba(184,130,79,0.25)',
              }}
            >
              <MousePointer2 size={13} style={{ color: '#D4A878' }} />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#D4A878',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Hover to explore
              </span>
            </div>
          </motion.div>
        </div>

        {/* Main interactive card — floor plan preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
          style={{
            position: 'relative',
            borderRadius: 32,
            overflow: 'hidden',
            background: 'rgba(58, 42, 26, 0.4)',
            border: '1px solid rgba(184, 130, 79, 0.2)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 60px 120px -30px rgba(0,0,0,0.5)',
          }}
        >
          {/* Card header bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 28px',
              borderBottom: '1px solid rgba(184, 130, 79, 0.15)',
              background: 'rgba(31, 20, 8, 0.6)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {/* Traffic lights — decorative */}
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
              </div>
              <div
                style={{
                  height: 16,
                  width: 1,
                  background: 'rgba(248,243,235,0.1)',
                }}
              />
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 14,
                  color: 'rgba(248, 243, 235, 0.8)',
                  letterSpacing: '-0.01em',
                }}
              >
                AEM Residence — Floor Plan Explorer
              </p>
            </div>

            {/* Legend — inline status */}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {[
                { color: '#10B981', label: t('available') },
                { color: '#F59E0B', label: t('reserved') },
                { color: '#EF4444', label: t('sold') },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: item.color,
                      boxShadow: `0 0 12px ${item.color}80`,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'rgba(248, 243, 235, 0.65)',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image wrapper */}
          <div
            style={{
              position: 'relative',
              padding: 32,
            }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: 20,
                overflow: 'hidden',
                aspectRatio: '16 / 10',
                boxShadow: 'inset 0 0 0 1px rgba(184,130,79,0.15)',
              }}
            >
              <motion.img
                initial={{ scale: 1.05 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 1.5, ease: [0.25, 0.8, 0.25, 1] }}
                src="/renders/floor-plan.jpg"
                alt="Floor Plan"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Floor selector chips overlay bottom-left */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 24,
                  left: 24,
                  display: 'flex',
                  gap: 6,
                  padding: 6,
                  background: 'rgba(31, 20, 8, 0.85)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: 999,
                  border: '1px solid rgba(184, 130, 79, 0.3)',
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <motion.div
                    key={n}
                    whileHover={{ scale: 1.15 }}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: n === 3 ? '#B8824F' : 'transparent',
                      color: n === 3 ? '#F8F3EB' : 'rgba(248,243,235,0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {n}
                  </motion.div>
                ))}
              </div>

              {/* Info tag bottom-right */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 24,
                  right: 24,
                  padding: '10px 18px',
                  borderRadius: 999,
                  background: 'rgba(31, 20, 8, 0.85)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(184, 130, 79, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#D4A878',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  Floor 3
                </span>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(184,130,79,0.5)' }} />
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: 'rgba(248,243,235,0.7)',
                    letterSpacing: '0.05em',
                  }}
                >
                  8 apartments
                </span>
              </div>
            </div>
          </div>

          {/* Card footer with CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 32px 32px',
              flexWrap: 'wrap',
              gap: 20,
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 20,
                  fontWeight: 400,
                  color: '#F8F3EB',
                  letterSpacing: '-0.01em',
                  marginBottom: 4,
                }}
              >
                Ready to find your home?
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: 'rgba(248, 243, 235, 0.5)',
                }}
              >
                Browse all 48 apartments across 6 floors
              </p>
            </div>

            <Link
              href="/explore"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '16px 32px',
                borderRadius: 999,
                background: '#F8F3EB',
                color: '#2A1D10',
                fontSize: 13,
                fontWeight: 600,
                transition: 'all 0.4s cubic-bezier(0.2,0.8,0.2,1)',
                boxShadow: '0 16px 40px -10px rgba(248, 243, 235, 0.25)',
              }}
            >
              <Eye size={16} /> {t('title')} <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
