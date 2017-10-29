export class Pixel extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'pixel');

        this.game.physics.arcade.enable(this);
        this.body.immovable = true;
        this.body.allowGravity = false;
        this.game.add.existing(this);
    }
}