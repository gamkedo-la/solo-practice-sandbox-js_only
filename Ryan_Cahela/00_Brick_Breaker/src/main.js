import { ball, player } from "./entities";
import { drawRect, drawCircle, flipDirectionX } from "./helpers";
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
  deltaTime = currentTime - timeOfLastFrame;
  timeOfLastFrame = currentTime;

  //clear game screen
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  //contain ball
  if (ball.position.x > WIDTH - ball.dimension.radius) {
    flipDirectionX(ball);
  }
  if (ball.position.x < ball.dimension.radius) {
    flipDirectionX(ball);
  }

  //move stuff
  ball.position.x += ball.speed * ball.direction.x * deltaTime;
  player.position.y = controls.position.y - 50;

  //draw stuff
  drawCircle(ctx, ball);
  drawRect(ctx, player);
}

requestAnimationFrame(loop);
