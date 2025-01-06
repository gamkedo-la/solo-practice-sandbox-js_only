function insertionSort() {
	var len = boxes.length;
	var i,j;
	for (i = 0; i < len; i++) {
		for (j = i - 1; j > -1; j--) {
			// TODO while(boxes[j].id > boxes[i].id);
			if (boxes[i].id > boxes[j].id) {
				step++;
				break;
			} else if (boxes[j].id > boxes[i].id) {
				swap(boxes,i,j);
				i--;
				drawBoxes();
				step++;
			}
		} // end of for j index
	} // end of for i index

	sortedCount = 0;
	for (l = 0; l < len; l++) {
		if (boxes[l].id < boxes[l + 1].id) {
			sortedCount++;
			if (isSortFinished()) {
				return;
			}
		} else {
			sortedCount = 0;
			break;
		}
	} // end of for l index (check if sorted)
	console.log("left loop");
} // end insertionSort