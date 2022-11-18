/**
 * In this example, we will show what happens when we mock an entire module using a factory.
 *
 * We will test functions in FileA and mock FileB. We will set the implementations for FileB using a factory when
 * mocking entire module.
 *
 * When you mock an entire module like below, it will mock all functions in it, when you define a factory,
 * that means that implementation will be used for all test and you cannot change it
 *
 * Unless you re-import the module as an object and then spy on it *OJOSJNJOKJIHVGBJKL:"
 * :LKJIHUGVYFHJKL:":LKJHGJKL:
 *
 */

const {
  mulTen
} = require('../src/FileA');

// this is for using spies or wanting to define implementation
const { mul } = require('../src/FileB');

/*
  mocking entire module with factory. We also use requireActual to bring in original implementation (dont mock).

  Basically, we mock module FileB, and we can define implementation for functions like we do for mul. However,
  at time we may want not wanna mock all objects. So we can call in jest.requireActual('../src/FileB'); which
  will basically will bring in the original implementation and merge it with the object using ...
 */
jest.mock('../src/FileB', () => ({
  // div, add will remain the same
 ...jest.requireActual('../src/FileB'),
  // but lets re-write mul
  mul: jest.fn((a, b) => {
    return a * b * -1
  })
}));

describe('Mock entire module with factory', () => {
  beforeEach(() => {
    // https://stackoverflow.com/a/59792748/2449314
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  /*
  This example we use methods in FileA, which depend on methods form FileB, which is mocked with no implementation
 */
  it('should show what happens when you mock a module with an implementation using factory', () => {
    // here the result will consist of the mocked implementation
    const result = mul(5, 5);

    expect(result).toEqual(-25);
  });

  /*
    This example we use methods in FileA, which depend on methods form FileB, which is mocked with no implementation
   */
  it('should show what happens when you mock a module with an implementation using factory and original', () => {
    // here the result will consist of the mocked implementation
    const result = mul(5, 5);

    expect(result).toEqual(-25);

    // now lets say we dont want the mock, we can use the original this way
    const original = jest.requireActual('../src/FileB');

    const result2 = original.mul(5, 5);

    // mul got mocked with new implementation in mock factory
    expect(result2).toEqual(25);
  });

   it('should allow implementation change', () => {
     // here the result will consist of the mocked implementation
     const result = mul(5, 5);

     expect(result).toEqual(-25);

     // since we mocked the function to be same for all test, this should not work
     mul.mockImplementation((a, b) => {
       return a * b * 100;
     });

     const result2 = mul(5, 5);

     expect(result2).toEqual(2500);

     // the above works for locally, however, if the function is called inside another function, it is worth testing
     // the above implementation change has set
     const result3 = mulTen(10);

     expect(result3).toEqual(10000);
   });
});
