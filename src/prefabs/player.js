import Ghost from './ghost';
import colorscheme from '../colorscheme';

class Player extends Phaser.Sprite {

    constructor(game, x, y, columnXVals, playerSize, endGameCallback, endGameContext) {
        super(game, x, y, 'pixel');
        this.scale.setTo(playerSize, playerSize);
        this.anchor.setTo(0.5, 0.5);
        this.tint = Phaser.Color.hexToRGB(colorscheme.player);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.oldPositions = Array(10).fill(this.x);

        this.columnXVals = columnXVals;
        this.col = 2;

        for (let i = 0; i < 5; ++i) {
            this.game.add.existing(new Ghost(this, i));
        }
        this.body.onOverlap = new Phaser.Signal();
        this.body.onOverlap.addOnce(endGameCallback, endGameContext);
    }

    update() {
        let targetX = this.columnXVals[this.col];
        this.x += (targetX - this.x) * 0.1 * this.game.time.physicsElapsed * this.game.time.desiredFps;
        this.oldPositions.push(this.x);
        this.oldPositions.shift();
    }

    move(click) {
        if (click.worldX < this.game.world.centerX) {
            this.guardedMoveCol(-1);
        } else {
            this.guardedMoveCol(1);
        }
    }

    guardedMoveCol(movement) {
        let result = this.col += movement;

        if (result < 0) {
            this.col = 0;
        } else if (result >= this.columnXVals.length) {
            this.col = this.columnXVals.length - 1;
        } else {
            this.col = result;
        }
    }

}

export default Player;
