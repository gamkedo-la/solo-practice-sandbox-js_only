// Key press handling
const keys = {
    up: false,
    down: false,
    left: false,
    right: false,
};

// Key listeners
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') keys.up = true;
    if (event.key === 'ArrowDown') keys.down = true;
    if (event.key === 'ArrowLeft') keys.left = true;
    if (event.key === 'ArrowRight') keys.right = true;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') keys.up = false;
    if (event.key === 'ArrowDown') keys.down = false;
    if (event.key === 'ArrowLeft') keys.left = false;
    if (event.key === 'ArrowRight') keys.right = false;
});