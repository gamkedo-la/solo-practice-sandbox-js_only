var ballPic = document.createElement("img");
var paddlePic = document.createElement("img");
var brickPic = document.createElement("img");
var livesPic = document.createElement("img");
var titlePic = document.createElement("img");
var imageList = [
	{varName: ballPic, theFile: "../images/ball.png"},
	{varName: paddlePic, theFile: "../images/paddle.png"},
	{varName: brickPic, theFile: "../images/brick.png"},
	{varName: livesPic, theFile: "../images/lifeicon.png"},
	{varName: titlePic, theFile: "../images/title.png"}
];
var picsToLoad = imageList.length;
var allImagesLoadedEvent = new CustomEvent('allImagesLoaded');

function countLoadedImageAndLaunchIfReady() {
    picsToLoad--;
    if (picsToLoad == 0) {
		canvas.dispatchEvent(allImagesLoadedEvent);
    }
}

function beginLoadingImage(imgVar, fileName) {
    console.log("Loading image", imgVar, fileName);
    imgVar.onload = countLoadedImageAndLaunchIfReady;
    imgVar.src = "images/" + fileName;
}

function loadImages() {
    for (var i=0; i<imageList.length; i++) {
		beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    }
}
