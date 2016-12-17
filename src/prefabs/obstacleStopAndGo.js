import colorscheme from '../colorscheme';
import Obstacle from './obstacle';

class ObstacleStopAndGo extends Obstacle {

    constructor(game, x, player) {
        super(game, x, player, colorscheme.obstacleStopAndGo);
        this.name = "Stoppy";
    }

    specialMove() {
        this.speed = 0;
        this.timer = this.game.time.create();
        let event = this.timer.add(Phaser.Timer.SECOND, () => {
            this.speed = this.initialSpeed;
        }, this);
        this.timer.start();
    }

    turnOff() {
        super.turnOff();
        if (this.timer) {
            this.timer.stop();
        }
    }
}

export default ObstacleStopAndGo;
