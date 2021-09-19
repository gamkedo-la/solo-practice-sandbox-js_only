const inputMouse = new InputMouse();

window.addEventListener('blur', e => {
    isGameLoopPaused = true;
});
window.addEventListener('focus', e => {
    isGameLoopPaused = false;
    then = Date.now();
    requestAnimationFrame(main);
});
window.addEventListener('load', e => {
    canvas.height = window.innerHeight;
    canvas.width = canvas.height * ASPECT_RATIO;
});
window.addEventListener('resize', e => {
    canvas.height = window.innerHeight;
    canvas.width = canvas.height * ASPECT_RATIO;
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

const net = new Net();
const sun = new Sun();
const rock = new Rock();
const stroke = new StrokeTool();

const reset = () => {

};
const update = dt => {
    sun.update(dt);
    rock.update(dt, [stroke, net]);
    net.update(dt, [stroke, rock]);
    stroke.update(dt, inputMouse, rock);

    // console.log(stroke.x1 + " " + stroke.y1 + " to " + stroke.x2 + " " + stroke.y2);
};
const render = dt => {
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    
    sun.render(dt);
    net.render(dt);
    rock.render(dt);
    stroke.render(inputMouse);
};
const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
reset();
main();