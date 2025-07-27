document.addEventListener('DOMContentLoaded', () => {
    // Playlists with song data including src and poster paths
    const playlists = {
        "top-hits": [
            { 
                title: "Closer", 
                artist: "The Chainsmokers ft. Halsey", 
                duration: "4:04", 
                src: "songs/Closer - The Chainsmokers ft Halsey.mp3",
                poster: "posters/closer.jpg"
            },
            { 
                title: "Congratulations", 
                artist: "Post Malone", 
                duration: "3:40", 
                src: "songs/Congratulations - Post Malone.mp3",
                poster: "posters/congratulations.jpg"
            },
            { 
                title: "Faded", 
                artist: "Alan Walker", 
                duration: "3:32", 
                src: "songs/Faded - Alan Walker.mp3",
                poster: "posters/faded.jpg"
            },
            { 
                title: "Let Me Love You", 
                artist: "DJ Snake ft. Justin Bieber", 
                duration: "3:25", 
                src: "songs/Let Me Love You - DJ Snake ft. Justin Bieber.mp3",
                poster: "posters/let_me_love_you.jpg"
            },
            { 
                title: "Rockabye", 
                artist: "Clean Bandit", 
                duration: "4:11", 
                src: "songs/Rockabye - Clean Bandit.mp3",
                poster: "posters/rockabye.jpg"
            }
        ],
        "chill-vibes": [
            { 
                title: "Sunset Lover", 
                artist: "Petit Biscuit", 
                duration: "3:58", 
                src: "songs/sunset-lover.mp3",
                poster: "posters/sunset_lover.jpg"
            },
            { 
                title: "Starlight", 
                artist: "Jai Wolf", 
                duration: "4:20", 
                src: "songs/starlight.mp3",
                poster: "posters/starlight.jpg"
            },
            { 
                title: "Waves", 
                artist: "Dean Lewis", 
                duration: "4:01", 
                src: "songs/waves.mp3",
                poster: "posters/waves.jpg"
            },
            { 
                title: "Ocean Eyes", 
                artist: "Billie Eilish", 
                duration: "3:21", 
                src: "songs/ocean-eyes.mp3",
                poster: "posters/ocean_eyes.jpg"
            },
            { 
                title: "Midnight City", 
                artist: "M83", 
                duration: "4:04", 
                src: "songs/midnight-city.mp3",
                poster: "posters/midnight_city.jpg"
            }
        ],
        "workout-mix": [
            { 
                title: "Titanium", 
                artist: "David Guetta ft. Sia", 
                duration: "4:05", 
                src: "songs/titanium.mp3",
                poster: "posters/titanium.jpg"
            },
            { 
                title: "Stronger", 
                artist: "Kanye West", 
                duration: "5:12", 
                src: "songs/stronger.mp3",
                poster: "posters/stronger.jpg"
            },
            { 
                title: "Can't Hold Us", 
                artist: "Macklemore & Ryan Lewis", 
                duration: "4:18", 
                src: "songs/cant-hold-us.mp3",
                poster: "posters/cant_hold_us.jpg"
            },
            { 
                title: "Power", 
                artist: "Kanye West", 
                duration: "4:52", 
                src: "songs/power.mp3",
                poster: "posters/power.jpg"
            },
            { 
                title: "Till I Collapse", 
                artist: "Eminem", 
                duration: "4:57", 
                src: "songs/till-i-collapse.mp3",
                poster: "posters/till_i_collapse.jpg"
            }
        ]
    };
    
    // Playlist descriptions
    const playlistDescriptions = {
        "top-hits": "A collection of the most popular tracks currently trending worldwide. This playlist features chart-topping hits from various artists and genres.",
        "chill-vibes": "Relax and unwind with these smooth and calming tracks. Perfect for studying, meditating, or just chilling out.",
        "workout-mix": "Pump up your workout with these high-energy tracks. Stay motivated and push through your limits with this powerful mix."
    };

    // DOM elements
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeIcon = document.getElementById('volume-icon');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');
    const songsList = document.querySelector('.songs-list');
    const playlistTitle = document.querySelector('.playlist-title');
    const playlistDescription = document.querySelector('.playlist-description');
    
    // Audio context for playing music
    const audio = new Audio();
    let currentPlaylist = "top-hits";
    let currentTrackIndex = 0;
    let isPlaying = false;
    let isShuffle = false;
    let isRepeat = false;

    // Initialize the music player
    function initPlayer() {
        renderSongsList();
        setupEventListeners();
        updatePlaylistInfo();
    }

    // Render songs list for the current playlist
    function renderSongsList() {
        songsList.innerHTML = '';
        const playlist = playlists[currentPlaylist];
        
        playlist.forEach((song, index) => {
            const songRow = document.createElement('div');
            songRow.className = 'song-row';
            songRow.dataset.index = index;
            
            // Highlight currently playing song
            if (index === currentTrackIndex) {
                songRow.classList.add('active');
            }
            
            // Create song row with poster image
            songRow.innerHTML = `
                <div class="song-num">${index + 1}</div>
                <div class="song-img" style="background-image: url('${song.poster}')"></div>
                <div class="song-details">
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
                <div class="song-duration">${song.duration}</div>
            `;
            
            songsList.appendChild(songRow);
        });
        
        // Set current song details in player
        const currentSong = playlist[currentTrackIndex];
        document.querySelector('.current-img').style.backgroundImage = `url('${currentSong.poster}')`;
        document.querySelector('.current-details .title').textContent = currentSong.title;
        document.querySelector('.current-details .artist').textContent = currentSong.artist;
        durationDisplay.textContent = currentSong.duration;
    }

    // Update playlist info in main panel
    function updatePlaylistInfo() {
        const playlist = playlists[currentPlaylist];
        
        // Calculate total playlist duration
        let totalSeconds = 0;
        playlist.forEach(song => {
            const [mins, secs] = song.duration.split(':').map(Number);
            totalSeconds += mins * 60 + secs;
        });
        const totalMins = Math.floor(totalSeconds / 60);
        const totalSecs = totalSeconds % 60;
        const totalDuration = `${totalMins}:${totalSecs < 10 ? '0' : ''}${totalSecs}`;
        
        // Update playlist info in UI
        playlistTitle.textContent = document.querySelector(`.playlist-item[data-id="${currentPlaylist}"] .playlist-name`).textContent;
        document.querySelector('.playlist-stats span:nth-child(1)').innerHTML = `<i class="fas fa-music"></i> ${playlist.length} songs`;
        document.querySelector('.playlist-stats span:nth-child(2)').innerHTML = `<i class="fas fa-clock"></i> ${totalDuration}`;
        playlistDescription.textContent = playlistDescriptions[currentPlaylist];
    }

    // Play the selected song
    function playSong(song) {
        audio.src = song.src;
        audio.play();
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        
        // Update current time display as song plays
        audio.addEventListener('timeupdate', () => {
            const currentTime = formatTime(audio.currentTime);
            currentTimeDisplay.textContent = currentTime;
            
            // Update progress bar
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
        });
    }

    // Format time in MM:SS format
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Setup all event listeners
    function setupEventListeners() {
        // Play/Pause button
        playPauseBtn.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                const currentSong = playlists[currentPlaylist][currentTrackIndex];
                playSong(currentSong);
            }
            isPlaying = !isPlaying;
        });
        
        // Previous button
        prevBtn.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex - 1 + playlists[currentPlaylist].length) % playlists[currentPlaylist].length;
            renderSongsList();
            const song = playlists[currentPlaylist][currentTrackIndex];
            playSong(song);
        });
        
        // Next button
        nextBtn.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex + 1) % playlists[currentPlaylist].length;
            renderSongsList();
            const song = playlists[currentPlaylist][currentTrackIndex];
            playSong(song);
        });
        
        // Shuffle button
        shuffleBtn.addEventListener('click', () => {
            isShuffle = !isShuffle;
            shuffleBtn.style.color = isShuffle ? 'var(--primary-light)' : 'var(--light)';
        });
        
        // Repeat button
        repeatBtn.addEventListener('click', () => {
            isRepeat = !isRepeat;
            repeatBtn.style.color = isRepeat ? 'var(--primary-light)' : 'var(--light)';
        });
        
        // Volume slider
        volumeSlider.addEventListener('input', () => {
            const volume = volumeSlider.value / 100;
            audio.volume = volume;
            
            // Update volume icon based on volume level
            if (volume > 0.66) {
                volumeIcon.className = 'volume-icon fas fa-volume-up';
            } else if (volume > 0.33) {
                volumeIcon.className = 'volume-icon fas fa-volume-down';
            } else if (volume > 0) {
                volumeIcon.className = 'volume-icon fas fa-volume-off';
            } else {
                volumeIcon.className = 'volume-icon fas fa-volume-mute';
            }
        });
        
        // Progress bar click to seek
        progressContainer.addEventListener('click', (e) => {
            const width = progressContainer.clientWidth;
            const clickX = e.offsetX;
            const percent = clickX / width;
            audio.currentTime = percent * audio.duration;
        });
        
        // Song selection in list
        songsList.addEventListener('click', (e) => {
            const songRow = e.target.closest('.song-row');
            if (songRow) {
                currentTrackIndex = parseInt(songRow.dataset.index);
                renderSongsList();
                const song = playlists[currentPlaylist][currentTrackIndex];
                playSong(song);
            }
        });
        
        // Playlist selection
        document.querySelectorAll('.playlist-item').forEach(item => {
            item.addEventListener('click', () => {
                // Update active playlist
                document.querySelectorAll('.playlist-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                
                // Change to new playlist
                currentPlaylist = item.dataset.id;
                currentTrackIndex = 0;
                
                // Update UI
                renderSongsList();
                updatePlaylistInfo();
            });
        });
        
        // Handle song ending
        audio.addEventListener('ended', () => {
            if (isRepeat) {
                // Play the same song again
                audio.currentTime = 0;
                audio.play();
            } else {
                // Move to next song
                nextBtn.click();
            }
        });
    }

    // Initialize the player
    initPlayer();
});