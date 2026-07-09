'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Phone } from 'lucide-react';

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
            marginBottom: 64,
          }}
        >
          {/* copper ambient glow */}
          <div
            style={{
              position: 'absolute',
              top: -130,
              right: -90,
              width: 440,
              height: 440,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(200,149,108,0.22), transparent 66%)',
              filter: 'blur(75px)',
              pointerEvents: 'none',
            }}
          />
          {/* fine top hairline */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 'clamp(36px, 5vw, 66px)',
              right: 'clamp(36px, 5vw, 66px)',
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(200,149,108,0.5), transparent)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 44,
              flexWrap: 'wrap',
            }}
          >
            {/* Text */}
            <div style={{ maxWidth: 560 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: '#C8956C',
                  marginBottom: 20,
                }}
              >
                Visit Us
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(30px, 4vw, 52px)',
                  fontWeight: 400,
                  color: '#F8F3EB',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.02,
                }}
              >
                Visit our office and get{' '}
                <span style={{ color: '#C8956C', fontStyle: 'italic' }}>more details.</span>
              </h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.7, color: 'rgba(248,243,235,0.6)', marginTop: 18, maxWidth: 480 }}>
                Stop by to explore every residence, floor plan, and availability with our team in person — or reach us directly.
              </p>
            </div>

            {/* Actions — button + phone side by side */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  padding: '18px 36px',
                  borderRadius: 14,
                  background: 'linear-gradient(135deg, #C8956C 0%, #a47350 100%)',
                  color: '#FFFFFF',
                  fontSize: 14.5,
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 18px 44px -14px rgba(200,149,108,0.75)',
                }}
              >
                Get in touch <ArrowRight size={17} />
              </Link>
              <a
                href="tel:+38976239552"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'rgba(248,243,235,0.85)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                <Phone size={15} style={{ color: '#C8956C' }} /> +389 76 239 552
              </a>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 48,
            paddingBottom: 48,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Brand */}
          <div style={{ flex: '1 1 280px', maxWidth: 360 }}>
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

          {/* Link columns */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px 64px' }}>
          {/* Pages */}
          <div style={{ minWidth: 120 }}>
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
              {(['home', 'apartments', 'gallery'] as const).map((key) => (
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
          <div style={{ minWidth: 170 }}>
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
              <a href="tel:+38976239551">+389 76 239 551</a>
              <a href="tel:+38976239552">+389 76 239 552</a>
              <a href="tel:+38976239554">+389 76 239 554</a>
              <a href="mailto:mirko@aem-residence.com">mirko@aem-residence.com</a>
              <p>Gostivar, N. Macedonia</p>
            </div>
          </div>

          {/* Hours */}
          <div style={{ minWidth: 150 }}>
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
                ['Mon — Sat', '09 — 18'],
                ['Sunday', 'Closed'],
              ].map(([d, h]) => (
                <div key={d} style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>{d}</span>
                  <span style={{ color: h === 'Closed' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)' }}>{h}</span>
                </div>
              ))}
            </div>
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
              Powered by
            </span>
            <img src="/zulbera-white.svg" alt="Zulbera" style={{ height: 22, width: 'auto', opacity: 0.75 }} />
          </div>
          <div style={{ display: 'flex', gap: 24, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
            <a href="#">{t('privacy')}</a>
            <a href="#">{t('terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
