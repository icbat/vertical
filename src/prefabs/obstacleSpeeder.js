import colorscheme from '../colorscheme';
import Obstacle from './obstacle';

class ObstacleSpeeder extends Obstacle {

    constructor(game, x, player) {
        super(game, x, player, colorscheme.obstacleSpeeder);
    }

    specialMove() {
        this.speed = this.initialSpeed / 2;
    }
}

export default ObstacleSpeeder;
