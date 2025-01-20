var mousePos;
  
function initInput() {
	document.addEventListener("mousedown", mouseClick);
	document.addEventListener("mousemove", 
		function(evt) {
		mousePos = calculateMousePos(evt);
		});
}

function mouseClick(evt){
	if (!(mousePos.x > 0 && mousePos.x < canvas.width) ||
		!(mousePos.y > 0 && mousePos.y < canvas.height)) {
		console.log("mouse off canvas");
	}

}

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}