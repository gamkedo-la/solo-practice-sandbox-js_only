// Tim Chase
// Aug 14, 2020
// Racing game

var canvas, canvasContext;

var blueCar = new carClass();
var greenCar = new carClass();

// loader
window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    drawRect(0, 0, 800, 600, 'black');
    drawText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');

    loadImages();
}

function imageLoadingDoneSoStartGame () {
    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);  

    setupInput();
    blueCar.reset(carPic);
    greenCar.reset(otherCarPic);
}

function updateAll() {
    moveAll();
    drawAll();
}


function moveAll() {
    blueCar.move();
    greenCar.move();
}

function drawAll() {
    drawTracks();
    blueCar.draw();
    greenCar.draw();
}
