export class LandedBlocks extends Phaser.Group {
    constructor(game) {
        super(game, null, null, null, true, Phaser.Physics.ARCADE);
        this.game.add.existing(this);
    }

    add(pixels) {
        if ( pixels instanceof Array) {
            pixels.map(pixel => {
                super.add(pixel);
            })
        } else {
            super.add(pixels);
        }
    }

    landBlock(block) {
        if (!block || !block.exists) {
            return;
        }
        block.kill();
        this.add(block.toPixels());
    }
}