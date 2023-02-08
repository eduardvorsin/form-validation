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
