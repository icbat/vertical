import colorscheme from '../colorscheme';

class Obstacle extends Phaser.Sprite {

    //initialization code in the constructor
    constructor(game, x, level) {
        super(game, x, -64, 'pixel');
        this.anchor.setTo(0.5, 0.5);
        this.scale.setTo(64, 64);
        this.tint = Phaser.Color.hexToRGB(colorscheme.obstacleStandard);
        this.destroyed = new Phaser.Signal();
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.speed = 5 + level;
    }

    //Code ran on each frame of game
    update() {
        this.y += this.speed;
        if (this.y - this.height > this.game.world.height) {
            this.destroyed.dispatch();
            this.destroy();
        }
    }
}

export default Obstacle;
