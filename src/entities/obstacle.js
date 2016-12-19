import colorscheme from '../colorscheme';
import HorizontalMovement from '../components/horizontalMovement';
import VerticalMovement from '../components/verticalMovement';
import SpecialMove from '../components/specialMove';
import Component from '../components/component';

class Obstacle extends Phaser.Sprite {

    constructor(game, x, player, color, name, specialMove, neighborAware) {
        const y = -36;
        super(game, x, y, 'pixel');
        this.anchor.setTo(0.5, 0.5);
        this.specialMoveTrigger = this.game.world.height * 0.3;

        this.horizontalMovement = new HorizontalMovement();
        this.verticalMovement = new VerticalMovement();
        this.specialMove = new SpecialMove(specialMove);
        this.neighborAware = neighborAware || new Component();

        this.player = player;
        this.tint = color;
        this.name = name;
        this.visible = false;
        this.timer = this.game.time.create();

        this.originalX = x;
        this.originalY = y;
        this.originalTint = this.tint;

        game.physics.enable(this, Phaser.Physics.ARCADE);
    }

    // unused params are only used by children, they're here for documentation
    activate(level, waveIndicies) {
        this.reset(this.originalX, this.originalY);
        this.horizontalMovement.activate(this, level, waveIndicies);
        this.verticalMovement.activate(this, level, waveIndicies);
        this.specialMove.activate(this, level, waveIndicies);
        this.neighborAware.activate(this, level, waveIndicies);
        this.update = this.onUpdate;
        this.lastY = this.y;
    }

    onUpdate() {
        this.horizontalMovement.update(this, this.game);
        this.verticalMovement.update(this, this.game);
        this.specialMove.update(this, this.game);
        this.neighborAware.update(this, this.game);
        this.lastY = this.y;
        this.game.physics.arcade.overlap(this.player, this);
    }

    offscreen() {
        this.tint = this.originalTint;
        this.kill();
        this.update = () => {};
    }

    turnOff() {
        this.timer.stop();
        this.update = () => {};
    }
}

export default Obstacle;
