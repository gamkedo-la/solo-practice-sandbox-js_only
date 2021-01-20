
var warriorFacingNorth = document.createElement("img");
var warriorFacingEast = document.createElement("img");
var warriorFacingSouth = document.createElement("img");
var warriorFacingWest = document.createElement("img");
var emptyHeart = document.createElement("img");
var leftHalfHeart = document.createElement("img");
var rightHalfHeart = document.createElement("img");

var tile_Ground = document.createElement("img");
var tile_Wall = document.createElement("img");
var tile_Chest = document.createElement("img");
var tile_GoldenKey = document.createElement("img");
var tile_Door = document.createElement("img");
var tile_Spikes = document.createElement("img");
var tile_Food = document.createElement("img");
var tile_Potion = document.createElement("img");

var worldPics = [];
var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	console.log(picsToLoad);
	if(picsToLoad == 0) {
		imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/"+fileName;
}

function loadImageForWorldCode(worldCode, fileName) {
	worldPics[worldCode] = document.createElement("img");
	beginLoadingImage(worldPics[worldCode], fileName);
}

function loadImages() {
	var imageList = [
		{varName: warriorFacingNorth, theFile: "warrior-face-north.png"},
		{varName: warriorFacingEast, theFile: "warrior-face-east.png"},
		{varName: warriorFacingSouth, theFile: "warrior-face-south.png"},
		{varName: warriorFacingWest, theFile: "warrior-face-west.png"},
		{varName: emptyHeart, theFile: "heart_empty.png"},
		{varName: leftHalfHeart, theFile: "heart_left_half.png"},
		{varName: rightHalfHeart, theFile: "heart_right_half.png"},

		{worldType: TILE_GROUND, theFile: "tile_ground.png"},
		{worldType: TILE_WALL, theFile: "tile_wall.png"},
		{worldType: TILE_GOAL, theFile: "tile_chest.png"},
		{worldType: TILE_KEY, theFile: "tile_key.png"},
		{worldType: TILE_DOOR, theFile: "tile_door.png"},
		{worldType: TILE_SPIKES, theFile: "tile_spikes.png"},
		{worldType: TILE_FOOD, theFile: "tile_food.png"},
		{worldType: TILE_POTION, theFile: "tile_potion.png"},
	];

	picsToLoad = imageList.length;

	for(var i=0;i<imageList.length;i++) {
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForWorldCode(imageList[i].worldType, imageList[i].theFile);
		}
	}
}