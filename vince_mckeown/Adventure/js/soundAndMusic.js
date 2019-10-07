var audioFormat;
var isMuted = false;
var soundSetforMeetings = false; //make false to hear at normal level

//sounds
var crashIntoConeSound = new SoundOverlapsClass("crashCone");
var blewUpSound = new SoundOverlapsClass("blew_up");
var explosionSound = new SoundOverlapsClass("explosion");
var engineSound = new SoundOverlapsClass("engine");
var andTheWinnerIsSound = new SoundOverlapsClass("andTheWinnerIs_01");
var comingInSecondSound = new SoundOverlapsClass("coming_in_second");
var comingInThirdSound = new SoundOverlapsClass("coming_in_third");
var comingInLastSound = new SoundOverlapsClass("coming_in_last");
var attentionDriversSound = new SoundOverlapsClass("attentiondrivers_01");
var startYourEnginesSound = new SoundOverlapsClass("startyourengines_01");
var readySetGoSound = new SoundOverlapsClass("readysetgo_01");
var finallapSound =  new SoundOverlapsClass("finallap_01");
var exhilaratingSound = new SoundOverlapsClass("exhilarating_01");
var puppyGoSound = new SoundOverlapsClass("annc_puppygo_01"); //easter egg if puggington wins
var alanZBackgroundMusic = new BackgroundMusicClass();
var carSoundList = [];

function createCarSoundList() {
	for (var i = 0; i < 8; i++){
		carSoundList[i] = new SoundOverlapsClass("annc_car_0"+(i+1));
	}
}

function setFormat() {
    var audio = new Audio();
    if (audio.canPlayType("audio/mp3")) {
		audioFormat = ".mp3";
    } else {
		audioFormat = ".ogg";
    }
}

function SoundOverlapsClass(filenameWithPath) {
    setFormat();
    var altSoundTurn = false;
    var mainSound = new Audio("sound/" + filenameWithPath + audioFormat);
    var altSound = new Audio("sound/" + filenameWithPath + audioFormat);
    
    this.play = function() {
    	if (isMuted) {
    		console.log ("sound muted");
    		return;
    	}
		if (altSoundTurn) {
			altSound.currentTime = 0;
			if(soundSetforMeetings){
				altSound.volume = 0.05;  //quieter for screen sharing during meetings
			}
			altSound.play();
		} else {
			mainSound.currentTime = 0;
			if(soundSetforMeetings){
				mainSound.volume = 0.05; //quieter for screen sharing during meetings
			}
			mainSound.play();
		}
		altSoundTurn = !altSoundTurn;
    }
}  

function BackgroundMusicClass() {
    var musicSound = null;
    this.loopSong = function(filenameWithPath) {
		setFormat();

		if (musicSound != null) {
			musicSound.pause();
			musicSound = null;
		}
		musicSound = new Audio("sound/music/" + filenameWithPath + audioFormat);
		if(soundSetforMeetings){
			musicSound.volume = 0.04; //quieter for screen sharing during meetings
		}
		musicSound.loop = true;
		musicSound.play();
    }

    this.startOrStopMusic = function() {
        if (!musicSound) {
            console.error("ERROR: musicSound not initialized before startOrStopMusic was run!");
            return; 
        }
		if (isMuted == false) {
			musicSound.play();
		} else {
			musicSound.pause();
		}
    }
}
