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
      <p>🔍 No se han encontrado canciones que coincidan con la búsqueda. </p>
    </div>`;
}


//mostrando estado de error
export function mostrarError(contenedor, mensaje){
    contenedor.innerHTML = `
    <div class="cajaEstado error">
      <p>⚠️<b>¡Ups! Algo salió mal: </b> ${mensaje}</p>
    </div> `;
}


//tarjetas para las canciones que se hayan encontrado:
export function mostrarTarjetas(contenedor, canciones){
    
    contenedor.innerHTML=''; //limpiamos por si hubiera algo previo

    const htmlCanciones = canciones.map((cancion) => 
        `<div class="tarjetaCancion">
        <img src="${cancion.cover}" alt="${cancion.titulo}" class="coverImg" loading="lazy"/>
        <h2 class="tituloCancion">${cancion.titulo}</h2>
        <p class="albumCancion">💿 ${cancion.album}</p>
        <p class="duracionCancion">⏱️ ${cancion.duracion}</p>${
            //control por si la canción carece de preview
            cancion.preview ? `<audio controls src="${cancion.preview}"></audio>` : `<p class="sin-audio">Sin vista previa</p>`
        }
        </div>`
    ).join(''); //esto convierte el array de strings HTML en un único string de texto

    //ahora se inyecta el HTML directo al DOM
    contenedor.innerHTML = htmlCanciones;

}