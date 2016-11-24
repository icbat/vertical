import colorscheme from '../colorscheme';
import Obstacle from './obstacle';

class ObstacleSwapper extends Obstacle {

    constructor(game, x, player) {
        super(game, x, player);
        this.originalTint = this.tint;
        this.originalX = x;
    }

    activate(level, index, indices, columns) {
        super.activate(level, index, indices, columns);
        let targetIndex = this.findOpenNeighborLane(columns, indices, index);
        if (targetIndex !== null) {
            this.specialMove = () => {
                this.targetX = columns[targetIndex];
            };
            this.tint = Phaser.Color.hexToRGB(colorscheme.obstacleSwapper);
        }
    }

    onUpdate() {
        if (!!this.targetX && this.targetX != this.x) {
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
            if (foundIndex === undefined) {
                return possiblePosition;
            }
        }
        return null;
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
