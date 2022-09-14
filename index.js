// module.exports = () => {
//   // ...
// };

const path = require("path"); // módulo path para trabajar con las rutas
const fs = require("fs"); // módulo de fs (para trabajar con fylesistem)
// console.log("Mmm gracioso, pero no gracioso de risa, gracioso de raro");
const route = "./README.md";

// const mdLinks = (route) => {
// }

// • Validamos si la ruta sí existe o no
const routeValidator = (route) => {
  const existingRoute = fs.existsSync(route);

  if (existingRoute === true) {
    console.log("Pues sí existe");
  } else {
    console.log("Pues no existe");
  }
};
routeValidator(route);

// • Saber si es absoluta
// • Si no es absoluta, convertirla
const isItAbsolute = (route) => {
  if (path.isAbsolute(route)) {
    return true;
  } else {
    return path.resolve(route); // convierte la ruta en absoluta
  }
  // const mightBeAbsolute = path.isAbsolute(route);
  // return mightBeAbsolute;
};
console.log(isItAbsolute(route));

// • Confirmando si el archivo tiene extesión .md
const mdRoute = (route) => {
  return path.extname(route); // arroja la extensión del archivo
};
console.log(mdRoute(route));

// • Leer el archivo
// if (path.extname(route) === ".md") {
//   return fs.readFileSync(route, "utf-8");
// } else {
//   return "Error";
// }