console.log('Hello World');

var canvas = document.getElementById('gameCanvas');
var canvasContext = canvas.getContext('2d');
canvasContext.fillStyle = 'Black';
canvasContext.fillRect(0, 0, canvas.width, canvas.height);
canvasContext.fillStyle = 'red';
canvasContext.fillRect(120, 200, 50, 25);
