const limit = 100; //límite de canciones
//el search es taylor+swift, y con el entity=song solo devuelve canciones
const API_URL = `https://itunes.apple.com/search?term=taylor+swift&entity=song&limit=${limit}`;


//export: para poder exportar esta función a otros códigos del proyecto
//async: devuelve una promesa, realiza tareas asíncronas (pide datos a Internet)
export async function fetchCanciones() {
    try{
        //fetch: petición HTTP al servidor (GET a iTunes)
        //await: pausa hasta que la promesa se resuelve
        const respuesta = await fetch(API_URL); 
        if(!respuesta.ok) throw new Error (`Error de petición. Estatus: ${respuesta.status}`)

        //await: descarga y lectura también lleva tiempo
        const data = await respuesta.json(); //paso de datos a json 
        return data.results; //esto devuelve directamente el array de canciones
    
    }catch(error){
        console.error('Error de API: ' + error);
        throw error;
    }
}