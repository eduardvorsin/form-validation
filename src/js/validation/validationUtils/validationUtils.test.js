import { changePasswordVisibillity, isInputField } from './validationUtils';

describe('isInputField tests', () => {
  it('should return an error if the passed element is not of type input', () => {
    expect.assertions(1);

    const unexpectedInput = document.createElement('div');
    expect(() => {
      isInputField(unexpectedInput);
    }).toThrow('the passed value must be an input element');
  });

  it('should return false if the input type is not equal to one of the following "text", "password", "email", "url"', () => {
    // expect.assertions(1);

    const unexpectedInput = document.createElement('input');
    unexpectedInput.type = 'button';

    expect(isInputField(unexpectedInput)).toBeFalsy();
  });

  it('should return true if the input type is equal to one of the following "text", "password", "email", "url"', () => {
    // expect.assertions(1);

    const input = document.createElement('input');
    input.type = 'email';

    expect(isInputField(input)).toBeTruthy();
  });
});

describe('changePasswordVisibillity tests', () => {
  it('should return an error if the passed element is not of type input', () => {
    expect.assertions(1);

    const unexpectedInput = document.createElement('div');
    expect(() => {
      changePasswordVisibillity(unexpectedInput);
    }).toThrow('the passed value must be an input element');
  });

  it('should return an error if the input passed does not have the type text or password', () => {
    expect.assertions(1);

    const unexpectedInput = document.createElement('input');
    unexpectedInput.type = 'button';

    expect(() => {
      changePasswordVisibillity(unexpectedInput);
    }).toThrow('the input passed must be either text type or password');
  });

  it('should change the input type to text if there was a password before', () => {
    expect.assertions(1);

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';

    changePasswordVisibillity(passwordInput);

    expect(passwordInput.type).toBe('text');
  });

  it('should change the input type to password if there was a text before', () => {
    expect.assertions(1);

    const textInput = document.createElement('input');
    textInput.type = 'text';

    changePasswordVisibillity(textInput);

    expect(textInput.type).toBe('password');
  });
});
