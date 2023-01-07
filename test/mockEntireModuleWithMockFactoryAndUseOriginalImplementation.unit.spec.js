const crypto = require("crypto");

jest.mock('crypto', () => {
  return {
    randomBytes: jest.fn(() => {
      return {
        toString: jest.fn(() => 'ABCD')
      }
    })
  }
});

describe('Mocking entire module with factory and using original implementation (mock per module)', () => {
  // the following is needed to make 'should use original method with doMock and local require' test case work
  // more here:
  beforeEach(() => {
    // jest.resetModules()
  });

  it('should use original method using requireActual', () => {
    const mockedCryptoBytes = crypto?.randomBytes(16).toString('hex');
    const originalCrypto = jest.requireActual('crypto');
    const originalCryptoBytes = originalCrypto?.randomBytes(16).toString('hex');

    expect(mockedCryptoBytes).toEqual('ABCD');
    expect(originalCryptoBytes).not.toEqual('ABCD');
  });

  it('should use original method with doMock and local require (mock per test)', () => {
    /**
     local require. This is needed since unlike spies, mocks work differently and modify the
     imports prior to test running

     see more: https://stackoverflow.com/a/56512217/2449314, https://stackoverflow.com/q/56496998/2449314, and https://stackoverflow.com/a/54144396/2449314
     **/
    const helmet = require("helmet");

    jest.doMock('helmet', () => {
      return {
        contentSecurityPolicy: {
          foo: 'bar',
          getDefaultDirectives: jest.fn().mockImplementation(() => ({
            'connect-src': ["'data:'", "'https:'"],
          })),
        }
      }
    });

    const originalDefaultDirectives = helmet.contentSecurityPolicy.getDefaultDirectives();

    expect(originalDefaultDirectives).toMatchObject({
        'default-src': [ "'self'" ],
        'base-uri': [ "'self'" ],
        'font-src': [ "'self'", 'https:', 'data:' ],
        'form-action': [ "'self'" ],
        'frame-ancestors': [ "'self'" ],
        'img-src': [ "'self'", 'data:' ],
        'object-src': [ "'none'" ],
        'script-src': [ "'self'" ],
        'script-src-attr': [ "'none'" ],
        'style-src': [ "'self'", 'https:', "'unsafe-inline'" ],
        'upgrade-insecure-requests': []
      }
    );
  });
});
