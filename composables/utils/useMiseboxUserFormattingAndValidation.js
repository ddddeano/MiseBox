// ~/composables/utils/useMiseboxUserFormattingAndValidation.js

import { collection, query, where, getDocs } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

// Formatting Functions
export function formatDisplayName(value) {
  return formatTitleCase(removeWhitespace(value));
}

export function formatHandle(value) {
  const cleanedValue = removeWhitespace(value);
  return cleanedValue.startsWith('@') ? cleanedValue.toLowerCase() : `@${cleanedValue.toLowerCase()}`;
}

export function formatEmail(value) {
  return formatEmailCase(removeWhitespace(value));
}

export function formatPhoneNumber(value) {
  return value ? value.replace(/\s+/g, ' ').trim() : value;
}

export function formatBio(value) {
  return value ? value.replace(/[ \t]{2,}/g, ' ').trim() : value;
}

export function formatDateOfBirth(dob) {
  return {
    day: removeWhitespace(dob.day),
    month: removeWhitespace(dob.month),
    year: removeWhitespace(dob.year),
  };
}

export function formatAddress(address) {
  return {
    number: removeWhitespace(address.number),
    street1: removeWhitespace(address.street1),
    street2: address.street2 ? removeWhitespace(address.street2) : '',
    town: formatTitleCase(removeWhitespace(address.town)),
    county: formatTitleCase(removeWhitespace(address.county)),
    postalCode: removeWhitespace(address.postalCode),
    country: formatTitleCase(removeWhitespace(address.country)),
  };
}

export function formatUserApps(userApps) {
  return userApps.map(app => ({
    app_name: formatTitleCase(removeWhitespace(app.app_name)),
    app_description: app.app_description ? app.app_description.trim() : '',
    app_url: app.app_url ? app.app_url.trim() : '',
  }));
}

// Validation Functions
export function validateDisplayName(value, optional = false) {
  if (optional && (!value || value.trim() === '')) return '';
  if (value.length < 3) return 'Display name must be at least 3 characters.';
  const forbiddenCharacters = /[^a-zA-Z0-9 ]/;
  if (forbiddenCharacters.test(value)) return 'Display name can only contain letters, numbers, and spaces.';
  return '';
}

export async function validateHandle(value, optional = false) {
  if (optional && (!value || value.trim() === '')) return '';
  const minLengthError = validateMinLength(3)(value);
  if (minLengthError) return minLengthError;
  const uniquenessError = await validateHandleUniqueness(value);
  return uniquenessError || '';
}

export function validateEmail(value, optional = false) {
  if (optional && (!value || value.trim() === '')) return '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? '' : 'Invalid email address.';
}

export function validatePhoneNumber(value, optional = true) {
  if (optional && (!value || value.trim() === '')) return '';
  const phoneRegex = /^\+\d{1,3}\s?\d{4,14}$/;
  return phoneRegex.test(value) ? '' : 'Invalid phone number with country code.';
}

export function validateDateOfBirth({ day, month, year }, optional = false) {
  if (optional && (!day && !month && !year)) return '';
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
  if (optional && (!number && !street1 && !town && !county && !postalCode && !country)) return '';
  if (!number || !street1 || !town || !county || !postalCode || !country) {
    return 'All address fields are required.';
  }
  const postalCodeRegex = /^[0-9]{4,10}$/;
  if (!postalCodeRegex.test(postalCode)) return 'Invalid postal code format.';
  if (street1.length < 3) return 'Street name must be at least 3 characters long.';
  if (town.length < 2) return 'Town name must be at least 2 characters long.';
  if (county.length < 2) return 'County/Region must be at least 2 characters long.';
  if (country.length < 2) return 'Country name must be at least 2 characters long.';
  return '';
}

export function validateBio(value, optional = false) {
  if (optional && (!value || value.trim() === '')) return '';
  if (value.length > 500) return 'Bio must be 500 characters or less.';
  return '';
}

// Validation for User Apps
export function validateUserApps(userApps, optional = false) {
  if (optional && (!userApps || userApps.length === 0)) return '';
  
  if (!Array.isArray(userApps)) {
    return 'User Apps should be an array.';
  }

  for (const app of userApps) {
    if (!app.app_name || !app.app_url) {
      return 'Each User App must have a name and URL.';
    }
    if (app.app_name.length < 3) return 'App name must be at least 3 characters.';
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    if (!urlRegex.test(app.app_url)) return 'Invalid URL format for app.';
  }

  return '';
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

// Internal Helper Functions
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

function removeWhitespace(value) {
  return value ? value.replace(/\s+/g, ' ').trim() : value;
}
