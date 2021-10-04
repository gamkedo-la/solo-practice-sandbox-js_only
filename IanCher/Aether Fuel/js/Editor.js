var editorMode = true;
var editorPaintType = 0;


function editorClick()
{
    if (!editorMode){ return; }

    trackGrid[mouseIdx] = editorPaintType;

    console.log(trackGrid[mouseIdx] + " - " + mouseIdx);
}


function editorDraw()
{
    if (!editorMode){ return; }

    colorText("Editor", 20, 20, "black");

    var useImg = trackPix[editorPaintType];

    colorRect(mouseX - 2, mouseY - 2, useImg.width + 4, useImg.height + 4, "black")
    canvasContext.drawImage(useImg, mouseX, mouseY);
}


function editorKey(keyCode)
{
    if (!editorMode){ return; }

    switch(keyCode)
    {
        case KEY_NUM_ROW_1:
            editorPaintType = TRACK_ROAD;
            
            break;
        
        case KEY_NUM_ROW_2:
            editorPaintType = TRACK_WALL;
            break;
        
        default:
            break;
    }
}