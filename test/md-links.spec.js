const {
  routeValidator,
  route,
  fakePath,
  isItAbsolute
} = require("../index");
// const md = '.md'

describe('routeValidator', () => {
  it('should return true if the path exists', () => {
    // const truePath = "/c/Users/Usuario/Git/Laboratoria/LIM018-md-links";
    expect(routeValidator(route)).toBe(true);
  });
  it('should return false if the path doesnt exists', () => {
    // const fakePath = "../README2.md";
    expect(routeValidator(fakePath)).toBe(false);
  });
});

describe('isItAbsolute', () => {
  it('should return the path if its absolute', () => {
    expect(isItAbsolute(route)).toBe('C:\\Users\\Usuario\\Git\\Laboratoria\\LIM018-md-links\\README.md');
  });
});

// describe("Con readMd me devuele el tipo de extensión del archivo", () => {
//   it("me devuelve el tipo de extensión que tiene el archivo", () => [
//     expect(readMd(mdPruebaRelative)).toBe(".md"),
//   ]);
// });

