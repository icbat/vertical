import colorscheme from '../colorscheme';
import Obstacle from './obstacle';
import HorizontalMovement from '../components/horizontalMovement';

class ObstacleSwapper extends Obstacle {

    constructor(game, x, player) {
        super(game, x, player, colorscheme.obstacleBoring, "Shifty", new HorizontalMovement());
    }

    activate(level, indices, columns) {
        super.activate(level, indices, columns);
        const index = this.findIndex(columns, this.originalX);
        const targetIndex = this.findOpenNeighborLane(columns, indices, index);
        if (targetIndex !== null) {
            this.specialMove = () => {
                this.horizontalMovement.setTarget(columns[targetIndex]);
            };
            this.tint = colorscheme.obstacleSwapper;
        } else {
            this.specialMove = () => {};
        }
    }

    findIndex(columns, x) {
        for (let index = 0; index < columns.length; ++index) {
            if (columns[index] === x) {
                return index;
            }
        }
        return -1;
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

}

export default ObstacleSwapper;
