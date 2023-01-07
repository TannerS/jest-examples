const { testEnv } = require('../src/helper/Env');

describe('Env', () => {
  const { env } = process;

  beforeEach(() => {
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it('should work', () => {
    process.env.foo = 'test2';
    process.env.bar = 'test2';

    const results = testEnv();

    expect(results.foo).toEqual('test1');
    expect(results.bar).toEqual('test2');
  });
});
