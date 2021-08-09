var warriorPic = document.createElement("img");
var worldPics = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	if(picsToLoad == 0) {
		imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/"+fileName;
}

function loadImageForTileCode(tileCode, fileName) {
	worldPics[tileCode] = document.createElement("img");
	beginLoadingImage(worldPics[tileCode], fileName);
}

function loadImages() {
	var imageList = [
		{varName: warriorPic, theFile: "player1car.png"},
		{tileType: TILE_ROAD, theFile: "track_road.png"},
		{tileType: TILE_WALL, theFile: "track_wall.png"},
		{tileType: TILE_GOAL, theFile: "track_goal.png"},
		{tileType: TILE_TREE, theFile: "track_tree.png"},
		{tileType: TILE_FLAG, theFile: "track_flag.png"},
		{tileType: TILE_DISCO, theFile: "track_disco.png"}
		];

	picsToLoad = imageList.length;

	for(var i=0;i<imageList.length;i++) {
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForTileCode(imageList[i].tileType, imageList[i].theFile);
		}
	}
}