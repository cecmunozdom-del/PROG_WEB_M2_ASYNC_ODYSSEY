//Funciones importadas
import { fetchCanciones } from './api.js';
import { borrarCache } from './cache.js';
import { transformCancion, filtrandoCanciones } from './logica.js';
import { mostrarCargando, mostrarVacio, mostrarError, mostrarTarjetas, limpiarEstado } from './render.js';

let listaCanciones = []; //lista global de canciones para guardar las ya "limpias"
let errorCarga = false; //corrección -> control de fallo inicial de API


//FUNCIÓN PRINCIPAL DE APP
async function iniciarApp() {
  
  //referencias a los elementos del DOM
  const inputBuscador = document.getElementById('buscador');
  const contenedorEstado = document.getElementById('contenedorEstado');
  const contenedorCanciones = document.getElementById('contenedorCanciones');
  const botonCache = document.getElementById('botonCache');

  //mostramos el estado de carga
  mostrarCargando(contenedorEstado);

  try{
    //pedimos las canciones (información en bruto)
    const cancionesBruto = await fetchCanciones();

    //las "limpiamos" con la función de logic
    listaCanciones = transformCancion(cancionesBruto);

    //usamos la función de render.js para vaciar lo que pudiera estar mostrandose sobre el estado
    limpiarEstado(contenedorEstado);
    mostrarTarjetas(contenedorCanciones, listaCanciones);

  } catch (error){
    errorCarga = true;
    mostrarError(contenedorEstado, error.message);
  }


  //EVENTOS
  //búsqueda en tiempo real
  if(inputBuscador){
    inputBuscador.addEventListener('input', (evento) => {

    //corrección -> Si la carga inicial falló, no permitimos que el input borre el mensaje de error
    if (errorCarga) return;

    //le pasamos el texto introducido para que filtre todas las canciones
    const textoBuscado = evento.target.value;
    const cancionesFiltradas = filtrandoCanciones(listaCanciones,textoBuscado);

    //si no se encuentran mostramos el mensaje correspondiente
    if(cancionesFiltradas.length === 0){
      limpiarEstado(contenedorCanciones); //limpio de canciones anteriores
      mostrarVacio(contenedorEstado);
    }else{
      limpiarEstado(contenedorEstado); //quitamos los mensajes que hubiera
      mostrarTarjetas(contenedorCanciones, cancionesFiltradas);
    }

    });
  }

  //evento botón de limpiar caché  
  if(botonCache){
    botonCache.addEventListener('click', () => {
      borrarCache();
      window.alert("Caché eliminada.")
      window.location.reload(); //recarga la página web 
    });
  }
}

iniciarApp();