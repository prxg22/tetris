export class Wall extends Phaser.Sprite {
    constructor(game, x, y, frame = 'wall') {
        super(game, x, y, frame);
        this.game.physics.arcade.enable(this);
        this.scale.x = 2;
        this.scale.y = 2;
        this.body.immovable = true;
        this.body.allowGravity = false;
        this.game.add.existing(this);
    }
}