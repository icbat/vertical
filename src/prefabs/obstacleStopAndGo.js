import colorscheme from '../colorscheme';
import Obstacle from './obstacle';

class ObstacleStopAndGo extends Obstacle {

    constructor(game, x, player) {
        super(game, x, player, colorscheme.obstacleStopAndGo);
    }

    specialMove() {
        this.body.velocity.y = 0;
        let timer = this.game.time.create();
        let event = timer.add(Phaser.Timer.SECOND, () => {
            this.body.velocity.y = this.initialSpeed;
        }, this);
        timer.start();
    }
}

export default ObstacleStopAndGo;
