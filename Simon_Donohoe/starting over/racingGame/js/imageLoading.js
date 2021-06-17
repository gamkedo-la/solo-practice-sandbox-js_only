let trackPicRoad = document.createElement("img"); // make the road an image
let trackPicWall = document.createElement("img"); // make the wall an image
let carPic = document.createElement("img"); // make the car an image
let picsToLoad = 3;

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if(picsToLoad == 0) {
    loadingDoneSoStartGame();
  }
}

function loadImages() {
  carPic.onload = countLoadedImageAndLaunchIfReady;
  carPic.src = "./img/player1.png";

  trackPicRoad.onload = countLoadedImageAndLaunchIfReady;
  trackPicRoad.src = "./img/track_road.png";

  trackPicWall.onload = countLoadedImageAndLaunchIfReady;
  trackPicWall.src = "./img/track_wall.png";
}
