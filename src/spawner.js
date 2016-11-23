import Obstacle from './prefabs/obstacle';
import ObstacleStopAndGo from './prefabs/obstacleStopAndGo';
import ObstacleSpeeder from './prefabs/obstacleSpeeder';
import ObstacleSwapper from './prefabs/obstacleSwapper';

class Spawner {

    constructor(game, columns, player) {
        this.game = game;
        this.columns = columns;
        this.spawnPool = [];

        this.genericObstacleProbability = 0.7;
        this.genericSpawnPool = this.poolByType(Obstacle, columns, game, player);

        this.spawnPool.push(this.poolByType(ObstacleStopAndGo, columns, game, player));
        this.spawnPool.push(this.poolByType(ObstacleSpeeder, columns, game, player));
        this.spawnPool.push(this.poolByType(ObstacleSwapper, columns, game, player));
    }

    poolByType(Type, columns, game, player) {
        let pool = [];
        for (let column of columns) {
            let obstacle = new Type(game, column, 0, player);
            pool.push(obstacle);
            game.add.existing(obstacle);
            obstacle.destroyed.add(() => {
                this.game.global.score += 1;
            });
        }
        return pool;
    }

    spawn(level, numberToSpawn, player) {
        let shuffledOriginals = Phaser.ArrayUtils.shuffle(Phaser.ArrayUtils.numberArray(0, this.columns.length - 1));
        let columnVals = new Phaser.ArraySet();

        columnVals.add(player.col);

        for (let column of shuffledOriginals) {
            columnVals.add(column);
        }
        let indices = columnVals.list.slice(0, numberToSpawn);

        for (let index of indices) {
            let obstaclePool;
            if (Math.random() < this.genericObstacleProbability) {
                obstaclePool = this.genericSpawnPool;
            } else {
                obstaclePool = this.game.rnd.pick(this.spawnPool);
            }
            let obstacle = obstaclePool[index];

            obstacle.shouldUpdate(true);
        }
    }

}

export default Spawner;
