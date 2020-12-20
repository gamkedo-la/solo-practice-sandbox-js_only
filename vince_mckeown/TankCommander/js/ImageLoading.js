var carPic = document.createElement("img");
var car2Pic = document.createElement("img");
var projectilePic = document.createElement("img");
var bulletPic = document.createElement("img");
var trackPics = [];

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

function loadImageForTrackCode(trackCode, fileName) {
  trackPics[trackCode] = document.createElement("img");
  beginLoadingImage(trackPics[trackCode],fileName);
}

function loadImages() {

  var imageList = [
    {varName:carPic, theFile:"player1.png"},
    {varName:car2Pic, theFile:"player2.png"},
	{varName:projectilePic, theFile:"Projectile.png"},
    {varName:bulletPic, theFile:"Bullet.png"},
	
    {trackType:TRACK_ROAD, theFile:"track_road.png"},
    {trackType:TRACK_WALL, theFile:"track_wall.png"},
	{trackType:CITY_WALL_LEFT_SIDE_BOTTOM, theFile:"track_wall_1.png"},
	{trackType:CITY_WALL_LEFT_SIDE_MIDDLE, theFile:"track_wall_3.png"},
	{trackType:CITY_WALL_LEFT_SIDE_TOP, theFile:"track_wall_4.png"},
	{trackType:CITY_WALL_LEFT_SIDE_CONNECTS_ABOVE, theFile:"track_wall_5.png"},
	{trackType:CITY_WALL_RIGHT_SIDE_TOP, theFile:"track_wall_6.png"},
	{trackType:CITY_WALL_RIGHT_SIDE_BOTTOM, theFile:"track_wall_7.png"},
    {trackType:TRACK_GOAL, theFile:"track_goal.png"},
    {trackType:TRACK_TREE, theFile:"track_tree.png"},
    {trackType:TRACK_FLAG, theFile:"track_flag.png"},
    ];

  picsToLoad = imageList.length;

  for(var i=0;i<imageList.length;i++) {
    if(imageList[i].trackType != undefined) {
      loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
    } else {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    } // end of else
  } // end of for imageList

} // end of function loadImages
