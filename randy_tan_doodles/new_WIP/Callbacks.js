Game.reset = () => {
    console.log("Reset")
    Game.goToScene(SceneMain);
};

Game.update = dt => {
    let i;
    for (i = 0; i < Game.layers.length; i++) {
        Game.layers[i].update(dt);
    }
};

Game.draw = dt => {
    let i;
    for (i = 0; i < Game.layers.length; i++) {
        Game.layers[i].draw(dt);
    }
};