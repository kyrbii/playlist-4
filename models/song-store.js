const dataStore = require("./data-store.js");
const dataStoreClient = dataStore.getDataStore();
const logger = require("../utils/logger.js");

const songStore = {
    async getSongsForPlayList(playListId) {
        const query = 'SELECT * FROM playlist_songs WHERE playlist_id=$1';
        const values = [playListId];
        try {
            let result = await dataStoreClient.query(query, values);
            return result.rows;
        } catch (e) {
            logger.error("Error fetching songs for playlist" ,e);
        }
    },
    async removeSong(songId) {
        const query = 'DELETE FROM playlist_songs WHERE id=$1';
        const values = [songId];
        try {
            await dataStoreClient.query(query, values);
        } catch (e) {
            logger.error("Unable to remove song from playlist", e);
        };
    },
    async addSong(playlistId, newSong) {
        const query = 'INSERT INTO playlist_songs (TITLE, ARTIST, DURATION, PLAYLIST_ID) VALUES($1, $2, $3, $4)';
        const values = [newSong.title, newSong.artist, newSong.duration, playlistId];
        try {
            await dataStoreClient.query(query, values);
        } catch (e) {
            logger.error("Error adding song", e);
        }
    },
    async getSong(songId) { 
        const query = 'SELECT * FROM playlist_songs WHERE id=$1'; 
        const values = [songId]; 
        try { 
            let result = await dataStoreClient.query(query, values); 
            return result.rows[0]; 
        } catch (e) { 
            logger.error("Error fetching song" ,e); 
        } 
    }, 
    async updateSong(song, newSong) { 
        const query = "UPDATE playlist_songs SET TITLE=$1, ARTIST=$2, DURATION=$3 WHERE id=$4"; 
        const values = [newSong.title, newSong.artist, newSong.duration, song.id]; 
        try { 
            await dataStoreClient.query(query, values); 
        } catch (e) { 
            logger.error("Error updating song", e); 
        } 
    } 
    
};

module.exports = songStore;
