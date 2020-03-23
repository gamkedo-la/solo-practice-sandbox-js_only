let inputMouse = new InputMouse();

window.addEventListener('blur', e => {
    isGameLoopPaused = true;
});
window.addEventListener('focus', e => {
    isGameLoopPaused = false;
    then = Date.now();
    requestAnimationFrame(main);
});

canvas.addEventListener('touchforcechange', e => {
    e.preventDefault();
}, { passive: false } );
canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    inputMouse.move(e);
}, { passive: false } );
canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    inputMouse.mousedown(e);
} );
canvas.addEventListener('touchend', e => {
    e.preventDefault();
    inputMouse.mouseup(e);
} );

canvas.addEventListener('mousemove', e => {
    e.preventDefault();
    inputMouse.move(e);
});
canvas.addEventListener('mousedown', e => {
    inputMouse.mousedown(e);
});
canvas.addEventListener('mouseup', e => {
    inputMouse.mouseup(e);
});
canvas.addEventListener('wheel', e => {

});
canvas.addEventListener('keypress', e => {

});
canvas.addEventListener('keydown', e => {

});
canvas.addEventListener('keyup', e => {

});

let reset = () => {

};
let update = (dt) => {    
    let stroke = StrokeTool.stroke(inputMouse);
    console.log(stroke.x1 + " " + stroke.y1 + " to " + stroke.x2 + " " + stroke.y2);
};
let render = (dt) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
     
    StrokeTool.render(inputMouse);
};
let getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
reset();
main();