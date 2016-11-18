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
        this.scoreText = new ScoreText(this.game, this.game.world.centerX, this.game.world.height * 0.15);
        this.game.add.existing(this.scoreText);

        let playerSize = 64;
        let playerY = this.game.world.height * 0.85;
        this.columnXVals = [0 + playerSize / 2, this.game.world.centerX / 2 + playerSize / 4, this.game.world.centerX, this.game.world.centerX * 3 / 2 - playerSize / 4, this.game.world.width - playerSize / 2];

        for (let colX of this.columnXVals) {
            let colSprite = this.game.add.sprite(colX, playerY + playerSize, 'col-shadow');
            colSprite.anchor.setTo(0.5, 0.5);
            colSprite.scale.setTo(playerSize, 1);
            colSprite.alpha = 0.5;
        }

        this.player = new Player(this.game, this.game.world.centerX, playerY, this.columnXVals, playerSize);
        this.playerGhosts = [];
        for (let i = 0; i < 5; ++i) {
            this.game.add.existing(new Ghost(this.player, i));
        }
        this.game.add.existing(this.player);

        this.game.input.onDown.add(this.player.move, this.player);

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

    spawnEnemy(level) {
        this.game.camera.shake(0.005, 100);
        let obstacle = new Obstacle(this.game, this.game.rnd.pick(this.columnXVals), level);

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
