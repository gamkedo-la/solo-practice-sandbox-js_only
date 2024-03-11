var pMouseX, pMouseY;
var player = {x:0, y: 0, ang: d270, forwardX: 0, forwardY: 0};
var gameObjects = [];
var currentMap = new LevelClass();
var objectImage = new Image();
objectImage.src = './images/testEntity.png';
var distanceBuffer = [];
var debug = false;

var canvas, canvasContext;
var eCanvas, eCanvasContext;
var pCanvas, pCanvasContext;

var mouseX = -1;
var mouseY = -1;
var mouseIsDown = false;
var mouseJustPressed = false;
var mouseJustReleased = false;
var wKey = false;
var aKey = false;
var sKey = false;
var dKey = false;
var qKey = false;
var eKey = false;
var yKey = false;
var zKey = false;
var delKey = false;
var ctrlKey = false;
var pFocus = false;

var FOV = 60;
var heightScale = 5;

function calculateKeyboardDown(evt) {
	switch(evt.keyCode) {
	case 87:
		wKey = true;
		break;
	case 65:
		aKey = true;
		break;
	case 83:
		sKey = true;
		break;
	case 68:
		dKey = true;
		break;
	case 81:
		qKey = true;
		break;
	case 69:
		eKey = true;
		break;
	case 89:
		yKey = true;
		break;
	case 90:
		zKey = true;
		break;
	case 46:
		delKey = true;
		break;
	case 17:
		ctrlKey = true;
		break;
	}
}

function calculateKeyboardUp(evt) {
	switch(evt.keyCode) {
	case 87:
		wKey = false;
		break;
	case 65:
		aKey = false;
		break;
	case 83:
		sKey = false;
		break;
	case 68:
		dKey = false;
		break;
	case 81:
		qKey = false;
		break;
	case 69:
		eKey = false;
		break;
	case 89:
		yKey = false;
		break;
	case 90:
		zKey = false;
		break;
	case 46:
		delKey = false;
		break;
	case 17:
		ctrlKey = false;
		break;
	}
}

function calculateMousePos(evt) {
	var rect = eCanvas.getBoundingClientRect(),
	root = document.documentElement;
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	pFocus = false;

	eCanvas.width = 1000;
	eCanvas.height = 750;
	pCanvas.width = 400;
	pCanvas.height = 300;
	//console.log(mouseX + " " + mouseY);
}

function mouseDownEvent(evt) {
	calculateMousePos(evt);
	mouseIsDown = true;
	mouseJustPressed = true;

	//console.log("click");
}

function mouseUpEvent(evt) {
	mouseIsDown = false;
	mouseJustReleased = true;
}

function pCalculateMousePos(evt) {
	pFocus = true;

	eCanvas.width = 400;
	eCanvas.height = 300;
	pCanvas.width = 800;
	pCanvas.height = 600;
	//console.log(pMouseX + " " + pMouseY);
}

window.onload = function() {
	eCanvas = document.getElementById('editorCanvas');
	eCanvasContext = eCanvas.getContext('2d');
	pCanvas = document.getElementById('previewCanvas');
	pCanvasContext = pCanvas.getContext('2d');

	document.getElementById('editorCanvas').addEventListener('pointermove', calculateMousePos);
	document.getElementById('editorCanvas').addEventListener('pointerdown', mouseDownEvent);
	document.getElementById('editorCanvas').addEventListener('pointerup', mouseUpEvent);
	window.addEventListener('keydown', calculateKeyboardDown);
	window.addEventListener('keyup', calculateKeyboardUp);
	document.getElementById('previewCanvas').addEventListener('pointermove', pCalculateMousePos);

	var newWall = new WallClass();
	newWall.p1 = {x:-100, y:-100};
	newWall.p2 = {x:100, y:-100};
	newWall.color = "red";
	newWall = new WallClass();
	newWall.p1 = {x:100, y:-100};
	newWall.p2 = {x:100, y:100};
	newWall.color = "orange";
	newWall = new WallClass();
	newWall.p1 = {x:100, y:100};
	newWall.p2 = {x:-100, y:100};
	newWall.color = "yellow";
	newWall = new WallClass();
	newWall.p1 = {x:-100, y:100};
	newWall.p2 = {x:-100, y:-100};
	newWall.color = "green";

	var testEntity = {name:"Rob", x: 0, y:0, distance: Infinity};
	gameObjects.push(testEntity);
	var testEntity1 = {name:"Cat", x: 50, y:50, distance: Infinity};
	gameObjects.push(testEntity1);
	var testEntity2 = {name:"Benny", x: -50, y:50, distance: Infinity};
	gameObjects.push(testEntity2);
	var testEntity3 = {name:"Hanna", x: 50, y:-50, distance: Infinity};
	gameObjects.push(testEntity3);
	var testEntity4 = {name:"Hector", x: -50, y:-50, distance: Infinity};
	gameObjects.push(testEntity4);

	setupUI(eCanvas.width, eCanvas.height);

	nextFrame();
}

function nextFrame() {
	mainInterface.update();
	mainInterface.draw();

	drivePreview();
	drawPreview();

	mouseJustPressed = false;
	mouseJustReleased = false;

	window.requestAnimationFrame(nextFrame);
}

function drivePreview() {
	var moveSpeed = 1;
	var lookSpeed = 0.02;

	if (qKey) {
		player.ang -= lookSpeed;
	}
	if (eKey) {
		player.ang += lookSpeed;
	}
	player.ang = wrap(player.ang, 0, d360);

	player.forwardX = Math.cos(player.ang);
	player.forwardY = Math.sin(player.ang);

	var newX = player.x;
	var newY = player.y;
	if (pFocus) {
		if (wKey) {
			newX += player.forwardX * moveSpeed;
			newY += player.forwardY * moveSpeed;
		}
		if (sKey) {
			newX -= player.forwardX * moveSpeed;
			newY -= player.forwardY * moveSpeed;
		}
		if (aKey) {
			newX += player.forwardY * moveSpeed;
			newY -= player.forwardX * moveSpeed;
		}
		if (dKey) {
			newX -= player.forwardY * moveSpeed;
			newY += player.forwardX * moveSpeed;
		}
	} else {
		if (wKey) {
			newY -= moveSpeed*3;
		}
		if (sKey) {
			newY += moveSpeed*3;
		}
		if (aKey) {
			newX -= moveSpeed*3;
		}
		if (dKey) {
			newX += moveSpeed*3;
		}

	}
	player.x = Math.round(newX);
	player.y = Math.round(newY);
}

function drawMapView() {
	//2D Camera logic
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);//clear the viewport AFTER the matrix is reset
	colorRect(0, 0, canvas.width, canvas.height, 'black');
	canvasContext.translate(canvas.width/2, canvas.height/2);
	canvasContext.translate(-player.x, -player.y);

	//2D draw loops
	for (var i = 0; i < walls.length; i++) {
		walls[i].draw2D();
	}
	colorLine(currentMap.playerStart.x + 5, currentMap.playerStart.y, currentMap.playerStart.x - 5, currentMap.playerStart.y, 1, "darkgrey");
	colorLine(currentMap.playerStart.x, currentMap.playerStart.y + 5, currentMap.playerStart.x, currentMap.playerStart.y - 5, 1, "darkgrey");
	colorEmptyCircle(currentMap.playerStart.x, currentMap.playerStart.y, 5, "darkgrey");
	if (editMode == AUDIO_MODE) {
		for (var i = 0; i < currentAudGeo.length; i++) {
			for (var j = 0; j < currentAudGeo[i].connections.length; j++) {
				var pos = {x: currentAudGeo[currentAudGeo[i].connections[j]].point.x, y: currentAudGeo[currentAudGeo[i].connections[j]].point.y}
				colorLine(currentAudGeo[i].point.x, currentAudGeo[i].point.y, pos.x, pos.y, 0.5, "blue");
			}
			if (lineOfSight(currentAudGeo[i].point, currentMap.playerStart)) {
				colorLine(currentAudGeo[i].point.x, currentAudGeo[i].point.y, currentMap.playerStart.x, currentMap.playerStart.y, 1, "darkblue");
			}
			if (lineOfSight(currentAudGeo[i].point, player)) {
				colorLine(currentAudGeo[i].point.x, currentAudGeo[i].point.y, player.x, player.y, 1, "darkblue");
			}
		}
		for (var i = 0; i < audGeoPoints.length; i++) {
			colorEmptyCircle(audGeoPoints[i].x, audGeoPoints[i].y, 1, "lightblue");
		}
	}

	colorLine(player.x, player.y, player.x + player.forwardX * 10, player.y + player.forwardY * 10, 2, "darkgrey");
	colorEmptyCircle(player.x, player.y, 5, "darkgrey");

	canvasContext.resetTransform();//reset the transform matrix as it is cumulative
}

function drawPreview() {
	canvas = pCanvas;
	canvasContext = pCanvasContext;

	colorRect(0,0,canvas.width,canvas.height/2, currentMap.topColor);
	colorRect(0,canvas.height/2,canvas.width,canvas.height/2, currentMap.bottomColor);

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
		var hit = getClosestIntersection(player, rayEnd);

		if (hit != null) {
			hit.i = i;
			rays.push(hit);
		}
	}


	for (var i = 0; i < gameObjects.length; i++) {
		gameObjects[i].distance = distanceBetweenTwoPoints(gameObjects[i], player);
	}
	rays.sort((a, b) => (a.distance < b.distance) ? 1 : -1);
	gameObjects.sort((a, b) => (a.distance < b.distance) ? 1 : -1);

	var objectIndex = 0;
	for (var i = 0; i < rays.length; i ++) {
		//colorLine(player.x, player.y, rays[i].x, rays[i].y, 1, rays[i].wall.color); //2d

		//Draw game objects that have a greater depth than the current ray
		for (objectIndex; objectIndex < gameObjects.length; objectIndex++) {
			if (gameObjects[objectIndex].distance > rays[i].distance) DrawEntity(gameObjects[objectIndex]);
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
			pCanvasContext.drawImage(rays[i].wall.texture,
				distanceAlongWall * (wallHeight * wallHeight) % 100, 0, //Magic number to unstretch texture
				1, 100,
				x, y,
				w, h);
		}
		//colorRect(x, y, w, h, fullColorHex(20, 10, 30, distance/drawDistance * 384));
	}
	for (objectIndex; objectIndex < gameObjects.length; objectIndex++) {
		DrawEntity(gameObjects[objectIndex]);
	}
}

function DrawEntity(entity) {
	var drawAngle = wrap(radToDeg(angleBetweenTwoPoints(player, entity) - player.ang), -180, 180);

	var size = 5 * canvas.height / entity.distance;
	var drawX = canvas.width*0.5 - size*0.5 + drawAngle * canvas.width/FOV;
	var drawY = canvas.height*0.5 - size*0.5;

	canvasContext.drawImage(objectImage, drawX, drawY, size, size);
}