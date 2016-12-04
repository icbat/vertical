import colorscheme from '../colorscheme';
import Obstacle from './obstacle';

class ObstacleBoring extends Obstacle {

    constructor(game, x, player) {
        super(game, x, player, colorscheme.obstacleBoring);
    }

    specialMove() {}
}

export default ObstacleBoring;