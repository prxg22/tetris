import { Wall } from './wall';
export class Ground extends Wall {
    constructor(game, x, y) {
        super(game, x, y, 'ground');
    }
}