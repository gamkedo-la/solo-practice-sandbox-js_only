var canvasContext;
var canvas;

var mainInterface;
var nodeMaster;

var mouseX = -1;
var mouseY = -1;
var mouseIsDown = false;
var mouseJustPressed = false;
var mouseJustReleased = false;

function calculateMousePos(evt) {
	let rect = canvas.getBoundingClientRect(),
	root = document.documentElement;
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	//console.log(mouseX + " " + mouseY);
}

function mouseDownEvent(evt) {
	calculateMousePos(evt);
	mouseIsDown = true;
	mouseJustPressed = true;

}

function mouseUpEvent(evt) {
	mouseIsDown = false;
	mouseJustReleased = true;
}

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	document.getElementById('gameCanvas').addEventListener('pointermove', calculateMousePos);
	document.getElementById('gameCanvas').addEventListener('pointerdown', mouseDownEvent);
	document.getElementById('gameCanvas').addEventListener('pointerup', mouseUpEvent);

	mainInterface = new UIMainInterface("Node Interface", canvas.width, canvas.height);
	nodeMaster = new NodeMaster();

	addNode = new NodeAdd(nodeMaster);
	addNode = mainInterface.addPart(new UINode("Add Node", 100, 100, 100, 20, addNode));
	subNode = new NodeSubtract(nodeMaster);
	subNode = mainInterface.addPart(new UINode("Sub Node", 100, 200, 100, 20, subNode));
	multNode = new NodeMultiply(nodeMaster);
	multNode = mainInterface.addPart(new UINode("Mult Node", 300, 100, 100, 20, multNode));
	divNode = new NodeDivide(nodeMaster);
	divNode = mainInterface.addPart(new UINode("Div Node", 300, 200, 100, 20, divNode));
	delNode = new NodeDelay(nodeMaster);
	delNode.SetBufferSampleLength(60);
	delNode = mainInterface.addPart(new UINode("Del Node", 500, 100, 100, 20, delNode));
	lagNode = new NodeLagAverage(nodeMaster);
	lagNode.SetBufferSampleLength(60);
	lagNode = mainInterface.addPart(new UINode("Ave Node", 500, 200, 100, 20, lagNode));
	maxNode = new NodeLagMax(nodeMaster);
	maxNode.SetBufferSampleLength(60);
	maxNode = mainInterface.addPart(new UINode("Max Node", 500, 300, 100, 20, maxNode));

	lfoNode = new NodeLFOGenerator(nodeMaster);
	lfoNode = mainInterface.addPart(new UINode("LFO Node", 100, 300, 100, 20, lfoNode));
	filterNode = new NodeRCFilter(nodeMaster);
	filterNode = mainInterface.addPart(new UINode("RC Filter Node", 300, 300, 100, 20, filterNode));

	constNode0 = new NodeInput(nodeMaster);
	constNode0.value = 0;
	constNode0 = mainInterface.addPart(new UINode("0", 0, 15, 50, 30, constNode0));
	constNode1 = new NodeInput(nodeMaster);
	constNode1.value = 1;
	constNode1 = mainInterface.addPart(new UINode("1", 0, 72, 50, 30, constNode1));
	constNode2 = new NodeInput(nodeMaster);
	constNode2.value = 2;
	constNode2 = mainInterface.addPart(new UINode("2", 0, 129, 50, 30, constNode2));
	constNode3 = new NodeInput(nodeMaster);
	constNode3.value = 3;
	constNode3 = mainInterface.addPart(new UINode("3", 0, 186, 50, 30, constNode3));
	constNode4 = new NodeInput(nodeMaster);
	constNode4.value = 4;
	constNode4 = mainInterface.addPart(new UINode("4", 0, 243, 50, 30, constNode4));
	constNode5 = new NodeInput(nodeMaster);
	constNode5.value = 5;
	constNode5 = mainInterface.addPart(new UINode("5", 0, 300, 50, 30, constNode5));
	constNode6 = new NodeInput(nodeMaster);
	constNode6.value = 6;
	constNode6 = mainInterface.addPart(new UINode("6", 0, 357, 50, 30, constNode6));
	constNode7 = new NodeInput(nodeMaster);
	constNode7.value = 7;
	constNode7 = mainInterface.addPart(new UINode("7", 0, 414, 50, 30, constNode7));
	constNode8 = new NodeInput(nodeMaster);
	constNode8.value = 8;
	constNode8 = mainInterface.addPart(new UINode("8", 0, 471, 50, 30, constNode8));
	constNode9 = new NodeInput(nodeMaster);
	constNode9.value = 9;
	constNode9 = mainInterface.addPart(new UINode("9", 0, 528, 50, 30, constNode9));

	viewNode = new NodeOutput(nodeMaster);
	viewNode = mainInterface.addPart(new UINode("Out", canvas.width - 70, 285, 70, 30, viewNode));


	requestAnimationFrame(NextFrame);
}

function NextFrame() {
	nodeMaster.ProcessAll();
	mainInterface.update();

	colorRect(0, 0, canvas.width, canvas.height, 'lightgrey'); 
	if (activeNode != null) {
		colorRect(activeNode.x -2, activeNode.y -2, activeNode.w +4, activeNode.h +4, 'yellow');
	}
	mainInterface.draw();

	requestAnimationFrame(NextFrame);
}