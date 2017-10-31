/* Scenario */
export const BOARD_SIZE = { w: 20, h: 25 };
export const WALL_TILE_INDEX = 1;
export const GROUND_TILE_INDEX = 2;

/* Block */
export const TYPE = ['O', 'I', 'T', 'Z', 'S', 'J', 'L'];

export const BLOCKS_FORMAT = {
    O: [[3, 3], [3, 3]],
    I: [[4, 4, 4, 4]],
    T: [[5, 5, 5], [-1, 5, -1]],
    Z: [[6, 6, -1], [-1, 6, 6]],
    S: [[-1, 7, 7], [7, 7, -1]],
    J: [[8, 8, 8], [-1, -1, 8]],
    L: [[9, 9, 9], [9, -1, -1]]
};

/* Pixel */
export const PIXEL_SIZE = 8;


/* Settings */
export const DELTA = 500;

