const logger = require('../utils/logger');
const playlistStore = require('../models/playlist-store.js');
const songStore = require('../models/song-store.js');
const playlistAnalytics = require("../utils/playlist-analytics.js"); 

const playlist = {
    async index(request, response) { 
        const playlistId = request.params.id; 
        const playlist = await playlistStore.getPlaylist(playlistId); 
        const songs = await songStore.getSongsForPlayList(playlistId); 
        logger.info('Playlist id = ' + playlistId); 
        let shortestSong = playlistAnalytics.getShortestSong(songs); 
        logger.info('Shortest song: ',  shortestSong); 
        const viewData = { 
            title: 'Playlist', 
            playlist: playlist, 
            songs: songs, 
            shortestSong: shortestSong 
        }; 
        response.render('playlist', viewData); 
    }, 
    
    
    async deleteSong(request, response) {
        const playlistId = request.params.id;
        const songId = request.params.songid;
        logger.debug(`Deleting Song ${songId} from Playlist ${playlistId}`);
        await songStore.removeSong(songId);
        response.redirect("/playlist/" + playlistId);
    },
    async addSong(request, response) {
        const playlistId = request.params.id;
        const newSong = {
            title: request.body.title,
            artist: request.body.artist,
            duration: Number(request.body.duration)
        };
        logger.debug("New Song", newSong);
        await songStore.addSong(playlistId, newSong);
        response.redirect("/playlist/" + playlistId);
    },
    async editSong(request, response) { 
        const playlistId = request.params.id; 
        const songId = request.params.songid; 
        logger.debug(`Editing Song ${songId} from Playlist ${playlistId}`); 
        let playList = await playlistStore.getPlaylist(playlistId); 
        let song = await songStore.getSong(songId); 
        logger.info("Editing song", song); 
        const viewData = { 
            title: "Edit Song", 
            playlist: playList, 
            song: song 
        }; 
        response.render("song", viewData); 
    }, 
    async updateSong(request, response) { 
        const playlistId = request.params.id; 
        const songId = request.params.songid; 
        const song = await songStore.getSong(songId); 
        const newSong = { 
            title: request.body.title, 
            artist: request.body.artist, 
            duration: Number(request.body.duration) 
        }; 
        logger.debug(`Updating Song ${songId} from Playlist ${playlistId}`); 
        await songStore.updateSong(song, newSong); 
        response.redirect("/playlist/" + playlistId); 
    } 
    
};

module.exports = playlist;
