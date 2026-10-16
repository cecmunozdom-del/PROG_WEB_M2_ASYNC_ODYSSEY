import { fetchCanciones } from './api.js';
import { transformCancion, filtrandoCanciones } from './logic.js';

async function prueba() {
  try {
    //Pedimos datos a la API
    const datos = await fetchCanciones();

    //Transformamos con .map()
    const datosLimpios = transformCancion(datos);
    console.log('1. Canciones limpias y transformadas:', datosLimpios);

    // 3. Probamos filtrar buscando la palabra "Love"
    const datosBusqueda = filtrandoCanciones(datosLimpios, 'love');
    console.log('2. Canciones que contienen la palabra "Love":', datosBusqueda);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

prueba();