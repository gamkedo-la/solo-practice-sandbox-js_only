const Assets = {
    pathToImages: "./assets/",

    
    LoadImages: (startGame, cvs = Game.canvas, ctx = Game.canvasContext) => {
        const imageList = [
            
        ];
    
        let imgCount = imageList.length;

        if (imgCount == 0) {
            startGame();
        }
        else {
            imageList.map(i => {
                i.img.onload = () => {
                    imgCount--;
                    if (imgCount == 0) {
                        startGame();
                    }
                };
        
                i.img.src = Assets.pathToImages + i.file;
            });
        }

        Game.canvasContext.font = "50px serif";
        ctx.fillStyle = "white";
        Game.canvasContext.fillText("Loading...", 50, Game.canvas.height - 50);        
    },
};