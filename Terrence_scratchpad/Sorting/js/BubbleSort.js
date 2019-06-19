function bubbleSort() {
	var len = boxes.length;
	var i,box,nextBox;

	for (i = 0; i < len; i++) {
		step++;
		if (i != len - 1) {
			box = boxes[i];
			nextBox = boxes[i + 1]; 
			if (box.id < nextBox.id) {
				sortedCount++;
			} else {
				swap(boxes,i,i + 1);
				sortedCount = 0;
				i--;
			}
		} else { // end of if (i != len - 1)
			if (isSortFinished()) {
				return;
			} else {
				if (!sortStates.visualize) {
					i = 0;
					len--;
				}
				sortedCount = 0;
			}
		} // end of else
	} // end of for loop i < len
} // Bubble Sort function

