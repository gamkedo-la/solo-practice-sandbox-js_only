export function flipDirectionX(entity) {
  const { x } = entity.direction;
  if (x > 1 || x < -1) console.error(`x is ${x}`);
  entity.direction.x = -entity.direction.x;
}
