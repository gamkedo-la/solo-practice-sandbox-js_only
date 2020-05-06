const DISPLAY_LIFE = 50;

function scoreDisplayClass() {
    this.x, this.y;
    this.color = "white";
	this.readyToRemove = false;

    this.reset = function() {
        this.readyToRemove = true;
    }

    this.displayFrom = function(points, xPos, yPos, velocityX, velocityY, timeToDisplay, textColor) {
        this.x = xPos;
        this.y = yPos;
        this.xv = velocityX || 0;
        this.yv = velocityY || 0;
        this.displayTime = timeToDisplay || DISPLAY_LIFE;
        this.displayMessage = points;
		this.color = textColor || "white";
    }

    this.movement = function() {

        if (this.displayTime > 0) {
            this.displayTime--;
        } else {
            this.reset();
        }
    }

    this.draw = function() {
        if (this.displayTime > 0) {
            colorText(this.displayMessage, this.x, this.y, this.color);
		}
	}
}
		