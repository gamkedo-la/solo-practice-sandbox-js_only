var brickPic=document.createElement("img");
var paddlePic=document.createElement("img");
var ballPic=document.createElement("img");
var backgroundPic=document.createElement("img");

var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if(picsToLoad == 0) { // last image loaded?
    loadingDoneSoStartGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload=countLoadedImageAndLaunchIfReady;
  imgVar.src="img/"+fileName;
}

function loadImages() {
  var imageList = [
    {varName:paddlePic, theFile:"paddle.png"},
    {varName:brickPic, theFile:"brick.png"},
    {varName:ballPic, theFile:"ball.png"},
    {varName:backgroundPic, theFile:"bg.png"}
    ];

  picsToLoad = imageList.length;

  for(var i=0;i<imageList.length;i++) {
    beginLoadingImage(imageList[i].varName, imageList[i].theFile);
  } // end of for imageList

} // end of function loadImages
