'use client';

import { useTranslations } from 'next-intl';
import { Compass } from 'lucide-react';

/** Hero CTA that opens the 360° tour in fullscreen (dispatches to ApartmentTour). */
export default function OpenTourButton() {
  const t = useTranslations('tour');
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent('aem-open-tour'))}
      className="w-full sm:w-auto"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: '16px 28px',
        fontSize: 14,
        fontWeight: 600,
        borderRadius: 14,
        background: 'rgba(255,255,255,0.1)',
        color: '#F8F3EB',
        border: '1px solid rgba(255,255,255,0.2)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        cursor: 'pointer',
      }}
    >
      <Compass size={16} /> {t('openTourCta')}
    </button>
  );
}
