import colorscheme from '../colorscheme';
import Obstacle from './obstacle';

class ObstacleSpeeder extends Obstacle {

    constructor(game, x, player) {
        super(game, x, player, colorscheme.obstacleSpeeder, "Speedy", () => {
            this.verticalMovement.multiplySpeed(1 / 2);
        });
    }

}

export default ObstacleSpeeder;
