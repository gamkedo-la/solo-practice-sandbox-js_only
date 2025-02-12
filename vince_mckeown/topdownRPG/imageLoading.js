var wizardPic = document.createElement("img");
var townMapPic = document.createElement("img");

//var titlepagePic = document.createElement("img");
var tilePics = [];


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

function loadImageForRoomCode(tileCode, fileName)  {
	tilePics[tileCode] = document.createElement("img");
	beginLoadingImage(tilePics[tileCode], fileName);	
}

function loadImages() {
	
		var imageList = [
			{varName: townMapPic, theFile: "townMap.png"},
			{varName: wizardPic, theFile: "wizard.png"},
		];
			
	picsToLoad = imageList.length;

	for(var i=0; i<imageList.length; i++) {
		if(imageList[i].tileType != undefined){
			loadImageForRoomCode(imageList[i].tileType, imageList[i].theFile);
		}
		else {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
	}
}