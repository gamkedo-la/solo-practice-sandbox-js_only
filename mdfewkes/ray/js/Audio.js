var isServer = window.location.protocol == 'file:' ? false : true;

var AudioMan = new AudioManager();
function AudioManager() {
//--//Constants-----------------------------------------------------------------
	const VOLUME_INCREMENT = 0.05;
	const DROPOFF_MIN = 20;
	const DROPOFF_MAX = 400;
	const HEADSHADOW_REDUCTION = 0.5;
	const REVERB_MAX = 5;
	//const DOPLER_SCALE = 8;

//--//Properties----------------------------------------------------------------
	var initialized = false;
	var audioCtx;
	var sfxBus, musicBus, masterBus;
	var musicVolume, sfxVolume;
	var currentMusicTrack = null;
	var currentSoundSources = [];
	var reverbBuffer = null;

	this.init = function() {
		if (initialized) return;

		if (isServer) {
			audioCtx = new window.AudioContext();
			this.context = audioCtx;
			sfxBus = audioCtx.createGain();
			musicBus = audioCtx.createGain();
			masterBus = audioCtx.createGain();

			sfxVolume = 0.7;
			musicVolume = 0.7;

			sfxBus.gain.value = sfxVolume;
			sfxBus.connect(masterBus);
			musicBus.gain.value = musicVolume;
			musicBus.connect(masterBus);
			masterBus.connect(audioCtx.destination);

			//Load reverb
			var request = new XMLHttpRequest();
			request.open('GET', "audio/reverb3.wav", true);
			request.responseType = 'arraybuffer';
			request.onload = function() {
				audio.context.decodeAudioData(request.response, function(buffer) {
					reverbBuffer = buffer;
				});
			};
			request.send();

		} else {
			console.log("Not Server: skipping WebAudioAPI");
		}

		initialized = true;
		console.log("Initialized Audio");
	};

	this.reset = function() {
		if (!initialized) return;

		for (var i = currentSoundSources.length-1; i >= 0; i--) {
		 	currentSoundSources[i].stop();
		}
		currentSoundSources.length = 0
	};

	this.update = function() {
		if (!initialized) return;

		for (var i = currentSoundSources.length-1; i >= 0; i--) {
			currentSoundSources[i].update();
			if (currentSoundSources[i].isEnded()) currentSoundSources.splice(i, 1);
		}
	};

//--//volume handling functions-------------------------------------------------
	this.toggleMute = function() {
		if (!initialized) return;

		var newVolume = (masterBus.gain.value === 0 ? 1 : 0);
		masterBus.gain.setTargetAtTime(newVolume, audioCtx.currentTime, 0.03);

		return newVolume;
	};

	this.setMute = function(tOrF) {
		if (!initialized) return;

		var newVolume = (tOrF === false ? 1 : 0);
		masterBus.gain.setTargetAtTime(newVolume, audioCtx.currentTime, 0.03);

		return newVolume;
	};

	this.setMusicVolume = function(amount) {
		if (!initialized) return;

		musicVolume = clamp(amount, 0, 1);
		musicBus.gain.setTargetAtTime(Math.pow(musicVolume, 2), audioCtx.currentTime, 0.03);

		return musicVolume;
	};

	this.setsfxVolume = function(amount) {
		if (!initialized) return;

		sfxVolume = clamp(amount, 0, 1);
		sfxBus.gain.setTargetAtTime(Math.pow(sfxVolume, 2), audioCtx.currentTime, 0.03);

		return sfxVolume;
	};

	this.turnVolumeUp = function() {
		if (!initialized) return;

		this.setMusicVolume(musicVolume + VOLUME_INCREMENT);
		this.setsfxVolume(sfxVolume + VOLUME_INCREMENT);
	};

	this.turnVolumeDown = function() {
		if (!initialized) return;

		this.setMusicVolume(musicVolume - VOLUME_INCREMENT);
		this.setsfxVolume(sfxVolume - VOLUME_INCREMENT);
	};

//--//music---------------------------------------------------------------------
	this.playMusic = function(fileNameWithPath, mixVolume = 1) {
		if (currentMusicTrack != null) {
			if (fileNameWithPath != currentMusicTrack.fileNameWithPath) {
				currentMusicTrack.stop();
				currentMusicTrack = new musicTrack(fileNameWithPath, mixVolume);
			}
		} else {
			currentMusicTrack = new musicTrack(fileNameWithPath, mixVolume);
		}
	};

	function musicTrack(fileNameWithPath, mixVolume = 1) {
		this.fileNameWithPath = fileNameWithPath;
		var audioFile = new Audio(fileNameWithPath);
		var mixVolume = mixVolume;

		audioFile.volume = mixVolume;
		audioFile.loop = true;

		if (isServer) {
			//Setup nodes
			var source = audioCtx.createMediaElementSource(audioFile);
			var gainNode = audioCtx.createGain();

			source.connect(gainNode);
			gainNode.connect(musicBus);
		}

		audioFile.play();

		this.stop = function() {
			audioFile.pause();
		}
	}

//--//sound objects-------------------------------------------------------------
	this.createSound3D = function(fileNameWithPath, parent, looping = false, mixVolume = 1, rate = 1, preservesPitch = false) {
		if (!initialized) return;

		var newSound = new Sound3D(fileNameWithPath, parent, looping, mixVolume, rate, preservesPitch);
		currentSoundSources.push(newSound);
		return newSound;
	};

	function Sound3D(fileNameWithPath, parent, looping = false, mixVolume = 1, rate = 1, preservesPitch = false) {
		this.fileNameWithPath = fileNameWithPath;
		this.mixVolume = mixVolume;
		this.rate = rate;
		this.parent = parent;
		var lastDistance = distanceBetweenTwoPoints(player, parent);;

		//Setup HTMLElement
		var audioFile = new Audio(fileNameWithPath);
		audioFile.preservesPitch = preservesPitch;
		audioFile.mozPreservesPitch = preservesPitch;
		audioFile.webkitPreservesPitch = preservesPitch;
		audioFile.playbackRate = this.rate;
		audioFile.loop = looping;
		audioFile.volume = Math.pow(this.mixVolume, 2);

		//Initialize WebAudio Elements
		var source = null;
		var gainNode = null;
		var panNode = null;
		//var verbMixNode = null;
		//var verbNode = null;

		if (isServer) {
			//Setup nodes
			source = audioCtx.createMediaElementSource(audioFile);
			gainNode = audioCtx.createGain();
			panNode = audioCtx.createStereoPanner();
			//verbMixNode = audioCtx.createGain();
			//verbNode = audioCtx.createConvolver();

			source.connect(gainNode);
			//source.connect(verbMixNode);
			//verbMixNode.connect(verbNode);
			//verbNode.connect(gainNode);
			gainNode.connect(panNode);
			panNode.connect(sfxBus);


			//Calculate volume panning and reverb
			gainNode.gain.value = calcuateVolumeDropoff(this.parent);
			//verbMixNode.gain.value = calcuateReverbPresence(this.parent);
			//if (reverbBuffer != null) verbNode.buffer = reverbBuffer;
			panNode.pan.value = calcuatePan(this.parent);
		} else {
			audioFile.volume *= calcuateVolumeDropoff(this.parent);
		}


		this.update = function() {
			audioFile.volume = Math.pow(this.mixVolume, 2);
			if (isServer) {
				gainNode.gain.value = calcuateVolumeDropoff(this.parent);
				//verbMixNode.gain.value = calcuateReverbPresence(this.parent);
				panNode.pan.value = calcuatePan(this.parent);
			} else {
				audioFile.volume *= calcuateVolumeDropoff(this.parent);
			}

			// Dopler
			//audioFile.playbackRate = this.rate;
			//var newDistance = distanceBetweenTwoPoints(player, this.parent);
			//var dopler = (lastDistance - newDistance) / DOPLER_SCALE;
			//audioFile.playbackRate *= clipBetween(Math.pow(2, (dopler/12)), 0.8, 1.2);
			//lastDistance = newDistance;
		}

		this.play = function() {
			audioFile.currentTime = 0;
			return audioFile.play();
		}

		this.stop = function() {
			return audioFile.pause();
		}

		this.getAudioFile = function() {
			return audioFile;
		}

		this.isEnded = function() {
			return audioFile.ended;
		}
	};

//--//Sound spatialization functions--------------------------------------------
	function calcuatePan(location) {
		var direction = radToDeg(player.ang + angleBetweenTwoPoints(player, location));
		while (direction >= 360) {
			direction -= 360;
		}
		while (direction < 0) {
			direction += 360;
		}

		//Calculate pan
		var pan = 0;
		if (direction <= 90) {
			pan = lerp(0, 1, direction/90);
		} else if (direction <= 180) {
			pan = lerp(1, 0, (direction-90)/90);
		} else if (direction <= 270) {
			pan = lerp(0, -1, (direction-180)/90);
		} else if (direction <= 360) {
			pan = lerp(-1, 0, (direction-270)/90);
		}

		//Proximity
		var distance = distanceBetweenTwoPoints(player, location);
		if (distance <= DROPOFF_MIN) {
			var panReduction = distance/DROPOFF_MIN;
			pan *= panReduction;
		}

		return pan;
	};

	function calcuateVolumeDropoff(location) {
		var distance = distanceBetweenTwoPoints(player, location);

		//Distance attenuation
		var newVolume = 1;
		if (distance > DROPOFF_MIN && distance <= DROPOFF_MAX) {
			newVolume = Math.abs((distance - DROPOFF_MIN)/(DROPOFF_MAX - DROPOFF_MIN) - 1);
		} else if (distance > DROPOFF_MAX) {
			newVolume = 0;
		}


		//Back of head attenuation
		var direction = radToDeg(player.ang + angleBetweenTwoPoints(player, location));
		while (direction <= 0) {
			direction += 360;
		}
		while (direction >= 360) {
			direction -= 360;
		}

		if (direction > 90 && direction <= 180) {
			newVolume *= lerp(1, HEADSHADOW_REDUCTION, (direction-90)/90);
		} else if (direction > 180 && direction <= 270) {
			newVolume *= lerp(HEADSHADOW_REDUCTION, 1, (direction-180)/90);
		}

		return Math.pow(newVolume, 2);
	};

	function calcuateReverbPresence(location) {
		var distance = distanceBetweenTwoPoints(player, location);

		var verbVolume = 0;
		verbVolume = Math.pow(distance/DROPOFF_MAX * REVERB_MAX, 1.5);

		return verbVolume;
	};

//--//Utility-------------------------------------------------------------------
	this.getList = function() {
		return currentSoundSources;
	}

}