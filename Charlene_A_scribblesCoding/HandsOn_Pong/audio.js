var audioFormat;
var ballHitPaddleSound;

function setFormat() {
    var audio = new Audio();
    if (audio.canPlayType("audio/mp3")) {
        audioFormat = ".mp3";
    } else {
        audioFormat = ".wav";
    }
}

function loadSounds() {
    setFormat();
    ballHitPaddleSound = new Audio("sound/ball_hit_paddle" + audioFormat);
}