class NodeMaster {
	constructor() {
		this.nodes = [];
	}

	AddNode(nodeToAdd) {
		this.nodes.push(nodeToAdd);
	}

	Update() {
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].ClearProcced();
		}

		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].Process();
		}
	}
}
var nodeMaster = new NodeMaster();

class NodeBase {
	constructor() {
		this.procced = false;
		nodeMaster.AddNode(this);
	}

	OnProcess() {}

	ClearProcced() {
		this.procced = false;
	}

	Process() {
		if (this.procced) return;
		this.procced = true;
		this.OnProcess();
	}
}

class Inlet {
	constructor(parentNode) {
		this.connection = null;
		this.parentNode = parentNode;
	}

	GetValue() {
		if (this.connection == null) return 0;
		return this.connection.GetValue();
	}

	Connect(outlet) {
		this.connection = outlet;
	}
}

class Outlet {
	constructor(parentNode) {
		this.value = 0;
		this.parentNode = parentNode;
	}

	GetValue() {
		this.parentNode.Process();
		return this.value;
	}

	Connect(inlet) {
		inlet.Connect(this);
	}
}

class NodeTest extends NodeBase {
	constructor() {
		super();

		this.inlet = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		var value = this.inlet.GetValue();
		this.outlet.value = this.outlet.value + value;
	}
}

class NodeAdd extends NodeBase {
	constructor() {
		super();

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		this.outlet.value = this.inletA.GetValue() + this.inletB.GetValue();
	}
}

class NodeSubtract extends NodeBase {
	constructor() {
		super();

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		this.outlet.value = this.inletA.GetValue() - this.inletB.GetValue();
	}
}

class NodeMultiply extends NodeBase {
	constructor() {
		super();

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		this.outlet.value = this.inletA.GetValue() * this.inletB.GetValue();
	}
}

class NodeDivide extends NodeBase {
	constructor() {
		super();

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		this.outlet.value = this.inletA.GetValue() / this.inletB.GetValue();
	}
}

class NodeAnd extends NodeBase {
	constructor() {
		super();

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		this.outlet.value = this.inletA.GetValue() && this.inletB.GetValue();
	}
}

class NodeOr extends NodeBase {
	constructor() {
		super();

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		this.outlet.value = this.inletA.GetValue() || this.inletB.GetValue();
	}
}

class NodeXor extends NodeBase {
	constructor() {
		super();

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		var valueA = this.inletA.GetValue();
		var valueB = this.inletB.GetValue();
		this.outlet.value =  (valueA || valueB) && !(valueA && valueB);
	}
}

class NodeNot extends NodeBase {
	constructor() {
		super();

		this.inlet = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		this.outlet.value = !this.inletA.GetValue();
	}
}

class NodeNand extends NodeBase {
	constructor() {
		super();

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		this.outlet.value = !(this.inletA.GetValue() && this.inletB.GetValue());
	}
}

class NodeNor extends NodeBase {
	constructor() {
		super();

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		this.outlet.value = !(this.inletA.GetValue() || this.inletB.GetValue());
	}
}

class NodeNxor extends NodeBase {
	constructor() {
		super();

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		var valueA = this.inletA.GetValue();
		var valueB = this.inletB.GetValue();
		this.outlet.value =  !(valueA || valueB) || (valueA && valueB);
	}
}