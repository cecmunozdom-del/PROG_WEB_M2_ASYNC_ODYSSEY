// src/logic.js

/**
 * Usa .map() para estructurar los datos que vienen de iTunes
 */
export function transformSongs(rawSongs) {
  if (!Array.isArray(rawSongs)) return [];

  return rawSongs.map((song) => {
    // Convertimos duración de milisegundos a minutos:segundos (ej: 3:54)
    const totalSeconds = Math.floor((song.trackTimeMillis || 0) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = String(totalSeconds % 60).padStart(2, '0');

    return {
      id: song.trackId,
      title: song.trackName || 'Sin título',
      album: song.collectionName || 'Álbum desconocido',
      cover: song.artworkUrl100 || '',
      duration: `${minutes}:${seconds}`,
      audioPreview: song.previewUrl || ''
    };
  });
}

/**
 * Usa .filter() para buscar por palabra clave en el título
 */
export function filterSongsByQuery(songs, query = '') {
  const cleanQuery = query.trim().toLowerCase();

  if (!cleanQuery) return songs;

  return songs.filter((song) =>
    song.title.toLowerCase().includes(cleanQuery)
  );
}