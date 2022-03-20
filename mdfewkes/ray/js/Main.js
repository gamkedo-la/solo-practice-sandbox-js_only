let canvasContext;

var gameObjects = [];
var world = [];

var player = new PlayerClass();

window.onload = function() {
	canvasContext = document.getElementById('gameCanvas').getContext('2d');

	AudioMan.init();
	window.requestAnimationFrame(gameloop);

	var x = 100;
	var y = 100;
	for (var i = 0; i < 50; i++) {
		var newWall = new WallClass();
		newWall.p1 = {x:x, y:y};
		x += rndFloat(0, 100);
		y += rndFloat(-50, 50);
		newWall.p2 = {x:x, y:y};
	}
}



function gameloop() {
	for (var i = 0; i < gameObjects.length; i++) {
		gameObjects[i].update();
	}

	colorRect(0,0,800,600, "black");

	if (Key.isDown(Key.A)) colorRect(0,0,800,600, "white");
	if (Key.isJustPressed(Key.A)) colorRect(0,0,800,600, "red");
	if (Key.isJustReleased(Key.A)) colorRect(0,0,800,600, "blue");

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
