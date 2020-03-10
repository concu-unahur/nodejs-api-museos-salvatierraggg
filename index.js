const superagent = require('superagent');

function imprimirMuseos(error, respuesta) {
  if (error) {
    throw new Error('algo se rompió', error);
  }

  var contenido=[];
  const cantidad = respuesta.body.count;
  const museos = respuesta.body.results;

  for (i=0;i<cantidad;i++)
   contenido.append(`${museos[i].nombre} ${museos[i].direccion}    Por cualquier consulta comunicarse al TELEFONO: ${museos[i].telefono} \n`);  

  console.log(`Se encontraron ${cantidad} museos.`);
  console.log(`El primer museo se llama ${museos[0]}.`)
}


function controlarErrores(error){
  if (error) {
    throw new Error('salio error', error);
  }
  console.log("todo bien")
}




console.log('Antes de llamar a superagent')

superagent
.get('https://www.cultura.gob.ar/api/v2.0/museos')
.query({ format: 'json' })
.end(imprimirMuseos)

console.log('Después de llamar a superagent')

