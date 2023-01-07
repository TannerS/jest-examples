/**
 * These examples are best read and done down in order to see a continuous scenario
 */

const { mul } = require('../src/helper/FileB');
const { addTen, divFive, mulTen } = require('../src/helper/FileA');

// This will mock entire module, every method will be an empty method mock jest.fn
jest.mock('../../src/FileA');
// this is mocking entire module with setting implementation of mul
jest.mock('../../src/FileB', () => ({
  mul: jest.fn((a, b) => {
    return a * b * -1
  })
}));

describe('how to change implementation per test', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should have all module methods mocked to empty function', () => {
    // should be empty mock
    expect(addTen()).toBeUndefined();
    expect(divFive()).toBeUndefined();
    expect(mulTen()).toBeUndefined();
  });

  it('should change implementation of addTen', () => {
    // should be empty mock
    expect(addTen()).toBeUndefined();
    expect(divFive()).toBeUndefined();
    expect(mulTen()).toBeUndefined();

    // all jest.fn mocks have all mock functions, including mockImplementation to set an implementation
    addTen.mockImplementation(() => 10000);

    expect(addTen()).toEqual(10000);
  });

  it('should change implementation of factory mock', () => {
    expect(mul(2, 5)).toEqual(-10);

    mul.mockImplementation((a, b) => a * b * 5);

    expect(mul(2, 5)).toEqual(50);
  });
});
