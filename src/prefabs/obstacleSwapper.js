import colorscheme from '../colorscheme';
import Obstacle from './obstacle';

class ObstacleSwapper extends Obstacle {

    constructor(game, x, player) {
        super(game, x, player);
        this.originalTint = this.tint;
        this.originalX = x;

        // TODO move this to shouldUpdate(true) and get the args there

        let targetX;

    }

    activate(level, index, indices, columns) {
        super.activate(level, index, indices, columns);
        let targetX = this.findOpenNeighborLane(columns, indices, index);

        // DEBUGGING
        let targetIndex = columns.findIndex((x) => {
            return x === targetX;
        });
        console.log(index, targetIndex, indices, this.x, targetX);
        if (!!targetX) {
            this.specialMove = () => {
                this.targetX = targetX;
            };
            this.tint = Phaser.Color.hexToRGB(colorscheme.obstacleSwapper);
        }
    }

    onUpdate() {
        if (!!this.targetX) {
            this.x += (this.targetX - this.x) * 0.1 * this.game.time.physicsElapsed * this.game.time.desiredFps;
        }
        super.onUpdate();
    }

    findOpenNeighborLane(columns, myWaveIndices, myIndex) {
        let possibleSwaps = [];
        if (myIndex > 0) {
            possibleSwaps.push(myIndex - 1);
        }
        if (myIndex < columns.length - 1) {
            possibleSwaps.push(myIndex + 1);
        }
        possibleSwaps = Phaser.ArrayUtils.shuffle(possibleSwaps);

        let possiblePosition;
        let existsInWave = (waveIndex) => {
            return waveIndex === possiblePosition;
        };
        for (possiblePosition of possibleSwaps) {
            let foundIndex = myWaveIndices.find(existsInWave);
            if (!foundIndex) {
                return columns[possiblePosition];
            }
        }
        return 0;
    }

    reset() {
        super.reset();
        this.tint = this.originalTint;
        this.specialMove = () => {};
        this.targetX = null;
        this.x = this.originalX;
    }
}

export default ObstacleSwapper;
