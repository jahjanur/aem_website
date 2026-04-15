'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const navLinks = [
  { href: '/', key: 'home' },
  { href: '/explore', key: 'explore' },
  { href: '/apartments', key: 'apartments' },
  { href: '/gallery', key: 'gallery' },
  { href: '/location', key: 'location' },
  { href: '/contact', key: 'contact' },
] as const;

export default function Navbar() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const solid = scrolled || !isHome;

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'transparent',
        }}
      >
        <div className="container-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 84 }}>
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              zIndex: 10,
              padding: solid ? '10px 18px' : '0',
              borderRadius: 999,
              background: solid ? 'rgba(248, 243, 235, 0.92)' : 'transparent',
              border: solid ? '1px solid rgba(184, 130, 79, 0.2)' : '1px solid transparent',
              backdropFilter: solid ? 'blur(24px)' : 'none',
              WebkitBackdropFilter: solid ? 'blur(24px)' : 'none',
              boxShadow: solid ? '0 8px 32px -8px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          >
            <img
              src="/images/aem-logo-nav.svg"
              alt="AEM Residence"
              style={{
                height: 32,
                width: 'auto',
                filter: solid
                  ? // Dark warm brown when scrolled (readable on cream capsule)
                    'brightness(0) saturate(100%) invert(15%) sepia(18%) saturate(1200%) hue-rotate(2deg) brightness(95%)'
                  : // Cream when transparent over hero
                    'brightness(0) invert(1) sepia(0.2) saturate(1.3) hue-rotate(-10deg) brightness(1.05)',
                transition: 'filter 0.5s ease',
              }}
            />
          </Link>

          {/* Desktop nav pill */}
          <nav
            className="hidden lg:flex"
            style={{
              alignItems: 'center',
              gap: 2,
              padding: 6,
              borderRadius: 999,
              background: solid
                ? 'rgba(248, 243, 235, 0.92)'
                : 'rgba(255,255,255,0.08)',
              border: solid
                ? '1px solid rgba(184, 130, 79, 0.2)'
                : '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: solid ? '0 8px 32px -8px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.5s ease',
            }}
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: active ? 600 : 500,
                    background: active
                      ? solid
                        ? '#3A2A1A'
                        : '#FFFFFF'
                      : 'transparent',
                    color: active
                      ? solid
                        ? '#F8F3EB'
                        : '#0F0F0F'
                      : solid
                        ? '#5C4530'
                        : 'rgba(255,255,255,0.75)',
                    transition: 'all 0.35s ease',
                  }}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </nav>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <LanguageSwitcher variant={solid ? 'dark' : 'light'} />

            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center"
              style={{
                padding: '11px 24px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                background: solid ? 'rgba(248, 243, 235, 0.92)' : '#FFFFFF',
                color: solid ? '#3A2A1A' : '#0F0F0F',
                border: solid ? '1px solid rgba(184, 130, 79, 0.2)' : 'none',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow: solid ? '0 8px 32px -8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.2,0.8,0.2,1)',
              }}
            >
              {t('contact')}
            </Link>

            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              className="flex lg:hidden items-center justify-center"
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: open ? '#F5F5F5' : solid ? 'rgba(184,130,79,0.1)' : 'rgba(255,255,255,0.1)',
                color: open ? '#0F0F0F' : solid ? '#0F0F0F' : '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 10,
                transition: 'all 0.3s ease',
              }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 45,
            background: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                fontSize: 32,
                fontWeight: 600,
                padding: '10px 0',
                color: pathname === link.href ? '#B8824F' : '#0F0F0F',
                letterSpacing: '-0.02em',
                animation: `fadeUp 0.5s ease-out ${i * 0.05}s both`,
              }}
            >
              {t(link.key)}
            </Link>
          ))}
          <div style={{ width: 48, height: 1, background: '#EBEBEB', margin: '24px 0' }} />
          <img src="/images/aem-logo.svg" alt="AEM" style={{ width: 80, filter: 'brightness(0)', opacity: 0.3 }} />
        </div>
      )}
    </>
  );
}
