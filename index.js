const superagent = require('superagent');

const fs = require('fs');
const original='https://www.cultura.gob.ar/api/v2.0/museos'
const completo='https://www.cultura.gob.ar/api/v2.0/museos/?limit=29'


function crearDatos(donde) {
  superagent
    .get(donde)
    .query({ format: 'json' })
    .end(imprimirMuseos)
}


function imprimirMuseos(error, respuesta) {
  if (error) {
    throw new Error('algo se rompió', error);
  }
  var i=0;
  var contenidoLista=[];
  var contenidoString="";
  const cantidad = respuesta.body.count;
  const museos = respuesta.body.results;

  
  console.log(`Se encontraron ${cantidad} museos.`);
  console.log(`El primer museo se llama ${museos[0].nombre}.`)

  for (const m of museos) {
    contenidoLista.push(`${i+1}° ${m.nombre} ${m.direccion}    Por cualquier consulta comunicarse al TELEFONO: ${m.telefono} \n`)  
   contenidoString+=`${i+1}° ${m.nombre} ${m.direccion}    Por cualquier consulta comunicarse al TELEFONO: ${m.telefono} \n`
    i++
  }
  i=0;

    console.log("en una lista lista")
    fs.writeFile('museosLista.txt', contenidoLista, verificar)
    console.log("en un solo String")
    fs.writeFile('museosString.txt', contenidoString, verificar)
}

function verificar(error) {
  if (error) {
    throw new Error('algo salio mal', error);
  }

  console.log('todo bien')
}

crearDatos(completo)

