import type { NextRequest } from 'next/server';
import { getWebAuthProviderMode } from './auth-provider';

export function getProviderCookieState(request: NextRequest) {
  const mode = getWebAuthProviderMode();
  const hasAwraSession = Boolean(request.cookies.get('awra_session_token')?.value);

  if (mode === 'starter') {
    return { mode, hasAwraSession, hasProviderIdentity: hasAwraSession };
  }

  if (mode === 'clerk') {
    return {
      mode,
      hasAwraSession,
      hasProviderIdentity: Boolean(request.cookies.get('__session')?.value),
    };
  }

  return {
    mode,
    hasAwraSession,
    hasProviderIdentity: Boolean(
      request.cookies.get('authjs.session-token')?.value ||
        request.cookies.get('next-auth.session-token')?.value ||
        request.cookies.get('__Secure-authjs.session-token')?.value ||
        request.cookies.get('__Secure-next-auth.session-token')?.value,
    ),
  };
}
