'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SOCIALS } from '@/data/socials';

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
              <a href="mailto:sales@aem-residence.com" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, color: 'rgba(255,255,255,0.5)', transition: 'color 0.25s ease' }}>
                <Mail size={13} style={{ color: 'rgba(200,149,108,0.7)', flexShrink: 0 }} /> sales@aem-residence.com
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

        {/* ── Full-width brand wordmark — stretched edge-to-edge for a cinematic sign-off ── */}
        <div
          aria-hidden
          style={{
            marginTop: 'clamp(26px, 4vw, 48px)',
            paddingBottom: 'clamp(8px, 1.6vw, 20px)',
            pointerEvents: 'none',
          }}
        >
          <svg
            viewBox="0 0 1000 132"
            width="100%"
            preserveAspectRatio="xMidYMid meet"
            style={{ display: 'block', overflow: 'visible' }}
          >
            <text
              x="500"
              y="112"
              textAnchor="middle"
              textLength="992"
              lengthAdjust="spacingAndGlyphs"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: '150px',
                letterSpacing: '-0.01em',
                fill: 'rgba(248,243,235,0.10)',
              }}
            >
              AEM Residence
            </text>
          </svg>
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
        /* Balanced mobile layout: brand full, Explore | Contact paired
           (equal height, both sides fill), Showroom full-width below. */
        @media (max-width: 820px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px 30px; }
          .footer-grid > :nth-child(1) { grid-column: 1 / -1; }            /* brand */
          .footer-grid > :nth-child(2) { grid-column: 1; grid-row: 2; }     /* explore */
          .footer-grid > :nth-child(3) { grid-column: 2; grid-row: 2; }     /* contact */
          .footer-grid > :nth-child(4) { grid-column: 1 / -1; grid-row: 3; } /* showroom */
        }
        @media (max-width: 380px) {
          .footer-grid { grid-template-columns: 1fr; gap: 30px; }
          .footer-grid > :nth-child(2),
          .footer-grid > :nth-child(3),
          .footer-grid > :nth-child(4) { grid-column: 1 / -1; grid-row: auto; }
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
