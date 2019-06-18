function initBoxes() {
	var x = 0;
	var y = 0;
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < columns; j++) {
			boxes.push(new box(x,y));
			x += BOX_WIDTH + 2;
		}
		x = 0;
		y += BOX_HEIGHT + 2;
	}
	var len = boxes.length;
	for (var b = len - 1; b > numOfElements - 1; b--) {
		boxes.pop();
	}
	len = boxes.length;
	for (var b = 0; b < len; b++) {
		boxes[b].id = b;
	} //TODO: Make one for loop
}

function drawBoxes() {
	var len = boxes.length;
	for (var b = 0; b < len; b++) {
		boxes[b].draw();
	}
}

function shuffleBoxes() {
	var j, hold;
	if (Math.random() > 0.01) {
		for (var i = boxes.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			hold = boxes[i].id;
			boxes[i].id = boxes[j].id;
			boxes[j].id = hold;
		}
	} else {
		shuffled = true;
	}
}