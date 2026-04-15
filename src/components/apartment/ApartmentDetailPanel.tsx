'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Apartment } from '@/types';
import { formatPrice } from '@/lib/utils';
import { X, BedDouble, Bath, Ruler, Box, ArrowRight, Check, Mail, Download, Share2, MapPin, Compass, Sun, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeViewer from '../three-viewer/ThreeViewer';

const STATUS = {
  available: { bg: '#10B981', label: 'Available' },
  reserved: { bg: '#F59E0B', label: 'Reserved' },
  sold: { bg: '#EF4444', label: 'Sold' },
} as const;

const LABEL: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#909090',
  marginBottom: 14,
  display: 'block',
};

const DIVIDER: React.CSSProperties = { height: 1, background: '#EBEBEB', margin: '32px 0' };

export default function ApartmentDetailPanel({ apartment, onClose }: { apartment: Apartment; onClose: () => void }) {
  const t = useTranslations('apartment');
  const tE = useTranslations('explore');
  const locale = useLocale();
  const [show3D, setShow3D] = useState(false);
  const status = STATUS[apartment.status];

  const pricePerSqm = Math.round(apartment.price / apartment.area);
  const monthly = Math.round((apartment.price * 0.004) / 1) * 1; // ~0.4% per month rough indicative mortgage
  const orientation = ['North', 'South', 'East', 'West'][apartment.number % 4];
  const floorLabel = apartment.floor === 6 ? 'Penthouse level' : apartment.floor >= 4 ? 'High floor' : apartment.floor >= 2 ? 'Mid floor' : 'Ground level';

  const amenities = [
    { icon: Compass, label: `${orientation}-facing` },
    { icon: Sun, label: 'Abundant natural light' },
    { icon: Building2, label: floorLabel },
    { icon: MapPin, label: 'City-centre location' },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          background: 'rgba(10,10,10,0.55)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      />

      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 32, stiffness: 280 }}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          width: '100%',
          maxWidth: 560,
          zIndex: 50,
          background: '#FFFFFF',
          boxShadow: '-32px 0 80px rgba(0,0,0,0.2)',
          overflowY: 'auto',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {/* Hero */}
        <div
          style={{
            position: 'relative',
            height: 260,
            background: 'linear-gradient(135deg, #1A1208 0%, #2D1F12 50%, #3D2817 100%)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 75% 25%, rgba(184,130,79,0.45), transparent 55%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'repeating-linear-gradient(45deg, transparent 0 20px, rgba(255,255,255,0.02) 20px 21px)',
            }}
          />

          {/* Top actions */}
          <div
            style={{
              position: 'absolute',
              top: 20,
              left: 24,
              right: 24,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 2,
            }}
          >
            <div style={{ display: 'flex', gap: 8 }}>
              <IconBtn onClick={() => navigator.share?.({ title: apartment.name, url: window.location.href })} title="Share">
                <Share2 size={16} />
              </IconBtn>
              <IconBtn title="Download brochure">
                <Download size={16} />
              </IconBtn>
            </div>
            <IconBtn onClick={onClose} title="Close">
              <X size={18} />
            </IconBtn>
          </div>

          {/* Title block */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 28, zIndex: 2 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              <span
                style={{
                  padding: '5px 12px',
                  borderRadius: 999,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: status.bg,
                  color: '#FFFFFF',
                }}
              >
                {status.label}
              </span>
              <span
                style={{
                  padding: '5px 12px',
                  borderRadius: 999,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: 'rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.92)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                {apartment.type}
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 36,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#FFFFFF',
                fontWeight: 400,
              }}
            >
              {apartment.name}
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 6 }}>
              {t('floor')} {apartment.floor} · Unit {apartment.number} · {floorLabel}
            </p>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: 32 }}>
          {/* Price row */}
          {apartment.status !== 'sold' && (
            <>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <span style={LABEL}>{t('price')}</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 40,
                        fontWeight: 400,
                        color: '#0F0F0F',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                      }}
                    >
                      {formatPrice(apartment.price, locale)}
                    </p>
                    <span style={{ fontSize: 13, color: '#909090' }}>
                      {pricePerSqm.toLocaleString()} €/m²
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    padding: '10px 16px',
                    borderRadius: 14,
                    background: '#FAF7F2',
                    border: '1px solid #F0E7D9',
                    textAlign: 'right',
                    minWidth: 130,
                  }}
                >
                  <p style={{ fontSize: 11, color: '#909090', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Est. monthly*
                  </p>
                  <p style={{ fontSize: 18, fontWeight: 700, color: '#B8824F', marginTop: 4 }}>
                    €{monthly.toLocaleString()}
                  </p>
                </div>
              </div>
              <div style={DIVIDER} />
            </>
          )}

          {/* Stats */}
          <span style={LABEL}>Specifications</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { icon: Ruler, val: apartment.area, unit: 'm²', label: t('area') },
              { icon: BedDouble, val: apartment.rooms, unit: '', label: t('rooms') },
              { icon: Bath, val: apartment.bathrooms, unit: '', label: t('bathrooms') },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  padding: 18,
                  borderRadius: 18,
                  background: '#FAFAFA',
                  border: '1px solid #EBEBEB',
                }}
              >
                <s.icon size={18} style={{ color: '#B8824F' }} />
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 26,
                    fontWeight: 400,
                    color: '#0F0F0F',
                    letterSpacing: '-0.02em',
                    marginTop: 12,
                    lineHeight: 1,
                  }}
                >
                  {s.val}
                  {s.unit && <span style={{ fontSize: 12, color: '#909090', fontWeight: 400, marginLeft: 4 }}>{s.unit}</span>}
                </p>
                <p style={{ fontSize: 11, color: '#909090', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 6 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div style={DIVIDER} />

          {/* Description */}
          <span style={LABEL}>About this unit</span>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: '#555555' }}>{apartment.description}</p>

          <div style={DIVIDER} />

          {/* Amenities */}
          <span style={LABEL}>Highlights</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {amenities.map((a) => (
              <div
                key={a.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: '#FAFAFA',
                  border: '1px solid #EBEBEB',
                  fontSize: 13,
                  color: '#0F0F0F',
                }}
              >
                <a.icon size={15} style={{ color: '#B8824F', flexShrink: 0 }} />
                <span>{a.label}</span>
              </div>
            ))}
          </div>

          <div style={DIVIDER} />

          {/* Features */}
          <span style={LABEL}>{t('features')}</span>
          <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, listStyle: 'none' }}>
            {apartment.features.map((f) => (
              <li
                key={f}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 12px',
                  borderRadius: 10,
                  background: '#FFFFFF',
                  border: '1px solid #EBEBEB',
                  fontSize: 13,
                  color: '#0F0F0F',
                }}
              >
                <Check size={13} style={{ color: '#B8824F', flexShrink: 0 }} />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div style={DIVIDER} />

          {/* Floor plan preview */}
          <span style={LABEL}>Floor plan</span>
          <div
            style={{
              borderRadius: 18,
              border: '1px solid #EBEBEB',
              background: 'linear-gradient(135deg, #FAFAFA, #F5F0E8)',
              aspectRatio: '16 / 10',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 8,
              color: '#909090',
              fontSize: 13,
            }}
          >
            <Ruler size={22} style={{ color: '#B8824F' }} />
            <p style={{ fontWeight: 600, color: '#0F0F0F', fontSize: 14 }}>Detailed floor plan</p>
            <p style={{ fontSize: 12 }}>Click to enlarge · Download PDF available</p>
          </div>

          <div style={{ ...DIVIDER, margin: '32px 0 24px' }} />

          {/* CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button
              onClick={() => setShow3D(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                padding: '18px 28px',
                fontSize: 14,
                fontWeight: 600,
                borderRadius: 14,
                background: '#0F0F0F',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.2,0.8,0.2,1)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#B8824F'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#0F0F0F'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <Box size={16} /> {t('view3DTour')} <ArrowRight size={14} />
            </button>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                padding: '18px 28px',
                fontSize: 14,
                fontWeight: 600,
                borderRadius: 14,
                background: '#FFFFFF',
                color: '#0F0F0F',
                border: '1px solid #D4D4D4',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0F0F0F'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#D4D4D4'; }}
            >
              <Mail size={16} /> {t('contactUs')}
            </button>
          </div>

          <p style={{ fontSize: 11, color: '#909090', marginTop: 20, lineHeight: 1.5 }}>
            * Estimated monthly cost based on a 25-year mortgage at current indicative rates. For illustration only — not a financial offer.
          </p>
        </div>
      </motion.aside>

      <AnimatePresence>
        {show3D && <ThreeViewer modelPath={apartment.modelPath} apartmentName={apartment.name} onClose={() => setShow3D(false)} />}
      </AnimatePresence>
    </>
  );
}

function IconBtn({ children, onClick, title }: { children: React.ReactNode; onClick?: () => void; title?: string }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 36,
        height: 36,
        borderRadius: 999,
        background: 'rgba(255,255,255,0.14)',
        color: '#FFFFFF',
        border: '1px solid rgba(255,255,255,0.12)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'background 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
    >
      {children}
    </button>
  );
}
