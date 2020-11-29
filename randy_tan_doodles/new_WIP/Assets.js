const Assets = {
    pathToAssets: "./assets/",

    imgSun: document.createElement("img"),
    
    LoadImages: (startGame, cvs = Game.canvas, ctx = Game.canvasContext) => {
        const imageList = [
            { img: Assets.imgSun, file: "sun_sheet.png" },
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
        
                i.img.src = Assets.pathToAssets + i.file;
            });
        }

        Game.canvasContext.font = "50px serif";
        ctx.fillStyle = "white";
        Game.canvasContext.fillText("Loading...", 50, Game.canvas.height - 50);        
    },
};