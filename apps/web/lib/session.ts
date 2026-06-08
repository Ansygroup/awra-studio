import { cookies } from 'next/headers';
import { apiFetch } from './api';

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type SessionOrganization = {
  id: string;
  name: string;
  plan: string;
};

export type Session = {
  user: SessionUser;
  organization: SessionOrganization;
  token: string;
};

export async function getServerSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('awra_session_token')?.value;
  if (!token) return null;
  try {
    return await apiFetch<Session>('/auth/session');
  } catch {
    return null;
  }
}

export async function requireSession(): Promise<Session> {
  const session = await getServerSession();
  if (!session) throw new Error('Unauthenticated');
  return session;
}
