// From: https://www.howtosolutions.net/2016/09/javascript-canvas-simple-particle-system/

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
var particles = [];
var num_particles = 1000;

var Particle = function () {
  this.x = canvas.width * Math.random();
  this.y = canvas.height * Math.random();
  this.vx = 2 * Math.random() - 1;
  this.vy = 2 * Math.random() - 1;
  this.Color = GetRandomColor();
}

Particle.prototype.Draw = function (ctx) {
  ctx.fillStyle = this.Color;
  ctx.fillRect(this.x, this.y, 3, 3);
}

Particle.prototype.Update = function () {
  this.x += this.vx;
  this.y += this.vy;

  if (this.x < 0 || this.x > canvas.width)
      this.vx = -this.vx;

  if (this.y < 0 || this.y > canvas.height)
      this.vy = -this.vy;
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < num_particles; i++) {
      particles[i].Update();
      particles[i].Draw(ctx);
  }
  requestAnimationFrame(loop);
}

for (var i = 0; i < num_particles; i++)
    particles.push(new Particle());
 
loop();

function GetRandomColor() {
  var r = 0, g = 0, b = 0;
  while (r < 150 && g < 150 && b < 150)
  {
      r = Math.floor(Math.random() * 256);
      g = Math.floor(Math.random() * 256);
      b = Math.floor(Math.random() * 256);
  }
  return "rgb(" + r + "," + g + ","  + b + ")";
}