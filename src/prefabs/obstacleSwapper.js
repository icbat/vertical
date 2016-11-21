import colorscheme from '../colorscheme';
import Obstacle from './obstacle';

class ObstacleSwapper extends Obstacle {

    constructor(game, x, level, possibleColumns, myWaveColumns) {
        super(game, x, level);
        this.tint = Phaser.Color.hexToRGB(colorscheme.obstacleSwapper);

        let targetX = this.findOpenNeighborLane(possibleColumns, myWaveColumns, x);
        if (!!targetX) {
            let timer = this.game.time.create();
            let event = timer.add(Phaser.Timer.SECOND * 0.5, (targetX) => {
                this.targetX = targetX;
            }, this, targetX);
            timer.start();
        }
    }

    update() {
        if (!!this.targetX) {
            this.x += (this.targetX - this.x) * 0.1;
        }
        super.update();
    }

    findOpenNeighborLane(possibleColumns, myWaveColumns, myX) {
        let myIndex = -1;
        for (let i = 0; i < possibleColumns.length; ++i) {
            if (possibleColumns[i] === myX) {
                myIndex = i;
            }
        }

        let left = possibleColumns[Math.max(myIndex - 1, 0)];
        let right = possibleColumns[Math.min(myIndex + 1, possibleColumns.length - 1)];
        let possibleSwaps = Phaser.ArrayUtils.shuffle([left, right]);

        for (let possiblePosition of possibleSwaps) {
            let viable = true;

            for (let neighbors of myWaveColumns) {
                if (neighbors === possiblePosition) {
                    viable = false;
                }
            }
            if (viable) {
                return possiblePosition;
            }
        }
        return 0;
    }
}

export default ObstacleSwapper;
