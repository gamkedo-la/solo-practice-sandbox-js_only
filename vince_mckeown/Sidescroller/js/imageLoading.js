var tilePics = [];
var playerPic = document.createElement('img');

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
	
    //Row 1
    {tileType:TILE_GRASS_1_LE, imgX: 0, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_GRASS_1, imgX: 32, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_GRASS_1_RE, imgX: 64, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_4, imgX: 96, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_5, imgX: 128, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_6, imgX: 160, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
  	//{tileType:TILE_GRASS_7, imgX: 192, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_8, imgX: 224, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_9, imgX: 256, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    
    //Row 2
    {tileType:TILE_SKY_1, imgX: 0, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_SOLID, imgX: 32, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_EMPTY, imgX: 64, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_4, imgX: 96, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_5, imgX: 128, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_6, imgX: 160, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
  	//{tileType:TILE_GRASS_7, imgX: 192, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_8, imgX: 224, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_9, imgX: 256, imgY: 32, theFile:"platformsGrass.png", isFloor: true},

    //Row 3
    {tileType:TILE_TREE_1_TOP, imgX: 0, imgY: 64, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_SOLID, imgX: 32, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_EMPTY, imgX: 64, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_4, imgX: 96, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_5, imgX: 128, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_6, imgX: 160, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
  	//{tileType:TILE_GRASS_7, imgX: 192, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_8, imgX: 224, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_9, imgX: 256, imgY: 32, theFile:"platformsGrass.png", isFloor: true},

    //Row 4
    {tileType:TILE_TREE_1_BOTTOM, imgX: 0, imgY: 96, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_SOLID, imgX: 32, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_EMPTY, imgX: 64, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_4, imgX: 96, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_5, imgX: 128, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_6, imgX: 160, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
  	//{tileType:TILE_GRASS_7, imgX: 192, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_8, imgX: 224, imgY: 32, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_9, imgX: 256, imgY: 32, theFile:"platformsGrass.png", isFloor: true},



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
