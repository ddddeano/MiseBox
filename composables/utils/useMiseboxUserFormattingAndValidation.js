import {
  formatBio,
  validateBio,
} from "~/composables/utils/useSharedFormattingAndValidation";

// Entity-Specific Formatting
export function formatDisplayName(value) {
  return value
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatHandle(value) {
  const cleanedValue = value.trim().toLowerCase();
  return cleanedValue.startsWith("@") ? cleanedValue.slice(1) : cleanedValue;
}

export function formatEmail(value) {
  return value ? value.trim().toLowerCase() : value;
}

export function formatPhoneNumber(value) {
  return value ? value.replace(/\s+/g, " ").trim() : value;
}

export function formatDateOfBirth(dob) {
  return {
    day: dob?.day?.trim() || "",
    month: dob?.month?.trim() || "",
    year: dob?.year?.trim() || "",
  };
}

export function formatAddress(address) {
  return {
    number: address?.number?.trim() || "",
    street1: address?.street1?.trim() || "",
    street2: address?.street2?.trim() || "",
    town: address?.town ? formatDisplayName(address.town) : "",
    county: address?.county ? formatDisplayName(address.county) : "",
    postalCode: address?.postalCode?.trim() || "",
    country: address?.country ? formatDisplayName(address.country) : "",
  };
}

// Entity-Specific Validation
export function validateDisplayName(value, optional = false) {
  if (optional && (!value || value.trim() === "")) return "";
  if (value.length < 3) return "Display name must be at least 3 characters.";
  const forbiddenCharacters = /[^a-zA-Z0-9 ]/;
  if (forbiddenCharacters.test(value))
    return "Display name can only contain letters, numbers, and spaces.";
  return "";
}

export function validateHandle(value, optional = false) {
  if (optional && (!value || value.trim() === "")) return "";
  if (value.length < 3) return "Handle must be at least 3 characters.";
  if (value.startsWith("@")) return "Handle should not include '@'.";
  return ""; // Add uniqueness validation in entity-specific composables if needed
}

export function validateEmail(value, optional = false) {
  if (optional && (!value || value.trim() === "")) return "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? "" : "Invalid email address.";
}

export function validatePhoneNumber(value, optional = true) {
  if (optional && (!value || value.trim() === "")) return "";
  const phoneRegex = /^\+\d{1,3}\s?\d{4,14}$/;
  return phoneRegex.test(value) ? "" : "Invalid phone number.";
}

export function validateDateOfBirth({ day, month, year }, optional = false) {
  if (optional && (!day && !month && !year)) return "";
  if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) {
    return "Invalid date of birth. Please provide a valid day, month, and year.";
  }
  const dayNum = parseInt(day, 10);
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);
  if (dayNum < 1 || dayNum > 31) return "Invalid day provided.";
  if (monthNum < 1 || monthNum > 12) return "Invalid month provided.";
  const currentYear = new Date().getFullYear();
  if (yearNum < 1900 || yearNum > currentYear)
    return `Year must be between 1900 and ${currentYear}.`;
  const dob = new Date(yearNum, monthNum - 1, dayNum);
  return isNaN(dob.getTime()) ? "Invalid date of birth." : "";
}

export function validateAddress(
  { number, street1, town, county, postalCode, country },
  optional = false
) {
  if (
    optional &&
    (!number && !street1 && !town && !county && !postalCode && !country)
  )
    return "";
  if (!number || !street1 || !town || !county || !postalCode || !country) {
    return "All address fields are required.";
  }
  const postalCodeRegex = /^[0-9]{4,10}$/;
  if (!postalCodeRegex.test(postalCode)) return "Invalid postal code format.";
  if (street1.length < 3)
    return "Street name must be at least 3 characters long.";
  if (town.length < 2) return "Town name must be at least 2 characters long.";
  if (county.length < 2)
    return "County/Region must be at least 2 characters long.";
  if (country.length < 2)
    return "Country name must be at least 2 characters long.";
  return "";
}

export default {
  formatDisplayName,
  formatHandle,
  formatEmail,
  formatPhoneNumber,
  formatDateOfBirth,
  formatAddress,
  validateDisplayName,
  validateHandle,
  validateEmail,
  validatePhoneNumber,
  validateDateOfBirth,
  validateAddress,
  formatBio, // From shared
  validateBio, // From shared
};
