import colorscheme from '../colorscheme';

class ObstacleStopAndGo extends Phaser.Sprite {

    constructor(game, x, level) {
        super(game, x, -32, 'pixel');
        this.anchor.setTo(0.5, 0.5);
        this.scale.setTo(64, 64);
        this.tint = Phaser.Color.hexToRGB(colorscheme.obstacleStopAndGo);
        this.destroyed = new Phaser.Signal();
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.speed = 5 + level;
        this.timeSpent = 0;
    }

    update() {
        this.timeSpent += this.game.time.physicsElapsed;

        if (this.timeSpent < 1 || this.timeSpent > 2) {
            this.y += this.speed;
        }
        if (this.y - this.height > this.game.world.height) {
            this.destroyed.dispatch();
            this.destroy();
        }
    }
}

export default ObstacleStopAndGo;
