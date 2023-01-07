const { returnTen } = require('../src/problem/Deep1');

describe('Show possible unit test problems', () => {
  it('should do test but import chain makes network / async call', () => {
    expect(returnTen()).toEqual(10);
  });
});
