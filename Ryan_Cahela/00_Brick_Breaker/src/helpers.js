export function flipDirectionX(entity) {
  const { x } = entity.direction;
  if (x > 1 || x < -1) console.error(`x is ${x}`);
  entity.direction.x = -entity.direction.x;
}

export function flipDirectionY(entity) {
  const { y } = entity.direction;
  if (y > 1 || y < -1) console.error(`y is ${y}`);
  entity.direction.y = -entity.direction.y;
}

export function drawRect(ctx, entity) {
  const { x: posX, y: posY } = entity.position;
  const { x: width, y: heigth } = entity.dimension;
  ctx.fillStyle = entity.fillStyle;
  ctx.fillRect(posX, posY, width, heigth);
}

export function drawCircle(ctx, entity) {
  const { x: posX, y: posY } = entity.position;
  const { radius } = entity.dimension;
  ctx.fillStyle = entity.fillStyle;
  ctx.beginPath();
  ctx.arc(posX, posY, radius, 0, Math.PI * 2);
  ctx.fill();
}
