import colorscheme from '../colorscheme';

class ObstacleSpeeder extends Phaser.Sprite {

    constructor(game, x, level) {
        super(game, x, -64, 'pixel');
        this.anchor.setTo(0.5, 0.5);
        this.scale.setTo(64, 64);
        this.tint = Phaser.Color.hexToRGB(colorscheme.obstacleSpeeder);
        this.destroyed = new Phaser.Signal();
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.speed = 5 + level;
        this.initialSpeed = this.speed;
        this.timeSpent = 0;
    }

    update() {
        this.timeSpent += this.game.time.physicsElapsed;

        this.y += this.speed;
        if (this.timeSpent > 0.5) {
            this.speed = Math.max(this.speed - 0.05, this.initialSpeed * 0.5);
        }
        if (this.y - this.height > this.game.world.height) {
            this.destroyed.dispatch();
            this.destroy();
        }
    }
}

export default ObstacleSpeeder;
