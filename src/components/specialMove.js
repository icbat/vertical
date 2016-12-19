import Component from "./component";
import config from "../config";

class SpecialMove extends Component {
    update(entity, game) {
        let triggerY = game.world.height * config.game.specialMoveHeight;
        if (triggerY <= entity.y && triggerY > entity.lastY) {
            entity.specialMove();
        }
    }
    activate(level) {}

}

export default SpecialMove;
