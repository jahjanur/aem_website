'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { getFloor, firstAvailableFloor, TOTAL_FLOORS } from '@/data/apartments';
import { Apartment } from '@/types';
import { useRouter } from '@/i18n/navigation';
import ApartmentTooltip from './ApartmentTooltip';
import { motion } from 'framer-motion';

const STATUS_COLORS = {
  available: '#10B981',
  reserved: '#F59E0B',
  sold: '#EF4444',
} as const;

export default function InteractiveFloorPlan() {
  const t = useTranslations('explore');
  const router = useRouter();
  const [selectedFloor, setSelectedFloor] = useState(firstAvailableFloor);
  const [hoveredApt, setHoveredApt] = useState<Apartment | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // On mobile we hide the always-on unit labels (they clutter the small plan).
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const floor = getFloor(selectedFloor);
  if (!floor) return null;

  const available = floor.apartments.filter((a) => a.status === 'available').length;
  const reserved = floor.apartments.filter((a) => a.status === 'reserved').length;
  const sold = floor.apartments.filter((a) => a.status === 'sold').length;
  const floorSoldOut = available === 0 && reserved === 0;

  const floorSoldOutN = (n: number) =>
    (getFloor(n)?.apartments.every((a) => a.status === 'sold')) ?? false;

  function handleMove(apt: Apartment, e: React.MouseEvent) {
    setHoveredApt(apt);
    const wrap = (e.currentTarget as Element).closest('.fp-wrap') as HTMLElement | null;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
      <div style={{ position: 'relative' }}>
        {/* ── Plan (re-fades on floor change) ── */}
        <motion.div
          key={selectedFloor}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="fp-wrap"
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '4160 / 1843',
            background: 'transparent',
            overflow: 'visible',
          }}
        >
          <img
            src="/renders/floor-plan-birdeye.png"
            alt={`Floor ${selectedFloor}`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />

          {/* Interactive overlay */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {floor.apartments.map((apt) => {
              const isHover = hoveredApt?.id === apt.id;
              const dim = hoveredApt && !isHover;
              const sc = STATUS_COLORS[apt.status];
              return (
                <polygon
                  key={apt.id}
                  points={apt.svgPoints}
                  className="transition-all duration-300"
                  fill={dim ? '#0c0905' : sc}
                  fillOpacity={dim ? 0.55 : isHover ? 0.34 : 0.16}
                  stroke={sc}
                  strokeWidth={isHover ? 0.8 : 0.5}
                  strokeOpacity={dim ? 0.25 : 1}
                  strokeLinejoin="round"
                  onMouseEnter={(e) => handleMove(apt, e as unknown as React.MouseEvent)}
                  onMouseMove={(e) => handleMove(apt, e as unknown as React.MouseEvent)}
                  onMouseLeave={() => setHoveredApt(null)}
                  onClick={() => apt.status !== 'sold' && router.push(`/apartments/${apt.id}`)}
                  style={{ cursor: apt.status !== 'sold' ? 'pointer' : 'not-allowed' }}
                />
              );
            })}
          </svg>

          {/* Labels — desktop only (hidden on mobile to reduce clutter) */}
          {!isMobile && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {floor.apartments.map((apt) => {
              const pts = apt.svgPoints.split(' ').map((p) => p.split(',').map(Number));
              const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
              const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
              const isHover = hoveredApt?.id === apt.id;
              const dim = hoveredApt && !isHover;
              return (
                <div
                  key={`l-${apt.id}`}
                  className={`fp-label${isHover ? ' fp-label--on' : ''}`}
                  style={{
                    position: 'absolute',
                    left: `${cx}%`,
                    top: `${cy}%`,
                    transform: `translate(-50%, -50%) scale(${isHover ? 1.06 : 1})`,
                    textAlign: 'center',
                    lineHeight: 1.25,
                    whiteSpace: 'nowrap',
                    padding: '7px 13px',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.9)',
                    border: `1px solid ${isHover ? STATUS_COLORS[apt.status] : 'rgba(184,130,79,0.22)'}`,
                    boxShadow: isHover ? '0 10px 26px -8px rgba(0,0,0,0.35)' : '0 2px 10px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    opacity: dim ? 0.28 : 1,
                    transition: 'opacity 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1208', letterSpacing: '-0.01em' }}>{apt.name}</div>
                  <div style={{ fontSize: 11, color: '#6B5340', marginTop: 2 }}>
                    {apt.area}m² · {apt.rooms}BR
                  </div>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: STATUS_COLORS[apt.status], marginTop: 3, letterSpacing: '0.04em' }}>
                    {t(apt.status).toUpperCase()}
                  </div>
                </div>
              );
            })}
          </div>
          )}

          {hoveredApt && <ApartmentTooltip apartment={hoveredApt} position={tooltipPos} />}
        </motion.div>

        {/* ── Control bar (switcher BELOW the plan) ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            padding: '22px 4px 0',
            background: 'transparent',
            borderTop: '1px solid rgba(184,130,79,0.12)',
            flexWrap: 'wrap',
          }}
        >
          {/* Floor selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#A08A72' }}>
              {t('selectFloor')}
            </span>
            <div style={{ display: 'flex', gap: 7 }}>
              {Array.from({ length: TOTAL_FLOORS }, (_, i) => i + 1).map((n) => {
                const active = selectedFloor === n;
                const soldOut = floorSoldOutN(n);
                return (
                  <motion.button
                    key={n}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedFloor(n);
                      setHoveredApt(null);
                    }}
                    aria-label={`Floor ${n}`}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 5,
                      minWidth: 50,
                      padding: '9px 0 8px',
                      borderRadius: 13,
                      border: active ? '1px solid transparent' : '1px solid rgba(255,255,255,0.16)',
                      background: active
                        ? 'linear-gradient(135deg, #C8956C 0%, #a47350 100%)'
                        : 'rgba(255,255,255,0.05)',
                      color: active ? '#FFFFFF' : 'rgba(248,243,235,0.85)',
                      cursor: 'pointer',
                      transition: 'background 0.25s ease, color 0.25s ease, border-color 0.25s ease',
                      boxShadow: active ? '0 10px 24px -8px rgba(184,130,79,0.6)' : 'none',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, lineHeight: 1 }}>{n}</span>
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: soldOut ? STATUS_COLORS.sold : STATUS_COLORS.available,
                      }}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Status of selected floor */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            {floorSoldOut ? (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 16px',
                  borderRadius: 999,
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: STATUS_COLORS.sold,
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: STATUS_COLORS.sold }} />
                {t('floor')} {selectedFloor} · Sold out
              </span>
            ) : (
              [
                { color: STATUS_COLORS.available, label: t('available'), count: available },
                { color: STATUS_COLORS.reserved, label: t('reserved'), count: reserved },
                { color: STATUS_COLORS.sold, label: t('sold'), count: sold },
              ].map((i) => (
                <div key={i.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: i.color, boxShadow: `0 0 0 3px ${i.color}22` }} />
                  <span style={{ fontSize: 12.5, color: 'rgba(248,243,235,0.7)' }}>{i.label}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: i.color }}>({i.count})</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
