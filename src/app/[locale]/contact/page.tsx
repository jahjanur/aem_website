'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Phone, Mail, MapPin, Check } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import { apartmentTypes } from '@/data/apartments';

// The platform's primary WhatsApp line (first contact number), digits only.
const WHATSAPP_NUMBER = '38976239552';

export default function ContactPage() {
  const t = useTranslations('contact');
  const tp = useTranslations('contactPage');
  const [submitted, setSubmitted] = useState(false);

  // Each unit shown as "Name · 80.04 m²" (name + size), not "Apartment 1".
  const apartmentOptions = apartmentTypes.map((a) => `${a.name} · ${a.area} m²`);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      tp('whatsappIntro'),
      '',
      `${t('name')}: ${data.get('name') || '—'}`,
      `${t('email')}: ${data.get('email') || '—'}`,
      `${t('phone')}: ${data.get('phone') || '—'}`,
      `${t('apartment')}: ${data.get('apartment') || '—'}`,
      `${t('message')}: ${data.get('message') || '—'}`,
    ];
    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

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
          eyebrow={tp('eyebrow')}
          title={tp.rich('title', {
            accent: (chunks) => <span style={{ color: '#B8824F', fontStyle: 'italic' }}>{chunks}</span>,
          })}
          description={tp('headerDescription')}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 24,
            alignItems: 'start',
          }}
          className="lg:!grid-cols-[1.3fr_1fr]"
        >
          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            style={{
              padding: 40,
              borderRadius: 24,
              background: 'rgba(255, 255, 255, 0.65)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(184, 130, 79, 0.15)',
              boxShadow: '0 24px 48px -20px rgba(58, 30, 10, 0.1)',
            }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
                style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.4)',
                  }}
                >
                  <Check size={32} strokeWidth={3} style={{ color: '#FFFFFF' }} />
                </motion.div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 32,
                    fontWeight: 500,
                    color: '#1A1208',
                    letterSpacing: '-0.02em',
                    marginBottom: 10,
                  }}
                >
                  {tp('messageSent')}
                </h3>
                <p style={{ fontSize: 15, color: '#6B5340', maxWidth: 380, margin: '0 auto' }}>
                  {tp('successFollowUp')}
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <FormField name="name" placeholder={t('name')} type="text" required />
                  <FormField name="email" placeholder={t('email')} type="email" required />
                </div>
                <FormField name="phone" placeholder={t('phone')} type="tel" />
                <FormField
                  name="apartment"
                  placeholder={t('apartment')}
                  type="select"
                  options={apartmentOptions}
                />
                <FormField name="message" placeholder={t('message')} type="textarea" required />
                <button
                  type="submit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    padding: '18px 32px',
                    borderRadius: 999,
                    background: 'linear-gradient(135deg, #1A1208 0%, #3A2A1A 100%)',
                    color: '#F8F3EB',
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    border: '1px solid rgba(184, 130, 79, 0.3)',
                    cursor: 'pointer',
                    marginTop: 10,
                    transition: 'all 0.4s cubic-bezier(0.25,0.8,0.25,1)',
                    boxShadow: '0 16px 32px -12px rgba(26, 18, 8, 0.3)',
                  }}
                  className="hover:!-translate-y-0.5 hover:!shadow-[0_20px_40px_-12px_rgba(184,130,79,0.5)]"
                >
                  {t('send')} <ArrowUpRight size={16} />
                </button>
              </form>
            )}
          </motion.div>

          {/* Right — info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: Phone, label: tp('phoneLabel'), value: '+389 76 239 551', href: 'tel:+38976239551' },
              { icon: Phone, label: tp('phoneLabel'), value: '+389 76 239 552', href: 'tel:+38976239552' },
              { icon: Phone, label: tp('phoneLabel'), value: '+389 76 239 554', href: 'tel:+38976239554' },
              { icon: Mail, label: tp('emailLabel'), value: 'sales@aem-residence.com', href: 'mailto:sales@aem-residence.com' },
              { icon: MapPin, label: tp('locationLabel'), value: tp('locationValue') },
            ].map((item, i) => (
              <motion.a
                key={item.value}
                href={'href' in item ? item.href : undefined}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                whileHover={{ x: -4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                  padding: 22,
                  borderRadius: 20,
                  background: 'rgba(255, 255, 255, 0.55)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(184, 130, 79, 0.15)',
                  cursor: 'href' in item && item.href ? 'pointer' : 'default',
                  transition: 'all 0.4s cubic-bezier(0.25,0.8,0.25,1)',
                }}
                className="group hover:!shadow-[0_16px_32px_-12px_rgba(58,30,10,0.1)]"
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: 'linear-gradient(135deg, #F5EBE0, #EAD8C2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 6px 14px -4px rgba(184, 130, 79, 0.3)',
                  }}
                >
                  <item.icon size={18} style={{ color: '#8B5E35' }} strokeWidth={2} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: '#B8824F',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 16,
                      fontWeight: 500,
                      color: '#1A1208',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {item.value}
                  </p>
                </div>
                {'href' in item && item.href && (
                  <ArrowUpRight
                    size={16}
                    style={{
                      color: '#B8824F',
                      transition: 'transform 0.3s ease',
                    }}
                    className="group-hover:!-translate-y-1 group-hover:!translate-x-1"
                  />
                )}
              </motion.a>
            ))}

            {/* Hours card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              style={{
                padding: 28,
                borderRadius: 20,
                background: 'linear-gradient(135deg, #1A1208 0%, #3A2A1A 100%)',
                border: '1px solid rgba(184, 130, 79, 0.25)',
                boxShadow: '0 20px 40px -16px rgba(26, 18, 8, 0.3)',
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#D4A878',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                }}
              >
                {tp('showroomHours')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  [tp('hoursMonFri'), '09 — 18'],
                  [tp('hoursSaturday'), '10 — 15'],
                  [tp('hoursSunday'), tp('closed')],
                ].map(([d, h]) => (
                  <div
                    key={d}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 14,
                    }}
                  >
                    <span style={{ color: 'rgba(248, 243, 235, 0.55)' }}>{d}</span>
                    <span
                      style={{
                        color: h === tp('closed') ? 'rgba(248, 243, 235, 0.3)' : '#F8F3EB',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 500,
                      }}
                    >
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  name,
  placeholder,
  type,
  required,
  options,
}: {
  name: string;
  placeholder: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required?: boolean;
  options?: string[];
}) {
  const baseStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px 20px',
    background: 'rgba(255, 255, 255, 0.6)',
    border: '1px solid rgba(184, 130, 79, 0.2)',
    borderRadius: 14,
    fontSize: 14,
    fontFamily: 'inherit',
    color: '#1A1208',
    outline: 'none',
    transition: 'all 0.3s ease',
  };

  if (type === 'textarea') {
    return (
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        rows={5}
        style={{ ...baseStyle, resize: 'none' }}
      />
    );
  }
  if (type === 'select') {
    return (
      <select name={name} defaultValue="" style={{ ...baseStyle, cursor: 'pointer' }}>
        <option value="">{placeholder}</option>
        {options?.map((label, i) => (
          <option key={i} value={label}>
            {label}
          </option>
        ))}
      </select>
    );
  }
  return <input name={name} type={type} placeholder={placeholder} required={required} style={baseStyle} />;
}
