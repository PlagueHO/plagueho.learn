export type Role = {
  title: string;
};

export function filterRolesByTitle<T extends Role>(roles: readonly T[], query: string): T[] {
  const normalizedQuery = query.trim().toLocaleLowerCase('en');
  if (!normalizedQuery) return [...roles];

  return roles.filter((role) =>
    role.title.toLocaleLowerCase('en').includes(normalizedQuery),
  );
}
