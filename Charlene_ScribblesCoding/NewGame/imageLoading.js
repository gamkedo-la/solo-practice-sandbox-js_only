var playerPic = document.createElement("img");
var tilePics = [];

var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
    picsToLoad--;
    if (picsToLoad == 0) { // last image loaded?
        loadingDoneSoStartGame();
    }
}

function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = countLoadedImageAndLaunchIfReady;
    imgVar.src = "images/" + fileName;
}

function loadImageForTrackCode(tileCode, fileName) {
    tilePics[tileCode] = document.createElement("img");
    beginLoadingImage(tilePics[tileCode], fileName);
}

function loadImages() {
    var imageList = [
        { varName: playerPic, theFile: "warrior.png" }
    ];

    picsToLoad = imageList.length;

    for (var i = 0; i < imageList.length; i++) {
        if (imageList[i].tileType != undefined) {
            loadImageForTrackCode(imageList[i].tileType, imageList[i].theFile);
        } else {
            beginLoadingImage(imageList[i].varName, imageList[i].theFile);
        } // end of else
    } // end of for imageList

} // end of function loadImages
