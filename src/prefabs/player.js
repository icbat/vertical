import colorscheme from '../colorscheme';

class Player extends Phaser.Sprite {

    constructor(game, x, y, columnXVals, playerSize, endGameCallback, endGameContext) {
        super(game, x, y, 'pixel');
        this.initialY = y;
        this.anchor.setTo(0.5, 0.5);
        this.tint = colorscheme.player;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.oldPositions = Array(10).fill(this.x);

        this.columnXVals = columnXVals;
        this.col = 2;

        this.body.onOverlap = new Phaser.Signal();
        this.body.onOverlap.addOnce(endGameCallback, endGameContext);
        this.speed = 0;
    }

    update() {
        let targetX = this.columnXVals[this.col];
        const acceleration = 5;
        if (targetX !== this.x) {
            this.speed += acceleration;
            let velocity = targetX - this.x;
            let direction = velocity ? velocity < 0 ? -1 : 1 : 0;
            let distance = Math.min(this.speed * this.game.time.elapsed / 15, Math.abs(velocity));
            this.x += direction * distance;

        } else {
            this.speed = Math.max(0, this.speed - acceleration);
        }
        this.oldPositions.push(this.x);
        this.oldPositions.shift();

        let squishPercent = this.speed;
        const originalSize = 64;
        this.height = originalSize * (1 - (squishPercent / 200));
        this.y = this.initialY + originalSize * (1 + (squishPercent / 200)) - originalSize;
        this.width = originalSize * (1 + (squishPercent / 100));
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
