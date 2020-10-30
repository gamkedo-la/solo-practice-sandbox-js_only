var twoLaneRoadPic = document.createElement("img");
var sidewalkPic = document.createElement("img");

var blackWhiteRedScooterSpriteSheet = document.createElement("img");

//All pictures prior to launching the game.  If a picture doesn't load, the game doesn't launch.
function countLoadedImagesAndLaunchIfReady()
{
		picsToLoad--;
		//console.log(picsToLoad);
		if(picsToLoad == 0) 
		{
			imageLoadingDoneSoStartGame();
		}
}

function beginLoadingImage(imgVar, fileName) 
{
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/" + fileName;
}

function loadImageForRoomCode(trackCode, fileName)  
{
	trackPics[trackCode] = document.createElement("img");
	beginLoadingImage(trackPics[trackCode], fileName);
}

//All images are loaded here.  varNames are for any pictures that are not tiles.
function loadImages() 
{

		var imageList = 

		[

		{varName: twoLaneRoadPic, theFile: "raw/Road/singleTileTwoLanes.png"},
		{varName: blackWhiteRedScooterSpriteSheet, theFile: "raw/scooter-auto/scooter-auto-spritesheet-16.png"}

		];

		picsToLoad = imageList.length;

		for(var i=0; i<imageList.length; i++) 
		{
			if(imageList[i].tileType != undefined)
			{
				loadImageForRoomCode(imageList[i].tileType, imageList[i].theFile);
			}
			else 
			{
				beginLoadingImage(imageList[i].varName, imageList[i].theFile);
			}
		}
}

function imageLoadingDoneSoStartGame() 
{
	console.log('images done loading');
	// var framesPerSecond = 30;
	// setInterval(function() {
	// 	gameStateManager.getState().draw();
	// }, 1000/framesPerSecond);

	// if (skipToGame) {
	// 	playerOne = new Warrior();
	// 	gameStateManager.setState(State.PLAY);
	// 	console.log("AVOIDING TITLE SCREEN AND CHARACTER SELECT.  GOING STRAIGHT TO GAME");
	// 	console.log("EXPECT ERROR FOR MUSIC DUE TO NOT CLICKING FIRST");
	// }
}