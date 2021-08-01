let audioFormat;
let audible = true;
let hitsound, bounceSound, scoreSound;

function setFormat() {
    var audio = new Audio();
    if (audio.canPlayType("audio/mp3")) {
        audioFormat = ".mp3";
    } else {
        audioFormat = ".ogg";
    }
}

function soundOverlapsClass(filepath) {
    setFormat();
    // private var hidden outside class
    var mainSound = new Audio(filepath+audioFormat); 
    var altSound = new Audio(filepath+audioFormat); 

    var altSoundTurn = false;

    // not private as must be called outside
    this.play = function() {
        if(altSoundTurn) {
            altSound.currentTime = 0;
            altSound.play();
        } else {
            mainSound.currentTime = 0;
            mainSound.play();
        }
        altSoundTurn = !altSoundTurn; // toggle
    }
} 
if(audible) {
    hitSound = new soundOverlapsClass('../audio/tennis_hit');
    bounceSound = new soundOverlapsClass('../audio/tennis_bounce');
    scoreSound = new soundOverlapsClass('../audio/tennis_missed');
} else {
    hitSound = new soundOverlapsClass('../audio/tennis_bounce');
    bounceSound = new soundOverlapsClass('../audio/tennis_bounce');
    scoreSound = new soundOverlapsClass('../audio/tennis_bounce');
}

function BackgroundMusicClass() {
    var musicSound = null;

    this.loopSong = function(filepath) {
        setFormat();
        // I dont understand how musicSound can be non-null here.
        if(musicSound != null) {
            musicSound.pause();
            musicSound = null;
        }
        musicSound = new Audio(filepath+audioFormat);
        musicSound.loop = true;
        musicSound.play();
    }

    this.startOrStopMusic = function() {
        if(musicSound.paused) {
            musicSound.play();
        } else {
            musicSound.pause();
        }
    }
}