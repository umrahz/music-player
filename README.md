# music-player
# Beats - Professional Music Player

Beats is a sleek, modern web-based music player with playlist functionality, featuring a professional UI with eminence purple and black color scheme. This player includes all essential music playback controls, playlist management, and a responsive design.


## Features

- 🎵 **Playlist Management**: Create and switch between multiple playlists
- 🎧 **Music Playback**: Play, pause, skip tracks, and adjust volume
- ⏱️ **Automatic Duration Calculation**: Calculates total playlist duration
- 🎨 **Modern UI**: Eminence purple and black theme with gradient accents
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔀 **Playback Modes**: Shuffle and repeat functionality
- ⏩ **Progress Control**: Clickable progress bar for seeking
- 🔊 **Volume Control**: Visual feedback for volume levels
- 🖼️ **Poster Support**: Display album art for songs and playlists

## Folder Structure

```
beats/
├── index.html
├── style.css
├── script.js
├── songs/
│   ├── Closer - The Chainsmokers ft Halsey.mp3
│   ├── Congratulations - Post Malone.mp3
│   ├── Faded - Alan Walker.mp3
│   ├── Let Me Love You - DJ Snake ft. Justin Bieber.mp3
│   └── Rockabye - Clean Bandit.mp3
└── posters/
    ├── closer-poster.jpg
    ├── congratulations-poster.jpg
    ├── faded-poster.jpg
    ├── let-me-love-you-poster.jpg
    └── rockabye-poster.jpg
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of HTML/CSS/JavaScript

### Installation
1. Clone the repository:
```bash
git clone https://github.com/your-username/beats.git
cd beats
```

2. Add your music files to the `songs/` folder
3. Add poster images to the `posters/` folder
4. Update the `playlists` object in `script.js` with your actual file paths

### Running the Application
Simply open `index.html` in your web browser.

## Customizing Playlists

Edit the `playlists` object in `script.js` to add your own playlists and songs:

```javascript
const playlists = {
  "my-playlist": [
    { 
      title: "My Song", 
      artist: "My Artist", 
      duration: "3:45", 
      poster: "posters/my-poster.jpg",
      src: "songs/my-song.mp3" 
    },
    // Add more songs here
  ],
  // Add more playlists here
};
```

## Key Components

### HTML Structure
- **Top Bar**: App name and developer info
- **Left Panel**: Playlist navigation with duration info
- **Main Panel**: Playlist details and song list
- **Player Bar**: Playback controls and current song info

### CSS Features
- Eminence purple and black color scheme
- Responsive design using Flexbox and Grid
- Smooth transitions and animations
- Gradient text effects and modern UI elements

### JavaScript Functionality
- Playlist management and song playback
- Automatic duration calculation
- Shuffle and repeat modes
- Progress bar seeking
- Volume control with visual feedback

## Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Variables)
- JavaScript (ES6)
- HTML5 Audio API
- Font Awesome Icons

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request



## Connect with Developer

[GitHub](https://github.com/umrahz) | 
[LinkedIn](https://www.linkedin.com/in/umrah-zamir-44320a325/) |

