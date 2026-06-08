import { cookies } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api/v1';

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get('awra_session_token')?.value;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`API ${res.status} ${path}: ${body}`);
  }

  return res.json() as Promise<T>;
}

export async function getCurrentSession() {
  try {
    return await apiFetch<{ user: { id: string; name: string; email: string; role: string }; organization: { id: string; name: string } }>('/auth/session');
  } catch {
    return null;
  }
}
