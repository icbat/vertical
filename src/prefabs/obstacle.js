//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Obstacle extends Phaser.Sprite {

    //initialization code in the constructor
    constructor(game, x) {
        super(game, x, -64, 'pixel');
        this.anchor.setTo(0.5, 0.5);
        this.scale.setTo(64, 64);
        this.destroyed = new Phaser.Signal();
        game.physics.enable(this, Phaser.Physics.ARCADE);
    }

    //Code ran on each frame of game
    update() {
        this.y += 5;
        if (this.y - this.height > this.game.world.height) {
            this.destroyed.dispatch();
            this.destroy();
        }
    }
}

export default Obstacle;
