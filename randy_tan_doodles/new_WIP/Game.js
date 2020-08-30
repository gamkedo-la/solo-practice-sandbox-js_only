const Game = {
    canvas: document.createElement("canvas"),
    canvasContext: null,
    framesPerSecond: 30,

    init: (id = "gameCanvas", width = 1280, height = 720) => {
        Game.canvasContext = Game.canvas.getContext("2d");

        Game.canvas.id = id;
        Game.canvas.width = width;
        Game.canvas.height = height;

        document.body.appendChild(Game.canvas);
    },

    then: window.performance.now ? (performance.now() + performance.timing.navigationStart) : Date.now(),

    isGameLoopPaused: false,

    main: () => {        
        if (Game.isGameLoopPaused) return;
        const now = window.performance.now ? (performance.now() + performance.timing.navigationStart) : Date.now();
        const dt = (now - Game.then) / 1000;        
        Game.update(dt);
        Game.draw(dt);
        Game.then = now;
    },

    layers: [],

    isLayerEnabled: layer => {
        return Game.layers.indexOf(layer);
    },

    enableLayer: layer => {
        if (Game.isLayerEnabled(layer) <= -1) {
            Game.layers.push(layer);            
        }
    },    

    disableLayer: layer => {
        let l = Game.isLayerEnabled(layer);
        if (l > -1) {
            Game.layers = Game.layers.splice(l, 1);
        }
    },

    currentScene: null,

    goToScene: (scene, params) => {
        if (Game.currentScene != null) {
            let i;
            for (i = 0; i < Game.currentScene.layers.length; i++) {
                let layer = Game.currentScene.layers[i];
                Game.disableLayer(layer);
                layer.disable();
            }
        }

        Game.currentScene = scene;
        if (params) {
            Game.currentScene.params = params;
        }

        let i;
        for (i = 0; i < Game.currentScene.layers.length; i++) {
            let layer = Game.currentScene.layers[i];            
            Game.enableLayer(layer);
            layer.reset();
        }
    },

    reset: () => {
        
    },

    update: dt => {

    },

    draw: dt => {

    },

    paused: (paused = true, dt) => {
        Game.isGameLoopPaused = paused;
        Game.then = Date.now();
        Game.main();
    },
};

Game.init();

window.addEventListener("load", e => {
    Assets.LoadImages(() => {        
        Game.reset();
        setInterval(Game.main, 1000 / Game.framesPerSecond);        
    });
});
window.addEventListener("blur", e => {
    Game.paused();
});
window.addEventListener("focus", e => {
    Game.paused(false);
});