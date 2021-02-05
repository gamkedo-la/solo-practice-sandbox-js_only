var carPic = document.createElement("img");
var roadPic = document.createElement("img");
var wallPic = document.createElement("img");

var picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady(){
    picsToLoad--;
    console.log(picsToLoad);
    if(picsToLoad == 0){
        imageLoadingDoneSoStartGame();
    }
}

function beginLoadingImage(imgVar, fileName){
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = fileName;
}

function loadImages(){
    var imageList = [
         {varName: carPic, theFile: "assets/pixelCarWithLights_player1.png"},
         {varName: roadPic, theFile: "assets/track_road.png"},
         {varName: wallPic, theFile: "assets/track_wall.png"}
    ];

    picsToLoad = imageList.length;

    for(var i = 0; i<imageList.length; i++){
        beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    }
}