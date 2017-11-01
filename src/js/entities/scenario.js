import { PIXEL_SIZE, BOARD_SIZE, WALL_TILE_INDEX, GROUND_TILE_INDEX } from '../utils.js';
import { Block } from './block';

export class Scenario extends Phaser.Tilemap {
    constructor(game) {
       super(game, null, PIXEL_SIZE, PIXEL_SIZE, BOARD_SIZE.w, BOARD_SIZE.h);

       this.createBlankLayer('', this.width, this.height, PIXEL_SIZE, PIXEL_SIZE);

       this.addTilesetImage('blocks');

       this.fill(WALL_TILE_INDEX, 0, 0, 1, this.height - 1);
       this.fill(WALL_TILE_INDEX, this.width - 1, 0, 1, this.height - 1);
       this.fill(GROUND_TILE_INDEX, 0, this.height - 1, this.width, 1);
    }

    reset() {
        this.fill(-1, 1, 0, this.width - 2, this.height - 1);
    }

    render(block, landed) {
        this.reset();
        this.renderLanded(landed);
        this.renderBlock(block);
    }
    
    renderBlock (block) {
        block.shape.map((pixels, row) => {
            pixels.map((pixel, column) => {
                if (block.shape[row][column] > 0) {
                    if (block.shape[row][column] > 0) {
                        this.putTile(block.shape[row][column], block.x + column + 1, block.y + row);
                    }
                }
            });
        });
    }
    
    renderLanded(landed) {
        let emptyRow = false;
        for (let row = landed.length - 1; row > 0 && !emptyRow; row--) {
            emptyRow = true;
            for (let column = 0; column < landed[row].length; column++) {
                let tile = landed[row][column];
                emptyRow = emptyRow && tile < 0;
                this.putTile(tile, column + 1, row);
            }
        }
    }
}