import { screen } from '@testing-library/dom';
import { hideError, showError } from './validationErrors';

describe('showError tests', () => {
  it('should return an error if the type of the first argument is not input', () => {
    expect.assertions(1);

    const unexpectedInput = document.createElement('div');

    expect(() => {
      showError(unexpectedInput, 'abc');
    }).toThrow('the passed value for first argument must be an input element');
  });

  it('should return an error if the type of the second argument is not a string', () => {
    expect.assertions(1);

    const input = document.createElement('input');

    expect(() => {
      showError(input, 12);
    }).toThrow('the passed message argument must be of string type');
  });

  it('Should create a new paragraph with an error if it does not exist yet', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="form__item form-item form-item--half">
      <div class="form-item__field-wrapper form-field-wrapper">
        <input class="form-field-wrapper__field" id="username" name="username" type="text" required minlength="3">
        <label class="form-field-wrapper__label" for="username">
          <span>
            Enter your name <span class="required-star">*</span>
          </span>
        </label>
      </div>
    </div>
    `;

    showError(screen.getByRole('textbox'), 'mock error message');

    expect(screen.getByText('mock error message')).toBeInTheDocument();
  });

  it('Should change the text in the paragraph with an error if it already exists', () => {
    expect.assertions(4);

    document.body.innerHTML = `
    <div class="form__item form-item form-item--half">
      <div class="form-item__field-wrapper form-field-wrapper">
        <input class="form-field-wrapper__field" id="username" name="username" type="text" required minlength="3">
        <label class="form-field-wrapper__label" for="username">
          <span>
            Enter your name <span class="required-star">*</span>
          </span>
        </label>
      </div>
      <p class="error-message" id="username-error">mock error message</p>
    </div>
    `;

    expect(screen.getByText('mock error message')).toBeInTheDocument();
    expect(screen.queryByText('modified mock error message')).not.toBeInTheDocument();

    showError(screen.getByRole('textbox'), 'modified mock error message');

    expect(screen.queryByText('mock error message')).not.toBeInTheDocument();
    expect(screen.getByText('modified mock error message')).toBeInTheDocument();
  });
});

describe('hideError tests', () => {
  it('should return an error if the type of the first argument is not input', () => {
    expect.assertions(1);
    const unexpectedInput = document.createElement('div');

    expect(() => {
      hideError(unexpectedInput);
    }).toThrow('the passed value must be an input element');
  });

  it('should delete the paragraph with the error if it is in the document', () => {
    expect.assertions(2);

    document.body.innerHTML = `
    <div class="form__item form-item form-item--half">
      <div class="form-item__field-wrapper form-field-wrapper">
        <input class="form-field-wrapper__field" id="username" name="username" type="text" required minlength="3">
        <label class="form-field-wrapper__label" for="username">
          <span>
            Enter your name <span class="required-star">*</span>
          </span>
        </label>
      </div>
      <p class="error-message" id="username-error">mock error message</p>
    </div>
    `;

    expect(screen.getByText('mock error message')).toBeInTheDocument();

    hideError(screen.getByRole('textbox'));

    expect(screen.queryByText('mock error message')).not.toBeInTheDocument();
  });
});
