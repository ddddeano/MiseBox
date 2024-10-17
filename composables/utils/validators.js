// Utility function to check if a string is non-empty and non-whitespace
export function isNonEmptyString(str) {
  return typeof str === 'string' && str.trim().length > 0;
}
