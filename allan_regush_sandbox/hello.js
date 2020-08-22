canvas = document.getElementById('canvas');

class GameState {
    constructor(states, initialState) {
        this.state = states;
        this.currentState = states[initialState]
        this.isActive = true;
    }

    start() {
        if (this.currentState != null && this.currentState != undefined) {
            this.isActive = true;
        }
        this.currentState.enter();
    }

    changeState(newState) {
        if(this.currentState == newState) return;
        this.changeState.exit();
        this.currentState = this.states[newState];
        this.currentState.enter(this.currentState);
    }

    update(deltaTime) {
        if(!this.isActive) return;
        this.currentState.update(deltaTime);
        const nextState = this.currentState;
        if (nextState) this.changeState(nextState);
    }

    render() {
        if(!this.isActive) return;
        this.currentState.render();
    }

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
    }
}

class State {
    constructor() { if (this.constructor === State) throw new Error("Can't instantiate abstract class."); }
    enter() { if (this.constructor === State) throw new Error("Abstract Method"); }
    update(deltaTime) { if (this.constructor === State) throw new Error("Abstract Method"); }
    render() { if (this.constructor === State) throw new Error("Abstract Method"); }
    exit() { if (this.constructor === State) throw new Error("Abstract Method"); }
}

class Menu extends State {
    constructor() {

    }

    enter() {

    }

    update(deltaTime) {

    }

    render() {

    }

    exit() {
        
    }
}

let instance = null;

class Test {
    constructor(data) {
        if(!instance) {
            instance = this;
            this.data = data;
        }
        return instance;
    }

    getData() {
        return this.data;
    }
}
