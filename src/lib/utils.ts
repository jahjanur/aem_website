import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number, locale: string = 'en'): string {
  const loc = locale === 'mk' ? 'mk-MK' : locale === 'de' ? 'de-DE' : locale === 'tr' ? 'tr-TR' : 'en-US';
  return new Intl.NumberFormat(loc, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'available': return 'bg-available';
    case 'reserved': return 'bg-reserved';
    case 'sold': return 'bg-sold';
    default: return 'bg-text-muted';
  }
}

export function getStatusOverlayClass(status: string): string {
  switch (status) {
    case 'available': return 'fill-transparent hover:fill-[rgba(34,197,94,0.3)] cursor-pointer';
    case 'reserved': return 'fill-[rgba(245,158,11,0.35)] hover:fill-[rgba(245,158,11,0.5)] cursor-pointer';
    case 'sold': return 'fill-[rgba(239,68,68,0.4)] hover:fill-[rgba(239,68,68,0.5)] cursor-not-allowed';
    default: return 'fill-transparent';
  }
}
