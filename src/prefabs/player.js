import colorscheme from '../colorscheme';

class Player extends Phaser.Sprite {

    constructor(game, x, y, endGameCallback, endGameContext) {
        super(game, x, y, 'pixel');
        this.originalY = y;
        // assumes it's a square
        this.playerSize = this.width;
        this.anchor.setTo(0.5, 0.5);
        this.tint = colorscheme.player;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.oldPositions = Array(10).fill(this.x);

        this.col = 2;

        this.body.onOverlap = new Phaser.Signal();
        this.body.onOverlap.addOnce(endGameCallback, endGameContext);
        this.speed = 0;
        game.add.existing(this);
    }

    update() {
        let targetX = this.game.global.columns[this.col];
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
        this.height = this.playerSize * (1 - (squishPercent / 200));
        this.y = this.originalY + this.playerSize * (1 + (squishPercent / 200)) - this.playerSize;
        this.width = this.playerSize * (1 + (squishPercent / 100));
    }

    move(direction) {
        let result = this.col += direction;

        if (result < 0) {
            this.col = 0;
        } else if (result >= this.game.global.columns.length) {
            this.col = this.game.global.columns.length - 1;
        } else {
            this.col = result;
        }
    }

    turnOff() {
        this.update = () => {};
    }

}

export default Player;
