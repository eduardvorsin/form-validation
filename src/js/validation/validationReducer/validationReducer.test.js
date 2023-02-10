import { screen } from '@testing-library/dom';
import {
  validateCommunicationMethod,
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validatePrivacyPolicy,
  validateUsername,
} from '../validators/validators';
import validationReducer from './validationReducer';

jest.mock('../validators/validators.js', () => ({
  __esModule: true,
  validateUsername: jest.fn(),
  validateEmail: jest.fn(),
  validatePassword: jest.fn(),
  validateConfirmPassword: jest.fn(),
  validatePrivacyPolicy: jest.fn(),
  validateCommunicationMethod: jest.fn(),
}));

describe('validationReducer tests', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should throw an error if a non-input element is passed', () => {
    expect.assertions(1);

    const unexpectedElement = document.createElement('div');

    expect(() => {
      validationReducer(unexpectedElement);
    }).toThrow('the passed value must be an input element');
  });

  it('should call a mock function if the input name is username', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="form-item">
      <input id="username" name="username" type="text" value ="abcd" required>
    </div>
    `;

    validationReducer(screen.getByRole('textbox'));

    expect(validateUsername).toHaveBeenCalledTimes(1);
  });

  it('should call a mock function if the input name is email', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="form-item">
      <input class="form-field-wrapper__field" id="email" value="e@example.com" name="email" type="email" required>
    </div>
    `;

    validationReducer(screen.getByRole('textbox'));

    expect(validateEmail).toHaveBeenCalledTimes(1);
  });

  it('should call a mock function if the input name is password', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <input 
      class="form-field-wrapper__field" id="password" name="password" 
      role="textbox" type="password"
      pattern="(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" minlength="5" required value="1Aa@4"
    />
    `;

    validationReducer(screen.getByRole('textbox'));

    expect(validatePassword).toHaveBeenCalledTimes(1);
  });

  it('should call a mock function if the input name is confirmPassword', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <input 
      class="form-field-wrapper__field" id="confirm-password"     name="confirmPassword" role="textbox" type="password" required
      value="1Aa@4"
    />
    `;

    validationReducer(screen.getByRole('textbox'));

    expect(validateConfirmPassword).toHaveBeenCalledTimes(1);
  });

  it('should call a mock function if the input name is privacyPolicy', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <input 
      class="checkbox-group__checkbox checkbox-item__input"  id="privacy-policy" name="privacyPolicy"
      type="checkbox" required
    >
    `;

    validationReducer(screen.getByRole('checkbox'));

    expect(validatePrivacyPolicy).toHaveBeenCalledTimes(1);
  });

  it('should call a mock function if the input name is communicationMethod', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <input 
      class="radio-group__radio radio-item__input" id="communication-method-email" name="communicationMethod"
      type="radio" required
    />
    `;

    validationReducer(screen.getByRole('radio'));

    expect(validateCommunicationMethod).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if the input name does not match any name from the ValidationFields object', () => {
    expect.assertions(1);

    const inputWithoutType = document.createElement('input');

    expect(() => {
      validationReducer(inputWithoutType);
    }).toThrow('The validation function is not set for this type of field in the reducer');
  });
});
