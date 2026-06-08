export type WebAuthProviderMode = 'starter' | 'clerk' | 'authjs';

type WebProviderReadiness = {
  provider: WebAuthProviderMode;
  requiredEnv: string[];
  configuredEnv: string[];
  missingEnv: string[];
  ready: boolean;
};

export function getWebAuthProviderMode(): WebAuthProviderMode {
  const value = String(process.env.NEXT_PUBLIC_AUTH_PROVIDER ?? process.env.AUTH_PROVIDER ?? 'starter').toLowerCase();
  if (value === 'clerk') return 'clerk';
  if (value === 'authjs') return 'authjs';
  return 'starter';
}

export function getWebAuthProviderReadiness(): WebProviderReadiness {
  const provider = getWebAuthProviderMode();
  const requiredEnv =
    provider === 'clerk'
      ? ['NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', 'NEXT_PUBLIC_API_BASE_URL']
      : ['NEXT_PUBLIC_API_BASE_URL'];

  const configuredEnv = requiredEnv.filter((key) => Boolean(process.env[key]));
  const missingEnv = requiredEnv.filter((key) => !process.env[key]);

  return { provider, requiredEnv, configuredEnv, missingEnv, ready: missingEnv.length === 0 };
}

export function isStarterAuthMode() {
  return getWebAuthProviderMode() === 'starter';
}
