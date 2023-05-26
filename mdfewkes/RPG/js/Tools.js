class EventSequencer {
	constructor() {
		this.EventList = [];
	}

	Update() {
		if (this.EventList.length > 0) {
			var isFinished = this.EventList[0].Update();

			if (isFinished) {
				this.EventList[0].onEnd();
				this.EventList.splice(0, 1);
			}
		}
	}

	Draw() {
		if (this.EventList.length > 0) {
			this.EventList[0].Draw();
		}
	}
}

class Event {
	constructor() {
	}

	Update() {
		return true;
	}

	Draw() {
	}

	onEnd() {
	}

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

class PolyEvent extends Event {
	constructor() {
		this.EventList = [];
	}

	Update() {
		for (var i = this.EventList.length - 1; i >= 0; i--) {
			var isFinished = this.EventList[i].Update();

			if (isFinished) {
				this.EventList[i].onEnd();
				this.EventList.splice(i, 1);
			}
		}

		if (this.EventList.length == 0) return true;
		else return false;
	}

	Draw() {
		for (var i = 0; i < this.EventList.length; i++) {
			this.EventList[i].Draw();
		}
	}

	onEnd() {
		for (var i = 0; i < this.EventList.length; i++) {
			this.EventList[i].onEnd();
		}
	}
}