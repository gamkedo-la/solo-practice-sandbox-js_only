const Rock = function(cvs = canvas, ctx = canvasContext) {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;

    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;

    this.currentRotationRad = 0;
    this.angularVelocity = 0;
    this.angularDampening = 0.2;

    this.img = document.createElement("img");
    this.img.src = "rock.png";
    this.imgLoaded = false;

    this.colCheck = new Collision();

    this.img.onload = () => {
        this.imgLoaded = true;
        this.x = cvs.width * 0.5 - this.img.width * 0.25;
    };

    this.update = (dt, col) => {
        if (this.imgLoaded) {
            this.x += this.vx * dt;

            this.vy += 9.81;            
            this.y += this.vy * dt;

            this.x1 = this.x + 14;
            this.y1 = this.y + 14;
            this.x2 = this.x + this.img.width * 0.40;
            this.y2 = this.y + this.img.height * 0.40;
            
            this.xMid = this.x1 + (this.x2 - this.x1) / 2;

            for (let c = 0; c < col.length; c++) {
                if (col[c] != undefined) {
                    
                    if (col[c].name == "stroke tool") {
                        if (col[c].points && col[c].points.length > 4) {
                            for (let i = 0; i < col[c].points.length; i++) {
                                let p = col[c].points[i];                    
                                
                                if (this.colCheck.isColliding(p.x, p.y, p.x, p.y, 
                                                            this.x1, this.y1, this.x2, this.y2)) {
                                    this.vy += -15000 * dt;

                                    if (p.x > this.xMid) {
                                        this.vx -= 15000 * dt;
                                        this.angularVelocity += 20;
                                        break;  
                                    }

                                    if (p.x < this.xMid) {
                                        this.vx += 15000 * dt;
                                        this.angularVelocity -= 20;
                                        break;
                                    }

                                    break;
                                }
                            }
                        }
                    }

                    if (col[c].name == "net") {
                        let net = col[c];
                        if (this.colCheck.isColliding(this.x2, this.y2, this.x1, this.y1,
                                                      net.x, net.y, net.x + net.w, net.y + net.h)) {
                            
                            console.log("Rock hits net!");

                            let l = this.xMid > net.x;
                            let r = this.xMid < net.x + net.w;
                                
                            if (this.x > net.x) {
                                if (l) {
                                    this.vx = 15000 * dt;                                
                                }
                            }
                            if (this.x < net.x) {
                                if (r) {
                                    this.vx = -15000 * dt;                                                 
                                }
                            }
                        }
                    }

                }
            }
            
            if (this.x1 < 0) {
                this.vx = Math.abs(this.vx) * 0.75;
            }
            else if (this.x2 > cvs.width) {
                this.vx = -Math.abs(this.vx) * 0.75;
            }

            if (this.vy > cvs.height * 0.5) {
                this.vy = this.y > cvs.height - this.img.height * 0.5 ? -35000 * dt : this.vy;
            }
            else {
                this.vy = this.y < 0 ? 10000 * dt : this.vy;
            }

            this.currentRotationRad += this.angularVelocity * dt;

            if (this.angularVelocity > 0.1) {
                this.angularVelocity += -this.angularDampening;                
            }
            else if (this.angularVelocity < -0.1) {
                this.angularVelocity += this.angularDampening;
            }
        }
    };

    this.render = dt => {
        if (this.imgLoaded) {
            ctx.save();
            
            ctx.translate(this.x1 + 10, this.y1 + 15);
            ctx.rotate(this.currentRotationRad * Math.PI / 180);
            Draw.image(this.img, 0, 0, 176, 185, -this.img.width * 0.25, -this.img.height * 0.25, 176 * 0.5, 185 * 0.5);

            ctx.restore();

            Draw.outlineRect(this.x, this.y, this.x2 - this.x1, this.y2 - this.y1, "Magenta", 2);
        }
    };
};