import {
    WALL_H,
    WALL_W,
    L_WALL_X,
    L_WALL_Y,
    R_WALL_X,
    R_WALL_Y,
    GROUND_X,
    GROUND_Y,
    DELTA
} from '../utils.js';
import { Wall } from '../entities/wall';
import { Ground } from '../entities/ground';
import { Boundary } from '../entities/boundary';
import { Block } from '../entities/block';
import { LandedBlocks } from '../entities/landed-blocks';

export class Playing extends Phaser.State {
    create() {
        game.stage.backgroundColor = '#fff';
        this.ground = new Ground(game, GROUND_X, GROUND_Y);

        this.boundaries = new Boundary(game, this.ground);
        this.boundaries.add(new Wall(game, R_WALL_X, R_WALL_Y, 'right'));
        this.boundaries.add(new Wall(game, L_WALL_X, L_WALL_Y, 'left'));

        this.landedBlocks = new LandedBlocks(game);
        this.startTime = new Date();
        this.resetInput();
    }

    update() {
        this.dropBlock();
        let now = new Date();
        let delta = now.getTime() - this.startTime.getTime();
        let deltaLimit = !this.block.isThrottling ? DELTA : DELTA / 2;

        this.inputs = {
            down: this.inputs.down || game.input.keyboard.isDown(Phaser.Keyboard.DOWN),
            right: this.inputs.right || game.input.keyboard.isDown(Phaser.Keyboard.RIGHT),
            left: this.inputs.left || game.input.keyboard.isDown(Phaser.Keyboard.LEFT),
        }

        game.physics.arcade.overlap(this.block, this.boundaries, (block, boundary) => block.collideBoundary(boundary));

        game.physics.arcade.overlap(this.block, this.landedBlocks, (block, pixel) => {
            this.landedBlocks.landBlock(block);
            block.kill();
        }, 
        (block, pixel) => block.checkCollideLandedBlock(pixel));

        game.physics.arcade.overlap(this.block, this.ground, (block) => {
            this.landedBlocks.landBlock(block);
            block.kill();
        });


        if (delta < deltaLimit || !this.block.exists) {
            return;
        }

        this.startTime = now;

        this.block.fall(this.inputs);
        this.resetInput();
    }

    render() {
        // DEBUG
        game.debug.body(this.block);
        game.debug.body(this.ground);
    }

    dropBlock() {
        if (!this.block || !this.block.exists) {
            this.block = new Block();
        }
    }

    resetInput() {
        this.inputs = {
            down: false,
            right: false,
            left: false,
            rotate: false
        }
    }
}