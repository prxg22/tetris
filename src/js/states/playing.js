import { DELTA } from '../utils';
import { Scenario } from '../entities/scenario';

export class Playing extends Phaser.State {
    create() {
        this.scenario = new Scenario(game);

        this.inputs = {
            down: this.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
        };
    }

    update() {
        if (this.movement) {
            this.movement.down = this.movement.down || this.inputs.down.isDown;
            this.movement.left = this.movement.left || this.inputs.left.isDown;
            this.movement.right = this.movement.right || this.inputs.right.isDown;
        }

        if (this.counter && this.counter > 0) {
            this.counter -= this.game._deltaTime;
            return;
        }

        let collisions = this.scenario.collide(this.movement);
        this.scenario.block.move(this.movement);

        this.resetMovements();
        this.resetCounter();
    }

    render() {
        this.scenario.reset();
        this.scenario.render();
    }

    resetCounter() {
        this.counter = DELTA;
    }

    resetMovements() {
        this.movement = {
            down: false,
            left: false,
            right: false
        };
    }
}