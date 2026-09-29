export type CareerRole = {
  department?: string | null;
};

export type CareersSummary = {
  openRoles: number;
  departments: number;
};

export function summarizeCareers(roles: readonly CareerRole[]): CareersSummary {
  const departments = new Set(
    roles
      .map((role) => role.department?.trim())
      .filter((department): department is string => Boolean(department)),
  );

  return {
    openRoles: roles.length,
    departments: departments.size,
  };
}
