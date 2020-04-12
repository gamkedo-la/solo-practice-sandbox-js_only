//A little glue code to get us started
import WebRenderer from './webRenderer.js';
import TileRenderer from '.TileRenderer.js';

window.onload = function() {
    main();
};


function main() {
    const canvas = document.getElementById("testCanvas");
    canvas.width = 432;
    canvas.height = 240;
    //tileSize, widthInTiles, heightInTiles, tileImage, bkgdImage, flipImage
    const renderer = new TileRenderer(canvas);
    
    renderer.addTileLayer(8,8,tileSource,gids,0);
};