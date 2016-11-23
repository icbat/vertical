import Obstacle from './prefabs/obstacle';
import ObstacleStopAndGo from './prefabs/obstacleStopAndGo';
import ObstacleSpeeder from './prefabs/obstacleSpeeder';
import ObstacleSwapper from './prefabs/obstacleSwapper';

class Spawner {

    constructor(game, player, columns) {
        this.game = game;
        this.player = player;
        this.columns = columns;
        this.obstacles = [];
    }

    spawn(level) {
        this.game.camera.shake(0.005, 100);
        let numberToSpawn = this.game.rnd.integerInRange(1, this.columns.length - 1);
        let columnVals = new Phaser.ArraySet();
        columnVals.add(this.columns[this.player.col]);
        let shuffledOriginals = Phaser.ArrayUtils.shuffle(this.columns.slice());
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
                obstacle = new ObstacleSwapper(this.game, column, level, this.columns, columns);
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
