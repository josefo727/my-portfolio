export type DateLocale = 'es' | 'en'

const INTL_LOCALE: Record<DateLocale, string> = {
  es: 'es-ES',
  en: 'en-US',
}

/**
 * Age in whole years, as of now. Plain date arithmetic — no locale, no
 * shared mutable state, safe under concurrent SSG rendering (unlike
 * dayjs's `.locale()`, found to leak between routes when many pages are
 * prerendered within the same Nitro process — see 004-i18n T006 notes).
 */
export const calculateAgeYears = (birthday: string): number => {
  const birth = new Date(birthday)
  const now = new Date()
  let years = now.getFullYear() - birth.getFullYear()
  const hadBirthdayThisYear =
    now.getMonth() > birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate())
  if (!hadBirthdayThisYear) years -= 1
  return years
}

/**
 * "DD - Month - YYYY", month name localized via the native Intl API
 * (per-call locale, no shared mutable state — same rationale as above).
 */
export const formatDate = (date: string, locale: DateLocale = 'es'): string => {
  const d = new Date(date)
  const day = String(d.getUTCDate()).padStart(2, '0')
  const month = new Intl.DateTimeFormat(INTL_LOCALE[locale], { month: 'long', timeZone: 'UTC' }).format(d)
  return `${day} - ${month} - ${d.getUTCFullYear()}`
}
