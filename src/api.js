const limit = 500; //límite de canciones
//el search es taylor+swift, y con el entity=song solo devuelve canciones
const API_URL = `https://itunes.apple.com/search?term=taylor+swift&entity=song&limit=${limit}`;
const CACHE_KEY = 'taylorSongsCache';

//export: para poder exportar esta función a otros códigos del proyecto
//async: devuelve una promesa, realiza tareas asíncronas (pide datos a Internet)
export async function fetchCanciones() {

    //parte del bonus -> comprobar localStorage
    try{

        //lee el texto guardado en localStorage bajo esa clave
        const datosGuardados = localStorage.getItem(CACHE_KEY);
        if(datosGuardados){ //si hay datos...
            console.log("Cargando canciones desde localStorage...");
            return JSON.parse(datosGuardados); 
            //localStorage solo guarda cadenas de texto, con JSON.parse 
            //lo transformamos de vuelta a objeto
        }

    }catch(error){
        console.warn("No se pudo leer la caché de localStorage: ", error);
    }

    try{
        //fetch: petición HTTP al servidor (GET a iTunes)
        //await: pausa hasta que la promesa se resuelve
        const respuesta = await fetch(API_URL); 
        if(!respuesta.ok) throw new Error (`Error de petición. Estatus: ${respuesta.status}`)

        //await: descarga y lectura también lleva tiempo
        const data = await respuesta.json(); //paso de datos a json (función propia de Response (por el fetch))
        const canciones = data.results; //esto devuelve directamente el array de canciones

        //parte del bonus -> guardar en localstorage
        try{
            //convierte el array de objetos de JS a un string JSON -> objeto global JSON
            localStorage.setItem(CACHE_KEY, JSON.stringify(canciones));
            console.log("Canciones gaurdadas en localStorage.")
        }catch (err){
            console.warn("No se pudo guardar en localStorage: ", err);
        }
    
        return canciones;

    }catch(error){
        console.error('Error de API: ' + error);
        throw error;
    }
}