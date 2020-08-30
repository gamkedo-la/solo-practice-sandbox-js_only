const UI = {
    data: [],

    reset: () => {
        let i;
        for (i = 0; i < UI.data.length; i++) {
            let o = UI.data[i];

            if (o.onClicked != undefined && o.onClicked != null) {                
                InputHandlers.mouse.addClickHandler(o.onClicked);       
            }
        }
    },

    draw: (dt, data) => {
        let i;
        for (i = 0; i < UI.data.length; i++) {
            let o = UI.data[i];

            if (o.visible) {
                if (o.onClicked != undefined && o.onClicked != null) {        
                    UI.button(o.x, o.y, o.width, o.height, null, o.visible, o.active, dt, o.img, o.onClicked);                
                }
                else {
                    UI.panel(o.x, o.y, o.width, o.height, null, o.visible, o.active, dt, o.img);
                }
            }
        }
    },

    disable: () => {
        let i;
        for (i = 0; i < UI.data.length; i++) {
            let o = UI.data[i];

            if (o.onClicked != undefined && o.onClicked != null) {                
                InputHandlers.mouse.removeClickHandler(o.onClicked);       
            }
        }
    },

    panel: (x, y, width, height, bgColor, isVisible, isActive, dt, imgBg) => {
        if (bgColor != undefined && bgColor != null) {
            Game.canvasContext.fillStyle = bgColor;
            Game.canvasContext.fillRect(x, y, width, height);
        }

        Game.canvasContext.drawImage(imgBg, x, y, width, height);
    },

    button: (x, y, width, height, bgColor, isVisible, isActive, dt, imgBg, onClicked, imgDown, imgHover, imgUp) => {
        let w = 1, h = 1, feedbackScale = 0.1, feedbackAlpha = 1.0;
        Game.canvasContext.globalAlpha = 1.0;

        if (onClicked != undefined && onClicked != null && isActive) {
            if (InputHandlers.mouse.x > x &&
                InputHandlers.mouse.x < x + width &&
                InputHandlers.mouse.y > y &&       
                InputHandlers.mouse.y < y + height) {
                Game.canvasContext.globalAlpha = feedbackAlpha; 
                
                if (InputHandlers.mouse.isDown) {                        
                    w = 1 + feedbackScale / 2;
                    h = 1 + feedbackScale / 2;

                    Game.canvasContext.save();
                    Game.canvasContext.translate(
                        -(width * feedbackScale / 4), 
                        -(height * feedbackScale / 4)
                    );
                }
                else {
                    w = 1 + feedbackScale;
                    h = 1 + feedbackScale;
                    
                    Game.canvasContext.save();
                    Game.canvasContext.translate(
                        -(width * feedbackScale / 2), 
                        -(height * feedbackScale / 2)
                    );
                }
            } 
        }

        if (bgColor != undefined && bgColor != null) {
            Game.canvasContext.fillStyle = bgColor;
            Game.canvasContext.fillRect(x, y, width * w, height * h);
        }

        Game.canvasContext.drawImage(imgBg, x, y, width * w, height * h);
        if (w != 1 || h != 1) Game.canvasContext.restore();
    },
};