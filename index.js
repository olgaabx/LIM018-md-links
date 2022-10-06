const path = require("path"); // módulo path para trabajar con las rutas
const fs = require("fs"); // módulo de fs (para trabajar con fylesistem)
const axios = require("axios");
const { resolve } = require("path");

// • Validamos si la ruta sí existe o no
const routeValidator = (router) => fs.existsSync(router);

// • Saber si es absoluta
const isItAbsolute = (router) => {
  if (path.isAbsolute(router)) {
    return true;
  } else {
    return false;
  }
};

// • Convertir una ruta relativa en absoluta
const resolvePath = (router) => path.isAbsolute(router) ? router : path.resolve(router); // (router) => path.resolve(router);

// Validar si es un archivo
const statFile = (router) => fs.statSync(router).isFile();

// • Confirmando si el archivo tiene extesión .md
const fileExtname = (router) => path.extname(router);

// • Leer el archivo
const readFiles = (router) => fs.readFileSync(router, "utf-8"); // función que lee el archivo y devuelve su contenido

// • Obtener los links
/**
 *
 * @param {string} router: ruta enseñándole a Daniela a documentar según Nico
 * @returns {array}
 */

const getLink = (router) => {
  const regExLinks = /(\[(.*?)\])?\(http(.*?)\)/gm; // /\[(.*?)\]\(.*?\)/gm; // expresión regular para los links
  const readingFiles = readFiles(router); // función que ya lee los archivos
  if (readingFiles === ""){
    return []
  }
  const linksFinder = readingFiles.match(regExLinks); // método para encontrar los match con la RegEx

  return linksFinder.map((link) => {
    return {
      href: link.substring(link.indexOf("(http") + 1, link.lastIndexOf(")")),
      text: link.slice(1, link.indexOf("]")),
      file: router,
    };
  });
};

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

// Links rotos
const brokenLink = (arrayObjects) => {
  //console.log(arrayObjects)
  const broken = arrayObjects.filter((obj) => obj.ok === "error").length;
  return {
    Broken: broken,
  };
};

// Leer directorios
const findFilesInDir = (dirPath) => {
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
