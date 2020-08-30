const InputHandlers = {
    mouse: {
        x: 0,
        y: 0,
        
        isDown: false,        
        isMoving: false,
    
        move: e => {
            InputHandlers.mouse.isMoving = true;
            InputHandlers.mouse.getXY(e);
        },
    
        mousedown: e => {            
            InputHandlers.mouse.isDown = true;    
            InputHandlers.mouse.getXY(e);

        },
        
        mouseup: e => {            
            InputHandlers.mouse.isDown = false;
            InputHandlers.mouse.getXY(e);
            
            let l = InputHandlers.mouse.clickHandlers.length, i;
            for (i = 0; i < l; i++) {
                if (InputHandlers.mouse.clickHandlers[i]) {
                    InputHandlers.mouse.clickHandlers[i]();    
                }            
            }
        },

        clickHandlers: [],

        getIndexOfClickHandler: handler => {
            return InputHandlers.mouse.clickHandlers.indexOf(handler);
        },

        addClickHandler: handler => {            
            if (InputHandlers.mouse.getIndexOfClickHandler(handler) <= -1) {
                InputHandlers.mouse.clickHandlers.push(handler);                
            }
        },

        removeClickHandler: handler => {
            let l = InputHandlers.mouse.getIndexOfClickHandler(handler);            
            if (l > -1) {
                InputHandlers.mouse.clickHandlers.splice(l, 1);
            }
        },
    
        getXY: (e, cvs = Game.canvas) => {
            if (e.touches && e.touches.length > 0) {
                e = e.touches[0];
            }
            if (InputHandlers.mouse.x != e.clientX) InputHandlers.mouse.x = e.clientX;
            if (InputHandlers.mouse.y != e.clientY) InputHandlers.mouse.y = e.clientY;
    
            const rect = cvs.getBoundingClientRect();
            InputHandlers.mouse.x -= rect.left;
            InputHandlers.mouse.y -= rect.top;
    
            InputHandlers.mouse.x = InputHandlers.mouse.x * cvs.width / cvs.clientWidth;
            InputHandlers.mouse.y = InputHandlers.mouse.y * cvs.height / cvs.clientHeight;
            
            return { 'x': InputHandlers.mouse.x, 'y': InputHandlers.mouse.y };
        },
        
        isMouseOver: o => {
            return (InputHandlers.mouse.x > o.x &&
                InputHandlers.mouse.x < o.x + o.width &&
                InputHandlers.mouse.y < o.y + o.height &&
                InputHandlers.mouse.y > o.y);
        },
    },
};