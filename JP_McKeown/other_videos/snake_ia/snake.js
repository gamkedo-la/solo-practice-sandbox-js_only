window.onload=function() {
  canvas = document.getElementById('gc');
  ctx = canvas.getContext('2d');
  document.addEventListener('keydown', keyPush);
  setInterval(game, 1000/10);
}
px=py=9;
gs=tc=20;
appleX=appleY=15;
pXspeed=1;
pYspeed=0;
trail=[];
tail=5;

function game() {
  px+=pXspeed;
  py+=pYspeed;
  if(px<0) {
    px=tc-1;
  }
  if(px>tc-1) {
    px=0;
  }
  if(py<0) {
    py=tc-1;
  }
  if(py>tc-1) {
    py=0;
  }
  ctx.fillStyle='black';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='lime';
  for(i=0; i<trail.length; i++) {
    ctx.fillRect(trail[i].x*gs, trail[i].y*gs, gs-2, gs-2);
    if(trail[i].x==px && trail[i].y==py) {
      tail = 5
    }
  }
  trail.push({x:px,y:py});
  while(trail.length>tail) {
    trail.shift();
  }

  // snake reached apple
  if(appleX==px && appleY==py) {
    tail++;
    appleSpawn()
  }

  ctx.fillStyle='red';
  ctx.fillRect(appleX*gs, appleY*gs, gs-1, gs-1);
}

function appleSpawn() {
  appleX=Math.floor(Math.random()*tc)
  appleY=Math.floor(Math.random()*tc)
}

// handle arrow keys
function keyPush(evt) {
  switch(evt.keyCode) {
    case 37:
      pXspeed=-1; pYspeed=0;
      break;
    case 38:
      pXspeed=0; pYspeed=-1;
      break;
    case 39:
      pXspeed=1; pYspeed=0;
      break;
    case 40:
      pXspeed=0; pYspeed=1;
      break;
  }
}