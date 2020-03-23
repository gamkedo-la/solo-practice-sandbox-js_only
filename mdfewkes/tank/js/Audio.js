

var soundTest = new SoundOverlapsClass("./audio/threeSecondsOfSilence.mp3");

var backgroundMusic = new backgroundMusicClass();

var musicTest1 = "./audio/Tester.mp3";
var musicTest2 = "./audio/Teste2.mp3";
var musicTestSilence = "./audio/threeSecondsOfSilence.mp3";

var musicVolume = localStorage.getItem("musicVolume");
var effectsVolume = localStorage.getItem("effectsVolume");

if(musicVolume === null){
	musicVolume = 1;
}
if(effectsVolume === null){
	effectsVolume = 1;
}

var isMuted = false;
const VOLUME_INCREMENT = 0.05;

function backgroundMusicClass() {

	var musicSound = null;
	var fadeTrack = null;
	
	this.loopSong = function(filenameWithPath) {

		if (musicSound != null) {
			fadeTrack = musicSound;
			musicSound = null;
		}
		musicSound = new Audio(filenameWithPath);
		musicSound.loop = true;
		this.setVolume(musicVolume);
	}

	this.pauseSound = function() {
		musicSound.pause();
		fadeTrack.pause();
		fadeTrack = null;
	}

	this.resumeSound = function() {
		musicSound.play();
	}
	
	this.setVolume = function(volume) {
		// Multipliction by a boolean serves as 1 for true and 0 for false
		if (musicSound == null) {return;}
		musicSound.volume = Math.pow(volume * !isMuted, 2);
		
		if(musicSound.volume == 0) {
			musicSound.pause();
		} else if (musicSound.paused) {
			musicSound.play();
		}
	}

	this.updateMusic = function(frameTime) {
		if (fadeTrack != null) {
			var newVolume = fadeTrack.volume - frameTime*2;

			if(newVolume > 1.0) {
				newVolume = 1.0;
			} else if (newVolume < 0.0) {
				newVolume = 0.0;
			}

			fadeTrack.volume = newVolume;

			if (fadeTrack.volume <= 0.017) {
				fadeTrack.pause();
				fadeTrack = null;
			}
		}
	}
}

function SoundOverlapsClass(filenameWithPath) {

	var fullFilename = filenameWithPath;
	var soundIndex = 0;
	var sounds = [new Audio(fullFilename ), new Audio(fullFilename)];

	this.play = function() {
		if(!sounds[soundIndex].paused) {
			sounds.splice(soundIndex, 0, new Audio(fullFilename));
		}

		sounds[soundIndex].currentTime = 0;
		sounds[soundIndex].volume = Math.pow(getRandomVolume() * effectsVolume * !isMuted, 2);
		sounds[soundIndex].play();

		soundIndex = (++soundIndex) % sounds.length;
	}
}

function getRandomVolume(){
	var min = 0.9;
	var max = 1;
	var randomVolume = Math.random() * (max - min) + min;
	return randomVolume.toFixed(2);
}

function toggleMute() {
	isMuted = !isMuted;
	currentBackgroundMusic.setVolume(musicVolume);
}

function setEffectsVolume(amount) {
	effectsVolume = amount;
	if(effectsVolume > 1.0) {
		effectsVolume = 1.0;
	} else if (effectsVolume < 0.0) {
		effectsVolume = 0.0;
	}
}

function setMusicVolume(amount) {
	musicVolume = amount;
	if(musicVolume > 1.0) {
		musicVolume = 1.0;
	} else if (musicVolume < 0.0) {
		musicVolume = 0.0;
	}
	backgroundMusic.setVolume(musicVolume);
}

function turnVolumeUp() {
	setMusicVolume(musicVolume + VOLUME_INCREMENT);
	setEffectsVolume(effectsVolume + VOLUME_INCREMENT);
}

function turnVolumeDown() {
	setMusicVolume(musicVolume - VOLUME_INCREMENT);
	setEffectsVolume(effectsVolume - VOLUME_INCREMENT);
}