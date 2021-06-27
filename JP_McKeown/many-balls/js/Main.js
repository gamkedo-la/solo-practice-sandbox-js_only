var canvas, canvasContext;
canvas = document.getElementById('gameCanvas');
canvasContext = canvas.getContext('2d');

window.onload = function() {

    resetGrid();
    // these next few lines set up our game logic and render to happen 30 times per second
    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
        }, 1000/framesPerSecond);

    createEveryBall();
}
    
function moveEverything() {
    for(var i=0;i<ballList.length;i++) {
        ballList[i].move();
    }
}

function drawEverything() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    drawBricks();
    
    for(var i=0;i<ballList.length;i++) {
      ballList[i].draw();
    }
}