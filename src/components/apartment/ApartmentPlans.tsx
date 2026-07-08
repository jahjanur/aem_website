'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Box, Ruler } from 'lucide-react';
import ZoomableImage from '@/components/ui/ZoomableImage';

/**
 * A tabbed viewer that switches between the furnished 3D render and the
 * dimensioned floor plan. Both open a fullscreen lightbox on click.
 */
export default function ApartmentPlans({
  featured,
  floorPlan,
  name,
}: {
  featured?: string;
  floorPlan?: string;
  name: string;
}) {
  const t = useTranslations('plans');

  const tabs = [
    featured && { key: 'render', label: t('tabRenderLabel'), icon: Box, src: featured, alt: t('renderAlt', { name }), pad: 14 },
    floorPlan && { key: 'plan', label: t('tabPlanLabel'), icon: Ruler, src: floorPlan, alt: t('planAlt', { name }), pad: 18 },
  ].filter(Boolean) as { key: string; label: string; icon: typeof Box; src: string; alt: string; pad: number }[];

  const [active, setActive] = useState(0);
  if (tabs.length === 0) return null;
  const tab = tabs[Math.min(active, tabs.length - 1)];

  return (
    <div>
      {tabs.length > 1 && (
        <div
          style={{
            display: 'inline-flex',
            gap: 5,
            padding: 5,
            borderRadius: 14,
            background: 'rgba(184,130,79,0.1)',
            border: '1px solid rgba(184,130,79,0.2)',
            marginBottom: 22,
          }}
        >
          {tabs.map((t, i) => {
            const on = i === active;
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setActive(i)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                  background: on ? '#1A1208' : 'transparent',
                  color: on ? '#F8F3EB' : '#6B5340',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.25s ease, color 0.25s ease',
                  boxShadow: on ? '0 8px 20px -8px rgba(26,18,8,0.5)' : 'none',
                }}
              >
                <Icon size={15} /> {t.label}
              </button>
            );
          })}
        </div>
      )}

      <ZoomableImage key={tab.key} src={tab.src} alt={tab.alt} label={t('enlargeLabel')} pad={tab.pad} />
    </div>
  );
}
