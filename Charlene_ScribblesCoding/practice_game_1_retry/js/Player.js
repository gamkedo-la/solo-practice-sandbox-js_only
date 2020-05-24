const PLAYER_MOVE_SPEED = 3.0;

function Player() {
    // keep track of player's position
    this.x = 10;
    this.y = 550;

    this.keyHeld_East = false;
    this.keyHeld_West = false;
    this.keyHeld_Jump = false;

    this.setupControls = function(eastKey,westKey,jumpKey) {
        this.controlKeyForEast = eastKey;
        this.controlKeyForWest = westKey;
        this.controlKeyForJump = jumpKey;
    }

    // initialize character
    this.init = function() {
        this.character = colorRect(this.x, this.y, 20, 50, "black");
    }

    this.move = function() {
        // Moving left and right
        if (this.keyHeld_East) {
            this.x += PLAYER_MOVE_SPEED;
        } else if (this.keyHeld_West) {
            this.x -= PLAYER_MOVE_SPEED;
        }

        // --- Jump --- //
        
        if (this.keyHeld_Jump) {
            this.jump();
        }
        
        this.jump = function() {
            var onGround = true;
            var isJumping = false;
            var isFalling = false;
            
            if (onGround) {
                onGround = false;
                isJumping = true;
                    if (isJumping) {
                        this.y -= PLAYER_MOVE_SPEED * 3;
                        isFalling = true;
                        isJumping = false;
                        console.log("Is done jumping, falling now!")
                    }
                console.log("onGround: " + onGround + ", isJumping: " + isJumping + ", isFalling: " + isFalling);
                console.log("this.y: " + this.y);
            }
            
    
            if (isFalling) {
                this.y += PLAYER_MOVE_SPEED;
                console.log("Is falling!");
                
                if (this.y == 550) {
                    isFalling = false;
                    onGround = true;
                    console.log("Is onGround!");
                }
                
            }
        }
    }

}