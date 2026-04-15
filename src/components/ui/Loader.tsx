'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AEMAnimatedLogo from './AEMAnimatedLogo';

const phrases = ['Crafting Space', 'Designing Detail', 'Welcome Home'];

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const total = 3600;
    const phraseInterval = total / phrases.length;

    const pt = setInterval(() => {
      setPhraseIndex((i) => (i < phrases.length - 1 ? i + 1 : i));
    }, phraseInterval);

    const done = setTimeout(() => setLoading(false), total + 600);

    return () => {
      clearInterval(pt);
      clearTimeout(done);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0A0A0A',
          }}
        >
          {/* Ambient glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.2 }}
            style={{
              position: 'absolute',
              width: 720,
              height: 720,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(184,130,79,0.14) 0%, transparent 60%)',
              filter: 'blur(90px)',
              pointerEvents: 'none',
            }}
          />

          {/* Grid background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.035,
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
              pointerEvents: 'none',
            }}
          />

          {/* Animated logo */}
          <div style={{ position: 'relative', marginBottom: 72 }}>
            <AEMAnimatedLogo size={200} color="#FFFFFF" strokeColor="#B8824F" />

            {/* Pulsing glow */}
            <motion.div
              animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.08, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: -48,
                background: 'radial-gradient(circle, rgba(184,130,79,0.18), transparent 70%)',
                filter: 'blur(32px)',
                zIndex: -1,
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Rotating status phrases */}
          <div
            style={{
              height: 28,
              position: 'relative',
              overflow: 'hidden',
              marginBottom: 28,
              minWidth: 260,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={phraseIndex}
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -28, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 22,
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.92)',
                  letterSpacing: '-0.015em',
                  position: 'absolute',
                }}
              >
                {phrases[phraseIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Minimal progress line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
            style={{
              position: 'relative',
              width: 320,
              height: 1,
              background: 'rgba(255,255,255,0.08)',
              overflow: 'hidden',
              transformOrigin: 'center',
            }}
          >
            {/* Moving copper line */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                height: '100%',
                width: 80,
                background: 'linear-gradient(90deg, transparent, #B8824F, transparent)',
              }}
              animate={{ x: [-80, 320] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Small brand tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{
              marginTop: 40,
              fontFamily: 'var(--font-sans)',
              fontSize: 10,
              fontWeight: 600,
              color: 'rgba(184,130,79,0.6)',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
            }}
          >
            AEM · Residence
          </motion.p>

          {/* Corner accents */}
          {[
            { top: 32, left: 32, t: true, l: true },
            { top: 32, right: 32, t: true, r: true },
            { bottom: 32, left: 32, b: true, l: true },
            { bottom: 32, right: 32, b: true, r: true },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + i * 0.1, duration: 0.7 }}
              style={{
                position: 'absolute',
                top: p.top,
                bottom: p.bottom,
                left: p.left,
                right: p.right,
                width: 48,
                height: 48,
                borderTop: p.t ? '1px solid rgba(184,130,79,0.35)' : undefined,
                borderBottom: p.b ? '1px solid rgba(184,130,79,0.35)' : undefined,
                borderLeft: p.l ? '1px solid rgba(184,130,79,0.35)' : undefined,
                borderRight: p.r ? '1px solid rgba(184,130,79,0.35)' : undefined,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
