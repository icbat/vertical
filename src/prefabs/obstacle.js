import colorscheme from '../colorscheme';

class Obstacle extends Phaser.Sprite {

    constructor(game, x, player, color) {
        super(game, x, -36, 'pixel');
        this.anchor.setTo(0.5, 0.5);
        // this.scale.setTo(64, 64);
        this.destroyed = new Phaser.Signal();
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.specialMoveTrigger = this.game.world.height * 0.3;
        this.baseSpeed = 300;
        this.player = player;
        this.initialY = this.y;
        this.alive = false;

        let tint = color || colorscheme.obstacleStandard;
        this.tint = Phaser.Color.hexToRGB(tint);
    }

    // unused params are only used by children, they're here for documentation
    activate(level, index, indices, columns) {
        this.body.velocity.y = this.baseSpeed + level * 25;
        this.initialSpeed = this.body.velocity.y;
        this.update = this.onUpdate;
        this.alive = true;
    }

    onUpdate() {
        if (this.y - this.height > this.game.world.height) {
            this.reset();
            return;
        }
        if (this.specialMoveTrigger <= this.y && this.specialMoveTrigger > this.y - this.body.deltaY()) {
            this.specialMove();
        }
        // this.game.physics.arcade.overlap(this.player, this);
    }

    reset() {
        this.destroyed.dispatch();
        this.update = () => {
            this.y = this.initialY;
            this.update = () => {};
        };
        this.body.velocity.y = 0;
        this.alive = false;
    }

    // None here, override this in children
    specialMove() {}
}

export default Obstacle;
