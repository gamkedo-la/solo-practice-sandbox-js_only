var playerPic = document.createElement("img");
var worldPics = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages();

function countLoadedImagesAndLaunchIfReady(){
    picsToLoad--;
    // console.log(picsToLoad);
    if(picsToLoad == 0){
        imageLoadingDoneSoStartGame();
    }
}

function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = "./images/"+fileName;
}
function loadImageForWorldCode(worldCode, fileName){
    worldPics[worldCode] = document.createElement("img");
    beginLoadingImage(worldPics[worldCode], fileName);
}

function loadImages() {
    var imageList = [
      {varName: playerPic, theFile: "playerBasketDraft-Med.png"},

      {worldType: WORLD_ROAD, theFile: "world_road.png"},
      {worldType: WORLD_WALL, theFile: "world_wall.png"},
      {worldType: WORLD_TROPHY, theFile: "world_trophy.png"},
      {worldType: WORLD_KEY, theFile: "world_key.png"},
      {worldType: WORLD_DOOR, theFile: "world_door.png"},
      {worldType: WORLD_DOOR_OPEN, theFile: "world_door_open.png"},
    ];

    picsToLoad = imageList.length;

    for(var i = 0; i < picsToLoad; i++){
        if(imageList[i].varName != undefined) {
            beginLoadingImage(imageList[i].varName, imageList[i].theFile);
        } else {
            loadImageForWorldCode(imageList[i].worldType, imageList[i].theFile);
        }
    }
}