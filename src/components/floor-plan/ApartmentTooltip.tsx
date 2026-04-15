'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Apartment } from '@/types';
import { formatPrice } from '@/lib/utils';
import { ArrowRight, BedDouble, Bath, Ruler } from 'lucide-react';

const STATUS = {
  available: { bg: '#10B981', label: 'Available' },
  reserved: { bg: '#F59E0B', label: 'Reserved' },
  sold: { bg: '#EF4444', label: 'Sold' },
} as const;

const TOOLTIP_W = 260;
const TOOLTIP_H_APPROX = 180;
const OFFSET = 18;

export default function ApartmentTooltip({
  apartment,
  position,
}: {
  apartment: Apartment;
  position: { x: number; y: number };
}) {
  const tA = useTranslations('apartment');
  const locale = useLocale();
  const status = STATUS[apartment.status];

  // Flip tooltip to the left / above when near edges of the parent container
  const parentW = typeof window !== 'undefined' ? (document.querySelector('.fp-wrap') as HTMLElement | null)?.clientWidth ?? 9999 : 9999;
  const parentH = typeof window !== 'undefined' ? (document.querySelector('.fp-wrap') as HTMLElement | null)?.clientHeight ?? 9999 : 9999;
  const flipX = position.x + OFFSET + TOOLTIP_W > parentW - 12;
  const flipY = position.y + OFFSET + TOOLTIP_H_APPROX > parentH - 12;

  const left = flipX ? Math.max(12, position.x - TOOLTIP_W - OFFSET) : position.x + OFFSET;
  const top = flipY ? Math.max(12, position.y - TOOLTIP_H_APPROX - OFFSET) : position.y + OFFSET;

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: TOOLTIP_W,
        zIndex: 20,
        pointerEvents: 'none',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          background: '#FFFFFF',
          border: '1px solid #EBEBEB',
          boxShadow: '0 24px 60px -12px rgba(0,0,0,0.25), 0 8px 20px -8px rgba(0,0,0,0.1)',
          backdropFilter: 'saturate(180%) blur(10px)',
          WebkitBackdropFilter: 'saturate(180%) blur(10px)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '14px 16px 12px',
            borderBottom: '1px solid #F0F0F0',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 16,
                fontWeight: 500,
                color: '#0F0F0F',
                letterSpacing: '-0.01em',
                lineHeight: 1.15,
              }}
            >
              {apartment.name}
            </p>
            <p style={{ fontSize: 11, color: '#909090', marginTop: 3, letterSpacing: '0.04em' }}>
              {apartment.type} · Floor {apartment.floor}
            </p>
          </div>
          <span
            style={{
              padding: '3px 10px',
              borderRadius: 999,
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: status.bg,
              color: '#FFFFFF',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {status.label}
          </span>
        </div>

        {/* Specs row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: '#F0F0F0',
          }}
        >
          {[
            { icon: Ruler, val: `${apartment.area}m²`, label: tA('area') },
            { icon: BedDouble, val: String(apartment.rooms), label: tA('rooms') },
            { icon: Bath, val: String(apartment.bathrooms), label: tA('bathrooms') },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: '#FFFFFF',
                padding: '10px 8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <s.icon size={13} style={{ color: '#B8824F' }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0F0F0F' }}>{s.val}</span>
              <span style={{ fontSize: 9, color: '#909090', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '12px 16px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          {apartment.status !== 'sold' ? (
            <>
              <div>
                <p style={{ fontSize: 10, color: '#909090', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                  {tA('price')}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 20,
                    fontWeight: 500,
                    color: '#0F0F0F',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    marginTop: 2,
                  }}
                >
                  {formatPrice(apartment.price, locale)}
                </p>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#B8824F',
                  letterSpacing: '0.04em',
                }}
              >
                Click <ArrowRight size={12} />
              </div>
            </>
          ) : (
            <p style={{ fontSize: 13, color: '#909090', fontStyle: 'italic' }}>This unit is no longer available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
