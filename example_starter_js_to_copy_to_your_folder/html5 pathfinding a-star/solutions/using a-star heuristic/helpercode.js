function arrayContains(arr, obj) {
    var arrLen = arr.length;
    for (var i = 0; i < arrLen; i++) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}
function arrayRemove(arr, obj) {
    for (var i = arr.length-1; i >= 0; i--) {
        if (arr[i] === obj) {
            arr.splice(i,1);
            return;
        }
    }
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function outlineRect(topLeftX, topLeftY, boxWidth, boxHeight, lineColor) {
    canvasContext.beginPath();
    canvasContext.strokeStyle = lineColor;
    canvasContext.lineWidth = "3";
    canvasContext.rect(topLeftX, topLeftY, boxWidth, boxHeight);
    canvasContext.stroke();
}

