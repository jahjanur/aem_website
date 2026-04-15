'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  italicWord?: string;
  description?: string;
  action?: ReactNode;
}

export default function PageHeader({
  eyebrow,
  title,
  italicWord,
  description,
  action,
}: PageHeaderProps) {
  // Split the title so the last word (or italicWord) becomes italic copper
  const words = title.split(' ');
  const lastWord = italicWord || words[words.length - 1];
  const rest = italicWord ? title : words.slice(0, -1).join(' ');

  return (
    <div
      style={{
        paddingTop: 160,
        paddingBottom: 56,
        position: 'relative',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          right: '-15%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,130,79,0.12), transparent 65%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative' }}>
        {/* Header row — eyebrow + optional action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.8, 0.25, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            marginBottom: 28,
            flexWrap: 'wrap',
          }}
        >
          <p className="eyebrow" style={{ margin: 0 }}>
            {eyebrow}
          </p>
          {action}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.25, 0.8, 0.25, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 5.5vw, 72px)',
            fontWeight: 400,
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            color: '#1A1208',
            marginBottom: description ? 24 : 0,
            maxWidth: 900,
          }}
        >
          {rest}{' '}
          <span style={{ color: '#B8824F', fontStyle: 'italic' }}>{lastWord}.</span>
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24 }}
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: '#6B5340',
              maxWidth: 540,
            }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  );
}
