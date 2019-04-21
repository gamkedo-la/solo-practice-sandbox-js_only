let canvas = document.createElement("canvas");
canvas.id = "gameCanvas";
let ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 800;
document.body.appendChild(canvas);

let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame ||
w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
let then = Date.now();

let main = function () {
    let now = Date.now();
    let delta = now - then;

    update(delta / 1000);
    render();

    then = now;
    requestAnimationFrame(main);
};

let inputMouse = new InputMouse();
canvas.addEventListener('mousemove', function (evt) {
    inputMouse.update(evt.clientX, evt.clientY);
});
canvas.addEventListener('mousedown', function (evt) {
    inputMouse.hold(evt);
});
canvas.addEventListener('mouseup', function (evt) {
    inputMouse.click(evt);
});
canvas.addEventListener('wheel', function (evt) {

});

let board = new Board();
// let board2 = new Board(300, 100);

let solver = new Solver();

let reset = function () {

};

let update = function (dt) {
    for (let i = 0; i < Boards.length; i++) {
        Boards[i].update(dt);
    }
    for (let i = 0; i < Tiles.length; i++) {
        Tiles[i].update(dt);
    }
};

let render = function () {
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < Boards.length; i++) {
        Boards[i].render();
    }
    for (let i = 0; i < Tiles.length; i++) {
        Tiles[i].render();
    }
};

reset();
main();
