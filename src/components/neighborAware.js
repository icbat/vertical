import Component from "./component";

class NeighborAware extends Component {

    update(entity, game) {}

    activate(entity, level, waveIndicies) {}

    findIndex(entity) {
        for (let index = 0; index < this.game.global.columns.length; ++index) {
            if (this.game.global.columns[index] === entity.x) {
                return index;
            }
        }
        return -1;
    }

    getNeighboringLanes(myIndex) {
        const possibleSwaps = [];
        if (myIndex > 0) {
            possibleSwaps.push(myIndex - 1);
        }
        if (myIndex < this.game.global.columns.length - 1) {
            possibleSwaps.push(myIndex + 1);
        }

        return Phaser.ArrayUtils.shuffle(possibleSwaps);
    }

    findOpenNeighborLane(entity, indices) {
        const index = this.neighborAware.findIndex(entity);
        const neighboringLanes = this.neighborAware.getNeighboringLanes(index);
        let possiblePosition;
        const existsInWave = (waveIndex) => {
            return waveIndex === possiblePosition;
        };
        for (possiblePosition of neighboringLanes) {
            const foundIndex = myWaveIndices.find(existsInWave);
            if (foundIndex === undefined) {
                return possiblePosition;
            }
        }
        return null;
    }

}

export default NeighborAware;
