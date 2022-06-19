// Main
var canvas, ctx;
var img = new Image();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d'); 
  loadImages();
  loadingDoneSoStartGame();
}

function loadingDoneSoStartGame() {
  var framesPerSecond = 30;
  setInterval(function() {
      // moveAll();
      drawAll();
    }, 1000/framesPerSecond);
  
  initInput();  
}

function drawAll() {
  // erase screen every frame
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  ctx.drawImage(img, 0, 0);
}

function initInput() {

}

function loadImages() {

  img.onload = function() {
    console.log('loaded image');
  }
img.src = 'pie.jpg';
}