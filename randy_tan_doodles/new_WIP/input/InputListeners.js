const Mouse = InputHandlers.mouse;

Game.canvas.addEventListener("touchforcechange", e => {
    e.preventDefault();
}, { passive: false } );
Game.canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    Mouse.move(e);
}, { passive: false } );
Game.canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    Mouse.mousedown(e);    
} );
Game.canvas.addEventListener("touchend", e => {
    e.preventDefault();
    Mouse.mouseup(e);
} );

Game.canvas.addEventListener("pointermove", e => {
    e.preventDefault();
    Mouse.move(e);
    Mouse.getXY(e);
});
Game.canvas.addEventListener("pointerdown", e => {
    Mouse.mousedown(e);    
});
Game.canvas.addEventListener("pointerup", e => {
    Mouse.mouseup(e);
});
Game.canvas.addEventListener("wheel", e => {
    
});

window.addEventListener("keypress", e => {

});
window.addEventListener("keydown", e => {
    if (e.code == "Space") {
        console.log("Space is down!");
    }
});
window.addEventListener("keyup", e => {
    
});