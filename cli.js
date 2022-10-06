#!/usr/bin/env node
const { mdLinks } = require("./mdLinks.js");
const {
  statsLink,
  brokenLink,
} = require("./index.js");
const process = require("process");
const { resolve } = require('path');

const options = process.argv.slice(2); // array donde ordenamos el path
// si no pasan path
const path = options[0];
if (options.length === 0) {
  console.log('Ingrese una ruta');
}
// Si pasan solo el path
if (options.length === 1) {
  mdLinks(path, { validate: false })
    .then((response) => {
      const responseArray = response.flat();
      responseArray.forEach((element) => {
        console.log(
          "",
          element.href,
          "\n",
          element.text,
          "\n",
          element.file,
          "\n",
          "\n══════════════════════════════ ● ══════════════════════════════"
        );
      });
    })
    .catch((error) => {
      console.log(error);
    });
  // path,--validate y --stats
} else if (path && options[1] === '--validate' && options[2] === '--stats') {
  mdLinks(path, { validate: true })
    .then((response) => {
      const responseArray = response.flat();
      console.log(
        " Total: ",
        statsLink(responseArray).TotalLinks,
        "\n",
        "Unique:",
        statsLink(responseArray).UniqueLinks,
        "\n",
        "Broken:",
        brokenLink(responseArray).Broken
      );
    })
    .catch((error) => {
      console.log(error);
    });
  // path y --validate
} else if (path && options[1] === '--validate') {
    mdLinks(path,{validate:true})
      .then((response)=> {
        const responseArray = response.flat()
        responseArray.forEach((element)=>{
          console.log(
            "",
            element.href,
            "\n",
            element.text,
            "\n",
            element.file,
            "\n",
            element.status,
            "\n",
            element.ok,
            "\n══════════════════════════════ ● ══════════════════════════════"
          );
        })
      })
  // path y --stats
  } else if (path && options[1] === '--stats') {
    mdLinks(path, { validate: true })
      .then((response) => {
        const responseArray = response.flat();
        console.log(
          " Total: ",
          statsLink(responseArray).TotalLinks,
          "\n",
          "Unique:",
          statsLink(responseArray).UniqueLinks
        );
      })
  }