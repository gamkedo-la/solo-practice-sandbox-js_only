const BUBBLE_SORT = 0;

function bubbleSort() {
	var len = boxes.length;
	var i,box,nextBox,hold;

	for (i = 0; i < len; i++) {
		if (i != len - 1) {
			box = boxes[i];
			nextBox = boxes[i + 1] 
			if (box.id < nextBox.id) {
				continue;
			} else {
				hold = boxes[i].id;
				box.id = nextBox.id;
				nextBox.id = hold;
				i--;
			}
		} else {
			if (!visualize)
			i = 0;
			len--;
		}
	}
} // Bubble Sort function