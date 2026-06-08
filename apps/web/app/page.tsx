import Link from 'next/link';
import { landingCopyAr, landingCopyEn } from '../content/landing-copy';
import { getServerLocale } from '../lib/locale';

export default async function HomePage() {
  const locale = await getServerLocale();
  const copy = locale === 'ar' ? landingCopyAr : landingCopyEn;

  return (
    <div className="space-y-24 pb-10">
      <section className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-200">
            {copy.hero.badge}
          </div>
          <div className="space-y-4">
            <h1 className="max-w-5xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              {copy.hero.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">{copy.hero.subtitle}</p>
            <p className="max-w-2xl text-sm leading-7 text-slate-400">{copy.hero.microcopy}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/projects/new" className="rounded-xl bg-cyan-400 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-300">
              {copy.hero.primaryCta}
            </Link>
            <Link href="/pricing" className="rounded-xl border border-white/15 px-5 py-3 font-medium text-white transition hover:border-white/30 hover:bg-white/5">
              {copy.hero.secondaryCta}
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/30">
          <p className="text-sm text-slate-400">{copy.sampleOutput.label}</p>
          <h2 className="text-xl font-semibold text-white">{copy.sampleOutput.title}</h2>
        </div>
      </section>
    </div>
  );
}
