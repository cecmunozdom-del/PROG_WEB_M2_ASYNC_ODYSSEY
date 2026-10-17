export function transformCanciones(canciones){
  //comrpueba si canciones realmente es un array
  if(!Array.isArray(canciones)) return [];  //devuelve un array vacío si no

  // corrección -> deduplicación con Set en vez de Reduce
  const titulosVistos = new Set(); //set -> solo permite guardar valores únicos
  const cancionesUnicas = [];

  for (const cancion of canciones) {
    const tituloLimpio = cancion.trackName ? cancion.trackName.trim().toLowerCase() : '';
    
    //verificamos que si el título ya se había registrado en el set
    if (tituloLimpio && !titulosVistos.has(tituloLimpio)) {
      titulosVistos.add(tituloLimpio); //si no estaba lo gaurdamos en el set
      cancionesUnicas.push(cancion); //y como es único lo añadimos a este array
    }
  }

  //MAP para limpiar los datos del todo:
  return cancionesUnicas.map((cancion) => {

    //converisón de milisegundos a minutos:segundos
    const tiempoMilisegundos = Number(cancion.trackTimeMillis) ||0; //control de error por si trackTimeMillis falla
    const segundosTotales = Math.floor(tiempoMilisegundos/1000);
    const minutos = Math.floor(segundosTotales/60);
    const segundos = String(segundosTotales % 60).padStart(2, '0');
    //padStart -> cuando los segundos sean de un dígito le pone un 0 delante
    //esto recibe String por lo tanto calculamos el resto (los segundos) y lo transformamos

    //para los audio previews -> por si busca con http, lo cambiamos a https
    let audioUrl = cancion.previewUrl || '';
    if (audioUrl.startsWith('http://')) {
      audioUrl = audioUrl.replace('http://', 'https://');
    }

    //por cada canción devolvemos un objeto con estas características:
    //inclusión de datos por defecto por si falla alguno
    return {
      id: cancion.trackId || 'Sin ID',
      titulo: cancion.trackName || 'Sin título', // Sin escapar aquí para no romper el filtro
      album: cancion.collectionName || 'Álbum desconocido',
      cover: cancion.artworkUrl100 || '',
      duracion: `${minutos}:${segundos}`,
      preview: audioUrl
    };

  });
}


export function filtrandoCanciones(canciones, queryPedida=''){

  if(!Array.isArray(canciones)) return [];

  const cancionPedida = queryPedida.trim().toLowerCase(); //quitamos espacios y mayúsculas
  if(!cancionPedida) return canciones; //si no hay búsqueda devuelvo todas las canciones

  //filtro por todas las canciones del array si se cumple la condición (devuelve un nuevo array)
  return canciones.filter((cancion) => {
    const titulo = cancion.titulo ? cancion.titulo.toLowerCase() : '';
    const album = cancion.album ? cancion.album.toLowerCase() : '';

    //comprobamos si se ha pedido una canción concreta o un álbum
    const coincideTitulo = titulo.includes(cancionPedida);
    const coincideAlbum = album.includes(cancionPedida);

    return coincideTitulo || coincideAlbum;
  });

}
  
  