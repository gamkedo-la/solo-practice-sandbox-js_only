const _PADDLE_HEIGHT = 100;
const _PADDLE_THICKNESS = 40;
const _PADDLE_INSET = 100;
let paddle1Y = 200;
let paddle2Y = 200;
const _ANGLE_ADJUST = 0.1;

function moveComputerPaddle() {
    var paddle2Ycentre = paddle2Y + _PADDLE_HEIGHT/2;
    const AI_SIT_STILL_MARGIN = 35;

    if(paddle2Ycentre > ballY + AI_SIT_STILL_MARGIN) {
        paddle2Y -= _AI_MOVE_SPEED;
    }
    if(paddle2Ycentre < ballY - AI_SIT_STILL_MARGIN) {
        paddle2Y += _AI_MOVE_SPEED;
    }
}

function drawPaddle() {
    colourRectangle(_PADDLE_INSET, paddle1Y, _PADDLE_THICKNESS, _PADDLE_HEIGHT, 'white');
}

function drawPaddleR() {
    colourRectangle(canvas.width - _PADDLE_THICKNESS - _PADDLE_INSET, paddle2Y, _PADDLE_THICKNESS, _PADDLE_HEIGHT, 'white');
}

function alignPaddle(evt) {
    var mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y - _PADDLE_HEIGHT/2;
}