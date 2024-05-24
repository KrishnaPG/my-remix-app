import { getClientLocales } from 'remix-utils/locales/server'
import { CURRENCIES } from '#app/services/stripe/plans'

export function getDefaultCurrency(request: Request) {
  const locales = getClientLocales(request)

  // Set a default currency if no locales are found.
  if (!locales) return CURRENCIES.DEFAULT

  return locales?.find((locale) => locale === 'en-US') ? CURRENCIES.USD : CURRENCIES.EUR
}
