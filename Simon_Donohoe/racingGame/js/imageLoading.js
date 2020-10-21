
//declare car texture
let blueCarPic = document.createElement("img");
let greenCarPic = document.createElement("img");
//declare track textures
let trackPics = [];


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

function loadImageForTrackCode(trackCode, fileName){
  trackPics[trackCode] = document.createElement("img");
  beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages(){
  //let dataset = {varName: carPic, theFile: "playerOneCar.png"};

  let imageList = [
    {varName: blueCarPic, theFile: "playerOneCar.png" },
    {varName: greenCarPic, theFile: "playerTwoCar.png" },
    {trackType: TRACK_ROAD, theFile: "roadTexture.png" },
    {trackType: TRACK_WALL, theFile: "wallTexture.png" },
    {trackType: TRACK_FINISH, theFile: "finishLineTexture.png" },
    {trackType: TRACK_FLAG, theFile: "flagTexture.png" },
    {trackType: TRACK_TREE, theFile: "treeTexture.png" }
  ];
  picsToLoad = imageList.length;

  for(let i=0; i<imageList.length; i++){
    if(imageList[i].varName != undefined){
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    }else{
      loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
    }
  }
}