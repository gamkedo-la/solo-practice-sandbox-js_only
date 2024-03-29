var tilePics = [];
var playerPic = document.createElement('img');
var slimePic = document.createElement('img');
var goblinPic = document.createElement('img');
var kobaldPic = document.createElement('img');

var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
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

  if (tileData.isWall) {
    wallTiles[tileCode] = true;
  }

  tilePics[tileCode].img = document.createElement("img");
  beginLoadingImage(tilePics[tileCode].img,fileName);
}

function loadImages() {
  
  var imageList = [
    {varName:playerPic, theFile:"player.png"},
    {varName:slimePic, theFile:"slime.png"},
    {varName:goblinPic, theFile:"goblin.png"},
    {varName:kobaldPic, theFile:"kobald.png"},
	
    //Row 1
    {tileType:TILE_GRASS_1_LE, imgX: 0, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_GRASS_1, imgX: 32, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_GRASS_1_RE, imgX: 64, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_GRASS_1_L_SIDE, imgX: 96, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_GRASS_1_R_SIDE, imgX: 128, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_6, imgX: 160, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
  	//{tileType:TILE_GRASS_7, imgX: 192, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_8, imgX: 224, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_9, imgX: 256, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_LADDER_TOP, imgX: 288, imgY: 0, theFile:"platformsGrass.png", isFloor: false},

    //Row 2
    {tileType:TILE_SKY_1, imgX: 0, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_SOLID, imgX: 32, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_EMPTY, imgX: 64, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_4, imgX: 96, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_5, imgX: 128, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_BACKGROUND_CLIFF_LE, imgX: 160, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
  	{tileType:TILE_BACKGROUND_CLIFF, imgX: 192, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_BACKGROUND_CLIFF_RE, imgX: 224, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_9, imgX: 256, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_LADDER, imgX: 288, imgY: 32, theFile:"platformsGrass.png", isFloor: false},


    //Row 3
    {tileType:TILE_TREE_1_TOP, imgX: 0, imgY: 64, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_TREE_2_TOP, imgX: 32, imgY: 64, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_EMPTY, imgX: 64, imgY: 64, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_4, imgX: 96, imgY: 64, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_5, imgX: 128, imgY: 64, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_6, imgX: 160, imgY: 64, theFile:"platformsGrass.png", isFloor: true},
  	//{tileType:TILE_GRASS_7, imgX: 192, imgY: 64, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_8, imgX: 224, imgY: 64, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_9, imgX: 256, imgY: 64, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_LADDER_BOTTOM, imgX: 288, imgY: 64, theFile:"platformsGrass.png", isFloor: false},

    //Row 4
    {tileType:TILE_TREE_1_BOTTOM, imgX: 0, imgY: 96, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_TREE_2_BOTTOM, imgX: 32, imgY: 96, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_EMPTY, imgX: 64, imgY: 96, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_ROCK_1, imgX: 96, imgY: 96, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_ROCK_2, imgX: 128, imgY: 96, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_ROCK_3, imgX: 160, imgY: 96, theFile:"platformsGrass.png", isFloor: true},
  	{tileType:TILE_ROCK_4, imgX: 192, imgY: 96, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_ROCK_5, imgX: 224, imgY: 96, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_9, imgX: 256, imgY: 96, theFile:"platformsGrass.png", isFloor: true},

      //Row 5
    //  {tileType:TILE_TREE_1_BOTTOM, imgX: 0, imgY: 128, theFile:"platformsGrass.png", isFloor: true},
      //{tileType:TILE_SOLID, imgX: 32, imgY: 128, theFile:"platformsGrass.png", isFloor: true},
      //{tileType:TILE_EMPTY, imgX: 64, imgY: 128, theFile:"platformsGrass.png", isFloor: true},
      //{tileType:TILE_GRASS_4, im128gX: 96, imgY: 128, theFile:"platformsGrass.png", isFloor: true},
      //{tileType:TILE_GRASS_5, imgX: 128, imgY: 128, theFile:"platformsGrass.png", isFloor: true},
      //{tileType:TILE_GRASS_6, imgX: 160, imgY: 128, theFile:"platformsGrass.png", isFloor: true},
      //{tileType:TILE_GRASS_7, imgX: 192, imgY: 128, theFile:"platformsGrass.png", isFloor: true},
      //{tileType:TILE_GRASS_8, imgX: 224, imgY: 128, theFile:"platformsGrass.png", isFloor: true},
      //{tileType:TILE_GRASS_9, imgX: 256, imgY: 32, theFile:"platformsGrass.png", isFloor: true},

          //Row 6
    //{tileType:TILE_BACKGROUND_SKY, imgX: 0, imgY: 160, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_BACKGROUND_HILL, imgX: 32, imgY: 160, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_BACKGROUND_HILL_1, imgX: 64, imgY: 160, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_BACKGROUND_HILL_2, imgX: 96, imgY: 160, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_5, imgX: 128, imgY: 160, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_6, imgX: 160, imgY: 160, theFile:"platformsGrass.png", isFloor: true},
  	//{tileType:TILE_GRASS_7, imgX: 192, imgY: 160, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_8, imgX: 224, imgY: 160, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_9, imgX: 256, imgY: 160, theFile:"platformsGrass.png", isFloor: true},

              //Row 7
    {tileType:TILE_BACKGROUND_HILL_3, imgX: 0, imgY: 192, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_BACKGROUND_HILL_4, imgX: 32, imgY: 192, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_BACKGROUND_HILL_5, imgX: 64, imgY: 192, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_BACKGROUND_HILL_6, imgX: 96, imgY: 192, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_5, imgX: 128, imgY: 160, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_6, imgX: 160, imgY: 160, theFile:"platformsGrass.png", isFloor: true},
  	//{tileType:TILE_GRASS_7, imgX: 192, imgY: 160, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_8, imgX: 224, imgY: 160, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_9, imgX: 256, imgY: 160, theFile:"platformsGrass.png", isFloor: true},

    //Row 8
    //{tileType:TILE_BACKGROUND_HILL_3, imgX: 0, imgY: 224, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_MIDDLEGROUND_HILL_1, imgX: 32, imgY: 224, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_MIDDLEGROUND_HILL_2, imgX: 64, imgY: 224, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_MIDDLEGROUND_HILL_3, imgX: 96, imgY: 224, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_5, imgX: 128, imgY: 160, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_6, imgX: 160, imgY: 160, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_7, imgX: 192, imgY: 160, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_8, imgX: 224, imgY: 160, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_9, imgX: 256, imgY: 160, theFile:"platformsGrass.png", isFloor: true},
   
     //Row 9
    {tileType:TILE_MIDDLEGROUND_HILL_4, imgX: 0, imgY: 256, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_MIDDLEGROUND_HILL_5, imgX: 32, imgY: 256, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_MIDDLEGROUND_HILL_6, imgX: 64, imgY: 256, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_MIDDLEGROUND_HILL_7, imgX: 96, imgY: 256, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_MIDDLEGROUND_HILL_8, imgX: 128, imgY: 256, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_6, imgX: 160, imgY: 160, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_7, imgX: 192, imgY: 160, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_8, imgX: 224, imgY: 160, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_9, imgX: 256, imgY: 160, theFile:"platformsGrass.png", isFloor: true},

    //Row 21
    {tileType:TILE_HEALTH_POTION_SMALL, imgX: 0, imgY: 640, theFile:"platformsGrass.png", isFloor: false},
    {tileType:TILE_HEALTH_POTION_MEDIUM, imgX: 32, imgY: 640, theFile:"platformsGrass.png", isFloor: false}
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
