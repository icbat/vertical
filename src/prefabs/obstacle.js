import colorscheme from '../colorscheme';

class Obstacle extends Phaser.Sprite {

    constructor(game, x, player, color) {
        super(game, x, -36, 'pixel');
        this.anchor.setTo(0.5, 0.5);
        this.destroyed = new Phaser.Signal();
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.specialMoveTrigger = this.game.world.height * 0.3;
        this.baseSpeed = 5;
        this.player = player;
        this.initialY = this.y;
        this.alive = false;

        this.tint = color;
    }

    // unused params are only used by children, they're here for documentation
    activate(level, index, indices, columns) {
        this.initialSpeed = this.baseSpeed + level;
        this.speed = this.initialSpeed;
        this.update = this.onUpdate;
        this.alive = true;
        this.visible = true;
    }

    onUpdate() {
        if (this.y - this.height > this.game.world.height) {
            this.reset();
            return;
        }
        this.y += this.speed * this.game.time.elapsed / 15;
        if (this.specialMoveTrigger <= this.y && this.specialMoveTrigger > this.y - this.speed * this.game.time.elapsed / 15) {
            this.specialMove();
        }
        this.game.physics.arcade.overlap(this.player, this);
    }

    reset() {
        this.destroyed.dispatch();
        this.speed = 0;
        this.y = this.initialY;
        this.alive = false;
        this.visible = false;
        this.update = () => {};
    }

    // None here, override this in children
    specialMove() {}
}

export default Obstacle;
