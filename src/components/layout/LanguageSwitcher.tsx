'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';
import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';

const labels: Record<string, string> = { mk: 'MK', en: 'EN', de: 'DE', sq: 'SQ', tr: 'TR' };
const names: Record<string, string> = { mk: 'Македонски', en: 'English', de: 'Deutsch', sq: 'Shqip', tr: 'Türkçe' };

export default function LanguageSwitcher({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '11px 16px',
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 600,
          background: variant === 'light' ? 'rgba(255,255,255,0.08)' : 'rgba(248, 243, 235, 0.92)',
          border: variant === 'light' ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(184, 130, 79, 0.2)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: variant === 'light' ? 'none' : '0 8px 32px -8px rgba(0,0,0,0.08)',
          cursor: 'pointer',
          color: variant === 'light' ? 'rgba(255,255,255,0.85)' : '#3A2A1A',
          transition: 'all 0.4s ease',
        }}
      >
        <Globe size={14} />
        {labels[locale]}
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            marginTop: 8,
            background: '#FFFFFF',
            borderRadius: 16,
            border: '1px solid #EBEBEB',
            boxShadow: '0 20px 60px -15px rgba(0,0,0,0.15)',
            overflow: 'hidden',
            minWidth: 180,
            zIndex: 60,
          }}
        >
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => {
                router.replace(pathname, { locale: loc });
                setOpen(false);
              }}
              style={{
                width: '100%',
                padding: '12px 18px',
                textAlign: 'left',
                fontSize: 13,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: loc === locale ? '#F5F5F5' : 'transparent',
                color: loc === locale ? '#B8824F' : '#555',
                fontWeight: loc === locale ? 600 : 400,
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              <span>{names[loc]}</span>
              <span style={{ fontSize: 11, opacity: 0.4 }}>{labels[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
