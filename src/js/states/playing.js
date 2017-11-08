import { DELTA } from '../utils';
import { Scenario } from '../entities/scenario';
import { Block } from '../entities/block';

export class Playing extends Phaser.State {
    create() {
        this.scenario = new Scenario(game);
        this.block = new Block(game);

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

        this.initiateLanded();
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
        let rows = this.inputCollision();

        rows = [...rows, ...this.checkCollision()];
        if (rows && rows.length > 0) {
            this.block.kill();
        }

        if (!this.block.alive) {
            this.addBlock();
            this.checkRows(rows);
            return;
        }

        this.block.move();
    }

    render() {
        this.scenario.render(this.block, this.landed);
    }

    addBlock() {
        if (this.block) {
            let shape = this.block.shape;
            for (let row = 0; row < shape.length; row++) {
                for (let column = 0; column < shape[row].length; column++) {
                    if (shape[row][column] > 0) {
                        this.landed[this.block.y + row][this.block.x + column] = shape[row][column];
                    }
                }
            }
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
                this.block.rotateClockwise();
                break;
        }

        this.input = null;
    }

    inputCollision() {
        if (!this.block.alive) {
            return;
        }

        let next = this.block.nextPos;

        if (next.x + this.block.width > this.landedWidth || next.x < 0) {
            this.block.movement = 0;
        }

        if (next.y + this.block.height > this.landedHeight) {
            this.block.kill();
            return [this.landedHeight -1];
        }

        return [];
    }

    checkCollision() {
        let rows = [];
        let shape = this.block.shape;
        if (!this.block.alive) {
            return [];
        }

        for (let row = 0; row < shape.length; row++) {
            for (let column = 0; column < shape[row].length; column++) {
                if(this.block.shape[row][column] > 0 && this.landed[this.block.nextPos.y + row][this.block.nextPos.x + column] > 0) {
                    rows.push(row + this.block.nextPos.y);
                }
            }
        }

        return rows;
    }

    initiateLanded() {
        this.landed = [];
        this.landedHeight = this.scenario.height - 1;
        this.landedWidth = this.scenario.width - 2;
        for (let i = 0; i < this.landedHeight; i++) {
            this.landed.push([]);
            for (let j = 0; j < this.landedWidth; j++) {
                this.landed[i].push(-1);
            }
        }
    }

    checkRows(rows) {
        rows.map(row => {
            if (this.landed[row].indexOf(-1) < 0) {
                let deleted = this.landed.splice(row, 1);
                this.landed.unshift(deleted.fill(-1));
            }
        });
    }

}