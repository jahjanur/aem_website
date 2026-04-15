'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('navigation');

  return (
    <footer style={{ background: '#0A0A0A', position: 'relative', overflow: 'hidden' }}>
      {/* Accent line top */}
      <div className="divider-gold" />

      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '10%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,130,79,0.06), transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-page" style={{ position: 'relative', paddingTop: 80, paddingBottom: 32 }}>
        {/* CTA banner */}
        <div
          className="grid-footer-cta"
          style={{
            padding: '48px 0',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            marginBottom: 56,
          }}
        >
          <div>
            <h3
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: 12,
              }}
            >
              Start your new chapter<br />at AEM Residence
            </h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)' }}>
              Get in touch with our team for a private viewing.
            </p>
          </div>
          <Link href="/contact" className="btn btn-accent">
            Book a Viewing
          </Link>
        </div>

        {/* Main grid */}
        <div className="grid-footer" style={{ paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Brand */}
          <div>
            <img
              src="/images/aem-logo.svg"
              alt="AEM Residence"
              style={{
                width: 90,
                height: 'auto',
                filter: 'brightness(0) invert(1)',
                marginBottom: 20,
              }}
            />
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.4)',
                maxWidth: 280,
                marginBottom: 20,
              }}
            >
              Premium residential living with modern design and meticulous attention to every detail.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['IG', 'FB', 'IN'].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'rgba(184,130,79,0.9)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: 18,
              }}
            >
              Explore
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(['home', 'explore', 'apartments', 'gallery'] as const).map((key) => (
                <Link
                  key={key}
                  href={key === 'home' ? '/' : `/${key}`}
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}
                >
                  {nav(key)}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'rgba(184,130,79,0.9)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: 18,
              }}
            >
              Contact
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
              <a href="tel:+38970000000">+389 70 000 000</a>
              <a href="mailto:info@aem-residence.mk">info@aem-residence.mk</a>
              <p>Skopje, N. Macedonia</p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'rgba(184,130,79,0.9)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: 18,
              }}
            >
              Showroom
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
              {[
                ['Mon — Fri', '09 — 18'],
                ['Saturday', '10 — 15'],
                ['Sunday', 'Closed'],
              ].map(([d, h]) => (
                <div key={d} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>{d}</span>
                  <span style={{ color: h === 'Closed' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)' }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 28,
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
            &copy; {new Date().getFullYear()} AEM Residence. {t('rights')}.
          </p>
          <div style={{ display: 'flex', gap: 24, fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
            <a href="#">{t('privacy')}</a>
            <a href="#">{t('terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
