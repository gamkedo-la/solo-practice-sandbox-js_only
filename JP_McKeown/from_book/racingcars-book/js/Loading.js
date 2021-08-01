var car1Pic = document.createElement('img');
var car2Pic = document.createElement('img');
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
    {varName: car1Pic, fileName: 'image/player1.png'},
    {varName: car2Pic, fileName: 'image/player2.png'},
    {tileType: TILE_ROAD, fileName: 'image/tile_road.png'},
    {tileType: TILE_WALL, fileName: 'image/tile_wall.png'},
    {tileType: TILE_TREE, fileName: 'image/tile_tree.png'},
    {tileType: TILE_FLAG, fileName: 'image/tile_flag.png'},
    {tileType: TILE_GOAL, fileName: 'image/tile_goal.png'},
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