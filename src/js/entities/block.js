import { 
    TYPE,
    BLOCKS_FORMAT,
    BOARD_SIZE
} from '../utils.js';

export class Block {
    constructor(game) {
        this.game = game;
        let type = TYPE[game.rnd.between(0, 5)];

        this.type = type;
        this.shapes = BLOCKS_FORMAT[this.type];
        this.rotation = 0;
        this.pos = new Phaser.Point(this.game.rnd.between(1, Math.ceil(BOARD_SIZE.w / 2)), 0);
        this.movement = 0;
        this.throttle = false;
        this.alive = true;
    }

    get x() {
        return this.pos.x;
    }
    
    set x(val) {
        this.pos.x = val;
    }
    
    get y() {
        return this.pos.y;
    }
    
    set y(val) {
        this.pos.y = val;
    }

    get width() {
        this.shape[0].length
    }

    get height() {
        return this.shape.length;
    }

    get shape() {
        return this.shapes[this.rotation];
    }

    get nextPos() {
        let x = this.x + this.movement;
        let y = this.y + 1;

        return new Phaser.Point(x, y);
    }

    rotate() {
        this.rotation = ++this.rotation % this.shapes.length;
    }

    move(movement) {
        this.lastPos = this.pos;
        this.pos = this.nextPos;
        this.movement = 0;
    }

    kill() {
        this.alive = false;
    }
}