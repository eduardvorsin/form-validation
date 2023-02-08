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

export function validateRulesForInput(rules, input) {
  if (input?.tagName !== 'INPUT') {
    throw new Error('the passed value must be an input element');
  }

  if (typeof rules !== 'object') {
    throw new Error('the passed argument rules must be an object');
  }

  const { value } = input;
  let isValid = true;

  Object.keys(rules).forEach((rule) => {
    let args;
    let isRuleInvalidated;

    if (rule === 'isRequiredAndValueMissing') {
      args = input;
      isRuleInvalidated = rules[rule].validationFunction(args);
    } else {
      args = value;
      isRuleInvalidated = !rules[rule].validationFunction(args);
    }

    if (isRuleInvalidated) {
      showError(input, rules[rule].message);
      input.focus();
      input.classList.add('focus-visible');
      isValid = false;
    }
  });

  input.classList.toggle('is-invalid', !isValid);
  // eslint-disable-next-line no-param-reassign
  input.ariaInvalid = !isValid;

  return isValid;
}

export function validateUsername(input) {
  if (input?.tagName !== 'INPUT') {
    throw new Error('the passed value must be an input element');
  }

  hideError(input);

  const usernameRules = {
    isRequiredAndValueMissing: {
      message: 'The field is required',
      validationFunction: isRequiredAndValueMissing,
    },

    longerOrEqualThan3: {
      message: 'the minimum count of char is 3',
      validationFunction: longerOrEqualThan3,
    },
  };

  const isValid = validateRulesForInput(usernameRules, input);

  return isValid;
}
