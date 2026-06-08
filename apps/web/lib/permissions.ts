const roleRank: Record<string, number> = {
  VIEWER: 1,
  MEMBER: 2,
  ADMIN: 3,
  OWNER: 4,
};

export function hasMinimumRole(role: string | null | undefined, minimumRole: string) {
  const current = roleRank[String(role ?? '').toUpperCase()] ?? 0;
  const minimum = roleRank[String(minimumRole).toUpperCase()] ?? 0;
  return current >= minimum;
}

export function canCreateProjects(role: string | null | undefined) {
  return hasMinimumRole(role, 'MEMBER');
}

export function canManageBilling(role: string | null | undefined) {
  return hasMinimumRole(role, 'ADMIN');
}

export function canManageTeam(role: string | null | undefined) {
  return hasMinimumRole(role, 'ADMIN');
}

export function canManageRoles(role: string | null | undefined) {
  return hasMinimumRole(role, 'OWNER');
}

export function canCreateExports(role: string | null | undefined) {
  return hasMinimumRole(role, 'MEMBER');
}
