import debounce from './debounce/debounce.js';
import validationReducer from './validation/validationReducer/validationReducer.js';
import { validateForm } from './validation/validators/validators.js';

const signUpForm = document.querySelector('#sign-up-form');
signUpForm.noValidate = true;

const isInputField = (input) => {
  if (input?.tagName !== 'INPUT') {
    throw new Error('the passed value must be an input element');
  }

  const { type } = input;

  const inputTypes = ['text', 'password', 'email', 'url'];
  return inputTypes.includes(type);
};

const debouncedValidationReducer = debounce(validationReducer, 500);

signUpForm.addEventListener('input', (e) => {
  if (isInputField(e.target)) {
    const { valueMissing } = e.target.validity;
    e.target.classList.toggle('no-empty', !valueMissing);
  }

  debouncedValidationReducer(e.target);
});

signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const isFormValid = validateForm(e.target);

  if (isFormValid) {
    e.currentTarget.submit();
  }
});
