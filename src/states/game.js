import Player from '../prefabs/player';
import ScoreText from '../prefabs/scoreText';
import Spawner from '../spawner';

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
        this.game.add.existing(this.player);

        this.game.input.onDown.add(this.player.move, this.player);

        this.spawner = new Spawner(this.game, this.columnXVals);
        this.setupSpawnTimer(0);

        this.game.analytics.reportGameStart();
    }

    update() {
        for (let obstacle of this.spawner.obstacles) {
            if (this.game.physics.arcade.overlap(this.player, obstacle)) {
                this.endGame();
                break;
            }
        }
    }

    render() {
        this.game.debug.text(this.game.time.fps, 0, 16, "#000000");
        // this.game.debug.body(this.player);
        // for (let obstacle of this.obstacles) {
        //     this.game.debug.body(obstacle);
        // }
    }

    shutdown() {
        this.music.stop();
    }

    setupSpawnTimer(level) {
        let timeToSpawn = Phaser.Timer.SECOND * 2 * Math.pow(1 / 2, Math.floor(level / 10));

        this.spawnTimer = this.game.time.create();
        let event = this.spawnTimer.repeat(timeToSpawn, 10, this.spawn, this, level, this.player);
        this.spawnTimer.onComplete.addOnce(() => {
            this.setupSpawnTimer(++level);
        });
        this.spawnTimer.start();
    }

    spawn(level, player) {
        this.game.camera.shake(0.005, 100);
        let numberToSpawn = this.game.rnd.integerInRange(1, this.columnXVals.length - 1);
        this.spawner.spawn(level, numberToSpawn, player);
    }

    endGame() {
        this.spawnTimer.stop();
        this.game.input.onDown.removeAll();

        this.game.time.slowMotion = 5;
        let timer = this.game.time.create();
        let event = timer.add(Phaser.Timer.SECOND * 2, () => {
            this.game.time.slowMotion = 1;
            this.game.state.start("menu");
            this.game.analytics.reportScore(this.game.global.score);
            let highScore = localStorage.getItem('vertical-highScore') || 0;
            localStorage.setItem('vertical-highScore', Math.max(this.game.global.score, highScore));
        }, this);
        timer.start();
    }
}

export default Game;
