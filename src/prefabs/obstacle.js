import colorscheme from '../colorscheme';

class Obstacle extends Phaser.Sprite {

    constructor(game, x, player, color) {
        super(game, x, -36, 'pixel');
        this.anchor.setTo(0.5, 0.5);
        this.scale.setTo(64, 64);
        this.destroyed = new Phaser.Signal();
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.specialMoveTrigger = this.game.world.height * 0.3;

        this.player = player;
        this.initialSpeed = 300;
        this.initialY = this.y;

        let tint = color || colorscheme.obstacleStandard;
        this.tint = Phaser.Color.hexToRGB(tint);
    }

    activate(level) {
        this.body.velocity.y = this.initialSpeed + level * 25;
        this.update = this.onUpdate;
    }

    onUpdate() {
        if (this.y - this.height > this.game.world.height) {
            this.reset();
            return;
        }
        if (this.specialMoveTrigger <= this.y && this.specialMoveTrigger > this.y - this.body.deltaY()) {
            this.specialMove();
        }
        this.game.physics.arcade.overlap(this.player, this);
    }

    reset() {
        this.destroyed.dispatch();
        this.update = () => {
            this.y = this.initialY;
            this.update = () => {};
        };
        this.body.velocity.y = 0;

    }

    // None here, override this in children
    specialMove() {}
}

export default Obstacle;
