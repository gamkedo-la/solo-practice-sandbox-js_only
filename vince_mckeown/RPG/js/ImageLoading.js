var playerPic = document.createElement("img");
var goblinPic = document.createElement("img");
var ghostPic = document.createElement("img");
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

function loadImageForTileCode(tileData) {
  let tileCode = tileData.tileType
  let fileName = tileData.theFile
  tilePics[tileCode] = {
    img: null,
    imgX: tileData.imgX,
    imgY: tileData.imgY
  }
  tilePics[tileCode].img = document.createElement("img");
  beginLoadingImage(tilePics[tileCode].img,fileName);
}

function loadImages() {

  var imageList = [
    {varName:playerPic, theFile:"warrior.png"},
  	{varName:goblinPic, theFile:"goblin.png"},
    {varName:ghostPic, theFile:"ghost.png"},
    {tileType:TILE_GROUND, imgX: 0, imgY: 0, theFile:"world_ground.png"},
    //ROW 1
    {tileType:TILE_WALL_1, imgX: 0, imgY: 0, theFile:"dungeonWalls.png"},
    {tileType:TILE_WALL_2, imgX: 50, imgY: 0, theFile:"dungeonWalls.png"},
    {tileType:TILE_WALL_3, imgX: 100, imgY: 0, theFile:"dungeonWalls.png"},
    {tileType:TILE_WALL_4, imgX: 150, imgY: 0, theFile:"dungeonWalls.png"},
    {tileType:TILE_WALL_5, imgX: 200, imgY: 0, theFile:"dungeonWalls.png"},
    {tileType:TILE_WALL_6, imgX: 250, imgY: 0, theFile:"dungeonWalls.png"},
	  {tileType:TILE_WALL_7, imgX: 300, imgY: 0, theFile:"dungeonWalls.png"},
    {tileType:TILE_WALL_8, imgX: 350, imgY: 0, theFile:"dungeonWalls.png"},
    {tileType:TILE_WALL_9, imgX: 400, imgY: 0, theFile:"dungeonWalls.png"},
    {tileType:TILE_DUNGEON_STAIRS_TOP_1, imgX: 450, imgY: 0, theFile:"dungeonWalls.png"},
    //ROW 2
    {tileType:TILE_WALL_11, imgX: 0, imgY: 50, theFile:"dungeonWalls.png"},
    {tileType:TILE_WALL_12, imgX: 50, imgY: 50, theFile:"dungeonWalls.png"},
    {tileType:TILE_WALL_13, imgX: 100, imgY: 50, theFile:"dungeonWalls.png"},
    {tileType:TILE_WALL_14, imgX: 150, imgY: 50, theFile:"dungeonWalls.png"},
    {tileType:TILE_WALL_15, imgX: 200, imgY: 50, theFile:"dungeonWalls.png"},
    {tileType:TILE_WALL_16, imgX: 250, imgY: 50, theFile:"dungeonWalls.png"},
    {tileType:TILE_WALL_10, imgX: 350, imgY: 50, theFile:"dungeonWalls.png"},
    {tileType:TILE_DUNGEON_STAIRS_MIDDLE_1, imgX: 450, imgY: 50, theFile:"dungeonWalls.png"},
    //ROW 3
    {tileType:TILE_CABINET_1_TL, imgX: 0, imgY: 100, theFile:"dungeonWalls.png"},
    {tileType:TILE_CABINET_1_TR, imgX: 50, imgY: 100, theFile:"dungeonWalls.png"},
    {tileType:TILE_CABINET_1_BL, imgX: 100, imgY: 100, theFile:"dungeonWalls.png"},
    {tileType:TILE_CABINET_1_BR, imgX: 150, imgY: 100, theFile:"dungeonWalls.png"},
    {tileType:TILE_WHISKEY_BARREL_TOP, imgX: 250, imgY: 100, theFile:"dungeonWalls.png"},
    {tileType:TILE_DUNGEON_STAIRS_BOTTOM_1, imgX: 450, imgY: 100, theFile:"dungeonWalls.png"},
    //ROW 4
    {tileType:TILE_CABINET_1_ML, imgX: 0, imgY: 150, theFile:"dungeonWalls.png"},
    {tileType:TILE_CABINET_1_MR, imgX: 50, imgY: 150, theFile:"dungeonWalls.png"},
    {tileType:TILE_TREASURE_CHEST, imgX: 100, imgY: 150, theFile:"dungeonWalls.png"},
    {tileType:TILE_TREASURE_CHEST_OPEN, imgX: 150, imgY: 150, theFile:"dungeonWalls.png"},
    {tileType:TILE_WHISKEY_BARREL_BOTTOM, imgX: 250, imgY: 150, theFile:"dungeonWalls.png"},

    
    //END SPRITE SHEET
    
    
    {tileType:TILE_PRISON_WALL_1, imgX: 0, imgY: 0, theFile:"prisonWall_1.png"},
    {tileType:TILE_PRISON_WALL_2, imgX: 0, imgY: 0, theFile:"prisonWall_2.png"},
    {tileType:TILE_PRISON_WALL_3, imgX: 0, imgY: 0, theFile:"prisonWall_3.png"},
    {tileType:TILE_PRISON_WALL_4, imgX: 0, imgY: 0, theFile:"prisonWall_4.png"},
    {tileType:TILE_PRISON_WALL_5, imgX: 0, imgY: 0, theFile:"prisonWall_5.png"},
    {tileType:TILE_PRISON_GATE_TOP, imgX: 0, imgY: 0, theFile:"prisonGate_Top.png"},
    {tileType:TILE_PRISON_GATE_BOTTOM, imgX: 0, imgY: 0, theFile:"prisonGate_Botom.png"},
    {tileType:TILE_PRISON_GATE_TOP_OPEN, imgX: 0, imgY: 0, theFile:"prisonGate_Top_Open.png"},
    {tileType:TILE_PRISON_GATE_BOTTOM_OPEN, imgX: 0, imgY: 0, theFile:"prisonGate_Botom_Open.png"},
    {tileType:TILE_GOAL, imgX: 0, imgY: 0, theFile:"world_goal.png"},
    {tileType:TILE_KEY, imgX: 0, imgY: 0, theFile:"world_key.png"},
    {tileType:TILE_DOOR_YELLOW_FRONT_TOP, imgX: 0, imgY: 0, theFile:"yellowDoor_Front_Top.png"},	
    {tileType:TILE_DOOR_YELLOW_FRONT_BOTTOM, imgX: 0, imgY: 0, theFile:"yellowDoor_Front_Bottom.png"},
    {tileType:TILE_DOOR_YELLOW_FRONT_TOP_OPEN, imgX: 0, imgY: 0, theFile:"yellowDoor_Front_Top_Open.png"},	
    {tileType:TILE_DOOR_YELLOW_FRONT_BOTTOM_OPEN, imgX: 0, imgY: 0, theFile:"yellowDoor_Front_Bottom_Open.png"},
    {tileType:TILE_DOOR, imgX: 0, imgY: 0, theFile:"world_door.png"}
    ];

  picsToLoad = imageList.length;

  for(var i=0;i<imageList.length;i++) {
    if(imageList[i].tileType != undefined) {
      loadImageForTileCode(imageList[i]);
    } else {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    } // end of else
  } // end of for imageList

} // end of function loadImages
