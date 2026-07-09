import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getApartmentById } from '@/data/apartments';
import { Link } from '@/i18n/navigation';
import ApartmentTourClient from '@/components/three-viewer/ApartmentTourClient';
import OpenTourButton from '@/components/three-viewer/OpenTourButton';
import ApartmentPlans from '@/components/apartment/ApartmentPlans';
import {
  ArrowLeft,
  Ruler,
  BedDouble,
  Bath,
  Wind,
  Check,
  Mail,
  Compass,
  Sun,
  Building2,
  MapPin,
} from 'lucide-react';

const STATUS_DOT: Record<string, string> = {
  available: '#3ECF8E',
  reserved: '#F5B14C',
  sold: '#F0685E',
};

const COPPER = '#C8956C';

const SUBLABEL: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: '#B8824F',
  marginBottom: 16,
};

export default async function ApartmentPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const apartment = getApartmentById(id);
  if (!apartment) notFound();

  const t = await getTranslations('residencePage');

  const statusLabel: Record<string, string> = {
    available: t('statusAvailable'),
    reserved: t('statusReserved'),
    sold: t('statusSold'),
  };
  const status = { dot: STATUS_DOT[apartment.status], label: statusLabel[apartment.status] };
  const orientation = [t('orientationNorth'), t('orientationSouth'), t('orientationEast'), t('orientationWest')][apartment.number % 4];
  const floorLabel =
    apartment.floor === 6
      ? t('floorPenthouse')
      : apartment.floor >= 4
        ? t('floorHigh')
        : apartment.floor >= 2
          ? t('floorMid')
          : t('floorGround');
  const hasTour = apartment.tourScenes.length > 0;

  const stats = [
    { icon: Ruler, value: `${apartment.area}`, unit: 'm²', label: t('statLivingArea') },
    { icon: BedDouble, value: `${apartment.rooms}`, unit: '', label: apartment.rooms === 1 ? t('statBedroom') : t('statBedrooms') },
    { icon: Bath, value: `${apartment.bathrooms}`, unit: '', label: apartment.bathrooms === 1 ? t('statBathroom') : t('statBathrooms') },
    { icon: Wind, value: `${apartment.balconies}`, unit: '', label: apartment.balconies === 1 ? t('statBalcony') : t('statBalconies') },
  ];

  const highlights = [
    { icon: Compass, label: t('highlightAspect', { orientation }) },
    { icon: Sun, label: t('highlightNaturalLight') },
    { icon: Building2, label: floorLabel },
    { icon: MapPin, label: t('highlightCityCentre') },
  ];

  // Living-room panorama drives the hero background (falls back to first scene).
  const livingScene = apartment.tourScenes.find((s) => s.id === 'living') ?? apartment.tourScenes[0];
  const heroPano = livingScene?.image;

  return (
    <section style={{ background: '#F8F3EB' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
        {/* Clear the fixed navbar */}
        <div style={{ height: 96 }} />

        {/* ── HERO — panning living-room panorama with data overlaid ── */}
        <div
          style={{
            position: 'relative',
            borderRadius: 34,
            overflow: 'hidden',
            minHeight: 540,
            height: 'min(84vh, 800px)',
            display: 'flex',
            background: 'linear-gradient(155deg, #241a0e 0%, #16110a 58%, #0f0b06 100%)',
            boxShadow: '0 40px 90px -50px rgba(26,18,8,0.7)',
          }}
        >
          {heroPano ? (
            <div
              className="pano-hero-bg"
              aria-hidden
              style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroPano})` }}
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                top: -140,
                right: -100,
                width: 460,
                height: 460,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(200,149,108,0.20), transparent 66%)',
                filter: 'blur(70px)',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Legibility scrim */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(14,10,5,0.94) 6%, rgba(14,10,5,0.6) 40%, rgba(14,10,5,0.28) 78%, rgba(14,10,5,0.35) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Content */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(28px, 4.5vw, 60px)',
            }}
          >
            {/* top group */}
            <div>
              {/* top line: back link (left) + status / type pills (right) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 26 }}>
                <Link
                  href="/apartments"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: 'rgba(248,243,235,0.82)',
                    letterSpacing: '0.04em',
                    textShadow: '0 2px 10px rgba(0,0,0,0.55)',
                  }}
                >
                  <ArrowLeft size={16} /> {t('backAllResidences')}
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, color: '#F8F3EB', padding: '7px 13px', borderRadius: 999, background: 'rgba(20,14,8,0.5)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: status.dot, boxShadow: `0 0 10px ${status.dot}` }} />
                    {status.label}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#F8F3EB', padding: '7px 13px', borderRadius: 999, background: 'rgba(20,14,8,0.5)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)', letterSpacing: '0.04em' }}>
                    {t('eyebrowTypeFloor', { type: apartment.type, floor: apartment.floor })}
                  </span>
                </div>
              </div>

              {/* collection eyebrow on its own line */}
              <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: COPPER, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
                {apartment.number === 3 ? t('collectionFlagship') : t('collectionEyebrow')}
              </span>
            </div>

            {/* bottom block */}
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(52px, 8vw, 100px)',
                  fontWeight: 400,
                  lineHeight: 0.95,
                  letterSpacing: '-0.035em',
                  color: '#F8F3EB',
                  textShadow: '0 4px 30px rgba(0,0,0,0.4)',
                }}
              >
                {apartment.name}
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(248,243,235,0.82)', maxWidth: 620, marginTop: 20, textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}>
                {apartment.description}
              </p>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.14)', margin: 'clamp(26px, 3vw, 40px) 0' }} />

              {/* stats */}
              <div style={{ display: 'flex', gap: 'clamp(26px, 4vw, 56px)', flexWrap: 'wrap' }}>
                {stats.map((s) => (
                  <div key={s.label}>
                    <s.icon size={17} style={{ color: COPPER, marginBottom: 10 }} />
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 500, color: '#F8F3EB', letterSpacing: '-0.02em', lineHeight: 1, textShadow: '0 2px 14px rgba(0,0,0,0.5)' }}>
                      {s.value}
                      <span style={{ fontSize: 15, marginLeft: 3, color: 'rgba(248,243,235,0.6)' }}>{s.unit}</span>
                    </p>
                    <p style={{ fontSize: 12, color: 'rgba(248,243,235,0.6)', marginTop: 7, letterSpacing: '0.03em' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ marginTop: 'clamp(26px, 3vw, 38px)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    padding: '16px 30px', fontSize: 14, fontWeight: 600, borderRadius: 14,
                    background: `linear-gradient(135deg, ${COPPER} 0%, #a47350 100%)`, color: '#FFFFFF',
                    boxShadow: '0 14px 34px -12px rgba(200,149,108,0.7)',
                  }}
                >
                  <Mail size={16} /> {t('enquireAbout', { name: apartment.name })}
                </Link>
                {hasTour && <OpenTourButton />}
              </div>
            </div>
          </div>
        </div>

        {/* ── OVERVIEW: room breakdown + features + highlights ── */}
        <div style={{ marginTop: 'clamp(56px, 7vw, 88px)' }}>
          <SectionHead eyebrow={t('overviewEyebrow')} title={t('overviewTitle')} />
          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] items-start">
            {/* Room breakdown */}
            <div>
              <p style={SUBLABEL}>{t('roomBreakdownLabel')}</p>
              <div style={{ border: '1px solid rgba(184,130,79,0.18)', borderRadius: 20, overflow: 'hidden' }}>
                {apartment.roomBreakdown.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '14px 20px',
                      fontSize: 14,
                      color: '#1A1208',
                      background: i % 2 ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.85)',
                      borderBottom: '1px solid rgba(184,130,79,0.1)',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span style={{ fontWeight: 500 }}>{r.nameEn}</span>
                      <span style={{ fontSize: 11, color: '#A08A72' }}>{r.name}</span>
                    </div>
                    <span style={{ fontVariantNumeric: 'tabular-nums', color: '#6B5340', fontWeight: 600 }}>{r.area.toFixed(2)} m²</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px', fontSize: 14, fontWeight: 700, color: '#1A1208', background: 'rgba(184,130,79,0.12)' }}>
                  <span>{t('totalArea')}</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>{apartment.area} m²</span>
                </div>
              </div>
            </div>

            {/* Features + Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              <div>
                <p style={SUBLABEL}>{t('featuresLabel')}</p>
                <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10, listStyle: 'none' }}>
                  {apartment.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '13px 15px', borderRadius: 12,
                        background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(184,130,79,0.15)',
                        fontSize: 13.5, color: '#1A1208',
                      }}
                    >
                      <Check size={14} style={{ color: '#B8824F', flexShrink: 0 }} /> <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p style={SUBLABEL}>{t('highlightsLabel')}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {highlights.map((h) => (
                    <div
                      key={h.label}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14,
                        padding: '15px 18px', borderRadius: 12,
                        background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(184,130,79,0.15)',
                        fontSize: 14, color: '#1A1208',
                      }}
                    >
                      <h.icon size={17} style={{ color: '#B8824F', flexShrink: 0 }} /> <span>{h.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── THE LAYOUT: 3D render + floor plan (tabbed) ── */}
        {(apartment.featuredImage || apartment.floorPlan) && (
          <div style={{ marginTop: 'clamp(56px, 7vw, 88px)' }}>
            <SectionHead eyebrow={t('layoutEyebrow')} title={t('layoutTitle')} />
            <ApartmentPlans featured={apartment.featuredImage} floorPlan={apartment.floorPlan} name={apartment.name} />
          </div>
        )}

        {/* ── 360 TOUR (at the end) ── */}
        {hasTour && (
          <div id="tour" style={{ scrollMarginTop: 100, marginTop: 'clamp(56px, 7vw, 88px)' }}>
            <SectionHead eyebrow={t('tourEyebrow')} title={t('tourTitle')} />
            <ApartmentTourClient scenes={apartment.tourScenes} title={apartment.name} />
          </div>
        )}

        {/* Contact CTA intentionally omitted — the hero has "Enquire about {name}"
           and the global footer already carries a "Get in touch" call to action. */}
        <div style={{ height: 'clamp(56px, 8vw, 96px)' }} />
      </div>
    </section>
  );
}

/* Editorial section heading — copper eyebrow + serif title */
function SectionHead({ eyebrow, title, small }: { eyebrow: string; title: string; small?: boolean }) {
  return (
    <div style={{ marginBottom: small ? 20 : 28 }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8824F', marginBottom: 10 }}>
        {eyebrow}
      </p>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: small ? 'clamp(22px, 3vw, 28px)' : 'clamp(28px, 4vw, 40px)',
          fontWeight: 400,
          color: '#1A1208',
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
        }}
      >
        {title}
      </h2>
    </div>
  );
}
