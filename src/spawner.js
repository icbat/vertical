import Obstacle from './prefabs/obstacle';
import ObstacleStopAndGo from './prefabs/obstacleStopAndGo';
import ObstacleSpeeder from './prefabs/obstacleSpeeder';
import ObstacleSwapper from './prefabs/obstacleSwapper';

class Spawner {

    constructor(game, columns, player) {
        this.game = game;
        this.columns = columns;
        this.spawnPool = [];
        this.spriteBatch = game.add.spriteBatch();

        this.genericObstacleProbability = 0.7;
        this.genericSpawnPool = this.poolByType(Obstacle, columns, game, player);

        this.spawnPool.push(this.poolByType(ObstacleStopAndGo, columns, game, player));
        this.spawnPool.push(this.poolByType(ObstacleSpeeder, columns, game, player));
        this.spawnPool.push(this.poolByType(ObstacleSwapper, columns, game, player));
    }

    poolByType(Type, columns, game, player) {
        let pool = [];
        for (let column of columns) {
            let obstacle = new Type(game, column, player);
            pool.push(obstacle);
            this.spriteBatch.addChild(obstacle);
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
            this.pickObject(index, indices, level);
        }
    }

    pickObject(index, indices, level) {
        let obstaclePool;
        if (Math.random() < this.genericObstacleProbability) {
            obstaclePool = this.genericSpawnPool;
        } else {
            obstaclePool = this.game.rnd.pick(this.spawnPool);
        }
        let obstacle = obstaclePool[index];
        if (!obstacle.alive) {
            obstacle.activate(level, index, indices, this.columns);
        } else {
            this.pickObject(index, indices, level);
        }
    }

}

export default Spawner;
