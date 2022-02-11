export class Input {
  constructor() {
	this.up = this.down = this.left = this.right = this.shoot = false;
	document.addEventListener("keydown", event => this.keyPress(event));
	document.addEventListener("keyup", event => this.keyRelease(event));
  }

  flipInputState(key, value) {
	switch (key) {
	case " ":
	  this.shoot = value;
	  break;
	case "ArrowLeft":
	  this.left = value;
	  break;
	case "ArrowRight":
	  this.right = value;
	  break;
	case "ArrowUp":
	  this.up = value;
	  break;
	case "ArrowDown":
	  this.down = value;
	  break;
	}
  }

  keyPress(event) {
	if (event.key == "F12") {
	  return;
	}
	event.preventDefault();
	this.flipInputState(event.key, true);
  }

  keyRelease(event) {
	if (event.key == "F12") {
	  return;
	}
	event.preventDefault();
	this.flipInputState(event.key, false);
  }
}
