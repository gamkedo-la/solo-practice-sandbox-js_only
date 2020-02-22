class Ray {
    constructor(rayAngle) {
        this.angle = normalizeAngle(rayAngle);
        this.wallHitHorX = 0;
        this.wallHitHorX = 0;
        this.wallHitVertX = 0;
        this.wallHitVertY = 0;
        this.wallHitX = 0;
        this.wallHitY = 0;
        this.distance = 0;
        this.isFacingDown = this.angle > 0 && this.angle < Math.PI;
        this.isFacingUp = !this.isFacingDown;
        this.isFacingRight = this.angle > 1.5 * Math.PI || this.angle < 0.5 * Math.PI;
        this.isFacingLeft = !this.isFacingRight;
        this.wasHitVertical = false;
    }

    cast(columnID) {


        //console.log(this.angle);
        //console.log("Facing Right? " + this.isFacingRight);
        //console. log("Facing Down? " + this.isFacingDown);

        var xHorIntercept, yHorIntercept;
        var xVertIntercept, yVertIntercept;
        var xStep, yStep;

        //Horizonal Ray Grid Intersection
        var foundHorWallHit = false;
        this.wallHitHorX = 0;
        this.wallHitHorX = 0;

        //Find the y-Coord of the closest horizontal grid intersection
        yHorIntercept = Math.floor(player.y / TILE_SIZE) * TILE_SIZE;
        if (this.isFacingDown) {
            yHorIntercept += TILE_SIZE;
        }
        //Find the x-Coord of the closest horizontal grid intersection
        xHorIntercept = player.x + ((player.y - yHorIntercept) / Math.tan(this.angle));


        //console.log(xHorIntercept + ", " + yHorIntercept);

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
        //console.log(xStep);

        var nextHorTouchX = xHorIntercept;
        var nextHorTouchY = yHorIntercept;

        if (this.isFacingUp) {
            nextHorTouchY--;
        }

        //increment xStep and yStep until it finds a wall

        while (nextHorTouchX >= 0 && nextHorTouchX < canvas.width && nextHorTouchY >= 0 && nextHorTouchY < canvas.width) {
            if (isWallTileAtPixelCoord(nextHorTouchX, nextHorTouchY)) {
                foundHorWallHit = true;
                this.wallHitHorX = nextHorTouchX;
                this.wallHitHorY = nextHorTouchY;

                //colorLine(player.x, player.y, this.wallHitHorX, this.wallHitHorX, "red");

                break;
            } else {
                nextHorTouchX += xStep;
                nextHorTouchY += yStep;
            }
        }


        //Vertical Intercept
        var foundVertWallHit = false;
        this.wallHotVertX = 0;
        this.wallHitVertY = 0;

        //Find the x-Coord of the closest vertical grid intersection
        xVertIntercept = Math.floor(player.x / TILE_SIZE) * TILE_SIZE;
        if (this.isFacingRight) {
            console.log(this.isFacingRight);
            xVertIntercept += TILE_SIZE;
        }

        //Find the y-Coord of the closest vertical grid intersection
        yVertIntercept = player.y + ((xVertIntercept - player.x) * Math.tan(this.angle));

        console.log(xVertIntercept + ", " + yVertIntercept);

        //calc the increment xStep and yStep
        xStep = TILE_SIZE;
        if (this.isFacingUp) {
            xStep *= -1;
        }

        yStep = TILE_SIZE * Math.tan(this.angle);
        if (this.isFacingUp && yStep > 0) {
            yStep *= -1;
        }
        if (this.isFacingDown && yStep < 0) {
            yStep *= -1;
        }
        //console.log(xStep);

        var nextVertTouchX = xVertIntercept;
        var nextVertTouchY = yVertIntercept;

        if (this.isFacingLeft) {
            nextVertTouchX--;
        }

        //increment xStep and yStep until it finds a wall

        while (nextVertTouchX >= 0 && nextVertTouchX < canvas.width && nextVertTouchY >= 0 && nextVertTouchY < canvas.width) {
            if (isWallTileAtPixelCoord(nextVertTouchX, nextVertTouchY)) {
                foundVertWallHit = true;
                this.wallHitVertX = nextVertTouchX;
                this.wallHitVertY = nextVertTouchY;

                //colorLine(player.x, player.y, this.wallHitVertX, this.wallHitVertX, "red");

                break;
            } else {
                nextVertTouchX += xStep;
                nextVertTouchY += yStep;
            }
        }

        //Calculate both hor and vert distances and choose the smallest value
        var horHitDist = DistanceBetweenTwoPixelCoords(player.x, player.y, this.wallHitHorX, this.wallHitHorY);
        var vertHitDist = DistanceBetweenTwoPixelCoords(player.x, player.y, this.wallHitVertX, this.wallHitVertY);
        
        if (horHitDist < vertHitDist){
            this.distance = horHitDist;
            this.wallHitX = this.wallHitHorX;
            this.wallHitY = this.wallHitHorY;
            this.wasHitVertical = false;
        } else {
            this.distance = vertHitDist;
            this.wallHitX = this.wallHitVertX;
            this.wallHitY = this.wallHitVertY;
            this.wasHitVertical = true;
        }

    }

    draw() {
        //colorLineAtAngle(player.x, player.y, this.angle, 40, "yellow");
        colorLine(player.x, player.y, this.wallHitX, this.wallHitY, "red");
    }


}