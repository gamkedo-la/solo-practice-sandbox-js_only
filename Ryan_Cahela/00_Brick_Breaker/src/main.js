import { square } from "./entities";
import { flipDirectionX } from "./helpers";

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

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

  //draw cube
  ctx.fillStyle = square.color;
  ctx.fillRect(square.position.x, square.position.y, 100, 100);
}

requestAnimationFrame(loop);
