const superagent = require('superagent');

function imprimirMuseos(error, respuesta) {
  if (error) {
    throw new Error('algo se rompió', error);
  }

  //var contenido=new Array ();
  var contenido=[];
  
  const cantidad = respuesta.body.count;
  const museos = respuesta.body.results;

  
  console.log(`Se encontraron ${cantidad} museos.`);
  console.log(`El primer museo se llama ${museos[0].nombre}.`)

  for (const m of museos) {
    contenido.push(`${m.nombre} ${m.direccion}    Por cualquier consulta comunicarse al TELEFONO: ${m.telefono} \n`)  
  }
  // for (let i=0;i<cantidad;i++){
  //   console.log(`probando el ${i}`)
  //   console.log(`terminado el ${i}`)
  // };

    console.log(contenido)
  
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

