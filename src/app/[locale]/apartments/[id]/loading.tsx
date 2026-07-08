import { getTranslations } from 'next-intl/server';

export default async function Loading() {
  const t = await getTranslations('residencePage');
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#F8F3EB',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 22,
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: '50%',
          border: '3px solid rgba(184,130,79,0.22)',
          borderTopColor: '#B8824F',
          animation: 'spin 0.85s linear infinite',
        }}
      />
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          color: '#B8824F',
        }}
      >
        {t('loadingResidence')}
      </p>
    </div>
  );
}
