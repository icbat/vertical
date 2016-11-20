import colorscheme from '../colorscheme';

class Obstacle extends Phaser.Sprite {

    constructor(game, x, level, possibleColumns, myWaveColumns) {
        super(game, x, -64, 'pixel');
        this.anchor.setTo(0.5, 0.5);
        this.scale.setTo(64, 64);
        this.tint = Phaser.Color.hexToRGB(colorscheme.obstacleSwapper);
        this.destroyed = new Phaser.Signal();
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.speed = 5 + level;

        let targetX = this.findOpenNeighborLane(possibleColumns, myWaveColumns, x);
        if (!!targetX) {
            let timer = this.game.time.create();
            let event = timer.add(Phaser.Timer.SECOND * 0.5, (targetX) => {
                this.targetX = targetX;
            }, this, targetX);
            timer.start();
        }
    }

    update() {
        this.y += this.speed;
        if (!!this.targetX) {
            this.x += (this.targetX - this.x) * 0.1;
        }
        if (this.y - this.height > this.game.world.height) {
            this.destroyed.dispatch();
            this.destroy();
        }
    }

    findOpenNeighborLane(possibleColumns, myWaveColumns, myX) {
        let myIndex = -1;
        for (let i = 0; i < possibleColumns.length; ++i) {
            if (possibleColumns[i] === myX) {
                myIndex = i;
            }
        }

        let left = possibleColumns[Math.max(myIndex - 1, 0)];
        let right = possibleColumns[Math.min(myIndex + 1, possibleColumns.length -1)];

        let leftViable = true;
        if (left === myX) {
            leftViable = false;
        } else {
            for (let neighbors of myWaveColumns) {
                if (neighbors === left) {
                    leftViable = false;
                }
            }
        }

        let rightViable = true;
        if (right === myX) {
            rightViable = false;
        } else {
            for (let neighbors of myWaveColumns) {
                if (neighbors === right) {
                    rightViable = false;
                }
            }
        }

        if (leftViable) {
            return left;
        }
        if (rightViable) {
            return right;
        }
        return 0;

    }
}

export default Obstacle;
