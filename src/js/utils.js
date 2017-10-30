/* Scenario */
export const L_WALL_X = 0;
export const L_WALL_Y = 0;
export const R_WALL_X = 144;
export const R_WALL_Y = 0;
export const GROUND_X = 4;
export const GROUND_Y = 136;

/* Block */
export const Type = ['O', 'T', 'Z', 'S', 'J', 'L'];

export const BlockMatrixes = {
    O: [[true, true, false], [true, true, false], [false, false, false]],
    T: [[true, true, true], [false, true, false], [false, false, false]],
    Z: [[true, true, false], [false, true, true], [false, false, false]],
    S: [[false, true, true], [true, true, false], [false, false, false]],
    J: [[true, true, true], [false, false, true], [false, false, false]],
    L: [[true, true, true], [true, false, false], [false, false, false]]
};

export const BLOCK_VELOCITY = 24;
