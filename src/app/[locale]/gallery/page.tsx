'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';

const categories = [
  { key: 'editorial', labelKey: 'catEditorial', portrait: true },
  { key: 'exterior', labelKey: 'catExterior', portrait: false },
  { key: 'progress', labelKey: 'catProgress', portrait: false },
] as const;

type CatKey = (typeof categories)[number]['key'];

const images: Record<CatKey, { src: string; altKey: string }[]> = {
  editorial: [
    { src: '/gallery/finest-address.jpg', altKey: 'altFinestAddress' },
    { src: '/gallery/elegant-living.jpg', altKey: 'altElegantLiving' },
    { src: '/gallery/work-of-art.jpg', altKey: 'altWorkOfArt' },
    { src: '/gallery/modern-living.jpg', altKey: 'altModernLiving' },
    { src: '/gallery/designed-living-space.jpg', altKey: 'altDesignedLivingSpace' },
    { src: '/gallery/design-to-impress.jpg', altKey: 'altDesignToImpress' },
    { src: '/gallery/vision-realized.jpg', altKey: 'altVisionRealized' },
    { src: '/gallery/happiness-together.jpg', altKey: 'altHappinessTogether' },
    { src: '/gallery/every-brick.jpg', altKey: 'altEveryBrick' },
    { src: '/gallery/prestige.jpg', altKey: 'altPrestige' },
    { src: '/gallery/coming-soon.jpg', altKey: 'altComingSoon' },
    { src: '/gallery/aem-moment.jpg', altKey: 'altAemResidence' },
  ],
  exterior: [
    { src: '/renders/exterior-01.jpg', altKey: 'altCornerView' },
    { src: '/renders/exterior-02.jpg', altKey: 'altFrontFacade' },
    { src: '/renders/hero.png', altKey: 'altEveningAmbience' },
  ],
  progress: [],
};

export default function GalleryPage() {
  const t = useTranslations('gallery');
  const tp = useTranslations('galleryPage');
  const [active, setActive] = useState<CatKey>('editorial');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const currentImages = images[active];
  const portrait = categories.find((c) => c.key === active)?.portrait ?? false;

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
          eyebrow={t('title')}
          title={tp.rich('headerTitle', {
            accent: (chunks) => <span style={{ color: '#B8824F', fontStyle: 'italic' }}>{chunks}</span>,
          })}
          description={tp('headerDescription')}
        />

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{
            display: 'inline-flex',
            gap: 6,
            padding: 6,
            marginBottom: 40,
            borderRadius: 999,
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(184, 130, 79, 0.15)',
          }}
        >
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              style={{
                padding: '12px 24px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                background: active === c.key ? '#1A1208' : 'transparent',
                color: active === c.key ? '#F8F3EB' : '#6B5340',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.25,0.8,0.25,1)',
                letterSpacing: '0.02em',
              }}
            >
              {tp(c.labelKey)}
            </button>
          ))}
        </motion.div>

        {currentImages.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: portrait
                ? 'repeat(auto-fill, minmax(230px, 1fr))'
                : 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: 20,
            }}
          >
            <AnimatePresence mode="popLayout">
              {currentImages.map((img, i) => (
                <motion.div
                  key={`${active}-${img.src}`}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.05, duration: 0.55 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setLightbox(img.src)}
                  style={{
                    position: 'relative',
                    aspectRatio: portrait ? '4 / 5' : '4 / 3',
                    borderRadius: 20,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '1px solid rgba(184, 130, 79, 0.15)',
                    transition: 'box-shadow 0.5s ease',
                  }}
                  className="group hover:!shadow-[0_30px_60px_-20px_rgba(58,30,10,0.25)]"
                >
                  <img
                    src={img.src}
                    alt={tp(img.altKey)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.9s cubic-bezier(0.25,0.8,0.25,1)',
                    }}
                    className="group-hover:!scale-105"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(26,18,8,0.7) 0%, transparent 45%)',
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                    }}
                    className="group-hover:!opacity-100"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 20,
                      left: 20,
                      right: 20,
                      opacity: 0,
                      transform: 'translateY(10px)',
                      transition: 'all 0.4s cubic-bezier(0.25,0.8,0.25,1)',
                    }}
                    className="group-hover:!opacity-100 group-hover:!translate-y-0"
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 18,
                        fontWeight: 500,
                        color: '#F8F3EB',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {tp(img.altKey)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div
            style={{
              padding: '80px 0',
              textAlign: 'center',
              borderRadius: 24,
              border: '1px dashed rgba(184, 130, 79, 0.25)',
              background: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 20,
                color: '#8A6B4F',
                marginBottom: 8,
              }}
            >
              {tp('emptyComingSoon')}
            </p>
            <p style={{ fontSize: 13, color: '#A88A6F' }}>
              {tp('emptyProgressNote')}
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'rgba(10, 6, 2, 0.95)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 40,
              cursor: 'pointer',
            }}
          >
            <button
              style={{
                position: 'absolute',
                top: 28,
                right: 28,
                width: 44,
                height: 44,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(248, 243, 235, 0.1)',
                border: '1px solid rgba(248, 243, 235, 0.15)',
                color: '#F8F3EB',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={lightbox}
              alt=""
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: 16,
                boxShadow: '0 60px 120px -30px rgba(0, 0, 0, 0.8)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
