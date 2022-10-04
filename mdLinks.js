const indexjs = require("./index.js");

const mdLinks = (path, options) => {
  // console.log(path)
  // console.log(options)
  return new Promise((resolve, reject) => {
    let links = [];
    // Validando si la ruta existe, si existe verifica si es absoluta
    if (!indexjs.routeValidator(path)) {
      reject(
        new Error("La ruta ingresada no existe")
      );
    }
    // Convierte la ruta en absoluta
    const absolutePath = indexjs.resolvePath(path);
    // Validamos si es un archivo .md
    if (!indexjs.fileExtname(absolutePath)) {
      reject(new Error("No hay archivos con extensión .md"));
    }
  //   const objs = indexjs.getLinks(absolutePath);

  //     if (!options.validate) {
  //       links = objs;
  //       resolve(links);
  //     }
  //     links = indexjs.validateLinkStatus(objs);
  //     resolve(links);
  });
};

mdLinks('./test/pruebasmd/readme2.md', { validate: true, stats: false })
  .then((response) => {
    console.log('resolve de la promesa de mdlinks =>', response);
  })
  .catch((error) => {
    console.log('este es el error de la promesa mdlinks =>', error);
});

module.exports = { mdLinks };