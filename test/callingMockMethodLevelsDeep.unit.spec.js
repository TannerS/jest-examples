const { generateCspNonce } = require('../src/helper/Helmet');

// im mocking a module used multiple levels deep, and not even needing to use it in this test file
jest.mock('crypto', () => {
  return {
    randomBytes: jest.fn(() => {
      return {
        toString: jest.fn(() => 'ABCD')
      }
    })
  }
});

describe('Using mock methods multiple levels deep', () => {
  it('should return mocked crypto method multiple leves deep', () => {
    expect(generateCspNonce()).toEqual('ABCD');
  });
});
