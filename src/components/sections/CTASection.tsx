'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

export default function CTASection() {
  const t = useTranslations('contact');

  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <motion.img
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.25, 0.8, 0.25, 1] }}
          src="/renders/exterior-01.jpg"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1F 50%, #0A0A0A 100%)',
          }}
        />
      </div>

      {/* Ambient glows */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '15%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,130,79,0.12), transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '15%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,130,79,0.08), transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-page" style={{ position: 'relative', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="eyebrow" style={{ marginBottom: 24, justifyContent: 'center' }}>
            Your Future Home
          </p>
          <h2 className="heading-1" style={{ color: '#FFFFFF', marginBottom: 24, maxWidth: 760, margin: '0 auto 24px' }}>
            Ready to find your ideal apartment?
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.45)',
              marginBottom: 48,
              maxWidth: 480,
              margin: '0 auto 48px',
            }}
          >
            Schedule a private viewing or explore our apartments online. Our team is ready to guide you.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            <Link href="/contact" className="btn btn-accent">
              <Phone size={16} /> {t('title')} <ArrowRight size={16} />
            </Link>
            <a href="#explore" className="btn btn-outline-light">
              Explore Floors
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
