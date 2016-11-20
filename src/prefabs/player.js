//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Player extends Phaser.Sprite {

    //initialization code in the constructor
    constructor(game, x, y, columnXVals, playerSize) {
        super(game, x, y, 'pixel');
        this.scale.setTo(playerSize, playerSize);
        this.anchor.setTo(0.5, 0.5);
        this.tint = Phaser.Color.hexToRGB("#9b59b6");
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.oldPositions = Array(10).fill(this.x);

        this.columnXVals = columnXVals;
        this.col = 2;
    }

    //Code ran on each frame of game
    update() {
        let targetX = this.columnXVals[this.col];
        this.x += (targetX - this.x) * 0.1;
        this.oldPositions.push(this.x);
        this.oldPositions.shift();
    }

    move(click) {
        if (click.worldX < this.columnXVals[this.col]) {
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
