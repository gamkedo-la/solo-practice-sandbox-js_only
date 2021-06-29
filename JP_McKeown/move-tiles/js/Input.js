var btnAlien20 = document.getElementById('btnAlien20');
var btnAlien40 = document.getElementById('btnAlien40');
var btnAlien60 = document.getElementById('btnAlien60');
const btnStart = document.getElementById('btnStart');
const btnPause = document.getElementById('btnPause');

btnAlien20.addEventListener('click', function(){changeAlien(20)});
btnAlien40.addEventListener('click', function(){changeAlien(40)});
btnAlien60.addEventListener('click', function(){changeAlien(60)});
// btnAlien60.addEventListener('click', changeAlien(60));
btnStart.addEventListener('click', startGame);
btnPause.addEventListener('click', pauseGame);

function changeAlien(spacing) {
    alienSpacingWidth = spacing;
}

function startGame() {
    gameRunning = true;
    gameOver = false;
    playerX = 720;
}
function pauseGame() {
    gameRunning = false;
}

// for (var i=0, iLen=radios.length; i<iLen; i++) {
//     console.log(radios[i].value)
//     radios[i].onclick = function() {

//         changeAlien(radios[i].value);
//     };
// } 

// var radios = document.forms["alienWidth"].elements["optradio"];
// radios.addEventListener('click', );
// var inputs=document.querySelectorAll("input[type=radio]"),
//     x=inputs.length;
// x = inputs.length;
// while(x--)
//     inputs[x].addEventListener("change",function(){
//         console.log("Checked: "+this.checked);
//         console.log("Name: "+this.name);
//         console.log("Value: "+this.value);
//         console.log("Parent: "+this.parent);
//     },0);