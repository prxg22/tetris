export class Wall extends Phaser.Sprite {
    constructor(game, x, y, name, frame = 'wall') {
        super(game, x, y, frame);
        this.name = name;
        this.game.physics.arcade.enable(this);
        this.body.immovable = true;
        this.body.allowGravity = false;
        this.game.add.existing(this);
    }
}