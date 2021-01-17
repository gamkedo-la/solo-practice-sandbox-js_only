import { square, player } from "./entities";
import { flipDirectionX } from "./helpers";
import MouseControls from "./MouseControls";

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const controls = new MouseControls(canvas);

let deltaTime = 0;
let timeOfLastFrame = 0;

function loop(totalTimeElapsedMiliseconds) {
  requestAnimationFrame(loop);
  const currentTime = totalTimeElapsedMiliseconds / 1000; //convert to seconds
  const deltaTime = currentTime - timeOfLastFrame;
  timeOfLastFrame = currentTime;

  //clear game screen
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  //move cube
  if (square.position.x > WIDTH - square.dimension.x) {
    console.log("beep");
    flipDirectionX(square);
  }

  if (square.position.x < 0) {
    console.log("boop");
    flipDirectionX(square);
  }

  square.position.x += square.speed * square.direction.x * deltaTime;
  player.position.y = controls.position.y - 50;

  //draw cube
  ctx.fillStyle = square.fillStyle;
  ctx.fillRect(square.position.x, square.position.y, 100, 100);

  const { x: playerX, y: playerY } = player.position;
  const { x: playerWidth, y: playerHeight } = player.dimension;
  ctx.fillStyle = player.fillStyle;
  ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

requestAnimationFrame(loop);
