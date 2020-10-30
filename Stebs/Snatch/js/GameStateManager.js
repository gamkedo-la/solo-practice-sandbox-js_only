const State = {
  PLAY: 0
};

class GameStateManager {
  constructor() {
    this.state = State.MENU;
    this.stateStack = [ 
                        new Play(),
                        
                      ];
  }

  setState(newState, newScene = 0) {
    this.state = newState;

    if (this.state == State.CUTSCENE)
      this.stateStack[State.CUTSCENE].setCutscene(newScene);
  }

  getState() {
    return this.stateStack[this.state];
  }
}
