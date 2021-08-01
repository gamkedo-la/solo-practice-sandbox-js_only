var playerPic=document.createElement("img");
var UFOPic=document.createElement("img");

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

//// removed loadImageForTrackCode definition

function loadImages() {
  var imageList = [
    {varName:playerPic, theFile:"player1.png"},
    {varName:UFOPic, theFile:"player1.png"},
    ];

  picsToLoad = imageList.length;

  for(var i=0;i<imageList.length;i++) {
    beginLoadingImage(imageList[i].varName, imageList[i].theFile);
  } // end of for imageList

} // end of function loadImages