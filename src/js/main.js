import { Boot } from './states/boot';
import { Preload } from './states/preload';
import { Playing } from './states/playing';

export class Game extends Phaser.Game {
    constructor() {
        super(800, 600, Phaser.AUTO, '');

        this.state.add('Boot', Boot);
        this.state.add('Playing', Playing);
        this.state.add('Preload', Preload);

        // boot game
        this.state.start('Boot');
    }
}

window.game = new Game();