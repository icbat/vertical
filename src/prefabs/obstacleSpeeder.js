import colorscheme from '../colorscheme';
import Obstacle from './obstacle';

class ObstacleSpeeder extends Obstacle {

    constructor(game, x, level, player) {
        super(game, x, level, player);
        this.tint = Phaser.Color.hexToRGB(colorscheme.obstacleSpeeder);
        this.initialSpeed = this.speed;
    }

    specialMove() {
        this.speed = this.initialSpeed / 2;
    }

    reset () {
        super.reset();
        this.speed = this.initialSpeed;
    }
}

export default ObstacleSpeeder;
