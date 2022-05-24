TILES = {
    TILE_GRASS_1_LE: 1,
    TILE_GRASS_1:  2,
    TILE_GRASS_1_RE: 3,
    TILE_SKY_1:  10,
    TILE_SOLID: 11,
    TILE_EMPTY: 12,
    TILE_TREE_1_TOP: 21,
    TILE_TREE_1_BOTTOM: 31,

}

for(const [key, value] of Object.entries(TILES)) {
    window[key] = value;
  }