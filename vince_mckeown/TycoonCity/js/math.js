/*window.onload = function() {
	var canvas = document.getElementById("canvas"),
	canvasContext = canvas.getContext("2d"),
	width = canvas.width = window.innerWidth,
	height = canvas.height = window.innerHeight,
	tileWidth = 50,
	tileHeight = 25;

	canvasContext.translate(width / 2, 50);

	for(var x = 0; x < 30; x++) {
		for(var y = 0; y < 30; y++) {
			var dx = 15 - x,
				dy = 15 - y,
				dist = Math.sqrt(dx * dx + dy * dy),
				z = Math.cos(dist * 0.75) * 2 + 2;
			drawBlock(x, y, z, randomColor());
		}
	}

	function drawBlock(x, y, z) {
		var top = "#eeeeee",
			right = "#cccccc",
			left = "#999999";

		canvasContext.save();
		canvasContext.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2);

		// draw top
		canvasContext.beginPath();
		canvasContext.moveTo(0, -z * tileHeight);
		canvasContext.lineTo(tileWidth / 2, tileHeight / 2 - z * tileHeight);
		canvasContext.lineTo(0, tileHeight - z * tileHeight);
		canvasContext.lineTo(-tileWidth / 2, tileHeight / 2 - z * tileHeight);
		canvasContext.closePath();
		canvasContext.fillStyle = top;
		canvasContext.fill();

		// draw left
		canvasContext.beginPath();
		canvasContext.moveTo(-tileWidth / 2, tileHeight / 2 - z * tileHeight);
		canvasContext.lineTo(0, tileHeight - z * tileHeight);
		canvasContext.lineTo(0, tileHeight);
		canvasContext.lineTo(-tileWidth / 2, tileHeight / 2);
		canvasContext.closePath();
		canvasContext.fillStyle = left;
		canvasContext.fill();

		// draw right
		canvasContext.beginPath();
		canvasContext.moveTo(tileWidth / 2, tileHeight / 2 - z * tileHeight);
		canvasContext.lineTo(0, tileHeight - z * tileHeight);
		canvasContext.lineTo(0, tileHeight);
		canvasContext.lineTo(tileWidth / 2, tileHeight / 2);
		canvasContext.closePath();
		canvasContext.fillStyle = right;
		canvasContext.fill();


		canvasContext.restore();		
	}

	function randomColor() {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		return "rgb(" + r + "," + g + "," + b + ")";
	}	


	function drawTile(x, y, color) {
		canvasContext.save();
		canvasContext.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2);

		canvasContext.beginPath();
		canvasContext.moveTo(0, 0);
		canvasContext.lineTo(tileWidth / 2, tileHeight / 2);
		canvasContext.lineTo(0, tileHeight);
		canvasContext.lineTo(-tileWidth / 2, tileHeight / 2);
		canvasContext.closePath();
		canvasContext.fillStyle = color;
		canvasContext.fill();

		canvasContext.restore();
	}
} */