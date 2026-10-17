//corrección importante -> para evitar inyecciones XSS 
//cómo funciona -> si la API devuelve un texto que contenga caracteres "peligrosos", los
//sustituye por su alternativa segura, evitando inyecciones
export function escaparHTML(texto) {
  if (!texto) return '';
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
//la g significa global (reemplaza todas las apariciones de ese carácter en el texto, no solo la primera)

export function transformCancion(canciones){
  //comrpueba si canciones realmente es un array
  if(!Array.isArray(canciones)) return [];  //devuelve un array vacío si no

  //REDUCE para eliminar canciones duplicadas (a veces son la misma en distinto álbum):
  const cancionesUnicas = canciones.reduce((acc, cancionActual) => {
    //comprueba que la canción actual tiene título, le quita espacios y pasa a minúscula
    const titulo = cancionActual.trackName ? cancionActual.trackName.trim().toLowerCase() : ''; 
    
    //con some mira si la canción ya está incluida en el acumulador
    const yaExiste = acc.some(
      (item) => (item.trackName ? item.trackName.trim().toLowerCase() : '') === titulo
    );

    if (titulo && !yaExiste) {
      acc.push(cancionActual);
    }
    return acc;
  }, []); //el valor inicial es el [] array vacío


  //MAP para limpiar los datos del todo:
  return canciones.map((cancion) => {

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
      id: cancion.trackId || Math.random(),
      titulo: escaparHTML(cancion.trackName || 'Sin título'),
      album: escaparHTML(cancion.collectionName || 'Álbum desconocido'),
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
  
  