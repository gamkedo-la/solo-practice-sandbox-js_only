var carPic = document.createElement("img");
var car2Pic = document.createElement("img");
var trackPics = [];
var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
    picsToLoad--;
    if (picsToLoad == 0) {
	loadingDoneSoStartGame();
    }
}

function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = countLoadedImageAndLaunchIfReady;
    imgVar.src = fileName;
}

function loadImages() {
    var imageList = [
	{varName: carPic, theFile: "./images/player1.png"},
	{varName: car2Pic, theFile: "./images/player2.png"},
	{trackType: TRACK_ROAD, theFile: "./images/track_road.png"},
	{trackType: TRACK_WALL, theFile: "./images/track_wall.png"},
	{trackType: TRACK_GOAL, theFile: "./images/track_goal.png"},
	{trackType: TRACK_TREE, theFile: "./images/track_tree.png"},
	{trackType: TRACK_FLAG, theFile: "./images/track_flag.png"}
    ];
    picsToLoad = imageList.length;
    for (var i=0; i<imageList.length; i++) {
	if(imageList[i].trackType != undefined) {
	    loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
	} else { 
	    beginLoadingImage(imageList[i].varName, imageList[i].theFile);
	}
    }    
}

function loadImageForTrackCode(trackCode, fileName) {
    trackPics[trackCode] = document.createElement("img");
    beginLoadingImage(trackPics[trackCode], fileName);
}
