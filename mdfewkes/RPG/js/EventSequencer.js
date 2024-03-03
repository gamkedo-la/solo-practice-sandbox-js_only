class EventSequencer {
	constructor() {
		this._eventQueue = [];
	}

	Update() {
		if (this._eventQueue.length > 0) {
			let isFinished = this._eventQueue[0].Update();

			if (isFinished) {
				this._eventQueue.splice(0, 1)[0].onEnd();;				
			}
		}
	}

	Draw() {
		if (this._eventQueue.length > 0) {
			this._eventQueue[0].Draw();
		}
	}

	AddEvent(event) {
		this._eventQueue.push(event);
	}

	AddNextEvent(event) {
		this._eventQueue.splice(1, 0, event);
	}

	AddFirstEvent(event) {
		this._eventQueue.splice(0, 0, event);
	}

	get length() {
		return this._eventQueue.length;
	}
}

class Event {
	constructor() {}
	Update() {return true;}
	Draw() {}
	onEnd() {}
}

class TimerEvent extends Event {
	constructor(time = 1) {
		super();
		this._timeElapsed = 0;
		this._timeGoal = time;
	}

	Update() {
		this._timeElapsed += deltaTime;

		if (this._timeElapsed >= this._timeGoal) return true;
		
		return false
	}
}

class DelayEvent extends Event {
	constructor(delayedEvent, time = 1) {
		super();
		this._timeElapsed = 0;
		this._timeGoal = time;

		this._event = delayedEvent;
	}

	Update() {
		this._timeElapsed += deltaTime;
		let isFinished = false;

		if (this._timeElapsed >= this._timeGoal) {
			isFinished = this._event.Update();
		}

		return isFinished;
	}

	Draw() {
		if (this._timeElapsed >= this._timeGoal) {
			this._event.Draw();
		}
	}

	onEnd() {
		this._event.onEnd();
	}
}

class PolyEvent extends Event {
	constructor(eventList = []) {
		super();
		this._eventList = eventList;
	}

	Update() {
		let indexsOfFinishedEvents = [];

		for (let i =0; i < this._eventList.length; i++) {
			let isFinished = this._eventList[i].Update();

			if (isFinished) {
				indexsOfFinishedEvents.push(i);
			}
		}

		for (let i = indexsOfFinishedEvents.length-1; i >= 0; i--) {
				this._eventList.splice(indexsOfFinishedEvents[i], 1)[0].onEnd();
		}

		if (this._eventList.length == 0) return true;
		
		return false;
	}

	Draw() {
		for (let i = 0; i < this._eventList.length; i++) {
			this._eventList[i].Draw();
		}
	}

	onEnd() {
		for (let i = 0; i < this._eventList.length; i++) {
			this._eventList[i].onEnd();
		}
	}
}

class ParameterLerpEvent extends Event {
	constructor(parameterName, parameterObject, startValue, endValue, duration = 0.5, relative = false, decimals = 0) {
		super();
		this._timeElapsed = 0;
		this._timeGoal = duration;
		this._decimals = decimals

		this._parameterName = parameterName;
		this._parameterObject = parameterObject;
		this._startValue = startValue;
		this._endValue = endValue;

		if (relative) {
			let initialValue = this._parameterObject[this._parameterName];

			this._startValue = startValue + initialValue;
			this._endValue = endValue + initialValue;
		}

		this._parameterObject[this._parameterName] = this._startValue;
	}

	Update() {
		this._timeElapsed += deltaTime;

		if (this._timeElapsed > this._timeGoal) return true;

		let a = this._startValue;
		let b = this._endValue;
		let t = this._timeElapsed / this._timeGoal;

		this._parameterObject[this._parameterName] = roundToDecimalPlace(lerp(a, b, t), this._decimals);

		return false
	}

	onEnd() {
		this._parameterObject[this._parameterName] = this._endValue;
	}
}