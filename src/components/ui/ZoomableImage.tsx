'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Maximize2, X } from 'lucide-react';

/**
 * A framed image that opens a fullscreen lightbox on click.
 * Ideal for floor plans / renders where fine detail (dimensions) needs zooming.
 */
export default function ZoomableImage({
  src,
  alt,
  label,
  bg = '#FFFFFF',
  pad = 16,
}: {
  src: string;
  alt: string;
  label?: string;
  bg?: string;
  pad?: number;
}) {
  const t = useTranslations('common');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={`${label ?? 'Enlarge'} ${alt}`}
        style={{
          display: 'block',
          width: '100%',
          position: 'relative',
          borderRadius: 22,
          overflow: 'hidden',
          background: bg,
          border: '1px solid rgba(184,130,79,0.18)',
          padding: pad,
          cursor: 'zoom-in',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        className="group hover:!border-[rgba(184,130,79,0.4)] hover:!shadow-[0_24px_50px_-24px_rgba(58,30,10,0.25)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 10 }} />

        {/* Expand affordance */}
        <span
          className="opacity-70 group-hover:!opacity-100"
          style={{
            position: 'absolute',
            bottom: pad + 10,
            right: pad + 10,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            padding: '8px 13px',
            borderRadius: 999,
            background: 'rgba(20,16,10,0.82)',
            color: '#F8F3EB',
            fontSize: 10.5,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
          }}
        >
          <Maximize2 size={12} /> {label ?? 'Enlarge'}
        </span>
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(12,9,5,0.92)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(16px, 4vw, 56px)',
            cursor: 'zoom-out',
            animation: 'fadeUp 0.25s ease-out both',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '94vw',
              maxHeight: '90vh',
              width: 'auto',
              height: 'auto',
              borderRadius: 16,
              background: '#FFFFFF',
              padding: 'clamp(10px, 2vw, 22px)',
              boxShadow: '0 40px 120px -30px rgba(0,0,0,0.7)',
              cursor: 'default',
            }}
          />
          <button
            onClick={() => setOpen(false)}
            aria-label={t('close')}
            style={{
              position: 'fixed',
              top: 24,
              right: 24,
              width: 46,
              height: 46,
              borderRadius: 14,
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: '#F8F3EB',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <X size={20} />
          </button>
        </div>
      )}
    </>
  );
}
