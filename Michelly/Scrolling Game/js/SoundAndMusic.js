let audioFormat;

function setFormat() {
  // Check which format the browser can play
  let audio = new Audio();
  if (audio.canPlayType('audio/wav')) {
    audioFormat = '.wav';
  } else {
    audioFormat = '.ogg';
  }
}

function SoundOverlapsClass(filenameWithPath) {
  // Ensure that audioFormat is set before needed
  setFormat();

  let altSoundTurn = false;
  // Load the sound twice so it can play over itself when the event is triggered repeatedly. Playing the sound will alternate between the two buffers, allowing us to hear the sound overlapping itself
  let mainSound = new Audio(filenameWithPath + audioFormat);
  let altSound = new Audio(filenameWithPath + audioFormat);

  this.play = function() {
    // Ensure that each time the user triggers an event, an instance of the sound will start anew, while the second most recent instance will continue to play
    if (altSoundTurn) {
      altSound.currentTime = 0;
      altSound.play();
    } else {
      mainSound.currentTime = 0;
      mainSound.play();
    }

    altSoundTurn = !altSoundTurn;
  };
}

function BackgroundMusicClass() {
  let musicSound = null;

  this.loopSong = function(filenameWithPath) {
    // Ensure that audioFormat is set before needed
    setFormat();

    if (musicSound != null) {
      musicSound.pause();
      musicSound = null;
    }

    musicSound = new Audio(filenameWithPath + audioFormat);
    musicSound.loop = true;
    musicSound.play();
  };

  this.startOrStopMusic = function() {
    if (musicSound.paused) {
      musicSound.play();
    } else {
      musicSound.pause();
    }
  };
}
