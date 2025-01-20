var activeNode = null;
var activeInlet = null;
var activeOutlet = null;

class UINode extends UIElement {
	constructor(name, x, y, w, h, node) {
		super(name, x, y, w, h);

		this.node = node;
		this.inlets = [];
		this.outlets = [];
		this.value = null;

		let moveBar = new UIMoveBar("moveBar", 0, 0, this.w, 16);
		this.addPart(moveBar);
		moveBar.addPart(new UITextLabel("title", 3, 12, 0, 0, name));

		let nodeInlets = GetInletList(this.node);
		for (let i = 0; i < nodeInlets.length; i++) {
			let newInlet = new UIInlet(nodeInlets[i], 5, i * 10 + 17, 10, 10, this.node[nodeInlets[i]]);
			this.addPart(newInlet);
			this.inlets.push(newInlet);
		}

		let nodeOutlets = GetOutletList(this.node);
		for (let i = 0; i < nodeOutlets.length; i++) {
			let newOutlet = new UIOutlet(nodeOutlets[i], this.w - 15, i * 10 + 17, 10, 10, this.node[nodeOutlets[i]]);
			this.addPart(newOutlet);
			this.outlets.push(newOutlet);
		}

		let inletHeight = nodeInlets.length * 10 + 20;
		let outletHeight = nodeOutlets.length * 10 + 20;
		this.h = Math.max(inletHeight, outletHeight);

		if (this.node.hasOwnProperty("value")) {
			this.value = this.addPart(new UITextLabel("value", this.w/2, (this.h+24)/2, 0, 0));
			this.value.textAlignment = "center";
			this.value.label = this.node["value"];
		}
	}

	onUpdate() {
		if (this.value) {
			this.node.Process();
			let value = this.node["value"];
			if (typeof(value) == "number" && !Number.isInteger(value)) {
				value = value.toFixed(2);
			}
			this.value.label = value;
		}
	}

	leftMouseClick(x, y) {
		super.leftMouseClick(x, y);

		activeNode = this;
	}
}

class UIInlet extends UIElement {
	constructor(name, x, y, w, h, nodeInlet) {
		super(name, x, y, 10, 10);

		this.inlet = nodeInlet;
		this.connection = null;

		this.dragging = false;
	}

	connect(outletUI) {
		if (outletUI == null) return;

		this.connection = outletUI;
		this.inlet.Connect(outletUI.outlet);
	}

	disconnect(outletUI) {
		if (outletUI == null) return;

		this.connection = null;
		this.inlet.Disconnect(outletUI.outlet);
	}

	onDraw() {
		colorEmptyCircle(this.x + 5, this.y + 5, 3, "blue");

		this.mi().lateDraw.push(this);
	}

	lateDraw() {
		if (this.connection != null) {
			colorLine(this.x + 5, this.y + 5, this.connection.x + 5, this.connection.y + 5, 2, "blue");
		} else if (this.dragging) {
			colorLine(this.x + 5, this.y + 5, mouseX, mouseY, 2, "blue");
		}

		if (isInElement(this, mouseX, mouseY)) {
			let text = this.name.replace("inlet", "");
			colorText(text, mouseX-1, mouseY-1, "white", "14px Arial", "end");
			colorText(text, mouseX+1, mouseY-1, "white", "14px Arial", "end");
			colorText(text, mouseX-1, mouseY+1, "white", "14px Arial", "end");
			colorText(text, mouseX+1, mouseY+1, "white", "14px Arial", "end");
			colorText(text, mouseX,   mouseY,   "black", "14px Arial", "end");
		}
	}

	onUpdate() {
		if (this.dragging) {
			if (!mouseIsDown && mouseJustReleased) {
				this.dragging = false;
				if (activeInlet == this) activeInlet = null;

				this.connection = FindOutletAt(mouseX, mouseY);
				this.connect(this.connection);
			}
			if (!mouseIsDown && !mouseJustReleased) {
				this.dragging = false;
				if (activeInlet == this) activeInlet = null;
			}
		}
	}

	onLeftMouseClick() {
		activeInlet = this;
		activeOutlet = null;
		this.dragging = true;
		this.disconnect(this.connection);
	}
}

class UIOutlet extends UIElement {
	constructor(name, x, y, w, h, nodeOutlet) {
		super(name, x, y, 10, 10);

		this.outlet = nodeOutlet;

		this.dragging = false;
	}

	connect(inletUI) {
		if (inletUI == null) return;

		inletUI.connect(this);
		this.outlet.Connect(inletUI.inlet);
	}

	disconnect(inletUI) {
		if (inletUI == null) return;
		
		inletUI.disconnect(this);
		this.outlet.Disconnect(inletUI.inlet);
	}

	onDraw() {
		colorEmptyCircle(this.x + 5, this.y + 5, 3, "blue");

		this.mi().lateDraw.push(this);
	}

	lateDraw() {

		if (this.dragging) {
			colorLine(this.x + 5, this.y + 5, mouseX, mouseY, 2, "blue");
		}

		if (isInElement(this, mouseX, mouseY)) {
			let text = this.name.replace("outlet", "");
			colorText(text, mouseX-1, mouseY-1, "white", "14px Arial", "end");
			colorText(text, mouseX+1, mouseY-1, "white", "14px Arial", "end");
			colorText(text, mouseX-1, mouseY+1, "white", "14px Arial", "end");
			colorText(text, mouseX+1, mouseY+1, "white", "14px Arial", "end");
			colorText(text, mouseX,   mouseY,   "black", "14px Arial", "end");
		}
	}

	onUpdate() {
		if (this.dragging) {
			if (!mouseIsDown && mouseJustReleased) {
				this.dragging = false;
				if (activeOutlet == this) activeOutlet = null;

				let connection = FindInletAt(mouseX, mouseY);
				this.connect(connection);
			}
			if (!mouseIsDown && !mouseJustReleased) {
				this.dragging = false;
				if (activeOutlet == this) activeOutlet = null;
			}
		}
	}

	onLeftMouseClick() {
		activeInlet = null;
		activeOutlet = this;
		this.dragging = true;
	}
}

function FindInletAt(x, y) {
	let stack = [];
	stack.push(mainInterface);
	while (stack.length > 0) {
		let node = stack.pop();

		if (!isInElement(node, x, y)) {
			continue;
		}

		if (node instanceof UIInlet) {
			return node;
		}

		for (let i = node.active.length-1; i >= 0; i--) {
			stack.push(node.active[i]);
		}
	}

	return null;
}

function FindOutletAt(x, y) {
	let stack = [];
	stack.push(mainInterface);
	while (stack.length > 0) {
		let node = stack.pop();

		if (!isInElement(node, x, y)) {
			continue;
		}

		if (node instanceof UIOutlet) {
			return node;
		}

		for (let i = node.active.length-1; i >= 0; i--) {
			stack.push(node.active[i]);
		}
	}

	return null;
}

function GetInletList(node) {
	let inletList = [];
	for (let prop in node) {
		if (prop.toLowerCase().includes("inlet")) {
			inletList.push(prop)
		}
	}
	return inletList;
}

function GetOutletList(node) {
	let outletList = [];
	for (let prop in node) {
		if (prop.toLowerCase().includes("outlet")) {
			outletList.push(prop)
		}
	}
	return outletList;
}