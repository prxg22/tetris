import { DELTA } from '../utils';
import { Scenario } from '../entities/scenario';

export class Playing extends Phaser.State {
    create() {
        this.scenario = new Scenario(game);
        this.inputs = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            r: this.input.keyboard.addKey(Phaser.Keyboard.R),
        }

        this.inputs.right.onDown.add(() => this.scenario.block.movement++);
        this.inputs.left.onDown.add(() => this.scenario.block.movement--);
        this.inputs.r.onDown.add(() => this.scenario.block.rotate())
    }

    update() {
        if (this.counter && this.counter > 0) {
            this.counter -= this.game._deltaTime;
            return;
        }

        this.resetCounter();

        if (this.scenario.collide('walls')) {
            this.scenario.block.movement = 0;
        }

        if (this.scenario.collide('landed')) {
            this.scenario.addBlock();
        }

        this.scenario.block.move();
    }

    render() {
        this.scenario.reset();
        this.scenario.render();
    }

    resetCounter() {
        this.counter = DELTA;
    }
}