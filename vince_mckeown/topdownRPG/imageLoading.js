var spriteSheet1Pic = document.createElement("img");
var spriteCharacterPic = document.createElement("img");
var spriteEnemyPic = document.createElement("img");

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
			{varName: warriorPic, theFile: "spriteSheet1.png"},
			{varName: spriteCharacterPic, theFile: "spritePlayer.png"},
			{varName: spriteEnemyPic, theFile: "spriteEnemy.png"},
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