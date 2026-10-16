//Funciones importadas
import { fetchCanciones } from './api.js';
import { transformCancion, filtrandoCanciones } from './logica.js';
import { mostrarCargando, mostrarVacio, mostrarError, mostrarTarjetas } from './render.js';

let listaCanciones = []; //lista global de canciones para guardar las ya "limpias"


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

    //las "limpiamos" con la función de logic:
    listaCanciones = transformCancion(cancionesBruto);

    //ocultamos el mensaje de carga
    contenedorEstado.innerHTML = '';

    //ponemos las tarjetas de las canciones que hayan salido
    mostrarTarjetas(contenedorCanciones, listaCanciones);

  } catch (error){
    mostrarError(contenedorEstado, error.message);
  }

  //EVENTOS
  //búsqueda en tiempo real
  inputBuscador.addEventListener('input', (evento) => {

    //le pasamos el texto introducido para que filtre todas las canciones
    const textoBuscado = evento.target.value;
    const cancionesFiltradas = filtrandoCanciones(listaCanciones,textoBuscado);

    //si no se encuentran mostramos el mensaje correspondiente
    if(cancionesFiltradas.length === 0){
      contenedorCanciones.innerHTML = ''; //limpio de canciones anteriores
      mostrarVacio(contenedorEstado);
    }else{
      contenedorEstado.innerHTML = ''; //quitamos los mensajes que hubiera
      mostrarTarjetas(contenedorCanciones, cancionesFiltradas);
    }

  });

  //evento botón de limpiar caché  
  botonCache.addEventListener('click', () => {
    localStorage.clear(); //se vacía la memoria que estuviese guardada del navegador
    window.alert("Caché eliminada.")
    window.location.reload(); //recarga la página web 
  });
}

iniciarApp();