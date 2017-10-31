import { Pixel } from './pixel.js';
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
        this.format = BLOCKS_FORMAT[type];
        this.pos = new Phaser.Point(this.game.rnd.between(1, BOARD_SIZE.w - 4), 0);
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

    nextPos(inputs) {
        if (!inputs) {
            return this.pos;
        }

        let x = this.pos.x;
        let y = this.pos.y + 1;

        if (inputs.left) {
            x--;
        }

        if (inputs.right) {
            x++;
        }

        if (inputs.down) {
            y++;
        }

        return new Phaser.Point(x, y);
    }


    move(movement) {
        this.lastPos = this.pos;
        this.pos = this.nextPos(movement);
    }
}