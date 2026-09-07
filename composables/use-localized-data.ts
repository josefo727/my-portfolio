export function useLocalizedData<T>(es: T, en: T): T {
  const { locale } = useI18n()

  return locale.value === 'en' ? en : es
}
