var playerPic = document.createElement("img");
var goblinPic = document.createElement("img");
var tilePics = [];

var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if(picsToLoad == 0) { // last image loaded?
    loadingDoneSoStartGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload=countLoadedImageAndLaunchIfReady;
  imgVar.src="images/"+fileName;
}

function loadImageForTileCode(tileCode, fileName) {
  tilePics[tileCode] = document.createElement("img");
  beginLoadingImage(tilePics[tileCode],fileName);
}

function loadImages() {

  var imageList = [
    {varName:playerPic, theFile:"warrior.png"},
	{varName:goblinPic, theFile:"goblin.png"},
	
    
    {tileType:TILE_GROUND, theFile:"world_ground.png"},
    {tileType:TILE_WALL_1, theFile:"dungeonWall_1.png"},
    {tileType:TILE_WALL_2, theFile:"dungeonWall_2.png"},
    {tileType:TILE_WALL_3, theFile:"dungeonWall_3.png"},
    {tileType:TILE_WALL_4, theFile:"dungeonWall_4.png"},
    {tileType:TILE_WALL_5, theFile:"dungeonWall_5.png"},
    {tileType:TILE_WALL_6, theFile:"dungeonWall_6.png"},
	{tileType:TILE_WALL_7, theFile:"dungeonWall_7.png"},
    {tileType:TILE_WALL_8, theFile:"dungeonWall_8.png"},
    {tileType:TILE_WALL_9, theFile:"dungeonWall_9.png"},
	{tileType:TILE_WALL_10, theFile:"dungeonWall_10.png"},
	{tileType:TILE_WALL_11, theFile:"dungeonWall_11.png"},
	{tileType:TILE_WALL_12, theFile:"dungeonWall_12.png"},
	{tileType:TILE_WALL_13, theFile:"dungeonWall_13.png"},
	{tileType:TILE_WALL_14, theFile:"dungeonWall_14.png"},
    {tileType:TILE_GOAL, theFile:"world_goal.png"},
    {tileType:TILE_KEY, theFile:"world_key.png"},
    {tileType:TILE_DOOR_YELLOW_FRONT, theFile:"yellowDoor_Front.png"},	
    {tileType:TILE_DOOR, theFile:"world_door.png"}
    ];

  picsToLoad = imageList.length;

  for(var i=0;i<imageList.length;i++) {
    if(imageList[i].tileType != undefined) {
      loadImageForTileCode(imageList[i].tileType, imageList[i].theFile);
    } else {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    } // end of else
  } // end of for imageList

} // end of function loadImages
