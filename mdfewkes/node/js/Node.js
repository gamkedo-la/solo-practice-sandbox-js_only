class NodeMaster {
	constructor() {
		this._nodes = [];
	}

	AddNode(nodeToAdd) {
		this._nodes.push(nodeToAdd);
	}

	Process() {
		for (let i = 0; i < this._nodes.length; i++) {
			this._nodes[i].ClearProcced();
		}

		for (let i = 0; i < this._nodes.length; i++) {
			this._nodes[i].Process();
		}
	}
}

class NodeBase {
	constructor(nodeMaster) {
		this._procced = false;
		nodeMaster.AddNode(this);
	}

	GetInletList() {
		let inletList = [];
		for (let prop in this) {
			if (prop.toLowerCase().includes("inlet")) {
				inletList.push(prop)
			}
		}
		return inletList;
	}

	GetOutletList() {
		let outletList = [];
		for (let prop in this) {
			if (prop.toLowerCase().includes("outlet")) {
				outletList.push(prop)
			}
		}
		return outletList;
	}

	Process() {
		if (this._procced) return;
		this._procced = true;
		this.OnProcess();
	}

	ClearProcced() {
		this._procced = false;
	}

	OnProcess() {}
}

class Inlet {
	constructor(parentNode) {
		this._connection = null;
		this._parentNode = parentNode;
	}

	GetValue() {
		if (this._connection == null) return 0;
		return this._connection.GetValue();
	}

	Connect(outlet) {
		this._connection = outlet;
	}

	Disconnect(outlet) {
		this._connection = null;
	}
}

class Outlet {
	constructor(parentNode) {
		this._value = 0;
		this._parentNode = parentNode;
	}

	GetValue() {
		this._parentNode.Process();
		return this._value;
	}

	SetValue(value) {
		this._value = value;
	}

	Connect(inlet) {
		inlet.Connect(this);
	}

	Disconnect(inlet) {
		inlet.Disconnect(this);
	}
}

class NodeAdd extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		let value = this.inletA.GetValue() + this.inletB.GetValue();;
		this.outlet.SetValue(value);
	}
}

class NodeSubtract extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		let value = this.inletA.GetValue() - this.inletB.GetValue();
		this.outlet.SetValue(value);
	}
}

class NodeMultiply extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		let value = this.inletA.GetValue() * this.inletB.GetValue();
		this.outlet.SetValue(value);
	}
}

class NodeDivide extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		let value = this.inletA.GetValue() / this.inletB.GetValue();
		this.outlet.SetValue(value);
	}
}

class NodeAnd extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		let value = this.inletA.GetValue() && this.inletB.GetValue;
		this.outlet.SetValue(value);
	}
}

class NodeOr extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		let value = this.inletA.GetValue() || this.inletB.GetValue();
		this.outlet.SetValue(value);
	}
}

class NodeXor extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		let valueA = this.inletA.GetValue();
		let valueB = this.inletB.GetValue();
		let value = (valueA || valueB) && !(valueA && valueB);
		this.outlet.SetValue(value);
	}
}

class NodeNot extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.inlet = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		let value = !this.inletA.GetValue();
		this.outlet.SetValue(value);
	}
}

class NodeNand extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		let value = !(this.inletA.GetValue() && this.inletB.GetValue());
		this.outlet.SetValue(value);
	}
}

class NodeNor extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		let value = !(this.inletA.GetValue() || this.inletB.GetValue());
		this.outlet.SetValue(value);
	}
}

class NodeNxor extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		let valueA = this.inletA.GetValue();
		let valueB = this.inletB.GetValue();
		let value =  !(valueA || valueB) || (valueA && valueB);
		this.outlet.SetValue(value);
	}
}

class NodeInput extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.value = 0;

		this.outlet = new Outlet(this);
	}

	OnProcess() {
		let value = this.value;
		this.outlet.SetValue(value);
	}
}

class NodeOutput extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.value = 0;

		this.inlet = new Inlet(this);
	}

	OnProcess() {
		this.value = this.inlet.GetValue();
	}
}

class DelayBuffer {
	constructor(numberOfSamples) {
		this._buffer = null;
		this._index = -1;

		this.SetBufferSampleLength(numberOfSamples);
	}

	SetBufferSampleLength(numberOfSamples) {
		let newBuffer = [];
		newBuffer.length = numberOfSamples;

		if (this._buffer == null) {
			newBuffer.fill(0);			
		} else {
			var index = this._index + 1;
			if (index >= oldBufferLength) index -= oldBufferLength;
			var oldBufferLength = this._buffer.length;
			var stepsize = oldBufferLength / numberOfSamples;

			for (let i = 0; i < newBuffer.length; i++) {
				newBuffer[i] = this._buffer[Math.floor(index)];
				index += stepsize;
				if (index >= oldBufferLength) index -= oldBufferLength;
			}
		}

		this._buffer = newBuffer;
		this._index = -1;
	}

	ReadWriteSample(value) {
		this._index++;
		if (this._index >= this._buffer.length) {
			this._index = 0;
		}

		let sample = this._buffer[this._index];
		this._buffer[this._index] = value;

		return sample;
	}
	get numberOfSamples() {
		return this._buffer.length;
	}

	GetSampleAt(index) {
		if (index >= this._buffer.length) {
			index = index % this._buffer.length;
		}
		return this._buffer[index];
	}
}

class NodeDelay extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.inlet = new Inlet(this);
		this.outlet = new Outlet(this);

		this._buffer = new DelayBuffer(0);
	}

	OnProcess() {
		let value = this._buffer.ReadWriteSample(this.inlet.GetValue());
		this.outlet.SetValue(value);
	}

	SetBufferSampleLength(numberOfSamples) {
		this._buffer.SetBufferSampleLength(numberOfSamples);
	}
}

class NodeLag extends NodeDelay {
	OnProcess() {
		this._buffer.ReadWriteSample(this.inlet.GetValue())
		let value = 0;
		for (let i = 0; i < this._buffer.numberOfSamples; i++) {
			value += this._buffer.GetSampleAt(i);
		}
		value /= this._buffer.numberOfSamples;

		this.outlet.SetValue(value);
	}
}