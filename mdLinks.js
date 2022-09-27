const indexjs = require("./index.js");

const mdLinks = (path, options) => {
  // console.log(path)
  // console.log(options)
  return new Promise((resolve, reject) => {
    let links = [];
    if (!indexjs.routeValidator(path)) {
      reject(
        new Error("La ruta ingresada no existe")
      );
    }
    const absolutePath = indexjs.resolvePath(path);
    if (!indexjs.fileExtname(absolutePath)) {
      reject(new Error("No hay archivos con extensión .md"));
    }
    // const objs = indexjs.getLinks(absolutePath);

    //   if (!options.validate) {
    //     links = objs;
    //     resolve(links);
    //   }
    //   links = indexjs.validateLinkStatus(objs);
    //   resolve(links);
  });
};

module.exports = { mdLinks };