/**
 * Spies are powerful, on top of that, a lot of people recommend using
 * only spies and NEVER mocking entire modules unless you have too
 */

// spies have to mock objects/classes, so you cant use the object destructuring
const fileA = require('../src/helper/FileA');
// you can also still sue the method directly if wanted
const { mulTen } = require('../src/helper/FileA');

describe('All about spies', () => {
  // afterEach(() => {
  //   // restore the spy created with spyOn
  //   jest.restoreAllMocks();
  // });

  it('should spy on function but keep original implementation', () => {
    const result = mulTen(5);
    const result2 = fileA.mulTen(5);

    jest.spyOn(fileA, 'mulTen');

    // muTen can be spied on above but has default functionality
    const result3 = fileA.mulTen(5);

    expect(result).toEqual(result2);
    expect(result2).toEqual(result3);
  });

  it('should spy on function but change original implementation', () => {
    const result = mulTen(5);
    const result2 = fileA.mulTen(5);

    const mulSpy = jest.spyOn(fileA, 'mulTen').mockImplementation(input => input * 1000);

    // muTen can be spied on above but has default functionality
    const result3 = fileA.mulTen(5);

    expect(result).toEqual(result2);
    expect(result3).toEqual(5000);

    // avoid pollution, can also go into the afterEach
    mulSpy.mockRestore();
  });

  it('should spy on function and check if it has been called', () => {
    const mulSpy = jest.spyOn(fileA, 'mulTen');

    expect(mulSpy).not.toHaveBeenCalled();
    /**
     * you don't need to explicitly call the spy, just as long as the method being spied on, is called,
     * but you can access that information through the spy
     */
    fileA.mulTen(10);

    expect(mulSpy).toHaveBeenCalled();
    // avoid pollution, can also go into the afterEach
    mulSpy.mockRestore();
  });
});
