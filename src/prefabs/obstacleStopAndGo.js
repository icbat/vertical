import colorscheme from '../colorscheme';
import Obstacle from './obstacle';

class ObstacleStopAndGo extends Obstacle {

    constructor(game, x, player) {
        super(game, x, player);
        this.tint = Phaser.Color.hexToRGB(colorscheme.obstacleStopAndGo);
        this.initialSpeed = this.speed;
    }

    specialMove() {
        this.speed = 0;
        let timer = this.game.time.create();
        let event = timer.add(Phaser.Timer.SECOND, () => {
            this.speed = this.initialSpeed;
        }, this);
        timer.start();
    }
}

export default ObstacleStopAndGo;
