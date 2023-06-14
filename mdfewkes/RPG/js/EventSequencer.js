class EventSequencer {
	constructor() {
		this.EventList = [];
	}

	Update() {
		if (this.EventList.length > 0) {
			let isFinished = this.EventList[0].Update();

			if (isFinished) {
				//this.EventList[0].onEnd();
				//this.EventList.splice(0, 1);

				this.EventList.splice(0, 1)[0].onEnd();;				
			}
		}
	}

	Draw() {
		if (this.EventList.length > 0) {
			this.EventList[0].Draw();
		}
	}

	AddEvent(event) {
		this.EventList.push(event);
	}

	AddNextEvent(event) {
		this.EventList.splice(1, 0, event);
	}

	AddFirstEvent(event) {
		this.EventList.splice(0, 0, event);
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
		this.timeElapsed = 0;
		this.timeGoal = time;
	}

	Update() {
		this.timeElapsed += deltaTime;

		if (this.timeElapsed >= this.timeGoal) return true;
		else return false
	}
}

class DelayEvent extends Event {
	constructor(delayedEvent, time = 1) {
		super();
		this.timeElapsed = 0;
		this.timeGoal = time;

		this.event = delayedEvent;
	}

	Update() {
		this.timeElapsed += deltaTime;
		let isFinished = false;

		if (this.timeElapsed >= this.timeGoal) {
			isFinished = this.event.Update();
		}

		return isFinished;
	}

	Draw() {
		if (this.timeElapsed >= this.timeGoal) {
			this.event.Draw();
		}
	}

	onEnd() {
		this.event.onEnd();
	}
}

class PolyEvent extends Event {
	constructor(eventList = []) {
		super();
		this.EventList = eventList;
	}

	Update() {
		let indexsOfFinishedEvents = [];

		for (let i =0; i < this.EventList.length; i++) {
			let isFinished = this.EventList[i].Update();

			if (isFinished) {
				//this.EventList[i].onEnd();
				indexsOfFinishedEvents.push(i);
			}
		}

		for (let i = indexsOfFinishedEvents.length-1; i >= 0; i--) {
				this.EventList.splice(i, 1)[0].onEnd();
		}

		if (this.EventList.length == 0) return true;
		else return false;
	}

	Draw() {
		for (let i = 0; i < this.EventList.length; i++) {
			this.EventList[i].Draw();
		}
	}

	onEnd() {
		for (let i = 0; i < this.EventList.length; i++) {
			this.EventList[i].onEnd();
		}
	}
}

class ParameterLerpEvent extends Event {
	constructor(parameterName, parameterObject, startValue, endValue, duration = 0.5, relative = false, decimals = 0) {
		super();
		this.timeElapsed = 0;
		this.timeGoal = duration;
		this.decimals = decimals

		this.parameterName = parameterName;
		this.parameterObject = parameterObject;
		this.startValue = startValue;
		this.endValue = endValue;

		if (relative) {
			let initialValue = this.parameterObject[this.parameterName];

			this.startValue = startValue + initialValue;
			this.endValue = endValue + initialValue;
		}

		this.parameterObject[this.parameterName] = this.startValue;
	}

	Update() {
		this.timeElapsed += deltaTime;

		if (this.timeElapsed > this.timeGoal) return true;

		let a = this.startValue;
		let b = this.endValue;
		let t = this.timeElapsed / this.timeGoal;

		this.parameterObject[this.parameterName] = roundToDecimalPlace(lerp(a, b, t), this.decimals);

		return false
	}

	onEnd() {
		this.parameterObject[this.parameterName] = this.endValue;
	}
}