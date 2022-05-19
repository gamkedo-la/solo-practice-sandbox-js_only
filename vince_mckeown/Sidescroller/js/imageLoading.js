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
    {varName:playerPic, theFile:"platformsGrass.png"},
	
    //ROW 1
    {tileType:TILE_EMPTY, imgX: 0, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    {tileType:TILE_GRASS_1, imgX: 0, imgY: 32, theFile:"platformsGrass.png", isFloor: true}
    //{tileType:TILE_GRASS_3, imgX: 100, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_4, imgX: 150, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_5, imgX: 200, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_6, imgX: 250, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
  	//{tileType:TILE_GRASS_7, imgX: 300, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_8, imgX: 350, imgY: 0, theFile:"platformsGrass.png", isFloor: true},
    //{tileType:TILE_GRASS_9, imgX: 400, imgY: 0, theFile:"platformsGrass.png", isFloor: true} 
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
