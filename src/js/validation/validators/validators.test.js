import { screen } from '@testing-library/dom';
import {
  hasOneOrMoreDigits,
  hasOneOrMoreLowercaseCharachers,
  hasOneOrMoreSpecialCharacters,
  hasOneOrMoreUppercaseCharachers,
  isEmail,
  isPasswordsMatch,
  isRequiredAndValueMissing,
  longerOrEqualThan3,
  longerOrEqualThan5,
  validateCommunicationMethod,
  validateConfirmPassword,
  validateEmail, validateForm,
  validatePassword,
  validatePrivacyPolicy,
  validateUsername,
} from './validators';

describe('validateUsername tests', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should return an error if the parameter tag does not input', () => {
    expect.assertions(1);

    expect(() => {
      const unexpectedElement = document.createElement('div');

      validateUsername(unexpectedElement);
    }).toThrow('the passed value must be an input element');
  });

  it('should return isValid equal to false if the input is required but empty', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="form-item">
      <div class="form-item__field-wrapper">
        <input class="form-field-wrapper__field" id="username" name="username" type="text" required minlength="3">
      </div>
    </div>
    `;

    expect(validateUsername(screen.queryByRole('textbox'))).toBeFalsy();
  });

  it('should return isValid equal to false if the input value is shorter than 3 characters', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="form-item">
      <div class="form-item__field-wrapper">
        <input class="form-field-wrapper__field" id="username" name="username" value="t" type="text" required minlength="3">
      </div>
    </div>
    `;

    expect(validateUsername(screen.queryByRole('textbox'))).toBeFalsy();
  });

  it('should return isValid equal to true if the input value passes all validation checks', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="form-item">
      <div class="form-item__field-wrapper">
        <input class="form-field-wrapper__field" id="username" name="username" value="abcdefg" type="text" required minlength="3">
      </div>
    </div>
    `;

    expect(validateUsername(screen.getByRole('textbox'))).toBeTruthy();
  });
});

describe('validateEmail tests', () => {
  it('should return an error if the parameter tag does not input', () => {
    expect.assertions(1);

    expect(() => {
      const unexpectedElement = document.createElement('div');

      validateEmail(unexpectedElement);
    }).toThrow('the passed value must be an input element');
  });

  it('should return isValid equal to false if the input is required but empty', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="form-item">
      <div class="form-item__field-wrapper">
        <input class="form-field-wrapper__field" id="email" name="email" type="email" required>
      </div>
    </div>
    `;

    expect(validateEmail(screen.queryByRole('textbox'))).toBeFalsy();
  });

  it('should return isValid equal to false if the input value does not match the regexp example@email.com', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="form-item">
      <div class="form-item__field-wrapper">
        <input class="form-field-wrapper__field" id="email" name="email" type="email" value="@example.com" required>
      </div>
    </div>
    `;

    expect(validateEmail(screen.queryByRole('textbox'))).toBeFalsy();
  });

  it('should return isValid equal to true if the input value passes all validation checks', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="form-item">
      <div class="form-item__field-wrapper">
        <input class="form-field-wrapper__field" id="email" name="email" type="email" value="abcd@email.com" required>
      </div>
    </div>
    `;

    expect(validateEmail(screen.getByRole('textbox'))).toBeTruthy();
  });
});

describe('validatePassword tests', () => {
  it('should return an error if the parameter tag does not input', () => {
    expect.assertions(1);

    expect(() => {
      const unexpectedElement = document.createElement('div');

      validatePassword(unexpectedElement);
    }).toThrow('the passed value must be an input element');
  });

  it('should return an isValid value equal to false if the entered value is less than 5 characters', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="form-item">
      <div class="form-item__field-wrapper">
        <input class="form-field-wrapper__field" id="password" name="password" type="password" value="b%C1" minlength="5" role="textbox" required>
      </div>
    </div>
    `;

    expect(validatePassword(screen.queryByRole('textbox'))).toBeFalsy();
  });

  it('should return an isValid value equal to false if there is not at least one digit in the entered value', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="form-item">
      <div class="form-item__field-wrapper">
        <input class="form-field-wrapper__field" id="password" name="password" type="password" value="aAc$dfg" minlength="5" role="textbox" required>
      </div>
    </div>
    `;

    expect(validatePassword(screen.queryByRole('textbox'))).toBeFalsy();
  });

  it('should return an isValid value equal to false if there is not at least one lowercase letter in the entered value', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="form-item">
      <div class="form-item__field-wrapper">
        <input class="form-field-wrapper__field" id="password" name="password" type="password" value="1A@2345" minlength="5" role="textbox" required>
      </div>
    </div>
    `;

    expect(validatePassword(screen.queryByRole('textbox'))).toBeFalsy();
  });

  it('should return an isValid value equal to false if there is not at least one uppercase letter in the entered value', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="form-item">
      <div class="form-item__field-wrapper">
        <input class="form-field-wrapper__field" id="password" name="password" type="password" value="6a#c79h" minlength="5" role="textbox" required>
      </div>
    </div>
    `;

    expect(validatePassword(screen.queryByRole('textbox'))).toBeFalsy();
  });

  it('should return an isValid value equal to false if there is not at least one special character in the entered value', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="form-item">
      <div class="form-item__field-wrapper">
        <input class="form-field-wrapper__field" id="password" name="password" type="password" value="7c0c55F" minlength="5" role="textbox" required>
      </div>
    </div>
    `;

    expect(validatePassword(screen.queryByRole('textbox'))).toBeFalsy();
  });

  it('should return isValid equal to true if the input value passes all validation checks', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="form-item">
      <div class="form-item__field-wrapper">
        <input class="form-field-wrapper__field" id="password" name="password" type="password" value="aA@1cdd" minlength="5" role="textbox" required>
      </div>
    </div>
    `;

    expect(validatePassword(screen.getByRole('textbox'))).toBeTruthy();
  });
});

describe('validateConfirmPassword tests', () => {
  it('should return an error if the parameter tag does not input', () => {
    expect.assertions(1);

    expect(() => {
      const unexpectedElement = document.createElement('div');

      validateConfirmPassword(unexpectedElement);
    }).toThrow('the passed value must be an input element');
  });

  it('should return isValid equal to false if the input is required but empty', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <form class="form" action="#" id="sign-up-form">
      <div class="form-item">
        <div class="form-item__field-wrapper">
          <input class="form-field-wrapper__field" id="password" name="password" type="password" value="" minlength="5" role="textbox" required data-testid="password">
        </div>
      </div>
      <div class="form-item">
        <div class="form-item__field-wrapper">
          <input class="form-field-wrapper__field" id="confirm-password" name="confirmPassword" type="password" value="C1fy^l" minlength="5" role="textbox" required data-testid="confirmPassword">
        </div>
      </div>
    </form>
    `;

    expect(validateConfirmPassword(screen.queryByTestId('confirmPassword'))).toBeFalsy();
  });

  it('should return an invalid value equal to false if the passwords entered do not match', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <form class="form" action="#" id="sign-up-form">
      <div class="form-item">
        <div class="form-item__field-wrapper">
          <input class="form-field-wrapper__field" id="password" name="password" type="password" value="aA@1cdd" minlength="5" role="textbox" required data-testid="password">
        </div>
      </div>
      <div class="form-item">
        <div class="form-item__field-wrapper">
          <input class="form-field-wrapper__field" id="confirm-password" name="confirmPassword" type="password" value="C1fy^l" minlength="5" role="textbox" required data-testid="confirmPassword">
        </div>
      </div>
    </form>
    `;

    expect(validateConfirmPassword(screen.queryByTestId('confirmPassword'))).toBeFalsy();
  });

  it('should return isValid equal to true if the input value passes all validation checks', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <form class="form" action="#" id="sign-up-form">
      <div class="form-item">
        <div class="form-item__field-wrapper">
          <input class="form-field-wrapper__field" id="password" name="password" type="password" value="d3%%Pv" minlength="5" role="textbox" required data-testid="password">
        </div>
      </div>
      <div class="form-item">
        <div class="form-item__field-wrapper">
          <input class="form-field-wrapper__field" id="confirm-password" name="confirmPassword" type="password" value="d3%%Pv" minlength="5" role="textbox" required data-testid="confirmPassword">
        </div>
      </div>
    </form>
    `;

    expect(validateConfirmPassword(screen.getByTestId('confirmPassword'))).toBeTruthy();
  });
});

describe('validatePrivacyPolicy tests', () => {
  it('should return an error if the parameter tag does not input', () => {
    expect.assertions(1);

    expect(() => {
      const unexpectedElement = document.createElement('div');

      validatePrivacyPolicy(unexpectedElement);
    }).toThrow('the passed value must be an input element');
  });

  it('should return isValid equal to false if the input is required but empty', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="form-item checkbox-group">
      <label class="checkbox-group__item checkbox-item">
        <input class="checkbox-group__checkbox checkbox-item__input" id="privacy-policy" name="privacyPolicy" type="checkbox" required>
      </label>
    </div>
    `;

    expect(validatePrivacyPolicy(screen.queryByRole('checkbox'))).toBeFalsy();
  });

  it('should return isValid equal to true if the input value passes all validation checks', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="form-item checkbox-group">
    <label class="checkbox-group__item checkbox-item">
      <input class="checkbox-group__checkbox checkbox-item__input" id="privacy-policy" name="privacyPolicy" type="checkbox" required checked>
    </label>
  </div>
    `;

    expect(validatePrivacyPolicy(screen.getByRole('checkbox'))).toBeTruthy();
  });
});

describe('validateCommunicationMethod tests', () => {
  it('should return an error if the parameter tag does not input', () => {
    expect.assertions(1);

    expect(() => {
      const unexpectedElement = document.createElement('div');

      validateCommunicationMethod(unexpectedElement);
    }).toThrow('the passed value must be an input element');
  });

  it('should return isValid equal to false if the input is required but empty', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <fieldset class="form-item radio-group">
      <label class="radio-group__item radio-item">
        <input class="radio-group__radio radio-item__input" id="communication-method-email" name="communicationMethod" type="radio" required>
      </label>
      <label class="radio-group__item radio-item">
        <input class="radio-group__radio radio-item__input" id="communication-method-sms" name="communicationMethod" type="radio">
      </label>
    </fieldset>
    `;

    expect(validateCommunicationMethod(screen.queryAllByRole('radio')[0])).toBeFalsy();
  });

  it('should return isValid equal to true if the input value passes all validation checks', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <fieldset class="form-item radio-group">
      <label class="radio-group__item radio-item">
        <input class="radio-group__radio radio-item__input" id="communication-method-email" name="communicationMethod" type="radio" value="email" required>
      </label>
      <label class="radio-group__item radio-item">
        <input class="radio-group__radio radio-item__input" id="communication-method-sms" name="communicationMethod" type="radio" value="sms" checked>
      </label>
    </fieldset>
    `;

    expect(validateCommunicationMethod(screen.getAllByRole('radio')[0])).toBeTruthy();
  });
});

describe('validateForm tests', () => {
  it('should return an error if the parameter tag does not form', () => {
    expect.assertions(1);

    expect(() => {
      const unexpectedElement = document.createElement('div');

      validateForm(unexpectedElement);
    }).toThrow('the passed value must be a form element');
  });

  it('should return an isValid value equal to false if at least one field value is invalid', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <form class="form" action="#" id="sign-up-form" role="form">
      <div class="form-item">
        <div class="form-item__field-wrapper">
          <input class="form-field-wrapper__field" id="username" name="username" value="" type="text" required minlength="3">
        </div>
      </div>
      <div class="form-item">
        <div class="form-item__field-wrapper">
          <input class="form-field-wrapper__field" id="email" name="email" type="email" value="abcd@email.com" required>
        </div>
      </div>
      <div class="form-item">
        <div class="form-item__field-wrapper">
          <input class="form-field-wrapper__field" id="password" name="password" type="password" value="d3%%Pv" minlength="5" role="textbox" required data-testid="password">
        </div>
      </div>
      <div class="form-item">
        <div class="form-item__field-wrapper">
          <input class="form-field-wrapper__field" id="confirm-password" name="confirmPassword" type="password" value="d3%%Pv" minlength="5" role="textbox" required data-testid="confirmPassword">
        </div>
      </div>
      <div class="form-item checkbox-group">
        <label class="checkbox-group__item checkbox-item">
          <input class="checkbox-group__checkbox checkbox-item__input" id="privacy-policy" name="privacyPolicy" type="checkbox" required checked>
        </label>
      </div>
      <fieldset class="form-item radio-group">
        <label class="radio-group__item radio-item">
          <input class="radio-group__radio radio-item__input" id="communication-method-email" name="communicationMethod" type="radio" required>
        </label>
        <label class="radio-group__item radio-item">
          <input class="radio-group__radio radio-item__input" id="communication-method-sms" name="communicationMethod" type="radio">
        </label>
      </fieldset>
    </form>
    `;

    expect(validateForm(screen.queryByRole('form'))).toBeFalsy();
  });

  it('should return isValid equal to true if the input value passes all validation checks', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <form class="form" action="#" id="sign-up-form" role="form">
      <div class="form-item">
        <div class="form-item__field-wrapper">
          <input class="form-field-wrapper__field" id="username" name="username" value="abcdefg" type="text" required minlength="3">
        </div>
      </div>
      <div class="form-item">
        <div class="form-item__field-wrapper">
          <input class="form-field-wrapper__field" id="email" name="email" type="email" value="abcd@email.com" required>
        </div>
      </div>
      <div class="form-item">
        <div class="form-item__field-wrapper">
          <input class="form-field-wrapper__field" id="password" name="password" type="password" value="d3%%Pvt" minlength="5" role="textbox" required>
        </div>
      </div>
      <div class="form-item">
        <div class="form-item__field-wrapper">
          <input class="form-field-wrapper__field" id="confirm-password" name="confirmPassword" type="password" value="d3%%Pvt" minlength="5" role="textbox" required>
        </div>
      </div>
      <div class="form-item checkbox-group">
        <label class="checkbox-group__item checkbox-item">
          <input class="checkbox-group__checkbox checkbox-item__input" id="privacy-policy" name="privacyPolicy" type="checkbox" required checked>
        </label>
      </div>
      <fieldset class="form-item radio-group">
        <label class="radio-group__item radio-item">
          <input class="radio-group__radio radio-item__input" id="communication-method-email" name="communicationMethod" type="radio" required>
        </label>
        <label class="radio-group__item radio-item">
          <input class="radio-group__radio radio-item__input" id="communication-method-sms" name="communicationMethod" type="radio" checked>
        </label>
      </fieldset>
    </form>
    `;

    expect(validateForm(screen.getByRole('form'))).toBeTruthy();
  });
});

describe('isRequiredAndValueMissing tests', () => {
  it('should return false if the input\'s required property is also false', () => {
    const input = document.createElement('input');

    expect(isRequiredAndValueMissing(input)).toBeFalsy();
  });

  it('should return true if the input\'s required property is also true and the input is not empty', () => {
    const input = document.createElement('input');
    input.required = true;
    input.value = 'abcdefg';

    expect(isRequiredAndValueMissing(input)).toBeFalsy();
  });

  it('should return false if the input\'s required property is true but the value is missing', () => {
    const input = document.createElement('input');
    input.required = true;
    input.value = '';

    expect(isRequiredAndValueMissing(input)).toBeTruthy();
  });
});

describe('isEmail tests', () => {
  it.each([
    '@email.com',
    'A@email.com',
    'b23email.com',
    'c1234@".com',
    'hyt@email.123',
  ])('should return false because the passed string does not match the pattern of the email field', (value) => {
    expect(isEmail(value)).toBeFalsy();
  });

  it.each([
    'a@email.com',
    'gtyp23@mail.kz',
    '_john0992_@mail.kz',
    '1129sam@inbox.org',
    '+adam+@email.ru',
  ])('%s should return true because the passed string match the pattern of the email field', (value) => {
    expect(isEmail(value)).toBeTruthy();
  });
});

describe('longerOrEqualThan3 tests', () => {
  it('should return false if the length property of the passed value is less than 3', () => {
    expect(longerOrEqualThan3('a')).toBeFalsy();
  });

  it('should return true if the length property of the passed value is equal to 3', () => {
    expect(longerOrEqualThan3('abc')).toBeTruthy();
  });

  it('should return true if the length property of the passed value is greater than 3', () => {
    expect(longerOrEqualThan3('abcdefgh')).toBeTruthy();
  });
});

describe('longerOrEqualThan5 tests', () => {
  it('should return false if the length property of the passed value is less than 5', () => {
    expect(longerOrEqualThan5('abc')).toBeFalsy();
  });

  it('should return true if the length property of the passed value is equal to 5', () => {
    expect(longerOrEqualThan5('abcde')).toBeTruthy();
  });

  it('should return true if the length property of the passed value is greater than 5', () => {
    expect(longerOrEqualThan5('abcdefghijklm')).toBeTruthy();
  });
});

describe('hasOneOrMoreDigits tests', () => {
  it('should return false if there is not at least one number in the passed value', () => {
    expect(hasOneOrMoreDigits('abc')).toBeFalsy();
  });

  it('should return true if there is at least one number in the passed value', () => {
    expect(hasOneOrMoreDigits('abcde1')).toBeTruthy();
  });
});

describe('hasOneOrMoreSpecialCharacters tests', () => {
  it('should return true if there is at least one special character in the passed value', () => {
    expect(hasOneOrMoreSpecialCharacters('abc')).toBeFalsy();
  });

  it('should return false if there is not at least one special character in the passed value', () => {
    expect(hasOneOrMoreSpecialCharacters('abc@de1')).toBeTruthy();
  });
});

describe('hasOneOrMoreLowercaseCharachers tests', () => {
  it('should return false if there is not at least one lowercase character in the passed value', () => {
    expect(hasOneOrMoreLowercaseCharachers('ABC')).toBeFalsy();
  });

  it('should return true if there is at least one lowercase character in the passed value', () => {
    expect(hasOneOrMoreLowercaseCharachers('ABCd')).toBeTruthy();
  });
});

describe('hasOneOrMoreUppercaseCharachers tests', () => {
  it('should return false if there is not at least one uppercase character in the passed value', () => {
    expect(hasOneOrMoreUppercaseCharachers('abc')).toBeFalsy();
  });

  it('should return true if there is at least one uppercase character in the passed value', () => {
    expect(hasOneOrMoreUppercaseCharachers('abcD')).toBeTruthy();
  });
});

describe('isPasswordsMatch tests', () => {
  it('should return false if the value of the first argument is not equal to the value of the second', () => {
    expect(isPasswordsMatch('abc', 'cba')).toBeFalsy();
  });

  it('should return true if the value of the first argument is equal to the value of the second', () => {
    expect(isPasswordsMatch('abba', 'abba')).toBeTruthy();
  });
});
