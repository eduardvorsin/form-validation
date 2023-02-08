import {
  validateCommunicationMethod,
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validatePrivacyPolicy,
  validateUsername,
} from '../validators/validators.js';

const ValidationFields = {
  username: 'username',
  email: 'email',
  password: 'password',
  confirmPassword: 'confirmPassword',
  privacyPolicy: 'privacyPolicy',
  communicationMethod: 'communicationMethod',
};

export default function validationReducer(input) {
  if (input?.tagName !== 'INPUT') {
    throw new Error('the passed value must be an input element');
  }

  switch (input.name) {
    case ValidationFields.username:
      return validateUsername(input);
    case ValidationFields.email:
      return validateEmail(input);
    case ValidationFields.password:
      return validatePassword(input);
    case ValidationFields.confirmPassword:
      return validateConfirmPassword(input);
    case ValidationFields.privacyPolicy:
      return validatePrivacyPolicy(input);
    case ValidationFields.communicationMethod:
      return validateCommunicationMethod(input);
    default:
      throw new Error('The validation function is not set for this type of field in the reducer');
  }
}
