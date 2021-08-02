function handleMouseClick(evt) {
    if(!gameLaunched) {
        gameLaunched = true;
    } else if (gameOver) {
        player1score = 0;
        player2score = 0;
        gameOver = false;
    }
}

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect(), root = document.documentElement;
    // account for margins, canvas position, scrolling etc
    // works for scroll and position without last adjustment
    // - root.scrollLeft -root.scrollTop
    var mouseX = evt.clientX - rect.left;
    var mouseY = evt.clientY - rect.top;
    return {
        x: mouseX,
        y: mouseY,
    }
}