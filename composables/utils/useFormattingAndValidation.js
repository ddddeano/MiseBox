import { collection, query, where, getDocs } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

// Formatting Functions

export function formatDisplayName(value) {
  return formatTitleCase(removeWhitespace(value));
}

export function formatHandle(value) {
  // Remove whitespace and trim the value first
  const cleanedValue = removeWhitespace(value);

  // Ensure the handle is lowercased and starts with '@'
  return cleanedValue.startsWith('@') ? cleanedValue.toLowerCase() : `@${cleanedValue.toLowerCase()}`;
}

export function emailFormatting(value) {
  return formatEmailCase(removeWhitespace(value));
}

export function removeWhitespace(value) {
  return value ? value.replace(/\s+/g, ' ').trim() : value;
}

export function formatBio(value) {
  // Ensure line breaks (\n) are preserved while removing excess spaces
  return value ? value.replace(/[ \t]{2,}/g, ' ').trim() : value;
}


export function formatTitle(value) {
  // Convert to title case and remove trailing whitespace
  return value
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .trim();
}

// Date of Birth Formatting Function
export function dobFormatting(dob) {
  // Ensure all values are trimmed and returned as a clean object
  return {
    day: removeWhitespace(dob.day),
    month: removeWhitespace(dob.month),
    year: removeWhitespace(dob.year),
  };
}

// Address Formatting Function
export function formatAddress(address) {
  // Ensure each field is trimmed and whitespace is removed
  return {
    number: removeWhitespace(address.number),
    street1: removeWhitespace(address.street1),
    street2: address.street2 ? removeWhitespace(address.street2) : '', // street2 can be optional
    town: formatTitleCase(removeWhitespace(address.town)),
    county: formatTitleCase(removeWhitespace(address.county)),
    postalCode: removeWhitespace(address.postalCode),
    country: formatTitleCase(removeWhitespace(address.country)),
  };
}

// Tag Formatting Function
export function formatTags(tags) {
  return tags.map((tag) => tag.toLowerCase().replace(/\s+/g, '').trim());
}

// Helper functions for formatting title case and email
function formatTitleCase(value) {
  return value
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatEmailCase(value) {
  return value ? value.toLowerCase() : value;
}

// Validation Functions

export function validateDisplayName(value, optional = false) {
  if (optional && (!value || value.trim() === '')) {
    return ''; // No error for blank display names
  }

  if (value.length < 3) {
    return 'Display name must be at least 3 characters.';
  }

  const forbiddenCharacters = /[^a-zA-Z0-9 ]/; // Only letters, numbers, and spaces allowed
  if (forbiddenCharacters.test(value)) {
    return 'Display name can only contain letters, numbers, and spaces.';
  }

  return ''; // No error
}

export async function validateHandle(value, optional = false) {
  if (optional && (!value || value.trim() === '')) {
    return ''; // No error for blank handles
  }

  const minLengthError = validateMinLength(3)(value);
  if (minLengthError) return minLengthError;

  const uniquenessError = await validateHandleUniqueness(value);
  return uniquenessError || ''; // Return uniqueness error or empty string
}

export function validateEmail(value, optional = false) {
  if (optional && (!value || value.trim() === '')) {
    return ''; // No error for blank emails
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? '' : 'Invalid email address.';
}

export function validatePhoneNumber(value, optional = true) {
  if (optional && (!value || value.trim() === '')) {
    return ''; // No error for blank phone numbers
  }

  const phoneRegex = /^\+\d{1,3}\s?\d{4,14}$/;
  return phoneRegex.test(value) ? '' : 'Invalid phone number with country code.';
}

// Validation functions for multifields like date of birth and address

export function validateDateOfBirth({ day, month, year }, optional = false) {
  if (optional && (!day && !month && !year)) {
    return ''; // No error for blank DOB
  }

  if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) {
    return 'Invalid date of birth. Please provide a valid day, month, and year.';
  }

  const dayNum = parseInt(day, 10);
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);

  if (dayNum < 1 || dayNum > 31) return 'Invalid day provided.';
  if (monthNum < 1 || monthNum > 12) return 'Invalid month provided.';

  const currentYear = new Date().getFullYear();
  if (yearNum < 1900 || yearNum > currentYear) return `Year must be between 1900 and ${currentYear}.`;

  const dob = new Date(yearNum, monthNum - 1, dayNum);
  return isNaN(dob.getTime()) ? 'Invalid date of birth.' : '';
}

export function validateAddress({ number, street1, town, county, postalCode, country }, optional = false) {
  if (optional && (!number && !street1 && !town && !county && !postalCode && !country)) {
    return ''; // No error for blank address
  }

  if (!number || !street1 || !town || !county || !postalCode || !country) {
    return 'All address fields are required.';
  }

  const postalCodeRegex = /^[0-9]{4,10}$/; // Adjust depending on the region
  if (!postalCodeRegex.test(postalCode)) {
    return 'Invalid postal code format.';
  }

  if (street1.length < 3) {
    return 'Street name must be at least 3 characters long.';
  }

  if (town.length < 2) {
    return 'Town name must be at least 2 characters long.';
  }

  if (county.length < 2) {
    return 'County/Region must be at least 2 characters long.';
  }

  if (country.length < 2) {
    return 'Country name must be at least 2 characters long.';
  }

  return ''; // No errors if all validations pass
}

// Tag Validation Function
export function validateTags(tags, optional = false) {
  if (optional && tags.length === 0) {
    return ''; // No error if tags are optional and empty
  }

  const forbiddenCharacters = /[^a-zA-Z0-9]/;
  for (const tag of tags) {
    if (tag.length < 1) {
      return 'Tags cannot be empty';
    }
    if (forbiddenCharacters.test(tag)) {
      return 'Tags can only contain letters and numbers (no spaces or special characters).';
    }
  }
  return ''; // No error
}

// Bio Validation Function (Allows line breaks)
export function validateBio(value, optional = false) {
  if (optional && (!value || value.trim() === '')) {
    return ''; // No error for blank bios
  }

  // Validate minimum length, you can adjust as needed
  if (value.length < 10) {
    return 'Bio must be at least 10 characters long.';
  }

  return ''; // No validation errors
}

// Title Validation Function (Ensures no numbers)
export function validateTitle(value, optional = false) {
  if (optional && (!value || value.trim() === '')) {
    return ''; // No error for blank titles
  }

  if (value.length < 3) {
    return 'Title must be at least 3 characters long.';
  }

  const forbiddenCharacters = /[^a-zA-Z -]/; // Only letters, spaces, and dashes allowed
  if (forbiddenCharacters.test(value)) {
    return 'Title can only contain letters, spaces, and dashes (no numbers or special characters).';
  }

  return ''; // No validation errors
}

// Helper Functions

export function validateMinLength(minLength) {
  return (value) => (value.length >= minLength ? '' : `Minimum ${minLength} characters required.`);
}

export async function validateHandleUniqueness(value) {
  const firestore = useFirestore();
  const handleQuery = query(
    collection(firestore, 'misebox-users'),
    where('handle', '==', value)
  );

  const querySnapshot = await getDocs(handleQuery);
  return querySnapshot.empty ? '' : 'Handle is already taken.';
}
