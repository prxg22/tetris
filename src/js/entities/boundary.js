export class Boundary extends Phaser.Group {
    constructor(game, wall) {
        super(game, null, null, null, true, Phaser.Physics.ARCADE);
        this.add(wall);
        this.game.add.existing(this);
    }
}