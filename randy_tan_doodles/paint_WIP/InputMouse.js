let InputMouse = function (cvs = canvas) {
    this.x = 0;
    this.y = 0;
    this.isDown = false;
    this.isMoving = false;

    this.update = e => {
        this.isMoving = true;
        this.getXY(e);
    };

    this.mousedown = e => {
        this.isDown = true;
        this.getXY(e);
    };

    this.mouseup = e => {
        this.isDown = false;        
        this.getXY(e);
    }

    this.getXY = e => {
        if (this.x != e.clientX) this.x = e.clientX;
        if (this.y != e.clientY) this.y = e.clientY;

        let rect = cvs.getBoundingClientRect();
        this.x -= rect.left;
        this.y -= rect.top;

        this.x = this.x * cvs.width / cvs.clientWidth;
        this.y = this.y * cvs.height / cvs.clientHeight;
        
        return { 'x': this.x, 'y': this.y };
    }
};