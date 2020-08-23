const StrokeTool = function() {
    this.name = "stroke tool";
    this.drawX = 0;
    this.drawY = 0;
    this.isDrawing = false;
    this.isBent = false;
    this.points = [];
    this.bentPoints = [];
    this.size = 5;
    this.margin = 0;

    this.colCheck = new Collision();

    let x1, y1, x2, y2;

    this.update = (dt, input, col) => {
        if (!this.isDrawing && input.isDown) {
            this.drawX = input.x;
            this.drawY = input.y;
            this.points.push({
                'x': this.drawX,
                'y': this.drawY,
                'isDrawing': this.isDrawing,
                'isBent': this.isBent
            });
            x1 = this.points[0].x;
            y1 = this.points[0].y;
            this.isDrawing = true;
        }
        
        if (this.isDrawing) {
            if (input.isMoving) {
                this.drawX = input.x;
                this.drawY = input.y;

                let prev = this.points[this.points.length - 1];
                if (prev.x != this.drawX || prev.y != this.drawY) {
                    this.points.push({
                        'x': this.drawX,
                        'y': this.drawY, 
                        'isDrawing': this.isDrawing,
                        'isBent': this.isBent
                    });
                }

                x2 = this.points[this.points.length - 1].x;
                y2 = this.points[this.points.length - 1].y;
            }

            if (input.isDown) {                
                for (let i = 0; i < this.points.length; i++) {
                    let pt = this.points[i];
                    
                    if (this.colCheck.isColliding(pt.x, pt.y, pt.x, pt.y,
                                                  col.x1, col.y1, col.x2, col.y2)) {
                        this.points[i].y += 200 * dt;

                        // console.log(this.points[i].x + " " + this.points.length);
                    }
                }
            }
            else {
                this.isDrawing = false;
                this.points = [];
            }
        }

        return {
            "x1": x1,
            "y1": y1,
            "x2": x2,
            "y2": y2
        };
    };

    this.render = input => {
        Draw.rect(input.x - this.size * 0.5, input.y - this.size * 0.5, this.size, this.size, 'Black');
        // Draw.colorCircle(input.x, input.y, this.size, 'black'); 
        for (let i = 0; i < this.points.length; i++) {
            if (i > 0) {
                this.drawX = this.points[i - 1].x;
                this.drawY = this.points[i - 1].y;
            }
    
            if (this.points[i].isDrawing) {
                Draw.follow(this.drawX, this.drawY, this.points[i].x, this.points[i].y, 'Black', this.size);
            }
            
            this.drawX = this.points[i].x;
            this.drawY = this.points[i].y;
        }
    };
};