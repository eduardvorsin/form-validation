import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { validateForm } from './validation/validators/validators';

describe('UI tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <form class="form" action="#" id="sign-up-form" role="form">
      <h2 class="form__title">Registration Form</h2>
      <div class="form__item form-item form-item--half">
        <div class="form-item__field-wrapper form-field-wrapper">
          <input class="form-field-wrapper__field" id="username" name="username" type="text" required minlength="3" data-testid="username">
          <label class="form-field-wrapper__label" for="username">
            <span>
              Enter your name <span class="required-star">*</span>
            </span>
          </label>
        </div>
      </div>
      <div class="form__item form-item form-item--half">
        <div class="form-item__field-wrapper form-field-wrapper">
          <input class="form-field-wrapper__field" id="email" name="email" type="email" required data-testid='email'>
          <label class="form-field-wrapper__label" for="email">
            <span>
              Enter your email <span class="required-star">*</span>
            </span>
          </label>
        </div>
      </div>
      <div class="form__item form-item">
        <div class="form-item__field-wrapper form-field-wrapper">
          <input class="form-field-wrapper__field" id="password" name="password" type="password"
            pattern="(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" minlength="5" required
            autocomplete="off" spellcheck="false" value=""
            aria-label="The password must contain one or more special characters, numeric values, lowercase and uppercase characters, lowercase and uppercase characters, and its length must be greater than or equal to 5" data-testid='password'>
          <label class="form-field-wrapper__label" for="password">
            <span>Enter your password <span class="required-star">*</span></span>
          </label>
          <button class="form-field-wrapper__show-password" type="button">
            Show password
          </button>
          <span class="form-field-wrapper__description sr-only" aria-live="polite">
            Password is hidden
          </span>
        </div>
      </div>
      <div class="form__item form-item">
        <div class="form-item__field-wrapper form-field-wrapper">
          <input class="form-field-wrapper__field" id="confirm-password" name="confirmPassword" type="password" required
            autocomplete="off" spellcheck="false" value="" data-testid='confirmPassword'>
          <label class="form-field-wrapper__label" for="confirm-password">
            <span>
              Confirm your password <span class="required-star">*</span>
            </span>
          </label>
          <button class="form-field-wrapper__show-password" type="button">
            Show password
          </button>
          <span class="form-field-wrapper__description sr-only" aria-live="polite">
            Password is hidden
          </span>
        </div>
      </div>
      <div class="form__item form-item checkbox-group">
        <label class="checkbox-group__item checkbox-item">
          <input class="checkbox-group__checkbox checkbox-item__input" id="privacy-policy" name="privacyPolicy"
            type="checkbox" required data-testid='privacyPolicy'>
          <span class="checkbox-group__box checkbox-item__box"></span>
          <span class="checkbox-group__label checkbox-item__label">I have read Privacy Policy</span>
        </label>
      </div>
      <fieldset class="form__item form-item radio-group">
        <legend class="radio-group__description">Please select the preferred way for communication</legend>
        <label class="radio-group__item radio-item">
          <input class="radio-group__radio radio-item__input" id="communication-method-email" name="communicationMethod"
            type="radio" value="email" required data-testid='radioOne'>
          <span class="radio-group__box radio-item__box"></span>
          <span class="radio-group__label form-item__label radio-item__label">Email</span>
        </label>
        <label class="radio-group__item radio-item">
          <input class="radio-group__radio radio-item__input" id="communication-method-sms" name="communicationMethod"
            type="radio" value="sms" data-testid='radioTwo'>
          <span class="radio-group__box radio-item__box"></span>
          <span class="radio-group__label form-item__label radio-item__label">SMS</span>
        </label>
      </fieldset>
      <button class="form__submit" type="submit">Submit</button>
    </form>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should show the error message if less than 3 characters were entered in the username field', async () => {
    // expect.assertions(2);
    const user = userEvent.setup();

    expect(screen.queryByText('the minimum count of char is 3')).not.toBeInTheDocument();

    await user.type(screen.getByTestId('username'), 'ab');

    validateForm(screen.getByRole('form'));

    expect(screen.getByText('the minimum count of char is 3')).toBeInTheDocument();
  });

  it('should not show the error message if a value greater than or equal to 3 was entered in the username field', async () => {
    expect.assertions(2);
    const user = userEvent.setup();

    expect(screen.queryByText('the minimum count of char is 3')).not.toBeInTheDocument();

    await user.type(screen.getByTestId('username'), 'abcdef');

    validateForm(screen.getByRole('form'));

    expect(screen.queryByText('the minimum count of char is 3')).not.toBeInTheDocument();
  });

  it('should show an error if the entered value in the email field does not match the following pattern: example@email.com', async () => {
    expect.assertions(2);
    const user = userEvent.setup();

    expect(screen.queryByText('the field input should contains following pattern: example@email.com')).not.toBeInTheDocument();

    await user.type(screen.getByTestId('email'), '@example.com');

    validateForm(screen.getByRole('form'));

    expect(screen.getByText('the field input should contains following pattern: example@email.com')).toBeInTheDocument();
  });

  it('should not show an error if the entered value in the email field matches the following pattern: examole@email.com', async () => {
    expect.assertions(2);
    const user = userEvent.setup();

    expect(screen.queryByText('the field input should contains following pattern: example@email.com')).not.toBeInTheDocument();

    await user.type(screen.getByTestId('email'), 'scv2@example.com');

    validateForm(screen.getByRole('form'));

    expect(screen.queryByText('the field input should contains following pattern: example@email.com')).not.toBeInTheDocument();
  });

  it('should show an error if the password length is less than 5', async () => {
    expect.assertions(2);
    const user = userEvent.setup();

    expect(screen.queryByText('the minimum count of char is 5')).not.toBeInTheDocument();

    await user.type(screen.getByTestId('password'), '1Aa@');

    validateForm(screen.getByRole('form'));

    expect(screen.getByText('the minimum count of char is 5')).toBeInTheDocument();
  });

  it('should not show an error if the password length is greater than or equal to 5', async () => {
    expect.assertions(2);
    const user = userEvent.setup();

    expect(screen.queryByText('the minimum count of char is 5')).not.toBeInTheDocument();

    await user.type(screen.getByTestId('password'), '1Aa@5678cc');

    validateForm(screen.getByRole('form'));

    expect(screen.queryByText('the minimum count of char is 5')).not.toBeInTheDocument();
  });

  it('should show an error if there is no numeric character in the password', async () => {
    expect.assertions(2);
    const user = userEvent.setup();

    expect(screen.queryByText('the field input should has one or more digits')).not.toBeInTheDocument();

    await user.type(screen.getByTestId('password'), '#Aa@');

    validateForm(screen.getByRole('form'));

    expect(screen.getByText('the field input should has one or more digits')).toBeInTheDocument();
  });

  it('should not show an error if there is a numeric character in the password', async () => {
    expect.assertions(2);
    const user = userEvent.setup();

    expect(screen.queryByText('the field input should has one or more digits')).not.toBeInTheDocument();

    await user.type(screen.getByTestId('password'), '1234567c');

    validateForm(screen.getByRole('form'));

    expect(screen.queryByText('the field input should has one or more digits')).not.toBeInTheDocument();
  });

  it('should show an error if there is no special character in the password', async () => {
    expect.assertions(2);
    const user = userEvent.setup();

    expect(screen.queryByText('5')).not.toBeInTheDocument();

    await user.type(screen.getByTestId('password'), 'ANM2c445');

    validateForm(screen.getByRole('form'));

    expect(screen.getByText('the field input should has one or more following characters:!@#$%^&*')).toBeInTheDocument();
  });

  it('should not show an error if there is a special character in the password', async () => {
    expect.assertions(2);
    const user = userEvent.setup();

    expect(screen.queryByText('the field input should has one or more following characters:!@#$%^&*')).not.toBeInTheDocument();

    await user.type(screen.getByTestId('password'), '#$%134F');

    validateForm(screen.getByRole('form'));

    expect(screen.queryByText('the field input should has one or more following characters:!@#$%^&*')).not.toBeInTheDocument();
  });

  it('should show an error if there is no lowercase character in the password', async () => {
    expect.assertions(2);
    const user = userEvent.setup();

    expect(screen.queryByText('the field input should has one or more lowercase characters')).not.toBeInTheDocument();

    await user.type(screen.getByTestId('password'), 'ABC$%2');

    validateForm(screen.getByRole('form'));

    expect(screen.getByText('the field input should has one or more lowercase characters')).toBeInTheDocument();
  });

  it('should not show an error if there is a lowercase character in the password', async () => {
    expect.assertions(2);
    const user = userEvent.setup();

    expect(screen.queryByText('the field input should has one or more lowercase characters')).not.toBeInTheDocument();

    await user.type(screen.getByTestId('password'), 'avcde77');

    validateForm(screen.getByRole('form'));

    expect(screen.queryByText('the field input should has one or more lowercase characters')).not.toBeInTheDocument();
  });

  it('should show an error if there is no capital character in the password', async () => {
    expect.assertions(2);
    const user = userEvent.setup();

    expect(screen.queryByText('the field input should has one or more uppercase characters')).not.toBeInTheDocument();

    await user.type(screen.getByTestId('password'), 'ayhu6%');

    validateForm(screen.getByRole('form'));

    expect(screen.getByText('the field input should has one or more uppercase characters')).toBeInTheDocument();
  });

  it('should not show an error if there is a capital character in the password', async () => {
    expect.assertions(2);
    const user = userEvent.setup();

    expect(screen.queryByText('the field input should has one or more uppercase characters')).not.toBeInTheDocument();

    await user.type(screen.getByTestId('password'), 'AGHY895');

    validateForm(screen.getByRole('form'));

    expect(screen.queryByText('the field input should has one or more uppercase characters')).not.toBeInTheDocument();
  });

  it('should show an error if the passwords don\'t match', async () => {
    expect.assertions(2);
    const user = userEvent.setup();

    expect(screen.queryByText('confirm password does not match')).not.toBeInTheDocument();

    await user.type(screen.getByTestId('password'), 'ayhu6%');
    await user.type(screen.getByTestId('confirmPassword'), 'aghtht32');

    validateForm(screen.getByRole('form'));

    expect(screen.getByText('confirm password does not match')).toBeInTheDocument();
  });

  it('should not show an error if the passwords match', async () => {
    expect.assertions(2);
    const user = userEvent.setup();

    expect(screen.queryByText('confirm password does not match')).not.toBeInTheDocument();

    await user.type(screen.getByTestId('password'), '%^213ACF');
    await user.type(screen.getByTestId('confirmPassword'), '%^213ACF');

    validateForm(screen.getByRole('form'));

    expect(screen.queryByText('confirm password does not match')).not.toBeInTheDocument();
  });

  it('should show an error if the checkbox is not checked', async () => {
    expect.assertions(2);

    expect(screen.queryByText('The checkbox must be checked')).not.toBeInTheDocument();

    validateForm(screen.getByRole('form'));

    expect(screen.getByText('The checkbox must be checked')).toBeInTheDocument();
  });

  it('should not show an error if the checkbox is checked', async () => {
    expect.assertions(2);
    const user = userEvent.setup();

    expect(screen.queryByText('The checkbox must be checked')).not.toBeInTheDocument();

    await user.click(screen.getByTestId('privacyPolicy'));

    validateForm(screen.getByRole('form'));

    expect(screen.queryByText('The checkbox must be checked')).not.toBeInTheDocument();
  });

  it('should show an error if the radio is not checked', async () => {
    expect.assertions(2);

    expect(screen.queryByText('The field must be checked')).not.toBeInTheDocument();

    validateForm(screen.getByRole('form'));

    expect(screen.getByText('The field must be checked')).toBeInTheDocument();
  });

  it('should not show an error if the radio is checked', async () => {
    expect.assertions(2);
    const user = userEvent.setup();

    expect(screen.queryByText('The field must be checked')).not.toBeInTheDocument();

    await user.click(screen.getByTestId('radioOne'));

    validateForm(screen.getByRole('form'));

    expect(screen.queryByText('The field must be checked')).not.toBeInTheDocument();
  });

  it('should be navigated correctly from the keyboard', async () => {
    expect.assertions(9);
    const user = userEvent.setup();

    await user.click(screen.getByRole('form'));
    await user.keyboard('{Tab}');

    expect(screen.getByTestId('username')).toHaveFocus();

    await user.keyboard('{Tab}');

    expect(screen.getByTestId('email')).toHaveFocus();

    await user.keyboard('{Tab}');

    expect(screen.getByTestId('password')).toHaveFocus();

    await user.keyboard('{Tab}');

    expect(screen.getAllByRole('button', { name: 'Show password' })[0]).toHaveFocus();

    await user.keyboard('{Tab}');

    expect(screen.getByTestId('confirmPassword')).toHaveFocus();

    await user.keyboard('{Tab}');

    expect(screen.getAllByRole('button', { name: 'Show password' })[1]).toHaveFocus();

    await user.keyboard('{Tab}');

    expect(screen.getByTestId('privacyPolicy')).toHaveFocus();

    await user.keyboard('{Tab}');

    expect(screen.getByTestId('radioOne')).toHaveFocus();

    await user.keyboard('{Tab}');

    expect(screen.getByRole('button', { name: 'Submit' })).toHaveFocus();
  });

  it('should be called a mock function when submitting a form in which all fields are valid', async () => {
    expect.assertions(1);
    const user = userEvent.setup();
    const mockFn = jest.fn();

    screen.getByRole('form').onsubmit = mockFn;

    await user.type(screen.getByTestId('username'), 'username');
    await user.type(screen.getByTestId('email'), 'email@example.com');
    await user.type(screen.getByTestId('password'), 'C$%25c');
    await user.type(screen.getByTestId('confirmPassword'), 'C$%25c');
    await user.click(screen.getByTestId('privacyPolicy'));
    await user.click(screen.getByTestId('radioOne'));

    screen.getByRole('form').dispatchEvent(new Event('submit'));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
