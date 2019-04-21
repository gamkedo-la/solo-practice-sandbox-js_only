let CanvasPan = function (cvs = canvas, canvasContext = ctx, mouse = inputMouse) {
    this.startPos = {x: 0, y: 0};
    this.lastPos = {x: 0, y: 0};
    this.pannedOffset = {x: 0, y: 0};

    this.start = function (evt) {        
        let rect = cvs.getBoundingClientRect();
        this.startPos.x = (evt.clientX - rect.left) * (cvs.width / cvs.clientWidth) - this.lastPos.x;
        this.startPos.y = (evt.clientY - rect.top) * (cvs.height / cvs.clientHeight) - this.lastPos.y;    
    };

    this.end = function (evt) {        
        let rect = cvs.getBoundingClientRect();
        this.lastPos.x = (evt.clientX - rect.left) * (cvs.width / cvs.clientWidth) - this.startPos.x;
        this.lastPos.y = (evt.clientY - rect.top) * (cvs.height / cvs.clientHeight) - this.startPos.y;        
    };

    this.update = function (evt) {
        if (mouse.heldObject == null && mouse.isHeldDown) {
            let rect = cvs.getBoundingClientRect();
            let x = (evt.clientX - rect.left) * (cvs.width / cvs.clientWidth);
            let y = (evt.clientY - rect.top) * (cvs.height / cvs.clientHeight);
            this.pannedOffset.x = x - this.startPos.x;
            this.pannedOffset.y = y - this.startPos.y;
            inputMouse.x -= this.pannedOffset.x;
            inputMouse.y -= this.pannedOffset.y;
            canvasContext.setTransform(1, 0, 0, 1, this.pannedOffset.x, this.pannedOffset.y);
        }
    };
};