export function showError(input, message) {
  if (input?.tagName !== 'INPUT' && !input?.length) {
    throw new Error('the passed value for first argument must be an input element');
  }

  if (typeof message !== 'string') {
    throw new Error('the passed message argument must be of string type');
  }

  const isRadioButton = Boolean(input?.length);

  const currentInput = isRadioButton ? input[0] : input;
  const closestCommonParent = currentInput.closest('.form-item');

  const prevMessage = closestCommonParent.querySelector('.error-message');

  if (prevMessage && prevMessage.textContent !== message) {
    prevMessage.textContent = message;
    return;
  }

  const errorMessage = document.createElement('p');
  const errorId = `${currentInput.id}-error`;

  errorMessage.textContent = message;
  errorMessage.classList.add('error-message');
  errorMessage.id = errorId;
  closestCommonParent.append(errorMessage);
  currentInput.setAttribute('aria-describedby', errorId);
}

