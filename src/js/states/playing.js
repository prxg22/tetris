import { DELTA } from '../utils';
import { Scenario } from '../entities/scenario';
import { Block } from '../entities/block';

export class Playing extends Phaser.State {
    create() {
        this.scenario = new Scenario(game);
        this.block = new Block(game);
        this.landedHeight = this.scenario.height - 1;
        this.landedWidth = this.scenario.width - 2;

        this.landed = Array(this.landedHeight - 1).fill(
            Array(this.landedWidth - 2).fill(-1)
        );

        this.inputs = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            r: this.input.keyboard.addKey(Phaser.Keyboard.R),
        }

        // timer setting
        this.timerInit = new Date();

        // input control
        this.input = null;
        this.inputs.right.onDown.add(() => this.input = this.input || 'right');
        this.inputs.left.onDown.add(() => this.input = this.input || 'left');
        this.inputs.r.onDown.add(() => this.input = this.input || 'rotate');
    }

    get timer() {
        let now = new Date();
        return now.getTime() - this.timerInit.getTime();
    }

    update() {
        if (this.timer < DELTA) {
            return;
        }

        this.timerInit = new Date();
        this.resolveInput();
        this.collide()

        if (!this.block.alive) {
            this.addBlock();
            return;
        }

        this.block.move();
    }

    render() {
        this.scenario.reset();
        this.scenario.render(this.block, this.landed);
    }

    addBlock() {
        if (this.block) {
            this.block.shape.map((pixels, row) => {
                pixels.map((pixel, column) => {
                    this.landed[this.block.y + row][this.block.x + column] = pixel;
                });
            });
        }

        this.block = new Block(game);
    }


    resolveInput() {
        switch(this.input) {
            case 'right':
                this.block.movement++;
                break;
            case 'left':
                this.block.movement--;
                break;
            case 'rotate':
                this.block.rotate();
                break;
        }
    }

    collide() {
        let next = this.block.nextPos;

        if (next.x + this.block.width > this.landedWidth || next.x < 0) {
            this.movement = 0;
        }

        if (next.y + this.block.height > this.landedHeight) {
            this.block.kill();
        }
    }

}