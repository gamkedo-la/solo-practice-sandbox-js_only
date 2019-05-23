var carPic = document.createElement("img");
var carPic2 = document.createElement("img");
var carShadowPic = document.createElement("img");
var clockPic = document.createElement("img");
//var titlepagePic = document.createElement("img");
var arrowPic = document.createElement("img");
var roadSpriteSheet =  document.createElement("img");
var trackobstaclesSpriteSheet = document.createElement("img");
var trackPics = [];

var picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady(){
		picsToLoad--;
		console.log(picsToLoad);
		if(picsToLoad == 0) {
			imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/" + fileName;
}

function loadImageForTrackCode(trackCode, fileName)  {
	trackPics[trackCode] = document.createElement("img");
	beginLoadingImage(trackPics[trackCode], fileName);	
}

function loadImages() {
	
		var imageList = [
			{varName: carPic, theFile: "player1.png"},
			{varName: carPic2, theFile: "player2.png"},
			{varName: clockPic, theFile: "system_clock.png"},
			{varName: carShadowPic, theFile: "car_shadow.png"},
			{varName: arrowPic, theFile: "leftArrow.png"},
			{varName: roadSpriteSheet, theFile: "roadSpriteSheet.png"},
			{varName: trackobstaclesSpriteSheet, theFile: "trackobstaclesSpriteSheet.png"},
		];
			
	picsToLoad = imageList.length;

	for(var i=0; i<imageList.length; i++) {
		if(imageList[i].trackType != undefined){
			loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
		}
		else {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
	}
}