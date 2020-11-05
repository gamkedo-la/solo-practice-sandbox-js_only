
//declare warrior texture
let blueWarriorPic = document.createElement("img");
//declare world textures
let worldPics = [];


let picsToLoad = 0; //set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady(){
  picsToLoad--;
  // console.log(picsToLoad);
  if(picsToLoad == 0){
    imageLoadingDoneSoStartGame();
  }
}

function beginLoadingImage(imgVar, fileName){
  imgVar.onload = countLoadedImagesAndLaunchIfReady;
  imgVar.src = "./images/" + fileName;
}

function loadImageForWorldCode(worldCode, fileName){
  worldPics[worldCode] = document.createElement("img");
  beginLoadingImage(worldPics[worldCode], fileName);
}

function loadImages(){
  //let dataset = {varName: warriorPic, theFile: "playerOneWarrior.png"};

  let imageList = [
    {varName: blueWarriorPic, theFile: "playerOneWarrior.png" },
    {worldType: WORLD_FLOOR, theFile: "floorTexture.png" },
    {worldType: WORLD_WALL, theFile: "wallTexture.png" },
    {worldType: WORLD_FINISH, theFile: "finishLineTexture.png" },
    {worldType: WORLD_DOOR, theFile: "doorTexture.png" },
    {worldType: WORLD_KEY, theFile: "keyTexture.png" }
  ];
  picsToLoad = imageList.length;

  for(let i=0; i<imageList.length; i++){
    if(imageList[i].varName != undefined){
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    }else{
      loadImageForWorldCode(imageList[i].worldType, imageList[i].theFile);
    }
  }
}