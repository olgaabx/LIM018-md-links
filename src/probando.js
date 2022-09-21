const ejemplo = "somos gais";
//console.log(ejemplo.length)
//console.log(ejemplo.lastIndexOf('s'))
console.log(ejemplo.substring(6, 10));
console.log(ejemplo.substring(ejemplo.indexOf('g'), ejemplo.lastIndexOf('s') +1));

const ejemplo2 = "[recurso](https://www.youtube.com/watch?v=Lub5qOmY4JQ)";
console.log(
  ejemplo2.substring(ejemplo2.indexOf("(") +1, ejemplo2.lastIndexOf(")"))
);