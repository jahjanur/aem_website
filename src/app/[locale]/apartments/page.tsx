'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { floors } from '@/data/apartments';
import { ApartmentStatus } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { BedDouble, Bath, Ruler, ArrowUpRight } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';

export default function ApartmentsPage() {
  const t = useTranslations('apartment');
  const tE = useTranslations('explore');
  const locale = useLocale();
  const [filterStatus, setFilterStatus] = useState<ApartmentStatus | 'all'>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const all = floors.flatMap((f) => f.apartments);
  const types = [...new Set(all.map((a) => a.type))];
  const filtered = all.filter(
    (a) =>
      (filterStatus === 'all' || a.status === filterStatus) &&
      (filterType === 'all' || a.type === filterType)
  );
  const sc: Record<string, string> = {
    available: '#10B981',
    reserved: '#F59E0B',
    sold: '#EF4444',
  };

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
        <PageHeader
          eyebrow="All Units"
          title="Premium apartments for every life"
          italicWord="life"
          description="Browse our curated collection of 48 luxury apartments across 6 floors. Use the filters to find your perfect match."
        />

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 8,
            marginBottom: 40,
            padding: 16,
            borderRadius: 20,
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(184, 130, 79, 0.15)',
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: '#8A6B4F',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginRight: 8,
              paddingLeft: 8,
            }}
          >
            Status
          </span>
          {(['all', 'available', 'reserved', 'sold'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              style={{
                padding: '10px 18px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                background: filterStatus === s ? '#1A1208' : 'transparent',
                color: filterStatus === s ? '#F8F3EB' : '#6B5340',
                border:
                  filterStatus === s
                    ? '1px solid rgba(184, 130, 79, 0.3)'
                    : '1px solid rgba(184, 130, 79, 0.15)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {s === 'all' ? 'All' : tE(s)}
            </button>
          ))}
          <div
            style={{
              width: 1,
              height: 24,
              background: 'rgba(184,130,79,0.2)',
              margin: '0 6px',
            }}
          />
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: '#8A6B4F',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginRight: 8,
            }}
          >
            Type
          </span>
          {['all', ...types].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              style={{
                padding: '10px 18px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                background: filterType === type ? '#B8824F' : 'transparent',
                color: filterType === type ? '#FFFFFF' : '#6B5340',
                border:
                  filterType === type
                    ? '1px solid rgba(184, 130, 79, 0.4)'
                    : '1px solid rgba(184, 130, 79, 0.15)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {type === 'all' ? 'All Types' : type}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 20,
          }}
        >
          {filtered.map((apt, i) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.03, duration: 0.6 }}
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
              }}
              className="group hover:!shadow-[0_30px_60px_-20px_rgba(58,30,10,0.15)]"
            >
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '16/10',
                  overflow: 'hidden',
                  background: '#F5EBE0',
                }}
              >
                <img
                  src={apt.floorPlanImage}
                  alt={apt.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.25,0.8,0.25,1)',
                  }}
                  className="group-hover:!scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 14,
                    left: 14,
                    right: 14,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      padding: '6px 12px',
                      borderRadius: 999,
                      fontSize: 10,
                      fontWeight: 700,
                      color: '#1A1208',
                      background: 'rgba(248, 243, 235, 0.95)',
                      backdropFilter: 'blur(8px)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {tE('floor')} {apt.floor}
                  </span>
                  <span
                    style={{
                      padding: '6px 12px',
                      borderRadius: 999,
                      fontSize: 10,
                      fontWeight: 700,
                      color: '#FFFFFF',
                      background: sc[apt.status],
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {tE(apt.status)}
                  </span>
                </div>
              </div>
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
                  {apt.status !== 'sold' ? (
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 22,
                        fontWeight: 500,
                        color: '#1A1208',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {formatPrice(apt.price, locale)}
                    </p>
                  ) : (
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#8A6B4F' }}>Sold</p>
                  )}
                  <Link
                    href="/explore"
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
                    Details <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p
            style={{
              textAlign: 'center',
              padding: '80px 0',
              fontSize: 15,
              color: '#8A6B4F',
            }}
          >
            No apartments match your criteria.
          </p>
        )}
      </div>
    </section>
  );
}
