import Component from "./component";
import config from "../config";

class HorizontalMovement extends Component {

    update(entity, game) {
        if (!!this.targetX && this.targetX != entity.x) {
            entity.x += (this.targetX - entity.x) * 0.1 * game.time.elapsed / config.physics.delta;
        }
    }

    activate(entity, level, waveIndicies) {
        this.targetX = null;
    }

}

export default HorizontalMovement;
