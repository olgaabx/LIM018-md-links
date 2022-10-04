const {
  routeValidator,
  isItAbsolute,
  resolvePath,
  fileExtname,
  readFiles,
  getLink,
  validateLinkStatus,
  statsLink,
  brokenLink,
  findFilesInDir,
} = require("./index.js");
const absolutePath =
  "C:/Users/Usuario/Git/Laboratoria/LIM018-md-links/test/pruebasmd/readme2.md";
const dirPath = "C:/Users/Usuario/Git/Laboratoria/LIM018-md-links/dir";

const mdLinks = (path, options) => {
  console.log("Path", path);
  // console.log(options)
  return new Promise((resolve, reject) => {
    // let links = [];
    // Validando si la ruta existe, si existe verifica si es absoluta

    if (!routeValidator(path)) {
      reject(
        "La ruta que ingresó no existe, por favor ingrese una ruta valida"
      );
    } else {
      // convirtiendo la ruta a absoluta
      const absolutePath = resolvePath(path); // Entrando al directorio y carpetas y sacando los links
      // console.log(absolutePath);
      const dir = findFilesInDir(absolutePath);
      //console.log("Soy el dir", dir)
      // array que contiene todos los links y los recorre uno  a uno  validandolos

      const validatedLinks = dir.map((route) => {
        return validateLinkStatus(route)
        //   .then((result) => {
        //     //console.log(result)
        //     return result
        // });
      });
      // console.log("Holi", validatedLinks)
      if (options.validate === true) {
        // resolve( options.validate)
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

    // if (!indexjs.routeValidator(path)) {
    //   reject(
    //     new Error("La ruta ingresada no existe")
    //   );
    // }
    // // Convierte la ruta en absoluta
    // const absolutePath = indexjs.resolvePath(path);
    // // Validamos si es un archivo .md
    // const dir = indexjs.findFilesInDir(absolutePath);
    // resolve(dir); // con console.log no sirve el map
    // const proban2 = dir.map(route => {
    //   return indexjs.validateLinkStatus(route)
    // })
    // resolve(proban2)
    // // if (options.validate === true) {
    // //   Promise.all(proban2).then((result) => {
    // //     resolve(result.flat());
    // //   });
    // // } else {
    // //   const resolver = dir.map((linksFalse) => {
    // //     return indexjs.getLink(linksFalse);
    // //   });
    // //   resolve(resolver);
    // // }
  });
};

mdLinks(dirPath, { validate: true })
  .then((response) => {
    console.log("response de la promesa de mdlinks =>", response);
  })
  .catch((error) => {
    console.log("este es el error de la promesa mdlinks =>", error);
  });

module.exports = { mdLinks };
