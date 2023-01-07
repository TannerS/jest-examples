// This will mock entire module, every method will be an empty method mock jest.fn
jest.mock('../../src/FileA');

const { addTen, divFive, mulTen } = require('../src/helper/FileA');

describe('how to change implementation per test', () => {
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
});
