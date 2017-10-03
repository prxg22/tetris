import { Boot } from './states/boot';

export class Game extends Phaser.Game {
    constructor() {
        const doc = document.documentElement;
        const width = doc.width > 800 ? 800 : doc.width;
        const height = doc.height > 600 ? 600 : doc.height;

        super(width, height, Phaser.AUTO, '');

        this.state.add('Boot', Boot);
        this.state.start('Boot');
    }
}

window.game = new Game();