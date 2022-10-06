const {
  routeValidator,
  resolvePath,
  getLink,
  validateLinkStatus,
  findFilesInDir,
} = require("./index.js");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // Validando si la ruta existe, si existe verifica si es absoluta
    if (!routeValidator(path)) {
      reject(`esta ruta no es valida ${path}`);
    } else {
      const absolutePath = resolvePath(path); // convirtiendo la ruta en absoluta en caso que sea relativa
      const dir = findFilesInDir(absolutePath); // recorriendo el directorio
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
