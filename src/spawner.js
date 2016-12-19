import ObstacleBoring from './prefabs/obstacleBoring';
import ObstacleStopAndGo from './prefabs/obstacleStopAndGo';
import ObstacleSpeeder from './prefabs/obstacleSpeeder';
import ObstacleSwapper from './prefabs/obstacleSwapper';
import config from './config';

class Spawner {

    constructor(game, columns, player, scoreSignal) {
        this.game = game;
        this.columns = columns;
        this.scoreSignal = scoreSignal;
        this.spawnPool = [];
        this.spriteBatch = game.add.spriteBatch();

        this.genericSpawnPool = this.poolByType(ObstacleBoring, columns, game, player);

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
            obstacle.events.onKilled.add(() => {
                this.scoreSignal.dispatch(1);
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

        let levelToSpawn = level;
        if (Math.random() < config.spawner.probabilitySlowLevel) {
            levelToSpawn = config.spawner.slowLevelSpeed;
        }
        for (let index of indices) {
            this.pickObject(index, indices, levelToSpawn);
        }
    }

    pickObject(index, indices, level) {
        let obstaclePool;
        if (Math.random() < config.spawner.probabilityBoringObstacle) {
            obstaclePool = this.genericSpawnPool;
        } else {
            obstaclePool = this.game.rnd.pick(this.spawnPool);
        }
        let obstacle = obstaclePool[index];
        if (!obstacle.visible) {
            obstacle.activate(level, indices, this.columns);
        } else {
            this.pickObject(index, indices, level);
        }
    }

    turnOff() {
        for (let pool of this.spawnPool) {
            for (let obstacle of pool) {
                obstacle.turnOff();
            }
        }
        for (let obstacle of this.genericSpawnPool) {
            obstacle.turnOff();
        }
    }

}

export default Spawner;
