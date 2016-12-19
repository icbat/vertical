import colorscheme from '../colorscheme';
import Obstacle from './obstacle';

class ObstacleSwapper extends Obstacle {

    constructor(game, x, player) {
        super(game, x, player, colorscheme.obstacleBoring, "Shifty", null);
    }

    activate(level, indices) {
        super.activate(level, indices);
        const columns = this.game.global.columns;
        const index = this.findIndex(columns, this.originalX);
        const neighboringLanes = this.getNeighboringLanes(columns, index);
        const targetIndex = this.findOpenNeighborLane(columns, indices, neighboringLanes);
        if (targetIndex !== null) {
            this.specialMove.callback = () => {
                this.horizontalMovement.targetX = columns[targetIndex];
            };
            this.tint = colorscheme.obstacleSwapper;
        } else {
            this.specialMove.callback = () => {};
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

    getNeighboringLanes(columns, myIndex) {
        const possibleSwaps = [];
        if (myIndex > 0) {
            possibleSwaps.push(myIndex - 1);
        }
        if (myIndex < columns.length - 1) {
            possibleSwaps.push(myIndex + 1);
        }

        return Phaser.ArrayUtils.shuffle(possibleSwaps);
    }

    findOpenNeighborLane(columns, myWaveIndices, possibleSwaps) {
        let possiblePosition;
        const existsInWave = (waveIndex) => {
            return waveIndex === possiblePosition;
        };
        for (possiblePosition of possibleSwaps) {
            const foundIndex = myWaveIndices.find(existsInWave);
            if (foundIndex === undefined) {
                return possiblePosition;
            }
        }
        return null;
    }

}

export default ObstacleSwapper;
