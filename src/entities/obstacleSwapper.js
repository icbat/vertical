import colorscheme from '../colorscheme';
import Obstacle from './obstacle';
import NeighborAware from '../components/neighborAware';

class ObstacleSwapper extends Obstacle {

    constructor(game, x, player) {
        super(game, x, player, colorscheme.obstacleBoring, "Shifty", null);
        this.neighborAware = new NeighborAware();
    }

    activate(level, indices) {
        super.activate(level, indices);
        const targetIndex = this.neighborAware.findOpenNeighborLane(entity, indices);
        if (targetIndex !== null) {
            this.specialMove.callback = () => {
                this.horizontalMovement.targetX = columns[targetIndex];
            };
            this.tint = colorscheme.obstacleSwapper;
        } else {
            this.specialMove.callback = () => {};
        }
    }



}

export default ObstacleSwapper;
