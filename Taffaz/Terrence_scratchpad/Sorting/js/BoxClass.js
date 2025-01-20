const BOX_WIDTH = 38;
const BOX_HEIGHT = 38;

var boxes = [];

function box(x,y) {
	this.x = x;
	this.y = y;
	this.id;

	this.draw = function() {
		colorRect(this.x,this.y, BOX_WIDTH,BOX_HEIGHT, 'red');
		colorText(this.id, this.x + BOX_WIDTH/2,this.y + BOX_HEIGHT/1.5, 'white','center', '18px Times New Roman');
	}	
}

function drawBoxes() {
	var len = boxes.length;
	for (var b = 0; b < len; b++) {
		boxes[b].draw();
	}
}