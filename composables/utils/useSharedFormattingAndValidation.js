// ~/composables/utils/useSharedFormattingAndValidation.js

// Helper Functions
function formatWhitespace(value) {
  return value ? value.replace(/\s+/g, " ").trim() : value;
}

// Shared Formatting Functions
export function formatBio(value) {
  return formatWhitespace(value);
}

// Shared Validation Functions
export function validateBio(value, optional = false) {
  if (optional && (!value || value.trim() === "")) return "";
  if (value.length > 500) return "Bio must be 500 characters or less.";
  return "";
}
