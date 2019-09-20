var warriorPic = document.createElement("img");
var enemyPic = document.createElement("img");
var shadowPic = document.createElement("img");
var feedbackGUIPic = document.createElement("img");

//var titlepagePic = document.createElement("img");
var trackPics = [];


var picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady(){
		picsToLoad--;
		//console.log(picsToLoad);
		if(picsToLoad == 0) {
			imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/" + fileName;
}

function loadImageForRoomCode(trackCode, fileName)  {
	trackPics[trackCode] = document.createElement("img");
	beginLoadingImage(trackPics[trackCode], fileName);	
}

function loadImages() {
	
		var imageList = [
			{varName: warriorPic, theFile: "warrior1.png"},
			{varName: enemyPic, theFile: "enemy1.png"},
			{varName: shadowPic, theFile: "shadow.png"},
			{varName: feedbackGUIPic, theFile: "feedbackGUI.png"},
			
			{trackType: TILE_ROAD, theFile: "track_road.png"},
			{trackType: TILE_WALL, theFile:  "track_wall.png"},	
			{trackType: TILE_YELLOW_DOOR, theFile:  "track_yellowdoor.png"},
			{trackType: TILE_RED_DOOR, theFile:  "track_reddoor.png"},		
			{trackType: TILE_BLUE_DOOR, theFile:  "track_bluedoor.png"},				
			{trackType: TILE_YELLOW_KEY, theFile:  "track_yellowkey.png"},			
			{trackType: TILE_TREASURE, theFile:  "track_treasure.png"},
			{trackType: TILE_FINISH, theFile: "track_finish.png"}
		];
			
	picsToLoad = imageList.length;

	for(var i=0; i<imageList.length; i++) {
		if(imageList[i].trackType != undefined){
			loadImageForRoomCode(imageList[i].trackType, imageList[i].theFile);
		}
		else {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
	}
}