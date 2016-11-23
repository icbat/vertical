import Obstacle from './prefabs/obstacle';
import ObstacleStopAndGo from './prefabs/obstacleStopAndGo';
import ObstacleSpeeder from './prefabs/obstacleSpeeder';
import ObstacleSwapper from './prefabs/obstacleSwapper';

class Spawner {

    // 'this' will be states.game, because that's the context passed to the callback
    spawn(level, player) {
        this.game.camera.shake(0.005, 100);
        let numberToSpawn = this.game.rnd.integerInRange(1, this.columnXVals.length - 1);
        let columnVals = new Phaser.ArraySet();
        columnVals.add(this.columnXVals[player.col]);
        let shuffledOriginals = Phaser.ArrayUtils.shuffle(this.columnXVals.slice());
        for (let column of shuffledOriginals) {
            columnVals.add(column);
        }
        let columns = columnVals.list.slice(0, numberToSpawn);

        for (let column of columns) {
            let obstacle;
            let spawnSeed = Math.random();
            if (spawnSeed < 0.1) {
                obstacle = new ObstacleStopAndGo(this.game, column, level);
            } else if (spawnSeed < 0.2) {
                obstacle = new ObstacleSpeeder(this.game, column, level);
            } else if (spawnSeed < 0.3) {
                obstacle = new ObstacleSwapper(this.game, column, level, this.columnXVals, columns);
            } else {
                obstacle = new Obstacle(this.game, column, level);
            }

            obstacle.shouldUpdate(true);

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
