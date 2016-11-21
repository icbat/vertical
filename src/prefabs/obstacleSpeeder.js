import colorscheme from '../colorscheme';
import Obstacle from './obstacle';

class ObstacleSpeeder extends Obstacle {

    constructor(game, x, level) {
        super(game, x, level);
        this.tint = Phaser.Color.hexToRGB(colorscheme.obstacleSpeeder);
        this.initialSpeed = this.speed;
    }

    specialMove() {
        this.speed = this.initialSpeed / 2;
    }
}

export default ObstacleSpeeder;
