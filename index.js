const path = require("path"); // módulo path para trabajar con las rutas
const fs = require("fs"); // módulo de fs (para trabajar con fylesistem)
const axios = require("axios");
const { resolve } = require("path");
const route = "./test/pruebasmd/readme2.md"; // './README.md';

// • Validamos si la ruta sí existe o no
const routeValidator = (router) => fs.existsSync(router);

// const routeValidator = (router) => {
//   const existingRouter = fs.existsSync(router);
//   if (existingRouter === true) {
//     return true;
//   } else {
//     return false;
//   }
// };
// routeValidator(route);
// console.log(routeValidator(route));

// • Saber si es absoluta
const isItAbsolute = (router) => {
  if (path.isAbsolute(router)) {
    return true;
  } else {
    return false;
  }
};
//console.log(isItAbsolute(route));

// • Convertir una ruta relativa en absoluta
const resolvePath = (router) =>
  path.isAbsolute(router) ? router : path.resolve(router); // (router) => path.resolve(router);
// console.log(resolvePath(route));

// Validar si es un archivo
const statFile = (router) => fs.statSync(router).isFile();

// Validando si es un directorio
// const isItADir = (router) => fs.statSync(router).isDirectory();

// • Confirmando si el archivo tiene extesión .md
// const fileExtname = (router) => {
//   const extname = path.extname(router);
//   return extname === ".md" ? extname : false; // devuelve la extensión del archivo si es md
// };
const fileExtname = (router) => path.extname(router);
// console.log(fileExtname(route));

// • Leer el archivo
// const readFiles = (router) => {
//   if (path.extname(router) === ".md") {
//     return fs.readFileSync(route, "utf-8"); // método que lee el archivo y devuelve su contenido
//   } else {
//     return false;
//   }
// }
const readFiles = (router) => fs.readFileSync(router, "utf-8");
// console.log(readFiles(route));

// • Obtener los links
/**
 *
 * @param {string} router: ruta a
 * @returns {array}
 */
const getLink = (router) => {
  console.log("=>", router)
  const regExLinks = /(\[(.*?)\])?\(http(.*?)\)/gm; // /\[(.*?)\]\(.*?\)/gm; // expresión regular para los links
  const readingFiles = readFiles(router); // función que ya lee los archivos
  if (readingFiles === ""){
    return []
  }
  console.log("readfiles::", readingFiles);
  const linksFinder = readingFiles.match(regExLinks); // método para encontrar los match con la RegEx

  return linksFinder.map((link) => {
    return {
      href: link.substring(link.indexOf("(http") + 1, link.lastIndexOf(")")),
      text: link.slice(1, link.indexOf("]")),
      file: router,
    };
  });
};
// console.log(getLink(route));

// • Validar el estatus de los links
const validateLinkStatus = (router) => {
  const arrayLinks = getLink(router);
  return Promise.all(
    arrayLinks.map((obj) => {
      return axios
        .get(obj.href)
        .then((result) => {
          // console.log(result)
          return {
            ...obj,
            status: result.status,
            ok: result.statusText,
          };
        })
        .catch((error) => {
          // console.log(error);
          return {
            ...obj,
            status: error.errno,
            ok: "error",
          };
        });
    })
  );
};
// const err =
// validateLinkStatus(route)
//   .then((result) => {
//     console.log(result)
//   // return result
// });

// • STATS. Links únicos y totales
const statsLink = (arrayObjects) => {
  const totalLinks = arrayObjects.map((obj) => obj.href);
  const uniqueLinks = [...new Set(totalLinks)];
  return {
    TotalLinks: totalLinks.length,
    UniqueLinks: uniqueLinks.length,
  };
};
// console.log("soy la función de STATS =>", statsLink(getLink(route)));

// Links rotos
const brokenLink = (arrayObjects) => {
  //console.log(arrayObjects)
  const broken = arrayObjects.filter((obj) => obj.ok === "error").length;
  return {
    Broken: broken,
  };
};
// console.log(brokenLink(links))

// Leer directorios
const dirRoute = "C:/Users/Usuario/Git/Laboratoria/LIM018-md-links/dir";
const findFilesInDir = (dirPath) => {
  // let newArray = [];
  // if (statFile(dirPath)) {
  //   // retorna true or false
  //   if (fileExtname(dirPath) === ".md") {
  //     newArray.push(dirPath);
  //     // return newArray
  //   }
  // } else {
  //   const arrayDirectory = fs.readdirSync(dirPath);
  //   for (let i = 0; i < arrayDirectory.length; i++) {
  //     const pathAndDirectory = path.join(dirPath, arrayDirectory[i]); // path.join concatena dos rutas
  //     const readDirectorisAgain = findFilesInDir(pathAndDirectory);
  //     newArray = newArray.concat(readDirectorisAgain); //
  //   }
  // }
  // return newArray;

  let files = [];
  if (statFile(dirPath)) {
    if (fileExtname(dirPath) === ".md") {
      files.push(dirPath);
    }
  } else {
    const readDir = fs.readdirSync(dirPath); // leyendo el directorio
    return readDir
      .map((dirContent) => findFilesInDir(path.join(dirPath, dirContent)))
      .flat();
  }
  return files;
};
// console.log(findFilesInDir(dirRoute));

module.exports = {
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
};
