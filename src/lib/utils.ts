import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function metersToFeet(m: number | null): string {
  if (m === null) return 'N/A';
  const feet = Math.round(m * 3.28084);
  return feet.toLocaleString();
}

export function msToKnots(ms: number | null): string {
  if (ms === null) return 'N/A';
  const knots = Math.round(ms * 1.94384);
  return knots.toLocaleString();
}

export function headingToCompass(deg: number | null): string {
  if (deg === null) return 'N/A';
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
  const index = Math.round(deg / 22.5) % 16;
  return `${Math.round(deg)}° ${directions[index]}`;
}

export function formatAltitude(m: number | null, onGround: boolean): string {
  if (onGround) return 'Ground';
  if (m === null) return 'N/A';
  return `${metersToFeet(m)} ft`;
}

export function formatSpeed(ms: number | null): string {
  if (ms === null) return 'N/A';
  return `${msToKnots(ms)} kts`;
}

export function formatLastContact(unix: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - unix;
  
  if (diff < 60) {
    return `${diff} second${diff !== 1 ? 's' : ''} ago`;
  } else if (diff < 3600) {
    const mins = Math.floor(diff / 60);
    return `${mins} min${mins !== 1 ? 's' : ''} ago`;
  } else {
    const hours = Math.floor(diff / 3600);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  }
}

const countryFlags: Record<string, string> = {
  'United States': '🇺🇸',
  'China': '🇨🇳',
  'United Kingdom': '🇬🇧',
  'Germany': '🇩🇪',
  'France': '🇫🇷',
  'Japan': '🇯🇵',
  'India': '🇮🇳',
  'Italy': '🇮🇹',
  'Brazil': '🇧🇷',
  'Canada': '🇨🇦',
  'Russia': '🇷🇺',
  'South Korea': '🇰🇷',
  'Spain': '🇪🇸',
  'Australia': '🇦🇺',
  'Mexico': '🇲🇽',
  'Indonesia': '🇮🇩',
  'Netherlands': '🇳🇱',
  'Saudi Arabia': '🇸🇦',
  'Turkey': '🇹🇷',
  'Switzerland': '🇨🇭',
  'Poland': '🇵🇱',
  'Sweden': '🇸🇪',
  'Belgium': '🇧🇪',
  'Argentina': '🇦🇷',
  'Thailand': '🇹🇭',
  'Austria': '🇦🇹',
  'Norway': '🇳🇴',
  'United Arab Emirates': '🇦🇪',
  'Israel': '🇮🇱',
  'Singapore': '🇸🇬',
  'Malaysia': '🇲🇾',
  'Ireland': '🇮🇪',
  'South Africa': '🇿🇦',
  'Philippines': '🇵🇭',
  'Denmark': '🇩🇰',
  'Hong Kong': '🇭🇰',
  'Colombia': '🇨🇴',
  'Vietnam': '🇻🇳',
  'Chile': '🇨🇱',
  'Finland': '🇫🇮',
  'Bangladesh': '🇧🇩',
  'Czech Republic': '🇨🇿',
  'Romania': '🇷🇴',
  'New Zealand': '🇳🇿',
  'Portugal': '🇵🇹',
  'Pakistan': '🇵🇰',
  'Greece': '🇬🇷',
  'Iraq': '🇮🇶',
  'Qatar': '🇶🇦',
  'Kazakhstan': '🇰🇿',
  'Hungary': '🇭🇺',
  'Algeria': '🇩🇿',
  'Kuwait': '🇰🇼',
  'Morocco': '🇲🇦',
  'Slovakia': '🇸🇰',
  'Ecuador': '🇪🇨',
  'Puerto Rico': '🇵🇷',
  'Kenya': '🇰🇪',
  'Ethiopia': '🇪🇹',
};

export function getCountryFlag(country: string): string {
  return countryFlags[country] || '🌍';
}

export function getVerticalRateLabel(vr: number | null): { label: string; icon: string; color: string } {
  if (vr === null) return { label: 'N/A', icon: '−', color: 'text-slate-400' };
  if (vr < -0.5) return { label: 'DESCENDING', icon: '↓', color: 'text-orange-500' };
  if (vr > 0.5) return { label: 'CLIMBING', icon: '↑', color: 'text-teal-500' };
  return { label: 'LEVEL', icon: '→', color: 'text-slate-400' };
}
