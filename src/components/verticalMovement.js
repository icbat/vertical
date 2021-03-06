import Component from "./component";
import config from "../config";

class VerticalMovement extends Component {

    update(entity, game) {
        if (entity.y - entity.height > game.world.height) {
            entity.offscreen();
            return;
        }

        entity.y += this.speed * game.time.elapsed / config.physics.delta;
    }

    activate(entity, level, waveIndicies) {
        this.initialSpeed = config.game.baseObstacleSpeed + level;
        this.speed = this.initialSpeed;
    }

    multiplySpeed(factor) {
        this.speed = this.initialSpeed * factor;
    }
}

export default VerticalMovement;
