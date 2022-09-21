const {
  routeValidator,
  isItAbsolute,
  resolvePath,
  fileExtname,
  readFiles,
} = require("../index");
const truePath = "C:/Users/Usuario/Git/Laboratoria/LIM018-md-links/README.md";
const relativePath = "./README.md";

describe("routeValidator", () => {
  it("should return true if the path exists", () => {
    expect(routeValidator(truePath)).toBe(true);
  });

  it("should return false if the path doesnt exists", () => {
    const fakePath = "C:/Users/Usuario/Git/Laboratoria/LIM018-md-links/README2.md";
    expect(routeValidator(fakePath)).toBe(false);
  });
});

describe("isItAbsolute, ", () => {
  it("should return true if the path is absolute", () => {
    expect(isItAbsolute(truePath)).toBe(true);
  });
  it("should return false if the path isnt absolute", () => {
    expect(isItAbsolute(relativePath)).toBe(false);
  });
});

describe("resolvePath", () => {
  it("should return the path if its absolute", () => {
    expect(resolvePath(relativePath)).toBe("C:\\Users\\Usuario\\Git\\Laboratoria\\LIM018-md-links\\README.md");
  });
});

describe("fileExtname", () => {
  it("should return true if the extension name is md", () => {
    const md = ".md";
    expect(fileExtname(relativePath)).toBe(md);
  })
});

describe("readFiles", () => {
  it("should read the content of the file", () => {
    const testPath = "./pruebasmd/readme1.md";
    const testFile = "* Usando un _módulo_ como [markdown-it]";
    expect(readFiles(testPath)).toContain(testFile);
  })
});