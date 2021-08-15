// Tim Chase
// Aug 14, 2020
// Racing game

var canvas, canvasContext;

// loader
window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);  

    setupInput();

    trackLoadImages();
    carImageLoad();
    carReset();
}

function updateAll() {
    moveAll();
    drawAll();
}


function moveAll() {
    carMove();
    carTrackHandling();
}

function drawAll() {
    drawTracks();
    carDraw();
}
