import { hideError, showError } from '../validationErrors/validationErrors.js';

export const isRequiredAndValueMissing = (input) => input.required && input.validity.valueMissing;
export const isEmail = (value) => value.search(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) >= 0;
export const longerOrEqualThan3 = (value) => value.length >= 3;
export const longerOrEqualThan5 = (value) => value.length >= 5;
export const hasOneOrMoreDigits = (value) => value.search(/\d+/) >= 0;
export const hasOneOrMoreSpecialCharacters = (value) => value.search(/[!@#$%^&*]+/) >= 0;
export const hasOneOrMoreLowercaseCharachers = (value) => value.search(/[a-z]+/) >= 0;
export const hasOneOrMoreUppercaseCharachers = (value) => value.search(/[A-Z]+/) >= 0;
export const isPasswordsMatch = (passwordValue, confirmValue) => passwordValue === confirmValue;
