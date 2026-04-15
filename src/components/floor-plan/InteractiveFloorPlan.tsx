'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getFloor } from '@/data/apartments';
import { Apartment } from '@/types';
import { getStatusOverlayClass, formatPrice, cn } from '@/lib/utils';
import ApartmentTooltip from './ApartmentTooltip';
import ApartmentDetailPanel from '../apartment/ApartmentDetailPanel';
import { AnimatePresence, motion } from 'framer-motion';

const STATUS_COLORS = {
  available: '#10B981',
  reserved: '#F59E0B',
  sold: '#EF4444',
} as const;

export default function InteractiveFloorPlan() {
  const t = useTranslations('explore');
  const locale = useLocale();
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [hoveredApt, setHoveredApt] = useState<Apartment | null>(null);
  const [selectedApt, setSelectedApt] = useState<Apartment | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const floor = getFloor(selectedFloor);
  if (!floor) return null;

  const available = floor.apartments.filter((a) => a.status === 'available').length;
  const reserved = floor.apartments.filter((a) => a.status === 'reserved').length;
  const sold = floor.apartments.filter((a) => a.status === 'sold').length;

  function handleMove(apt: Apartment, e: React.MouseEvent) {
    setHoveredApt(apt);
    const wrap = (e.currentTarget as Element).closest('.fp-wrap') as HTMLElement | null;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', width: '100%' }}>
      {/* Controls row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          marginBottom: 32,
        }}
      >
        {/* Floor selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#909090' }}>
            {t('selectFloor')}
          </span>
          <div
            style={{
              display: 'flex',
              gap: 4,
              padding: 5,
              borderRadius: 16,
              background: '#FFFFFF',
              border: '1px solid #EBEBEB',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => {
              const active = selectedFloor === n;
              return (
                <motion.button
                  key={n}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setSelectedFloor(n);
                    setSelectedApt(null);
                  }}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 11,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 700,
                    background: active ? '#0F0F0F' : 'transparent',
                    color: active ? '#FFFFFF' : '#909090',
                    boxShadow: active ? '0 4px 14px rgba(0,0,0,0.18)' : 'none',
                    transition: 'all 0.25s',
                  }}
                >
                  {n}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { color: STATUS_COLORS.available, label: t('available'), count: available },
            { color: STATUS_COLORS.reserved, label: t('reserved'), count: reserved },
            { color: STATUS_COLORS.sold, label: t('sold'), count: sold },
          ].map((i) => (
            <div key={i.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: i.color, boxShadow: `0 0 0 3px ${i.color}22` }} />
              <span style={{ fontSize: 13, color: '#555555' }}>{i.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: i.color }}>({i.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floor plan frame */}
      <motion.div
        key={selectedFloor}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'relative',
          borderRadius: 24,
          overflow: 'hidden',
          background: '#FFFFFF',
          border: '1px solid #EBEBEB',
          boxShadow: '0 32px 80px -20px rgba(0,0,0,0.12)',
        }}
      >
        <div
          className="fp-wrap"
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            background: '#F5F0E8',
            overflow: 'hidden',
          }}
        >
          <img
            src="/renders/floor-plan.jpg"
            alt={`Floor ${selectedFloor}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />

          {/* Interactive overlay */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {floor.apartments.map((apt) => (
              <polygon
                key={apt.id}
                points={apt.svgPoints}
                className={cn(
                  'transition-all duration-300 stroke-white/40 stroke-[0.15]',
                  getStatusOverlayClass(apt.status)
                )}
                onMouseEnter={(e) => handleMove(apt, e as unknown as React.MouseEvent)}
                onMouseMove={(e) => handleMove(apt, e as unknown as React.MouseEvent)}
                onMouseLeave={() => setHoveredApt(null)}
                onClick={() => apt.status !== 'sold' && setSelectedApt(apt)}
                style={{ cursor: apt.status !== 'sold' ? 'pointer' : 'not-allowed' }}
              />
            ))}
          </svg>

          {/* Apartment labels (HTML-positioned, not stretched) */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {floor.apartments.map((apt) => {
              const pts = apt.svgPoints.split(' ').map((p) => p.split(',').map(Number));
              const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
              const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
              return (
                <div
                  key={`l-${apt.id}`}
                  style={{
                    position: 'absolute',
                    left: `${cx}%`,
                    top: `${cy}%`,
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    lineHeight: 1.25,
                    textShadow: '0 1px 2px rgba(255,255,255,0.6)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1208', letterSpacing: '-0.01em' }}>
                    {apt.name}
                  </div>
                  <div style={{ fontSize: 11, color: '#6B5340', marginTop: 2 }}>
                    {apt.area}m² · {apt.rooms}BR
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: STATUS_COLORS[apt.status],
                      marginTop: 3,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {apt.status === 'available' ? formatPrice(apt.price, locale) : t(apt.status).toUpperCase()}
                  </div>
                </div>
              );
            })}
          </div>

          {hoveredApt && <ApartmentTooltip apartment={hoveredApt} position={tooltipPos} />}
        </div>

        {/* Info bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 28px',
            background: '#FAFAFA',
            borderTop: '1px solid #EBEBEB',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#909090' }}>
              {t('floor')}
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 400, color: '#0F0F0F', letterSpacing: '-0.02em' }}>
              {selectedFloor}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#555555' }}>
            <span>
              <span style={{ fontWeight: 700, color: STATUS_COLORS.available }}>{available}</span> {t('available')}
            </span>
            <span>
              <span style={{ fontWeight: 700, color: STATUS_COLORS.reserved }}>{reserved}</span> {t('reserved')}
            </span>
            <span>
              <span style={{ fontWeight: 700, color: STATUS_COLORS.sold }}>{sold}</span> {t('sold')}
            </span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedApt && <ApartmentDetailPanel apartment={selectedApt} onClose={() => setSelectedApt(null)} />}
      </AnimatePresence>
    </div>
  );
}
