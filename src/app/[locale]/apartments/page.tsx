'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { floors, TOTAL_FLOORS, apartmentTypes, tourableApartments, firstAvailableFloor } from '@/data/apartments';
import { Link } from '@/i18n/navigation';
import { BedDouble, Bath, Ruler, ArrowUpRight, Compass } from 'lucide-react';

const STATUS_COLOR: Record<string, string> = {
  available: '#10B981',
  reserved: '#F59E0B',
  sold: '#EF4444',
};

export default function ApartmentsPage() {
  const t = useTranslations('apartment');
  const tE = useTranslations('explore');
  const tP = useTranslations('apartmentsPage');
  const [floor, setFloor] = useState(firstAvailableFloor);

  const units = floors.find((f) => f.number === floor)?.apartments ?? [];
  const availableCount = units.filter((a) => a.status === 'available').length;

  const sizes = apartmentTypes.map((a) => a.area);
  const heroStats = [
    { v: `${apartmentTypes.length}`, l: tP('statLayouts') },
    { v: `${TOTAL_FLOORS}`, l: tP('statFloors') },
    { v: `${Math.min(...sizes)}–${Math.max(...sizes)} m²`, l: tP('statSizeRange') },
    { v: `${tourableApartments.length}`, l: tP('statTours') },
  ];

  return (
    <section
      style={{
        minHeight: '100vh',
        background: '#F8F3EB',
        paddingBottom: 120,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <div style={{ paddingTop: 112, paddingBottom: 44 }}>
          <div
            style={{
              position: 'relative',
              borderRadius: 34,
              overflow: 'hidden',
              background: 'linear-gradient(155deg, #241a0e 0%, #16110a 58%, #0f0b06 100%)',
              padding: 'clamp(40px, 6vw, 78px)',
              boxShadow: '0 40px 90px -50px rgba(26,18,8,0.7)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -150,
                right: -110,
                width: 480,
                height: 480,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(200,149,108,0.20), transparent 66%)',
                filter: 'blur(72px)',
                pointerEvents: 'none',
              }}
            />
            <div style={{ position: 'relative' }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8956C', marginBottom: 22 }}>
                {tP('heroEyebrow')}
              </p>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(44px, 6.5vw, 84px)',
                  fontWeight: 400,
                  lineHeight: 1.0,
                  letterSpacing: '-0.035em',
                  color: '#F8F3EB',
                  maxWidth: 820,
                }}
              >
                {tP('heroTitle')}
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: 'rgba(248,243,235,0.68)', maxWidth: 580, marginTop: 24 }}>
                {tP('heroSubtitle')}
              </p>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: 'clamp(32px, 4vw, 48px) 0' }} />

              <div style={{ display: 'flex', gap: 'clamp(28px, 5vw, 72px)', flexWrap: 'wrap' }}>
                {heroStats.map((s) => (
                  <div key={s.l}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 500, color: '#F8F3EB', letterSpacing: '-0.02em', lineHeight: 1 }}>
                      {s.v}
                    </p>
                    <p style={{ fontSize: 12, color: 'rgba(248,243,235,0.5)', marginTop: 8, letterSpacing: '0.03em' }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floor selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ marginBottom: 20 }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: '#8A6B4F',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              {tE('selectFloor')}
            </span>
            <span style={{ fontSize: 12, color: '#A08A72' }}>
              {tP('availableOnFloor', { count: availableCount })}
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {Array.from({ length: TOTAL_FLOORS }, (_, i) => i + 1).map((n) => {
              const active = n === floor;
              return (
                <button
                  key={n}
                  onClick={() => setFloor(n)}
                  style={{
                    minWidth: 92,
                    padding: '13px 20px',
                    borderRadius: 16,
                    fontSize: 13,
                    fontWeight: active ? 700 : 500,
                    textAlign: 'center',
                    background: active ? '#1A1208' : 'rgba(255,255,255,0.55)',
                    color: active ? '#F8F3EB' : '#6B5340',
                    border: active
                      ? '1px solid #1A1208'
                      : '1px solid rgba(184,130,79,0.18)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                >
                  <span style={{ display: 'block', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6 }}>
                    {tE('floor')}
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500 }}>{n}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Grid — re-animates on floor change */}
        <div
          key={floor}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
            marginTop: 32,
          }}
        >
          {units.map((apt, i) => {
            const hasTour = apt.tourScenes.length > 0;
            return (
              <Link key={apt.id} href={`/apartments/${apt.id}`} style={{ textDecoration: 'none' }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.55 }}
                  whileHover={{ y: -6 }}
                  style={{
                    borderRadius: 24,
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(184, 130, 79, 0.15)',
                    transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
                    cursor: 'pointer',
                    height: '100%',
                  }}
                  className="group hover:!shadow-[0_30px_60px_-20px_rgba(58,30,10,0.15)] hover:!border-[rgba(184,130,79,0.35)]"
                >
                  {/* Image */}
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '4/3',
                      overflow: 'hidden',
                      background: '#FFFFFF',
                    }}
                  >
                    <img
                      src={apt.featuredImage ?? apt.floorPlanImage}
                      alt={apt.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        padding: 10,
                        transition: 'filter 0.55s ease',
                      }}
                      className="group-hover:brightness-[1.06] group-hover:contrast-[1.03]"
                    />
                    {/* status badge */}
                    <span
                      style={{
                        position: 'absolute',
                        top: 14,
                        right: 14,
                        padding: '6px 12px',
                        borderRadius: 999,
                        fontSize: 10,
                        fontWeight: 700,
                        color: '#FFFFFF',
                        background: STATUS_COLOR[apt.status],
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {tE(apt.status)}
                    </span>
                    {/* 360 indicator */}
                    {hasTour && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 14,
                          left: 14,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          padding: '6px 12px',
                          borderRadius: 999,
                          fontSize: 10,
                          fontWeight: 700,
                          color: '#FFFFFF',
                          background: 'rgba(20,20,22,0.6)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        <Compass size={12} /> {tP('tourBadge')}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div style={{ padding: 22 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 12,
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 18,
                          fontWeight: 500,
                          color: '#1A1208',
                          letterSpacing: '-0.015em',
                        }}
                      >
                        {apt.name}
                      </h3>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: '#B8824F',
                          background: 'rgba(184, 130, 79, 0.1)',
                          padding: '4px 10px',
                          borderRadius: 999,
                          letterSpacing: '0.08em',
                        }}
                      >
                        {apt.type}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        gap: 16,
                        fontSize: 12,
                        color: '#8A6B4F',
                        marginBottom: 16,
                        paddingBottom: 16,
                        borderBottom: '1px solid rgba(184, 130, 79, 0.15)',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Ruler size={12} /> {apt.area} {t('sqm')}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <BedDouble size={12} /> {apt.rooms}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Bath size={12} /> {apt.bathrooms}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: STATUS_COLOR[apt.status],
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {tE(apt.status)}
                      </span>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          fontSize: 12,
                          fontWeight: 600,
                          color: '#B8824F',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {tE('viewDetails')} <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
