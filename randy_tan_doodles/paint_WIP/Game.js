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
    inputMouse.update(e);
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
    inputMouse.update(e);
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

let drawX = 0;
let drawY = 0;
let isDrawing = false;
let points = [];

let reset = () => {

};
let update = (dt) => {
    if (inputMouse.isDown) {
        drawX = inputMouse.x;
        drawY = inputMouse.y;
        points.push({ 'x': drawX, 'y': drawY, 'isDrawing': isDrawing });
        isDrawing = true;
    }
    
    if (isDrawing) {
        if (inputMouse.isMoving) {
            drawX = inputMouse.x;
            drawY = inputMouse.y;
            points.push({ 'x': drawX, 'y': drawY, 'isDrawing': isDrawing });
        }

        if (!inputMouse.isDown) {            
            isDrawing =  false;
            points.push({ 'x': drawX, 'y': drawY, 'isDrawing': isDrawing });
        }
    }

};
let render = (dt) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
     
    Draw.colorCircle(inputMouse.x, inputMouse.y, 5, 'black');    
    for (let i = 0; i < points.length; i++) { 
        if (i > 0) {
            drawX = points[i-1].x;
            drawY = points[i-1].y;            
        }

        if (points[i].isDrawing) {
            Draw.follow(drawX, drawY, points[i].x, points[i].y, getRandomColor());
        }
        drawX = points[i].x;
        drawY = points[i].y;
    }
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