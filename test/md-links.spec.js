const {
  routeValidator,
  isItAbsolute,
  resolvePath,
  fileExtname,
  readFiles,
  getLink,
  // validateLinkStatus,
} = require("../index");

const truePath = "C:/Users/Usuario/Git/Laboratoria/LIM018-md-links/README.md";
const relativePath = "./test/pruebasmd/readme2.md";

describe("routeValidator", () => {
  it("should return true if the path exists", () => {
    expect(routeValidator(truePath)).toBeTruthy();
  });

  it("should return false if the path doesnt exists", () => {
    const fakePath = "C:/Users/Usuario/Git/Laboratoria/LIM018-md-links/README2.md";
    expect(routeValidator(fakePath)).toBeFalsy();
  });
});

describe("isItAbsolute, ", () => {
  it("should return true if the path is absolute", () => {
    expect(isItAbsolute(truePath)).toBeTruthy();
  });
  it("should return false if the path isnt absolute", () => {
    expect(isItAbsolute(relativePath)).toBeFalsy();
  });
});

// describe("resolvePath", () => {
//   it("should return the path if its absolute", () => {
//     expect(resolvePath(relativePath)).toBe("C:\\Users\\Usuario\\Git\\Laboratoria\\LIM018-md-links\\test\\pruebasmd\\readme2.md");
//   });
// });

describe("fileExtname", () => {
  it("should return true if the extension name is md", () => {
    const md = ".md";
    expect(fileExtname(relativePath)).toBe(md);
  })
  // it("should return false if the extension name isnt md", () => {
  //   const fakeFile = "../src/probando.js";
  //   expect(fileExtname(fakeFile)).toBeFalsy();
  // })
});

describe("readFiles", () => {
  it("should read the content of the file", () => {
    const testFile = "* [Array.prototype.sort() - MDN]";
    expect(readFiles(relativePath)).toContain(testFile);
  })
});

describe("getLink", () => {
  it("should return an array of objects", () => {
    const arrayObjects = [
      {
        file: "./test/pruebasmd/readme2.md",
        href: "https://curriculum.laboratoria.la/es/topics/javascript/04-arrays",
        text: "Arreglos",
      },
      {
        file: "./test/pruebasmd/readme2.md",
        href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/",
        text: "Array - MDN",
      },
      {
        file: "./test/pruebasmd/readme2.md",
        href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
        text: "Array.prototype.sort() - MDN",
      },
      {
        file: "./test/pruebasmd/readme2.md",
        href: "https://developer.mozill/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
        text: "Array.prototype.sort() - MALO",
      },
    ];
    expect(getLink(relativePath)).toStrictEqual(arrayObjects);
  })
});
