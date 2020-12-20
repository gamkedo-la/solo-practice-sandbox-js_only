const pathPrefix = "./";

let scriptCount = 0;
const scripts = [      
    "utils/Vector2D.js",
    "utils/UI.js",

    "graphics/Draw.js",
    "graphics/Sprite.js",
    "graphics/AnimatedSprite.js",
        
    "Assets.js",
    "Game.js",
        
    "input/InputHandlers.js",
    "input/InputListeners.js",
        
    "layers/LayerActive.js",
        
    "scenes/SceneMain.js",
        
    "Camera.js",
    "Callbacks.js"
];

let canStart = false;

function CheckScript() {
    if (scriptCount >= scripts.length - 1) {
        canStart = true;
        if (canStart)
        Game.init();
    }
    else {
        scriptCount++;
        LoadNextScript(scriptCount);
    }
};

function LoadScript(url) {
    const script = document.createElement("script"); 
    script.src = pathPrefix + url;
    script.type = "application/javascript";
    script.crossorigin = "anonymous";    

    script.onreadystatechange = CheckScript;
    script.onload = CheckScript;

    document.body.appendChild(script);
}

function LoadNextScript(index = 0, s = scripts) {
    LoadScript(s[index]);
}

LoadNextScript();