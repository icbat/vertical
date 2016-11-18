import Player from '../prefabs/player';
import Obstacle from '../prefabs/obstacle';
import ScoreText from '../prefabs/scoreText';
import Ghost from '../prefabs/ghost';

class Game extends Phaser.State {

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.music = this.game.add.audio('music');
        this.music.play();

        this.game.global = {
            score: 0
        };
        this.columnXvals = [0 + 32, this.game.world.centerX, this.game.world.width - 32];
        this.scoreText = new ScoreText(this.game, this.game.world.centerX, this.game.world.height * 0.15);
        this.game.add.existing(this.scoreText);

        this.player = new Player(this.game, this.game.world.centerX, this.game.world.height * 0.85);
        this.playerGhosts = [];
        for (let i = 0; i < 5; ++i) {
            this.game.add.existing(new Ghost(this.player, i));
        }
        this.game.add.existing(this.player);

        this.game.input.onDown.add(this.movePlayer, this);

        this.obstacles = [];
        this.setupSpawnTimer(0);
    }

    update() {
        if (this.obstacles.length > 0) {
            if (this.game.physics.arcade.overlap(this.player, this.obstacles[0])) {
                this.endGame();
            }
        }
    }

    render() {
        // this.game.debug.body(this.player);
        // for (let obstacle of this.obstacles) {
        //     this.game.debug.body(obstacle);
        // }
    }

    shutdown() {
        this.music.stop();
    }

    setupSpawnTimer(level) {
        let timeToSpawn = Phaser.Timer.SECOND * 2 * Math.pow(1/2, Math.floor(level / 5));

        let timer = this.game.time.create();
        let event = timer.repeat(timeToSpawn, 10, this.spawnEnemy, this, level);
        timer.onComplete.addOnce(() => {
            this.setupSpawnTimer(++level);
        });
        timer.start();
    }

    movePlayer(click) {
        if (click.worldX < this.game.world.centerX) {
            this.player.moveLeft();
        } else {
            this.player.moveRight();
        }
    }

    spawnEnemy(level) {
        this.game.camera.shake(0.005, 100);
        let obstacle = new Obstacle(this.game, this.game.rnd.pick(this.columnXvals), level);

        this.obstacles.push(obstacle);
        obstacle.destroyed.addOnce(() => {
            this.obstacles.shift();
            this.game.global.score += 1;
        });

        this.game.add.existing(obstacle);
    }

    endGame() {
        this.game.state.start("menu");
    }
}

export default Game;
