var heroPic = document.createElement("img");
// var otherCarPic = document.createElement("img");
var trackPics = [];

var picsToLoad = 0; //set automatically based on imageList in loadImages

function countLoadedImagesAndLaunchIfReady() {
  picsToLoad--;
  console.log(picsToLoad);
  if (picsToLoad == 0) {
    imageLoadingDoneSoStartGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload = countLoadedImagesAndLaunchIfReady;
  imgVar.src = "images/" + fileName;
}

// function switchCostume(leftCostume,rightCostume,jumpCostume){
//     var costumeList = [
//         {varName: heroPic, rightCostume:"warrior.png"},
//         {varName: heroPic, leftCostume:"warrior2.png"},
//     ];

//     picsToLoad = imageList.length;
// }

function loadImageForTrackCode(trackCode, fileName) {
  trackPics[trackCode] = document.createElement("img");
  beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {
 
  var imageList = [
    { varName: heroPic, theFile: "rocketman3.png"},
    

    // {trackType: WORLD_UPPERROAD, theFile:"world_road3.png"},
    { trackType: WORLD_ROAD, theFile: "track_road2.png" },
    { trackType: WORLD_WALL, theFile: "bricks3.png" },
    { trackType: WORLD_SLINGSHOT, theFile: "tirador.png" },
    { trackType: WORLD_LADDER, theFile: "track_ladder.png" },
    { trackType: WORLD_LADDER_CONNECTOR, theFile: "track_ladderConnector.png" },
    { trackType: WORLD_KEY, theFile: "key2.png" },
    { trackType: WORLD_DOOR, theFile: "track_door.png" },
    { trackType: WORLD_LOWERTUNNEL, theFile: "world_lowerTunnel.png" },
    { trackType: WORLD_SWORD, theFile: "sword.png" },
    { trackType: WORLD_TRAP, theFile: "world_trap.png" },
    { trackType: WORLD_ARROW, theFile: "world_arrow3.png" }
    

  ];

  picsToLoad = imageList.length;

  for (var i = 0; i < imageList.length; i++) {
    if (imageList[i].varName != undefined) {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    } else {
      loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
    }
  }
}
