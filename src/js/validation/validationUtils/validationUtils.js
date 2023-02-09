export const isInputField = (input) => {
  if (input?.tagName !== 'INPUT') {
    throw new Error('the passed value must be an input element');
  }

  const { type } = input;

  const inputTypes = ['text', 'password', 'email', 'url'];
  return inputTypes.includes(type);
};
