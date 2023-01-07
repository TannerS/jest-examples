const { addTen, divFive, mulTen, subTen } = require('../src/helper/FileA');

describe('asserting multiple similar functions in a single test', () => {
  /**
   * Might not be the best example, but it works
   */
  const inputs = [
    // method, input, result
    [addTen, 10, 20],
    [divFive, 10, 2],
    [mulTen, 10, 100],
    [subTen, 10, 0],
  ];

  test.each(inputs) (
    'run function %O with input %i and expected result %i)',
     (func, input, expectedResult) => {
      const result = func(input);

      expect(expectedResult).toEqual(result);
    },
  );
});
