import { fetchSongs } from './api.js';
import { transformSongs, filterSongsByQuery } from './logic.js';

async function testLogic() {
  try {
    // 1. Pedimos datos a la API
    const rawData = await fetchSongs();

    // 2. Transformamos con .map()
    const cleanSongs = transformSongs(rawData);
    console.log('1. Canciones limpias y transformadas:', cleanSongs);

    // 3. Probamos filtrar buscando la palabra "Love"
    const searchResult = filterSongsByQuery(cleanSongs, 'love');
    console.log('2. Canciones que contienen la palabra "Love":', searchResult);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testLogic();