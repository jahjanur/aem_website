'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';
import { useRef } from 'react';
import InteractiveFloorPlan from '../floor-plan/InteractiveFloorPlan';

export default function FloorPreview() {
  const t = useTranslations('explore');
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="explore"
      className="section"
      style={{ background: '#2A1D10', position: 'relative', overflow: 'hidden', scrollMarginTop: 90 }}
    >
      {/* Warm gradient + ambient glows */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #3A2A1A 0%, #2A1D10 50%, #1F1408 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,145,95,0.14), transparent 65%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-page" style={{ position: 'relative' }}>
        {/* Header */}
        <div
          className="lg:!grid-cols-[1.2fr_1fr]"
          style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32, alignItems: 'end', marginBottom: 56 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <p className="eyebrow" style={{ marginBottom: 24, color: '#D4A878', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ display: 'inline-block', width: 32, height: 1, background: '#D4A878' }} />
              Interactive Explorer
            </p>
            <h2 className="heading-1" style={{ color: '#F8F3EB', marginBottom: 0 }}>
              Find your perfect<br />
              <span style={{ color: '#D4A878', fontStyle: 'italic' }}>apartment.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(248, 243, 235, 0.6)', maxWidth: 440, marginBottom: 20 }}>
              Pick a floor, hover any residence to see its details, then open it for the full layout and a 360° tour.
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
              <span style={{ fontSize: 11, fontWeight: 600, color: '#D4A878', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Hover to explore
              </span>
            </div>
          </motion.div>
        </div>

        {/* The interactive floor plan */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
        >
          <InteractiveFloorPlan />
        </motion.div>
      </div>
    </section>
  );
}
