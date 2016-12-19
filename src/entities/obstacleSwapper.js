import colorscheme from '../colorscheme';
import Obstacle from './obstacle';
import NeighborAware from '../components/neighborAware';

class ObstacleSwapper extends Obstacle {

    constructor(game, x, player) {
        const openLaneCallback = (openLaneX) => {
            this.specialMove.callback = () => {
                this.horizontalMovement.targetX = openLaneX;
            };
            this.tint = colorscheme.obstacleSwapper;
        };
        const closedLaneCallback = () => {
            this.specialMove.callback = () => {};
        };
        super(game, x, player, colorscheme.obstacleBoring, "Shifty", null, new NeighborAware(game.global.columns, openLaneCallback, closedLaneCallback));
    }

}

export default ObstacleSwapper;
