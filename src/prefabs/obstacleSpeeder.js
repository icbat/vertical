import colorscheme from '../colorscheme';
import Obstacle from './obstacle';

class ObstacleSpeeder extends Obstacle {

    constructor(game, x, level) {
        super(game, x, level);
        this.tint = Phaser.Color.hexToRGB(colorscheme.obstacleSpeeder);
        this.initialSpeed = this.speed;
        this.timeSpent = 0;
    }

    update() {
        this.timeSpent += this.game.time.physicsElapsed;

        if (this.timeSpent > 0.5) {
            this.speed = Math.max(this.speed - 0.05, this.initialSpeed * 0.5);
        }
        super.update();
    }
}

export default ObstacleSpeeder;
