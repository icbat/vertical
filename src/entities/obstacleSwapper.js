import colorscheme from '../colorscheme';
import Obstacle from './obstacle';
import NeighborAware from '../components/neighborAware';

class ObstacleSwapper extends Obstacle {

    constructor(game, x, player) {
        const callback = (openLaneX) => {
            if (!!openLaneX) {
                this.specialMove.callback = () => {
                    this.horizontalMovement.targetX = openLaneX;
                };
                this.tint = colorscheme.obstacleSwapper;
            } else {
                console.log("else case");
                this.specialMove.callback = () => {};
            }
        };
        super(game, x, player, colorscheme.obstacleBoring, "Shifty", null, new NeighborAware(game.global.columns, callback));
    }

}

export default ObstacleSwapper;
