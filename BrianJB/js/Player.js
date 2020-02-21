class Player {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.radius = 5;
        this.turnDirection = 0; // -1 if left, +1 if right
        this.walkDirection = 0; // -1 if back, +1 if forward
        this.keyHeld_Forward = false;
        this.keyHeld_Backward = false;
        this.keyHeld_TurnLeft = false;
        this.keyHeld_TurnRight = false;
        this.rotationAngle = Math.PI / 2;
        this.moveSpeed = 3.0;
        this.rotationSpeed = 3 * (Math.PI / 180);
        this.rays = [];
    }

    update() {

        this.updatePosition();
        this.castAllRays();

    }

    updatePosition() {

        if (this.keyHeld_TurnLeft) {
            this.rotationAngle -= this.rotationSpeed;
        }

        if (this.keyHeld_TurnRight) {
            this.rotationAngle += this.rotationSpeed;
        }

        if (this.keyHeld_Forward) {

            var newPos = getPixelCoordFromAngleAndSpeed(this.x, this.y, this.rotationAngle, this.moveSpeed)

            if (isWallTileAtPixelCoord(newPos[0], newPos[1])) {
                return;
            }

            this.x = newPos[0];
            this.y = newPos[1];
        }

        if (this.keyHeld_Backward) {
            var newPos = getPixelCoordFromAngleAndSpeed(this.x, this.y, this.rotationAngle, -this.moveSpeed)

            if (isWallTileAtPixelCoord(newPos[0], newPos[1])) {
                return;
            }

            this.x = newPos[0];
            this.y = newPos[1];
        }
    }

    draw() {
        this.rays.forEach(element => element.draw());
        colorCircle(this.x, this.y, this.radius, 'red');
        colorLineAtAngle(this.x, this.y, this.rotationAngle, 20, "red");
    }

    setupControls(forwardKey, backKey, leftKey, rightKey) {
        this.controlKeyForForward = forwardKey;
        this.controlKeyForBackward = backKey;
        this.controlKeyForTurnLeft = leftKey;
        this.controlKeyForTurnRight = rightKey;
    }

    castAllRays(){
        //columnID = 0;
    
        var rayAngle = this.rotationAngle - (FOV_RADS / 2);
        this.rays = [];
    
        for (var i = 0; i < NUM_OF_RAYS; i++){
            var ray = new Ray(rayAngle);
            this.rays.push(ray);
    
            rayAngle += RAY_ANGLE_INCREMENT;
            //columnID++;
        }
    }
}