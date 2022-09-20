const {
  routeValidator,
  isItAbsolute,
  path,
  fileExtname,
} = require("../index");

const relativePath = "./README.md";

describe('routeValidator', () => {
  it('should return true if the path exists', () => {
    const truePath = "C:/Users/Usuario/Git/Laboratoria/LIM018-md-links/README.md";
    expect(routeValidator(truePath)).toBe(true);
  });

  it('should return false if the path doesnt exists', () => {
    const fakePath = "C:/Users/Usuario/Git/Laboratoria/LIM018-md-links/README2.md";
    expect(routeValidator(fakePath)).toBe(false);
  });
});

describe('isItAbsolute', () => {
  it("should return false if the path isnt absolute", () => {
    expect(path.isAbsolute(relativePath)).toBe(false); // DUDAS
  });

  it('should return the path if its absolute', () => {
    expect(isItAbsolute(relativePath)).toBe("C:\\Users\\Usuario\\Git\\Laboratoria\\LIM018-md-links\\README.md");
  });
});

describe("fileExtname", () => {
  it("should return true if the extension name is md", () => {
    const md = ".md";
    expect(fileExtname(relativePath)).toBe(md);
  })
});