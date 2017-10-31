import { PIXEL_SIZE, BOARD_SIZE, WALL_TILE_INDEX, GROUND_TILE_INDEX } from '../utils.js';
import { Block } from './block';

export class Scenario extends Phaser.Tilemap {
    constructor(game) {
       super(game, null, PIXEL_SIZE, PIXEL_SIZE, BOARD_SIZE.w, BOARD_SIZE.h);
       this.createBlankLayer('walls', this.width, this.height, PIXEL_SIZE, PIXEL_SIZE);
       this.createBlankLayer('landed', this.width, this.height, PIXEL_SIZE, PIXEL_SIZE);
       this.createBlankLayer('playing', this.width, this.height, PIXEL_SIZE, PIXEL_SIZE);
       this.addTilesetImage('blocks');
       this.fill(WALL_TILE_INDEX, 0, 0, 1, this.height - 1, 'walls');
       this.fill(WALL_TILE_INDEX, this.width - 1, 0, 1, this.height - 1, 'walls');
       this.fill(GROUND_TILE_INDEX, 0, this.height - 1, this.width, 1, 'landed');
       this.landed = [];
       this.addBlock();
    }

    addBlock() {
        if (this.block) {
            this.landed.push(this.block);
        }

        this.block = new Block(this.game);
    }

    collide(movements) {
        let next = this.block.nextPos(movements);
        let collisions = {
            walls: false,
            landed: false
        }

        this.block.format.map((pixels, row) => {
            pixels.map((pixel, column) => {
                if (this.block.format[row][column] > 0 && this.getTile(next.x + column, next.y + row, 'walls')) {
                    collisions.walls = true;
                }

                if (this.block.format[row][column] > 0 && this.getTile(next.x + column, next.y + row, 'landed')) {
                    collisions.landed = true;
                }
            });
        });

        if (collisions.landed) {
            this.addBlock();
        } else if (collisions.walls) {
            this.block.x = this.block.lastPos.x;
        }
        return collisions;
    }

    reset() {
        this.fill(-1, 0, 0, this.width, this.height, 'playing');
    }

    render() {
        this.renderBlock(this.block, 'playing');
        this.landed.map(block => this.renderBlock(block, 'landed'));
    }
    
    renderBlock (block, layer) {
        block.format.map((pixels, row) => {
            pixels.map((pixel, column) => {
                if (block.format[row][column] > 0) {
                    this.putTile(block.format[row][column], block.pos.x + column, block.pos.y + row, layer);
                }
            });
        });
    }
}