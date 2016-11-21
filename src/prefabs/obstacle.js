import colorscheme from '../colorscheme';

class Obstacle extends Phaser.Sprite {

    constructor(game, x, level) {
        super(game, x, -32, 'pixel');
        this.anchor.setTo(0.5, 0.5);
        this.scale.setTo(64, 64);
        this.destroyed = new Phaser.Signal();
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.speed = 5 + level;

        this.tint = Phaser.Color.hexToRGB(colorscheme.obstacleStandard);
    }

    update() {
        this.y += this.speed;
        if (this.y - this.height > this.game.world.height) {
            this.destroyed.dispatch();
            this.destroy();
        }
    }
}

export default Obstacle;
