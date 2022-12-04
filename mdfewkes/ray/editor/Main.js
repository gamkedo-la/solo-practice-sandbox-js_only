var mainInterface;
var pMouseX, pMouseY;
var player = {x:0, y: 0, ang: 3*pi/2, forwardX: 0, forwardY: 0}
var walls = [];
var debug = false;

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
var pFocus = false;

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
	}
}

function calculateMousePos(evt) {
	var rect = eCanvas.getBoundingClientRect(),
	root = document.documentElement;
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	pFocus = false;
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

	mainInterface = new MainInterface(eCanvas.width, eCanvas.height);

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

	nextFrame();
}

function nextFrame() {
	drivePreview();
	drawPreview();

	drawMapView();
	mainInterface.update();
	driveEditor();
	mainInterface.drawUI();

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
	player.ang = wrap(player.ang, 0, 2*pi);

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
			newY -= moveSpeed;
		}
		if (sKey) {
			newY += moveSpeed;
		}
		if (aKey) {
			newX -= moveSpeed;
		}
		if (dKey) {
			newX += moveSpeed;
		}

	}
	player.x = newX;
	player.y = newY;
}

function drawMapView() {
	//2D Camera logic
	eCanvasContext.clearRect(0, 0, eCanvas.width, eCanvas.height);//clear the viewport AFTER the matrix is reset
	colorRect(0, 0, eCanvas.width, eCanvas.height, 'black');
	eCanvasContext.translate(eCanvas.width/2, eCanvas.height/2);
	eCanvasContext.translate(-player.x, -player.y);

	//2D draw loops
	for (var i = 0; i < walls.length; i++) {
		walls[i].draw2D();
	}

	colorLine(player.x, player.y, player.x + player.forwardX * 10, player.y + player.forwardY * 10, 2, "darkgrey");
	colorEmptyCircle(player.x, player.y, 5, "darkgrey");

	eCanvasContext.resetTransform();//reset the transform matrix as it is cumulative
}

function drawPreview() {
	pColorRect(0, 0, pCanvas.width, pCanvas.height/2, 'lightblue');
	pColorRect(0, pCanvas.height/2, pCanvas.width, pCanvas.height/2, 'lightgreen');

	//3D
	var FOV = 60;
	var numRays = pCanvas.width;
	var drawWidth = pCanvas.width / numRays;
	var drawDistance = 600;
	var wallHeight = 5;
	for (i = 0; i < numRays; i ++) {
		var angle = degToRad(-(FOV/2) + ((FOV / numRays) * i)) + player.ang;
		var rayEnd = {x:Math.cos(angle) * drawDistance + player.x, y:Math.sin(angle) * drawDistance + player.y};
		var hit = getClosestIntersection({x: player.x, y: player.y}, rayEnd);

		if (hit != null) {
			//colorLine(player.x, player.y, hit.x, hit.y, 1, hit.wall.color); //2d

			// Correct for fisheye
			var cameraAng = player.ang - angle;
			cameraAng = wrap(cameraAng, 0, 2*pi);
			var distance = hit.distance * Math.cos(cameraAng);

			var x = i * drawWidth;
			var y = pCanvas.height/2 - wallHeight*pCanvas.height*0.5/distance;
			var w = drawWidth;
			var h = wallHeight * pCanvas.height / distance;
			var distanceAlongWall = distanceBetweenTwoPoints(hit.wall.p1, hit);

			pColorRect(x, y, w, h, hit.wall.color);
			if (hit.wall.texture != null) {
				pCanvasContext.drawImage(hit.wall.texture,
					(distanceAlongWall + hit.wall.textureOffset) * (wallHeight * 5) % 100, 0, //Majic number to unstretch texture
					1, 100,
					x, y,
					w, h);
			}
			pColorRect(x, y, w, h, fullColorHex(0, 0, 0, distance/drawDistance/2 * 512));
		}
	}
}

function getMousePositionInWorldSpace() {
	return {x: mouseX + player.x - eCanvas.width/2, y: mouseY + player.y - eCanvas.height/2}
}