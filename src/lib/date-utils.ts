import { tz, type TZDate } from '@date-fns/tz';
import { parseISO } from 'date-fns';
/**
 * Converts a MySQL/MariaDB datetime string (Europe/Prague) to a JS Date.
 * @param dt - Datetime string from DB (e.g. '2025-08-11 14:30:00')
 * @returns TZDate object
 */
export function createDateFromDbDatetime(dt: string): TZDate {
  return parseISO(dt, { in: tz('Europe/Prague') });
}

/**
 * Formats a Date for Czech locale, Europe/Prague timezone, long date, short time.
 * @returns Formatted string (e.g. '11. srpna 2025 v 16:30')
 */
export function formatPublished(date: Date): string {
  return new Intl.DateTimeFormat('cs-CZ', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Prague',
  }).format(date);
}
