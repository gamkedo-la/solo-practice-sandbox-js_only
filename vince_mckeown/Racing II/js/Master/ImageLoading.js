var carPic = document.createElement("img");
//var greenCarPic = document.createElement("img");
//var titlepagePic = document.createElement("img");
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
			{trackType: TRACK_ROAD, theFile: "track_road.png"},
			{trackType: TRACK_WALL, theFile:  "track_wall.png"},
			{trackType: TRACK_GRASS, theFile: "track_grass.png"},
			{trackType: TRACK_FINISH, theFile: "track_finish.png"}
		];
			
	picsToLoad = imageList.length;

	for(var i=0; i<imageList.length; i++) {
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForTrackCode( imageList[i].trackType, imageList[i].theFile );
		}
	}
}