var mouseXCoordinate,mouseYCoordinate;

function updateMousePosition(builtInEventObject)
{
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseXCoordinate = builtInEventObject.clientX - rect.left - root.scrollLeft;
	mouseYCoordinate = builtInEventObject.clientY - rect.top  - root.scrollTop;

}

const LEFT_ARROW_KEY = 37;
const UP_ARROW_KEY = 38;
const RIGHT_ARROW_KEY = 39;
const DOWN_ARROW_KEY = 40;

const SPACEBAR_KEY = 32;

const D_KEY = 68;
const F_KEY = 70;

function handleKeyPress(builtInEventObject)
{
	//console.log('builtInEventObject.keycode: ' + builtInEventObject.keyCode);
	switch(builtInEventObject.keyCode)
	{

		case D_KEY:
		if (debugOn)
		{
			debugOn = false;
		}
		else
		{
			debugOn = true;
		}
		break;

		case LEFT_ARROW_KEY:
		scooter.keyHeld_TurnLeft = true;
		break;

		case F_KEY:
		scooter.keyHeld_Gas = true;
		break;

		case RIGHT_ARROW_KEY:
		scooter.keyHeld_TurnRight = true;
		break;

		case SPACEBAR_KEY:
		scooter.keyHeld_HandBrake = true;
		break;

		case DOWN_ARROW_KEY:
		scooter.keyHeld_WalkBack = true;
		break;

		builtInEventObject.preventDefault();
	}
}

function handleKeyRelease(builtInEventObject)
{
	switch(builtInEventObject.keyCode)
	{
		case LEFT_ARROW_KEY:
		scooter.keyHeld_TurnLeft = false;
		break;

		case F_KEY:
		scooter.keyHeld_Gas = false;
		break;

		case RIGHT_ARROW_KEY:
		scooter.keyHeld_TurnRight = false;
		break;

		case SPACEBAR_KEY:
		scooter.keyHeld_HandBrake = false;
		break;

		case DOWN_ARROW_KEY:
		scooter.keyHeld_WalkBack = false;
		break;
	}
}