export class Pixel extends Phaser.Sprite {
    constructor(game, x, y, frame = 'pixel') {
        super(game, x, y, frame);

        this.game.physics.arcade.enable(this);
        this.body.immovable = true;
        this.body.allowGravity = false;
        this.game.add.existing(this);
    }
}