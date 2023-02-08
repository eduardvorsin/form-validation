export default function debounce(fn, ms) {
  if (typeof fn !== 'function') {
    throw new Error('the fn parameter must be a function');
  }

  if (typeof ms !== 'number') {
    throw new Error('the ms parameter must be a number');
  }

  let timeout;

  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), ms);
  };
}
