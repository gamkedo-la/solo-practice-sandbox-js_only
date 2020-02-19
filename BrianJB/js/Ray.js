class Ray {
    constructor(rayAngle){
        this.angle = rayAngle;
    }

    draw(){
        colorLineAtAngle(player.x, player.y, this.angle, 40, "yellow");
    }
}