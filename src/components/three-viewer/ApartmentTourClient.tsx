'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import type { TourScene } from '@/types';

function TourLoading() {
  const t = useTranslations('tour');
  return (
    <div
      style={{
        width: '100%',
        height: 'min(85vh, 820px)',
        minHeight: 520,
        borderRadius: 28,
        background: 'radial-gradient(ellipse at center, #2a1e10 0%, #171009 70%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.42)' }}>
          {t('poweredBy')}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/zulbera-white.svg" alt={t('zulberaLogoAlt')} style={{ width: 180, height: 'auto', opacity: 0.96 }} />
      </div>
      <span style={{ fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
        {t('loaderPreparing')}…
      </span>
    </div>
  );
}

// Tour uses document/canvas APIs — load client-side only.
const ApartmentTour = dynamic(() => import('./ApartmentTour'), {
  ssr: false,
  loading: () => <TourLoading />,
});

export default function ApartmentTourClient({
  scenes,
  title,
}: {
  scenes: TourScene[];
  title?: string;
}) {
  return <ApartmentTour scenes={scenes} title={title} />;
}
