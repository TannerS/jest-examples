const { subTen, addTen } = require('../src/helper/FileA');
const fileC = require('../src/helper/FileC');
// need to access the mocked method
const { add } = require('../src/helper/FileB');

jest.mock('../src/FileB', () => {
  return {
    // we dont wanna mock the other methods
    ...jest.requireActual('../src/FileB'),
    // however you do it, in this case mocking a module, you need too have the child method a spy or mock (jest.fn)
    add: jest.fn(),
  }
});

describe('test child mocking', () => {
  /**
   * The following test only works depending on how the parent imports the child,
   * please see more here https://stackoverflow.com/q/75036458/2449314
   */
  it('should validate parameters called on child function using spy', () => {
    const subSpy = jest.spyOn(fileC, 'sub');

    subTen(10);

    expect(subSpy.mock.calls[0]).toEqual([10,10]);
    expect(subSpy).toHaveBeenCalledWith(10,10);
  });

  it('should validate parameters called on child function using module mock', () => {
    addTen(10);

    expect(add.mock.calls[0]).toEqual([10,10]);
    expect(add).toHaveBeenCalledWith(10,10);
  });
});
