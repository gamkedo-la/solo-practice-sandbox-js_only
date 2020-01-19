var canvas, canvasContext;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    initInput();

    SetupPathfindingGridData();

    var framesPerSecond = 30;
    setInterval(drawEverything, 1000 / framesPerSecond);

    canvasContext.font = "12px Arial";
}

function drawEverything() {
    if(pathfindingNow) {
        PathfindingNextStep();
    }

    colorRect(0, 0, canvas.width, canvas.height, 'black');

    canvasContext.textAlign = "center";
    drawTiles();

    canvasContext.textAlign = "left";
    canvasContext.fillStyle = 'white';
    var rightAreaX = TILE_W * TILE_COLS;
    var lineSkip = 15;
    var lineY = 20;
    canvasContext.fillText("Click to toggle wall", rightAreaX, lineY);
    lineY += lineSkip;
    canvasContext.fillText("Click in this sidebar", rightAreaX, lineY);
    lineY += lineSkip;
    canvasContext.fillText("to start/end pathfinding", rightAreaX, lineY);
    if(pathfindingNow) {
        lineY += lineSkip;
        canvasContext.fillText("DOING PATHFINDING...", rightAreaX, lineY);
    }
}