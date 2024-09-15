const FALL_SPEED = 3;

function fruitClass() { //create a class to easily create new fruits
    this.x = 75;
    this.y = 75;
    this.fruitPic; //which picture to use
    this.name = "Unknown Fruit"; //default name

    this.reset = function(whichImage, fruitName) {
        this.name = fruitName;
        this.fruitPic = whichImage;
        for(var eachRow = 0; eachRow < WORLD_ROWS; eachRow++){
            for(var eachCol = 0; eachCol < WORLD_COLS; eachCol++){
                var arrayIndex = rowColtoArrayIndex(eachCol, eachRow);
                if(worldGrid[arrayIndex] == WORLD_PLAYERSTART) {
                    worldGrid[arrayIndex] = WORLD_ROAD;
                    this.x = eachCol * WORLD_W + WORLD_W/2;
                    this.y = eachRow * WORLD_H + WORLD_H/2;    
                    return;
                } // end of PlayerStart if - is this world here
            } //end of col for       
        } // end of row for
        console.log("NO FRUIT FOUND!");
    } // end of playerReset func

    this.move = function(){
        this.y += FALL_SPEED;
    }

    this.draw = function() {
        drawBitmapCenteredWithRotation(this.fruitPic, this.x, this.y, 0);
    }
}