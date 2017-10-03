export class Boot extends Phaser.State {
    init() {
        this.stage.backgroundColor = '#0088ff'
    }

    preload() {
        
    }

    create() {
        this.graphic = this.game.add.graphics(0, 0);
        this.graphic.beginFill(0xff0000);
        this.graphic.drawRect(this.game.world.centerX, this.game.world.centerY, 800, 50);
        this.graphic.endFill();
    }
}