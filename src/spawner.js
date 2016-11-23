import Obstacle from './prefabs/obstacle';
import ObstacleStopAndGo from './prefabs/obstacleStopAndGo';
import ObstacleSpeeder from './prefabs/obstacleSpeeder';
import ObstacleSwapper from './prefabs/obstacleSwapper';

class Spawner {

    constructor(game, columns) {
        this.game = game;
        this.columns = columns;
        this.obstacles = [];
        this.spawnPool = [];

        this.spawnPool.push(this.poolByType(Obstacle, columns, game));
        this.spawnPool.push(this.poolByType(ObstacleStopAndGo, columns, game));
        this.spawnPool.push(this.poolByType(ObstacleSpeeder, columns, game));
        this.spawnPool.push(this.poolByType(ObstacleSwapper, columns, game));
    }

    poolByType(Type, columns, game) {
        let pool = [];
        for (let column of columns) {
            let obstacle = new Type(game, column, 0);
            pool.push(obstacle);
            game.add.existing(obstacle);
        }
        return pool;
    }

    spawn(level, numberToSpawn, player) {
        let shuffledOriginals = Phaser.ArrayUtils.shuffle(this.columns.slice());
        let columnVals = new Phaser.ArraySet();
        columnVals.add(this.columns[player.col]);
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
