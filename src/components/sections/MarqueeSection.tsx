'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const itemKeys = [
  'premiumLiving',
  'modernDesign',
  'smartLayouts',
  'apartmentsCount',
  'floorsCount',
  'luxuryFinishes',
  'primeLocation',
  'energyEfficient',
];

function MarqueeRow({ direction = 'left' }: { direction?: 'left' | 'right' }) {
  const t = useTranslations('marquee');
  const items = itemKeys.map((key) => t(key));
  const xRange = direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'];

  return (
    <div
      style={{
        display: 'flex',
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <motion.div
        animate={{ x: xRange }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 45,
            ease: 'linear',
          },
        }}
        style={{
          display: 'flex',
          flexShrink: 0,
          willChange: 'transform',
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 56,
              paddingRight: 56,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 3vw, 40px)',
                fontWeight: 400,
                color: '#1A1208',
                letterSpacing: '-0.025em',
                whiteSpace: 'nowrap',
                lineHeight: 1,
              }}
            >
              {item}
            </span>
            <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
              <circle cx="7" cy="7" r="3" fill="#B8824F" />
              <circle cx="7" cy="7" r="6" fill="none" stroke="#B8824F" strokeOpacity="0.3" strokeWidth="1" />
            </svg>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function MarqueeSection() {
  return (
    <section
      style={{
        padding: '48px 0',
        background: '#FFFFFF',
        borderTop: '1px solid #EBEBEB',
        borderBottom: '1px solid #EBEBEB',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Subtle gradient wash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FBF7F0 50%, #FFFFFF 100%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <MarqueeRow direction="left" />
      </div>
    </section>
  );
}
