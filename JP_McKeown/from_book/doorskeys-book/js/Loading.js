var playerPic = document.createElement('img');
var tilePics = [];
var picsToLoad = 0;

function loadImageForTileCode(tileCode, fileName) {
  tilePics[tileCode] = document.createElement('img');
  beginLoadingImage(tilePics[tileCode], fileName);
}

function beginLoadingImage(imgVar, imgFilename) {
  imgVar.onload = countLoadedImageAndLaunchIfReady;
  imgVar.src = imgFilename;
}

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if(picsToLoad == 0) {   // all images loaded
    loadingDoneSoStartGame();
  }
}

function loadImages() {
  var imageList = [
    {varName: playerPic, fileName: 'image/warrior.png'},
    {tileType: TILE_GROUND, fileName: 'image/world_ground.png'},
    {tileType: TILE_WALL, fileName: 'image/world_wall.png'},
    {tileType: TILE_KEY, fileName: 'image/world_key.png'},
    {tileType: TILE_DOOR, fileName: 'image/world_door.png'},
    {tileType: TILE_GOAL, fileName: 'image/world_goal.png'},
  ];
  picsToLoad = imageList.length;
  for(let i=0; i < picsToLoad; i++) {
    if(imageList[i].tileType != undefined) {
      loadImageForTileCode(imageList[i].tileType, imageList[i].fileName);
    } else {
      beginLoadingImage(imageList[i].varName, imageList[i].fileName);
    }
  }
}