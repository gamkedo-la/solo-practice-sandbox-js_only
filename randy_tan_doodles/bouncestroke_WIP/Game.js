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

let skyColor = '';

const reset = () => {

};
const update = dt => {
    sun.update(dt);
    rock.update(dt, [stroke, net]);
    net.update(dt, [stroke, rock]);
    stroke.update(dt, inputMouse, rock);

    console.log(sun.x, sun.y)
    
    if (sun.x < -90) {
        skyColor = '#0B2A4D';
    }
    else if (sun.x < -50) {
        skyColor = '#00326B';
    }
    else if (sun.x < -30) {
        skyColor = '#0A478D';
    }
    else if (sun.x < -10) {
        skyColor = '#1880C7';
    }
    else if (sun.x < 10) {
        skyColor = '#5EB6F3';
    }
    else if (sun.x < 90 )  {
        skyColor = '#EAE7E5';
    }
    else if (sun.x < canvas.width / 4) {
        skyColor = '#FFFFFF';
    }
    else if (sun.x < canvas.width / 2) {
        skyColor = '#FFE9DA';
    }
    else if (sun.x < canvas.width / 2 + canvas.width / 16) {
        skyColor = '#FFC49C';
    }
    else if (sun.x < canvas.width / 2 + canvas.width / 8) {
        skyColor = '#F19E66';
    }
    else if (sun.x < canvas.width / 2 + canvas.width / 8 + canvas.width / 8) {
        skyColor = '#FF9248';
    }
    else if (sun.x < canvas.width / 2 + canvas.width / 8 + canvas.width / 8 + canvas.width / 8) {
        skyColor = '#131345';
    }
    else {
        skyColor = '#000000';
    }
    
    // console.log(stroke.x1 + " " + stroke.y1 + " to " + stroke.x2 + " " + stroke.y2);
};

const render = dt => {
    canvasContext.fillStyle = skyColor;
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
