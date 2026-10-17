const CACHE_KEY = 'taylorSongsCache'; //identificador de datos guardados en localStorage

export function obtenerCache(){

    try{
        //lee el texto guardado en localStorage bajo esa clave
        const datos = localStorage.getItem(CACHE_KEY);
        if(!datos) return null;

        //si hay datos...
        const datosParseados = JSON.parse(datos);
        //localStorage solo guarda cadenas de texto, con JSON.parse 
        //lo transformamos de vuelta a objeto

        //verificación de que es un array lo que estamos devolviendo:
        return Array.isArray(datosParseados) ? datosParseados : null;

    }catch(error){
        console.warn("Error al leer la caché: ", error);
        return null;
    }

}

export function guardarEnCache(datos){
    try{
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
