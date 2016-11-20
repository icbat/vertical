import Obstacle from './prefabs/obstacle';

class Spawner {

    // 'this' will be states.game, because that's the context passed to the callback
    spawn(level) {

        this.game.camera.shake(0.005, 100);
        let numberToSpawn = this.game.rnd.integerInRange(1, this.columnXVals.length - 1);
        let columnVals = Phaser.ArrayUtils.shuffle(this.columnXVals.slice());
        let columns = columnVals.slice(0, numberToSpawn);

        console.log(columns);
        for (let column of columns) {
            let obstacle = new Obstacle(this.game, column, level);

            this.obstacles.push(obstacle);
            obstacle.destroyed.addOnce(() => {
                this.obstacles.shift();
                this.game.global.score += 1;
            });

            this.game.add.existing(obstacle);
        }
    }

}

export default Spawner;
