let InputMouse = function (cvs = canvas) {
    this.x = 0;
    this.y = 0;
    this.isClicked = false;
    this.isHeldDown = false;

    this.heldObject = null;
    this.lastHeldPos = {x: 0, y: 0};
    this.lastClickedPos = {x: 0, y: 0};

    this.update = function (x = this.x, y = this.y) {
        if (this.x != x) this.x = x;
        if (this.y != y) this.y = y;

        let rect = cvs.getBoundingClientRect();
        this.x -= rect.left;
        this.y -= rect.top;

        this.x = this.x * cvs.width / cvs.clientWidth;
        this.y = this.y * cvs.height / cvs.clientHeight;      
    };

    this.hold = function (evt) {
        this.isHeldDown = true;
        this.lastHeldPos.x = evt.clientX;
        this.lastHeldPos.y = evt.clientY;
    };

    this.click = function (evt) {
        this.isClicked = !this.isClicked;
        this.isHeldDown = false;
        this.lastClickedPos.x = evt.clientX;
        this.lastClickedPos.y = evt.clientY;
    };

};