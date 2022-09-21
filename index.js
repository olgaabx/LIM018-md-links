const path = require('path'); // módulo path para trabajar con las rutas
const fs = require('fs'); // módulo de fs (para trabajar con fylesistem)
const route = './test/pruebasmd/readme2.md'; // './README.md';

// • Validamos si la ruta sí existe o no
const routeValidator = (router) => {
  const existingRouter = fs.existsSync(router);
  if (existingRouter === true) {
    return true;
  } else {
    return false;
  }
};
// routeValidator(route);
console.log(routeValidator(route));

// • Saber si es absoluta
const isItAbsolute = (router) => {
  if (path.isAbsolute(router)) {
    return true;
  } else {
    return false
  }
};
// isItAbsolute(route);
console.log(isItAbsolute(route));

// • Convertir una ruta relativa en absoluta
const resolvePath = (router) => {
  return path.resolve(router);
}
console.log(resolvePath(route));

// • Confirmando si el archivo tiene extesión .md
const fileExtname = (router) => {
  const extname = path.extname(router);
  return extname === ".md" ? extname : false; // devuelve la extensión del archivo si es md
};
// fileExtname(route);
console.log(fileExtname(route));

// • Leer el archivo
const readFiles = (router) => {
  if (path.extname(router) === ".md") {
    return fs.readFileSync(route, "utf-8"); // método que lee el archivo y devuelve su contenido
  } else {
    return "no pasa nada";
  }
}
// readFiles(route);
// console.log(readFiles(route));

// • Obtener los links
const getLinks = (router) => {
  const regExLinks = /(\[(.*?)\])?\(http(.*?)\)/gm; // /\[(.*?)\]\(.*?\)/gm; // expresión regular para los links
  const readingFiles = readFiles(router); // función que ya lee los archivos
  const linksFinder = readingFiles.match(regExLinks); // método para encontrar los match con la RegEx

  return linksFinder.map((link) => {
    const obj = {
      href: link.substring(link.indexOf("(http") + 1, link.lastIndexOf(")")),
      text: link.slice(1, link.indexOf("]")),
      file: route,
    };
    return obj;
  });
}
console.log(getLinks(route));

module.exports = {
  routeValidator,
  isItAbsolute,
  resolvePath,
  fileExtname,
  readFiles,
};