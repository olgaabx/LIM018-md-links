#!/usr/bin/env node
const [,,...args] = process.argv
console.log(`Hola mundo ${args}`)

// const process = require("process");

// const arguments = process.argv.slice(2);

// console.log(arguments);

// const process = require("process");

// const arguments = process.argv.slice(2); // array vacio donde debe ir la ruta
// const  {mdLink}= require ('./index.js');
// const {stats,broken} = require ('./md-links');

// const path = arguments[0]
//  if(arguments.length === 0){
//   console.log('Ingrese una ruta')
//  }
// // solo si pasan la ruta
// if( arguments.length ===1 ){
//     mdLink(path,{validate : false}).then((response)=>{
//       const responseArray = response.flat()
//       responseArray.forEach((element)=>{
//         console.log(element.href,element.text,element.file,'\n════════════════════════════════════════════════════════════════════════════════════ ● ════════════════════════════════════════════════════════════════════════════════════',)
//       })
//     })
//  }else if(path && arguments[1] === '--validate' && arguments[2] === '--stats'){
//   mdLink(path,{validate : true}).then((response)=>{
//     const responseArray = response.flat()
//     //console.log(responseArray)
//     console.log('Total: ',stats(path).Total,'\n','Unique: ',stats(path).Unique,'\n', 'Broken: ', broken(responseArray).Broken)
//   })

// }else if(path && arguments[1] === '--validate'){
//   mdLink(path,{validate:true}).then((response)=>{
//     const responseArray = response.flat()
//     responseArray.forEach((element)=>{
//       console.log(element.href,element.text,element.file,element.status,element.message,'\n════════════════════════════════════════════════════════════════════════════════════ ● ════════════════════════════════════════════════════════════════════════════════════',)
//     })
//   })
//   // si pasan la ruta y --stats
//  } else if(path && arguments[1] === '--stats'){
//     console.log('Total: ',stats(path).Total,'\n','Unique: ',stats(path).Unique)
//   // si pasna la ruta y --validate --stats
//  }



//console.log('no lo entiendo',path)
