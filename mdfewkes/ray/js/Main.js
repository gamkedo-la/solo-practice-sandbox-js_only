var canvasContext;
var canvas;

var debug = false;

var gameObjects = [];
var distanceBuffer = [];

var player = new PlayerClass();

var deltaTime = window.performance.now();
var lastTime = 0;

var FOV = 90;
var heightScale = 8;

var topColor = "lightgrey";
var bottomColor = "gray";

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	waitingforgesture();
}

function waitingforgesture() {

	colorRect(0,0,800,600, "black");
	colorText("Press Space to Play", canvas.width/2 - 120, canvas.height/2, "white", "30px Arial");

	if (Key.isDown(Key.SPACE)) {
		window.requestAnimationFrame(gamestart);
	} else {
		window.requestAnimationFrame(waitingforgesture);
	}

	Key.update();
}

function gamestart() {
	AudioMan.init();
	window.requestAnimationFrame(gameloop);

	//generate a random room
	var x = -250;
	var y = -250;
	var wallTexture = new Image();
	wallTexture.src = './images/text2Texture100x100.png';
	//console.log("x:" + x + "," + "y:" + y);
	for (var i = 0; i < 10; i++) {
		var newWall = new WallClass();
		newWall.p1 = {x:x, y:y};
		x += rndFloat(0, 50);
		y += rndFloat(-25, 25);
		newWall.p2 = {x:x, y:y};
		newWall.texture = wallTexture;
	}
	//console.log("x:" + x + "," + "y:" + y);
	for (var i = 0; i < 10; i++) {
		var newWall = new WallClass();
		newWall.p1 = {x:x, y:y};
		x += rndFloat(-25, 25);
		y += rndFloat(0, 50);
		newWall.p2 = {x:x, y:y};
		newWall.texture = wallTexture;
	}
	for (var i = 0; i < 10; i++) {
		var newWall = new WallClass();
		newWall.p1 = {x:x, y:y};
		x += rndFloat(0, -50);
		y += rndFloat(-25, 25);
		newWall.p2 = {x:x, y:y};
		newWall.texture = wallTexture;
	}
	//console.log("x:" + x + "," + "y:" + y);
	for (var i = 0; i < 10; i++) {
		var newWall = new WallClass();
		newWall.p1 = {x:x, y:y};
		x += rndFloat(-25, 25);
		y += rndFloat(0, -50);
		newWall.p2 = {x:x, y:y};
		newWall.texture = wallTexture;
	}
	//console.log("x:" + x + "," + "y:" + y);
	walls[walls.length-1].p2 = walls[0].p1;


	var newWall = new WallClass();
	newWall.p1 = {x:-100, y:-100};
	newWall.p2 = {x:300, y:-100};
	newWall.color = "red";
	newWall = new WallClass();
	newWall.p1 = {x:300, y:-100};
	newWall.p2 = {x:300, y:300};
	newWall.color = "orange";
	newWall = new WallClass();
	newWall.p1 = {x:300, y:300};
	newWall.p2 = {x:-100, y:300};
	newWall.color = "yellow";
	newWall = new WallClass();
	newWall.p1 = {x:-100, y:300};
	newWall.p2 = {x:-100, y:-100};
	newWall.color = "green";
	newWall = new WallClass();
	newWall.p1 = {x:100, y:100};
	newWall.p2 = {x:-100, y:100};
	newWall.color = "darkblue";
	newWall = new WallClass();
	newWall.p1 = {x:100, y:200};
	newWall.p2 = {x:100, y:100};
	newWall.color = "purple";
	newWall = new WallClass();
	newWall.p1 = {x:0, y:200};
	newWall.p2 = {x:100, y:200};
	newWall.color = "red";
	newWall = new WallClass();
	newWall.p1 = {x:0, y:150};
	newWall.p2 = {x:0, y:200};
	newWall.color = "orange";
	newWall = new WallClass();
	newWall.p1 = {x:0, y:150};
	newWall.p2 = {x:50, y:150};
	newWall.color = "yellow";
	newWall = new WallClass();
	newWall.p1 = {x:50, y:150};
	newWall.p2 = {x:50, y:200};
	newWall.color = "green";

	testsound1 = AudioMan.createSound3D("./audio/temp_engine1.ogg", {pos:{x:200, y:150}}, true, 1).play();
	testsound2 = AudioMan.createSound3D("./audio/UI_Typewriter_temp01.wav", {pos:{x:50, y:250}}, true, 1).play();
	testsound3 = AudioMan.createSound3D("./audio/TT rough vox only.mp3", {pos:{x:-50, y:175}}, true, 1).play();
	generateAudGeo();

	var testEntity = new SceneEntity();
	var testEntity1 = new SceneEntity();
	testEntity1.pos = {x: 200, y:150};
	var testEntity2 = new SceneEntity();
	testEntity2.pos = {x: 50, y:250};
	var testEntity3 = new SceneEntity();
	testEntity3.pos = {x: -50, y:175};
}

function gameloop(time) {

	time /= 1000;
	deltaTime = time - lastTime;
	lastTime = time;

	//Update loop
	for (var i = 0; i < gameObjects.length; i++) {
		gameObjects[i].update();
	}

	if (debug) {

		//2D Camera logic
		canvasContext.resetTransform();//reset the transform matrix as it is cumulative
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);//clear the viewport AFTER the matrix is reset
		colorRect(0,0,800,600, "black");
		canvasContext.translate(canvas.width/2, canvas.height/2);
		canvasContext.rotate(-player.ang + 3*pi/2);
		canvasContext.translate(-player.pos.x, -player.pos.y);

		//2D draw loops
		for (var i = 0; i < walls.length; i++) {
			walls[i].draw2D();
		}

		for (var i = 0; i < gameObjects.length; i++) {
			gameObjects[i].draw2D();
		}

		for (var i in printlist) {
			colorText(i + ": " +printlist[i], player.pos.x - 350, player.pos.y - 250 + i * 10, "white")
		}
		printlist.length = 0;

	} else {

		canvasContext.resetTransform();//reset the transform matrix as it is cumulative
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);//clear the viewport AFTER the matrix is reset
		colorRect(0,0,800,300, topColor);
		colorRect(0,300,800,300, bottomColor);

		//var thisTime = window.performance.now();
		//3D
		var numRays = canvas.width;
		var drawWidth = canvas.width / numRays;
		var drawDistance = 600;
		var wallHeight = heightScale;
		var rays = [];
		for (var i = 0; i < numRays; i ++) {
			// From half of FOV left, to half of FOV right
			var angle = degToRad(-(FOV/2) + ((FOV / numRays) * i)) + player.ang;
			var rayEnd = {x:Math.cos(angle) * drawDistance + player.x, y:Math.sin(angle) * drawDistance + player.y};
			var hit = getClosestIntersection(player.pos, rayEnd);

			/*if (hit != null) {
				hit.i = i;
				rays.push(hit);
			}*/

			var hits = getAllIntersections(player.pos, rayEnd);

			for (var j = 0; j < hits.length; j++) {
				var hit = hits[j];
				hit.i = i;

				rays.push(hit);

				if (!hit.wall.transparency) {
					break;
				}
			}
		}

		rays.sort((a, b) => (a.distance < b.distance) ? 1 : -1);
		gameObjects.sort((a, b) => (a.distance < b.distance) ? 1 : -1);

		var objectIndex = 0;
		for (var i = 0; i < rays.length; i ++) {
			//colorLine(player.x, player.y, rays[i].x, rays[i].y, 1, rays[i].wall.color); //2d

			//Draw game objects that have a greater depth than the current ray
			for (objectIndex; objectIndex < gameObjects.length; objectIndex++) {
				if (gameObjects[objectIndex].distance > rays[i].distance) gameObjects[objectIndex].draw3D();
				else break;
			}

			// Correct for fisheye, TODO - Fix texture lookup as well
			var cameraAng = player.ang - angle;
			//if (cameraAng > 2*pi) cameraAng -= 2*pi;
			//if (cameraAng < 0) cameraAng += 2*pi;
			cameraAng = wrap(cameraAng, 0, 2*pi);
			var distance = rays[i].distance// * Math.cos(cameraAng); //comment out solution while looking for texture fix

			var x = rays[i].i * drawWidth;
			var y = canvas.height/2 - wallHeight*canvas.height*0.5/distance;
			var w = drawWidth;
			var h = wallHeight * canvas.height / distance;
			var distanceAlongWall = distanceBetweenTwoPoints(rays[i].wall.p1, rays[i]);

			colorRect(x, y, w, h, rays[i].wall.color);
			if (rays[i].wall.texture != null) {
				canvasContext.drawImage(rays[i].wall.texture,
					(distanceAlongWall * wallHeight) % 100, 0, //Magic number to unstretch texture
					1, 100,
					x, y,
					w, h);
			}
			colorRect(x, y, w, h, fullColorHex(20, 10, 20, distance/drawDistance/2 * 512));
		}

		for (objectIndex; objectIndex < gameObjects.length; objectIndex++) {
			gameObjects[objectIndex].draw3D();
		}
		//console.log(window.performance.now() - thisTime);

	}

	if (Key.isJustPressed(Key.MINUS)){
		AudioMan.turnVolumeDown();
	}
	if (Key.isJustPressed(Key.PLUS)){
		AudioMan.turnVolumeUp();
	}

	Key.update();
	AudioMan.update();

	window.requestAnimationFrame(gameloop);
};