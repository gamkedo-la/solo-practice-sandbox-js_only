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

/*
const TILE_FLOOR = 0;
const TILE_WALL = 1;
const TILE_PLAYERSTART = 2;
const TILE_DOOR = 3;
const TILE_KEY = 4;
const TILE_GOAL = 5;
*/

function loadImages() {
	var imageList = [
		{varName: warriorPic, theFile: "warrior.png"},
		{tileType: TILE_FLOOR, theFile: "world_floor.png"},
		{tileType: TILE_WALL, theFile: "world_wall.png"},
		{tileType: TILE_DOOR, theFile: "world_door.png"},
		{tileType: TILE_KEY, theFile: "world_key.png"},
		{tileType: TILE_GOAL, theFile: "world_goal.png"}
		];

	picsToLoad = imageList.length;

	for(var i=0;i<imageList.length;i++) {
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile); //maybe this isn't working?
		} else {
			loadImageForTileCode(imageList[i].tileType, imageList[i].theFile);
		}
	}
}