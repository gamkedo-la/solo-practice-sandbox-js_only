const SAMPLERATE = 60;

class NodeMaster {
	constructor() {
		this._nodes = [];
		this._mandatory = [];
	}

	AddNode(node, mandatory = false) {
		this._nodes.push(node);
		if (mandatory) this._mandatory.push(node);
	}

	ProcessAll() {
		for (let i = 0; i < this._nodes.length; i++) {
			this._nodes[i].ClearProcessedFlag();
		}

		for (let i = 0; i < this._nodes.length; i++) {
			this._nodes[i].Process();
		}
	}

	ProcessMandatory() {
		for (let i = 0; i < this._nodes.length; i++) {
			this._nodes[i].ClearProcessedFlag();
		}

		for (let i = 0; i < this._nodes.length; i++) {
			this._mandatory[i].Process();
		}
	}
}

class NodeBase {
	constructor(nodeMaster, mandatory = false) {
		this._procced = false;
		nodeMaster.AddNode(this, mandatory);
	}

	Process() {
		if (this._procced) return;
		this._procced = true;
		this.OnProcess();
	}

	ClearProcessedFlag() {
		this._procced = false;
	}

	OnProcess() {}
}

class Inlet {
	constructor(parentNode) {
		this._connection = null;
		this._parentNode = parentNode;
		this.defaultValue = 0;
	}

	GetValue() {
		if (this._connection == null) return this.defaultValue;
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

		this.value = 0;

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		this.value = this.inletA.GetValue() + this.inletB.GetValue();;
		this.outlet.SetValue(this.value);
	}
}

class NodeSubtract extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.value = 0;

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		this.value = this.inletA.GetValue() - this.inletB.GetValue();
		this.outlet.SetValue(this.value);
	}
}

class NodeMultiply extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.value = 0;

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		this.value = this.inletA.GetValue() * this.inletB.GetValue();
		this.outlet.SetValue(this.value);
	}
}

class NodeDivide extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.value = 0;

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		this.value = this.inletA.GetValue() / this.inletB.GetValue();
		this.outlet.SetValue(this.value);
	}
}

class NodeAnd extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.value = 0;

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		this.value = this.inletA.GetValue() && this.inletB.GetValue;
		this.outlet.SetValue(this.value);
	}
}

class NodeOr extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.value = 0;

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		this.value = this.inletA.GetValue() || this.inletB.GetValue();
		this.outlet.SetValue(this.value);
	}
}

class NodeXor extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.value = 0;

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		let valueA = this.inletA.GetValue();
		let valueB = this.inletB.GetValue();
		this.value = (valueA || valueB) && !(valueA && valueB);
		this.outlet.SetValue(this.value);
	}
}

class NodeNot extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.value = 0;

		this.inlet = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		this.value = !this.inletA.GetValue();
		this.outlet.SetValue(this.value);
	}
}

class NodeNand extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.value = 0;

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		this.value = !(this.inletA.GetValue() && this.inletB.GetValue());
		this.outlet.SetValue(this.value);
	}
}

class NodeNor extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.value = 0;

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		this.value = !(this.inletA.GetValue() || this.inletB.GetValue());
		this.outlet.SetValue(this.value);
	}
}

class NodeNxor extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.value = 0;

		this.inletA = new Inlet(this);
		this.inletB = new Inlet(this);
		this.outlet = new Outlet(this);
	}

	OnProcess() {
		let valueA = this.inletA.GetValue();
		let valueB = this.inletB.GetValue();
		this.value = !(valueA || valueB) || (valueA && valueB);
		this.outlet.SetValue(this.value);
	}
}

class NodeInput extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster);

		this.value = 0;

		this.outlet = new Outlet(this);
	}

	OnProcess() {
		this.outlet.SetValue(this.value);
	}
}

class NodeOutput extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster, true);

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
			while (index >= oldBufferLength) {index -= oldBufferLength;}
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
		super(nodeMaster, true);

		this.value = 0;

		this.inlet = new Inlet(this);
		this.outlet = new Outlet(this);

		this._buffer = new DelayBuffer(0);
	}

	OnProcess() {
		this.value = this._buffer.ReadWriteSample(this.inlet.GetValue());
		this.outlet.SetValue(this.value);
	}

	SetBufferSampleLength(numberOfSamples) {
		this._buffer.SetBufferSampleLength(numberOfSamples);
	}
}

class NodeLagAverage extends NodeDelay {
	OnProcess() {
		this._buffer.ReadWriteSample(this.inlet.GetValue())
		this.value = 0;
		for (let i = 0; i < this._buffer.numberOfSamples; i++) {
			this.value += this._buffer.GetSampleAt(i);
		}
		this.value /= this._buffer.numberOfSamples;

		this.outlet.SetValue(this.value);
	}
}

class NodeLagMax extends NodeDelay {
	OnProcess() {
		this._buffer.ReadWriteSample(this.inlet.GetValue())
		this.value = 0;
		for (let i = 0; i < this._buffer.numberOfSamples; i++) {
			this.value = Math.max(this.value, this._buffer.GetSampleAt(i));
		}

		this.outlet.SetValue(this.value);
	}
}

class NodeLagMin extends NodeDelay {
	OnProcess() {
		this._buffer.ReadWriteSample(this.inlet.GetValue())
		this.value = 0;
		for (let i = 0; i < this._buffer.numberOfSamples; i++) {
			this.value = Math.min(this.value, this._buffer.GetSampleAt(i));
		}

		this.outlet.SetValue(this.value);
	}
}

class NodeLFOGenerator extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster, true);

		this.Waveforms = {Tri: 0, Sin: 1, Saw: 2, Sqr: 3};
		this.waveform = this.Waveforms.Sin;

		this._frequency = 1.0;
		this._phasor = 0.0;
		this._phaseInc = this._frequency / SAMPLERATE;

		this.outlet0 = new Outlet(this);
		this.outlet90 = new Outlet(this);
		this.outlet180 = new Outlet(this);
		this.outlet270 = new Outlet(this);

		this.TO_RADIANS = Math.PI * 2;
	}

	get frequency() {return this._frequency;}
	set frequency(value) {
		this._frequency = value;
		this._phaseInc = this._frequency / SAMPLERATE;
	}

	OnProcess() {
		let value0 = this._phasor;
		let value90 = value0 + 0.25;
		if (value90 > 1.0) value90 -= 1.0;
		let value180 = value90 + 0.25;
		if (value180 > 1.0) value180 -= 1.0;
		let value270 = value180 + 0.25;
		if (value270 > 1.0) value270 -= 1.0;

		switch (this.waveform) {
			case this.Waveforms.Sin:
				value0 = Math.sin(value0 * this.TO_RADIANS);
				value90 = Math.sin(value90 * this.TO_RADIANS);
				value180 = -value0;
				value270 = -value90;
				break;
			case this.Waveforms.Saw:
				value0 = value0 * 2.0 - 1.0;
				value90 = value90 * 2.0 - 1.0;
				value180 = value180 * 2.0 - 1.0;
				value270 = value270 * 2.0 - 1.0;
				break;
			case this.Waveforms.Tri:
				value0 = Math.abs(value0 * 2.0 - 1.0) * 2.0 - 1.0;
				value90 = Math.abs(value90 * 2.0 - 1.0) * 2.0 - 1.0;
				value180 = -value0;
				value270 = -value90;
				break;
			case this.Waveforms.Sqr:
				value0 = value0 >= 0.5 ? 1.0 : -1.0;
				value90 = value90 >= 0.5 ? 1.0 : -1.0;
				value180 = -value0;
				value270 = -value90;
				break;
		}

		this.outlet0.SetValue(value0);
		this.outlet90.SetValue(value90);
		this.outlet180.SetValue(value180);
		this.outlet270.SetValue(value270);

		this._phasor += this._phaseInc;
		while (this._phasor > 1) {this._phasor -= 1;}
	}
}

class NodeFilter extends NodeBase {
	constructor(nodeMaster) {
		super(nodeMaster, true);

		this._a0 = 1;
		this._a1 = 0;
		this._a2 = 0;
		this._b1 = 0;
		this._b2 = 0;
		this._x_z1 = 0;
		this._x_z2 = 0;
		this._y_z1 = 0;
		this._y_z2 = 0;

		this._OVERSAMPLE = 4;
		this._frequency = SAMPLERATE / 4;
		this._q = 0.001;

		this.inlet = new Inlet(this);
		this.outletHPF = new Outlet(this);
		this.outletAPF = new Outlet(this);
		this.outletLPF = new Outlet(this);

		this.CalculateCoefficients();
	}

	get frequency() {return this._frequency;}
	set frequency(value) {
		this._frequency = value;
		this.CalculateCoefficients();
	}
	get q() {return this._q;}
	set q(value) {
		this._q = value;
		this.CalculateCoefficients();
	}

	OnProcess() {
		let xn = this.inlet.GetValue();
		var yn = xn;

		var xd = this._x_z1;
		let xStep = (xn - xd) / this._OVERSAMPLE;
		for (let i = 0; i < this._OVERSAMPLE; i++) {
			xd += xStep;

			yn = this._a0 * xd
			   + this._a1 * this._x_z1
			   + this._a2 * this._x_z2
			   - this._b1 * this._y_z1
			   - this._b2 * this._y_z2;

			this._x_z2 = this._x_z1;
			this._x_z1 = xd;
			this._y_z2 = this._y_z1;
			this._y_z1 = yn;
		}

		let lpf = yn;
		let hpf = xn - lpf;
		let apf = lpf - hpf;

		this.outletHPF.SetValue(-hpf);
		this.outletAPF.SetValue(apf);
		this.outletLPF.SetValue(lpf);
	}

	CalculateCoefficients() {
		let w0 = 2 * Math.PI * ((this._frequency / SAMPLERATE) * this._OVERSAMPLE);
		let cosw0 = Math.cos(w0);
		let sinw0 = Math.sin(w0);
		let d = 1 / this._q;
		let beta = 0.5 * ((1 - d / 2 * sinw0) / (1 + d / 2 * sinw0));
		let gamma = (0.5 + beta) * cosw0;

		this._a0 = (0.5 + beta - gamma) / 2;
		this._a1 = 0.5 + beta - gamma;
		this._a2 = (0.5 + beta - gamma) / 2;
		this._b1 = -2 * gamma;
		this._b2 = 2 * gamma;
	}
}