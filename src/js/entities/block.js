import { Pixel } from './pixel.js';
import { Type, BlockMatrixes, BLOCK_VELOCITY } from '../utils.js';

export class Block extends Phaser.Sprite{
    constructor() {
        let type = Type[game.rnd.between(0, 5)];
        let x = game.rnd.between(8, 136);
        super(game, x, 0, 'tetris-' + type);

        this.block_type = type;
        this.block_matrix = BlockMatrixes[type];

        this.game.physics.arcade.enable(this);
        this.body.bounce.setTo(0, 0);
        this.body.velocity.y = BLOCK_VELOCITY;

        this.game.add.existing(this);
    }

    update() {
        if (this.body.immovable) {
            this.body.velocity.setTo(0,0);
            return;
        }

        this.body.velocity.setTo(0, BLOCK_VELOCITY);

        if (this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
            this.body.velocity.y += BLOCK_VELOCITY;
        }
        
        else if (this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
            this.body.velocity.x += BLOCK_VELOCITY;
        }

        else if (this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
            this.body.velocity.x += -BLOCK_VELOCITY;
        }
    }

    toPixels() {
        let pixels = [];
        for (let i = 0; i < this.block_matrix.length; i++) {
            for (let j = 0; j < this.block_matrix[i].length; j++) {
                if (!this.block_matrix[i][j]) {
                    continue;
                }

                let pixel = this.block_matrix[i][j];

                pixels.push(new Pixel(this.game, this.x + j * 8, this.y + i * 8));
            }
        }

        return pixels;
    }
}