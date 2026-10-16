export function transformCancion(canciones){
  //comrpueba si canciones realmente es un array
  if(!Array.isArray(canciones)) return [];  //devuelve un array vacío si no

  return canciones.map((cancion) => {

    //converisón de milisegundos a minutos:segundos
    /*
    const segundosTotales = Math.floor ((cancion.trackTimeMillis)/1000);
    const minutos = Math.floor(segundosTotales/60);
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    //padStart -> cuando los segundos sean de un dígito le pone un 0 delante
    */// esto con pinzas, quiero comprobar cómo sale sin esto
    
    //por cada canción devolvemos un objeto con estas características:
    return{
      id: cancion.trackId,
      titulo: cancion.trackName,
      album: cancion.collectionName,
      cover: cancion.artworkUrl100,
      //duracion: `${minutos}:${segundos}`,
      duracion: cancion.trackTimeMillis,
      explicito: cancion.explicitness,
      preview: cancion.previewUrl
    };

  });
}


export function filtrandoCanciones(canciones, queryCancionPedida=''){
  const cancionPedida = queryCancionPedida.trim().toLowerCase(); //quitamos espacios y mayúsculas
  if(!cancionPedida) return canciones; //si no hay búsqueda devuelvo todas las canciones

  //filtro por todas las canciones del array si se cumple la condiciçón (devuelve un nuevo array)
  return canciones.filter((cancion) => {
    return cancion.titulo.toLowerCase().includes(cancionPedida);
  });
}
  
  