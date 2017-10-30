import { Pixel } from './pixel.js';
import { 
    Type,
    BlockMatrixes,
    BLOCK_VELOCITY_Y,
    BLOCK_VELOCITY_X,
    BLOCK_MAX_START_X,
    BLOCK_MIN_START_X,
    BLOCK_START_Y,
    PIXEL_SIZE
} from '../utils.js';

export class Block extends Phaser.Sprite{
    constructor() {
        let type = Type[game.rnd.between(0, 5)];
        super(game, game.rnd.between(1, 15) * 8, 0, 'tetris-' + type);

        this.block_type = type;
        this.block_matrix = BlockMatrixes[type];
        this.isThrottling = false;

        this.game.physics.arcade.enable(this);
        this.body.bounce.setTo(0, 0);
        this.game.add.existing(this);
        
    }

    update() {
        this.isThrottling = false;
    }

    nextPosition(input) {
        if (!this.exists) {
            return this.position;
        }

        let x = this.x;
        let y = this.y + BLOCK_VELOCITY_Y;

        if (input.down) {
            this.isThrottling = true;
        }
        if (input.left) {
            x -= BLOCK_VELOCITY_X;
        }

        if (input.right) {
            x += BLOCK_VELOCITY_X;
        }

        return new Phaser.Point(x, y);
    }


    fall(input) {
        let nextPosition = this.nextPosition(input);
        this.x = nextPosition.x;
        this.y = nextPosition.y;
    }

    collideBoundary(boundary) {
        if (!this.exists) {
            return ;
        }

        switch (boundary.name) {
            case 'left':
                this.x = boundary.x + boundary.width;
                break;
            case 'right':
                this.x = boundary.x - this.width;
                break;
            case 'ground':
                this.y = boundary.y - this.height;
                break;
        }
    }

    checkCollideLandedBlock(pixel) {
        if (!this.exists) {
            return false;
        }

        let row = Math.ceil(Math.abs(this.y + this.height - pixel.y) / PIXEL_SIZE);
        let column = Math.ceil(Math.abs(this.x - pixel.x) / PIXEL_SIZE);
        let collide = this.block_matrix[row][column];

        if (collide) {
            this.y = pixel.y - this.height;
        }
    }

    collideLandedBlock(pixel) {
        if (!this.exists) {
            return;
        }

        console.log('posicao atual: ' + this.position);
        console.log('posicao pixel:' + pixel.position);
    }

    toPixels() {
        let pixels = [];
        for (let i = 0; i < this.block_matrix.length; i++) {
            for (let j = 0; j < this.block_matrix[i].length; j++) {
                if (!this.block_matrix[i][j]) {
                    continue;
                }

                let pixel = this.block_matrix[i][j];

                pixels.push(new Pixel(this.game, this.x + j * PIXEL_SIZE, this.y + i * PIXEL_SIZE));
            }
        }

        return pixels;
    }
}