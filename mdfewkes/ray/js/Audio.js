var isServer = window.location.protocol == 'file:' ? false : true;
var printcycle = false;
var printlist = [];

var AudioMan = new AudioManager();

function AudioManGestureTest() {
	AudioMan.testInit();
}

function AudioManager() {
//--//Constants-----------------------------------------------------------------
	const VOLUME_INCREMENT = 0.05;
	const DROPOFF_MIN = 30;
	const DROPOFF_MAX = 400;
	const HEADSHADOW_REDUCTION = 0.7;
	const REVERB_MAX = 5;
	const DOPLER_SCALE = 1/24;

//--//Properties----------------------------------------------------------------
	var initialized = false;
	var audioCtx;
	var sfxBus, musicBus, masterBus;
	var musicVolume, sfxVolume;
	var currentMusicTrack = null;
	var currentSoundSources = [];
	var listener = {pos:{x:0,y:0}, ang: 0};

	window.addEventListener('mousedown', AudioManGestureTest);
	window.addEventListener('keydown', AudioManGestureTest);

	this.testInit = function(e) {
		if (navigator.userActivation.hasBeenActive) {
			init();
			window.removeEventListener('mousedown', AudioManGestureTest);
			window.removeEventListener('keydown', AudioManGestureTest);
		}
	}

	function init() {
		if (initialized) return;

		if (isServer) {
			audioCtx = new window.AudioContext();
			reverbBus = audioCtx.createConvolver();
			sfxBus = audioCtx.createGain();
			musicBus = audioCtx.createGain();
			verbBus = audioCtx.createConvolver();
			masterBus = audioCtx.createGain();

			sfxVolume = 0.7;
			musicVolume = 0.7;


			reverbBus.connect(sfxBus);
			sfxBus.gain.value = sfxVolume;
			sfxBus.connect(masterBus);
			musicBus.gain.value = musicVolume;
			musicBus.connect(masterBus);
			masterBus.connect(audioCtx.destination);

			//Load reverb
			var request = new XMLHttpRequest();
			request.open('GET', "audio/reverb2.wav", true);
			request.responseType = 'arraybuffer';
			request.onload = function() {
				audioCtx.decodeAudioData(request.response, function(buffer) {
					verbBus.buffer = buffer;
				});
			};
			request.send();

		} else {
			console.log("Not Server: skipping WebAudioAPI");
		}

		initialized = true;
		console.log("Initialized Audio");
	};

	this.setListener = function(newListener) {
		listener = newListener;
	}

	this.reset = function() {
		if (!initialized) this.testInit();

		for (var i = currentSoundSources.length-1; i >= 0; i--) {
		 	currentSoundSources[i].stop();
		}
		currentSoundSources.length = 0
	};

	this.update = function() {
		if (!initialized) this.testInit();

		for (var i = currentSoundSources.length-1; i >= 0; i--) {
			currentSoundSources[i].update();
			if (currentSoundSources[i].isEnded()) currentSoundSources.splice(i, 1);
		}

		if (debug) {
			for (var i in currentSoundSources) {
				colorEmptyCircle(currentSoundSources[i].parent.pos.x, currentSoundSources[i].parent.pos.y, 1, "blue");
				colorEmptyCircle(currentSoundSources[i].pos.x, currentSoundSources[i].pos.y, 3, "green");
				colorLine(currentSoundSources[i].pos.x, currentSoundSources[i].pos.y, listener.pos.x, listener.pos.y, 1, distanceBetweenTwoPoints(listener.pos, currentSoundSources[i].pos) < DROPOFF_MAX ? "green" : "darkgreen");
				for (var j in currentAudGeo) {
					if (lineOfSight(currentAudGeo[j].point, currentSoundSources[i].parent.pos)) {
						colorLine(currentSoundSources[i].parent.pos.x, currentSoundSources[i].parent.pos.y, 
							currentAudGeo[j].point.x, currentAudGeo[j].point.y, 0.5, "darkgreen");
					}
				}
			}

			/*for (var i in currentAudGeo) {
				colorEmptyCircle(currentAudGeo[i].point.x, currentAudGeo[i].point.y, 3, "blue");
				if (lineOfSight(currentAudGeo[i].point, listener.pos)) {
					colorLine(currentAudGeo[i].point.x, currentAudGeo[i].point.y, listener.pos.x, listener.pos.y, 1, "blue");
					for (var j in currentAudGeo[i].connections) {
						colorLine(currentAudGeo[i].point.x, currentAudGeo[i].point.y, 
							currentAudGeo[currentAudGeo[i].connections[j]].point.x, currentAudGeo[currentAudGeo[i].connections[j]].point.y, 1, "darkblue");
					}
				}
			}*/

		}
	};

//--//volume handling functions-------------------------------------------------
	this.toggleMute = function() {
		if (!initialized) this.testInit();

		var newVolume = (masterBus.gain.value === 0 ? 1 : 0);
		masterBus.gain.setTargetAtTime(newVolume, audioCtx.currentTime, 0.03);

		return newVolume;
	};

	this.setMute = function(tOrF) {
		if (!initialized) this.testInit();

		var newVolume = (tOrF === false ? 1 : 0);
		masterBus.gain.setTargetAtTime(newVolume, audioCtx.currentTime, 0.03);

		return newVolume;
	};

	this.setMusicVolume = function(amount) {
		if (!initialized) this.testInit();

		musicVolume = clamp(amount, 0, 1);
		musicBus.gain.setTargetAtTime(Math.pow(musicVolume, 2), audioCtx.currentTime, 0.03);

		return musicVolume;
	};

	this.setsfxVolume = function(amount) {
		if (!initialized) this.testInit();

		sfxVolume = clamp(amount, 0, 1);
		sfxBus.gain.setTargetAtTime(Math.pow(sfxVolume, 2), audioCtx.currentTime, 0.03);

		return sfxVolume;
	};

	this.turnVolumeUp = function() {
		if (!initialized) this.testInit();

		this.setMusicVolume(musicVolume + VOLUME_INCREMENT);
		this.setsfxVolume(sfxVolume + VOLUME_INCREMENT);
	};

	this.turnVolumeDown = function() {
		if (!initialized) this.testInit();

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
		if (!initialized) this.testInit();

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
		var lastDistance = distanceBetweenTwoPoints(listener.pos, this.pos);


		//Setup HTMLElement
		var audioFile = new Audio(fileNameWithPath);
		audioFile.preservesPitch = preservesPitch;
		audioFile.mozPreservesPitch = preservesPitch;
		audioFile.webkitPreservesPitch = preservesPitch;
		audioFile.playbackRate = this.rate;
		audioFile.loop = looping;
		audioFile.volume = this.mixVolume*this.mixVolume;

		//Initialize WebAudio Elements
		var source = null;
		var gainNode = null;
		var panNode = null;
		var verbMixNode = null;

		if (isServer) {
			//Setup nodes
			source = audioCtx.createMediaElementSource(audioFile);
			gainNode = audioCtx.createGain();
			panNode = audioCtx.createStereoPanner();
			verbMixNode = audioCtx.createGain();

			source.connect(gainNode);
			source.connect(verbMixNode);
			gainNode.connect(panNode);
			panNode.connect(sfxBus);
			panNode.connect(verbMixNode);
			verbMixNode.connect(reverbBus);


			//Calculate volume panning and reverb
			gainNode.gain.value = calcuateVolumeDropoff(this.pos);
			verbMixNode.gain.value = calcuateReverbPresence(this.pos);
			panNode.pan.value = calcuatePan(this.pos);
		} else {
			audioFile.volume *= calcuateVolumeDropoff(this.pos);
		}


		this.update = function() {
			//if (audioFile.paused) return;

			//Recalculate position
			this.pos = calculatePropogationPosition(this.parent.pos);

			//Calculate volume panning and reverb
			audioFile.volume = this.mixVolume*this.mixVolume;
			if (isServer) {
				gainNode.gain.value = calcuateVolumeDropoff(this.pos);
				verbMixNode.gain.value = calcuateReverbPresence(this.pos);
				panNode.pan.value = calcuatePan(this.pos);
			} else {
				audioFile.volume *= calcuateVolumeDropoff(this.pos);
			}

			//Dopler
			// audioFile.playbackRate = this.rate;
			// var newDistance = distanceBetweenTwoPoints(listener.pos, this.pos);
			// var dopler = (lastDistance - newDistance) * DOPLER_SCALE;
			// audioFile.playbackRate *= clamp(Math.pow(2, dopler), 0.8, 1.2);
			// lastDistance = newDistance;
		}

		this.play = function() {
			//Dont play if out of range
			if (distanceBetweenTwoPoints(listener.pos, this.pos) > DROPOFF_MAX && !looping) {
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
		var direction = radToDeg(-listener.ang + angleBetweenTwoPoints(listener.pos, location));
		if (direction >= 360) {
			direction -= 360;
		}
		if (direction < 0) {
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
		var distance = distanceBetweenTwoPoints(listener.pos, location);
		if (distance <= DROPOFF_MIN) {
			var panReduction = distance/DROPOFF_MIN;
			pan *= panReduction;
		}

		return pan;
	};

	function calcuateVolumeDropoff(location) {
		var distance = distanceBetweenTwoPoints(listener.pos, location);

		//Distance attenuation
		var newVolume = 1;
		if (distance > DROPOFF_MIN && distance <= DROPOFF_MAX) {
			newVolume = Math.abs((distance - DROPOFF_MIN)/(DROPOFF_MAX - DROPOFF_MIN) - 1);
		} else if (distance > DROPOFF_MAX) {
			newVolume = 0;
		}


		//Back of head attenuation
		var direction = radToDeg(-listener.ang + angleBetweenTwoPoints(listener.pos, location));
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

		return newVolume*newVolume;
	};

	function calcuateReverbPresence(location) {
		var distance = distanceBetweenTwoPoints(listener.pos, location);

		var verbVolume = 0;
		verbVolume = 1;//distance/DROPOFF_MAX * REVERB_MAX;

		return verbVolume;
	};

	function calculatePropogationPosition(location) {
		//Return if in line of sight
		if (lineOfSight(location, listener.pos)) {
			//printlist.push("lineOfSight");
			return location;
		}

		//Calculate distance and select AudGeo location
		//Start with max distance and location, then update with new distance and location everytime a shorter distance is calculated
		var distance = DROPOFF_MAX;
		var pos = location;
		for (var i in currentAudGeo) {
			//If AudGeo has lineOfSight to the listener, use checkAudGeo() to find the distance through the network back to the sound location
			if (lineOfSight(listener.pos, currentAudGeo[i].point)) { //LineOfSight to listener
				//printlist.push("* checking from " + i);
				var newDistance = checkAudGeo(i, location, []); //Recursive function to find shortest distance through node netowrk
				if (newDistance < distance) { //If a shorter distance than curent holding, replace with this distance and AudGeo
					distance = newDistance;
					pos = currentAudGeo[i].point;
				}
			}
		}
		distance += distanceBetweenTwoPoints(listener.pos, pos); //Add the listeners distance to the AudGeo's network distance

		//Calculate new location from angle and distance
		var direction = angleBetweenTwoPoints(listener.pos, pos);
		var newX = Math.cos(direction) * distance + listener.pos.x;
		var newY = Math.sin(direction) * distance + listener.pos.y;

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
			//printlist.push(pointToCheck + " lineOfSight");
			return distanceBetweenTwoPoints(currentAudGeo[pointToCheck].point, location);
		}

		//Checks each connection recursively for the shortest distance to lineOfSight of the source
		for (var i in currentAudGeo[pointToCheck].connections) {

			//printlist.push("looking up " + pointToCheck + " to " + currentAudGeo[pointToCheck].connections[i]);
			//Skips over nodes we've already visited
			var oldPoint = false;
			for (var j in newPointsChecked) { //Error: timeout, but only sometimes
				if (currentAudGeo[pointToCheck].connections[i] == newPointsChecked[j]) {
					oldPoint = true;
					break;
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

		//printlist.push(pointToCheck + " passing back");

		return distance + distanceBetweenTwoPoints(currentAudGeo[pointToCheck].point, pos);
	}

//--//Utility-------------------------------------------------------------------
	this.getList = function() {
		return currentSoundSources;
	}

}

var audGeoPoints = [];
var currentAudGeo = []; //{point:{x,y}, connections:[indexs], index: i}
// For testing
var fauxAudGeo = [
	{x: 101, y: 101},
	{x:-101, y: 101},
	{x: 101, y:-101},
	{x:-101, y:-101},
];
for (var i = 0; i < fauxAudGeo.length; i++) {
	//audGeoPoints.push(fauxAudGeo[i]);
}

function populateAudioNodesFromWallEdges() {
	audGeoPoints.length = 0;
	var positions = [];
	var snapDistance = 5;

	for (var i = 0; i < walls.length; i++) {
		if (positions.indexOf(JSON.stringify(walls[i].p1)) == -1) {
			positions.push(JSON.stringify(walls[i].p1));
		}
		if (positions.indexOf(JSON.stringify(walls[i].p2)) == -1) {
			positions.push(JSON.stringify(walls[i].p2));
		}
	}

	// console.log(positions);

	for (var j = 0; j < positions.length; j++) {
		var audGeoPoint = JSON.parse(positions[j]);

		// Code to push position away from edges
		var overlapingPointsList = getOverlappingWallEdgesAsPointPairList(audGeoPoint);
		var pushVector = {x:0, y:0};
		for (var i = 0; i < overlapingPointsList.length; i++) {
			var pointPairAsDirection = subtractVectors(overlapingPointsList[i][0], overlapingPointsList[i][1]);
			pointPairAsDirection = normalizeVector(pointPairAsDirection);
			pointPairAsDirection = scaleVector(pointPairAsDirection, (snapDistance - distanceBetweenTwoPoints(audGeoPoint, overlapingPointsList[i][0])) / snapDistance);
			pushVector = addVectors(pushVector, pointPairAsDirection);
		}
		pushVector = normalizeVector(pushVector);
		audGeoPoint = addVectors(audGeoPoint, pushVector);

		audGeoPoints.push(audGeoPoint);
	}

	generateAudGeo();
}

function cullAudioNodesThatDontConnectToPoint(point) {
	var visited = [];
	var stack = [];
	audGeoPoints.length = 0;

	for (var i = 0; i < currentAudGeo.length; i++) {
		var clear = true;
		for (var k in walls) {
			if (isLineIntersecting(point, currentAudGeo[i].point, walls[k].p1, walls[k].p2)) {
				clear = false;
			}
		}
		if (clear) {
			stack.push(currentAudGeo[i].index);
		}
	}

	// console.log(stack)

	while (stack.length > 0) {
		var index =  stack.pop();
		if (visited.includes(index)) continue;
		visited.push(index);

		for (var i = 0; i < currentAudGeo[index].connections.length; i++) {
			if (!visited.includes(currentAudGeo[index].connections[i])) {
				stack.push(currentAudGeo[index].connections[i]);
			}
		}
	}

	// console.log(visited);

	for (var i = 0; i < visited.length; i++) {
		audGeoPoints.push(currentAudGeo[visited[i]].point);
	}

	generateAudGeo();
}

function generateAudGeo() {
	currentAudGeo = new Array();

	for (var i in audGeoPoints) {
		//console.log("Checking point " + i);
		var connect = [];

		for (var j in audGeoPoints) {
			if (i == j) continue;
			//console.log("--Against point " + j);
			var clear = true;

			for (var k in walls) {
				if (isLineIntersecting(audGeoPoints[i], audGeoPoints[j], walls[k].p1, walls[k].p2)) {
					//console.log(walls[k]);
					clear = false;
				}
			}
			if (clear) {
				connect.push(j);
			}
		}

		currentAudGeo.push({point: audGeoPoints[i], connections: connect, index: i});
	}
}
