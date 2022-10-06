const {
  routeValidator,
  // isItAbsolute,
  resolvePath,
  // fileExtname,
  // readFiles,
  getLink,
  validateLinkStatus,
  // statsLink,
  // brokenLink,
  findFilesInDir,
} = require("./index.js");
// const absolutePath = "C:/Users/Usuario/Git/Laboratoria/LIM018-md-links/test/pruebasmd/readme2.md";
const dirPath = "C:/Users/Usuario/Git/Laboratoria/LIM018-md-links/dir";

const mdLinks = (path, options) => {

  return new Promise((resolve, reject) => {
    // let resolver;
    // Validando si la ruta existe, si existe verifica si es absoluta
    if (!routeValidator(path)) {
      reject(`esta ruta no es valida ${path}`);
    } else {
      // convirtiendo la ruta a absoluta
      const absolutePath = resolvePath(path); // convirtiendo la ruta en absoluta en caso que sea relativa
      // console.log(absolutePath);
      const dir = findFilesInDir(absolutePath); // recorriendo el directorio
      // console.log("dir", dir)
      // array que contiene todos los links y los recorre uno  a uno  validandolos
      const validatedLinks = dir.map((route) => {
        return validateLinkStatus(route);
      });
      if (options.validate === true) {
        Promise.all(validatedLinks).then((response) => {
          resolve(response.flat());
        });
      } else {
          const resolver = dir.map((linksFalse) => {
          return getLink(linksFalse);
        });
        resolve(resolver);
      }
    }
   // resolve(resolver)
  });
};

// mdLinks(dirPath, { validate: true })
//   .then((response) => {
//     console.log("response de la promesa de mdlinks =>", response.flat());
//   })
//   .catch((error) => {
//     console.log("este es el error de la promesa mdlinks =>", error);
//   });

module.exports = { mdLinks };
