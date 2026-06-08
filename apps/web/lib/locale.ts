import { cookies } from 'next/headers';

export type AwraLocale = 'en' | 'ar';

export function normalizeLocale(value: string | null | undefined): AwraLocale {
  return value === 'ar' ? 'ar' : 'en';
}

export async function getServerLocale(): Promise<AwraLocale> {
  const cookieStore = await cookies();
  return normalizeLocale(cookieStore.get('awra_locale')?.value);
}

export function getLocaleDirection(locale: AwraLocale) {
  return locale === 'ar' ? 'rtl' : 'ltr';
}
