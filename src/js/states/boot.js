export class Boot extends Phaser.State {
    create() {
        // start preload
        game.state.start('Preload');
    }
}
