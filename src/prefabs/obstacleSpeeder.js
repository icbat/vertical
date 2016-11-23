import colorscheme from '../colorscheme';
import Obstacle from './obstacle';

class ObstacleSpeeder extends Obstacle {

    constructor(game, x, player) {
        super(game, x, player, colorscheme.obstacleSpeeder);
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
