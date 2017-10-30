/* Scenario */
export const WALL_W = 8;
export const WALL_H = 144;

export const L_WALL_X = 0;
export const L_WALL_Y = 0;
export const R_WALL_X = 152;
export const R_WALL_Y = 0;
export const GROUND_X = 8;
export const GROUND_Y = 136;

/* Block */
export const Type = ['O', 'T', 'Z', 'S', 'J', 'L'];

export const BlockMatrixes = {
    O: [[true, true, false], [true, true, false]],
    T: [[true, true, true], [false, true, false]],
    Z: [[true, true, false], [false, true, true]],
    S: [[false, true, true], [true, true, false]],
    J: [[true, true, true], [false, false, true]],
    L: [[true, true, true], [true, false, false]]
};

export const BLOCK_VELOCITY_Y = 8;
export const BLOCK_VELOCITY_X = 8;

export const BLOCK_START_Y = 1;
export const BLOCK_MIN_START_X = 8;
export const BLOCK_MAX_START_X = 128;


/* Pixel */
export const PIXEL_SIZE = 8;


/* Settings */
export const DELTA = 500;

