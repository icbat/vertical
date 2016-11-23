import colorscheme from '../colorscheme';

class Obstacle extends Phaser.Sprite {

    constructor(game, x, player, color) {
        super(game, x, -36, 'pixel');
        this.anchor.setTo(0.5, 0.5);
        this.scale.setTo(64, 64);
        this.destroyed = new Phaser.Signal();
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.speed = 5 + level;
        this.specialMoveTrigger = this.game.world.height * 0.3;

        this.player = player;

        let tint = color || colorscheme.obstacleStandard;
        this.tint = Phaser.Color.hexToRGB(tint);
    }

    shouldUpdate(shouldUpdate) {
        if (shouldUpdate) {
            this.update = this.onUpdate;
        } else {
            this.update = () => {};
        }
    }

    onUpdate() {
        if (this.y - this.height > this.game.world.height) {
            this.reset();
            return;
        }
        this.y += this.speed * this.game.time.physicsElapsed * this.game.time.desiredFps;
        if (this.specialMoveTrigger <= this.y && this.specialMoveTrigger > this.y - this.speed) {
            this.specialMove();
        }
        this.game.physics.arcade.overlap(this.player, this);
    }

    reset() {
        this.destroyed.dispatch();
        this.y = -36;
        this.shouldUpdate(false);
    }

    // None here, override this in children
    specialMove() {}
}

export default Obstacle;
