var canvas, ctx;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(function () {
        drawAll();
    }, 1000 / framesPerSecond);

    initInput();
}

drawAll = function() {
    blankCanvas();
    document.querySelector('#state').innerText = 'State = ' + gameState;
    switch (gameState) {
        case STATE_MENU:
            drawMenu();
            break;
        case STATE_GUIDE:
            drawHelp();
            break;
        case STATE_OPTIONS:
            drawOptions();
            break;
        case STATE_CREDITS:
            drawCredits();
            break;
        case STATE_PLAY:
            drawPlay();
            break;
        default:
            break;
    }
}

function drawMenu() {
    drawText('Energy Flask', MENU_X, MENU_Y, HEADING_SIZE, 'white');
    drawText('Start game', MENU_X, MENU_Y+100, MENU_SIZE, 'white');
    drawText('Guide', MENU_X, MENU_Y+260, MENU_SIZE, 'white');
    drawText('Options', MENU_X, MENU_Y+180, MENU_SIZE, 'white');
    drawText('Credits', MENU_X, MENU_Y+340, MENU_SIZE, 'white');
}

function drawHelp() {
    drawText('Guide', MENU_X, MENU_Y, HEADING_SIZE, 'white');
    drawText('Arrow keys ...', MENU_X, MENU_Y+100, MENU_SIZE, 'white');
    drawText('P key to pause...', MENU_X, MENU_Y+180, MENU_SIZE, 'white');
    drawText('Escape key for menu', MENU_X, MENU_Y+260, MENU_SIZE, 'white');
}

function drawOptions() {
    drawText('Options', MENU_X, MENU_Y, HEADING_SIZE, 'white');
    drawText('Mute', MENU_X, MENU_Y+100, MENU_SIZE, 'white');
    drawText('Volume', MENU_X, MENU_Y+180, MENU_SIZE, 'white');
    drawText('Difficulty', MENU_X, MENU_Y+260, MENU_SIZE, 'white');
}

function drawCredits() {
    drawText('Credits', MENU_X, MENU_Y, HEADING_SIZE, 'white');
    drawText('A Member: contributions described', MENU_X, MENU_Y+100, MENU_SIZE, 'white');
    drawText('A Member: contributions described', MENU_X, MENU_Y+180, MENU_SIZE, 'white');
}

function drawPlay() {
    drawText('Game would start here', MENU_X, MENU_Y, HEADING_SIZE, 'white');
}

function showState(color) {
    colorRect(0,0,800,600, color);
    ctx.font = "48px Arial";
    ctx.fillStyle = 'black';
    var str = 'State = ' + color; 
    ctx.fillText(str, 100, 100);
    
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function blankCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawText(str, x, y, size, colour) {
    ctx.font = size + 'px Arial';
    ctx.fillStyle = colour;
    ctx.fillText(str, x, y);
}