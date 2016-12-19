import Component from "./component";
import config from "../config";

class SpecialMove extends Component {

    constructor(callback) {
        super();
        this.callback = callback;
    }

    update(entity, game) {
        let triggerY = game.world.height * config.game.specialMoveHeight;
        if (triggerY <= entity.y && triggerY > entity.lastY) {
            this.callback();
        }
    }

    activate(level) {}

}

export default SpecialMove;
