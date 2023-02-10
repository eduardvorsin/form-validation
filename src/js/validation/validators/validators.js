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

export function validateEmail(input) {
  if (input?.tagName !== 'INPUT') {
    throw new Error('the passed value must be an input element');
  }

  hideError(input);

  const emailRules = {
    isRequiredAndValueMissing: {
      message: 'The field is required',
      validationFunction: isRequiredAndValueMissing,
    },

    isEmail: {
      message: 'the field input should contains following pattern: example@email.com',
      validationFunction: isEmail,
    },
  };

  const isValid = validateRulesForInput(emailRules, input);

  return isValid;
}

export function validatePassword(input) {
  if (input?.tagName !== 'INPUT') {
    throw new Error('the passed value must be an input element');
  }

  hideError(input);

  const passwordRules = {
    isRequiredAndValueMissing: {
      message: 'The field is required',
      validationFunction: isRequiredAndValueMissing,
    },

    longerOrEqualThan5: {
      message: 'the minimum count of char is 5',
      validationFunction: longerOrEqualThan5,
    },

    hasOneOrMoreDigits: {
      message: 'the field input should has one or more digits',
      validationFunction: hasOneOrMoreDigits,
    },

    hasOneOrMoreSpecialCharacters: {
      message: 'the field input should has one or more following characters:!@#$%^&*',
      validationFunction: hasOneOrMoreSpecialCharacters,
    },

    hasOneOrMoreLowercaseCharachers: {
      message: 'the field input should has one or more lowercase characters',
      validationFunction: hasOneOrMoreLowercaseCharachers,
    },

    hasOneOrMoreUppercaseCharachers: {
      message: 'the field input should has one or more uppercase characters',
      validationFunction: hasOneOrMoreUppercaseCharachers,
    },
  };

  const isValid = validateRulesForInput(passwordRules, input);

  return isValid;
}

export function validateConfirmPassword(input) {
  if (input?.tagName !== 'INPUT') {
    throw new Error('the passed value must be an input element');
  }

  hideError(input);

  const passwordValue = input.form.elements.password.value;
  const confirmValue = input.value;

  let isValid = true;

  if (isRequiredAndValueMissing(input)) {
    showError(input, 'The field is required');
    isValid = false;
  }

  if (!isPasswordsMatch(passwordValue, confirmValue)) {
    showError(input, 'confirm password does not match');
    isValid = false;
  }

  if (!isValid) {
    input.focus();
    input.classList.add('focus-visible');
  }

  input.classList.toggle('is-invalid', !isValid);
  // eslint-disable-next-line no-param-reassign
  input.ariaInvalid = !isValid;

  return isValid;
}

export function validatePrivacyPolicy(input) {
  if (input?.tagName !== 'INPUT') {
    throw new Error('the passed value must be an input element');
  }

  hideError(input);

  const isValid = !isRequiredAndValueMissing(input);

  if (!isValid) {
    showError(input, 'The checkbox must be checked');
    input.focus();
    input.classList.add('focus-visible');
  }

  input.classList.toggle('is-invalid', !isValid);
  // eslint-disable-next-line no-param-reassign
  input.ariaInvalid = !isValid;

  return isValid;
}

export function validateCommunicationMethod(input) {
  if (input?.tagName !== 'INPUT' && !input?.length) {
    throw new Error('the passed value must be an input element');
  }

  hideError(input);

  let radios;

  if (input?.length) {
    radios = [...input];
  } else {
    radios = [...input.closest('.form-item').elements];
  }

  const isValid = radios.some((radio) => radio.checked);

  if (!isValid) {
    showError(input, 'The field must be checked');
    radios[0].focus();
    radios[0].classList.add('focus-visible');
  }

  radios.forEach((radio) => {
    radio.classList.toggle('is-invalid', !isValid);
    // eslint-disable-next-line no-param-reassign
    radio.ariaInvalid = !isValid;
  });

  return isValid;
}

export const validationRules = {
  username: validateUsername,
  email: validateEmail,
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
  privacyPolicy: validatePrivacyPolicy,
  communicationMethod: validateCommunicationMethod,
};

export function validateForm(form) {
  if (form?.tagName !== 'FORM') {
    throw new Error('the passed value must be a form element');
  }

  let isValid = true;

  const ruleEntires = Object.entries(validationRules);

  ruleEntires.forEach((rule) => {
    const [field, validationFunction] = rule;
    if (!validationFunction(form.elements[field])) {
      isValid = false;
    }
  });

  return isValid;
}
