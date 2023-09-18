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

		let nodeInlets = this.node.GetInletList();
		for (let i = 0; i < nodeInlets.length; i++) {
			let newInlet = new UIInlet(nodeInlets[i], 5, i * 10 + 17, 10, 10, this.node[nodeInlets[i]]);
			this.addPart(newInlet);
			this.inlets.push(newInlet);
		}

		let nodeOutlets = this.node.GetOutletList();
		for (let i = 0; i < nodeOutlets.length; i++) {
			let newOutlet = new UIOutlet(nodeOutlets[i], this.w - 15, i * 10 + 17, 10, 10, this.node[nodeOutlets[i]]);
			this.addPart(newOutlet);
			this.outlets.push(newOutlet);
		}

		if (this.h < nodeInlets.length * 10 + 20) this.h = nodeInlets.length * 10 + 20;
		if (this.h < nodeOutlets.length * 10 + 20) this.h = nodeOutlets.length * 10 + 20;

		if (this.node.hasOwnProperty("value")) {
			this.value = this.addPart(new UITextLabel("value", this.w/2, (this.h+24)/2, 0, 0));
			this.value.textAlignment = "centered";
			this.value.label = this.node["value"];
		}
	}

	onUpdate() {
		if (this.value) {
			this.value.label = this.node["value"];
		}
	}

	leftMouseClick(x, y) {
		super.leftMouseClick(x, y);

		activeNode = this;
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

		if (this.dragging) {
			colorLine(this.x + 5, this.y + 5, mouseX, mouseY, 2, "blue");
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