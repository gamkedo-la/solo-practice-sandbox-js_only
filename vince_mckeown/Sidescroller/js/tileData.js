TILES = {
    TILE_EMPTY:  0,
    TILE_GRASS_1:  1
}

for(const [key, value] of Object.entries(TILES)) {
    window[key] = value;
  }