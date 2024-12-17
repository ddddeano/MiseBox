<!-- composables/utils/useSharedFormattingAndValidation.js -->
// ~/composables/utils/useSharedFormattingAndValidation.js

// Helper Functions
function formatWhitespace(value) {
  return value ? value.replace(/\s+/g, " ").trim() : value;
}

// Validation Helper Functions
export function validateMinLength(min) {
  return (value) => {
    if (!value || value.trim().length < min) {
      return `Must be at least ${min} characters long.`;
    }
    return "";
  };
}

export function validateMaxLength(max) {
  return (value) => {
    if (value && value.trim().length > max) {
      return `Must be no more than ${max} characters long.`;
    }
    return "";
  };
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
