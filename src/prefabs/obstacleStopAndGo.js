import colorscheme from '../colorscheme';
import Obstacle from './obstacle';

class ObstacleStopAndGo extends Obstacle {

    constructor(game, x, player) {
        super(game, x, player, colorscheme.obstacleStopAndGo, "Stoppy");
    }

    specialMove() {
        this.verticalMovement.multiplySpeed(0);
        let event = this.timer.add(Phaser.Timer.SECOND, () => {
            this.verticalMovement.multiplySpeed(1);
        }, this);
        this.timer.start();
    }

}

export default ObstacleStopAndGo;
