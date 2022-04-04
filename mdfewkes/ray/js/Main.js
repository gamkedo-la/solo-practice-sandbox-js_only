let canvasContext;
let canvas;

var gameObjects = [];
var walls = [];
var distanceBuffer = [];

var player = new PlayerClass();

var deltaTime = window.performance.now();
var lastTime = 0;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	AudioMan.init();
	window.requestAnimationFrame(gameloop);

	/*//generate a random room
	var x = -250;
	var y = -250;
	console.log("x:" + x + "," + "y:" + y);
	for (var i = 0; i < 10; i++) {
		var newWall = new WallClass();
		newWall.p1 = {x:x, y:y};
		x += rndFloat(0, 100);
		y += rndFloat(-50, 50);
		newWall.p2 = {x:x, y:y};
	}
	console.log("x:" + x + "," + "y:" + y);
	for (var i = 0; i < 10; i++) {
		var newWall = new WallClass();
		newWall.p1 = {x:x, y:y};
		x += rndFloat(-50, 50);
		y += rndFloat(0, 100);
		newWall.p2 = {x:x, y:y};
	}
	for (var i = 0; i < 10; i++) {
		var newWall = new WallClass();
		newWall.p1 = {x:x, y:y};
		x += rndFloat(0, -100);
		y += rndFloat(-50, 50);
		newWall.p2 = {x:x, y:y};
	}
	console.log("x:" + x + "," + "y:" + y);
	for (var i = 0; i < 10; i++) {
		var newWall = new WallClass();
		newWall.p1 = {x:x, y:y};
		x += rndFloat(-50, 50);
		y += rndFloat(0, -100);
		newWall.p2 = {x:x, y:y};
	}
	console.log("x:" + x + "," + "y:" + y);
	world[world.length-1].p2 = world[0].p1;*/


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

	testsound1 = AudioMan.createSound3D("./audio/temp_engine1.ogg", {pos:{x:200, y:150}}, true, 1);
	testsound2 = AudioMan.createSound3D("./audio/UI_Typewriter_temp01.wav", {pos:{x:50, y:250}}, true, 1);
	testsound3 = AudioMan.createSound3D("./audio/TT rough vox only.mp3", {pos:{x:-50, y:175}}, true, 1);
	generateAudGeo();
}



function gameloop(time) {

	time /= 1000;
	deltaTime = time - lastTime;
	lastTime = time;
	//console.log(deltaTime);

	//Update loop
	for (var i = 0; i < gameObjects.length; i++) {
		gameObjects[i].update();
	}

	//2D Camera logic
	canvasContext.resetTransform();//reset the transform matrix as it is cumulative
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);//clear the viewport AFTER the matrix is reset
	colorRect(0,0,800,600, "black");
	// canvasContext.translate(canvas.width/2, canvas.height/2);
	// canvasContext.rotate(-player.ang + 3*pi/2);
	// canvasContext.translate(-player.pos.x, -player.pos.y);

	//2D draw loops
	// for (var i = 0; i < walls.length; i++) {
	// 	walls[i].draw2D();
	// }

	// for (var i = 0; i < gameObjects.length; i++) {
	// 	gameObjects[i].draw2D();
	// }

	//3D
	var FOV = 90;
	var numRays = 800;
	var drawDistance = 600;
	for (i = 0; i < numRays; i ++) {
		var angle = degToRad(-(FOV/2) + ((FOV / numRays) * i)) + player.ang;
		var rayEnd = {x:Math.cos(angle) * drawDistance + player.x, y:Math.sin(angle) * drawDistance + player.y};
		var hit = getClosestIntersection(player.pos, rayEnd);

		if (hit != null) {
			//colorLine(player.x, player.y, hit.x, hit.y, 1, hit.wall.color);
			colorLine(i, canvas.height/2 - drawDistance/hit.distance * 2, i, canvas.height/2 + drawDistance/hit.distance * 2, 1, hit.wall.color);
		} else {
			//colorLine(player.x, player.y, rayEnd.x, rayEnd.y, 1, "darkred");
		}
	}

	for (var i in printlist) {
		colorText(i + ": " +printlist[i], player.pos.x - 350, player.pos.y - 250 + i * 10, "white")
	}
	printlist.length = 0;

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