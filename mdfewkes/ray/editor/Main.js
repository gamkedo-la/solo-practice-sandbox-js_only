var mainInterface;
var pMouseX, pMouseY;
var player = {x:0, y: 0, ang: 0}
var walls = [];
var debug = false;

function pcalculateMousePos(evt) {
	var rect = eCanvas.getBoundingClientRect(),
	root = document.documentElement;
	pMouseX = evt.clientX - rect.left - root.scrollLeft;
	pMouseY = evt.clientY - rect.top - root.scrollTop;

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
	document.getElementById('previewCanvas').addEventListener('pointermove', pcalculateMousePos);

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
	drawMapView();
	drawPreview();
	mainInterface.update();

	mouseJustPressed = false;
	mouseJustReleased = false;

	window.requestAnimationFrame(nextFrame);
}

function drawMapView() {


	//2D Camera logic
	eCanvasContext.clearRect(0, 0, eCanvas.width, eCanvas.height);//clear the viewport AFTER the matrix is reset
	colorRect(0, 0, eCanvas.width, eCanvas.height, 'black');
	eCanvasContext.translate(eCanvas.width/2, eCanvas.height/2);
	eCanvasContext.rotate(-player.ang + 3*pi/2);
	eCanvasContext.translate(-player.x, -player.y);

	//2D draw loops
	for (var i = 0; i < walls.length; i++) {
		walls[i].draw2D();
	}

	eCanvasContext.resetTransform();//reset the transform matrix as it is cumulative
}

function drawPreview() {
	pColorRect(0, 0, pCanvas.width, pCanvas.height/2, 'lightblue');
	pColorRect(0, pCanvas.height/2, pCanvas.width, pCanvas.height/2, 'lightgreen');

	//3D
	var FOV = 60;
	var numRays = pCanvas.width;
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
			if (cameraAng > 2*pi) cameraAng -= 2*pi;
			if (cameraAng < 0) cameraAng += 2*pi;
			var distance = hit.distance * Math.cos(cameraAng);
			var distanceAlongWall = distanceBetweenTwoPoints(hit.wall.p1, hit);

			var x = i;
			var y = pCanvas.height/2 - wallHeight*pCanvas.width*0.5/distance;
			var w = 1;
			var h = wallHeight * pCanvas.height / distance;

			pColorRect(x, y, w, h, hit.wall.color);
			if (hit.wall.texture != null) {
				pCanvasContext.drawImage(hit.wall.texture,
					distanceAlongWall * (wallHeight * 5) % 100, 0, //Majic number to unstretch texture
					1, 100,
					x, y,
					w, h);
			}
			pColorRect(x, y, w, h, fullColorHex(0, 0, 0, distance/drawDistance/2 * 512));
		}
	}
}