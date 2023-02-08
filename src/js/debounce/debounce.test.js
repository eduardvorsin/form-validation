import debounce from './debounce';

jest.useFakeTimers();

describe('debounce tests', () => {
  it('should return an error if no function is passed for fn', () => {
    expect.assertions(1);

    expect(() => {
      debounce(1, 200);
    }).toThrow('the fn parameter must be a function');
  });

  it('should give an error if a non-number is passed for ms', () => {
    expect.assertions(1);

    expect(() => {
      debounce(() => { }, 'abcd');
    }).toThrow('the ms parameter must be a number');
  });

  it('should return a function that, when called, will be executed in 5 seconds', () => {
    expect.assertions(2);

    const mockFunc = jest.fn();
    const debounced = debounce(mockFunc, 5000);
    debounced();

    expect(mockFunc).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(5000);

    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});
