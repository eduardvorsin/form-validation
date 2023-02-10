export const isInputField = (input) => {
  if (input?.tagName !== 'INPUT') {
    throw new Error('the passed value must be an input element');
  }

  const { type } = input;

  const inputTypes = ['text', 'password', 'email', 'url'];
  return inputTypes.includes(type);
};

export function changePasswordVisibillity(passwordInput) {
  if (passwordInput?.tagName !== 'INPUT') {
    throw new Error('the passed value must be an input element');
  }

  if (passwordInput.type !== 'text' && passwordInput.type !== 'password') {
    throw new Error('the input passed must be either text type or password');
  }

  // eslint-disable-next-line no-param-reassign
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}
