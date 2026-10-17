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


//estado de carga -> spinner
export function mostrarCargando(contenedor){
    contenedor.innerHTML = `
    <div class="cajaEstado">
      <div class="spinner"></div>
      <p>Cargando discografía de Taylor Swift...</p>
    </div> `;
}


//mensaje si no se encuentran canciones
export function mostrarVacio(contenedor){
    contenedor.innerHTML = `
    <div class="cajaEstado">
      <p> No se han encontrado canciones que coincidan con la búsqueda. </p>
    </div>`;
}


//mostrando estado de error
export function mostrarError(contenedor, mensaje){
    const mensajeSeguro = escaparHTML(mensaje);
    contenedor.innerHTML = `
    <div class="cajaEstado error">
      <p>⚠️<b>¡Ups! Algo salió mal: </b> ${mensajeSeguro}</p>
      <button id="botonReintentar" class="boton" style="margin-top: 10px; font-size: 1rem;"> Reintentar </button>
    </div> `;
}


//corrección -> sirve para no manipular innerHTML desde main.js
//organización -> sólo render.js manipula la vista de la app
export function limpiarEstado(contenedor) {
  contenedor.innerHTML = '';
}


//tarjetas para las canciones que se hayan encontrado:
export function mostrarTarjetas(contenedor, canciones){
    
    contenedor.innerHTML=''; //limpiamos por si hubiera algo previo
    //control errores por si no hay canciones
    if (!canciones || canciones.length === 0) {
        mostrarVacio(contenedor); //lamará a mostrarVacio()
        return;
    }

    const htmlCanciones = canciones.map((cancion) => {
      const tituloSeguro = escaparHTML(cancion.titulo);
      const albumSeguro = escaparHTML(cancion.album);
      const coverSeguro = escaparHTML(cancion.cover);
      const previewSegura = escaparHTML(cancion.preview);

      return `<div class="tarjetaCancion">
        <img src="${coverSeguro}" alt="${tituloSeguro}" class="coverImg" loading="lazy" />
        <h2 class="tituloCancion">${tituloSeguro}</h2>
        <p class="albumCancion">💿 ${albumSeguro}</p>
        <p class="duracionCancion">⏱️ ${cancion.duracion}</p>
        ${
          previewSegura
            ? `<audio controls src="${previewSegura}"></audio>`
            : `<p class="sin-audio">Sin vista previa de audio</p>`
        }
      </div>`;
    })
    .join('');

  contenedor.innerHTML = htmlCanciones;
}