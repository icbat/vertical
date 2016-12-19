import Component from "./component";
import config from "../config";

class VerticalMovement extends Component {

    update(entity, game) {
        if (entity.y - entity.height > game.world.height) {
            entity.reset();
            return;
        }

        entity.y += this.speed * game.time.elapsed / config.physics.delta;
    }
    activate(level) {
        this.initialSpeed = config.physics.baseObstacleSpeed + level;
        this.speed = this.initialSpeed;
    }

    multiplySpeed(factor) {
        this.speed = this.initialSpeed * factor;
    }
}

export default VerticalMovement;
