export function getCookieValue(name: string) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.split('; ').find((entry) => entry.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=').slice(1).join('=')) : null;
}

export function getClientSessionToken() {
  return getCookieValue('awra_session_token');
}

export function getClientApiHeaders() {
  const token = getClientSessionToken();
  if (!token) throw new Error('Please sign in to continue.');
  return { authorization: `Bearer ${token}` };
}

export function setClientSessionToken(token: string) {
  const maxAge = 60 * 60 * 24 * 30;
  document.cookie = `awra_session_token=${encodeURIComponent(token)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function clearClientSessionToken() {
  document.cookie = 'awra_session_token=; Path=/; Max-Age=0; SameSite=Lax';
}
