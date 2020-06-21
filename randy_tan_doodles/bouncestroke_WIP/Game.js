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
window.addEventListener('touchmove', e => {
    e.preventDefault();
    inputMouse.move(e);
}, { passive: false } );
window.addEventListener('touchstart', e => {
    e.preventDefault();
    inputMouse.mousedown(e);
} );
window.addEventListener('touchend', e => {
    e.preventDefault();
    inputMouse.mouseup(e);
} );

window.addEventListener('pointermove', e => {
    e.preventDefault();
    inputMouse.move(e);
});
window.addEventListener('pointerdown', e => {
    inputMouse.mousedown(e);
});
window.addEventListener('pointerup', e => {
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

let net = new Net();
let rock = new Rock();
let stroke = new StrokeTool();

let reset = () => {

};
let update = dt => {
    net.update(dt);
    rock.update(dt, [stroke, net]);
    stroke.update(dt, inputMouse, rock);

    // console.log(stroke.x1 + " " + stroke.y1 + " to " + stroke.x2 + " " + stroke.y2);
};
let render = dt => {
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
     
    net.render(dt);
    rock.render(dt);
    stroke.render(inputMouse);
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