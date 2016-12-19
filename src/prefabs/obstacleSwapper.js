import colorscheme from '../colorscheme';
import Obstacle from './obstacle';
import HorizontalMovement from '../components/horizontalMovement';

class ObstacleSwapper extends Obstacle {

    constructor(game, x, player) {
        super(game, x, player, colorscheme.obstacleBoring, "Shifty", new HorizontalMovement());
    }

    activate(level, index, indices, columns) {
        super.activate(level, index, indices, columns);
        let targetIndex = this.findOpenNeighborLane(columns, indices, index);
        if (targetIndex !== null) {
            this.specialMove = () => {
                this.horizontalMovement.setTarget(columns[targetIndex]);
            };
            this.tint = colorscheme.obstacleSwapper;
        }
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
        this.specialMove = () => {};
    }
}

export default ObstacleSwapper;
