import colorscheme from '../colorscheme';
import VerticalMovement from '../components/verticalMovement';
import Component from '../components/component';

class Obstacle extends Phaser.Sprite {

    constructor(game, x, player, color, name, horizontalMovement) {
        const y = -36;
        super(game, x, y, 'pixel');
        this.anchor.setTo(0.5, 0.5);
        this.destroyed = new Phaser.Signal();
        this.specialMoveTrigger = this.game.world.height * 0.3;

        this.horizontalMovement = horizontalMovement || new Component();
        this.verticalMovement = new VerticalMovement();

        this.player = player;
        this.tint = color;
        this.name = name;
        this.alive = false;

        this.originalX = x;
        this.originalY = y;
        this.originalTint = this.tint;

        game.physics.enable(this, Phaser.Physics.ARCADE);
    }

    // unused params are only used by children, they're here for documentation
    activate(level, index, indices, columns) {
        this.horizontalMovement.activate(level);
        this.verticalMovement.activate(level);
        this.update = this.onUpdate;
        this.alive = true;
        this.visible = true;
        this.lastY = this.y;
    }

    onUpdate() {
        this.horizontalMovement.update(this, this.game);
        this.verticalMovement.update(this, this.game);

        if (this.specialMoveTrigger <= this.y && this.specialMoveTrigger > this.lastY) {
            this.specialMove();
        }
        this.lastY = this.y;
        this.game.physics.arcade.overlap(this.player, this);
    }

    reset() {
        this.destroyed.dispatch();
        this.y = this.originalY;
        this.tint = this.originalTint;
        this.x = this.originalX;
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
