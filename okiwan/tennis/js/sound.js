// Sound effects
var bloop = null;
var goal = null;

var supportedAudioFormat;

function setFormat() {
  var audio = new Audio();

  if (audio.canPlayType("audio/mp3")) {
    audioFormat = ".mp3";
  } else {
    audioFormat = ".ogg";
  }
}

function SoundOverlapsClass() {
  this.load = function(filenameWithPath) {
    setFormat();

    this.altSoundTurn = false;
    this.mainSound = new Audio(filenameWithPath + audioFormat);
    this.altSound = new Audio(filenameWithPath + audioFormat);
  }

  this.play = function() {
    if (this.altSoundTurn) {
      this.altSound.currentTime = 0;
      this.altSound.play();
    } else {
      this.mainSound.currentTime = 0;
      this.mainSound.play();
    }

    this.altSoundTurn = !this.altSoundTurn;
  }
}

