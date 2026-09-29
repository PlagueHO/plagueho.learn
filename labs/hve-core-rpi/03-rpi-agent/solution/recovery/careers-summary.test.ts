import { describe, expect, it } from 'vitest';
import { summarizeCareers } from './careers-summary';

describe('summarizeCareers', () => {
  it('returns zero counts for an empty collection', () => {
    expect(summarizeCareers([])).toEqual({ openRoles: 0, departments: 0 });
  });

  it('counts unique nonblank departments', () => {
    const roles = [
      { department: 'Engineering' },
      { department: ' Engineering ' },
      { department: 'Design' },
      { department: ' ' },
    ];

    expect(summarizeCareers(roles)).toEqual({ openRoles: 4, departments: 2 });
    expect(roles[1].department).toBe(' Engineering ');
  });
});
