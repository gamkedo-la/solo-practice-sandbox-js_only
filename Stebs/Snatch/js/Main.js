var canvas;
var canvasContext;

var skipToGame = false;

// Player
var playerOne;
var playerTwo;

window.onload = function()
{
	canvas = document.getElementById('gameCanvas');
	
	canvasContext = canvas.getContext('2d');

	loadImages();
	//initInput();
}