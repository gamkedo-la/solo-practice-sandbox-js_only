const Camera = {
    x: -260,
    y: 180,
    offsetX: -260,
    offsetY: 180,

    startPan: scene => {        
        if (Game.currentScene == scene) {            
            Game.canvasContext.save();
            Game.canvasContext.translate(
                Camera.x + Camera.offsetX,
                Camera.y + Camera.offsetY
            );            
        }
    },

    follow: (x, y, scene) => {
        if (Game.currentScene == scene) {         
            Camera.x = x + Game.canvas.width / 2;
            Camera.y = y + Game.canvas.height / 2;
        }
    },

    endPan: scene => {
        if (Game.currentScene == scene) {         
            Game.canvasContext.restore();
        }
    },
};