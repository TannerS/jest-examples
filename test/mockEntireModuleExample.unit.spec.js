/**
 * In this example, we will show what happens when we mock an entire module.
 *
 * We will test functions in FileA and mock FileB. Since we dont have any implementation set for FileB, since we mocked
 * it, it will be undefined and thus produce an undefined answer
 *
 * When you mock an entire module like below, it will mock all functions in it, and it does not come with any
 * implementation unless you do the factory method or you spy on it or you import the entire module you mocked
 * without the factory as an object and use it (see below)
 *
 */

// you can use mocked methods with or without implementation this way
const {
  mulTen
} = require('../src/FileA');

// this is for using spies or wanting to define implementation
const fileB = require('../src/FileB');
const fileC = require('../src/FileC');

jest.mock('../src/FileB');

describe('Mock entire module', () => {
  beforeEach(() => {
    // https://stackoverflow.com/a/59792748/2449314
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  /*
    This example we use methods in FileA, which depend on methods form FileB, which is mocked with no implementation
   */
  it('should show what happens when you mock a module without implementation', () => {
    const result = mulTen(5);

    expect(result).toBeUndefined();
  });

  /*
    This example we use methods in FileA. We will mock the methods used in FileB so FileA can use them with this
    new implementation
 */
  it('should show what happens when you mock a module with implementation', () => {
    // since FileB is mocked, and exported as an object, we can define implementation
    fileB.mul.mockImplementation((a, b) => {
      return a * b * 10;
    });

    const result2 = mulTen(5);

    expect(result2).toEqual(500);
  });

  /*
    This example we use methods in FileA. We will mock the methods used in FileB so FileA can use them with this
    new implementation, however this time we are using a spy
 */
  it('should show what happens when you spy on a module', () => {
    // here, fileC is NOT mocked so we will test its default implementation
    const result = fileC.sub(5, 3);

    expect(result).toEqual(2);

    // for a spy, it will return a mocked object (just like jest.fn()), however it will be mocked with the original
    // implementation. It will also allow mocked functionality with default implementation
    const subSpy = jest.spyOn(fileC, 'sub');

    // we can spy on it now, so before we re run the sub function we can check the spy if its been called
    expect(subSpy).not.toHaveBeenCalled();

    // our spy will be spying on this
    fileC.sub(5, 3);

    // now its been called
    expect(subSpy).toHaveBeenCalled();
  });

  /*
    This example we use methods in FileA. We will mock the methods used in FileB so FileA can use them with this
    new implementation, however this time we are using a spy and changing its implementation
 */
  it('should show what happens when you spy on a module and define a method implementation', () => {
    // here, fileC is NOT mocked so we will test its default implementation
    const result = fileC.sub(5, 3);

    expect(result).toEqual(2);

    // for a spy, it will return a mocked object (just like jest.fn()), however it will be mocked with the original
    // implementation until we call mockImplementation to change its default
    jest.spyOn(fileC, 'sub').mockImplementation((a, b) => a - b - 10);

    // our spy will be spying on this but we also change implementation
    const result2 = fileC.sub(5, 3);

    // see result due to new implementation
    expect(result2).toEqual(-8);
  });
});
