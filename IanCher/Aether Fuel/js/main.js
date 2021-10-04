const FRAME_PER_SECOND = 30

var canvas, canvasContext;

var redCar = new carClass();
var camera = new Camera();

function updateMousePos(evt)
{
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
    mouseIdx = mouseIdx = getTrackIdxFromXY(mouseX, mouseY);
}

window.onload = function()
{
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    
    colorRect(0, 0, canvas.width, canvas.height, "black");
    colorText("Loading...", canvas.width / 2, canvas.height / 2, "white");
    loadImages();
}

function imageLoadingDoneSoStartGame()
{
    setInterval(updateAll, 1000 / FRAME_PER_SECOND);

    setupInput();
    camera.initialize();

    loadLevel(levelOne, 15, 40);
    // loadLevel(levelTwo, 47, 70);
    // loadLevel(levelThree, 47, 70);
}


function loadLevel(whichLevel, numRows, numCols)
{
    trackNumRows = numRows;
    trackNumCols = numCols;

    camera.initialize();

    trackGrid = whichLevel.slice();
    redCar.reset("Scarlett Witch", car2Pic);
}

function updateAll()
{
    moveAll();
    drawAll();    
}

function moveAll()
{
    redCar.move();
    redCar.handleCollisionWithTracksAdvanced();

    camera.followPlayer(redCar);
}

function drawAll()
{
    // Translate the context for camera scrolling
    camera.translate();

    // Draw all images
    drawTracks(camera.minTrackSeenJ, camera.maxTrackSeenJ,
               camera.minTrackSeenI, camera.maxTrackSeenI);

    redCar.draw();

    // Restore the context
    canvasContext.restore();

    // Editor
    editorDraw();
}

function clearScreen()
{
    colorRect(0, 0, canvas.width, canvas.height, "black");
}
