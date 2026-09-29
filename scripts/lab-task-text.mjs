/**
 * Purpose: Normalize rendered task-list text into stable labels and persistence identifiers.
 * Parameters: Token-like children with string content values.
 * Usage: Import normalizeTaskText from VitePress configuration and focused tests.
 */

export function normalizeTaskText(children) {
  return children
    .map((child) => child.content)
    .join('')
    .replace(/^\s*\[[ xX]\]\s*/, '')
    .replace(/\s+/g, ' ')
    .trim();
}
