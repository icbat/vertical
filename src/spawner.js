import ObstacleBoring from './prefabs/obstacleBoring';
import ObstacleStopAndGo from './prefabs/obstacleStopAndGo';
import ObstacleSpeeder from './prefabs/obstacleSpeeder';
import ObstacleSwapper from './prefabs/obstacleSwapper';
import config from './config';

class Spawner {

    constructor(game, player, scoreSignal) {
        this.game = game;
        this.scoreSignal = scoreSignal;
        this.spawnPool = [];
        this.spriteBatch = game.add.spriteBatch();

        this.genericSpawnPool = this.poolByType(ObstacleBoring, game, player);

        this.spawnPool.push(this.poolByType(ObstacleStopAndGo, game, player));
        this.spawnPool.push(this.poolByType(ObstacleSpeeder, game, player));
        this.spawnPool.push(this.poolByType(ObstacleSwapper, game, player));
    }

    poolByType(Type, game, player) {
        let pool = [];
        for (let column of this.game.global.columns) {
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
        let shuffledOriginals = Phaser.ArrayUtils.shuffle(Phaser.ArrayUtils.numberArray(0, this.game.global.columns.length - 1));
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
            obstacle.activate(level, indices);
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
