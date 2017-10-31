export class Preload extends Phaser.State {
    preload() {
        game.stage.backgroundColor = '#fff';
        game.load.image('blocks', 'assets/blocks.png');
        game.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create() {
        game.state.start('Playing');
    }
}