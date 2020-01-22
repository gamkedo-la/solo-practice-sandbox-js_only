function terrain() {
	var heightMap = new Array();
	var maxHeight;

	this.init = function(width, height) {
		maxHeight = height;

		var oldRand = rndInt(-50, 100);
		var newRand = rndInt(-50, 100);
		for (var i = 0; i < width; i++) {
			if (i%50 == 0) {
				oldRand = newRand;
				newRand = rndInt(-50, 100);
			}
			
			var value = 100 + lerp(oldRand, newRand, i%50/50);

			heightMap[i] = value;

		}
	}

	this.getHeightAtX = function(x) {
		return heightMap[Math.round(x)];
	}

	this.createImpactAtXandY = function(x, y, size) {

		var localY = Math.abs(y - canvas.height + UI_HEIGHT);
		var localX = Math.round(x);

		for (var i = -size + localX; i <= size + localX; i++) {
			var reduction = -Math.abs(i-localX) + size;

			if (i < 0) {
				i = 0;
				reduction = -Math.abs(i) + size;
			} else if (i >= heightMap.length) {
				i = heightMap.length-1;
				reduction = 0;
			}else if (heightMap[i] >= localY + reduction) {
				reduction *= 2;
			} else if (heightMap[i] > localY - reduction) {
				reduction += 0;
			} else if (heightMap[i] <= localY - reduction) {
				reduction = 0;
			}

			heightMap[i] -= reduction;
			if (heightMap[i] < 0) {
				heightMap[i] = 0;
			}
		}
	}

	this.draw = function() {
		for (var i = 0; i < heightMap.length; i++) {
			// colorLine(i, canvas.height - UI_HEIGHT, i, canvas.height - 100 - heightMap[i], 1, groundColor);
			var gradient = canvasContext.createLinearGradient(0,canvas.height - 100 - heightMap[i],0,canvas.height - UI_HEIGHT);
			gradient.addColorStop(0, groundColor);
			gradient.addColorStop(1, groundColorGradient);
			colorRect(i, canvas.height - 100 - heightMap[i], 1, heightMap[i], gradient);
		}
	}
}