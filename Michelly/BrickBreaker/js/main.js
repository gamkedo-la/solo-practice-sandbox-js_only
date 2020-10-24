let canvas, canvasContext;

let ballX = 75;
let ballY = 75;
let ballSpeedX = 8;
let ballSpeedY = 4;

const PADDLE_Y = 540;
const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 100;
let playerPaddleX = 400;

function calculateMousePosition(e) {
	// getBoundingClientRect returns the size of an element and its position relative to the viewport
	let canvasBoundaries = canvas.getBoundingClientRect();
	let rootElement = document.documentElement;

	// Account for the margins, canvas position on page, scroll amount
	let mouseX = e.clientX - canvasBoundaries.left - rootElement.scrollLeft;
	let mouseY = e.clientY - canvasBoundaries.top - rootElement.scrollTop;

	return {
		x: mouseX,
		y: mouseY,
	};
}

function drawRect(x, y, width, height, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
	canvasContext.fillStyle = color;

	// a new separate shape, not a continuation of a previous shape
	canvasContext.beginPath();

	// Draw circle
	// 0, Math.PI * 2 = draw a full circle
	//  true = draw counterclockwise
	canvasContext.arc(x, y, radius, 0, Math.PI * 2, true);

	// Add color to circle
	canvasContext.fill();
}

function colorText(text, x, y, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(text, x, y);
}

window.onload = () => {
	canvas = document.querySelector('#gameCanvas');
	canvasContext = canvas.getContext('2d');

	// Call the update function around 30 times per second
	const framesPerSecond = 30;

	setInterval(updateGame, 1000 / framesPerSecond);

	canvas.addEventListener('mousemove', (e) => {
		let mousePos = calculateMousePosition(e);

		// Center mouse on paddle's center
		playerPaddleX = mousePos.x - PADDLE_WIDTH / 2;
	});

	// canvasContext.textAlign = 'center';
};

function updateGame() {
	moveEverything();
	drawEverything();
}

function moveEverything() {
	if (ballX >= canvas.width || ballX <= 0) {
		ballSpeedX *= -1;
	}

	// Paddle only affects the ball if the ball is moving downward, its speed is positive.
	if (ballSpeedY > 0.0) {
		if (
			ballY > PADDLE_Y &&
			ballY < PADDLE_Y + PADDLE_HEIGHT &&
			ballX > playerPaddleX &&
			ballX < playerPaddleX + PADDLE_WIDTH
		) {
			ballSpeedY *= -1;

			let deltaX = ballX - (playerPaddleX + PADDLE_WIDTH / 2);
			ballSpeedX = deltaX * 0.35;
		}
	}

	if (ballY >= canvas.height) {
		ballReset();
	}

	if (ballY <= 0) {
		ballSpeedY *= -1;
	}

	ballX += ballSpeedX;
	ballY += ballSpeedY;
}

function drawEverything() {
	// Clear the game view - fill with black
	drawRect(0, 0, canvas.width, canvas.height, 'black');

	drawRect(playerPaddleX, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

	drawCircle(ballX, ballY, 10, 'white');
}

function ballReset() {
	ballX = canvas.width / 2 + 10;
	ballY = canvas.height / 2 + 10;
	ballSpeedX *= -1;
}
