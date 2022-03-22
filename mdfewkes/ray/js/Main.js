let canvasContext;
let canvas;

var gameObjects = [];
var world = [];

var player = new PlayerClass();

var deltaTime = 0;
var lastTime = 0;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	AudioMan.init();
	window.requestAnimationFrame(gameloop);

	var x = 100;
	var y = 50;
	for (var i = 0; i < 10; i++) {
		var newWall = new WallClass();
		newWall.p1 = {x:x, y:y};
		x += rndFloat(0, 100);
		y += rndFloat(-50, 50);
		newWall.p2 = {x:x, y:y};
	}
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
	for (var i = 0; i < 10; i++) {
		var newWall = new WallClass();
		newWall.p1 = {x:x, y:y};
		x += rndFloat(-50, 50);
		y += rndFloat(0, -100);
		newWall.p2 = {x:x, y:y};
	}
	world[world.length-1].p2 = world[0].p1;

	player.x = canvas.width/2;
	player.y = canvas.height/2;
	player.ang = 3*pi/2;
}



function gameloop(time) {
	deltaTime = time - lastTime;
	lastTime = time;
	//console.log(deltaTime);

	for (var i = 0; i < gameObjects.length; i++) {
		gameObjects[i].update();
	}

	colorRect(0,0,800,600, "black");

	if (Key.isDown(Key.SPACE)) colorRect(0,0,800,600, "white");
	if (Key.isJustPressed(Key.SPACE)) colorRect(0,0,800,600, "red");
	if (Key.isJustReleased(Key.SPACE)) colorRect(0,0,800,600, "blue");

	for (var i = 0; i < world.length; i++) {
		world[i].draw();
	}

	for (var i = 0; i < gameObjects.length; i++) {
		gameObjects[i].draw();
	}

	Key.update();
	AudioMan.update();

	window.requestAnimationFrame(gameloop);
};