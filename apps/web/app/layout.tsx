import Link from 'next/link';
import { LanguageToggle } from '../components/language-toggle';
import { landingCopyAr, landingCopyEn } from '../content/landing-copy';
import { getCurrentSession } from '../lib/api';
import { getLocaleDirection, getServerLocale } from '../lib/locale';
import { canCreateProjects, canManageTeam } from '../lib/permissions';
import './globals.css';

export const metadata = {
  title: 'AWRA Studio',
  description: 'Autonomous Website Redesign Platform',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [session, locale] = await Promise.all([getCurrentSession(), getServerLocale()]);
  const role = session?.user?.role ?? null;
  const copy = locale === 'ar' ? landingCopyAr : landingCopyEn;

  return (
    <html lang={locale} dir={getLocaleDirection(locale)}>
      <body>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_35%),linear-gradient(180deg,#020617_0%,#020617_100%)]">
          <header className="border-b border-white/10 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
              <Link href="/" className="text-lg font-semibold tracking-tight text-white">
                AWRA Studio
              </Link>
              <div className="flex items-center gap-4">
                <nav className="flex items-center gap-6 text-sm text-slate-300">
                  <Link href="/dashboard">{copy.nav.links.dashboard}</Link>
                  {canCreateProjects(role) ? <Link href="/projects/new">{copy.nav.links.newAnalysis}</Link> : null}
                  {canManageTeam(role) ? <Link href="/settings/team">{copy.nav.links.team}</Link> : null}
                  <Link href="/pricing">{copy.nav.links.pricing}</Link>
                  <Link href="/ops/readiness">Ops</Link>
                </nav>
                <LanguageToggle locale={locale} />
                <div className="flex items-center gap-3 text-sm">
                  {session ? (
                    <>
                      <div className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300 md:block">
                        {session.user.name} {copy.nav.sessionSeparator} {session.organization.name}
                      </div>
                      <Link href="/logout" className="rounded-xl border border-white/10 px-4 py-2 text-slate-100">
                        {copy.nav.links.logout}
                      </Link>
                    </>
                  ) : (
                    <Link href="/login" className="rounded-xl border border-white/10 px-4 py-2 text-slate-100">
                      {copy.nav.links.login}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
