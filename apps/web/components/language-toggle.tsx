'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { AwraLocale } from '../lib/locale';

export function LanguageToggle({ locale }: { locale: AwraLocale }) {
  const pathname = usePathname();

  const targetHref = (targetLocale: AwraLocale) => {
    const query = new URLSearchParams({ locale: targetLocale, next: pathname });
    return `/language?${query.toString()}`;
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-xs text-slate-300">
      <Link
        href={targetHref('en')}
        className={`rounded-full px-3 py-1 transition ${locale === 'en' ? 'bg-white/10 text-white' : 'hover:text-white'}`}
      >
        EN
      </Link>
      <Link
        href={targetHref('ar')}
        className={`rounded-full px-3 py-1 transition ${locale === 'ar' ? 'bg-white/10 text-white' : 'hover:text-white'}`}
      >
        AR
      </Link>
    </div>
  );
}
