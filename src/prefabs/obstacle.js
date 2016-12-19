import colorscheme from '../colorscheme';
import VerticalMovement from '../components/verticalMovement';

class Obstacle extends Phaser.Sprite {

    constructor(game, x, player, color, name) {
        super(game, x, -36, 'pixel');
        this.anchor.setTo(0.5, 0.5);
        this.destroyed = new Phaser.Signal();
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.specialMoveTrigger = this.game.world.height * 0.3;
        this.initialY = this.y;
        this.alive = false;

        this.verticalMovement = new VerticalMovement();

        this.player = player;
        this.tint = color;
        this.name = name;
    }

    // unused params are only used by children, they're here for documentation
    activate(level, index, indices, columns) {
        this.verticalMovement.activate(level);
        this.update = this.onUpdate;
        this.alive = true;
        this.visible = true;
        this.lastY = this.y;
    }

    onUpdate() {
        this.verticalMovement.update(this, this.game);

        if (this.specialMoveTrigger <= this.y && this.specialMoveTrigger > this.lastY) {
            this.specialMove();
        }
        this.lastY = this.y;
        this.game.physics.arcade.overlap(this.player, this);
    }

    reset() {
        this.destroyed.dispatch();
        this.y = this.initialY;
        this.alive = false;
        this.visible = false;
        this.update = () => {};
    }

    // None here, override this in children
    specialMove() {}

    turnOff() {
        this.update = () => {};
    }
}

export default Obstacle;
