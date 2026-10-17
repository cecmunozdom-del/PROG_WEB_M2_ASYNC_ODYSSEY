//Funciones importadas
import { fetchCanciones } from './api.js';
import { borrarCache } from './cache.js';
import { transformCanciones, filtrandoCanciones } from './logica.js';
import { mostrarCargando, mostrarVacio, mostrarError, mostrarTarjetas, limpiarEstado } from './render.js';

let listaCanciones = []; //lista global de canciones para guardar las ya "limpias"


function registrarEventos(inputBuscador, botonCache, elementosDOM) {

  //elementosDOM me lo pasan como objeto, tengo que desestructurarlo:
  const contenedorEstado = elementosDOM.contenedorEstado;
  const contenedorCanciones = elementosDOM.contenedorCanciones;

  //búsqueda en tiempo real:
  if (inputBuscador) {
    inputBuscador.addEventListener('input', (evento) => {
      //si la API no ha cargado canciones aún, no filtramos
      if (listaCanciones.length === 0) return;

      const textoBuscado = evento.target.value; //saca el valor (texto) que ha sido buscado
      const cancionesFiltradas = filtrandoCanciones(listaCanciones, textoBuscado);

      if (cancionesFiltradas.length === 0) {
        limpiarEstado(contenedorCanciones); //limpia las tarjetas
        mostrarVacio(contenedorEstado);     //muestra el mensaje de "no encontrado"
      } else {
        limpiarEstado(contenedorEstado);    //limpia el mensaje de "no encontrado"
        mostrarTarjetas(contenedorCanciones, cancionesFiltradas);
      }
    });
  }

  // Evento del botón de limpiar caché
  if (botonCache) {
    botonCache.addEventListener('click', () => {
      borrarCache();
      window.alert('Caché eliminada con éxito.');
      window.location.reload();
    });
  }
}


async function iniciarApp() {
  const inputBuscador = document.getElementById('buscador');
  const contenedorEstado = document.getElementById('contenedorEstado');
  const contenedorCanciones = document.getElementById('contenedorCanciones');
  const botonCache = document.getElementById('botonCache');

  //mostramos el estado de carga
  mostrarCargando(contenedorEstado);

  try {
    //pedimos los datos a la API
    const cancionesBruto = await fetchCanciones();

    //limpiamos y deduplicamos con logica.js
    listaCanciones = transformCanciones(cancionesBruto);

    //renderizamos las tarjetas y quitamos los estados que hubieran
    limpiarEstado(contenedorEstado);
    mostrarTarjetas(contenedorCanciones, listaCanciones);

  } catch (error) {
    limpiarEstado(contenedorCanciones);
    mostrarError(contenedorEstado, error.message);

    //corrección -> permite al usuario pulsar "Reintentar" sin recargar toda la web
    const botonReintentar = document.getElementById('botonReintentar');
    if (botonReintentar) {
      botonReintentar.addEventListener('click', () => {
        iniciarApp();
      });
    }
  }

  registrarEventos(inputBuscador, botonCache, {
    contenedorEstado,
    contenedorCanciones
  }); //esto se lo paso como objeto (ambos contenedores)
}


iniciarApp();