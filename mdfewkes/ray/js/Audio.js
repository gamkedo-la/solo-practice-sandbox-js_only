var isServer = window.location.protocol == 'file:' ? false : true;

var AudioMan = new AudioManager();
function AudioManager() {
//--//Constants-----------------------------------------------------------------
	const VOLUME_INCREMENT = 0.05;
	const DROPOFF_MIN = 30;
	const DROPOFF_MAX = 400;
	const HEADSHADOW_REDUCTION = 0.5;
	const REVERB_MAX = 5;
	const DOPLER_SCALE = 8;

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
			if (!currentSoundSources[i].getAudioFile().paused) {
				colorEmptyCircle(currentSoundSources[i].parent.pos.x, currentSoundSources[i].parent.pos.y, 1, "blue");
				colorEmptyCircle(currentSoundSources[i].pos.x, currentSoundSources[i].pos.y, 3, "green");
				colorLine(currentSoundSources[i].pos.x, currentSoundSources[i].pos.y, player.pos.x, player.pos.y, 1, "green");
			}
			if (currentSoundSources[i].isEnded()) currentSoundSources.splice(i, 1);
		}

		for (var i in currentAudGeo) {
			colorEmptyCircle(currentAudGeo[i].point.x, currentAudGeo[i].point.y, 3, "blue");
			if (lineOfSight(currentAudGeo[i].point, player.pos)) {
				colorLine(currentAudGeo[i].point.x, currentAudGeo[i].point.y, player.pos.x, player.pos.y, 1, "blue");
			}
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
		this.pos = calculatePropogationPosition(this.parent.pos);
		var looping = looping;
		var lastDistance = distanceBetweenTwoPoints(player.pos, this.pos);


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
			gainNode.gain.value = calcuateVolumeDropoff(pthis.os);
			//verbMixNode.gain.value = calcuateReverbPresence(this.pos);
			//if (reverbBuffer != null) verbNode.buffer = reverbBuffer;
			panNode.pan.value = calcuatePan(this.pos);
		} else {
			audioFile.volume *= calcuateVolumeDropoff(this.pos);
		}


		this.update = function() {
			if (audioFile.paused) return;

			//Recalculate position
			this.pos = calculatePropogationPosition(this.parent.pos);

			//Calculate volume panning and reverb
			audioFile.volume = Math.pow(this.mixVolume, 2);
			if (isServer) {
				gainNode.gain.value = calcuateVolumeDropoff(this.pos);
				//verbMixNode.gain.value = calcuateReverbPresence(this.pos);
				panNode.pan.value = calcuatePan(this.pos);
			} else {
				audioFile.volume *= calcuateVolumeDropoff(this.pos);
			}

			//Dopler
			audioFile.playbackRate = this.rate;
			var newDistance = distanceBetweenTwoPoints(player.pos, this.pos);
			var dopler = (lastDistance - newDistance) / DOPLER_SCALE;
			audioFile.playbackRate *= clamp(Math.pow(2, (dopler/12)), 0.8, 1.2);
			lastDistance = newDistance;
		}

		this.play = function() {
			//Dont play if out of range
			if (distanceBetweenTwoPoints(player.pos, this.pos) > DROPOFF_MAX && !looping) {
				return false;
			}

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
		var direction = radToDeg(-player.ang + angleBetweenTwoPoints(player.pos, location));
		if (direction >= 360) {
			direction -= 360;
		}
		if (direction < 0) {
			direction += 360;
		}

		//Calculate pan
		var pan = 0;
		if (direction + 90 <= 180) {
			pan = lerpC(-1, 1, (direction+90)/180);
		}
		if (direction + 90 > 180) {
			pan = lerpC(1, -1, (direction-90)/180);
		}

		//Proximity
		var distance = distanceBetweenTwoPoints(player.pos, location);
		if (distance <= DROPOFF_MIN) {
			var panReduction = distance/DROPOFF_MIN;
			pan *= panReduction;
		}

		return pan;
	};

	function calcuateVolumeDropoff(location) {
		var distance = distanceBetweenTwoPoints(player.pos, location);

		//Distance attenuation
		var newVolume = 1;
		if (distance > DROPOFF_MIN && distance <= DROPOFF_MAX) {
			newVolume = Math.abs((distance - DROPOFF_MIN)/(DROPOFF_MAX - DROPOFF_MIN) - 1);
		} else if (distance > DROPOFF_MAX) {
			newVolume = 0;
		}


		//Back of head attenuation
		var direction = radToDeg(-player.ang + angleBetweenTwoPoints(player.pos, location));
		if (direction <= 0) {
			direction += 360;
		}
		if (direction >= 360) {
			direction -= 360;
		}

		if (direction >= 90 && direction <= 180) {
			newVolume *= lerpC(1, HEADSHADOW_REDUCTION, (direction-90)/90);
		} else if (direction > 180 && direction <= 270) {
			newVolume *= lerpC(HEADSHADOW_REDUCTION, 1, (direction-180)/90);
		}

		return Math.pow(newVolume, 2);
	};

	function calcuateReverbPresence(location) {
		var distance = distanceBetweenTwoPoints(player.pos, location);

		var verbVolume = 0;
		verbVolume = Math.pow(distance/DROPOFF_MAX * REVERB_MAX, 1.5);

		return verbVolume;
	};

	function calculatePropogationPosition(location) {
		//Return if in line of sight
		if (lineOfSight(location, player.pos)) return location;

		//Calculate distance and select AudGeo location
		//Start with max distance and location, then update with new distance and location everytime a shorter distance is calculated
		var distance = DROPOFF_MAX;
		var pos = location;
		for (var i in currentAudGeo) {
			//If AudGeo has lineOfSight to the player, use checkAudGeo() to find the distance through the network back to the sound location
			if (lineOfSight(player.pos, currentAudGeo[i].point)) { //LineOfSight to player
				var newDistance = checkAudGeo(i, location, []); //Recursive function to find shortest distance through node netowrk
				if (newDistance < distance) { //If a shorter distance than curent holding, replace with this distance and AudGeo
					distance = newDistance;
					pos = currentAudGeo[i].point;
				}
			}
		}
		distance += distanceBetweenTwoPoints(player.pos, pos); //Add the players distance to the AudGeo's network distance

		//Calculate new location from angle and distance
		var direction = angleBetweenTwoPoints(player.pos, pos);
		var newX = Math.cos(direction) * distance + player.pos.x;
		var newY = Math.sin(direction) * distance + player.pos.y;

		var newLocation = {x:newX, y:newY};
		return newLocation;
	}

	function checkAudGeo(pointToCheck, location, pointsChecked) {
		var newPointsChecked = pointsChecked;
		newPointsChecked.push(pointToCheck); //Add curent point to checked list

		var distance = DROPOFF_MAX;
		var pos = location;

		//In line of sight to source, no more work for this branch
		if (lineOfSight(currentAudGeo[pointToCheck].point, location)) {
			return distanceBetweenTwoPoints(currentAudGeo[pointToCheck].point, location);
		}

		//Checks each connection recursively for the shortest distance to lineOfSight of the source
		for (var i in currentAudGeo[pointToCheck].connections) {
			//Skips over nodes we've already visited
			var oldPoint = false;
			for (var j in pointsChecked) {
				if (i == pointsChecked[j]) {
					oldPoint = true;
				}
			}
			if (oldPoint) continue;

			//Recursive check, and applies the results if a shorter distance is returned
			var newDistance = checkAudGeo(currentAudGeo[pointToCheck].connections[i], location, newPointsChecked);
			if (newDistance < distance) {
				distance = newDistance;
				pos = currentAudGeo[currentAudGeo[pointToCheck].connections[i]].point;
			}
		}

		return distance + distanceBetweenTwoPoints(currentAudGeo[pointToCheck].point, pos);
	}

//--//Utility-------------------------------------------------------------------
	this.getList = function() {
		return currentSoundSources;
	}

}

var fauxAudGeo = [
	{x:101, y:99}
	];

var currentAudGeo = []; //{point:{x,y}, connections:[indexs]}
function generateAudGeo() {
	currentAudGeo = new Array();

	for (var i = 0; i < fauxAudGeo.length; i++) {
		//console.log("Checking point " + i);
		var connect = [];

		for (var j = 0; j < fauxAudGeo.length; j++) {
			if (i == j) continue;
			//console.log("--Against point " + j);
			var clear = true;

			for (var k = 0; k < walls.length; k++) {
				if (isLineOnLine(fauxAudGeo[i].x, fauxAudGeo[i].y, 
						fauxAudGeo[j].x, fauxAudGeo[j].y, 
						walls[k].p1.x, walls[k].p1.y, 
						walls[k].p2.x, walls[k].p2.y)
						&& walls[k].type != 0) {
					//console.log(walls[k]);
					clear = false;
					}
				}
			if (clear) {
				connect.push(j);
			}
		}

		currentAudGeo.push({point: fauxAudGeo[i], connections: connect});
	}
}
