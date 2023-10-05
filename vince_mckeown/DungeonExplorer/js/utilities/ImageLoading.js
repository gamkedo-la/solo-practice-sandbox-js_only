var warriorPic = document.createElement("img");
var goblinPic = document.createElement("img");
var orcPic = document.createElement("img");
var ogrePic = document.createElement("img");
var ratPic = document.createElement("img");
var spiderPic = document.createElement("img");
var shadowPic = document.createElement("img");
var feedbackGUIPic = document.createElement("img");
var healthbarPic = document.createElement("img");
var rockBulletPic = document.createElement("img");


//var titlepagePic = document.createElement("img");
var trackPics = [];


var picsToLoad = 0;

//All pictures prior to launching the game.  If a picture doesn't load, the game doesn't launch.
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

//All images are loaded here.  varNames are for any pictures that are not tiles.
function loadImages() {
	
		var imageList = [
			//characters
			{varName: warriorPic, theFile: "warrior.png"},
			{varName: orcPic, theFile: "orc.png"},
			{varName: goblinPic, theFile: "goblin.png"},
			{varName: ogrePic, theFile: "ogre.png"},
			{varName: ratPic, theFile: "rat.png"},
			{varName: spiderPic, theFile: "spider.png"},
			{varName: shadowPic, theFile: "shadow.png"},
			{varName: feedbackGUIPic, theFile: "feedbackGUI.png"},
			{varName: healthbarPic, theFile: "healthbar.png"},
			{varName: rockBulletPic, theFile: "rockBullet.png"},
	
			{trackType: TILE_ROAD, theFile: "track_road.png"},
			{trackType: TILE_WALL, theFile:  "track_wall2.png"},	
			{trackType: TILE_WALL_WITH_TORCH, theFile:  "track_wall_with_torch.png"},
			{trackType: TILE_YELLOW_DOOR, theFile:  "track_yellowdoor.png"},
			{trackType: TILE_RED_DOOR, theFile:  "track_reddoor.png"},		
			{trackType: TILE_BLUE_DOOR, theFile:  "track_bluedoor.png"},				
			{trackType: TILE_YELLOW_KEY, theFile:  "track_yellowkey.png"},			
			{trackType: TILE_TREASURE, theFile:  "track_treasure.png"},
			{trackType: TILE_TABLE, theFile:  "track_table.png"},
			{trackType: TILE_FINISH, theFile: "track_finish.png"},
			{trackType: TILE_STAIRS, theFile: "track_stairs.png"},
			{trackType: TILE_BOOKSHELF, theFile: "track_bookshelf.png"},
			{trackType: TILE_FIRE_PLACE_LIT, theFile: "track_fireplace.png"},
			{trackType: TILE_FIRE_PLACE, theFile: "track_fireplaceNotLit.png"},
			{trackType: TILE_PITTRAP_ARMED, theFile: "track_road.png"},
			{trackType: TILE_PITTRAP_UNARMED, theFile: "track_pittrap.png"},
			{trackType: TILE_SPIKES_ARMED, theFile: "track_road.png"},
			{trackType: TILE_SPIKES_UNARMED, theFile: "track_spikes.png"},
			{trackType: TILE_STAIRS_DOWN, theFile: "stairsDown.png"},
			{trackType: TILE_CHAIR, theFile: "chair.png"},
			{trackType: TILE_CHAIR2, theFile: "chair2.png"},
			{trackType: TILE_CHAIR3, theFile: "chair3.png"},
			{trackType: TILE_CHAIR4, theFile: "chair4.png"},
			{trackType: TILE_CHAIR5, theFile: "chair5.png"},
			{trackType: TILE_CHAIR6, theFile: "chair6.png"},
			{trackType: TILE_CHAIR7, theFile: "chair7.png"},
			{trackType: TILE_CHAIR8, theFile: "chair8.png"},
			{trackType: TILE_CHAIR9, theFile: "chair9.png"},
			{trackType: TILE_CHAIR10, theFile: "chair10.png"},
			{trackType: TILE_CHAIR11, theFile: "chair11.png"},
			{trackType: TILE_TABLE1, theFile: "table1.png"},
			{trackType: TILE_TABLE2, theFile: "table2.png"},
			{trackType: TILE_TABLE3, theFile: "table3.png"},
			{trackType: TILE_TABLE4, theFile: "table4.png"},
			{trackType: TILE_TABLE5, theFile: "table5.png"},
			{trackType: TILE_WALL_TRAP, theFile: "wallTrap.png"},
			{trackType: TILE_WALL_TRAP2, theFile: "wallTrap2.png"},
			{trackType: TILE_CURTAIN, theFile: "leftCurtains.png"},
			{trackType: TILE_RIGHT_CURTAIN, theFile: "rightCurtains.png"},
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