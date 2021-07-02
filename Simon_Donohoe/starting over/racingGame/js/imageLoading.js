// let trackPicRoad = document.createElement("img"); // road image
// let trackPicWall = document.createElement("img"); // wall image
// let trackPicGoal = document.createElement("img"); // image for finish-line
// let trackPicTree = document.createElement("img"); // image for tree
// let trackPicFlag = document.createElement("img"); // image for flag

let carPic = document.createElement("img"); // make the car an image
let trackPics = [];

let picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if(picsToLoad == 0) {
    loadingDoneSoStartGame();
  }
}

function beginLoadingImage(imgVar, fileName){
  imgVar.onload = countLoadedImageAndLaunchIfReady;
  imgVar.src = "img/"+fileName;
}

function loadImageForTrackCode(trackCode, fileName) {
  trackPics[trackCode] = document.createElement("img");
  beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {
  let imageList = [{varName:carPic, theFile:"player1.png"}, {trackType:TRACK_ROAD, theFile:"track_road.png"}, {trackType:TRACK_WALL, theFile:"track_wall.png"}, {trackType:TRACK_GOAL, theFile: "track_goal.png"}, {trackType:TRACK_TREE, theFile:"track_tree.png"}, {trackType:TRACK_FLAG, theFile:"track_flag.png"}];

  picsToLoad = imageList.length; // sets it to 3, since 3 Object literals in array

  for(let i = 0; i < imageList.length; i++) {
    if(imageList[i].trackType != undefined){ 
      loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
    } else {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    }
  }
}