//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Player extends Phaser.Sprite {

    //initialization code in the constructor
    constructor(game, x, y) {
        super(game, x, y, 'pixel');
        this.scale.setTo(64, 64);
        this.anchor.setTo(0.5, 0.5);
        this.tint = Phaser.Color.hexToRGB("#9b59b6");
        this.targetX = game.world.centerX;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.oldPositions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    //Code ran on each frame of game
    update() {
        this.x += (this.targetX - this.x) * 0.1;
        this.oldPositions.push(this.x);
        this.oldPositions.shift();
    }

}

export default Player;
