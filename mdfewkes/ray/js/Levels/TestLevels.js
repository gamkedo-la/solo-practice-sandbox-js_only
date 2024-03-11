var testLevel1 = new LevelClass();
testLevel1.levelJSON = '{"walls":[{"p1":{"x":-100,"y":-100},"p2":{"x":300,"y":-100},"color":"red","texture":null,"textureOffset":0,"transparency":false},{"p1":{"x":300,"y":-100},"p2":{"x":300,"y":300},"color":"orange","texture":null,"textureOffset":0,"transparency":false},{"p1":{"x":300,"y":300},"p2":{"x":-100,"y":300},"color":"yellow","texture":null,"textureOffset":0,"transparency":false},{"p1":{"x":-100,"y":300},"p2":{"x":-100,"y":-100},"color":"green","texture":null,"textureOffset":0,"transparency":false},{"p1":{"x":100,"y":100},"p2":{"x":-100,"y":100},"color":"darkblue","texture":null,"textureOffset":0,"transparency":false},{"p1":{"x":100,"y":200},"p2":{"x":100,"y":100},"color":"purple","texture":null,"textureOffset":0,"transparency":false},{"p1":{"x":0,"y":200},"p2":{"x":100,"y":200},"color":"red"},{"p1":{"x":0,"y":150},"p2":{"x":0,"y":200},"color":"orange"},{"p1":{"x":0,"y":150},"p2":{"x":50,"y":150},"color":"yellow"},{"p1":{"x":50,"y":150},"p2":{"x":50,"y":200},"color":"green"}],"entities":[{"name":"Rob","pos":{"x":50,"y":250},"ang":4.71238898038469},{"name":"Cat","pos":{"x":200,"y":150},"ang":4.71238898038469},{"name":"Benny","pos":{"x":-50,"y":175},"ang":4.71238898038469},{"name":"Hanna","pos":{"x":0,"y":0},"ang":4.71238898038469}]}';
testLevel1.topColor = "lightblue";
testLevel1.bottomColor = "lightgreen";
testLevel1.onLoad = function() {
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
	walls[walls.length-1].p2 = walls[walls.length-40].p1;

}