const path = require('path'); // módulo path para trabajar con las rutas
const fs = require('fs'); // módulo de fs (para trabajar con fylesistem)
const route = './README.md';
// const fakePath = './README2.md' // fake path para los test

// • Validamos si la ruta sí existe o no
const routeValidator = (router) => {
  const existingRouter = fs.existsSync(router);
  // console.log(existingRouter)
  if (existingRouter === true) {
    //console.log('Pues sí existe');
    return true;
  } else {
    //console.log("Pues no existe");
    return false;
  }
};
routeValidator(route);
console.log(routeValidator(route));

// • Saber si es absoluta
// • Si no es absoluta, convertirla
const isItAbsolute = (router) => {
  if (path.isAbsolute(router)) {
    return true;
  } else {
    return path.resolve(router); // convierte la ruta en absoluta
  }
};
isItAbsolute(route);
console.log(isItAbsolute(route));

// • Confirmando si el archivo tiene extesión .md
const fileExtname = (router) => {
  const extname = path.extname(router);
  return extname === ".md" ? extname : false; // devuelve la extensión del archivo si es md
  // return path.extname(router); // arroja la extensión del archivo
};
fileExtname(route);
console.log(fileExtname(route));

// • Leer el archivo
// if (path.extname(route) === ".md") {
//   return fs.readFileSync(route, "utf-8");
// } else {
//   return "Error";
// }

module.exports = {
  routeValidator,
  // route,
  isItAbsolute,
  path,
  fileExtname,
  route,
};