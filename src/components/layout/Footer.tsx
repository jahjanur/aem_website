'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Phone, Mail, MapPin, Clock } from 'lucide-react';

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/aem.residence?igsh=N2o5bzI3N2VqZ3Jj',
    path: 'M12 2c-2.7 0-3 .01-4.07.06-1.06.05-1.79.22-2.42.46-.66.26-1.22.6-1.77 1.15-.55.55-.9 1.11-1.15 1.77-.24.63-.41 1.36-.46 2.42C2.01 9 2 9.3 2 12s.01 3 .06 4.07c.05 1.06.22 1.79.46 2.42.26.66.6 1.22 1.15 1.77.55.55 1.11.9 1.77 1.15.63.24 1.36.41 2.42.46 1.07.05 1.37.06 4.07.06s3-.01 4.07-.06c1.06-.05 1.79-.22 2.42-.46.66-.26 1.22-.6 1.77-1.15.55-.55.9-1.11 1.15-1.77.24-.63.41-1.36.46-2.42.05-1.07.06-1.37.06-4.07s-.01-3-.06-4.07c-.05-1.06-.22-1.79-.46-2.42a4.9 4.9 0 0 0-1.15-1.77 4.9 4.9 0 0 0-1.77-1.15c-.63-.24-1.36-.41-2.42-.46C15 2.01 14.7 2 12 2Zm0 1.8c2.67 0 2.98.01 4.03.06.97.05 1.5.2 1.86.34.46.18.8.4 1.15.74.34.34.56.68.74 1.15.14.35.3.89.34 1.86.05 1.05.06 1.36.06 4.03s-.01 2.98-.06 4.03c-.05.97-.2 1.5-.34 1.86-.18.46-.4.8-.74 1.15-.34.34-.68.56-1.15.74-.35.14-.89.3-1.86.34-1.05.05-1.36.06-4.03.06s-2.98-.01-4.03-.06c-.97-.05-1.5-.2-1.86-.34a3.1 3.1 0 0 1-1.15-.74 3.1 3.1 0 0 1-.74-1.15c-.14-.35-.3-.89-.34-1.86-.05-1.05-.06-1.36-.06-4.03s.01-2.98.06-4.03c.05-.97.2-1.5.34-1.86.18-.46.4-.8.74-1.15.34-.34.68-.56 1.15-.74.35-.14.89-.3 1.86-.34C9.02 3.81 9.33 3.8 12 3.8Zm0 3.06A5.13 5.13 0 1 0 17.13 12 5.14 5.14 0 0 0 12 6.86Zm0 8.47A3.33 3.33 0 1 1 15.33 12 3.34 3.34 0 0 1 12 15.33Zm5.34-8.67a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2Z',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61591719814034',
    path: 'M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@aemresidence?_r=1&_t=ZS-97tJB5NHomb',
    path: 'M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.08-.14 1.62.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z',
  },
];

const NAV_LINKS = [
  { key: 'home', href: '/' },
  { key: 'apartments', href: '/apartments' },
  { key: 'gallery', href: '/gallery' },
  { key: 'location', href: '/location' },
  { key: 'contact', href: '/contact' },
] as const;

const PHONES = ['+389 76 239 551', '+389 76 239 552', '+389 76 239 554'];
const COPPER = '#C8956C';

const COL_HEADING: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  color: 'rgba(200,149,108,0.85)',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  marginBottom: 20,
};

export default function Footer() {
  const t = useTranslations('footer');
  const tX = useTranslations('footerExtra');
  const nav = useTranslations('navigation');
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: '#0A0A0A', position: 'relative', overflow: 'hidden' }}>
      <div className="divider-gold" />

      {/* Ambient copper glows */}
      <div aria-hidden style={{ position: 'absolute', top: '-6%', right: '-6%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,149,108,0.10), transparent 68%)', filter: 'blur(90px)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '10%', left: '-8%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,130,79,0.07), transparent 70%)', filter: 'blur(90px)', pointerEvents: 'none' }} />

      <div className="container-page" style={{ position: 'relative', paddingTop: 80, paddingBottom: 0 }}>
        {/* ── CTA panel ── */}
        <div
          style={{
            position: 'relative',
            borderRadius: 30,
            overflow: 'hidden',
            background: 'linear-gradient(150deg, #2a1e12 0%, #17110a 55%, #100b06 100%)',
            border: '1px solid rgba(184,130,79,0.28)',
            padding: 'clamp(36px, 5vw, 66px)',
            boxShadow: '0 40px 90px -50px rgba(0,0,0,0.85)',
            marginBottom: 72,
          }}
        >
          <div aria-hidden style={{ position: 'absolute', top: -130, right: -90, width: 440, height: 440, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,149,108,0.22), transparent 66%)', filter: 'blur(75px)', pointerEvents: 'none' }} />
          <div aria-hidden style={{ position: 'absolute', top: 0, left: 'clamp(36px, 5vw, 66px)', right: 'clamp(36px, 5vw, 66px)', height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,149,108,0.5), transparent)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 44, flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 560 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: COPPER, marginBottom: 20 }}>
                {tX('ctaEyebrow')}
              </p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 400, color: '#F8F3EB', letterSpacing: '-0.03em', lineHeight: 1.02 }}>
                {tX('ctaHeadingLead')}{' '}
                <span style={{ color: COPPER, fontStyle: 'italic' }}>{tX('ctaHeadingEmphasis')}</span>
              </h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.7, color: 'rgba(248,243,235,0.6)', marginTop: 18, maxWidth: 480 }}>
                {tX('ctaDescription')}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <Link
                href="/contact"
                className="footer-cta-btn"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  padding: '18px 36px', borderRadius: 14,
                  background: 'linear-gradient(135deg, #C8956C 0%, #a47350 100%)',
                  color: '#FFFFFF', fontSize: 14.5, fontWeight: 600, letterSpacing: '0.01em',
                  whiteSpace: 'nowrap', boxShadow: '0 18px 44px -14px rgba(200,149,108,0.75)',
                }}
              >
                {tX('ctaButton')} <ArrowRight size={17} />
              </Link>
              <a href="tel:+38976239552" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 14, fontWeight: 600, color: 'rgba(248,243,235,0.85)', whiteSpace: 'nowrap' }}>
                <Phone size={15} style={{ color: COPPER }} /> +389 76 239 552
              </a>
            </div>
          </div>
        </div>

        {/* ── Main grid: brand + columns ── */}
        <div className="footer-grid">
          {/* Brand */}
          <div style={{ maxWidth: 320 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/aem-logo.svg" alt="AEM Residence" style={{ width: 92, height: 'auto', filter: 'brightness(0) invert(1)', marginBottom: 22 }} />
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.42)', maxWidth: 300, marginBottom: 24 }}>
              {tX('brandTagline')}
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="footer-social"
                  style={{
                    width: 40, height: 40, borderRadius: 12,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
                    color: 'rgba(255,255,255,0.6)', transition: 'all 0.3s ease',
                  }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <p style={COL_HEADING}>{tX('exploreHeading')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {NAV_LINKS.map((l) => (
                <Link key={l.key} href={l.href} className="footer-link" style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.5)', width: 'fit-content', transition: 'color 0.25s ease' }}>
                  {nav(l.key)}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={COL_HEADING}>{tX('contactHeading')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13.5 }}>
              {PHONES.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, color: 'rgba(255,255,255,0.5)', transition: 'color 0.25s ease' }}>
                  <Phone size={13} style={{ color: 'rgba(200,149,108,0.7)', flexShrink: 0 }} /> {p}
                </a>
              ))}
              <a href="mailto:mirko@aem-residence.com" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, color: 'rgba(255,255,255,0.5)', transition: 'color 0.25s ease' }}>
                <Mail size={13} style={{ color: 'rgba(200,149,108,0.7)', flexShrink: 0 }} /> mirko@aem-residence.com
              </a>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, color: 'rgba(255,255,255,0.5)' }}>
                <MapPin size={13} style={{ color: 'rgba(200,149,108,0.7)', flexShrink: 0 }} /> {tX('contactLocation')}
              </span>
            </div>
          </div>

          {/* Showroom */}
          <div>
            <p style={COL_HEADING}>{tX('showroomHeading')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13.5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, color: 'rgba(255,255,255,0.5)' }}>
                <Clock size={13} style={{ color: 'rgba(200,149,108,0.7)', flexShrink: 0 }} />
                <span>{tX('hoursWeekdaysLabel')}</span>
                <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.8)', fontVariantNumeric: 'tabular-nums' }}>09 — 18</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, color: 'rgba(255,255,255,0.5)', paddingLeft: 22 }}>
                <span>{tX('hoursSundayLabel')}</span>
                <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.28)' }}>{tX('hoursClosed')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginTop: 44, paddingTop: 26, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
            © {year} AEM Residence. {t('rights')}
          </span>
          <a href="https://zulbera.com" target="_blank" rel="noopener noreferrer" aria-label="Zulbera" className="footer-powered" style={{ display: 'inline-flex', alignItems: 'center', gap: 11, opacity: 0.85, transition: 'opacity 0.25s ease' }}>
            <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)' }}>
              {tX('poweredBy')}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/zulbera-white.svg" alt="Zulbera" style={{ height: 20, width: 'auto', opacity: 0.8 }} />
          </a>
          <div style={{ display: 'flex', gap: 24, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
            <a href="#" className="footer-link" style={{ transition: 'color 0.25s ease' }}>{t('privacy')}</a>
            <a href="#" className="footer-link" style={{ transition: 'color 0.25s ease' }}>{t('terms')}</a>
          </div>
        </div>

        {/* ── Oversized brand watermark (clipped by the footer edge) ── */}
        <div aria-hidden style={{ position: 'relative', height: 'clamp(58px, 11vw, 132px)', overflow: 'hidden', pointerEvents: 'none', marginTop: 24 }}>
          <span
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 'clamp(-34px, -4.5vw, -56px)',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(66px, 17vw, 240px)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: 'rgba(248,243,235,0.045)',
            }}
          >
            AEM Residence
          </span>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1.15fr 1fr;
          gap: 40px 48px;
          padding-bottom: 44px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        @media (max-width: 860px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .footer-grid > :first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr; gap: 32px; }
        }
        .footer-social:hover {
          background: linear-gradient(135deg, #C8956C, #a47350) !important;
          border-color: transparent !important;
          color: #fff !important;
          transform: translateY(-2px);
        }
        .footer-link:hover { color: #F8F3EB !important; }
        .footer-cta-btn:hover { filter: brightness(1.05); transform: translateY(-1px); }
        .footer-powered:hover { opacity: 1 !important; }
      `}</style>
    </footer>
  );
}
