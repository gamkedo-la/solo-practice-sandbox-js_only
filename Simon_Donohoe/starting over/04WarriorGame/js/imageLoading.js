let playerPic = document.createElement("img"); // make the car an image

let tilePics = [];

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

function loadImageForTileCode(tileCode, fileName) {
  tilePics[tileCode] = document.createElement("img");
  beginLoadingImage(tilePics[tileCode], fileName);
}

function loadImages() {
  let imageList = [
    {varName:playerPic, theFile:"warrior.png"}, {tileType:TILE_GROUND, theFile:"world_ground.png"}, {tileType:TILE_WALL, theFile:"world_wall.png"}, {tileType:TILE_GOAL, theFile: "world_goal.png"}, {tileType:TILE_TREE, theFile:"world_tree.png"}, {tileType:TILE_DOOR, theFile:"world_door.png"}, {tileType:TILE_KEY, theFile:"world_key.png"}
  ];

  picsToLoad = imageList.length; // sets it to 3, since 3 Object literals in array

  for(let i = 0; i < imageList.length; i++) {
    if(imageList[i].tileType != undefined){ 
      loadImageForTileCode(imageList[i].tileType, imageList[i].theFile);
    } else {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    }
  }
}