const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_D = 68;
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;

var mouseX, mouseY;

function keySet(keyEvt, whichCar, setTo)
{
    if (keyEvt.keyCode == whichCar.controlKeyLeft)
    {
        whichCar.keyHeldTurnLeft = setTo;
    }
    if (keyEvt.keyCode == whichCar.controlKeyUp)
    {
        whichCar.keyHeldGas = setTo;
    }
    if (keyEvt.keyCode == whichCar.controlKeyRight)
    {
        whichCar.keyHeldTurnRight = setTo;
    }
    if (keyEvt.keyCode == whichCar.controlKeyDown)
    {
        whichCar.keyHeldReverse = setTo;
    }
}

function keyPressed(evt)
{
    keySet(evt, redCar, true);
    evt.preventDefault();
}

function keyReleased(evt)
{
    keySet(evt, redCar, false);
}

function setupInput()
{
    canvas.addEventListener("mousemove", updateMousePos);
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);

    redCar.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
}
