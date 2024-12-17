<!-- composables/utils/useProfessionalFormattingAndValidation.js -->
// ~/composables/utils/useProfessionalFormattingAndValidation.js

// Formatting Functions
export function formatTitle(value) {
  return value
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .trim();
}

export function formatKitchenExperience(value) {
  return value ? value.replace(/\n/g, '<br>') : '';
}

export function formatOtherExperience(value) {
  return value;
}

export function formatCertifications(value) {
  return value;
}

export function formatEducation(value) {
  return value;
}

export function formatLanguages(value) {
  return value;
}

export function formatProjects(value) {
  return value;
}

export function formatVolunteering(value) {
  return value;
}

// Validation Functions
export function validateTitle(value, optional = false) {
  if (optional && (!value || value.trim() === '')) return '';
  if (value.length < 3) return 'Title must be at least 3 characters long.';
  const forbiddenCharacters = /[^a-zA-Z -]/;
  if (forbiddenCharacters.test(value)) return 'Title can only contain letters, spaces, and dashes.';
  return '';
}

export function validateKitchenExperience(value) {
  return value && value.trim() !== '' ? '' : 'This field cannot be empty.';
}

export function validateOtherExperience(value) {
  return '';
}

export function validateCertifications(value) {
  return '';
}

export function validateEducation(value) {
  return '';
}

export function validateLanguages(value) {
  return '';
}

export function validateProjects(value) {
  return '';
}

export function validateVolunteering(value) {
  return '';
}
