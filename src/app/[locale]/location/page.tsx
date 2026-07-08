'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  MapPin,
  Car,
  GraduationCap,
  Trees,
  Utensils,
  Landmark,
  Hospital,
  Plane,
  Bus,
  Navigation,
  ExternalLink,
  Copy,
  Footprints,
} from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import { useState } from 'react';

const LAT = 41.795368050808776;
const LNG = 20.89475520673735;
const ADDRESS = 'AEM Residence, Gostivar, North Macedonia';

const nearby = [
  // Walkable (≤ 10 min on foot)
  { icon: Utensils, nameKey: 'poiRestaurants', distance: '6 min', typeKey: 'typeDining', unit: 'walk' },
  { icon: GraduationCap, nameKey: 'poiSchools', distance: '8 min', typeKey: 'typeEducation', unit: 'walk' },
  // A short drive away
  { icon: Trees, nameKey: 'poiCityPark', distance: '4 min', typeKey: 'typeRecreation', unit: 'drive' },
  { icon: Landmark, nameKey: 'poiClockTower', distance: '5 min', typeKey: 'typeLandmark', unit: 'drive' },
  { icon: Bus, nameKey: 'poiBusStation', distance: '5 min', typeKey: 'typeTransport', unit: 'drive' },
  { icon: Hospital, nameKey: 'poiHospital', distance: '5 min', typeKey: 'typeHealthcare', unit: 'drive' },
  { icon: Car, nameKey: 'poiHighway', distance: '6 min', typeKey: 'typeTransport', unit: 'drive' },
  { icon: Trees, nameKey: 'poiVrutok', distance: '10 min', typeKey: 'typeNature', unit: 'drive' },
  { icon: Trees, nameKey: 'poiMavrovo', distance: '30 min', typeKey: 'typeNature', unit: 'drive' },
  { icon: Plane, nameKey: 'poiAirport', distance: '55 min', typeKey: 'typeTransport', unit: 'drive' },
];

const BBOX = (() => {
  const dx = 0.0085; // ~940m each side
  const dy = 0.0055; // keep closer vertical zoom for 16:11 aspect
  return [LNG - dx, LAT - dy, LNG + dx, LAT + dy].join(',');
})();

const OSM_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik&marker=${LAT},${LNG}`;
const OSM_FULL = `https://www.openstreetmap.org/?mlat=${LAT}&mlon=${LNG}#map=17/${LAT}/${LNG}`;
const GOOGLE_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;

export default function LocationPage() {
  const t = useTranslations('location');
  const tp = useTranslations('locationPage');
  const [copied, setCopied] = useState(false);

  const copyCoords = async () => {
    await navigator.clipboard.writeText(`${LAT}, ${LNG}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF7F2 100%)',
        paddingBottom: 160,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div className="container-page">
        <PageHeader
          eyebrow={t('title')}
          title={tp.rich('heroTitle', {
            accent: (chunks) => <span style={{ color: '#B8824F', fontStyle: 'italic' }}>{chunks}</span>,
          })}
          description={tp('heroDescription')}
        />

        {/* Main grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.65fr) minmax(0, 1fr)',
            gap: 24,
            alignItems: 'start',
          }}
          className="loc-grid"
        >
          {/* Live map */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              position: 'relative',
              borderRadius: 24,
              overflow: 'hidden',
              border: '1px solid #EBEBEB',
              boxShadow: '0 30px 70px -20px rgba(0,0,0,0.18)',
              background: '#FFFFFF',
            }}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 11', background: '#F4EFE6' }}>
              <iframe
                title={tp('mapTitle')}
                src={OSM_EMBED}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                  filter: 'grayscale(1) contrast(0.88) brightness(1.04) sepia(0.18)',
                }}
                loading="lazy"
              />
              {/* Warm premium overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background:
                    'radial-gradient(circle at 50% 45%, transparent 0%, rgba(250,247,242,0.25) 70%, rgba(250,247,242,0.55) 100%)',
                  mixBlendMode: 'multiply',
                }}
              />
              {/* Subtle inner shadow for depth */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  boxShadow: 'inset 0 0 80px rgba(26,18,8,0.12)',
                }}
              />

              {/* Floating address card */}
              <div
                style={{
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  padding: '14px 18px',
                  borderRadius: 16,
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'saturate(180%) blur(12px)',
                  WebkitBackdropFilter: 'saturate(180%) blur(12px)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  maxWidth: 'calc(100% - 40px)',
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, #B8824F, #D4A878)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 6px 14px rgba(184,130,79,0.35)',
                  }}
                >
                  <MapPin size={18} color="#FFFFFF" />
                </div>
                <div style={{ minWidth: 0 }}>
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
                    {tp('addressCardName')}
                  </p>
                  <p style={{ fontSize: 11, color: '#909090', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>
                    {tp('addressCardRegion')}
                  </p>
                </div>
              </div>

              {/* Coordinates chip */}
              <button
                onClick={copyCoords}
                title={tp('copyCoordsTitle')}
                style={{
                  position: 'absolute',
                  bottom: 20,
                  right: 20,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 14px',
                  borderRadius: 12,
                  background: 'rgba(15,15,15,0.88)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#FFFFFF',
                  fontSize: 11,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                }}
              >
                <Copy size={12} />
                {copied ? tp('copied') : `${LAT.toFixed(5)}° N · ${LNG.toFixed(5)}° E`}
              </button>
            </div>

            {/* Action bar */}
            <div
              style={{
                display: 'flex',
                gap: 10,
                padding: '16px 20px',
                borderTop: '1px solid #EBEBEB',
                background: '#FFFFFF',
                flexWrap: 'wrap',
              }}
            >
              <a
                href={GOOGLE_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '11px 18px',
                  borderRadius: 12,
                  background: '#0F0F0F',
                  color: '#FFFFFF',
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'background 0.25s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#B8824F')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#0F0F0F')}
              >
                <Navigation size={14} /> {tp('getDirections')}
              </a>
              <a
                href={OSM_FULL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '11px 18px',
                  borderRadius: 12,
                  background: '#FFFFFF',
                  color: '#0F0F0F',
                  border: '1px solid #D4D4D4',
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0F0F0F';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#D4D4D4';
                }}
              >
                <ExternalLink size={14} /> {tp('openInOsm')}
              </a>
              <div style={{ flex: 1 }} />
              <span style={{ alignSelf: 'center', fontSize: 12, color: '#909090' }}>{ADDRESS}</span>
            </div>
          </motion.div>

          {/* Nearby list */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              padding: 28,
              borderRadius: 24,
              background: '#FFFFFF',
              border: '1px solid #EBEBEB',
              boxShadow: '0 20px 50px -18px rgba(0,0,0,0.1)',
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#B8824F',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              {tp('neighbourhoodEyebrow')}
            </p>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 26,
                fontWeight: 400,
                color: '#0F0F0F',
                letterSpacing: '-0.02em',
                marginBottom: 22,
                lineHeight: 1.15,
              }}
            >
              {tp('whatsCloseByTitle')}
            </h3>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {nearby.map((p, i) => (
                <motion.li
                  key={p.nameKey}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.045, duration: 0.45 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '13px 12px',
                    margin: '0 -12px',
                    borderRadius: 14,
                    transition: 'background 0.25s ease',
                  }}
                  className="hover:!bg-[#FAF7F2]"
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: '#FAF7F2',
                      border: '1px solid #F0E7D9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <p.icon size={17} color="#B8824F" strokeWidth={2} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 15,
                        fontWeight: 500,
                        color: '#0F0F0F',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.2,
                      }}
                    >
                      {tp(p.nameKey)}
                    </p>
                    <p style={{ fontSize: 10.5, fontWeight: 600, color: '#A8A8A8', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 4 }}>
                      {tp(p.typeKey)}
                    </p>
                  </div>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 7,
                      padding: '7px 13px',
                      borderRadius: 999,
                      flexShrink: 0,
                      fontSize: 13,
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      background: p.unit === 'walk' ? 'rgba(16,185,129,0.1)' : 'rgba(184,130,79,0.1)',
                      border: `1px solid ${p.unit === 'walk' ? 'rgba(16,185,129,0.25)' : 'rgba(184,130,79,0.28)'}`,
                      color: p.unit === 'walk' ? '#0E9F6E' : '#B8824F',
                    }}
                  >
                    {p.unit === 'walk' ? <Footprints size={14} /> : <Car size={14} />}
                    {p.distance}
                  </span>
                </motion.li>
              ))}
            </ul>

            <div style={{ height: 1, background: '#EBEBEB', margin: '22px 0' }} />

            <p style={{ fontSize: 12, color: '#909090', lineHeight: 1.6 }}>
              {tp('distancesDisclaimer')}
            </p>
          </motion.aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .loc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
