var savedShuffledBoxes = [];
var boxesStates = {
	shuffled: false,
	getOriginalShuffle: false
};

function initBoxes(arr) {
	var x = 0;
	var y = 0;
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < columns; j++) {
			arr.push(new box(x,y));
			x += BOX_WIDTH + 2;
		}
		x = 0;
		y += BOX_HEIGHT + 2;
	}
	var len = arr.length;
	for (var b = len - 1; b >= 0; b--) {
		if (b > numOfElements - 1) {
			arr.pop();
		} else {
			arr[b].id = b;
		}
	}
}

function shuffleBoxes() {
	var j, hold;
	var len = boxes.length - 1;
	if (Math.random() > 0.01) {
		for (var i = len; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			hold = boxes[i].id;
			boxes[i].id = boxes[j].id;
			boxes[j].id = hold;
		}
	} else {
		initBoxes(savedShuffledBoxes);
		len = boxes.length;
		for (var b = 0; b < len; b++) {
			hold = boxes[b].id;
			savedShuffledBoxes[b].id = hold;
		}
		boxesStates.shuffled = true;
	}
}

function recallShuffledBoxes() {
	var len = boxes.length;
	var hold;
	for (var b = 0; b < len; b++) {
		hold = savedShuffledBoxes[b].id;
		boxes[b].id = hold;
	}
}