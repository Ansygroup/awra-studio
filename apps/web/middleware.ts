import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getProviderCookieState } from './lib/provider-cookies';

const protectedPrefixes = ['/dashboard', '/projects', '/settings'];

export function middleware(request: NextRequest) {
  if (!protectedPrefixes.some((prefix) => request.nextUrl.pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const cookieState = getProviderCookieState(request);

  if (cookieState.hasAwraSession) {
    return NextResponse.next();
  }

  if (cookieState.mode === 'clerk' && cookieState.hasProviderIdentity) {
    const syncUrl = new URL('/auth/clerk/sync', request.url);
    syncUrl.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(syncUrl);
  }

  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('next', request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/dashboard/:path*', '/projects/:path*', '/settings/:path*'],
};
