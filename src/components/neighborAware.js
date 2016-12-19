import Component from "./component";

class NeighborAware extends Component {

    constructor(columns, openLaneCallback, closedLaneCallback) {
        super();
        this.columns = columns;
        this.openLaneCallback = openLaneCallback;
        this.closedLaneCallback = closedLaneCallback;
    }

    update(entity, game) {}

    activate(entity, level, waveIndicies) {
        const index = this.findIndex(entity);
        const neighboringLanes = this.getNeighboringLanes(index);
        const openLaneIndex = this.findOpenNeighborLane(neighboringLanes, waveIndicies);
        if (openLaneIndex !== null) {
            this.openLaneCallback(this.columns[openLaneIndex]);
        } else {
            this.closedLaneCallback();
        }
    }

    findIndex(entity) {
        for (let index = 0; index < this.columns.length; ++index) {
            if (this.columns[index] === entity.x) {
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
        if (myIndex < this.columns.length - 1) {
            possibleSwaps.push(myIndex + 1);
        }

        return Phaser.ArrayUtils.shuffle(possibleSwaps);
    }

    findOpenNeighborLane(neighboringLanes, myWaveIndices) {
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
