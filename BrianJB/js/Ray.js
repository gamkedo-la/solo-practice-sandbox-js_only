class Ray {
    constructor(rayAngle) {
        this.angle = normalizeAngle(rayAngle);
        this.wallHitX = 0;
        this.wallHitY = 0;
        this.distance = 0;
        this.isFacingDown = this.angle > 0 && this.angle < Math.PI;
        this.isFacingUp = !this.isFacingDown;
        this.isFacingRight = this.angle > 1.5 * Math.PI || this.angle < 0.5 * Math.PI;
        this.isFacingLeft = !this.isFacingRight;
    }

    cast(columnID) {

        var xIntercept, yIntercept;
        var xStep, yStep;

        var foundHorWallHit = false;
        var foundVertWallHit = false;

        //Horizonal Ray Grid Intersection

        //console.log("Facing Right? " + this.isFacingRight);
        //console. log("Facing Down? " + this.isFacingDown);

        //Find the y-Coord of the closest horizontal grid intersection
        yIntercept = Math.floor(player.y / TILE_SIZE) * TILE_SIZE;
        if (this.isFacingDown) {
            yIntercept += TILE_SIZE;
        }
        //Find the x-Coord of the closest horizontal grid intersection
        xIntercept = player.x + ((player.y - yIntercept) / Math.tan(this.angle));

        //calc the increment xStep and yStep
        yStep = TILE_SIZE;
        if (this.isFacingUp) {
            yStep *= -1;
        }

        xStep = TILE_SIZE / Math.tan(this.angle);
        if (this.isFacingLeft && xStep > 0) {
            xStep *= -1;
        }
        if (this.isFacingRight && xStep < 0) {
            xStep *= -1;
        }

        var nextHorTouchX = xIntercept;
        var nextHorTouchY = yIntercept;

        if (this.isFacingUp) {
            nextHorTouchY--;
        }

        //increment xStep and yStep until it finds a wall

        while (nextHorTouchX >= 0 && nextHorTouchX < canvas.width && nextHorTouchY >= 0 && nextHorTouchY < canvas.width ) {
            if (isWallTileAtPixelCoord(nextHorTouchX, nextHorTouchY)) {
                foundHorWallHit = true;
                this.wallHitX = nextHorTouchX;
                this.wallHitY = nextHorTouchY;

                colorLine(player.x, player.y, this.wallHitX, this.wallHitY, "red");

                break;
            } else {
                nextHorTouchX += xStep;
                nextHorTouchY += yStep;
            }
        }
    }

    draw() {
        colorLineAtAngle(player.x, player.y, this.angle, 40, "yellow");
    }


}