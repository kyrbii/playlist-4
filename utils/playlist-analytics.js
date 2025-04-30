const playlistAnalytics = { 
    getShortestSong(songs) { 
        let shortestSong = null; 
        if (songs.length > 0) { 
            shortestSong = songs[0]; 
            for (let i = 1; i < songs.length; i++) { 
                if (songs[i].duration < shortestSong.duration) { 
                    shortestSong = songs[i]; 
                } 
            } 
        } 
        return shortestSong; 
    }, 
}; 
 
module.exports = playlistAnalytics; 
