import { describe, expect, it } from 'vitest';
import { filterRolesByTitle } from './search-roles';

const roles = [
  { id: 1, title: 'Senior Software Engineer' },
  { id: 2, title: 'Product Designer' },
  { id: 3, title: 'Engineering Manager' },
];

describe('filterRolesByTitle', () => {
  it('preserves all roles for an empty query', () => {
    expect(filterRolesByTitle(roles, '  ')).toEqual(roles);
  });

  it('matches partial titles without case sensitivity', () => {
    expect(filterRolesByTitle(roles, 'ENGINEER')).toEqual([roles[0], roles[2]]);
  });

  it('returns an empty collection when no title matches', () => {
    expect(filterRolesByTitle(roles, 'accountant')).toEqual([]);
  });
});
