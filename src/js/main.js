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
