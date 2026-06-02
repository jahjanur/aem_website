'use client';

import dynamic from 'next/dynamic';
import PageHeader from '@/components/ui/PageHeader';

// Tour uses document/canvas APIs — load client-side only
const ApartmentTour = dynamic(
  () => import('@/components/three-viewer/ApartmentTour'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: '100%',
          height: 'min(85vh, 820px)',
          minHeight: 520,
          borderRadius: 28,
          background: 'radial-gradient(ellipse at center, #131e4d 0%, #0B1437 70%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#C8956C',
          fontSize: 11,
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
        }}
      >
        Preparing experience…
      </div>
    ),
  },
);

export default function TourPage() {
  return (
    <section
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF7F2 100%)',
        paddingTop: 120,
        paddingBottom: 160,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-page">
        <PageHeader
          eyebrow="360° Virtual Tour"
          title="Walk through the apartment"
          italicWord="apartment"
          description="Step inside a sample residence. Drag to look around, scroll to zoom, and click the glowing markers to travel between rooms."
        />
        <div style={{ marginTop: 40 }}>
          <ApartmentTour />
        </div>
      </div>
    </section>
  );
}
