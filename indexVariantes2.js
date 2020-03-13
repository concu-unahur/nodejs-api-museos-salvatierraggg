////////////////////////////////////////datos///////////////////////////////////////
const superagent = require('superagent');

const fs = require('fs');
const LinkMuseos='https://www.cultura.gob.ar/api/v2.0/museos/?limit=29'
const LinkOrganismos='https://www.cultura.gob.ar/api/v2.0/organismos'

///////////////////////////////////////funciones/////////////////////////////////////


function ejecutar(donde,que) {
  superagent
    .get(donde)
    .query({ format: 'json' })
    .end(que)
}


function imprimirMuseos(error, respuesta) {
  if (error) {
    throw new Error('algo se rompió', error);
  }
  var i=0;
  
  const cantidad = respuesta.body.count;
  const museos = respuesta.body.results;

  
  console.log(`Se encontraron ${cantidad} museos.`);
  console.log(`El primer museo se llama ${museos[0].nombre}.`)

  var contenidoLista=[];
  
  for (const m of museos) {
    
    contenidoLista.push(`${i+1}° ${comprobarContenido(m.nombre)} (${comprobarContenido(m.direccion)})    Por cualquier consulta comunicarse al TELEFONO: ${comprobarContenido(m.telefono)} \n`)  
   
    i++
  }

  fs.appendFile(`Museos_&_Organimsos.txt`, contenidoLista.join(""), verificar)
  

i=0;
    
}

function imprimirOrganismos(error, respuesta) {
  if (error) {
    throw new Error('algo se rompió', error);
  }
  var i=0;
 
  const organismo = respuesta.body.results;
  
  
  var contenidoLista=[];

  for (const o of organismo) {
    
    contenidoLista.push(`Organismo: ${comprobarContenido(o.nombre)} (${comprobarContenido(o.direccion)})    Por cualquier consulta comunicarse al :${comprobarContenido(o.telefono)}\n`)  
    i++
  }

  fs.writeFile(`Museos_&_Organimsos.txt`, contenidoLista.join(""), ejecutar(LinkMuseos,imprimirMuseos))
  
  i=0;   
}

function comprobarContenido(tal){
  if (tal =="")
    return "dato no encontrado"
  return tal
}

function verificar(error) {
  if (error) {
    throw new Error('algo salio mal', error);
  }

  console.log('todo bien')
}




/////////////////////////////////////////ejecutando///////////////////////

ejecutar(LinkOrganismos,imprimirOrganismos)


