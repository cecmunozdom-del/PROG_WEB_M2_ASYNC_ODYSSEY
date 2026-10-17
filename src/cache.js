const CACHE_KEY = 'taylorSongsCache'; //identificador de datos guardados en localStorage
const TIEMPO_EXPIRACION = 24 * 60 * 60 * 1000; // 24 horas en milisegundos (caducidad de la caché)

export function obtenerCache(){

    try{
        //lee el texto guardado en localStorage bajo esa clave
        const datos = localStorage.getItem(CACHE_KEY);
        if(!datos) return null;

        //si hay datos...
        const objetoCache = JSON.parse(datos);
        //localStorage solo guarda cadenas de texto, con JSON.parse 
        //lo transformamos de vuelta a objeto

        //validación de timestamp y datos
        if(!objetoCache || !objetoCache.timestamp || !Array.isArray(objetoCache.data)) {
            return null;
        }

        //comprobación caché caducada
        const horaActual = new Date().getTime();
        if (horaActual - objetoCache.timestamp > TIEMPO_EXPIRACION) {
            borrarCache();
            return null;
        }

        return objetoCache.data;

    }catch(error){
        console.warn("Error al leer la caché: ", error);
        return null;
    }

}

export function guardarEnCache(datos){
    try{ //corrección -> uso de objetos guardados en caché
        const objetoGuardar = {
            timestamp : new Date().getTime(),
            data : datos
        };
        //convierte el array de objetos de JS a un string JSON -> objeto global JSON
        localStorage.setItem(CACHE_KEY, JSON.stringify(datos));
    }catch(error){
        console.warn('Error al guardar en la caché: ', error);
    }
}

export function borrarCache(){
    try{
        //uso de removeItem para no borrar cosas que no sean de localStorage
        localStorage.removeItem(CACHE_KEY);
    }catch(error){
        console.warn('Error al borrar la caché: ', error);
    }
}
