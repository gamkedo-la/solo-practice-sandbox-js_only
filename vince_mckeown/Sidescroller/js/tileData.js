TILES = {
    TILE_EMPTY:  1,
    TILE_GRASS_1:  2
}

for(const [key, value] of Object.entries(TILES)) {
    window[key] = value;
  }