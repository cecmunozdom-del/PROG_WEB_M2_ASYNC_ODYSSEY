const API_URL = 'https://itunes.apple.com/search?term=taylor+swift&entity=song&limit=50';

export async function fetchSongs() {
    try{
        const response = await fetch(API_URL);
        if(!response.ok) throw new Error (`Error de petición. Estatus: ${response.status}`)

        const data = await response.json(); //paso de datos a json
        return data.results; //esto devuelve directamente el array de canciones
    
    }catch(error){
        console.error('Error de API: ' + error);
        throw error;
    }
}