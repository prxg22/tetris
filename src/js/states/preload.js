export class Preload extends Phaser.State {
    preload() {
        game.load.image('bg', '../assets/background.jpg');
        game.load.image('wall', '../assets/wall.png');
        game.load.image('ground', '../assets/ground.png');
        game.load.image('tetris-O', '../assets/O.png');
        game.load.image('tetris-L', '../assets/L.png');
        game.load.image('tetris-J', '../assets/J.png');
        game.load.image('tetris-T', '../assets/T.png');
        game.load.image('tetris-S', '../assets/S.png');
        game.load.image('tetris-Z', '../assets/Z.png');
        game.load.image('pixel', '../assets/pixel.png');

        game.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create() {
        game.state.start('Playing');
    }
}