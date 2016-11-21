import colorscheme from '../colorscheme';
import Obstacle from './obstacle';

class ObstacleStopAndGo extends Obstacle {

    constructor(game, x, level) {
        super(game, x, level);
        this.tint = Phaser.Color.hexToRGB(colorscheme.obstacleStopAndGo);
        this.timeSpent = 0;
    }

    update() {
        this.timeSpent += this.game.time.physicsElapsed;

        if (this.timeSpent < 1 || this.timeSpent > 2) {
            this.y += this.speed;
        }
        if (this.y - this.height > this.game.world.height) {
            this.destroyed.dispatch();
            this.destroy();
        }
    }
}

export default ObstacleStopAndGo;
