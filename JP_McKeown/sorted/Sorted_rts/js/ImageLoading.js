var greySheepPic = document.createElement("img");
var blueSheepPic = document.createElement("img");
var redSheepPic = document.createElement("img");

var tilePics = [];

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
	imgVar.src = "img/"+fileName;
}

function loadImageForTileCode(tileCode, fileName) {
  tilePics[tileCode] = document.createElement("img");
  beginLoadingImage(tilePics[tileCode], fileName);
}

function loadImages() {
	var imageList = [
		{varName: greySheepPic, theFile: "sheep-normal.png"},
		{varName: blueSheepPic, theFile: "sheep-blue.png"},
    {varName: redSheepPic, theFile: "sheep-red.png"},
    {tileType: TILE_ROAD, theFile: "tile_road.png"},
    {tileType: TILE_GOAL, theFile: "tile_goal.png"},
    {tileType: TILE_TREE, theFile: "tile_tree.png"}
	];
	picsToLoad = imageList.length;

	for(var i=0; i<imageList.length; i++) {
    // if list item has varName, use it
    if(imageList[i].varName != undefined) {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    } else {
      loadImageForTileCode(imageList[i].tileType, imageList[i].theFile);
    }
	}
}