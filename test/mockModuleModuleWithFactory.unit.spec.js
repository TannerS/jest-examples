const { getDefaultDirectives } = require('../src/helper/Helmet');
const helmet = require('helmet');

jest.mock('helmet', () => {
  return {
    /**
     * Mock will moc entire file, factory method will allow you to define implementation of methods here,
     * while requireActual allows you to import the entire original module (that you dont overwrite below it)
     * so in this case, with out it, all methods will be an empty jest.fn, expect for contentSecurityPolicy.
     * But with it, we are basically saying add all original module implementation expect for contentSecurityPolicy
     */
    ...jest.requireActual('helmet'),
    contentSecurityPolicy: {
      foo: 'bar',
      getDefaultDirectives: jest.fn().mockImplementation(() => ({
        'connect-src': ["'data:'", "'https:'"],
      })),
    }
  }
});

describe('Mocking entire helmet module with factory', () => {
  it('should mock module with factory calling module directly', () => {
    // used stringify due to issue with mocked functions adding more mock function breaking the matching object
    expect(JSON.stringify(helmet.contentSecurityPolicy)).toEqual(JSON.stringify({ foo: 'bar' }));
  });

  it('should mock module with factory call method within method', () => {
    const defaultDirectives = getDefaultDirectives();

    expect(defaultDirectives).toMatchObject({
      'connect-src': ["'data:'", "'https:'"],
    });
  });
});
