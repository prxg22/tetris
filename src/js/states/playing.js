import { Wall } from '../entities/wall';
import { Ground } from '../entities/ground';
import { Boundary } from '../entities/boundary';
import { Block } from '../entities/block';
import { LandedBlocks } from '../entities/landed-blocks';

const L_WALL_X = 0;
const L_WALL_Y = 0;
const R_WALL_X = 312;
const R_WALL_Y = 0;
const GROUND_X = 16;
const GROUND_Y = 272;

export class Playing extends Phaser.State {
    create() {
        game.stage.backgroundColor = '#fff';
        this.ground = new Ground(game, GROUND_X, GROUND_Y);

        this.boundaries = new Boundary(game, this.ground);
        this.boundaries.add(new Wall(game, L_WALL_X, L_WALL_Y));
        this.boundaries.add(new Wall(game, R_WALL_X, R_WALL_Y));

        this.landedBlocks = new LandedBlocks(game);

        this.dropBlock();
    }

    update() {
        game.physics.arcade.overlap(this.block, this.landedBlocks, (block) => this.dropBlock(block));
        game.physics.arcade.overlap(this.block, this.ground, (block) => this.dropBlock(block));
        game.physics.arcade.collide(this.block, this.boundaries);
        game.physics.arcade.collide(this.block, this.landedBlocks);

        // DEBUG
        game.debug.body(this.block);
        game.debug.body(this.ground);
    }

    dropBlock(block) {
        if (block !== this.block && !this.block.body.touching.down) {
            return;
        }

        if (this.block) {
            this.block.body.immovable = true;
            this.landedBlocks.add(this.block.toPixels());
            this.block.kill();
        }

        this.block = new Block();
    }

    checkLine(line) {
        return this.board[line].reduce( (res, pixel) => pixel && res);
    }

    removeLine(line) {}
}